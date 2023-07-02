import { getType } from "../generatePassword"
import { useState } from "react"
import { FaCopy } from "react-icons/fa6"

export default function Form() {

    const [passwordLength, setPasswordLength] = useState(36)
    const [password, setPassword] = useState("")
    const [isPasswordGenerated, setIsPasswordGenerated] = useState(false)
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
        setIsPasswordGenerated(true)

        let tempPassword = ""
        while (tempPassword.length < parseInt(passwordLength)) {

            //stores the function chsen to typeAdder
            let typeAdder = getType[Math.floor(Math.random() * getType.length)]

            //references the function name using bracket notation
            if (requirements[typeAdder.name]) tempPassword += typeAdder()
        }
        setPassword(tempPassword)
    }

    async function copyToClipboard(e) {
        await navigator.clipboard.writeText(password)
        e.target.dataset.hover = "Copied!"
    }
    
    return (
        <>
            <form onSubmit={generatePassword}>
                <div className="input-container">
                    <label htmlFor="passwordLength">Length</label>
                    <input 
                    type="range" 
                    min="8" 
                    max="64" 
                    className="slider" 
                    id="passwordLength" 
                    name="passwordLength"
                    value={passwordLength}
                    onChange={handlePasswordLength}/> 
                    <span>{passwordLength}</span>
                </div>

                <div className="input-container">
                    <input 
                    type="checkbox" 
                    id="uppercase" 
                    name="uppercase" 
                    checked={requirements.uppercase}
                    onChange={handleRequirements}
                    className="checkbox-design" />
                    <label htmlFor="uppercase">Uppercase</label>
                </div>

                <div className="input-container">
                    <input 
                    type="checkbox" 
                    id="symbols" 
                    name="symbols"
                    checked={requirements.symbols}
                    onChange={handleRequirements}
                    className="checkbox-design" />
                    <label htmlFor="symbols">Symbols</label>
                </div>

                <div className="input-container">
                    <input 
                    type="checkbox" 
                    id="numbers" 
                    name="numbers"
                    checked={requirements.numbers}
                    onChange={handleRequirements}
                    className="checkbox-design" />
                    <label htmlFor="numbers">Numbers</label>
                </div>
                
                <div>
                    <button>Generate password</button>
                </div>
            </form>
            {isPasswordGenerated 
                && 
            <div className="password-container">{password} 
                <FaCopy 
                className="clipboard"
                data-hover="" 
                onMouseOver={(e) => e.target.dataset.hover = "Copy"}
                onClick={copyToClipboard}
                />
            </div>}
        </>
    )
}