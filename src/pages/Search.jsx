import axios from "axios"
import { useState, useEffect, useRef } from "react"
import { Link, useSearchParams } from "react-router-dom"
import MovieSeriesFallback from "../assets/movie-series-fallback.svg"

export default function Search() {
    const historySearch = useRef('')
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [resultsCount, setResultsCount] = useState(1)

    async function handleSubmit(e) {
        e.preventDefault()
        setCurrentPage(1)
        try {
            historySearch.current = search
            const resultsData = await axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}search/movie?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}&query=${search}&page=1&include_adult=false`)
            setSearchResults(resultsData.data.results)
            setCurrentPage(resultsData.data.page)
            setPageCount(resultsData.data.total_pages)
            setResultsCount(resultsData.data.total_results)
            setSearch('')
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (historySearch.current) {
            async function fetch() {
                const resultsData = await axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}search/movie?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}&query=${historySearch.current}&page=${currentPage}&include_adult=false`)
                setSearchResults(resultsData.data.results)
            }
            fetch()
        }
    }, [currentPage])
    
    const handleChange = (e) => { setSearch(e.target.value) }

    const searchResultsElements = searchResults.map(item => {
        return <Link 
            key={item.id} 
            relative="path"
            to={`../movies/${item.id}`}
            className="flex flex-col flex-wrap w-[350px]">
                <img 
                src={item.backdrop_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${item.backdrop_path}` : MovieSeriesFallback} 
                alt={`Poster for the movie ${item.title}`} 
                className="object-cover h-52 rounded-lg hover:scale-105 transition-transform duration-300 ease-out"/>
                <p className="text-center text-base">{item.title} ({item.release_date ? item.release_date.slice(0,4) : "TBA"})</p>
        </Link>
    })

    function handleFirstPage() { currentPage === 1 ? null : setCurrentPage(1) }

    function handlePreviousPage() { currentPage === 1 ? null : setCurrentPage(prevPage => prevPage - 1) }
   
    function handleNextPage() { currentPage === pageCount ? null : setCurrentPage(prevPage => prevPage + 1) }

    function handleLastPage() { currentPage === pageCount ? null : setCurrentPage(pageCount) }
    
    return (
        <>
            <form onSubmit={handleSubmit} autoComplete="off" className="flex">
                <input 
                type="search" 
                name="search"
                value={search}
                onChange={handleChange}
                className="outline-none bg-neutral-700 text-lg p-4 w-full text-neutral-100 flex-2"/> 
                <button className="outline-none bg-neutral-700 text-lg p-4 border-l-2 border-solid border-l-neutral-400
                hover:enabled:bg-neutral-900 transition-all duration-300 ease-out
                active:scale-[0.95] disabled:cursor-not-allowed" disabled={!search}>Search</button>
            </form>

            {historySearch.current && <h1 className="text-lg">Search Results for <span className="font-bold">"{historySearch.current}"</span></h1>}
            
            <div className="flex justify-evenly flex-wrap gap-y-4 mt-4">
                {resultsCount >= 1 ? searchResultsElements : <h1 className="text-2xl">No results found &#9785;</h1>}
            </div>

            {searchResults.length ?
                <div className="font-bold text-lg justify-center mt-4 flex gap-4">
                    <button onClick={handleFirstPage}>&#124;&#60;</button>
                    <button onClick={handlePreviousPage}>&#60;&#60;</button>
                    Page {currentPage} of {pageCount}
                    <button onClick={handleNextPage}>&#62;&#62;</button>
                    <button onClick={handleLastPage}>&#62;&#124;</button>
                </div>
            : null}
        </>
    )
}