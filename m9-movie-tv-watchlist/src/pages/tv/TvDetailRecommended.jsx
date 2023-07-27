import { Link, useOutletContext } from "react-router-dom"
import MovieSeriesFallback from "../../assets/movie-series-fallback.svg"

export default function TvDetailRecommended() {
    const { recommendedTv: { results } } = useOutletContext()
    
    const recommendedTvElements = results.map(tv => {
        return <Link 
            key={tv.id}
            path="relative"
            to={`../${tv.id}`}>
                <img 
                src={tv.poster_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${tv.poster_path}` : MovieSeriesFallback} 
                alt={`Poster for the movie ${tv.name}`} 
                className="object-cover max-w-none w-[150px] h-auto rounded-lg shadow-md shadow-neutral-900 hover:scale-105 transition-transform duration-300 ease-out"/>
        </Link>
    })

    return (
        <div className="flex gap-4 overflow-x-auto py-4">
            {recommendedTvElements.length ? recommendedTvElements : <h1 className="text-2xl">No videos found &#9785;</h1>}
        </div>
    )
}