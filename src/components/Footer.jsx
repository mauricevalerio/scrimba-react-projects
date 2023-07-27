import TmdbLogo from "../assets/tmdb-logo.svg"

export default function Footer() {
    return (
        <div className="flex flex-col gap-2 bg-[#0d253f] p-2">
            <p className="text-lg text-center">
                Built with <a href="https://vitejs.dev/" target="_blank" className="font-bold hover:underline">Vite</a>
                , <a href="https://reactrouter.com/en/main" target="_blank" className="font-bold hover:underline">React Router</a>
                , <a href="https://www.npmjs.com/package/react-responsive-carousel" target="_blank" className="font-bold hover:underline">React Carousel</a>
                , <a href="https://www.npmjs.com/package/react-infinite-scroll-component" target="_blank" className="font-bold hover:underline">React Infinite Scroll</a>
                , <a href="https://www.npmjs.com/package/framer-motion" target="_blank" className="font-bold hover:underline">Framer Motion</a>
            </p>

            <p className="text-lg text-center">
                Data sourced from <a href="https://www.themoviedb.org/" target="_blank" className="font-bold hover:underline">The Movie Database</a>
            </p>
            
            <img src={TmdbLogo} alt="Logo of The Movie Database" className="max-w-[200px] block mx-auto"/>
        </div>
    )
}