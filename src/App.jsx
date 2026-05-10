import { useState } from 'react'
import Logo from './components/Logo'
import TimePicker from './components/TimePicker'
import ResultsOverlay from './components/ResultsOverlay'
import NavOverlay from './components/NavOverlay'
import CognitiveShuffle from './components/CognitiveShuffle'
import About from './components/About'
import { getIdealBedtimes, getIdealWakeTimes } from './utils/sleepCalc'
import './App.css'

export default function App() {
  const [wakeHour, setWakeHour] = useState(7)
  const [wakeMinute, setWakeMinute] = useState(30)
  const [overlay, setOverlay] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [page, setPage] = useState('home')

  const handleBedtimeCalc = () => {
    setOverlay({ type: 'bedtime', results: getIdealBedtimes(wakeHour, wakeMinute) })
  }

  const handleWaketimeCalc = () => {
    setOverlay({ type: 'waketime', results: getIdealWakeTimes() })
  }

  return (
    <>
      <button
        className="burger"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <i className="fa-solid fa-bars" />
      </button>

      <div className="app">
        <div className="panel panel--dark">
          <header>
            <Logo />
          </header>

          <div className="panel__body">
            <h2 className="headline">If I want to<br />wake up at&hellip;</h2>
            <TimePicker
              hour={wakeHour}
              minute={wakeMinute}
              onHourChange={setWakeHour}
              onMinuteChange={setWakeMinute}
            />
            <button className="cta" onClick={handleBedtimeCalc}>
              WHEN SHOULD I GO TO BED?
            </button>
          </div>
        </div>

        <div className="panel panel--light">
          <div className="panel__body">
            <h2 className="headline">If I go to bed<br />right now,</h2>
            <button className="cta" onClick={handleWaketimeCalc}>
              WHEN SHOULD I WAKE?
            </button>
          </div>
        </div>

        {overlay && (
          <ResultsOverlay
            type={overlay.type}
            results={overlay.results}
            onClose={() => setOverlay(null)}
          />
        )}
      </div>

      {page === 'shuffle' && (
        <CognitiveShuffle onClose={() => setPage('home')} />
      )}

      {page === 'about' && (
        <About onClose={() => setPage('home')} />
      )}

      {menuOpen && (
        <NavOverlay
          onClose={() => setMenuOpen(false)}
          onNavigate={(p) => { setPage(p); setMenuOpen(false) }}
        />
      )}
    </>
  )
}
