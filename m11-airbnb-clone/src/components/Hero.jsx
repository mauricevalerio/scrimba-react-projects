import heroPhotoGrid from '../assets/photo-grid.png'

export default function Hero() {

    return (
        <section className='hero'>
            <img src={heroPhotoGrid} alt="Hero Photo Grid" className='hero-photo-grid' />
            <h1>Online Experiences</h1>
            <p>Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.</p>
        </section>
    )
}