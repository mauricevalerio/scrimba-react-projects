import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import MovieSeriesFallback from "../assets/movie-series-fallback.svg"

export default function watchlistItem(props) {
    const [width, setWidth] = useState(window.innerWidth)
    const [isShown, setIsShown] = useState(false)
    
    useEffect(() => {
        function checkWidth() {
            setWidth(window.innerWidth)
        }
        window.addEventListener("resize", checkWidth)
        return () => window.removeEventListener("resize", checkWidth)
    },[])

    useEffect(() => {
        width < 1024 ? setIsShown(true) : setIsShown(false)
    }, [width])

    return (
        <>
            <div
            onMouseEnter={width > 1024 ? () => setIsShown(true) : null}
            onMouseLeave={width > 1024 ? () => setIsShown(false) : null}
            className="relative"
            key={props.watchlistItem.id}>
            <Link 
                relative="path"
                to={`../${props.mediaType === "movies" ? "movies" : "tv"}/${props.watchlistItem.id}`}
                className={`flex flex-col flex-wrap max-w-[350px] ${isShown ? "-z-50" : null}`}>
                    <img 
                    src={props.watchlistItem.backdrop_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${props.watchlistItem.backdrop_path}` : MovieSeriesFallback} 
                    alt={`Poster for the movie ${props.watchlistItem.title || props.watchlistItem.name}`} 
                    className={`object-cover w-[350px] h-52 rounded-lg transition-all duration-300 ease-out ${isShown ? "opacity-50" : null}`}/>
                    <p className="text-center">{props.watchlistItem.title || props.watchlistItem.name} (
                        {props.mediaType === "movies" ? 
                        props.watchlistItem.release_date ? 
                        props.watchlistItem.release_date.slice(0, 4) 
                        : "TBA"
                        : props.watchlistItem.first_air_date ?
                        props.watchlistItem.first_air_date.slice(0, 4) 
                        : "TBA"})</p>
            </Link>
            {isShown ? <button className="lg:absolute lg:top-1/2 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:p-4 z-50 lg:opacity-50 lg:mt-0
            mt-2 p-2 block mx-auto border-red-600 lg:border-white border-2 rounded-full
            hover:border-red-600 hover:text-red-600" onClick={() => props.handleRemoveWatchlist(props.watchlistItem.id)}>Remove</button>
        : null}
            </div>
        </>
    )
}