import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faSquareFacebook, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons'

export default function SocialMedia() {
    return (
        <div className='socialMediaContainer'>
            <FontAwesomeIcon icon={faTwitter} className='twitterIcon' />
            <FontAwesomeIcon icon={faSquareFacebook} className='facebookIcon' />
            <FontAwesomeIcon icon={faInstagram} className='instagramIcon' />
            <FontAwesomeIcon icon={faGithub} className='githubIcon' />
        </div>
    )
}