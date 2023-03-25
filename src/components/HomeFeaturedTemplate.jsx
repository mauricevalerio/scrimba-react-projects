import { Link } from "react-router-dom"

export default function HomeFeaturedTemplate(props) {
    return (
    <div className="flex flex-col gap-4 md:items-center md:mx-auto md:flex-row">
        <Link to={`movies/${props.featuredItem.id}`}>
            <img 
            src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${props.featuredItem.backdrop_path}`} 
            alt={`Backdrop image for movie ${props.featuredItem.title}`} 
            className="md:max-w-none rounded-md object-cover
            hover:scale-105 transition-transform duration-300 ease-out"/>
        </Link>
        <div className="flex flex-col">
            <h2 className="uppercase font-bold text-xl">{props.featuredItem.title} ({props.featuredItem.release_date.slice(0, 4)})</h2>
            <p>{props.featuredItem.overview}</p>
            <p>{props.featuredItem.genres}</p>
        </div> 
    </div>
    )
}