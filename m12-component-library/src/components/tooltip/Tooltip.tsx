import { createContext, useContext } from 'react'
import { TooltipLogo } from './TooltipLogo'
import { TooltipTitle } from './TooltipTitle'
import { TooltipContent } from './TooltipContent'
import { TooltipCrossLogo } from './TooltipCrossLogo'

type TooltipProp = {
    style?: 'BOLD' | 'LIGHT'
    variant?: 'NORMAL' | 'BLUE' | 'PINK' | 'GREEN'
    children?: React.ReactNode
}

type DefaultContext = {
    style?: 'BOLD' | 'LIGHT'
    variant?: 'NORMAL' | 'BLUE' | 'PINK' | 'GREEN'
}

export const TooltipContext = createContext<DefaultContext>({
    style: 'BOLD',
    variant: 'NORMAL'
})

export const useTooltipContext = () => useContext(TooltipContext)

function boldContentLookup(variant: 'NORMAL' | 'BLUE' | 'PINK' | 'GREEN' | undefined) {
    let variantStyle: string = ''
    switch (variant) {
        case 'NORMAL':
            variantStyle = '#262626'
            break;
        case 'BLUE':
            variantStyle = '#1E40AF'
            break;
        case 'PINK':
            variantStyle = '#A9229B'
            break;
        case 'GREEN':
            variantStyle = '#47AA5D'
            break;
        default:
            variantStyle = '#262626'
            break;
    }

    return variantStyle
}

function lightContentLookup(variant: 'NORMAL' | 'BLUE' | 'PINK' | 'GREEN' | undefined) {
    let variantStyle: string = ''
    switch (variant) {
        case 'NORMAL':
            variantStyle = '#FFF'
            break;
        case 'BLUE':
            variantStyle = '#E0E7FF'
            break;
        case 'PINK':
            variantStyle = '#FFF3FC'
            break;
        case 'GREEN':
            variantStyle = '#E7FFF3'
            break;
        default:
            variantStyle = '#FFF'
            break;
    }
    return variantStyle
}


export const Tooltip: React.FC<TooltipProp> & {
    Title: typeof TooltipTitle,
    Content: typeof TooltipContent
} = ({ style, variant, children }) => {

    const bgStyle = style?.toUpperCase() === 'BOLD' ? boldContentLookup(variant)
        : style?.toUpperCase() === 'LIGHT' ? lightContentLookup(variant)
            : boldContentLookup(variant)

    return (
        <TooltipContext.Provider value={{ style, variant }}>
            <div className='tooltip' style={{ backgroundColor: `${bgStyle}` }}>
                <div><TooltipLogo /></div>
                <div>{children}</div>
                <div><TooltipCrossLogo /></div>
            </div>
        </TooltipContext.Provider>
    )
}

Tooltip.Title = TooltipTitle
Tooltip.Content = TooltipContent

