import Info from './components/Info'
import About from './components/About'
import Interest from './components/Interest'
import SocialMedia from './components/SocialMedia'

export default function App() {
  return (
    <div className='appContainer'>
      <div className='businessCardContainer'>
        <Info />
        <About />
        <Interest />
        <SocialMedia />
      </div>
    </div>
  )
}

