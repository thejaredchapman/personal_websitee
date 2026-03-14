import { useEffect, useRef, useState } from 'react'

function CursorEffect() {
  const canvasRef = useRef(null)
  const trailRef = useRef([])
  const mouseRef = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      // Add a trail particle
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        size: 3 + Math.random() * 3,
        life: 1,
        decay: 0.015 + Math.random() * 0.015,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
      })

      // Limit trail length
      if (trailRef.current.length > 50) {
        trailRef.current = trailRef.current.slice(-50)
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Get accent color from CSS variable
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-400')
        .trim()

      trailRef.current = trailRef.current.filter((p) => {
        p.life -= p.decay
        p.x += p.vx
        p.y += p.vy
        p.size *= 0.98

        if (p.life <= 0) return false

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = accentColor
          ? `${accentColor}${Math.round(p.life * 60)
              .toString(16)
              .padStart(2, '0')}`
          : `rgba(249, 115, 22, ${p.life * 0.25})`
        ctx.fill()

        return true
      })

      // Draw glow at cursor position
      const { x, y } = mouseRef.current
      if (x > 0 && y > 0) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 40)
        gradient.addColorStop(0, accentColor ? `${accentColor}15` : 'rgba(249, 115, 22, 0.08)')
        gradient.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(x, y, 40, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  )
}

export default CursorEffect
