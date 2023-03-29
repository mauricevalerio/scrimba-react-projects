import { useState, useEffect } from "react"
import MovieSeriesFallback from "../../assets/movie-series-fallback.svg"
import { useParams } from "react-router-dom"

export default function MovieDetailOverview(props) {
    const currentMovieId = useParams()

    const [watchlist, setWatchlist] = useState(
        () => JSON.parse(localStorage.getItem("watchlist")) || []
    )
    //reads local storage if there is a existing watchlist

    const [isAdded, setIsAdded] = useState(watchlist.some(movie => movie.id === props.movieDetail.id)) 
    //check if the currently displayed movie is on the watchlist localstorage

    const movieGenreElements = props.movieDetail.genres.map((genre, index) => {
        return <span key={index} className="border-2 px-2 rounded border-current block">
            {genre.name}
        </span>
    })

    function handleAddWatchlist() {
        setWatchlist(prevWatchlist => (
            isAdded ? prevWatchlist.filter(watchlistItem => watchlistItem.id !== props.movieDetail.id) //if watchlist has been added, removes the watchlist
            : [...prevWatchlist, props.movieDetail] //else add the watchlist
        ))
    }

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist)) 
        //stores the watchlist array in the localstorage when watchlist array changes
        setIsAdded(watchlist.some(movie => movie.id === props.movieDetail.id))
        //checks if the movie/series has been added on the watchlist local storage
    }, [watchlist, currentMovieId]) //currentMovieId so that it will re-render the component

    return (
        <div className="relative">
            <img 
            src={props.movieDetail.backdrop_path ? `${import.meta.env.VITE_TMDB_IMAGE_BACKDROP_ORIGINAL_URL}${props.movieDetail.backdrop_path}` : MovieSeriesFallback} 
            alt={`Poster for the movie ${props.movieDetail.title}`} 
            className="object-cover lg:rounded-lg lg:max-h-[640px] w-full opacity-25"/>

            <div className="flex flex-col gap-4 pt-2 lg:p-4 lg:absolute lg:inset-y-1/3 lg:w-3/4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl lg:text-5xl font-bold">{props.movieDetail.title}</h1>
                    <div className="flex gap-2 text-lg">
                        <span>{props.movieDetail.release_date ? props.movieDetail.release_date.slice(0, 4) : "TBA"} &#x2022;</span>
                        <span>{props.movieDetail.runtime ? ` ${props.movieDetail.runtime} minutes`: "Runtime not specified"}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 text-lg">
                        {movieGenreElements}
                    </div>
                </div>
                <p className="text-justify text-lg">{props.movieDetail.overview ? props.movieDetail.overview : "No overview specified"}</p>
                <button onClick={handleAddWatchlist} className="max-w-fit text-lg font-bold uppercase border-2 px-4 py-2 rounded-full
                hover:bg-white hover:text-black transition-colors duration-300 ease-out">
                    {isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
                </button>
            </div>
        </div>
    )
}