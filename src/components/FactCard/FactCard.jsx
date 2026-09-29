import { useEffect, useState } from 'react'
import { facts as defaultFacts } from '../../utils/facts.js'
import './FactCard.css'

// Returns a shuffled copy so each search shows the facts in a new order
function shuffle(list) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function FactCard({ facts: allFacts = defaultFacts, interval = 4000 }) {
  // Shuffled once when the card appears, so every search starts somewhere new
  const [facts] = useState(() => shuffle(allFacts))
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (facts.length < 2) return
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % facts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [facts.length, interval])

  return (
    <div className="fact-card-wrapper">
      <div className="fact-card">
        <p className="fact-card__label">Did you know</p>
        <p className="fact-card__text" key={index}>
          {facts[index]}
        </p>
      </div>

      <div className="fact-card__dots" aria-hidden="true">
        {facts.map((fact, i) => (
          <span
            key={fact}
            className={`fact-card__dot ${i === index ? 'fact-card__dot_active' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default FactCard
