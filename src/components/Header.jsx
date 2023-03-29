import { Link, NavLink } from "react-router-dom"
import HomeIcon from "../assets/navbar-icons/home.svg"
import SearchIcon from "../assets/navbar-icons/search.svg"
import WatchlistIcon from "../assets/navbar-icons/watchlist.svg"
import MoviesIcon from "../assets/navbar-icons/movies.svg"
import SeriesIcon from "../assets/navbar-icons/series.svg"
import SiteIcon from "../assets/site-icon.svg"

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
            text: "TV",
            linkTo: "tv",
            icon: SeriesIcon
        },
    ]

    const navElements = navData.map((navItem, index) => (
        <NavLink key={index} to={navItem.linkTo} 
        style={({isActive}) => isActive ? menuStyle : null}
        className="flex gap-2 uppercase hover:scale-105 transition-transform duration-300 ease-out">
            <img src={navItem.icon} alt={`${navItem.text} Icon`} className="max-w-none w-[25px] md:w-[15px]"/>
            <span className="hidden md:block md:text-lg">{navItem.text}</span>
        </NavLink>
    ))

    return (
        <header className="p-4 lg:px-16">
            <nav className="flex items-center gap-x-4">
                <Link to="/">
                    <img src={SiteIcon} alt="Site Icon" className="max-w-none w-[30px]"/>
                </Link>
                {navElements}
            </nav>
        </header>
    )
}
