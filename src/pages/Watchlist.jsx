import { useEffect, useState } from "react"
import WatchlistItem from "../components/WatchlistItem"
import SearchIcon from "../assets/navbar-icons/search.svg"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function Watchlist() {
    const [mediaType, setMediaType] = useState("movies")

    const [watchlist, setWatchlist] = useState(
        () => JSON.parse(localStorage.getItem("watchlist")) || []
    )

    const [tvWatchlist, setTvWatchlist] = useState(
        () => JSON.parse(localStorage.getItem("tv-watchlist")) || []
    )

    useEffect(() => {
        mediaType === "movies" ? localStorage.setItem("watchlist", JSON.stringify(watchlist))
        : localStorage.setItem("tv-watchlist", JSON.stringify(tvWatchlist))
    }, [watchlist, tvWatchlist])

    function handleRemoveWatchlist(id) {
        mediaType === "movies" ?
        setWatchlist(prevWatchlist => {
            return prevWatchlist.filter(watchlistItem => watchlistItem.id !== id)
        })
        : setTvWatchlist(prevTvWatchlist => {
            return prevTvWatchlist.filter(watchlistTvItem => watchlistTvItem.id !== id)
        })
    }

    const watchlistElements = (mediaType === "movies" ? watchlist : tvWatchlist).map(watchlistItem => {
        return <WatchlistItem 
            key={watchlistItem.id}
            mediaType={mediaType}
            watchlistItem={watchlistItem}
            handleRemoveWatchlist={handleRemoveWatchlist}/>
    })

    const handleMediaTypeChange = (e) => { setMediaType(e.target.value) }

    return (
        <motion.div key={mediaType} className="pb-4"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 2}}>
            <div className="flex items-center gap-4 px-5">
                <h1 className="text-4xl font-bold">Watchlist</h1>
                <select name="mediaType" value={mediaType} onChange={handleMediaTypeChange} id="genre"
                className="bg-black rounded-md px-4 py-2 shadow-gray-900 shadow-md outline-none cursor-pointer">
                    <option value="movies">Movies</option>
                    <option value="tv">TV</option>
                </select>
            </div>

            {watchlistElements.length === 0 ? 
                <div className="flex flex-col items-center gap-4 pt-32 text-center">
                    <h1 className="text-4xl uppercase font-bold opacity-50">Nothing to see here yet</h1>
                    <p className="text-lg uppercase font-semibold opacity-50">Go find something and grab a popcorn!</p>
                    <Link 
                    to="../search" 
                    path="relative" 
                    className="flex items-center gap-4 border-2 py-4 px-12 rounded-full
                    hover:scale-105 transition-transform duration-500 ease-in-out opacity-100">
                        <img src={SearchIcon} alt="Search Icon" className="w-[35px] h-auto"/>
                        <span className="text-2xl">Search</span> 
                    </Link>
                </div>
                :
                <div className="flex flex-wrap gap-4 mt-4 px-5">
                    {watchlistElements}
                </div>
            }
        </motion.div>
    )
}


