import { Outlet, NavLink, useLoaderData } from "react-router-dom"
import axios from "axios"

export async function loader({ params }) {
    const [ movieDetailData, movieCastsData, movieVideosData ] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=04b475fff6298d4658fe5907880a9547&language=en-US`),
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=04b475fff6298d4658fe5907880a9547`),
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=04b475fff6298d4658fe5907880a9547`)
        ])
        return ({ movieDetailData, movieCastsData, movieVideosData })

}

export default function MovieDetailLayout() {
    const { movieDetailData, movieCastsData, movieVideosData } = useLoaderData()

    const { data: movieDetail } = movieDetailData
    const { data: movieCasts } = movieCastsData
    const { data: movieVideos } = movieVideosData

    return (
        <section className="pb-4">
            <img 
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} 
            alt={`Poster for the movie ${movieDetail.title}`} 
            className="object-cover shadow-md shadow-neutral-900"/>
            
            <nav className="flex gap-4 p-4 text-lg uppercase">
                <NavLink
                to="."
                end
                className={({isActive}) => isActive ? "underline font-bold" : null}>
                    Overview
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
            context={{movieDetail, movieCasts, movieVideos}}/>
        </section>
    )
}