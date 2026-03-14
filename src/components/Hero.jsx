import { useState, useEffect, useRef } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'

const typewriterLines = [
  'console.log("Hello, World!");',
  'git commit -m "killed at open mic"',
  'while (alive) { code(); laugh(); repeat(); }',
  'SELECT * FROM life WHERE fun = true;',
  'def career(): return ["engineer", "comedian"]',
  '// TODO: sleep more, debug less',
  'if (joke.landed) crowd.laugh() else blame_audience()',
  'npm install confidence --save',
  'raise Exception("The crowd was not ready")',
  'sudo make me funny',
]

function Hero({ onPlayGame }) {
  const { displayText, cursorVisible } = useTypewriter(typewriterLines, {
    typeSpeed: 45,
    deleteSpeed: 25,
    pauseTime: 2500,
  })

  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)
  const magnetRef = useRef(null)

  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timeout)
  }, [])

  // Magnetic effect on profile image
  const handleMouseMove = (e) => {
    if (!magnetRef.current) return
    const rect = magnetRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) * 0.1
    const deltaY = (e.clientY - centerY) * 0.1
    magnetRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    if (!magnetRef.current) return
    magnetRef.current.style.transform = 'translate(0, 0)'
    magnetRef.current.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    setTimeout(() => {
      if (magnetRef.current) magnetRef.current.style.transition = 'transform 0.1s ease-out'
    }, 500)
  }

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 px-8 max-[768px]:px-4 scroll-mt-20"
    >
      <div className="container grid grid-cols-2 gap-20 items-center relative z-1 max-[968px]:grid-cols-1 max-[968px]:text-center">
        <div>
          {/* Terminal greeting */}
          <div
            className={`transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full text-sm font-mono mb-6 border" style={{ background: 'var(--accent-lighter)', borderColor: 'var(--accent-200)', color: 'var(--accent-700)' }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent-500)' }} />
              Available for hire
            </div>
          </div>

          <p
            className={`text-lg font-medium mb-3 tracking-wide transition-all duration-700 delay-200 ${loaded ? 'opacity-85 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'var(--accent-primary)' }}
          >
            &gt; "Hello, World!" — I'm
          </p>
          <h1
            className={`text-[3.25rem] font-semibold mb-4 leading-[1.15] tracking-tight max-[968px]:text-[2.5rem] max-[480px]:text-[2rem] transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            Jared Chapman
          </h1>
          <h2
            className={`text-[1.3rem] font-normal mb-5 leading-relaxed max-[480px]:text-lg transition-all duration-700 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'var(--text-secondary)' }}
          >
            <span className="relative opacity-90" style={{ color: 'var(--accent-primary)' }}>
              Software Engineer
            </span>{' '}
            by Day,{' '}
            <span className="relative opacity-90" style={{ color: 'var(--accent-primary)' }}>
              Comedian
            </span>{' '}
            by Night
          </h2>

          {/* Typewriter terminal */}
          <div
            className={`rounded-lg mb-8 py-3 px-4 font-mono text-sm border max-w-[520px] max-[968px]:mx-auto transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{
              background: 'var(--bg-secondary)',
              borderColor: 'var(--border-light)',
            }}
          >
            <div className="flex items-center gap-2 text-xs mb-2 pb-2 border-b" style={{ borderColor: 'var(--border-light)', color: 'var(--text-tertiary)' }}>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                <span className="w-2 h-2 rounded-full bg-[#28c840]" />
              </div>
              <span>~/jared-chapman</span>
            </div>
            <div className="flex items-start">
              <span style={{ color: 'var(--accent-primary)' }}>$&nbsp;</span>
              <span style={{ color: 'var(--text-primary)' }}>
                {displayText}
                <span
                  className="inline-block w-[2px] h-[1.1em] ml-0.5 align-middle transition-opacity duration-100"
                  style={{
                    background: 'var(--accent-primary)',
                    opacity: cursorVisible ? 1 : 0,
                  }}
                />
              </span>
            </div>
          </div>

          <p
            className={`text-base max-w-[500px] mb-10 leading-7 max-[968px]:mx-auto max-[968px]:mb-8 transition-all duration-700 delay-[600ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ color: 'var(--text-tertiary)' }}
          >
            Building intelligent systems with LLMs and GenAI at scale. From Google BigQuery
            to enterprise AI solutions, I bridge the gap between complex technology
            and real-world impact.
          </p>

          <div
            className={`flex gap-4 flex-wrap max-[968px]:justify-center transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            <a href="#terminal" className="btn btn-primary group">
              <span className="flex items-center gap-2">
                Try the Terminal
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform group-hover:translate-x-1">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </span>
            </a>
            <a href="#code-comedy" className="btn btn-secondary">Code & Comedy</a>
          </div>
        </div>

        <div
          className={`flex justify-center items-center max-[968px]:-order-1 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={magnetRef}
            className="relative w-[400px] h-[400px] cursor-pointer max-[968px]:w-80 max-[968px]:h-80 max-[480px]:w-[260px] max-[480px]:h-[260px]
              before:content-[''] before:absolute before:inset-[-12px] before:rounded-full before:bg-gradient-to-br before:from-[var(--accent-300)] before:to-[var(--accent-500)] before:-z-1 before:opacity-30 before:animate-[pulse_5s_infinite_ease-in-out]
              after:content-[''] after:absolute after:inset-[-24px] after:rounded-full after:border-[1.5px] after:border-dashed after:border-[var(--accent-300)] after:opacity-35 after:animate-[rotate_50s_infinite_linear]"
            style={{ transition: 'transform 0.1s ease-out' }}
            onClick={onPlayGame}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onPlayGame()}
            title="Click to play a game..."
          >
            <img
              src="/selfie.jpg"
              alt="Jared Chapman"
              className={`w-full h-full rounded-full object-cover transition-all duration-500 ${hovered ? 'scale-[1.03] shadow-[0_12px_30px_var(--shadow-accent)]' : ''}`}
            />
            {/* Hidden game hint on hover */}
            <div
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 py-1.5 px-4 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-300 pointer-events-none ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
              style={{ background: 'var(--accent-500)', color: 'white' }}
            >
              Click to play Asteroids!
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-center animate-[bounce_3s_infinite] transition-all duration-700 delay-1000 ${loaded ? 'opacity-50' : 'opacity-0'}`}
      >
        <div className="w-6 h-[38px] border-[1.5px] border-[var(--accent-400)] rounded-xl mx-auto mb-2 relative opacity-70">
          <div className="w-[3px] h-[7px] bg-[var(--accent-400)] rounded-sm absolute top-2 left-1/2 -translate-x-1/2 animate-[scroll_2.5s_infinite] opacity-70" />
        </div>
        <p className="text-[0.8rem] tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
          Scroll to explore
        </p>
      </div>
    </section>
  )
}

export default Hero
