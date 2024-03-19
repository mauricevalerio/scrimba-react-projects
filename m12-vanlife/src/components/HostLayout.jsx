import { NavLink, Outlet } from 'react-router-dom'

export default function HostNavbar() {
    return (
        <section className='host__navbar'>
            <nav>
                <NavLink 
                to='.'
                end
                className={({isActive}) => isActive ? 'active__tab' : null}
                >Dashboard
                </NavLink>

                <NavLink 
                to='income'
                end
                className={({isActive}) => isActive ? 'active__tab' : null}
                >Income
                </NavLink>

                
                <NavLink 
                to='vans'
                end
                className={({isActive}) => isActive ? 'active__tab' : null}
                >Vans
                </NavLink>

                <NavLink 
                to='reviews'
                end
                className={({isActive}) => isActive ? 'active__tab' : null}
                >Reviews
                </NavLink>
            </nav>
            <Outlet />
        </section>
    )
}