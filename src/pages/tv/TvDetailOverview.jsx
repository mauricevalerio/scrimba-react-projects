import { useState, useEffect } from "react"
import MovieSeriesFallback from "../../assets/movie-series-fallback.svg"
import { useParams } from "react-router-dom"

export default function TvDetailOverview(props) {
    const currentTvId = useParams()
    
    const [tvWatchlist, setTvWatchlist] = useState(
        () => JSON.parse(localStorage.getItem("tv-watchlist")) || []
    )
    //reads local storage if there is a existing watchlist

    const [isAdded, setIsAdded] = useState(tvWatchlist.some(tv => tv.id === props.tvDetail.id)) 
    //check if the currently displayed movie is on the watchlist localstorage

    const tvGenreElements = props.tvDetail.genres.map((genre, index) => {
        return <span key={index} className="border-2 px-2 rounded border-current block">
            {genre.name}
        </span>
    })

    function handleAddWatchlist() {
        setTvWatchlist(prevWatchlist => (
            isAdded ? prevWatchlist.filter(watchlistItem => watchlistItem.id !== props.tvDetail.id) //if watchlist has been added, removes the watchlist
            : [...prevWatchlist, props.tvDetail] //else add the watchlist
        ))
    }

    useEffect(() => {
        localStorage.setItem("tv-watchlist", JSON.stringify(tvWatchlist)) 
        //stores the watchlist array in the localstorage when watchlist array changes
        setIsAdded(tvWatchlist.some(tv => tv.id === props.tvDetail.id))
        //checks if the movie/series has been added on the watchlist local storage
    }, [tvWatchlist, currentTvId]) //currentTvId so that it will re-render the component

    return (
        <div className="relative">
        <img 
        src={props.tvDetail.backdrop_path ? `${import.meta.env.VITE_TMDB_IMAGE_BACKDROP_ORIGINAL_URL}${props.tvDetail.backdrop_path}` : MovieSeriesFallback} 
        alt={`Poster for the movie ${props.tvDetail.name}`} 
        className="object-cover lg:rounded-lg lg:max-h-[640px] w-full opacity-25"/>

        <div className="flex flex-col gap-4 pt-2 lg:p-4 lg:absolute lg:inset-y-1/3 lg:w-5/6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl lg:text-5xl font-bold">{props.tvDetail.name}</h1>
                <div className="flex gap-2 text-lg">
                    <span>{props.tvDetail.first_air_date ? 
                        props.tvDetail.in_production ?
                        `${props.tvDetail.first_air_date.slice(0, 4)} — Present `
                        : `${props.tvDetail.first_air_date.slice(0, 4)} — ${props.tvDetail.last_air_date.slice(0, 4)} `
                        : "TBA"}
                    &#x2022;</span>
                    <span>{props.tvDetail.episode_run_time.length ? ` ${props.tvDetail.episode_run_time} minutes `: "Runtime not specified "}</span>
                </div>
                <div className="flex flex-wrap gap-1 text-lg">
                    {tvGenreElements}
                </div>
            </div>
            <p className="text-justify text-lg">{props.tvDetail.overview ? props.tvDetail.overview : "No overview specified"}</p>
            <button onClick={handleAddWatchlist} className="max-w-fit text-lg font-bold uppercase border-2 px-4 py-2 rounded-full
            hover:bg-white hover:text-black transition-colors duration-300 ease-out">
                {isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
        </div>
    </div>
    )
}