import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../header/header.jsx'
import Main from '../main/main.jsx'
import AstroEvents from '../AstroEvents/AstroEvents.jsx'
import Footer from '../footer/footer.jsx'
import './app.css'

function App() {
  const [searchKey, setSearchKey] = useState(0)

  function handleLogoClick() {
    setSearchKey((key) => key + 1)
  }

  return (
    <div className="app">
      <Header onLogoClick={handleLogoClick} />
      <Routes>
        <Route path="/" element={<Main key={searchKey} />} />
        <Route path="/astro-events" element={<AstroEvents />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
