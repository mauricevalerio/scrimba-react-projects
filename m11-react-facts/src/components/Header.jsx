import logo from "../assets/reactjs-icon.png";

export default function Header(props) {
  return (
    <header className={`header ${props.darkMode ? "dark" : ""}`}>
      <img src={logo} alt="React Logo" className="react-logo" />
      <h1>ReactFacts</h1>

      <div className="toggler">
        <p className="toggler--light">Light</p>
        <div className="toggler--slider" onClick={props.toggleDarkMode}>
          <div className="toggler--slider--circle"></div>
        </div>
        <p className="toggler--dark">Dark</p>
      </div>
    </header>
  );
}
