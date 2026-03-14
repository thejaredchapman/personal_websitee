import { useRef, useCallback, useEffect, useState } from 'react'
import { useWindows } from '../context/WindowContext'

function Window({ id, children }) {
  const {
    windows, activeWindow,
    closeWindow, minimizeWindow, focusWindow, toggleMaximize, moveWindow,
  } = useWindows()

  const win = windows[id]
  const titleBarRef = useRef(null)
  const isDragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const [closing, setClosing] = useState(false)
  const [opening, setOpening] = useState(true)

  useEffect(() => {
    if (win?.isOpen) {
      setOpening(true)
      const t = setTimeout(() => setOpening(false), 250)
      return () => clearTimeout(t)
    }
  }, [win?.isOpen])

  const handleMouseDown = useCallback((e) => {
    // Only drag from title bar, not from buttons
    if (e.target.closest('.window-btn')) return
    if (win.isMaximized) return

    e.preventDefault()
    isDragging.current = true
    dragOffset.current = {
      x: e.clientX - win.position.x,
      y: e.clientY - win.position.y,
    }
    focusWindow(id)

    const handleMouseMove = (e) => {
      if (!isDragging.current) return
      const newX = Math.max(0, e.clientX - dragOffset.current.x)
      const newY = Math.max(28, e.clientY - dragOffset.current.y) // Don't go above menu bar
      moveWindow(id, { x: newX, y: newY })
    }

    const handleMouseUp = () => {
      isDragging.current = false
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [id, win?.position, win?.isMaximized, focusWindow, moveWindow])

  // Touch drag support
  const handleTouchStart = useCallback((e) => {
    if (e.target.closest('.window-btn')) return
    if (win.isMaximized) return

    const touch = e.touches[0]
    isDragging.current = true
    dragOffset.current = {
      x: touch.clientX - win.position.x,
      y: touch.clientY - win.position.y,
    }
    focusWindow(id)

    const handleTouchMove = (e) => {
      if (!isDragging.current) return
      const touch = e.touches[0]
      const newX = Math.max(0, touch.clientX - dragOffset.current.x)
      const newY = Math.max(28, touch.clientY - dragOffset.current.y)
      moveWindow(id, { x: newX, y: newY })
    }

    const handleTouchEnd = () => {
      isDragging.current = false
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
  }, [id, win?.position, win?.isMaximized, focusWindow, moveWindow])

  if (!win || !win.isOpen) return null

  const isActive = activeWindow === id
  const isMinimized = win.isMinimized
  const isMaximized = win.isMaximized

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => {
      closeWindow(id)
      setClosing(false)
    }, 200)
  }

  const style = isMaximized
    ? { top: 28, left: 0, right: 0, bottom: 56, width: 'auto', height: 'auto', zIndex: win.zIndex }
    : {
        top: win.position.y,
        left: win.position.x,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      }

  return (
    <div
      className={`absolute flex flex-col transition-shadow duration-200
        ${isMinimized ? 'os-window-minimize' : ''}
        ${closing ? 'os-window-close' : ''}
        ${opening && !isMinimized ? 'os-window-open' : ''}
        ${isActive ? 'shadow-[0_24px_80px_rgba(0,0,0,0.45)]' : 'shadow-[0_8px_30px_rgba(0,0,0,0.25)]'}
        rounded-xl overflow-hidden border
        max-[768px]:!top-7 max-[768px]:!left-0 max-[768px]:!right-0 max-[768px]:!bottom-14 max-[768px]:!w-auto max-[768px]:!h-auto max-[768px]:rounded-none
      `}
      style={{
        ...style,
        borderColor: isActive ? 'var(--accent-500)' : 'var(--win-border)',
        display: isMinimized ? 'none' : 'flex',
      }}
      onMouseDown={() => { if (!isActive) focusWindow(id) }}
    >
      {/* Title bar */}
      <div
        ref={titleBarRef}
        className={`flex items-center gap-3 px-4 py-2.5 select-none shrink-0 cursor-grab active:cursor-grabbing transition-colors duration-200 ${
          isActive ? 'os-titlebar-active' : 'os-titlebar-inactive'
        }`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onDoubleClick={() => toggleMaximize(id)}
      >
        {/* Traffic lights */}
        <div className="flex gap-2 shrink-0">
          <button
            className="window-btn w-3 h-3 rounded-full bg-[#ff5f57] border-none cursor-pointer hover:brightness-110 transition-all flex items-center justify-center group"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 8 8" className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" stroke="#4a0002" strokeWidth="1.5">
              <path d="M1 1l6 6M7 1l-6 6" />
            </svg>
          </button>
          <button
            className="window-btn w-3 h-3 rounded-full bg-[#febc2e] border-none cursor-pointer hover:brightness-110 transition-all flex items-center justify-center group"
            onClick={() => minimizeWindow(id)}
            aria-label="Minimize"
          >
            <svg viewBox="0 0 8 8" className="w-2 h-2 opacity-0 group-hover:opacity-100 transition-opacity" stroke="#995700" strokeWidth="1.5">
              <path d="M1 4h6" />
            </svg>
          </button>
          <button
            className="window-btn w-3 h-3 rounded-full bg-[#28c840] border-none cursor-pointer hover:brightness-110 transition-all flex items-center justify-center group"
            onClick={() => toggleMaximize(id)}
            aria-label="Maximize"
          >
            <svg viewBox="0 0 8 8" className="w-1.5 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" stroke="#006500" strokeWidth="1.2">
              {isMaximized ? <path d="M1 3h2V1h4v4H5v2H1V3z" fill="none" /> : <path d="M1 1h6v6H1z" fill="none" />}
            </svg>
          </button>
        </div>

        {/* Title */}
        <span className={`flex-1 text-center text-[13px] font-medium truncate pr-12 ${isActive ? 'opacity-90' : 'opacity-50'}`} style={{ color: 'var(--text-primary)' }}>
          {win.title}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto os-window-content" style={{ background: 'var(--win-bg)' }}>
        {children}
      </div>
    </div>
  )
}

export default Window
