import { Link, useOutletContext } from "react-router-dom"
import MovieSeriesFallback from "../../assets/movie-series-fallback.svg"

export default function MovieDetailRecommended() {
    const { recommendedMovies: { results } } = useOutletContext()

    const recommendedMoviesElements = results.map(movie => {
        return <Link 
            key={movie.id}
            path="relative"
            to={`../${movie.id}`}>
                <img 
                src={movie.poster_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${movie.poster_path}` : MovieSeriesFallback} 
                alt={`Poster for the movie ${movie.title}`} 
                className="object-cover max-w-none w-[150px] h-auto rounded-lg shadow-md shadow-neutral-900 hover:scale-105 transition-transform duration-300 ease-out"/>
        </Link>
    })

    return (
        <div className="flex gap-4 overflow-x-auto py-4">
            {recommendedMoviesElements.length ? recommendedMoviesElements : <h1 className="text-2xl">No videos found &#9785;</h1>}
        </div>
    )
}