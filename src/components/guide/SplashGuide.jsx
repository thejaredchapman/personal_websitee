import { useEffect, useRef } from 'react'
import GuideContent from './GuideContent'

function SplashGuide({ onClose }) {
  const ctaRef = useRef(null)

  useEffect(() => {
    ctaRef.current?.focus()
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="g-splash" role="dialog" aria-modal="true" aria-label="Guide to coding assistants">
      <div className="g-splash-bar">
        <span className="g-splash-title">JaredOS / guide</span>
        <button className="g-btn ghost" onClick={onClose}>Skip</button>
      </div>
      <div className="g-splash-body"><GuideContent /></div>
      <div className="g-splash-cta">
        <span className="g-hint">Reopen any time from the dock: AI Guide</span>
        <button ref={ctaRef} className="g-btn" onClick={onClose}>Enter JaredOS &rarr;</button>
      </div>
    </div>
  )
}

export default SplashGuide
