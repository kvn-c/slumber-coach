import { useEffect, useState } from 'react'
import { formatTime } from '../utils/sleepCalc'
import './ResultsOverlay.css'

export default function ResultsOverlay({ type, results, onClose }) {
  const isBedtime = type === 'bedtime'
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 320)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Bedtime: top 2 (most cycles, most sleep) are highlighted
  // Waketime: bottom 2 (most cycles, most sleep) are highlighted
  const isHighlighted = (i) =>
    isBedtime ? i < 2 : i >= results.length - 2

  return (
    <div
      className={`overlay overlay--${type}${closing ? ' overlay--closing' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={isBedtime ? 'Bedtime results' : 'Wake time results'}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <button className="overlay__x" onClick={handleClose} aria-label="Close">×</button>

      <div className="overlay__inner">
        <h2 className="overlay__headline">
          {isBedtime
            ? 'YOU SHOULD GO TO BED AT ONE OF THE FOLLOWING TIMES:'
            : 'YOU SHOULD WAKE AT ONE OF THE FOLLOWING TIMES:'}
        </h2>

        <div className="overlay__cards">
          {results.map((t, i) => (
            <div
              key={i}
              className={`ocard${isHighlighted(i) ? ' ocard--fill' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              {formatTime(t.hour, t.minute)}
            </div>
          ))}
        </div>
      </div>
      <button className="overlay__close-btn" onClick={handleClose}>CLOSE</button>
    </div>
  )
}
