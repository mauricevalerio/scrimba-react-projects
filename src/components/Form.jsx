import { getType } from "./generatePassword"
import { useState } from "react"
import Copy from "./Copy"

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
        
        //gets all the properties/method names
        const keys = Object.keys(getType)

        while (tempPassword.length < parseInt(passwordLength)) {

            //generates random property of the object
            let randomProperty = keys[Math.floor(Math.random() * keys.length)]

            //gets the method name
            if (requirements[randomProperty]) {
                //runs the method and returns a character for the password
                tempPassword += getType[randomProperty]()
            }
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


