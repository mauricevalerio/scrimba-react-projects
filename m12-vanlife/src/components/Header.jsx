import { NavLink, Link } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { useContext } from 'react'

export default function Header() {
    const {isLoggedIn, handleLogOut} = useContext(LoginContext)
    
    return (
        <header>
            <Link to='/' className='logo'><h1>#VANLIFE</h1></Link>
            <nav>
                <NavLink 
                to='host'
                className={({isActive}) => isActive ? 'active__tab' : null}
                >Host
                </NavLink>
  
                <NavLink 
                to='vans'
                className={({isActive}) => isActive ? 'active__tab' : null}
                >Vans
                </NavLink>
                
                <NavLink 
                to='about'
                className={({isActive}) => isActive ? 'active__tab' : null}
                >About
                </NavLink>

                {
                    isLoggedIn ?
                        <button
                        className='logout__btn'
                        onClick={handleLogOut}>Logout</button>
                    :
                    <NavLink
                    to='login'
                    className={({isActive}) => isActive ? 'active__tab' : null}>
                    Login
                    </NavLink>
                }


            </nav>
        </header>
    )
}