import { useState, useEffect, useRef } from 'react'
import { useWindows } from '../context/WindowContext'

const DESKTOP_ICONS = [
  { id: 'projects', label: 'Projects', glyph: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
  )},
  { id: 'resume', label: 'Resume.pdf', glyph: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
  )},
  { id: 'gallery', label: 'Photos', glyph: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
  )},
]

function DesktopIcons() {
  const { openWindow } = useWindows()
  const [selected, setSelected] = useState(null)
  const containerRef = useRef(null)

  // Clicking anywhere outside the icons deselects, like a real desktop
  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setSelected(null)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const open = (id) => {
    openWindow(id)
    setSelected(null)
  }

  return (
    <div ref={containerRef} className="absolute top-4 right-4 flex flex-col gap-1 max-[768px]:hidden">
      {DESKTOP_ICONS.map((icon) => {
        const isSelected = selected === icon.id
        return (
          <button
            key={icon.id}
            className="flex flex-col items-center gap-1.5 w-[84px] py-2 px-1 rounded-lg border-none cursor-default"
            style={{ background: isSelected ? 'color-mix(in srgb, var(--accent-400) 18%, transparent)' : 'transparent' }}
            onClick={() => setSelected(icon.id)}
            onDoubleClick={() => open(icon.id)}
            onKeyDown={(e) => { if (e.key === 'Enter') open(icon.id) }}
            aria-label={`Open ${icon.label}`}
            title={`Double-click to open ${icon.label}`}
          >
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--win-border)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-6 h-6" style={{ color: 'var(--accent-500)' }}>{icon.glyph}</span>
            </span>
            <span
              className="text-[11px] font-medium leading-tight py-0.5 px-1.5 rounded"
              style={isSelected
                ? { background: 'var(--accent-500)', color: 'white' }
                : { color: 'var(--text-primary)' }}
            >
              {icon.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default DesktopIcons
