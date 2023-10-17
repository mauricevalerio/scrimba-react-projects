import { ChildrenProp } from '../../types'
import { useCardContext } from './Card'

export const CardContent: React.FC<ChildrenProp> = ({ children }) => {
    const { contentColor } = useCardContext()
    return children && <p className='card__content' style={{ color: `${contentColor ? contentColor : ''}` }}>
        {children}</p>
}