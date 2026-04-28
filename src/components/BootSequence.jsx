import { useState, useEffect } from 'react'

const BOOT_LINES = [
  { text: '', delay: 200 },
  { text: 'JaredOS v2.0', delay: 300, style: 'accent' },
  { text: `Copyright (c) ${new Date().getFullYear()} Jared Chapman. All rights reserved.`, delay: 200, style: 'dim' },
  { text: 'Last updated: April 28, 2026', delay: 150, style: 'dim' },
  { text: '', delay: 300 },
  { text: '[BOOT] Initializing system...', delay: 400 },
  { text: '[  OK  ] personality.py loaded', delay: 250, style: 'ok' },
  { text: '[  OK  ] humor_engine.py loaded', delay: 200, style: 'ok' },
  { text: '[  OK  ] coding_skills.py loaded', delay: 180, style: 'ok' },
  { text: '[ WARN ] coffee_levels.py — CRITICALLY LOW', delay: 350, style: 'warn' },
  { text: '[  OK  ] imposter_syndrome.py — SUPPRESSED', delay: 200, style: 'ok' },
  { text: '[  OK  ] dad_jokes.py loaded (15 jokes cached)', delay: 180, style: 'ok' },
  { text: '[  OK  ] resume.pdf mounted at /career', delay: 150, style: 'ok' },
  { text: '[  OK  ] projects/ mounted (10 repositories)', delay: 150, style: 'ok' },
  { text: '[  OK  ] gallery/ mounted (20 photos)', delay: 120, style: 'ok' },
  { text: '', delay: 200 },
  { text: 'All systems nominal. Loading desktop...', delay: 500, style: 'accent' },
]

function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('booting') // booting | progress | done

  useEffect(() => {
    // Check if already booted this session
    if (sessionStorage.getItem('jaredos-booted')) {
      onComplete()
      return
    }

    let lineIndex = 0
    let totalDelay = 0

    const timers = []

    BOOT_LINES.forEach((line) => {
      totalDelay += line.delay
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
        lineIndex++
      }, totalDelay)
      timers.push(timer)
    })

    // Start progress bar after lines
    const progressStart = totalDelay + 300
    const progressTimer = setTimeout(() => {
      setPhase('progress')
    }, progressStart)
    timers.push(progressTimer)

    // Animate progress bar
    const progressDuration = 1200
    const progressSteps = 30
    const stepTime = progressDuration / progressSteps
    for (let i = 1; i <= progressSteps; i++) {
      const timer = setTimeout(() => {
        setProgress(Math.round((i / progressSteps) * 100))
      }, progressStart + i * stepTime)
      timers.push(timer)
    }

    // Complete
    const completeTimer = setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem('jaredos-booted', '1')
      setTimeout(onComplete, 500)
    }, progressStart + progressDuration + 200)
    timers.push(completeTimer)

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className={`fixed inset-0 z-[99999] bg-[#0a0a12] flex items-center justify-center transition-opacity duration-500 ${phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="w-full max-w-[600px] px-8 font-mono text-sm">
        {/* Boot text */}
        <div className="mb-6 max-h-[60vh] overflow-hidden">
          {visibleLines.map((line, i) => (
            <div
              key={i}
              className={`leading-relaxed animate-[bootLineIn_0.15s_ease] ${
                line.style === 'accent' ? 'text-[var(--accent-400)] font-bold' :
                line.style === 'dim' ? 'text-white/30' :
                line.style === 'ok' ? 'text-[#a6e3a1]' :
                line.style === 'warn' ? 'text-[#f9e2af]' :
                'text-white/70'
              }`}
            >
              {line.text || '\u00A0'}
            </div>
          ))}
        </div>

        {/* Progress bar */}
        {phase !== 'booting' && (
          <div className="animate-[bootLineIn_0.2s_ease]">
            <div className="h-2 rounded-full overflow-hidden bg-white/10">
              <div
                className="h-full rounded-full transition-[width] duration-75"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, var(--accent-500), var(--accent-400))',
                  boxShadow: '0 0 12px var(--accent-500)',
                }}
              />
            </div>
            <p className="text-center text-white/40 text-xs mt-2">{progress}%</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BootSequence
