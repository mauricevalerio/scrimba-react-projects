
import axios from "axios"
import { Link, useLoaderData } from "react-router-dom"

export async function loader() {
    try {
        const [ trendingData, popularData, upcomingData ] = await Promise.all([
            axios.get("https://api.themoviedb.org/3/trending/movie/day?api_key=04b475fff6298d4658fe5907880a9547"),
            axios.get("https://api.themoviedb.org/3/movie/popular?api_key=04b475fff6298d4658fe5907880a9547&language=en-US&page=1"),
            axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=04b475fff6298d4658fe5907880a9547&language=en-US&page=1")
        ])
        return ({trendingData, popularData, upcomingData})
    } catch (e) {
        throw {
            message: e.message
        }
    }
}

export default function Home() {
    const {
        trendingData: trendingMovies, 
        popularData: popularMovies,
        upcomingData: upcomingMovies } = useLoaderData()

    const upcomingMoviesElements = upcomingMovies.data.results.map(movie => {
        return <Link 
            key={movie.id} 
            to={`movies/${movie.id}`}>
                <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={`Poster for the movie ${movie.title}`} 
                className="object-cover max-w-none w-[150px] h-auto rounded-lg shadow-md shadow-neutral-900 hover:scale-105 transition-transform duration-300 ease-out"/>
        </Link>
    })
    
    const trendingMoviesElements = trendingMovies.data.results.map(movie => {
        return <Link 
            key={movie.id} 
            to={`movies/${movie.id}`}>
                <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={`Poster for the movie ${movie.title}`} 
                className="object-cover max-w-none w-[150px] h-auto rounded-lg shadow-md shadow-neutral-900 hover:scale-105 transition-transform duration-300 ease-out"/>
         </Link>
    })

    const popularMoviesElements = popularMovies.data.results.map(movie => {
        return <Link 
            key={movie.id} 
            to={`movies/${movie.id}`}>
                <img 
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={`Poster for the movie ${movie.title}`} 
                className="object-cover max-w-none w-[150px] h-auto rounded-lg shadow-md shadow-neutral-900 hover:scale-105 transition-transform duration-300 ease-out"/>
        </Link>
    })

    return (
        <section className="home p-4">

            <h2 className="text-xl font-bold">Upcoming Releases</h2>
            <div className="flex gap-4 overflow-x-scroll px-0 py-4">
                {upcomingMoviesElements}
            </div>

            <h2 className="text-xl font-bold">Trending</h2>
            <div className="flex gap-4 overflow-x-scroll px-0 py-4">
                {trendingMoviesElements}
            </div>

            <h2 className="text-xl font-bold">Popular</h2>
            <div className="flex gap-4 overflow-x-scroll px-0 py-4">
                {popularMoviesElements}
            </div>

        </section>
    )
}