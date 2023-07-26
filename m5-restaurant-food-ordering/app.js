import { menuArray } from './data.js'

let orderSummaryArr = [];
const paymentForm = document.getElementById('payment-form');
let qty = 0;

window.onload = function () {
    setTimeout(function () {
        document.getElementById("fadein").remove();
    }, 1000);
};

document.addEventListener('click', e => {
    if (e.target.dataset.btnAdd) {
        handleAddItemBtn(e.target.dataset.btnAdd);
    } else if (e.target.dataset.btnRemove) {
        handleRemoveItemBtn(e.target.dataset.btnRemove);
    } else if (e.target.dataset.btnSubtract) {
        handleSubtractItemBtn(e.target.dataset.btnSubtract);
    } else if (e.target.id === 'complete-order-button') {
        document.querySelector('.modal').classList.toggle('open');
        document.getElementById('payment-form').style.display = 'flex';
        document.querySelector('.rating-container').style.display = 'none';
    } else if (e.target.id === 'close-modal-button') {
        document.querySelector('.modal').classList.toggle('open');
    } else if (e.target.id === 'rating-button') {
        document.querySelector('.payment-success-alert').innerHTML += '<p><br>Thanks for the review!</p>';
        document.querySelector('.modal').classList.toggle('open');
        let star = document.getElementsByName("rate");
        for (let i = 0; i < star.length; i++)
            star[i].checked = false;
    }
});

paymentForm.addEventListener('submit', e => {
    e.preventDefault();

    const paymentFormData = new FormData(paymentForm);
    const fullName = paymentFormData.get('full-name');

    handlePaymentSuccess(fullName);
})

function handleAddItemBtn(itemId) {
    const addItem = menuArray.find(item => item.id === Number(itemId));
    const orderSummary = document.querySelector('footer');

    const findItem = orderSummaryArr.find(item => addItem.id === item.itemId)

    if (findItem) { //if item exist in order summary, modify object
        findItem.itemQty += 1;
        findItem.itemPrice += addItem.price;
    } else { //if item does not exist add in order summary
        orderSummaryArr.push({
            itemName: addItem.name,
            itemPrice: addItem.price,
            itemId: addItem.id,
            itemQty: qty + 1
        });
    }

    if (document.querySelector('.payment-success-alert')) { //re-renders payment success alert
        document.querySelector('.payment-success-alert').style.display = 'none';
    }

    orderSummary.style.display = 'flex'; //displays order summary
    renderOrderSummary();
}

function handleSubtractItemBtn(itemId) {
    const addItem = menuArray.find(item => item.id === Number(itemId));
    const findItem = orderSummaryArr.find(item => addItem.id === item.itemId)

    if (findItem) { //if item exist in order summary, modify object
        if (findItem.itemQty) {
            findItem.itemQty -= 1;
            findItem.itemPrice -= addItem.price;
        }
    }

    renderOrderSummary();
}

function handleRemoveItemBtn(itemId) {
    const targetItem = orderSummaryArr.find(item => item.itemId === Number(itemId))

    orderSummaryArr.splice(orderSummaryArr.indexOf(targetItem), 1);

    if (!orderSummaryArr.length) {
        document.querySelector('footer').style.display = 'none'
    }

    renderOrderSummary()
}

function resetData() {
    document.querySelector('footer').style.display = 'none'
    orderSummaryArr = [];
    document.getElementById('payment-form').reset();
    document.getElementById('payment-form').style.display = 'none';
    document.querySelector('.rating-container').style.display = 'flex';
}

function handlePaymentSuccess(fullName) {
    const menu = document.getElementById('menu');

    resetData();

    menu.insertAdjacentElement('afterend', createHtmlTemplate(`
    <div class="payment-success-alert padding text-white">
        <p>Thanks, ${fullName}! Your order is on its way!<br>Click the plus button for a new order!</p>
    </div>`));

}


function createHtmlTemplate(htmlTemplate) {
    const template = document.createElement('template');
    template.innerHTML = htmlTemplate.trim();
    return template.content.firstChild;
}

function renderIngredients(ingredientsArr) {
    return ingredientsArr.map(ingredient => ` ${ingredient}`);
};

function renderMenu() {
    const menuEl = document.getElementById('menu');

    menuArray.forEach(menu => {
        menuEl.appendChild(
            createHtmlTemplate(
                `
                <section class="menu-item">
                    <p class="emoji">${menu.emoji}</p>
                    <div class="menu-item-details">
                        <h3>${menu.name}</h3>
                        <p>${renderIngredients(menu.ingredients)}</p>
                        <p>$${menu.price}</p>
                    </div>
                    <div class="button-qty-group">
                        <button class="qty-button" data-btn-subtract="${menu.id}">-</button>
                        <button class="qty-button" data-btn-add="${menu.id}">+</button>
                    </div>
                </section>
            `
            )
        )
    })
}

function clearElementDom(elDom) {
    while (elDom.firstChild) { //clears element DOM
        elDom.removeChild(elDom.firstChild)
    }
}

function renderOrderSummary() {
    const orderSummaryEl = document.getElementById('order-summary');

    let totalPrice = orderSummaryArr.reduce((total, currentValue) => total + currentValue.itemPrice, 0)

    clearElementDom(orderSummaryEl);

    orderSummaryArr.forEach(item => { //removes item if quantity is 0
        if (!item.itemQty) {
            const removeItem = item;
            orderSummaryArr.splice(orderSummaryArr.indexOf(removeItem), 1)
        }
    })

    if (!orderSummaryArr.length) {  //hides order summary if all items are remove or quantity items are all 0
        document.querySelector('footer').style.display = 'none'
    }

    orderSummaryArr.forEach(item => {
        orderSummaryEl.appendChild(
            createHtmlTemplate(`
                <div class="item-summary">
                  <h3>${item.itemName}</h3>
                  <p>x${item.itemQty}</p>
                  <button class="btn remove-item-button" data-btn-remove="${item.itemId}">remove</button>
                  <p class="item-price">$${item.itemPrice}</p>
                </div>
            `)
        )
    })
    renderTotalPrice(totalPrice);
}

function renderTotalPrice(totalPrice) {
    const totalPriceEl = document.getElementById('total-price');

    clearElementDom(totalPriceEl);

    if (totalPrice >= 50) {
        let discountedPrice = totalPrice - (0.10 * totalPrice);

        totalPriceEl.appendChild(
            createHtmlTemplate(`
            <div>
                <div class="total-price-inner">
                    <h3 class="strikethrough text-gray">Total price:</h3>
                    <p class="strikethrough text-gray">$${totalPrice}</p>
                </div>
				<div class="discounted-price-inner">
                    <h3>Discounted price:</h3>
                    <p>$${discountedPrice}</p>
                </div>
                <button id="complete-order-button" class="btn btn-theme complete-order-button">Complete order</button>
            </div>
        `)
        )
    } else {
        totalPriceEl.appendChild(
            createHtmlTemplate(`
            <div>
                <div class="total-price-inner">
                    <h3>Total price:</h3>
                    <p>$${totalPrice}</p>
                </div>
                <button id="complete-order-button" class="btn btn-theme complete-order-button">Complete order</button>
            </div>
        `)
        )
    }
}

renderMenu();