import { useOutletContext } from "react-router-dom"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel"

export default function MovieDetailVideos() {
    const { movieVideos: { results } } = useOutletContext()
    
    const videoElements = results.map(video => {
        return video.site === "YouTube" ?
            <div key={video.key} className="video-responsive rounded-lg bg-black p-4">
            <iframe
            src={`https://www.youtube.com/embed/${video.key}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.name}
            />
            </div> 
        : null
    })
    
    return (
        <>
            {videoElements.length ? 
                <Carousel
                showStatus={false}
                showThumbs={false}
                className="max-w-[1024px] pb-4 mx-auto">
                    {videoElements}
                </Carousel> : 
                <h1 className="text-2xl pb-4">No videos found &#9785;</h1>
            }
        </>
    )
}