import { useBannerContext } from './Banner'
import { ChildrenProp } from '../../types'

export const BannerContent: React.FC<ChildrenProp> = ({ children }) => {
    const { status } = useBannerContext()
    return children && <p className={`text banner__content banner__content--${status?.toLowerCase()}`}>
        {children}
    </p>
}