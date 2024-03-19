import { Await, defer, Link, useSearchParams, useLoaderData } from 'react-router-dom'
import { Suspense } from 'react'

export async function loader(getVans) {
    let vans = await getVans()
    return defer({vansData: vans})
}

export default function Vans() {
    const {vansData} = useLoaderData()
    const [searchParams, setSearchParams] = useSearchParams()
    const typeFilter = searchParams.get('type')

    // const filteredVans = typeFilter 
    // ? vansData.filter(van => van.type === typeFilter)
    // : vansData

    // const vansElements = filteredVans.map(van => {
    //     return  <Link to={van.id} key={van.id} state={{
    //         search: `${searchParams.toString()}`,
    //         type: typeFilter
    //     }}><div  className='van__card'>
    //         <img src={van.imageUrl} alt={`Image of ${van.name}`} className='van__card--img'/>
    //         <div className='van__card--inner'>
    //             <h2 className='van__card--inner--name'>{van.name}</h2>
    //             <p><span className='van__card--inner--price'>${van.price}</span><br />/day
    //             </p>
                
    //         </div>
    //         <span className={`van__card--type ${van.type}`}>{van.type}</span>
    //         </div></Link>
    // })

    function handleFilter(key, value) {
        setSearchParams(prevParams => {
            if (value === null) { //clears the type search parameter if value is null
                prevParams.delete('type')
            } else {
                prevParams.set(key, value)
            }
            return prevParams.toString()
        })
    }
    return (
        <Suspense fallback={<h2>Loading....</h2>}>
            <Await resolve={vansData}>
            {vans => {
                const filteredVans = typeFilter 
                ? vans.filter(van => van.type === typeFilter)
                : vans
            
                const vansElements = filteredVans.map(van => {
                    return  <Link to={van.id} key={van.id} state={{
                        search: `${searchParams.toString()}`,
                        type: typeFilter
                    }}><div  className='van__card'>
                        <img src={van.imageUrl} alt={`Image of ${van.name}`} className='van__card--img'/>
                        <div className='van__card--inner'>
                            <h2 className='van__card--inner--name'>{van.name}</h2>
                            <p><span className='van__card--inner--price'>${van.price}</span><br />/day
                            </p>
                            
                        </div>
                        <span className={`van__card--type ${van.type}`}>{van.type}</span>
                        </div></Link>
                })
                
                return (
                    <section className='vans'>
                    <h1>Explore our van options</h1>
                    <div className='vans__filters'>
                        <button className={`vans__filters--btn simple ${typeFilter === 'simple' && 'selected'}`} onClick={() => handleFilter('type','simple')}>Simple</button>
                        <button className={`vans__filters--btn luxury ${typeFilter === 'luxury' && 'selected'}`} onClick={() => handleFilter('type','luxury')}>Luxury</button>
                        <button className={`vans__filters--btn rugged ${typeFilter === 'rugged' && 'selected'}`} onClick={() => handleFilter('type','rugged')}>Rugged</button>
                        {typeFilter && <button className='vans__filters--btn clear' onClick={() => handleFilter('type',null)}>Clear Filters</button>}
                    </div>
                    <div className='vans__list'>
                        {vansElements}
                    </div>
                </section>
                )
            }}
            </Await>
        </Suspense>


    )
}