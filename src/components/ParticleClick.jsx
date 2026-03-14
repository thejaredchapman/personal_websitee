import { useEffect, useRef, useState } from 'react'

function ParticleClick() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window)
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

    const handleClick = (e) => {
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-500')
        .trim()

      const colors = [
        accentColor || '#f97316',
        getComputedStyle(document.documentElement).getPropertyValue('--accent-400').trim() || '#fb923c',
        getComputedStyle(document.documentElement).getPropertyValue('--accent-300').trim() || '#fdba74',
        '#ffffff',
      ]

      // Create burst of particles
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20 + (Math.random() - 0.5) * 0.5
        const speed = 2 + Math.random() * 5
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 4,
          life: 1,
          decay: 0.02 + Math.random() * 0.02,
          color: colors[Math.floor(Math.random() * colors.length)],
          gravity: 0.08,
          shape: Math.random() > 0.5 ? 'circle' : 'square',
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life -= p.decay
        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= 0.99
        p.size *= 0.97

        if (p.life <= 0) return false

        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color

        if (p.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
        }

        ctx.globalAlpha = 1
        return true
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('click', handleClick)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9998]"
      aria-hidden="true"
    />
  )
}

export default ParticleClick
