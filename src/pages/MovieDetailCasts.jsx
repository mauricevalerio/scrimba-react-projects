import { useOutletContext } from "react-router-dom"
import CastFallbackImage from "../assets/cast-fallback.svg"

export default function MovieDetailCasts() {
    const { movieCasts: { cast } } = useOutletContext()

    const castElements = cast.map(person => {
        return <div key={person.id} className="flex flex-col max-w-[125px]">
            <img 
            src={person.profile_path ? `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}${person.profile_path}` : CastFallbackImage}
            alt={`Picture of ${person.name}`} 
            className="max-w-[150px] h-52 rounded-2xl"/>
            <p className="text-neutral-100 text-s text-center">{person.name}</p>
            <p className="text-sm text-center">{person.character}</p>
        </div>
    })

    return (
        <div className="flex overflow-x-auto gap-4">
            {castElements}
        </div>
    )
}