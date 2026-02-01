import { useEffect, useRef, useState } from 'react'
import './BackgroundShapes.css'

function BackgroundShapes() {
  const containerRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      setMousePos({ x: clientX, y: clientY })

      // Apply space debris effect - objects move away from cursor
      const shapes = containerRef.current.querySelectorAll('.bg-shape')
      shapes.forEach((shape) => {
        const rect = shape.getBoundingClientRect()
        const shapeCenterX = rect.left + rect.width / 2
        const shapeCenterY = rect.top + rect.height / 2

        // Calculate distance and direction from cursor to shape
        const deltaX = shapeCenterX - clientX
        const deltaY = shapeCenterY - clientY
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

        // Objects within 300px of cursor get pushed away
        const maxDistance = 400
        const speed = parseFloat(shape.dataset.speed) || 1

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 80 * speed
          const angle = Math.atan2(deltaY, deltaX)
          const moveX = Math.cos(angle) * force
          const moveY = Math.sin(angle) * force
          const rotation = (Math.cos(angle) * force) / 2

          shape.style.setProperty('--push-x', `${moveX}px`)
          shape.style.setProperty('--push-y', `${moveY}px`)
          shape.style.setProperty('--rotation', `${rotation}deg`)
        } else {
          shape.style.setProperty('--push-x', '0px')
          shape.style.setProperty('--push-y', '0px')
          shape.style.setProperty('--rotation', '0deg')
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Generate random debris positions
  const generateDebris = () => {
    const debris = []
    const types = [
      'asteroid', 'asteroid-small', 'asteroid-large', 'rock', 'meteor',
      'circle', 'triangle', 'square', 'hexagon', 'ring', 'star', 'diamond',
      'cross', 'blob', 'crescent', 'donut', 'shard', 'crystal', 'dust'
    ]

    for (let i = 0; i < 80; i++) {
      debris.push({
        type: types[Math.floor(Math.random() * types.length)],
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: 15 + Math.random() * 60,
        speed: 0.3 + Math.random() * 1.2,
        rotation: Math.random() * 360,
      })
    }
    return debris
  }

  const debris = generateDebris()

  return (
    <div className="global-background space-theme" ref={containerRef}>
      {/* Stars background */}
      <div className="stars-layer stars-small"></div>
      <div className="stars-layer stars-medium"></div>
      <div className="stars-layer stars-large"></div>

      {/* Nebula effects */}
      <div className="nebula nebula-1"></div>
      <div className="nebula nebula-2"></div>

      {/* Space debris - asteroids and shapes */}
      {debris.map((item, i) => (
        <div
          key={i}
          className={`bg-shape space-debris debris-${item.type}`}
          data-speed={item.speed.toFixed(2)}
          style={{
            top: item.top,
            left: item.left,
            width: `${item.size}px`,
            height: `${item.size}px`,
            '--initial-rotation': `${item.rotation}deg`,
          }}
        />
      ))}

      {/* Large asteroids */}
      <div className="bg-shape space-debris debris-asteroid-huge" data-speed="0.2" style={{ top: '20%', left: '5%' }}></div>
      <div className="bg-shape space-debris debris-asteroid-huge" data-speed="0.25" style={{ top: '70%', right: '8%' }}></div>
      <div className="bg-shape space-debris debris-asteroid-huge" data-speed="0.15" style={{ top: '45%', left: '85%' }}></div>

      {/* Medium asteroids */}
      <div className="bg-shape space-debris debris-asteroid-large" data-speed="0.4" style={{ top: '10%', left: '30%' }}></div>
      <div className="bg-shape space-debris debris-asteroid-large" data-speed="0.5" style={{ top: '80%', left: '40%' }}></div>
      <div className="bg-shape space-debris debris-asteroid-large" data-speed="0.35" style={{ top: '55%', left: '15%' }}></div>
      <div className="bg-shape space-debris debris-asteroid-large" data-speed="0.45" style={{ top: '35%', right: '20%' }}></div>

      {/* Crystal formations */}
      <div className="bg-shape space-debris debris-crystal" data-speed="0.6" style={{ top: '15%', left: '60%' }}></div>
      <div className="bg-shape space-debris debris-crystal" data-speed="0.7" style={{ top: '65%', left: '75%' }}></div>
      <div className="bg-shape space-debris debris-crystal" data-speed="0.55" style={{ top: '40%', left: '25%' }}></div>

      {/* Metallic debris */}
      <div className="bg-shape space-debris debris-metal" data-speed="0.8" style={{ top: '25%', right: '35%' }}></div>
      <div className="bg-shape space-debris debris-metal" data-speed="0.9" style={{ top: '75%', left: '55%' }}></div>
      <div className="bg-shape space-debris debris-metal" data-speed="0.75" style={{ top: '50%', right: '5%' }}></div>

      {/* Ice chunks */}
      <div className="bg-shape space-debris debris-ice" data-speed="0.5" style={{ top: '8%', left: '80%' }}></div>
      <div className="bg-shape space-debris debris-ice" data-speed="0.6" style={{ top: '88%', left: '20%' }}></div>
      <div className="bg-shape space-debris debris-ice" data-speed="0.45" style={{ top: '60%', right: '40%' }}></div>

      {/* Glowing orbs */}
      <div className="bg-shape space-debris debris-orb" data-speed="1.0" style={{ top: '30%', left: '45%' }}></div>
      <div className="bg-shape space-debris debris-orb" data-speed="1.1" style={{ top: '70%', right: '25%' }}></div>
      <div className="bg-shape space-debris debris-orb" data-speed="0.95" style={{ top: '12%', left: '15%' }}></div>

      {/* Space dust particles */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`dust-${i}`}
          className="bg-shape space-debris debris-dust"
          data-speed={(0.8 + Math.random() * 0.8).toFixed(2)}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      {/* Shooting stars / meteors */}
      <div className="shooting-star" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
      <div className="shooting-star" style={{ top: '40%', left: '60%', animationDelay: '3s' }}></div>
      <div className="shooting-star" style={{ top: '70%', left: '30%', animationDelay: '7s' }}></div>
      <div className="shooting-star" style={{ top: '15%', left: '80%', animationDelay: '11s' }}></div>
    </div>
  )
}

export default BackgroundShapes
