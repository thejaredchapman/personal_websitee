import { useState, useEffect, useRef } from 'react'

export function useTypewriter(lines, options = {}) {
  const {
    typeSpeed = 50,
    deleteSpeed = 30,
    pauseTime = 2000,
    loop = true,
    startDelay = 500,
  } = options

  const [displayText, setDisplayText] = useState('')
  const [lineIndex, setLineIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const [cursorVisible, setCursorVisible] = useState(true)
  const timeoutRef = useRef(null)

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!lines.length) return

    const currentLine = lines[lineIndex]

    if (isTyping) {
      if (displayText.length < currentLine.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentLine.slice(0, displayText.length + 1))
        }, typeSpeed + Math.random() * 30)
      } else {
        // Done typing this line
        timeoutRef.current = setTimeout(() => {
          if (lineIndex === lines.length - 1 && !loop) {
            setIsComplete(true)
            return
          }
          setIsTyping(false)
        }, pauseTime)
      }
    } else {
      // Deleting
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, deleteSpeed)
      } else {
        // Move to next line
        const nextIndex = (lineIndex + 1) % lines.length
        setLineIndex(nextIndex)
        timeoutRef.current = setTimeout(() => {
          setIsTyping(true)
        }, startDelay)
      }
    }

    return () => clearTimeout(timeoutRef.current)
  }, [displayText, lineIndex, isTyping, lines, typeSpeed, deleteSpeed, pauseTime, loop, startDelay])

  return { displayText, cursorVisible, isComplete, lineIndex }
}
