import { Link } from "react-router-dom"

export default function HomeFeaturedTemplateAlt(props) {
    
    return (
    <div className="flex flex-col justify-center gap-4 md:items-center md:mx-auto md:flex-row overflow-hidden">
        <Link to={`tv/${props.featuredItem.id}`} className="lg:order-1">
            <img src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${props.featuredItem.backdrop_path}`} 
            alt={`Backdrop image for movie ${props.featuredItem.name}`} 
            className="md:max-w-none rounded-md hover:scale-105 transition-transform duration-300 ease-out"/>
        </Link>
        <div className="flex flex-col">
            <h2 className="uppercase font-bold text-xl">{props.featuredItem.name} ({props.featuredItem.first_air_date.slice(0, 4)})</h2>
            <p>{props.featuredItem.overview}</p>
            <p>{props.featuredItem.genres}</p>
        </div> 
    </div>
    )
}