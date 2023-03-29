import { useOutletContext } from "react-router-dom"
import CastFallbackImage from "../../assets/cast-fallback.svg"

export default function TvDetailCasts() {
    const { tvCasts: { cast } } = useOutletContext()
    
    const castTvElements = cast.map(person => {
        return <div key={person.id} className="flex flex-col max-w-[150px]">
            <img 
            src={person.profile_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${person.profile_path}` : CastFallbackImage}
            alt={`Picture of ${person.name}`} 
            className="max-w-[150px] h-52 rounded-2xl"/>
            <p className="text-neutral-100 text-s text-center">{person.name}</p>
            <p className="text-sm text-center">{person.character}</p>
        </div>
    })

    return (
        <div className="flex overflow-x-auto py-4 gap-4">
            {castTvElements.length ? castTvElements : <h1 className="text-2xl pb-4">No casts found &#9785;</h1>}
        </div>
    )
}