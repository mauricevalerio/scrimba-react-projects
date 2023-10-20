import { useTooltipContext } from './Tooltip'

function boldLogoLookup(variant: 'NORMAL' | 'BLUE' | 'PINK' | 'GREEN' | undefined) {
    let variantStyle: string = ''
    switch (variant) {
        case 'NORMAL':
            variantStyle = '#C7C7C7'
            break;
        case 'BLUE':
            variantStyle = '#7EA6F2'
            break;
        case 'PINK':
            variantStyle = '#F462E6'
            break;
        case 'GREEN':
            variantStyle = '#C1FFCF'
            break;
        default:
            variantStyle = '#C7C7C7'
            break;
    }

    return variantStyle
}

function lightLogoLookup(variant: 'NORMAL' | 'BLUE' | 'PINK' | 'GREEN' | undefined) {
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
            variantStyle = '#41A557'
            break;
        default:
            variantStyle = '#6B7280'
            break;
    }
    return variantStyle
}

export const TooltipLogo: React.FC = () => {
    const { style, variant } = useTooltipContext()

    const logoStyle = style?.toUpperCase() === 'BOLD' ? boldLogoLookup(variant)
        : style?.toUpperCase() === 'LIGHT' ? lightLogoLookup(variant)
            : '#C7C7C7'

    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 13V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V13M20 13V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V13M20 13H17.4142C17.149 13 16.8946 13.1054 16.7071 13.2929L14.2929 15.7071C14.1054 15.8946 13.851 16 13.5858 16H10.4142C10.149 16 9.89464 15.8946 9.70711 15.7071L7.29289 13.2929C7.10536 13.1054 6.851 13 6.58579 13H4" stroke={logoStyle} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
}