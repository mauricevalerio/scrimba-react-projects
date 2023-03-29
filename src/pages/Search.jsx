import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import MovieSeriesFallback from "../assets/movie-series-fallback.svg"
import SearchPageNavigation from "../components/SearchPageNavigation"
import NotFound from "./NotFound"
import { motion } from "framer-motion"

//load without searchparams
//load with searchparams (this includes forward and back button)

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(searchParams.get("query") || "")
    const [searchResults, setSearchResults] = useState([])
    const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1)
    const [pageCount, setPageCount] = useState(0)
    const [resultsCount, setResultsCount] = useState(1)
    const [mediaType, setMediaType] = useState(searchParams.get("mediaType") || "movies")

    async function handleSubmit(e) {
        e.preventDefault()
        setCurrentPage(1)
        try {
            setSearchParams({ query: search, page: currentPage, mediaType: mediaType })
            const resultsData = await axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}search/${mediaType === "movies" ? "movie" : "tv"}?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}&query=${search}&page=${currentPage}&include_adult=false`)
            setSearchResults(resultsData.data.results)
            setPageCount(resultsData.data.total_pages)
            setResultsCount(resultsData.data.total_results)
            setSearch('')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setSearchParams(prevParams => { //updates the search params on the URL if the current page is updated
            for (let [key] of prevParams.entries()) {
                if(key === "page") {
                    prevParams.set("page", currentPage)
                }
            }
            return prevParams
        })

        if (searchParams.toString()) {
            async function fetch() {
                try {
                const resultsData = await axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}search/${mediaType === "movies" ? "movie" : "tv"}?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}&query=${searchParams.get("query")}&page=${searchParams.get("page")}&include_adult=false`)
                //code below updates states if user clicks back button
                setCurrentPage(resultsData.data.page)
                setSearchResults(resultsData.data.results)
                setPageCount(resultsData.data.total_pages)
                setResultsCount(resultsData.data.total_results)
                setSearch('')
                } catch (e) {
                    throw {
                        message: e.message
                    }
                }
            }
            fetch()
        }
    }, [currentPage])
    
    const handleChange = (e) => { setSearch(e.target.value) }

    const handleMediaTypeChange = e => { setMediaType(e.target.value )}
    
    const searchResultsElements = searchResults.map(item => {
        return <Link 
            key={item.id} 
            relative="path"
            to={`../${mediaType}/${item.id}`}
            state={{search: searchParams.toString()}}
            className="flex flex-col flex-wrap w-[350px]">
                <img 
                src={item.backdrop_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${item.backdrop_path}` : MovieSeriesFallback} 
                alt={`Poster for the movie ${item.title || item.name}`} 
                className="object-cover h-52 rounded-lg hover:scale-105 transition-transform duration-300 ease-out"/>
                <p className="text-center text-base">{item.title || item.name} ({item.release_date ? item.release_date.slice(0, 4)
                        : item.first_air_date ?
                        item.first_air_date.slice(0, 4) 
                        : "TBA"})</p>
        </Link>
    })

    return (
        <motion.div key={currentPage}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 1.5}}>
            <div className="px-4 lg:px-16">
                <form onSubmit={handleSubmit} autoComplete="off" className="flex">
                    <select name="mediaType" id="mediaType" value={mediaType} onChange={handleMediaTypeChange}
                    className="outline-none bg-neutral-700 text-lg p-4 text-neutral-100 rounded-l-md cursor-pointer">
                        <option value="movies">Movies</option>
                        <option value="tv">TV</option>
                    </select>
                    <input 
                    type="search" 
                    name="search"
                    value={search}
                    onChange={handleChange}
                    className="outline-none bg-neutral-700 text-lg p-4 w-full text-neutral-100 flex-2"/> 
                    <button className="outline-none bg-neutral-700 text-lg p-4 rounded-r-md
                    hover:enabled:bg-neutral-900 transition-all duration-300 ease-out
                    active:scale-[0.95] disabled:cursor-not-allowed" disabled={!search}>Search</button>
                </form>
                {searchParams.toString() && <h1 className="text-lg">Search Results for <span className="font-bold">"{searchParams.get("query")}" ({resultsCount})</span></h1>}
            </div>

            <SearchPageNavigation
            results={searchResults}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            setPageCount={setPageCount}
            resultsCount={resultsCount}
            setResultsCount={setResultsCount}
            />

            <div className="flex justify-around flex-wrap gap-y-4 mt-4">
                {resultsCount >= 1 ? 
                    Number(searchParams.get("page")) <= pageCount 
                    ? searchResultsElements 
                    : <NotFound />
                : <h1 className="text-2xl">No results found &#9785;</h1>}
            </div>

            <SearchPageNavigation
            results={searchResults}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            setPageCount={setPageCount}
            resultsCount={resultsCount}
            setResultsCount={setResultsCount}
            />
        </motion.div>
    )
}