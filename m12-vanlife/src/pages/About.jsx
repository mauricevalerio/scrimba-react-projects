import { Link } from 'react-router-dom'
import about from '../assets/about.png'

export default function About() {
    return (
        <section className='about'>
            <img src={about} alt='Camper sitting on top of a van looking up' className='about__img'/>
            
            <div className='about__inner'>
                <h2>Don’t squeeze in a sedan when you could relax in a van.</h2>
                
                <p className='about__inner--content'>Our mission is to enliven your road trip with the perfect travel van rental. Our vans are recertified before each trip to ensure your travel plans can go off without a hitch.
                (Hitch costs extra 😉)</p>
                <p className='about__inner--content'>Our team is full of vanlife enthusiasts who know firsthand the magic of touring the world on 4 wheels.</p>
                
                <div className='about__inner--cta'>
                    <h3>Your destination is waiting. <br /> Your van is ready.</h3>
                    <Link className='about__inner--cta--btn' to='/vans'>Explore our vans</Link>
                </div>
            </div>
        </section>
    )
}