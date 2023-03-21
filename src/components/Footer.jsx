import TmdbLogo from "../assets/tmdb-logo.svg"

export default function Footer() {
    return (
        <footer className="bg-[#0d253f] p-8">
            <a href="https://www.themoviedb.org/" target="_blank"><img src={TmdbLogo} alt="Logo of The Movie Database" /></a>
        </footer>
    )
}

// https://www.npmjs.com/package/react-lite-youtube-embed
//https://vitejs.dev/
//https://reactrouter.com/en/main