import { useRef, useCallback, useEffect, useState } from 'react'
import { useWindows } from '../context/WindowContext'

const SNAP_THRESHOLD = 50

// Preview overlay positions for each snap zone
const SNAP_PREVIEW_STYLES = {
  left:        { top: 28, left: 0,   width: '50%', bottom: 56 },
  right:       { top: 28, right: 0,  width: '50%', bottom: 56 },
  'top-left':  { top: 28, left: 0,   width: '50%', height: 'calc((100vh - 84px) / 2)' },
  'top-right': { top: 28, right: 0,  width: '50%', height: 'calc((100vh - 84px) / 2)' },
  'bot-left':  { bottom: 56, left: 0,  width: '50%', height: 'calc((100vh - 84px) / 2)' },
  'bot-right': { bottom: 56, right: 0, width: '50%', height: 'calc((100vh - 84px) / 2)' },
}

function getSnapBounds(side) {
  const sw = window.innerWidth
  const sh = window.innerHeight
  const dh = sh - 28 - 56
  const hw = Math.floor(sw / 2)
  const hh = Math.floor(dh / 2)
  const map = {
    left:        { x: 0,  y: 28,      w: hw, h: dh },
    right:       { x: hw, y: 28,      w: hw, h: dh },
    'top-left':  { x: 0,  y: 28,      w: hw, h: hh },
    'top-right': { x: hw, y: 28,      w: hw, h: hh },
    'bot-left':  { x: 0,  y: 28 + hh, w: hw, h: hh },
    'bot-right': { x: hw, y: 28 + hh, w: hw, h: hh },
  }
  return map[side] ?? null
}

// --- Layout picker (per-window title bar popover) ---

const SNAP_LAYOUTS = [
  { id: 'left',      label: 'Left Half'  },
  { id: 'right',     label: 'Right Half' },
  { id: 'top-left',  label: 'Top Left'   },
  { id: 'top-right', label: 'Top Right'  },
  { id: 'bot-left',  label: 'Bot Left'   },
  { id: 'bot-right', label: 'Bot Right'  },
  { id: 'max',       label: 'Maximize'   },
]

function LayoutIcon({ type }) {
  return (
    <svg width="26" height="17" viewBox="0 0 26 17">
      <rect x="0.5" y="0.5" width="25" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35"/>
      {type === 'left'      && <rect x="0.5" y="0.5" width="12"  height="16" rx="2" fill="currentColor" opacity="0.7"/>}
      {type === 'right'     && <rect x="13"  y="0.5" width="13"  height="16" rx="2" fill="currentColor" opacity="0.7"/>}
      {type === 'top-left'  && <rect x="0.5" y="0.5" width="12"  height="8"  rx="2" fill="currentColor" opacity="0.7"/>}
      {type === 'top-right' && <rect x="13"  y="0.5" width="13"  height="8"  rx="2" fill="currentColor" opacity="0.7"/>}
      {type === 'bot-left'  && <rect x="0.5" y="8.5" width="12"  height="8"  rx="2" fill="currentColor" opacity="0.7"/>}
      {type === 'bot-right' && <rect x="13"  y="8.5" width="13"  height="8"  rx="2" fill="currentColor" opacity="0.7"/>}
      {type === 'max'       && <rect x="0.5" y="0.5" width="25"  height="16" rx="2" fill="currentColor" opacity="0.7"/>}
    </svg>
  )
}

