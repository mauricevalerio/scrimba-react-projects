import { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'

import { 
    useNavigation, 
    Form, 
    redirect,
    useLoaderData
} from "react-router-dom"

export function loader({request}) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({request}) {
    return redirect(`${new URL(request.url).searchParams.get("redirectTo") || "/host"}`)
}

export default function Login() {
    const loader = useLoaderData()
    const navigation = useNavigation()
    const { handleLogin } = useContext(LoginContext)

    return (
        <section className='login'>
            <h1>Sign in to your account!</h1>
            {loader && <h3 className="login__message">{loader}</h3>}
            <Form method="POST" autoComplete="off" replace>

                <input type="text" name="username" placeholder="Username" required/>
                <input type="password" name="password" placeholder="Password" required/>

                <button
                onClick={handleLogin}
                disabled={navigation.state === "submitting" ? true : false}>Sign in</button>
            </Form>
            <p className="login__createAccount">Don't have an account? 
            <span className="login__createAccount--orangeText"> Create one now</span>
            </p>
        </section>
    )
}