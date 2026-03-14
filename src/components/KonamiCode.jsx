import { useEffect, useState, useRef } from 'react'

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

function KonamiCode() {
  const [activated, setActivated] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)
  const positionRef = useRef(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      const expected = KONAMI_SEQUENCE[positionRef.current]
      if (e.key === expected) {
        positionRef.current++
        if (positionRef.current === KONAMI_SEQUENCE.length) {
          setActivated(true)
          setShowOverlay(true)
          positionRef.current = 0
          // Auto-dismiss after 6 seconds
          setTimeout(() => setShowOverlay(false), 6000)
        }
      } else {
        positionRef.current = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (activated) {
      document.body.classList.add('konami-active')
      const timeout = setTimeout(() => {
        document.body.classList.remove('konami-active')
        setActivated(false)
      }, 6000)
      return () => clearTimeout(timeout)
    }
  }, [activated])

  if (!showOverlay) return null

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-[fadeIn_0.3s_ease]"
      onClick={() => setShowOverlay(false)}
    >
      <div
        className="text-center p-12 rounded-3xl max-w-lg mx-4 animate-[zoomIn_0.4s_cubic-bezier(0.175,0.885,0.32,1.275)]"
        style={{
          background: 'linear-gradient(135deg, var(--accent-600), var(--accent-500), var(--accent-400))',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">
          <span className="animate-[bounce_0.5s_ease_infinite_alternate]">🎮</span>
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Konami Code Activated!
        </h2>
        <p className="text-white/80 text-lg mb-4">
          You found the secret! You're clearly someone with excellent taste.
        </p>
        <div className="flex items-center justify-center gap-1 text-sm text-white/60 font-mono">
          {KONAMI_SEQUENCE.map((key, i) => (
            <span key={i} className="py-1 px-2 bg-black/20 rounded text-xs">
              {key === 'ArrowUp' ? '↑' : key === 'ArrowDown' ? '↓' : key === 'ArrowLeft' ? '←' : key === 'ArrowRight' ? '→' : key.toUpperCase()}
            </span>
          ))}
        </div>
        <p className="text-white/50 text-sm mt-4">
          (click anywhere to dismiss)
        </p>
      </div>
    </div>
  )
}

export default KonamiCode
