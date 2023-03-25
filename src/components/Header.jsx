import { Link, NavLink } from "react-router-dom"
import HomeIcon from "../assets/navbar-icons/home.svg"
import SearchIcon from "../assets/navbar-icons/search.svg"
import WatchlistIcon from "../assets/navbar-icons/watchlist.svg"
import MoviesIcon from "../assets/navbar-icons/movies.svg"
import SeriesIcon from "../assets/navbar-icons/series.svg"

export default function Header() {
    
    const menuStyle = {
        fontWeight: '700',
        textDecoration: 'underline'
    }

    const navData = [
        {
            text: "home",
            linkTo: "/",
            icon: HomeIcon
        },
        {
            text: "search",
            linkTo: "search",
            icon: SearchIcon
        },
        {
            text: "watchlist",
            linkTo: "watchlist",
            icon: WatchlistIcon
        },
        {
            text: "movies",
            linkTo: "movies",
            icon: MoviesIcon
        },
        {
            text: "series",
            linkTo: "series",
            icon: SeriesIcon
        },
    ]

    const navElements = navData.map((navItem, index) => {
        return <NavLink 
        to={navItem.linkTo}
        key={index}
        style={({isActive}) => isActive ? menuStyle : null}
        className="flex gap-2 uppercase hover:scale-105 transition-transform duration-300 ease-out">
            <img src={navItem.icon} alt={`${navItem.text} Icon`} className="max-w-none w-[15px]"/>
            <span className="hidden md:block">{navItem.text}</span>
        </NavLink>
    })

    return (
        <header className="p-4">
            <nav className="flex items-center gap-x-4">
                <Link 
                to="/">
                <p className="text-lg">LOGO</p>
                </Link>
                {navElements}
            </nav>
        </header>
    )
}