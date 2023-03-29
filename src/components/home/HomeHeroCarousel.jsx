import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import { Link } from "react-router-dom"
import MovieSeriesFallback from "../../assets/movie-series-fallback.svg"

export default function HomeHeroCarousel(props) {
    
    return (
        <Carousel 
        showStatus={false} 
        showThumbs={false}
        showIndicators={false}
        infiniteLoop={true}>
            {
                props.itemsCarousel.results.map(movie => (
                <Link to={`movies/${movie.id}`} key={movie.id}>
                    <div className="relative">
                        <img src={movie.backdrop_path ? `${import.meta.env.VITE_TMDB_IMAGE_BACKDROP_ORIGINAL_URL}${movie.backdrop_path}` : MovieSeriesFallback}
                        alt={`Poster for the movie ${movie.title}`} 
                        className="opacity-25 rounded-xl lg:max-h-[600px]" />
                        <div className="text-left flex flex-col p-4 absolute bottom-5 md:gap-y-2 md:w-5/6">
                            <h2 className="uppercase font-bold text-2xl lg:text-4xl">{movie.title} ({movie.release_date ? movie.release_date.slice(0, 4) : "TBA"})</h2>
                            <p className="hidden md:block">{movie.overview}</p>
                        </div>
                    </div>
                </Link>
                ))  
            } 
        </Carousel>
    )
}