import { useRouteError } from "react-router-dom"
import { motion } from "framer-motion"

export default function Error() {
    const error = useRouteError()
    console.log(error)

    return (
        <motion.div className="flex flex-col text-center items-center gap-2 pt-32"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{duration: 2}}>
            <h1 className="text-5xl">An unexpected error occurred &#9785;</h1>
            <pre className="font-bold">Error Message: {error.message}</pre>
            <p>Kindly report it to our team. Thank you and sorry for any inconvenience caused.</p>
        </motion.div>
    )
}