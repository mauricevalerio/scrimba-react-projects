import { useState, useEffect, createContext } from "react"
const PhotoContext = createContext()

function PhotoContextProvider(props) {
    const [photos, setPhotos] = useState([])
    const [cartItems, setCartItems] = useState([])

    const toggleFavorite = (id) => {
        setPhotos(prevPhotos => (
            prevPhotos.map(photo => (photo.id === id 
                ? {...photo, isFavorite: !photo.isFavorite }
                : photo))
        ))
    }

    const addToCart = item => {
        setCartItems(prevCartItems => [...prevCartItems, item])
    }

    const removeToCart = itemId => {
        setCartItems(prevCartItems => (
            prevCartItems.filter(item => (item.id !== itemId))
        ))
    }

    const emptyCart = () => {
        setCartItems([])
    }
    
    useEffect(() => {
        fetch("https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json")
        .then(response => { return !response.ok ? { text: response.statusText, status: response.status } : response.json() })
        .then(data => setPhotos(data))
    },[])
    
    return (
        <PhotoContext.Provider 
        value={{photos, cartItems, toggleFavorite, addToCart, removeToCart, emptyCart}}>
            {props.children}
        </PhotoContext.Provider>
    )
}

export {
    PhotoContextProvider,
    PhotoContext 
}