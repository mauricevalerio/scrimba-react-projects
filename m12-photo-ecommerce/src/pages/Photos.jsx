import { useContext } from "react"
import { PhotoContext } from "../components/Context"
import Image from "../components/Image"
import { getClass } from "../utils/index"

export default function Photos() {
    const { photos } = useContext(PhotoContext)
    
    const photosElements = photos.map((photo, index) => (
        <Image 
        key={photo.id}
        photo={photo}
        className={getClass(index)}
        />
    ))
    
    return (
        <main className="photos">
            {photosElements}
        </main>
    )
}