function LayoutPicker({ id, btnRef, onClose }) {
  const { moveWindow, resizeWindow, toggleMaximize } = useWindows()
  const ref = useRef(null)
  const [pos, setPos] = useState({ top: 0, right: 0 })

  useEffect(() => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      setPos({ top: rect.bottom + 6, right: window.innerWidth - rect.right })
    }
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose, btnRef])

  const apply = (layoutId) => {
    if (layoutId === 'max') {
      toggleMaximize(id)
    } else {
      const b = getSnapBounds(layoutId)
      if (b) {
        moveWindow(id, { x: b.x, y: b.y })
        resizeWindow(id, { width: b.w, height: b.h })
      }
    }
    onClose()
  }

  return (
    <div
      ref={ref}
      className="fixed z-[10000] rounded-xl shadow-2xl"
      style={{
        top: pos.top,
        right: pos.right,
        background: 'var(--win-bg)',
        border: '1px solid var(--win-border)',
        backdropFilter: 'blur(20px)',
        padding: '8px',
        minWidth: '156px',
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-2 gap-1">
        {SNAP_LAYOUTS.map(({ id: lid, label }) => (
          <button
            key={lid}
            onClick={() => apply(lid)}
            title={label}
            className={`flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-[10px] font-medium transition-colors${lid === 'max' ? ' col-span-2' : ''}`}
            style={{ color: 'var(--text-primary)', background: 'transparent', border: 'none', cursor: 'pointer' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'color-mix(in srgb, var(--accent-400) 18%, transparent)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
          >
            <LayoutIcon type={lid} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// --- Window chrome ---

function Window({ id, children }) {
  const {
    windows, activeWindow,
    closeWindow, minimizeWindow, focusWindow, toggleMaximize, moveWindow, resizeWindow,
  } = useWindows()

  const win = windows[id]
  const titleBarRef = useRef(null)
  const layoutBtnRef = useRef(null)
  const isDragging = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const snapSideRef = useRef(null)
  const [closing, setClosing] = useState(false)
  const [opening, setOpening] = useState(true)
  const [snapSide, setSnapSide] = useState(null)
  const [showLayoutPicker, setShowLayoutPicker] = useState(false)

  useEffect(() => {
    if (win?.isOpen) {
      setOpening(true)
      const t = setTimeout(() => setOpening(false), 250)
      return () => clearTimeout(t)
    }
  }, [win?.isOpen])

  const handleMouseDown = useCallback((e) => {
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
      const newY = Math.max(28, e.clientY - dragOffset.current.y)
      moveWindow(id, { x: newX, y: newY })

      const nearL = e.clientX < SNAP_THRESHOLD
      const nearR = e.clientX > window.innerWidth - SNAP_THRESHOLD
      const nearT = e.clientY < 28 + SNAP_THRESHOLD
      const nearB = e.clientY > window.innerHeight - 56 - SNAP_THRESHOLD
      const side = nearL && nearT ? 'top-left'
        : nearR && nearT ? 'top-right'
        : nearL && nearB ? 'bot-left'
        : nearR && nearB ? 'bot-right'
        : nearL ? 'left'
        : nearR ? 'right'
        : null
      snapSideRef.current = side
      setSnapSide(side)
    }

    const handleMouseUp = () => {
      isDragging.current = false
      const side = snapSideRef.current
      snapSideRef.current = null
      setSnapSide(null)
      if (side) {
        const b = getSnapBounds(side)
        if (b) {
          moveWindow(id, { x: b.x, y: b.y })
          resizeWindow(id, { width: b.w, height: b.h })
        }
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }, [id, win?.position, win?.isMaximized, focusWindow, moveWindow, resizeWindow])

  // Touch drag support (no snap on touch)
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
    <>
      {/* Snap zone preview */}
      {snapSide && (
        <div
          className="fixed pointer-events-none rounded-xl"
          style={{
            ...SNAP_PREVIEW_STYLES[snapSide],
            zIndex: 9997,
            background: 'var(--accent-400)',
            opacity: 0.18,
            border: '2px solid var(--accent-500)',
            transition: 'all 0.1s ease',
          }}
        />
      )}

      {/* Window */}
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
          <span
            className={`flex-1 text-center text-[13px] font-medium truncate pr-4 ${isActive ? 'opacity-90' : 'opacity-50'}`}
            style={{ color: 'var(--text-primary)' }}
          >
            {win.title}
          </span>

          {/* Layout picker trigger */}
          <button
            ref={layoutBtnRef}
            className="window-btn w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-opacity"
            style={{
              color: 'var(--text-primary)',
              background: showLayoutPicker ? 'color-mix(in srgb, var(--accent-400) 20%, transparent)' : 'transparent',
              opacity: isActive ? (showLayoutPicker ? 1 : 0.45) : 0.2,
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={(e) => { e.stopPropagation(); setShowLayoutPicker(p => !p) }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = isActive ? (showLayoutPicker ? '1' : '0.45') : '0.2' }}
            aria-label="Window layout options"
          >
            <svg viewBox="0 0 12 12" width="10" height="10" fill="currentColor">
              <rect x="0" y="0" width="5" height="5" rx="1"/>
              <rect x="7" y="0" width="5" height="5" rx="1"/>
              <rect x="0" y="7" width="5" height="5" rx="1"/>
              <rect x="7" y="7" width="5" height="5" rx="1"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto os-window-content" style={{ background: 'var(--win-bg)' }}>
          {children}
        </div>
      </div>

      {/* Layout picker popover — outside window div to escape overflow:hidden */}
      {showLayoutPicker && (
        <LayoutPicker id={id} btnRef={layoutBtnRef} onClose={() => setShowLayoutPicker(false)} />
      )}
    </>
  )
}

export default Window
