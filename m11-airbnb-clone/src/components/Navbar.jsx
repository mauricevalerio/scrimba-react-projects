import airbnbLogo from '../assets/airbnb-logo.png'

export default function Navbar() {

    return (
        <nav>
            <img src={airbnbLogo} alt="Airbnb Logo" className='airbnb-logo' />
        </nav>
    )
}