import { useState } from "react"

export default function Copy({password}) {

    const [isClicked, setIsClicked] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    async function copyToClipboard() {
        if (!password) {
            setIsClicked(true)
        } else {
            setIsClicked(true)
            await navigator.clipboard.writeText(password)
        }
        setTimeout(() => {
            setIsClicked(false)
        }, 1500)
    }

    return (
        <div 
        className="clipboard"
        onMouseEnter={() => setIsHovered(prevStat => !prevStat)}
        onMouseLeave={() => setIsHovered(prevStat => !prevStat)}
        onClick={copyToClipboard}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="#55F991" height="1em" viewBox="0 0 512 512">
                <path d="M272 0H396.1c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9V336c0 26.5-21.5 48-48 48H272c-26.5 0-48-21.5-48-48V48c0-26.5 21.5-48 48-48zM48 128H192v64H64V448H256V416h64v48c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V176c0-26.5 21.5-48 48-48z" />
            </svg>
            {isHovered && 
                <span className="">
                    {isClicked ? 
                        !password ? "Copy" 
                        : "Copied" 
                        : "Copy"}
                </span>
            }
        </div>
    )
}