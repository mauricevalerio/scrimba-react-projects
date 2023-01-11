import './Content.css'
import GooglePinLogo from '../images/google-pin-logo.png'

export default function Content(props) {
    let googleMapsText = 'View on Google Maps'
    return (
        <main className='main'>
            <img src={props.imageUrl} alt='Unsplashed Image' className='travel-image' />
            <section className='section-travel-info'>

                <section className="google-map-info-container">
                    <img src={GooglePinLogo} alt='Google Pin Logo' className='google-pin-logo' />
                    <span className='travel-location text-color-theme'>{props.location.toUpperCase()}</span>
                    <a href={props.googleMapsUrl} className='google-maps-link text-color-theme' target='_blank'>{googleMapsText}</a>
                </section>

                <h3 className='attraction-name margin-zero text-center text-color-theme'>{props.title}</h3>
                <p className='date-visited-text margin-zero text-center text-color-theme'>{`${props.startDate} - ${props.endDate}`}</p>
                <p className='attraction-description margin-zero text-center text-color-theme'>{props.description}</p>
            </section>
        </main>
    )
}