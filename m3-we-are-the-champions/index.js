import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js"
import { getDatabase, ref, push, onValue, update, get } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://realtime-database-b5356-default-rtdb.firebaseio.com/",
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

const endorsementsRef = ref(database, "endorsements")

const textareaFieldEl = document.getElementById("textarea-field")
const publishButtonEl = document.getElementById("publish-button")
const endorsementsEl = document.getElementById("endorsements")
const fromFieldEl = document.getElementById("from-name")
const toFieldEl = document.getElementById("to-name")

publishButtonEl.addEventListener("click", function (e) {
    e.preventDefault()
    let inputValue = textareaFieldEl.value
    let fromValue = fromFieldEl.value
    let toValue = toFieldEl.value
    let numberOfLikes = 0

    if (inputValue && fromValue && toValue) {

        textareaFieldEl.value = ""
        fromFieldEl.value = ""
        toFieldEl.value = ""

        push(endorsementsRef, {
            from: fromValue,
            to: toValue,
            message: inputValue,
            likes: numberOfLikes
        })
    }
})

function addHeartClickListener(e) {
    const dataRef = ref(database, 'endorsements/' + e.target.dataset.id)

    const updates = {}

    get(dataRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                updates["/endorsements/" + e.target.dataset.id] = {
                    ...snapshot.val(),
                    likes: snapshot.val().likes += 1
                }
                return update(ref(database), updates)
            }
        })
        .catch((error) => console.error(error))
}

onValue(endorsementsRef, function (snapshot) {
    if (snapshot.exists()) {
        let things = Object.entries(snapshot.val())

        endorsementsEl.innerHTML = ""

        for (let i = things.length - 1; 0 <= i; i--) {
            endorsementsEl.innerHTML += `<li>
            <p class="bold">To: ${things[i][1].to}</p>
            <p>${things[i][1].message}</p>
            <div class="item-footer">
                <p class="bold">From: ${things[i][1].from}</p>
                <div class="likes">
                    <p
                    class="heart" 
                    data-id="${things[i][0]}"
                    >🖤
                    </p>
                    <p class="bold">${things[i][1].likes}</p>
                </div>
            </div>
            </li>`
        }

        for (let heartEventListener of document.querySelectorAll("div.likes > p.heart")) {
            heartEventListener.addEventListener("click", addHeartClickListener)
        }
    } else {
        endorsementsEl.innerHTML = "No endorsements yet"
    }
})