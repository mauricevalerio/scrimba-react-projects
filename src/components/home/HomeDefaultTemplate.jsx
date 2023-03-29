import { Link } from "react-router-dom"
import MovieSeriesFallback from "../../assets/movie-series-fallback.svg"

export default function HomeDefaultTemplate(props) {
    
    const itemElements = props.items.results.map(item => (
        <Link key={item.id} to={`${item.media_type === "tv" ? "tv" : "movies"}/${item.id}`}>
            <img src={item.poster_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${item.poster_path}` : MovieSeriesFallback} 
            alt={`Poster for the movie ${item.title}`} 
            className="max-w-none w-[150px] rounded-lg shadow-md shadow-neutral-800 hover:scale-105 transition-transform duration-300 ease-out"/>
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