import BinIcon from "../assets/delete-bin.svg"
import BinFillIcon from "../assets/delete-bin-fill.svg"
import PropTypes from "prop-types"
import { useContext } from "react"
import { PhotoContext } from "./Context"
import useHover from "../hooks/useHover"

export default function CartItem({item}) {
    const { removeToCart } = useContext(PhotoContext)
    const [hovered, ref] = useHover()

    return (
        <div className="cart-item">
            <div className="cart-item-inner">
                <div ref={ref}>
                {
                    hovered ?
                    <img 
                    src={BinFillIcon} 
                    alt="Trash fill icon" 
                    className="bin-icon"
                    onClick={() => removeToCart(item.id)}/>
                    :
                    <img 
                    src={BinIcon} 
                    alt="Trash icon" 
                    className="bin-icon"
                    onClick={() => removeToCart(item.id)}/>
                }
                </div>
                <img src={item.url} alt="Cart item picture" className="item"/>
            </div>
            <p>$0.99</p>
        </div>
    )
}

CartItem.propTypes = {
    item: PropTypes.shape({
        url: PropTypes.string.isRequired
    })
}