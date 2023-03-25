
import axios from "axios"
import { useRef } from "react"
import { useLoaderData } from "react-router-dom"
import HomeDefaultTemplateContainer from "../components/HomeDefaultTemplateContainer"
import HomeDefaultTemplate from "../components/HomeDefaultTemplate"
import HomeFeaturedTemplate from "../components/HomeFeaturedTemplate"
import HomeHeroCarousel from "../components/HomeHeroCarousel"

export async function loader() {    
    try {
        const [ popularData, topRatedData, upcomingData ] = await Promise.all([
            axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}movie/popular?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
            axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}movie/top_rated?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}&page=1`),
            axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}movie/upcoming?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}&page=1`)
        ])
        
        return ({ popularData, topRatedData, upcomingData })
    } catch (e) {
        throw {
            message: e.message
        }
    }
}

export default function Home() {
    const {
        popularData: { data: popularMovies }, 
        topRatedData: { data: topRatedMovies },
        upcomingData: { data: upcomingMovies }
    } = useLoaderData()
    
    const { current: featuredMovie } = useRef(upcomingMovies.results[ Math.floor(Math.random() * popularMovies.results.length)])

    return (
        <>
            <div className="px-4 lg:px-16">
                <HomeHeroCarousel itemsCarousel={popularMovies}/>

                <HomeDefaultTemplateContainer title="Top Rated">
                    <HomeDefaultTemplate items={topRatedMovies} />
                </HomeDefaultTemplateContainer>

                <HomeDefaultTemplateContainer title="Featured">
                    <HomeFeaturedTemplate featuredItem={featuredMovie} />
                </HomeDefaultTemplateContainer>

                <HomeDefaultTemplateContainer title="Upcoming Releases">
                    <HomeDefaultTemplate items={upcomingMovies} />
                </HomeDefaultTemplateContainer>
            </div>
        </>
    )
}

