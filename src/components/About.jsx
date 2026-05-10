import { useEffect, useState } from 'react'
import './About.css'

const PARAGRAPHS = [
  'Life moves fast\u2026 and usually at multiple paces across different areas.',
  'This project started over a decade ago when I was a UX/UI designer working for a telecommunications company. Like many designers I found myself unable to effectively communicate my vision to the developer that was leading the implementation of my designs. We spoke different languages, most times literally. As a child of the 90s I had experience creating the internet via Lisa Explains It All, MySpace, Newgrounds, and a pirated version of Macromedia Flash. But as a \u201ccreative\u201d I lacked the formal education around the topic, and honestly avoided it because I lacked the mental focus.',
  'I\u2019ve also struggled with sleep. Bedtimes, racing thoughts, quality of sleep\u2014you name it, I had issues with it. Honestly this probably exacerbated the previously stated mental focus issues.',
  'Early in my time with T-Cetra I learned of my glaring shortcomings. So I used a little hyperfocus to hammer out some self education. I created the Sleeper \u201capp\u201d that outputs optimal bedtimes given an input of wake time or bedtime.',
  'The first version was deplorable! I\u2019ll never forget discussing my learnings with developers at the company. Like loops, the concept was so foreign to me that the first refactor reduced the code base by what I would estimate at 80%. Can you imagine producing code so awful that it warranted such a refactor!',
  'But I learned, and from those learnings I drastically improved my communication with the developers. What a wind that gave me. I could now speak their language or at least bridge some gaps. My collaborative abilities drastically improved. I learned about real abstraction of thought, and how to communicate that! I learned how to learn, how to communicate. A humbling and invaluable experience to say the least.',
  'The app also improved my life. It was now easy for me to reference an optimal sleep schedule. I hadn\u2019t created something that was groundbreaking or new by any stretch of the imagination. This existed long before me, but I had produced it. It was easy for me to revisit it daily.',
  'I was able to apply my experience across multiple domains. Again nothing new or game changing but it clicked for me. My career, my life was launched! I went on to become a senior UX/UI designer, developer, lead developer, and ultimately Solutions Architect. Something I\u2019m extremely proud of. Above all, I\u2019m an effective communicator\u2026 something I WILL pass to my children.',
  'I spent the first decade of my career learning to communicate because I needed to learn myself. I thought I was learning JavaScript to talk to developers, but I was actually learning the architecture of my own thoughts.',
  'Today, my life is different, fuller, busier, and noisier. As a father and an architect, I have more to communicate than ever, but I also have a greater need for silence. This tool is the result of that journey. It\u2019s not about building more logic; it\u2019s about finally knowing how to set it aside so I can rest.',
  'Thanks for attending my Ted talk. That was a really roundabout way of saying: \u201cThis tool, this process has help me a lot, I hope it can help you too.\u201d',
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
        {PARAGRAPHS.map((p, i) => (
          <p key={i} className="about__p">{p}</p>
        ))}
      </div>
      <button className="about__close-btn" onClick={handleClose}>CLOSE</button>
    </div>
  )
}
