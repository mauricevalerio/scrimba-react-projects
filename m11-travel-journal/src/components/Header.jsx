import './Header.css'
import GlobeHeaderLogo from '../images/globe-header-logo.png'

export default function Header() {
    return (
        <header className="header">
            <img src={GlobeHeaderLogo} alt="Globe Logo" className='header-logo' />
            <h1>My travel journal.</h1>
        </header>
    )
}