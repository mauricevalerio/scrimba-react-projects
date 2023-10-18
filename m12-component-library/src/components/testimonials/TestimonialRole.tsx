import { ChildrenProp } from '../../types'
import { useTestimonialContext } from './Testimonial'

export const TestimonialRole: React.FC<ChildrenProp> = ({ children }) => {
    const { imgSrc } = useTestimonialContext()
    return (
        <p className='testimonial__role' style={{ color: `${imgSrc ? '' : '#111827'}` }}>{children}</p>
    )
}