import { useMemo } from 'react'

// Seeded pseudo-random to avoid layout shifts on re-render
function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

const SHAPE_COUNT = 18

const SHAPE_TYPES = ['triangle', 'hexagon', 'circle', 'square', 'diamond', 'cross']

function buildShapes() {
  const rand = seededRandom(42)
  return Array.from({ length: SHAPE_COUNT }, (_, i) => ({
    id: i,
    type: SHAPE_TYPES[Math.floor(rand() * SHAPE_TYPES.length)],
    x: rand() * 100,
    y: rand() * 100,
    size: 20 + rand() * 60,
    rotation: rand() * 360,
    duration: 20 + rand() * 40,
    delay: -(rand() * 30),
    drift: rand() > 0.5 ? 'driftA' : 'driftB',
    accentShade: [300, 400, 500, 600, 700][Math.floor(rand() * 5)],
    opacity: 0.04 + rand() * 0.08,
  }))
}

function ShapeSvg({ type, size }) {
  const half = size / 2

  switch (type) {
    case 'triangle':
      return (
        <polygon
          points={`${half},0 ${size},${size} 0,${size}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      )
    case 'hexagon': {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2
        return `${half + half * Math.cos(angle)},${half + half * Math.sin(angle)}`
      }).join(' ')
      return <polygon points={pts} fill="none" stroke="currentColor" strokeWidth="1.5" />
    }
    case 'circle':
      return <circle cx={half} cy={half} r={half - 1} fill="none" stroke="currentColor" strokeWidth="1.5" />
    case 'square':
      return <rect x="1" y="1" width={size - 2} height={size - 2} fill="none" stroke="currentColor" strokeWidth="1.5" />
    case 'diamond':
      return (
        <polygon
          points={`${half},0 ${size},${half} ${half},${size} 0,${half}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      )
    case 'cross':
      return (
        <g stroke="currentColor" strokeWidth="1.5" fill="none">
          <line x1={half} y1="2" x2={half} y2={size - 2} />
          <line x1="2" y1={half} x2={size - 2} y2={half} />
        </g>
      )
    default:
      return <circle cx={half} cy={half} r={half - 1} fill="none" stroke="currentColor" strokeWidth="1.5" />
  }
}

function GeometricWallpaper() {
  const shapes = useMemo(buildShapes, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Soft background glow blobs (keep accent-colored ambience) */}
      <div
        className="absolute rounded-full"
        style={{
          width: '50vw',
          height: '50vw',
          top: '-15%',
          left: '-10%',
          background: 'var(--accent-500)',
          filter: 'blur(120px)',
          opacity: 0.12,
          animation: 'pulse 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: '40vw',
          height: '40vw',
          bottom: '-10%',
          right: '-5%',
          background: 'var(--accent-400)',
          filter: 'blur(100px)',
          opacity: 0.1,
          animation: 'pulse 10s ease-in-out infinite',
          animationDelay: '-4s',
        }}
      />

      {/* Geometric shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            opacity: shape.opacity,
            color: `var(--accent-${shape.accentShade})`,
            animation: `${shape.drift} ${shape.duration}s ease-in-out infinite`,
            animationDelay: `${shape.delay}s`,
            transform: `rotate(${shape.rotation}deg)`,
          }}
        >
          <svg
            width={shape.size}
            height={shape.size}
            viewBox={`0 0 ${shape.size} ${shape.size}`}
            className="animate-[shapeSpin_60s_linear_infinite]"
            style={{ animationDelay: `${shape.delay}s` }}
          >
            <ShapeSvg type={shape.type} size={shape.size} />
          </svg>
        </div>
      ))}

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
    </div>
  )
}

export default GeometricWallpaper
