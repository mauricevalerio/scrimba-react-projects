import { useRouteError } from "react-router-dom";

export default function Error() {
    const error = useRouteError()
    console.log(error)

    return (
        <div className="flex flex-col gap-2 my-auto">
            <h1 className="text-2xl">An unexpected error occurred &#9785;</h1>
            <pre>{error.message}</pre>
            <p>Kindly report it to our team.</p>
            <p>Thank you and sorry for any inconvenience caused.</p>
        </div>
    )
}