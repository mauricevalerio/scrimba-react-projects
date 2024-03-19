import {  Link, useLocation, useLoaderData } from 'react-router-dom'

export async function loader(params, getVanById) {
    return await getVanById(params.id)
}

export default function VanDetail() {
    const location = useLocation()
    const vanDetail = useLoaderData()

    return (
        <section className='van__detail'>
            {vanDetail.errMessage ? 
            <h1>{vanDetail.errMessage}</h1>
            : 
            <>
                <Link
                    to={`..?${location.state ? location.state.search : ''}`}
                    relative='path'
                    className='back__btn'>
                    &larr; <span>{`Back to ${location.state?.type ? location.state.type : 'all'} vans`}</span>
                </Link>

                <img src={vanDetail.imageUrl} alt={`Image of ${vanDetail.name}`} className='van__detail--img'/>
                <span className={`van__detail--type ${vanDetail.type}`}>{vanDetail.type}</span>
                <h2 className='van__detail--name'>{vanDetail.name}</h2>
                <span className='van__detail--price'>${vanDetail.price}</span>/day
                <p className='van__detail--desc'>{vanDetail.description}</p>
                <button className="van__detail--rent--btn">Rent this van</button>
            </>}
        </section>
    )
}