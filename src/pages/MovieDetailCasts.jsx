import { useOutletContext } from "react-router-dom"
import CastFallbackImage from "../assets/cast-fallback.svg"

export default function MovieDetailCasts() {
    const { movieCasts: { cast } } = useOutletContext()

    const castElements = cast.map(person => {
        return <div key={person.id} className="flex flex-col">
            <img 
            src={person.profile_path ? `https://image.tmdb.org/t/p/w500${person.profile_path}` : CastFallbackImage}
            alt={`Picture of ${person.name}`} 
            className="max-w-none w-[125px] min-h-180 rounded-2xl"/>
            <p className="text-neutral-100 text-s text-center">{person.name}</p>
            <p className="text-s text-center">{person.character}</p>
        </div>
    })

    return (
        <section className="flex overflow-x-scroll gap-4 p-4">
            {castElements}
        </section>
    )
}