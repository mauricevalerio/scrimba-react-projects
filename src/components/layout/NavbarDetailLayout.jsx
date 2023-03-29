import { NavLink } from "react-router-dom"

export default function NavbarDetailLayout() {
    const movieNavData = [{
        text: "Recommended",
        linkTo: "."
    },
    {
        text: "Casts",
        linkTo: "casts"
    },
    {
        text: "Videos",
        linkTo: "videos"
    }]

    const movieNavElements = movieNavData.map((movieNavItem, index) => {
        return movieNavItem.linkTo === "." ? 
        <NavLink
        key={index}
        to={movieNavItem.linkTo}
        end
        className={({isActive}) => isActive ? "underline font-bold" : null}>
            {movieNavItem.text}
        </NavLink>
        :
        <NavLink
        key={index}
        to={movieNavItem.linkTo}
        className={({isActive}) => isActive ? "underline font-bold" : null}>
            {movieNavItem.text}
        </NavLink>
    })
    
    return (
        <nav className="flex gap-4 pb-4 my-4 text-lg uppercase border-b-2 border-b-white">
            {movieNavElements}
        </nav>
    )
}