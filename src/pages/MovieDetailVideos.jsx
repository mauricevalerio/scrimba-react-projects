import { useOutletContext } from "react-router-dom"
import LiteYouTubeEmbed from "react-lite-youtube-embed"
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css"

export default function MovieDetailVideos() {
    const { movieVideos: { results } } = useOutletContext()
    console.log(results)
    const videoElements = results.map(video => {
        return video.site === "YouTube" ?
        <div key={video.id}>
            <LiteYouTubeEmbed 
            id={video.key}
            title={video.name}
            nocookie={true}
            />
            <p>{video.name}</p>
        </div>
        : null
    })
    
    return (
        <section className="flex flex-col gap-4 px-4 max-w-2xl">
            {videoElements.length ? videoElements : <p>No videos found :(</p>}
        </section>
    )
}
