import { createContext, useContext } from 'react'
import { CardTitle } from './CardTitle'
import { CardContent } from './CardContent'
import CardImageDefault from '../../assets/cards/card-image-default.svg'

type CardProp = {
    icon?: JSX.Element
    iconBackground?: string
    titleColor?: string
    contentColor?: string
    cardBackground?: string
    children: React.ReactNode
}

type DefaultContext = {
    titleColor?: string,
    contentColor?: string
}

export const CardContext = createContext<DefaultContext>({
    titleColor: '',
    contentColor: ''
})

export const useCardContext = () => useContext(CardContext)

export const Card: React.FC<CardProp> & {
    Title: typeof CardTitle,
    Content: typeof CardContent
} = ({ icon, iconBackground, titleColor, contentColor, cardBackground, children }) => {
    console.log(icon)
    return (
        <CardContext.Provider value={{ titleColor, contentColor }}>
            <div className='card' style={{ backgroundColor: `${cardBackground}` }}>
                <div className='card__image' style={{ backgroundColor: `${iconBackground}` }}>
                    {
                        icon ? icon
                            :
                            <img src={CardImageDefault} alt='Default Card Image' />
                    }
                </div>
                {children}
            </div>
        </CardContext.Provider>
    )
}

Card.Title = CardTitle
Card.Content = CardContent