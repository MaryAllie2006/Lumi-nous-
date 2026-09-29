import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../header/header.jsx'
import Main from '../main/main.jsx'
import AstroEvents from '../AstroEvents/AstroEvents.jsx'
import Footer from '../footer/footer.jsx'
import Preloader from '../Preloader/Preloader.jsx'
import './app.css'

const LOCATION_LOAD_MS = 15000

const LOCATION_MESSAGE = {
  title: 'Reading the sky over your location...',
  subtitle: 'Pulling live cloud cover, moon phase and light pollution data',
}

function App() {
  const [loading, setLoading] = useState(false)
  const [hasResults, setHasResults] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  // Show the preloader for a search, then reveal the results on the home page
  function handleLocationSearch() {
    clearTimeout(timerRef.current)
    setLoading(true)
    setHasResults(true)
    timerRef.current = setTimeout(() => setLoading(false), LOCATION_LOAD_MS)
  }

  // The Luminous logo takes the user back to a fresh search
  function handleLogoClick() {
    setHasResults(false)
  }

  return (
    <div className="app">
      {loading ? (
        <Preloader title={LOCATION_MESSAGE.title} subtitle={LOCATION_MESSAGE.subtitle} />
      ) : (
        <>
          <Header onLogoClick={handleLogoClick} />
          <Routes>
            <Route
              path="/"
              element={<Main hasResults={hasResults} onLocationSearch={handleLocationSearch} />}
            />
            <Route path="/astro-events" element={<AstroEvents />} />
          </Routes>
        </>
      )}
      <Footer />
    </div>
  )
}

export default App
