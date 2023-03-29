
import axios from "axios"
import { useRef } from "react"
import { useLoaderData } from "react-router-dom"
import HomeDefaultTemplateContainer from "../components/home/HomeDefaultTemplateContainer"
import HomeDefaultTemplate from "../components/home/HomeDefaultTemplate"
import HomeFeaturedTemplate from "../components/home/HomeFeaturedTemplate"
import HomeFeaturedTemplateAlt from "../components/home/HomeFeaturedTemplateAlt"
import HomeHeroCarousel from "../components/home/HomeHeroCarousel"
import HomeLargeCardTemplate from "../components/home/HomeLargeCardTemplate"
import { motion } from "framer-motion"

export async function loader() {
    try {
        const [ 
            popularMovieData, topRatedMovieData, upcomingMovieData,
            topRatedTvData, trendingTvData
        ] = await Promise.all([
            axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_MOVIE_MEDIA_TYPE}/popular?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
            axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_MOVIE_MEDIA_TYPE}/top_rated?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
            axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_MOVIE_MEDIA_TYPE}/upcoming?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
            axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_TV_MEDIA_TYPE}/top_rated?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
            axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}trending/${import.meta.env.VITE_TMDB_TV_MEDIA_TYPE}/day?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`)
        ])
        
        return ({ popularMovieData, topRatedMovieData, upcomingMovieData, topRatedTvData, trendingTvData })
    } catch (e) {
        throw {
            message: e.message
        }
    }
}

export default function Home() {
    const {
        popularMovieData: { data: popularMovies }, 
        topRatedMovieData: { data: topRatedMovies },
        upcomingMovieData: { data: upcomingMovies },
        topRatedTvData: { data: topRatedTv },
        trendingTvData: { data: trendingTv },
    } = useLoaderData()
    const { current: featuredMovie } = useRef(upcomingMovies.results[ Math.floor(Math.random() * upcomingMovies.results.length)])
    const { current: featuredSeries } = useRef(topRatedTv.results[ Math.floor(Math.random() * topRatedTv.results.length)])

    return (
        <motion.div className="p-4 lg:px-16"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 2}}>
            <HomeHeroCarousel itemsCarousel={popularMovies}/>

            <HomeDefaultTemplateContainer title="Top Rated Movies">
                <HomeDefaultTemplate items={topRatedMovies} />
            </HomeDefaultTemplateContainer>

            <HomeDefaultTemplateContainer title="Featured Movie">
                <HomeFeaturedTemplate featuredItem={featuredMovie} />
            </HomeDefaultTemplateContainer>

            <HomeDefaultTemplateContainer title="Upcoming Movie Releases">
                <HomeDefaultTemplate items={upcomingMovies} />
            </HomeDefaultTemplateContainer>

            <HomeDefaultTemplateContainer title="Top Rated TV Series">
                <HomeLargeCardTemplate itemsLargeCard={topRatedTv}/>
            </HomeDefaultTemplateContainer>

            <HomeDefaultTemplateContainer title="Featured TV Series">
                <HomeFeaturedTemplateAlt featuredItem={featuredSeries} />
            </HomeDefaultTemplateContainer>

            <HomeDefaultTemplateContainer title="Trending TV Series">
                <HomeDefaultTemplate items={trendingTv} />
            </HomeDefaultTemplateContainer>
        </motion.div>
    )
}

