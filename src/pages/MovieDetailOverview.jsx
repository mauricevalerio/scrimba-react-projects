import { useOutletContext } from "react-router-dom"

export default function MovieDetailOverview() {
    const { movieDetail } = useOutletContext()
    
    const movieGenreElements = movieDetail.genres.map((genre, index) => {
        return <span key={index} className="border-2 px-2 rounded border-current block">
            {genre.name}
        </span>
    })

    return (
        <section>
            <div className="flex flex-col gap-4 px-2">

                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">{movieDetail.title}</h1>
                    <div className="flex gap-2 flex-wrap text-lg">
                        <span>{movieDetail.release_date.slice(0, 4)} &#x2022;</span>
                        <span>{movieDetail.runtime} minutes</span>
                    </div>
                    <div className="flex gap-1 text-lg">
                        {movieGenreElements}
                    </div>
                </div>

                {movieDetail.overview && <p className="text-justify text-lg">{movieDetail.overview}</p>}
            </div>
        </section>
    )
}

/*

DISCOVER
FIND
GENRES

SEARCH
*/