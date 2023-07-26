import React from 'react'
import './App.css'
import data from './data'
import Header from './components/Header'
import Content from './components/Content'

export default function App() {
  const travelList = data.map(item => {
    return (
      <Content
        key={item.id}
        {...item}
      />
    )
  })
  return (
    <div className="app-container">
      <Header />
      {travelList}
    </div>
  )
}
