import { useOutletContext } from 'react-router-dom'

export default function HostVanPricing() {
    const {hostVan} = useOutletContext()

    return (
        <p><span className='host__van--detail--price--tab'>${hostVan.price.toFixed(2)}</span>/day</p> 
    )
}