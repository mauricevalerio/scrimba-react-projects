import { Outlet, useLoaderData } from "react-router-dom"
import axios from "axios"
import MovieDetailOverview from "../../pages/movies/MovieDetailOverview"
import NavbarDetailLayout from "./NavbarDetailLayout"
import { motion } from "framer-motion"

export async function loader({ params }) {
    
    const [ movieDetailData, movieCastsData, movieVideosData, recommendedData ] = await Promise.all([
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_MOVIE_MEDIA_TYPE}/${params.movieId}?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_MOVIE_MEDIA_TYPE}/${params.movieId}/credits?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_MOVIE_MEDIA_TYPE}/${params.movieId}/videos?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_MOVIE_MEDIA_TYPE}/${params.movieId}/recommendations?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`)
        ])
        
        return ({ movieDetailData, movieCastsData, movieVideosData, recommendedData })
}

export default function MovieDetailLayout() {
    const { 
        movieDetailData: { data: movieDetail }, 
        movieCastsData: { data: movieCasts }, 
        movieVideosData: { data: movieVideos }, 
        recommendedData: { data: recommendedMovies } } = useLoaderData()

    return (
        <motion.div className="px-4 lg:px-16"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 2}}>
            <MovieDetailOverview movieDetail={movieDetail} />

            <NavbarDetailLayout />

            <Outlet context={{recommendedMovies, movieCasts, movieVideos}}/>
        </motion.div>
    )
}