import { useState, useRef, useEffect } from 'react'
import ThemeToggle from './ThemeToggle'
import ColorPicker from './ColorPicker'
import './ThemePanel.css'

function ThemePanel() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        open &&
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div className="theme-panel-container">
      <button
        ref={buttonRef}
        className={`theme-panel-fab ${open ? 'active' : ''}`}
        onClick={() => setOpen(!open)}
        aria-label="Theme settings"
        title="Theme settings"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2.7c5.1 0 9.3 4.2 9.3 9.3 0 3-1.4 4.8-4.6 4.8h-1.8c-1.2 0-2.2 1-2.2 2.2 0 .5.2 1 .5 1.3.3.4.5.8.5 1.3 0 1.2-1 2.2-2.2 2.2C6.4 23.7 2.2 19.6 2.2 14.4c0-6.5 5.3-11.7 9.8-11.7z" />
          <circle cx="8" cy="11" r="2" fill="var(--accent-400)" stroke="none" />
          <circle cx="13" cy="7.5" r="2" fill="var(--accent-300)" stroke="none" />
          <circle cx="17.5" cy="11" r="2" fill="var(--accent-500)" stroke="none" />
        </svg>
      </button>

      {open && (
        <div ref={panelRef} className="theme-panel">
          <div className="theme-panel-header">
            <span className="theme-panel-title">Theme</span>
            <ThemeToggle />
          </div>
          <div className="theme-panel-body">
            <ColorPicker />
          </div>
        </div>
      )}
    </div>
  )
}

export default ThemePanel
