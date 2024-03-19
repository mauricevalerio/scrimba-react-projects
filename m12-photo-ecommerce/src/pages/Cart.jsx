import { useState, useContext } from "react"
import { PhotoContext } from "../components/Context"
import CartItem from "../components/CartItem"

export default function Cart(){
    const [hasOrdered, setHasOrdered] = useState(false)
    const { cartItems, emptyCart } = useContext(PhotoContext)

    const totalCost = 0.99 * cartItems.length
    const totalCostDisplay = totalCost.toLocaleString("en-US", 
    { style: "currency", currency: "USD" })

    const cartItemElements = cartItems.map(item =>(
        <CartItem key={item.id} item={item}/>
    ))

    const handleOrder = () => {
        setHasOrdered(true)

        setTimeout(() => {
            setHasOrdered(false)
            emptyCart([])
        }, 3000)
    }

    return (
        <main className="cart-page">
            <h1 className="checkout">Check out</h1>
            <div className="cart-item-container">
                {cartItemElements}
            </div>
            <p className="total-cost">Total: {totalCostDisplay} </p>
            {
                cartItems.length > 0 ?
                <button onClick={handleOrder}>{hasOrdered ? "Ordering..." : "Place Order"}</button>
                : null
            }
        </main>
    )
}