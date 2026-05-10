import { useEffect, useState } from 'react'
import './About.css'

const SECTIONS = [
  {
    heading: 'Sleep Cycles',
    body: 'Sleep isn\u2019t a single state\u2014it\u2019s a series of repeating 90-minute cycles, each made up of four stages. The first three are NREM (non-rapid eye movement): light sleep, deeper sleep, and slow-wave deep sleep where your body repairs tissue and consolidates memory. The fourth is REM, where most dreaming occurs and emotional processing happens. A full night typically includes 4\u20136 complete cycles.',
  },
  {
    heading: 'Why Timing Matters',
    body: 'Waking up mid-cycle\u2014especially during deep sleep\u2014triggers sleep inertia: that heavy, disoriented feeling that can linger for hours. Waking at the natural end of a cycle, when sleep is already at its lightest, means your brain is already transitioning toward wakefulness. The difference in how you feel can be dramatic, even if the total hours slept are similar. This tool calculates those cycle endpoints so you can set an alarm that works with your biology, not against it.',
  },
  {
    heading: 'The Cognitive Shuffle',
    body: 'Developed by cognitive scientist Dr. Luc P. Beaulu-Pr\u00e9vost, the cognitive shuffle is a technique designed to accelerate sleep onset. The core insight: the brain struggles to fall asleep when it\u2019s engaged in coherent, goal-directed thinking\u2014replaying conversations, running through to-do lists, or playing out anxious scenarios. These narratives keep the prefrontal cortex active and delay the transition into sleep.',
  },
  {
    heading: 'How It Works',
    body: 'The shuffle interrupts that coherence. By visualizing a rapid sequence of random, unrelated, emotionally neutral images\u2014a rubber duck, a mountain, a red stapler\u2014you mimic the fragmented, nonsensical imagery the brain naturally produces as it drifts off (known as hypnagogic hallucinations). The randomness signals that conscious, linear thinking has stopped. The brain interprets this as a cue to transition into sleep. It\u2019s simple, drug-free, and grounded in how your mind actually works.',
  },
]

export default function About({ onClose }) {
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

  return (
    <div className={`about${closing ? ' about--closing' : ''}`}>
      <button className="about__close" onClick={handleClose} aria-label="Close">×</button>
      <div className="about__body">
        {SECTIONS.map((s, i) => (
          <p key={i} className="about__p"><strong>{s.heading} — </strong>{s.body}</p>
        ))}
      </div>
      <button className="about__close-btn" onClick={handleClose}>CLOSE</button>
    </div>
  )
}
