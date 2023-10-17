import { ChildrenProp } from '../../types'
import { useCardContext } from './Card'

export const CardTitle: React.FC<ChildrenProp> = ({ children }) => {
    const { titleColor } = useCardContext()
    return children && <p className='card__title' style={{ color: `${titleColor ? titleColor : ''}` }}>
        {children}</p>
}