import { Outlet, useLoaderData } from "react-router-dom"
import axios from "axios"
import TvDetailOverview from "../../pages/tv/TvDetailOverview"
import NavbarDetailLayout from "./NavbarDetailLayout"
import { motion } from "framer-motion"

export async function loader({ params }) {
    const [ tvDetailData, tvCastsData, tvVideosData, recommendedData ] = await Promise.all([
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_TV_MEDIA_TYPE}/${params.tvId}?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_TV_MEDIA_TYPE}/${params.tvId}/credits?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_TV_MEDIA_TYPE}/${params.tvId}/videos?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`),
        axios.get(`${import.meta.env.VITE_TMDB_BASE_API_URL}${import.meta.env.VITE_TMDB_TV_MEDIA_TYPE}/${params.tvId}/recommendations?api_key=${import.meta.env.VITE_TMDB_PUBLIC_API_KEY}`)
        ])
        return ({ tvDetailData, tvCastsData, tvVideosData, recommendedData })
}

export default function TvDetailLayout() {
    const { 
        tvDetailData: { data: tvDetail }, 
        tvCastsData: { data: tvCasts }, 
        tvVideosData: { data: tvVideos }, 
        recommendedData: { data: recommendedTv } } = useLoaderData()
        
        return (
            <motion.div className="px-4 lg:px-16"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2}}>
                <TvDetailOverview tvDetail={tvDetail} />
                <NavbarDetailLayout />
                <Outlet context={{recommendedTv, tvCasts, tvVideos}}/>
            </motion.div>
        )
}