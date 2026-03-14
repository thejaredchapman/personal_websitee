import { useState, useEffect, useRef } from 'react'

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

function GlitchText({ text, className = '', as: Tag = 'span', hover = true, auto = false }) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)
  const intervalRef = useRef(null)
  const iterationRef = useRef(0)

  const startGlitch = () => {
    if (isGlitching) return
    setIsGlitching(true)
    iterationRef.current = 0

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            if (index < iterationRef.current) return text[index]
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          })
          .join('')
      )

      iterationRef.current += 1 / 2

      if (iterationRef.current >= text.length) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsGlitching(false)
      }
    }, 30)
  }

  useEffect(() => {
    setDisplayText(text)
  }, [text])

  useEffect(() => {
    if (!auto) return

    const autoGlitch = () => {
      startGlitch()
    }

    const timeout = setTimeout(autoGlitch, 1000 + Math.random() * 2000)
    const interval = setInterval(autoGlitch, 8000 + Math.random() * 4000)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
      clearInterval(intervalRef.current)
    }
  }, [auto, text])

  useEffect(() => {
    return () => clearInterval(intervalRef.current)
  }, [])

  const props = {
    className: `${className} ${hover ? 'cursor-pointer' : ''}`,
    ...(hover ? { onMouseEnter: startGlitch } : {}),
    'data-text': text,
  }

  return <Tag {...props}>{displayText}</Tag>
}

export default GlitchText
