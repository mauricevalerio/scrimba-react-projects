import { ChildrenProp } from '../../types'
import { useTestimonialContext } from './Testimonial'

export const TestimonialName: React.FC<ChildrenProp> = ({ children }) => {
    const { imgSrc } = useTestimonialContext()
    return (
        <p className='testimonial__name' style={{ color: `${imgSrc ? '' : '#111827'}` }}>{children}</p>
    )
}