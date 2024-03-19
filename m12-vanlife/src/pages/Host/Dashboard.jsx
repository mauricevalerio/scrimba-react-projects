import { Navigate, Link, useLoaderData } from 'react-router-dom'
import { BsStarFill } from "react-icons/bs"
import { useContext } from 'react'
import { requireAuth } from '../../utils'
import { LoginContext } from '../../context/LoginContext'

export async function loader(getHostVans, request) {
    await requireAuth(request)
    return await getHostVans()
}

export default function Dashboard() {
    const { isLoggedIn } = useContext(LoginContext)
    const vanDetail = useLoaderData()

    const hostVansElements = vanDetail.map((van) => (
        <div className="host__vans" key={van.id}>
            <img src={van.imageUrl} alt={`Photo of ${van.name}`} className='host__vans--img'/>
            <div className='host__vans--inner'>
                <h2 className='host__vans--inner--name'>{van.name}</h2>
                <p className='host__vans--inner--price'>${van.price}/day</p>
            </div>
            <Link to={`vans/${van.id}`}>View</Link>
        </div>
    ))

    return (
        <>
            {
                isLoggedIn ?
                <>
                    <section className="host__dashboard--earnings">
                    <div className="host__dashboard--earnings--info">
                        <h1>Welcome!</h1>
                        <p>Income last <span>30 days</span></p>
                        <h2>$2,260</h2>
                    </div>
                    <Link to="income">Details</Link>
                    </section>
                    <section className="host__dashboard--reviews">
                        <h2>Review score</h2>
                        <BsStarFill className="host__dashboard--reviews--star" />
                        <p><span>5.0</span>/5</p>
                        <Link to="reviews">Details</Link>
                    </section>
                    
                    <div className='host__dashboard--vans--header'>
                        <h2>Your listed vans</h2>
                        <Link to="vans">View all</Link>
                    </div>
                    
                    <div className='host__vans--list'>
                        {hostVansElements}
                    </div>
                </>
                : <Navigate to='/' />
            }

        </>
    )
}
