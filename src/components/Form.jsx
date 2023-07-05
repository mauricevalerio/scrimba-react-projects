import { getType } from "../generatePassword"
import { useState } from "react"
import Copy from "./Copy"
// import { FaCopy } from "react-icons/fa6"

export default function Form() {

    const [passwordLength, setPasswordLength] = useState(36)
    const [password, setPassword] = useState("")
    const [requirements, setRequirements] = useState({
        "lowercase": true,
        "uppercase": false,
        "symbols": false,
        "numbers": false
    })
    
    const handlePasswordLength = (e) => setPasswordLength(e.target.value)

    const handleRequirements = (e) => {
        const { name, checked } = e.target
        setRequirements(prevRequirements => ({...prevRequirements, [name]: checked}))
    }
    
    function generatePassword(e) {
        e.preventDefault()

        let tempPassword = ""
        while (tempPassword.length < parseInt(passwordLength)) {

            //stores the function chsen to typeAdder
            let typeAdder = getType[Math.floor(Math.random() * getType.length)]

            //references the function name using bracket notation
            if (requirements[typeAdder.name]) tempPassword += typeAdder()
        }
        setPassword(tempPassword)
    }
    
    return (
        <>
            <div className="password-container">
                <div className="password-text">
                    {password}
                </div>
                <Copy password={password} />
            </div>

            <form onSubmit={generatePassword}>
                <div className="range-container">
                    <input 
                    type="range" 
                    min="8" 
                    max="64" 
                    className="slider" 
                    id="passwordLength" 
                    name="passwordLength"
                    value={passwordLength}
                    onChange={handlePasswordLength}
                    /> 
                    <span className="password-length">{passwordLength}</span>
                </div>

                <div className="checkbox-container">
                    <label htmlFor="uppercase">
                        <input 
                        type="checkbox" 
                        id="uppercase" 
                        name="uppercase" 
                        checked={requirements.uppercase}
                        onChange={handleRequirements}
                        className="checkbox-design" />
                    Uppercase
                    </label>

                    <label htmlFor="symbols">
                        <input 
                        type="checkbox" 
                        id="symbols" 
                        name="symbols"
                        checked={requirements.symbols}
                        onChange={handleRequirements}
                        className="checkbox-design" />
                    Symbols
                    </label>

                    <label htmlFor="numbers">
                    <input 
                    type="checkbox" 
                    id="numbers" 
                    name="numbers"
                    checked={requirements.numbers}
                    onChange={handleRequirements}
                    className="checkbox-design" />
                    Numbers
                    </label>
                </div>

                <button>Generate password</button>
            </form>
        </>
    )
}