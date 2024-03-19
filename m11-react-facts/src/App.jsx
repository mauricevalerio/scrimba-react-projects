import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  function handleDarkMode() {
    setDarkMode((prevMode) => !prevMode);
  }

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <Header darkMode={darkMode} toggleDarkMode={handleDarkMode} />
      <Main darkMode={darkMode} />
    </div>
  );
}
