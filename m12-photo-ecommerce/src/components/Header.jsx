import { NavLink } from "react-router-dom"
import CartIcon from "../assets/shopping-cart.svg"
import CartFillIcon from "../assets/shopping-cart-fill.svg"
import { PhotoContext } from "./Context"
import { useContext } from "react"

export default function Header() {
    const { cartItems } = useContext(PhotoContext)

    return (
        <nav>
            <NavLink
            to="/"
            className={(({isActive}) => isActive ? "active-nav-style" : null )}
            end>
                Pic Some
            </NavLink>

            <NavLink to="/cart">
                {
                    cartItems.length > 0 ? 
                    <img src={CartFillIcon} alt="Shopping cart filled icon" className="cart-icon"/>
                    : <img src={CartIcon} alt="Shopping cart empty icon" className="cart-icon"/>
                }
            </NavLink>
        </nav>
    )
}