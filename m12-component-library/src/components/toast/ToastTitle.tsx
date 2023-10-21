import { useToastContext } from './Toast'
import { ChildrenProp } from '../../types'

export const ToastTitle: React.FC<ChildrenProp> = ({ children }) => {
    const { status } = useToastContext()
    return children && <p className={`text toast__content toast__content--${status?.toLowerCase()}`}>
        {children}
    </p>
}