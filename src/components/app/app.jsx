import { Routes, Route } from 'react-router-dom'
import Header from '../header/header.jsx'
import Main from '../main/main.jsx'
import AstroEvents from '../AstroEvents/AstroEvents.jsx'
import Footer from '../footer/footer.jsx'
import './app.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/astro-events" element={<AstroEvents />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
