import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Card from './components/Card.jsx'
import data from './data.js'

export default function App() {
  const cards = data.map(card => {
    return (
      <Card
        key={card.id}
        card={card}
      />
    )
  })
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <section className='cards-list'>
        {cards}
      </section>

    </div>
  )
}
