import { useBannerContext } from './Banner'
import { ChildrenProp } from '../../types'

export const BannerTitle: React.FC<ChildrenProp> = ({ children }) => {
    const { status } = useBannerContext()
    return children && <p className={`children__text banner__title banner__title--${status?.toLowerCase()}`}>
        {children}
    </p>
}