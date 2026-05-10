import { useState, useEffect, useRef } from 'react'
import './CognitiveShuffle.css'

const WORDS = [
  'cloud', 'pillow', 'river', 'candle', 'moss', 'tide', 'feather',
  'ember', 'dusk', 'hollow', 'petal', 'shore', 'lantern', 'mist',
  'velvet', 'willow', 'heron', 'amber', 'prism', 'kettle',
  'sparrow', 'meadow', 'thistle', 'cinnamon', 'lighthouse',
  'fern', 'birch', 'wool', 'copper', 'marble', 'dewdrop',
  'tangerine', 'snowflake', 'pebble', 'linen', 'hammock',
  'driftwood', 'cobblestone', 'moth', 'foxglove',
]

const WORD_DURATION  = 7000
const PAUSE_DURATION = 1500

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function CognitiveShuffle({ onClose }) {
  const [entry, setEntry] = useState({ word: '', key: 0 })
  const [closing, setClosing] = useState(false)
  const queue = useRef([])

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 320)
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    queue.current = shuffle(WORDS)
    let timer

    const next = () => {
      if (queue.current.length === 0) queue.current = shuffle(WORDS)
      const word = queue.current.pop()
      setEntry(prev => ({ word, key: prev.key + 1 }))
      timer = setTimeout(next, WORD_DURATION + PAUSE_DURATION)
    }

    next()
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`cs${closing ? ' cs--closing' : ''}`}>
      <button className="cs__close" onClick={handleClose} aria-label="Close">×</button>
      <div className="cs__stage">
        <div key={entry.key} className="cs__word-wrap">
          <span className="cs__word">{entry.word}</span>
        </div>
      </div>
      <button className="cs__close-btn" onClick={handleClose}>CLOSE</button>
    </div>
  )
}
