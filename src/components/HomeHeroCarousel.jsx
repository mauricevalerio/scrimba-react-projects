import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"
import { Link } from "react-router-dom"

export default function HomeHeroCarousel(props) {
    return (
        <Carousel 
        showStatus={false} 
        showThumbs={false}
        showIndicators={false}
        infiniteLoop={true}>
            {
                props.itemsCarousel.results.map(movie => {
                return <Link
                to={`movies/${movie.id}`}
                key={movie.id}>
                    <div className="relative">
                        <img src={`${import.meta.env.VITE_TMDB_IMAGE_BACKDROP_ORIGINAL_URL}${movie.backdrop_path}`}
                        alt={`Poster for the movie ${movie.title}`} className="object-cover opacity-25 w-auto lg:max-h-[640px]" />
                        <div className="absolute left-10 bottom-10 flex flex-col text-left w-1/2 lg:bottom-30">
                            <h2 className="uppercase font-bold text-xl">{movie.title} ({movie.release_date.slice(0, 4) || "TBA"})</h2>
                            <p className="hidden lg:block">{movie.overview}</p>
                        </div>
                    </div>
                </Link>
                })  
            } 
        </Carousel>
    )
}