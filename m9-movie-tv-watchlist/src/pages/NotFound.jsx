import { Link } from "react-router-dom"
import { motion } from "framer-motion"

export default function NotFound() {
    return (
        <motion.div className="flex flex-col gap-y-4 text-center items-center pt-32"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 2}}>
            <h1 className="text-5xl font-bold">404</h1>
            <h2 className="text-5xl font-bold uppercase">Page Not Found &#9785;</h2>
            <Link to="/" className="uppercase rounded-lg border-2 p-2 transition-all duration-300 ease-out
            hover:scale-105 hover:bg-white hover:text-black">
                Go back to home page
            </Link>
        </motion.div>
    )
}