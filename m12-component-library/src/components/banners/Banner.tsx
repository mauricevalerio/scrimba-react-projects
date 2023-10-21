import { BannerContent } from './BannerContent'
import { BannerTitle } from './BannerTitle'
import { createContext, useContext } from 'react'
import SuccessLogo from '../../assets/banners/success.svg'
import WarningLogo from '../../assets/banners/warning.svg'
import ErrorLogo from '../../assets/banners/error.svg'
import InfoLogo from '../../assets/banners/info.svg'

type BannerProp = {
    status: 'SUCCESS' | 'WARNING' | 'ERROR' | 'INFO',
    children: React.ReactNode
}

type DefaultContext = {
    status: string,
}

export const BannerContext = createContext<DefaultContext>({
    status: '',
})

export const useBannerContext = () => useContext(BannerContext)

export const Banner: React.FC<BannerProp> & {
    Title: typeof BannerTitle,
    Content: typeof BannerContent,
} = ({ status, children }) => {

    const logo = status === 'SUCCESS' ? SuccessLogo
        : status === 'WARNING' ? WarningLogo
            : status === 'ERROR' ? ErrorLogo
                : InfoLogo

    return (
        <BannerContext.Provider value={{ status }}>
            <div className={`banner banner__${status?.toLowerCase()}`}>
                <img src={logo} alt={`Banner logo ${status}`} />
                <div className='children__container'>{children}</div>
            </div>
        </BannerContext.Provider>
    )
}

Banner.Title = BannerTitle
Banner.Content = BannerContent