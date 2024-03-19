import { createContext, useState } from 'react'

export const LoginContext = createContext()

function LoginContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(JSON.parse(localStorage.getItem('loggedin')))

    const handleLogin = () => {
        localStorage.setItem('loggedin', true)
        setIsLoggedIn(true)
    }

    const handleLogOut = () => {
        localStorage.setItem('loggedin', false)
        setIsLoggedIn(false)
    }

    return(
        <LoginContext.Provider value={{isLoggedIn, handleLogin, handleLogOut}}>
            {children}
        </LoginContext.Provider>
    )

}

export default LoginContextProvider