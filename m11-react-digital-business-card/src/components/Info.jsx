import ProfilePic from '../assets/profile-picture.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

export default function Info() {
    return (
        <div className='infoContainer'>
            <img src={ProfilePic} alt='Profile Picture' className='infoProfilePic' />
            <h1 className='infoName'>Maurice Valerio</h1>
            <p className='infoTitle'>Frontend Developer</p>
            <a href="mailto:mauricealbertvalerio@gmail.com" className='infoEmail'><small>mauricealbertvalerio@gmail.com</small></a>

            <div className='btnInfoContainer'>
                <button className='btnInfoEmail'><FontAwesomeIcon icon={faEnvelope} className='envelopeIcon' /><span>Email</span></button>
                <button className='btnInfoLinkedin'><FontAwesomeIcon icon={faLinkedin} className='linkedinIcon' /><span>LinkedIn</span></button>
            </div>

        </div>
    )
}