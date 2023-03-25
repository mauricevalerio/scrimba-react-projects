import { Outlet, NavLink, useLoaderData } from "react-router-dom"
import axios from "axios"
import MovieSeriesFallback from "../assets/movie-series-fallback.svg"

export async function loader({ params }) {
    const [ movieDetailData, movieCastsData, movieVideosData, recommendedData ] = await Promise.all([
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}movie/${params.movieId}?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}movie/${params.movieId}/credits?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}movie/${params.movieId}/videos?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}movie/${params.movieId}/recommendations?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`)
        ])
        return ({ movieDetailData, movieCastsData, movieVideosData, recommendedData })
}

export default function MovieDetailLayout() {
    const { 
        movieDetailData: { data: movieDetail }, 
        movieCastsData: { data: movieCasts }, 
        movieVideosData: { data: movieVideos }, 
        recommendedData: { data: recommendedMovies } } = useLoaderData()

    const movieGenreElements = movieDetail.genres.map((genre, index) => {
        return <span key={index} className="border-2 px-2 rounded border-current block">
            {genre.name}
        </span>
    })
        
    return (
        <div className="px-4 lg:px-16">
            <div className="relative">
                <img 
                src={movieDetail.backdrop_path ? `${import.meta.env.VITE_TMDB_IMAGE_BACKDROP_ORIGINAL_URL}${movieDetail.backdrop_path}` : MovieSeriesFallback} 
                alt={`Poster for the movie ${movieDetail.title}`} 
                className="object-cover lg:rounded-lg lg:max-h-[640px] w-full opacity-25"/>

                <div className="flex flex-col gap-4 lg:p-4 lg:absolute lg:inset-y-1/3 lg:w-3/4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl lg:text-5xl font-bold">{movieDetail.title}</h1>
                        <div className="flex gap-2 text-lg">
                            <span>{movieDetail.release_date.slice(0, 4) || "TBA"} &#x2022;</span>
                            <span>{movieDetail.runtime ? ` ${movieDetail.runtime} minutes`: "Runtime not specified"}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 text-lg">
                            {movieGenreElements}
                        </div>
                    </div>
                    {movieDetail.overview && <p className="text-justify text-lg">{movieDetail.overview || "No overview specified"}</p>}
                </div>
            </div>

            <nav className="flex gap-4 py-4 my-4 text-lg uppercase border-b-2 border-b-white">
                <NavLink
                to="."
                end
                className={({isActive}) => isActive ? "underline font-bold" : null}>
                    Recommended
                </NavLink>

                <NavLink
                to="casts"
                className={({isActive}) => isActive ? "underline font-bold" : null}>
                    Casts
                </NavLink>

                <NavLink
                to="videos"
                className={({isActive}) => isActive ? "underline font-bold" : null}>
                    Videos
                </NavLink>
            </nav>

            <Outlet 
            context={{recommendedMovies, movieCasts, movieVideos}}/>

        </div>
    )
}