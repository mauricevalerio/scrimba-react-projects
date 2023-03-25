import { Link } from "react-router-dom"
import MovieSeriesFallback from "../assets/movie-series-fallback.svg"

export default function HomeDefaultTemplate(props) {
    
    const itemElements = props.items.results.map(movie => {
        return <Link 
            key={movie.id} 
            to={`movies/${movie.id}`}>
                <img 
                src={movie.poster_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${movie.poster_path}` : MovieSeriesFallback} 
                alt={`Poster for the movie ${movie.title}`} 
                className="object-cover max-w-none w-[150px] h-auto rounded-lg shadow-md shadow-neutral-900 hover:scale-105 transition-transform duration-300 ease-out"/>
        </Link>
    })
    
    return (
        <>
            {itemElements.length ? 
            itemElements :
            <h1 className="text-2xl">No videos found &#9785;</h1>}
        </>
    )
}