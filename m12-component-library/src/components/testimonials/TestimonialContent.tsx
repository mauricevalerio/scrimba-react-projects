import { ChildrenProp } from '../../types'
import { useTestimonialContext } from './Testimonial'
import QuoteLogo from '../../assets/testimonials/quote.svg'
import LogoWithoutImage from '../../assets/testimonials/logo-without-image.svg'

export const TestimonialContent: React.FC<ChildrenProp> = ({ children }) => {
    const { imgSrc } = useTestimonialContext()
    return (
        <div className={`${imgSrc ? 'testimonial__content--withImg' : 'testimonial__content--withoutImg'}`}>
            {!imgSrc && <img src={LogoWithoutImage} alt="Default Image" />}
            {imgSrc && <img src={QuoteLogo} alt='Double Quote' />}
            <p className='testimonial__content' style={{ color: `${imgSrc ? '' : '#111827'}` }}>{children}</p>
        </div >

    )
}