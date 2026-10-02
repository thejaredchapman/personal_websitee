import { useState, useEffect } from 'react'

// Phones in portrait, plus phones in landscape (wide but short, touch-only)
const QUERY = '(max-width: 768px), (pointer: coarse) and (max-height: 500px)'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(QUERY).matches)

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
