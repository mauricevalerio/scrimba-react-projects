import { Link, NavLink } from "react-router-dom"

export default function Header() {
    
    const menuStyle = {
        fontWeight: '700',
        textDecoration: 'underline'
    }

    return (
        <header className="p-4">
            <nav className="flex items-center gap-x-4">
                <Link 
                to="/">
                <p>LOGO</p>
                </Link>

                <NavLink 
                to="/"
                style={({isActive}) => isActive ? menuStyle : null}
                className="hover:scale-105 transition-transform duration-300 ease-out"
                >HOME</NavLink>

                <NavLink 
                to="search"
                style={({isActive}) => isActive ? menuStyle : null}
                className="hover:scale-105 transition-transform duration-300 ease-out"
                >SEARCH</NavLink>

                <NavLink 
                to="watchlist"
                style={({isActive}) => isActive ? menuStyle : null}
                className="hover:scale-105 transition-transform duration-300 ease-out"
                >WATCHLIST</NavLink>

                {/* <NavLink 
                to="movies"
                style={({isActive}) => isActive ? menuStyle : null}
                className="hover:scale-105 transition-transform duration-300 ease-out"
                >MOVIES</NavLink>

                <NavLink 
                to="series"
                style={({isActive}) => isActive ? menuStyle : null}
                className="hover:scale-105 transition-transform duration-300 ease-out"
                >SERIES</NavLink> */}

                {/* DROP DOWN TO FILTER GENRES 
                ON BOTH MOVIES AND TV SERIES */}
            </nav>
        </header>
    )
}