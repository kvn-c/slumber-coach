import { useEffect, useState } from 'react'
import './NavOverlay.css'

const NAV_LINKS = [
  { label: 'Home',              page: 'home'    },
  { label: 'Cognitive Shuffle', page: 'shuffle' },
  { label: 'About',             page: 'about'   },
  { label: 'Sleep Science',     page: null      },
]

export default function NavOverlay({ onClose, onNavigate }) {
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(onClose, 320)
  }

  const handleNavigate = (page) => {
    if (page) onNavigate(page)
    handleClose()
  }

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={`nav-overlay${closing ? ' nav-overlay--closing' : ''}`}>
      <button className="nav-overlay__close" onClick={handleClose} aria-label="Close menu">×</button>
      <div className="nav-overlay__inner">
        <nav className="nav-overlay__links">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href="#"
              className={`nav-overlay__link${!link.page ? ' nav-overlay__link--disabled' : ''}`}
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
              onClick={(e) => { e.preventDefault(); handleNavigate(link.page) }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <button className="nav-overlay__close-btn" onClick={handleClose}>CLOSE</button>
    </div>
  )
}
