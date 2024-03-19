import { useContext } from "react"
import { PhotoContext } from "../components/Context"
import PropTypes from "prop-types"
import AddCartIcon from "../assets/add-cart.svg"
import HeartIcon from "../assets/heart.svg"
import HeartFillIcon from "../assets/heart-fill.svg"
import CartFillIcon from "../assets/cart-fill.svg"
import useHover from "../hooks/useHover"

export default function Image({className, photo}) {
    const [hovered, ref] = useHover()
    const { toggleFavorite, addToCart, cartItems, removeToCart } = useContext(PhotoContext)

    const isAdded = () => cartItems.some(cartItem => cartItem.id === photo.id)

    return (
        <div 
        className={`${className} image-container`}
        ref={ref}>
            <img src={photo.url} className="image-grid"/>
            
            {photo.isFavorite && 
            <img src={HeartFillIcon}
            alt="Heart filled with red color icon"
            className="favorite"
            onClick={() => toggleFavorite(photo.id)}/>}
            
            {hovered && !photo.isFavorite &&
                <img 
                src={HeartIcon} 
                alt="Heart for favorites icon" 
                className="favorite"
                onClick={() => toggleFavorite(photo.id)}
                />
            }

            {
                isAdded()
                &&
                <img src={CartFillIcon}
                alt="Cart added icon"
                className="cart"
                onClick={() => removeToCart(photo.id)} />
            }

            {hovered && !isAdded() && 
                <img 
                src={AddCartIcon} 
                alt="Add to cart icon" 
                className="cart"
                onClick={() => addToCart(photo)}/>
            }
        </div>
    )
}

Image.propTypes = {
    className: PropTypes.string,
    photo: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}