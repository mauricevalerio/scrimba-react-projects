import { ChildrenProp } from '../../types'
import { useTooltipContext } from './Tooltip'

function boldContentLookup(variant: 'NORMAL' | 'BLUE' | 'PINK' | 'GREEN' | undefined) {
    let variantStyle: string = ''
    switch (variant) {
        case 'NORMAL':
            variantStyle = '#C7C7C7'
            break;
        case 'BLUE':
            variantStyle = '#E8EDFF'
            break;
        case 'PINK':
            variantStyle = '#FFE9FD'
            break;
        case 'GREEN':
            variantStyle = '#E3FFE9'
            break;
        default:
            variantStyle = '#C7C7C7'
            break;
    }

    return variantStyle
}

function lightContentLookup(variant: 'NORMAL' | 'BLUE' | 'PINK' | 'GREEN' | undefined) {
    let variantStyle: string = ''
    switch (variant) {
        case 'NORMAL':
            variantStyle = '#6B7280'
            break;
        case 'BLUE':
            variantStyle = '#1C51B9'
            break;
        case 'PINK':
            variantStyle = '#C7369E'
            break;
        case 'GREEN':
            variantStyle = '#3C8C4E'
            break;
        default:
            variantStyle = '#6B7280'
            break;
    }
    return variantStyle
}

export const TooltipContent: React.FC<ChildrenProp> = ({ children }) => {
    const { style, variant } = useTooltipContext()

    let contentStyle = style?.toUpperCase() === 'BOLD' ? boldContentLookup(variant)
        : style?.toUpperCase() === 'LIGHT' ? lightContentLookup(variant)
            : boldContentLookup(variant)

    return (
        <>
            <p style={{ color: `${contentStyle}` }}>{children}</p>
        </>
    )
}