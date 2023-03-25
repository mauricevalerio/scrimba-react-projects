import axios from "axios"
import { Link, useLoaderData } from "react-router-dom"
import { useState, useEffect } from "react"
import MovieSeriesFallback from "../assets/movie-series-fallback.svg"

export async function loader() {    
    try {
        const genreListData = axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}genre/movie/list?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`)
        return genreListData
    } catch (e) {
        throw {
            message: e.message
        }
    }
}

export default function MoviesHome() {
    const { data: genreListMovies } = useLoaderData()
    const [movieGenreId, setMovieGenreId] = useState("")
    const [selectedGenreMovieList, setSelectedGenreMovieList] = useState([])

    const dropDownGenreElements = genreListMovies.genres.map(genre => {
        return <option key={genre.id} value={genre.id}>{genre.name}</option>
    })

    function handleGenreChange(e) {
        setMovieGenreId(e.target.value)
    }

    useEffect(() => {
        if (movieGenreId !== '') {
            async function fetchSelectedGenre() {
                const selectedGenreData = await axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}discover/movie?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}&with_genres=${movieGenreId}&include_adult=false&page=1`)
                setSelectedGenreMovieList(selectedGenreData.data.results)
            }
            fetchSelectedGenre()
        }
    },[movieGenreId])

    const selectedGenreMovieListElements = selectedGenreMovieList.map(item => {
        return <Link 
        key={item.id} 
        relative="path"
        to={`${item.id}`}
        className="flex flex-col flex-wrap w-[350px]">
            <img 
            src={item.backdrop_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${item.backdrop_path}` : MovieSeriesFallback} 
            alt={`Poster for the movie ${item.title}`} 
            className="object-cover h-52 rounded-lg hover:scale-105 transition-transform duration-300 ease-out"/>
            <p className="text-center text-base">{item.title} ({item.release_date ? item.release_date.slice(0,4) : "TBA"})</p>
        </Link>
    })
    
    return (
        <>
        <div className="flex gap-4">
            <h1 className="text-4xl font-bold">Movies</h1>
            <select 
            name="genre"
            value={movieGenreId}
            onChange={handleGenreChange}
            id="genre"
            className="bg-black rounded-md px-4 py-2 shadow-gray-900 shadow-md outline-none cursor-pointer">
                {dropDownGenreElements}
            </select>
        </div>
        <div className="flex justify-evenly flex-wrap mt-4 gap-y-4">
            {selectedGenreMovieListElements || <div className="chase"></div>} 
            
        </div>
        </>
    )
}