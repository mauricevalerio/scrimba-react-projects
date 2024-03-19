import { Link, useLoaderData, Navigate } from 'react-router-dom'
import { requireAuth } from '../../utils'
import { useContext } from 'react'
import { LoginContext } from '../../context/LoginContext'

export async function loader(getHostVans, request) {
    await requireAuth(request)
    return await getHostVans()
}

export default function HostVans() {
    const { isLoggedIn } = useContext(LoginContext)
    const hostVanList = useLoaderData()
    
    const hostVanElements = hostVanList.map(hostVan => 
            <Link
            key={hostVan.id}
            to={`${hostVan.id}`}>
                <div className='host__vans'>
                    <img src={hostVan.imageUrl} alt={`Host Van Image of ${hostVan.name}`} className='host__vans--img' />
                    
                    <div className='host__vans--inner'>
                        <h2 className='host__vans--inner--name'>{hostVan.name}</h2>
                        <p className='host__vans--inner--price'>${hostVan.price}/day</p>
                    </div>
                </div>
            </Link>
    )

    return (
        <>
            {isLoggedIn ?
                <>
                    <h2>Your listed vans</h2>
                    <div className='host__vans--list'>
                        {hostVanElements}
                    </div>
                </>
            :
                <Navigate to='/' />
            }
        </>
    )
}