import { useState, useRef, useEffect } from "react";

export default function useHover() {
    const ref = useRef(null)

    const [hovered, setHovered] = useState(false)

    const hoverEnter = () => { setHovered(true) }

    const hoverLeave = () => { setHovered(false) }

    useEffect(() => {
        ref.current.addEventListener("mouseenter", hoverEnter)
        ref.current.addEventListener("mouseleave", hoverLeave)
    }, [])

    return [hovered, ref]
}