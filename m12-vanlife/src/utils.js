import { redirect } from "react-router-dom"

export const requireAuth = async (request) => {
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedin'))
    const pathname = new URL(request.url).pathname

    if (!isLoggedIn) {
        throw redirect(`/login?message=You must log in first&redirectTo=${pathname}`)
    }
}