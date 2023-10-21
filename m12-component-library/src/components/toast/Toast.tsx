import { ToastTitle } from './ToastTitle'
import { ToastContent } from './ToastContent'
import { createContext, useContext } from 'react'
import SuccessLogo from '../../assets/toast/success.svg'
import WarningLogo from '../../assets/toast/warning.svg'
import ErrorLogo from '../../assets/toast/error.svg'
import InfoLogo from '../../assets/toast/info.svg'

type ToastProp = {
    status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO',
    children: React.ReactNode
}

type DefaultContext = {
    status: string,
}

export const ToastContext = createContext<DefaultContext>({
    status: '',
})

export const useToastContext = () => useContext(ToastContext)

export const Toast: React.FC<ToastProp> & {
    Title: typeof ToastTitle,
    Content: typeof ToastContent,
} = ({ status, children }) => {

    const logo = status === 'SUCCESS' ? SuccessLogo
        : status === 'WARNING' ? WarningLogo
            : status === 'ERROR' ? ErrorLogo
                : InfoLogo

    return (
        <ToastContext.Provider value={{ status }}>
            <div className={`toast toast__${status?.toLowerCase()}`}>
                <img src={logo} alt={`Banner logo ${status}`} />
                <div className='text__container'>{children}</div>
            </div>
        </ToastContext.Provider>
    )
}

Toast.Title = ToastTitle
Toast.Content = ToastContent