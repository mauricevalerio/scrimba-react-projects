import star from '../assets/star.png'

export default function Card(props) {
    let badgeText
    if (props.card.openSpots === 0) {
        badgeText = "SOLD OUT"
    } else if (props.card.location === "Online") {
        badgeText = "ONLINE"
    }
    return (
        <section className='card'>
            {badgeText && <div className='card-badge'>{badgeText}</div>}
            <img src={`./${props.card.coverImg}`} className='card-image' />
            <div className='card-details-container'>
                <img src={star} alt="Red Star Icon" className='card-star-image' />
                <span className='card-text-style'>{props.card.stats.rating.toFixed(1)}</span>
                <span className='card-text-style'>({props.card.stats.reviewCount}) &#x2022;</span>
                <span className='card-text-style'>{props.card.location}</span>
            </div>
            <p className='card-description card-text-style'>{props.card.title}</p>
            <p className='card-price card-text-style'><strong>From ${props.card.price}</strong> / person</p>
        </section>
    )
}