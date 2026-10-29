import { useState, useEffect, useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'
import { buildBootLines } from './boot/bootLines'
import { XpSkin, Win95Skin, MyspaceSkin, UbuntuSkin, MacosSkin, TandySkin } from './boot/BootSkins'

const BOOT_SKINS = {
  xp: { Skin: XpSkin, background: '#000000' },
  win95: { Skin: Win95Skin, background: '#008080' },
  myspace: { Skin: MyspaceSkin, background: 'linear-gradient(180deg,#dce9f7,#b9d2ec)' },
  ubuntu: { Skin: UbuntuSkin, background: 'linear-gradient(135deg,#5e2750,#2c001e 60%,#14000e)' },
  macos: { Skin: MacosSkin, background: '#000000' },
  tandy: { Skin: TandySkin, background: '#0000aa' },
}

function BootSequence({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('booting') // booting | progress | done
  const { os } = useTheme()
  const bootLines = useMemo(buildBootLines, [])

  useEffect(() => {
    // Check if already booted this session
    if (sessionStorage.getItem('jaredos-booted')) {
      onComplete()
      return
    }

    let totalDelay = 0

    const timers = []

    bootLines.forEach((line) => {
      totalDelay += line.delay
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, line])
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
  }, [onComplete, bootLines])

  const { Skin, background } = BOOT_SKINS[os] ?? BOOT_SKINS.xp

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center font-mono transition-opacity duration-500 ${phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ background }}
    >
      <Skin lines={visibleLines} progress={progress} showProgress={phase !== 'booting'} />
    </div>
  )
}

export default BootSequence
