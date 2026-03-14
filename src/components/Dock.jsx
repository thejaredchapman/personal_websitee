import { useState, useRef, useCallback } from 'react'
import { useWindows } from '../context/WindowContext'

const DOCK_APPS = [
  { id: 'about', label: 'About Me', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0114 0"/></svg>
  )},
  { id: 'codecomedy', label: 'Code & Comedy', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
  )},
  { id: 'terminal', label: 'Terminal', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
  )},
  { id: 'projects', label: 'Projects', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
  )},
  { id: 'resume', label: 'Resume', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
  )},
  { id: 'gallery', label: 'Gallery', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
  )},
  { id: 'music', label: 'Music', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
  )},
  { id: 'contact', label: 'Contact', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>
  )},
  { id: 'settings', label: 'Settings', icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
  )},
]

// Separator before game
const DOCK_GAME = { id: '__game__', label: 'Asteroids', icon: (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
)}

function Dock({ onOpenGame }) {
  const { windows, activeWindow, dockClick, bouncingRef } = useWindows()
  const [mouseX, setMouseX] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const dockRef = useRef(null)
  const iconRefs = useRef({})

  const handleMouseMove = useCallback((e) => {
    setMouseX(e.clientX)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouseX(null)
    setTooltip(null)
  }, [])

  const getScale = useCallback((itemId) => {
    if (mouseX === null) return 1
    const el = iconRefs.current[itemId]
    if (!el) return 1
    const rect = el.getBoundingClientRect()
    const iconCenter = rect.left + rect.width / 2
    const distance = Math.abs(mouseX - iconCenter)
    const maxDist = 120
    const maxScale = 1.6
    if (distance > maxDist) return 1
    return 1 + (maxScale - 1) * (1 - distance / maxDist)
  }, [mouseX])

  const allItems = [...DOCK_APPS]

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[900] max-[768px]:bottom-0 max-[768px]:left-0 max-[768px]:right-0 max-[768px]:translate-x-0">
      <div
        ref={dockRef}
        className="flex items-end justify-center gap-1 px-3 py-1.5 rounded-2xl os-dock max-[768px]:rounded-none max-[768px]:justify-around max-[768px]:px-1"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {allItems.map((item, i) => {
          const win = windows[item.id]
          const isOpen = win?.isOpen
          const isActive = activeWindow === item.id
          const scale = getScale(item.id)
          const isBouncing = bouncingRef.current.has(item.id)

          return (
            <div key={item.id} className="flex flex-col items-center relative" style={{ marginBottom: `${(scale - 1) * 24}px` }}>
              {/* Tooltip */}
              {tooltip === item.id && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 py-1 px-3 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none os-tooltip animate-[tooltipIn_0.15s_ease]">
                  {item.label}
                </div>
              )}
              <button
                ref={(el) => { iconRefs.current[item.id] = el }}
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center border-none cursor-pointer transition-colors duration-150 p-0 max-[768px]:w-10 max-[768px]:h-10 max-[768px]:rounded-lg
                  ${isActive ? 'os-dock-icon-active' : 'os-dock-icon'}
                  ${isBouncing ? 'animate-[dockBounce_0.6s_ease]' : ''}
                `}
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'bottom center',
                  transition: mouseX !== null ? 'transform 0.15s ease' : 'transform 0.3s ease',
                }}
                onClick={() => dockClick(item.id)}
                onMouseEnter={() => setTooltip(item.id)}
                onMouseLeave={() => setTooltip(null)}
                aria-label={item.label}
              >
                <span className="w-6 h-6 max-[768px]:w-5 max-[768px]:h-5" style={{ color: isActive ? 'var(--accent-400)' : 'var(--dock-icon-color)' }}>
                  {item.icon}
                </span>
              </button>
              {/* Open indicator dot */}
              {isOpen && (
                <div className="w-1 h-1 rounded-full mt-0.5 max-[768px]:mt-0" style={{ background: 'var(--accent-400)' }} />
              )}
            </div>
          )
        })}

        {/* Separator */}
        <div className="w-px h-8 mx-1 rounded-full opacity-30 max-[768px]:hidden" style={{ background: 'var(--dock-icon-color)' }} />

        {/* Game button */}
        <div className="flex flex-col items-center relative" style={{ marginBottom: `${(getScale('__game__') - 1) * 24}px` }}>
          {tooltip === '__game__' && (
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 py-1 px-3 rounded-md text-xs font-medium whitespace-nowrap pointer-events-none os-tooltip animate-[tooltipIn_0.15s_ease]">
              Asteroids
            </div>
          )}
          <button
            ref={(el) => { iconRefs.current['__game__'] = el }}
            className="w-12 h-12 rounded-xl flex items-center justify-center border-none cursor-pointer p-0 os-dock-icon max-[768px]:w-10 max-[768px]:h-10 max-[768px]:rounded-lg"
            style={{
              transform: `scale(${getScale('__game__')})`,
              transformOrigin: 'bottom center',
              transition: mouseX !== null ? 'transform 0.15s ease' : 'transform 0.3s ease',
            }}
            onClick={onOpenGame}
            onMouseEnter={() => setTooltip('__game__')}
            onMouseLeave={() => setTooltip(null)}
            aria-label="Asteroids"
          >
            <span className="w-6 h-6 max-[768px]:w-5 max-[768px]:h-5" style={{ color: 'var(--dock-icon-color)' }}>
              {DOCK_GAME.icon}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dock
