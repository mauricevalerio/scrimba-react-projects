import { ChildrenProp } from '../../types'
import { useTooltipContext } from './Tooltip'

function lightTitleLookup(variant: 'NORMAL' | 'BLUE' | 'PINK' | 'GREEN' | undefined) {
    let variantStyle: string = ''
    switch (variant) {
        case 'NORMAL':
            variantStyle = '#111827'
            break;
        case 'BLUE':
            variantStyle = '#1E40AF'
            break;
        case 'PINK':
            variantStyle = '#A9229B'
            break;
        case 'GREEN':
            variantStyle = '#137A2A'
            break;
        default:
            variantStyle = '#111827'
            break;
    }
    return variantStyle
}

export const TooltipTitle: React.FC<ChildrenProp> = ({ children }) => {
    const { style, variant } = useTooltipContext()

    const titleStyle = style?.toUpperCase() === 'BOLD' ? '#FFF'
        : style?.toUpperCase() === 'LIGHT' ? lightTitleLookup(variant)
            : '#FFF'

    return (
        <>
            <p style={{ color: `${titleStyle}`, fontWeight: 500 }}>{children}</p>
        </>
    )
}