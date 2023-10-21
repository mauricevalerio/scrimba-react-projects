import { createContext, useContext } from 'react'
import { TestimonialName } from './TestimonialName'
import { TestimonialContent } from './TestimonialContent'
import { TestimonialRole } from './TestimonialRole'

type TestimonialProp = {
    imgSrc?: string
    bgColor?: string
    content?: string
    name?: string
    title?: string
    children?: React.ReactNode
}

type DefaultContext = {
    imgSrc?: string
    bgColor?: string
}

export const TestimonialContext = createContext<DefaultContext>({
    imgSrc: '',
    bgColor: '',
})

export const useTestimonialContext = () => useContext(TestimonialContext)

export const Testimonial: React.FC<TestimonialProp> & {
    Content: typeof TestimonialContent,
    Name: typeof TestimonialName,
    Role: typeof TestimonialRole
} = ({ imgSrc, bgColor, children }) => {

    return (
        <TestimonialContext.Provider value={{ imgSrc, bgColor }}>
            <div className='testimonial'
                style={{ background: `${bgColor ? bgColor : '#2545B8'}` }}>
                {imgSrc && <img src={imgSrc} alt='Image Testimonial' className='testimonial__img' />}

                <div className={`${imgSrc ? '' : 'default__img'}`}>{children}</div>
            </div>
        </TestimonialContext.Provider>
    )
}

Testimonial.Content = TestimonialContent
Testimonial.Name = TestimonialName
Testimonial.Role = TestimonialRole