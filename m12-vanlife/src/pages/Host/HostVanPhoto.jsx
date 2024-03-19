import { useOutletContext } from 'react-router-dom'

export default function HostVanPhoto() {
    const {hostVan} = useOutletContext()
    
    return (
        <img src={hostVan.imageUrl} alt={`Image of  ${hostVan.name}`} className='host__van--detail--photo--tab'/>
    )
}