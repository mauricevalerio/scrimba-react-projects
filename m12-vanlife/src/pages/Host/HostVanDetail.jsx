import { Outlet, Link, NavLink, useLoaderData, Navigate } from 'react-router-dom'
import { requireAuth } from '../../utils'
import { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'

export async function loader(params, request, getVanById) {
    await requireAuth(request)
    return getVanById(params.id)
}

export default function HostVanDetail() {
    const { isLoggedIn } = useContext(LoginContext)
    const hostVan = useLoaderData()
    
    return (
        <>
            {
                isLoggedIn ?
                <>
                <Link
                to='/host'
                relative='path'
                className='back__btn'>
                &larr; <span>Back to all vans</span>
                </Link>
    
                <div className='host__van--detail'>
                    <div className='host__van--card'>
                        <img src={hostVan.imageUrl} alt={`Host Van Image of ${hostVan.name}`} className='host__van--card--img'/>
                        
                        <div className='host__van--card--inner'>
                            <span className={`van-type ${hostVan.type} host__van--card--inner--type`}>{hostVan.type}</span>
                            <h2 className='host__van--card--inner--name'>{hostVan.name}</h2>
                            <p><span className='host__van--card--inner--price'>${hostVan.price}</span>/day</p> 
                        </div>
                    </div>
    
                    <nav className='host-van-detail-nav'>
                        <NavLink
                        to='.'
                        end
                        className={({isActive}) => isActive ? 'active-link' : null}
                        >Details
                        </NavLink>
    
                        <NavLink
                        to='pricing'
                        className={({isActive}) => isActive ? 'active-link' : null}
                        >Pricing
                        </NavLink>
                        
                        <NavLink
                        to='photo'
                        className={({isActive}) => isActive ? 'active-link' : null}
                        >Photos
                        </NavLink>
                    </nav>
    
                    <Outlet context={{hostVan}} />
                </div>
                </>
                :
                <Navigate to='/'/>
            }
        </>
    )
}