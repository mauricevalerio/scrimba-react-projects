import { Link } from "react-router-dom"
import MovieSeriesFallback from "../../assets/movie-series-fallback.svg"

export default function HomeLargeCardTemplate(props) {
    const itemElements = props.itemsLargeCard.results.map(tv => (
        <Link key={tv.id} to={`tv/${tv.id}`}>
            <img 
            src={tv.poster_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${tv.poster_path}` : MovieSeriesFallback} 
            alt={`Poster for the movie ${tv.title}`} 
            className="max-w-[300px] rounded-lg shadow-md shadow-neutral-900 
            hover:scale-105 transition-transform duration-300 ease-out"/>
        </Link>
    ))
    return (
        <>
            {itemElements.length ? 
            itemElements :
            <h1 className="text-2xl">No videos found &#9785;</h1>}
        </>
    )
}