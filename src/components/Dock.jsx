import { useState, useRef, useCallback } from 'react'
import { useWindows } from '../context/WindowContext'
import { DOCK_APPS, DOCK_CLIPPY, DOCK_GAME } from './appRegistry'

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

        {/* Clippy */}
        {(() => {
          const item = DOCK_CLIPPY
          const win = windows[item.id]
          const isOpen = win?.isOpen
          const isActive = activeWindow === item.id
          const scale = getScale(item.id)
          const isBouncing = bouncingRef.current.has(item.id)
          return (
            <div key={item.id} className="flex flex-col items-center relative" style={{ marginBottom: `${(scale - 1) * 24}px` }}>
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
              {isOpen && (
                <div className="w-1 h-1 rounded-full mt-0.5 max-[768px]:mt-0" style={{ background: 'var(--accent-400)' }} />
              )}
            </div>
          )
        })()}

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
