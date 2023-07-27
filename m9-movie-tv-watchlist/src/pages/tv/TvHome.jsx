import axios from "axios"
import { Link, useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"
import MovieSeriesFallback from "../../assets/movie-series-fallback.svg"
import InfiniteScroll from "react-infinite-scroll-component"
import { motion } from "framer-motion"

export async function loader() {
    try {
        const genreListData = axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}genre/${import.meta.env.VITE_TMDB_TV_MEDIA_TYPE}/list?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`)
        return genreListData
    } catch (e) {
        throw {
            message: e.message
        }
    }
}

export default function TvHome() {
    const { data: genreListTv } = useLoaderData()
    const [tvGenreId, setTvGenreId] = useState(genreListTv.genres[0].id)
    const [selectedGenreTvList, setSelectedGenreTvList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    
    const dropDownGenreElements = genreListTv.genres.map(genre => (<option key={genre.id} value={genre.id}>{genre.name}</option>))

    const handleGenreChange = (e) => { setTvGenreId(e.target.value) }

    async function fetchNext() {
        const selectedGenreData = await axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}discover/${import.meta.env.VITE_TMDB_TV_MEDIA_TYPE}?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}&with_genres=${tvGenreId}&page=${currentPage}&include_adult=false`)
        setCurrentPage(selectedGenreData.data.page + 1) 
        //increments page by 1 after pulling previous page data so that on the next fetchNext() call, it will fetch next page data
        setSelectedGenreTvList(prevGenreData =>  [...prevGenreData, ...selectedGenreData.data.results])
    }

    async function fetchSelectedGenre() { //called when genre changes and on initial component load
        //pulls default action genre and page 1
        const selectedGenreData = await axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}discover/${import.meta.env.VITE_TMDB_TV_MEDIA_TYPE}?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}&with_genres=${tvGenreId}&page=1&include_adult=false`)
        setSelectedGenreTvList(selectedGenreData.data.results)
        setCurrentPage(selectedGenreData.data.page + 1) //increments page by 1 so that when fetchNext() is called, it make an API call on the next page.
    }

    useEffect(() => { //store defaults when tvGenreId changes
        setSelectedGenreTvList([])
        setCurrentPage(1)
    }, [tvGenreId])

    useEffect(() => {  //fetch data when tvGenreId changes
        fetchSelectedGenre()
    }, [tvGenreId])

    useEffect(() => {
        fetchSelectedGenre()
    }, [])
    
    return (
        <motion.div key={tvGenreId} className="pb-4"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 2}}>
            <div className="flex items-center gap-4 px-5">
                <h1 className="text-4xl font-bold">TV</h1>
                <select name="genre" value={tvGenreId} onChange={handleGenreChange} id="genre"
                className="bg-black rounded-md px-4 py-2 shadow-gray-900 shadow-md outline-none cursor-pointer">
                    {dropDownGenreElements}
                </select>
            </div>

            <div id="dropdown-movies" className="overflow-auto">
                <InfiniteScroll
                dataLength={selectedGenreTvList.length}
                next={fetchNext}
                hasMore={true}
                loader={<div className="flex justify-center"><h2 className="basic">Loading</h2></div>}
                scrollThreshold={1}
                >
                    <div className="flex justify-evenly flex-wrap mt-4 gap-y-4">
                    {selectedGenreTvList.map(tv => (
                        <Link 
                        key={tv.id} 
                        relative="path"
                        to={`${tv.id}`}
                        target="_blank"
                        className="flex flex-col flex-wrap w-[350px]">
                            <img 
                            src={tv.backdrop_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${tv.backdrop_path}` : MovieSeriesFallback} 
                            alt={`Poster for the movie ${tv.name}`} 
                            className="object-cover h-52 rounded-lg hover:scale-105 transition-transform duration-300 ease-out"/>
                            <p className="text-center text-base">{tv.name} ({tv.first_air_date ? tv.first_air_date.slice(0,4) : "TBA"})</p>
                        </Link>
                    ))}
                    </div>
                </InfiniteScroll>
            </div>
        </motion.div>
    )
}