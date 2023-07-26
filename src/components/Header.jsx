import PasswordLogo from "../assets/password-logo.svg"

export default function Header() {
    return (
        <header>
            <h1>Password Generator</h1>
            <img src={PasswordLogo} alt="Passport SVG black and white" />
		</header>
    )
}