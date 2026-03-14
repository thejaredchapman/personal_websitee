import { useState, useEffect } from 'react'
import { useWindows } from '../context/WindowContext'
import { useTheme } from '../context/ThemeContext'

function MenuBar() {
  const { activeWindow, windows } = useWindows()
  const { theme, toggleTheme } = useTheme()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 30000)
    return () => clearInterval(interval)
  }, [])

  const activeTitle = activeWindow ? windows[activeWindow]?.title : 'JaredOS'
  const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  const formattedDate = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })

  return (
    <div className="fixed top-0 left-0 right-0 h-7 z-[950] flex items-center justify-between px-4 os-menubar select-none">
      {/* Left: App name */}
      <div className="flex items-center gap-4">
        <span className="text-[13px] font-bold" style={{ color: 'var(--text-primary)' }}>
          {activeTitle}
        </span>
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
