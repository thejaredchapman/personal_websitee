import { useState, useEffect } from 'react'
import { useWindows } from '../context/WindowContext'
import { useTheme } from '../context/ThemeContext'

function MenuBar() {
  const { activeWindow, windows, cascadeWindows, stackWindows, cycleWindow, minimizeAllWindows, closeAllWindows } = useWindows()
  const { theme, toggleTheme } = useTheme()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(interval)
  }, [])

  const activeTitle = activeWindow ? windows[activeWindow]?.title : 'JaredOS'
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })

  const btnStyle = {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: 5,
    padding: 0,
    transition: 'opacity 0.15s, background 0.15s',
    opacity: 0.7,
  }

  return (
    <div className="fixed top-0 left-0 right-0 h-7 z-[950] flex items-center justify-between px-4 os-menubar select-none">
      {/* Left: App name */}
      <div className="flex items-center gap-4">
        <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>
          {activeTitle}
        </span>
      </div>

      {/* Center: Window controls */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5">
        <button
          style={btnStyle}
          onClick={cascadeWindows}
          title="Cascade windows"
          aria-label="Cascade windows"
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-400) 15%, transparent)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.background = 'transparent' }}
        >
          <svg viewBox="0 0 16 14" width="13" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="0.75" y="0.75" width="9" height="7" rx="1.5"/>
            <rect x="5.25" y="5.75" width="9" height="7" rx="1.5"/>
          </svg>
        </button>
        <button
          style={btnStyle}
          onClick={stackWindows}
          title="Stack windows"
          aria-label="Stack windows"
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-400) 15%, transparent)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.background = 'transparent' }}
        >
          <svg viewBox="0 0 16 14" width="13" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2.5" y="0.75" width="11" height="7.5" rx="1.5" opacity="0.5"/>
            <rect x="0.75" y="4.5" width="14.5" height="8.75" rx="1.5"/>
          </svg>
        </button>
        <button
          style={btnStyle}
          onClick={cycleWindow}
          title="Cycle windows"
          aria-label="Cycle windows"
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-400) 15%, transparent)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.background = 'transparent' }}
        >
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 8a5.5 5.5 0 1 1-1.38-3.65"/>
            <path d="M10.5 1.5l2.5 3-3 .5"/>
          </svg>
        </button>

        <div className="w-px h-3.5 mx-1 rounded-full opacity-30" style={{ background: 'var(--text-secondary)' }} />

        <button
          style={btnStyle}
          onClick={minimizeAllWindows}
          title="Minimize all windows"
          aria-label="Minimize all windows"
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-400) 15%, transparent)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.background = 'transparent' }}
        >
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M3 11h10"/>
          </svg>
        </button>
        <button
          style={btnStyle}
          onClick={closeAllWindows}
          title="Close all windows"
          aria-label="Close all windows"
          onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-400) 15%, transparent)' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '0.7'; e.currentTarget.style.background = 'transparent' }}
        >
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8"/>
          </svg>
        </button>
      </div>

      {/* Right: System tray */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          className="bg-transparent border-none cursor-pointer p-0 flex items-center justify-center w-4 h-4 transition-transform hover:scale-110"
          style={{ color: 'var(--text-secondary)' }}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          )}
        </button>

        {/* Accent color dot */}
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent-500)' }} />

        {/* Date & Time */}
        <span className="text-[12px] tabular-nums" style={{ color: 'var(--text-secondary)' }}>
          {formattedDate} {formattedTime}
        </span>
      </div>
    </div>
  )
}

export default MenuBar
