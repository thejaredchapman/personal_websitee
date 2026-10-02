import { useState, useEffect } from 'react'
import { useWindows } from '../context/WindowContext'
import { useColor } from '../context/ColorContext'
import { characterThemes } from '../data/characterThemes'
import { getLinkedArticleId } from '../utils/articleLink'
import GeometricWallpaper from './GeometricWallpaper'
import { APP_COMPONENTS, DOCK_APPS, DOCK_CLIPPY, DOCK_GAME } from './appRegistry'

const HOME_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/></svg>
)

const GRID_APPS = [...DOCK_APPS, DOCK_CLIPPY, DOCK_GAME]
const SHORTCUT_IDS = ['about', 'projects', 'resume', 'contact']
const SHORTCUTS = SHORTCUT_IDS.map((id) => DOCK_APPS.find((a) => a.id === id))

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])
  return <>{now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</>
}

function MobileShell({ onOpenGame }) {
  const { windows, activeWindow, openWindow, minimizeAllWindows } = useWindows()
  const { activeCharacter } = useColor()
  const wallpaperConfig = activeCharacter && characterThemes[activeCharacter]
    ? characterThemes[activeCharacter].wallpaper
    : null

  const current = activeWindow && windows[activeWindow]?.isOpen && !windows[activeWindow].isMinimized
    ? activeWindow
    : null

  // Direct article links (?read=<id>) go straight into Writing
  useEffect(() => {
    if (getLinkedArticleId()) openWindow('writing')
  }, [openWindow])

  const launch = (item) => {
    if (item.id === '__game__') onOpenGame()
    else openWindow(item.id)
  }

  const currentTitle = current ? windows[current].title : null

  return (
    <div
      className="fixed inset-0 os-wallpaper flex flex-col overflow-hidden"
      style={wallpaperConfig ? { background: wallpaperConfig.background } : undefined}
    >
      {!wallpaperConfig && <GeometricWallpaper />}

      {/* Status bar / app header */}
      <header
        className="relative z-10 shrink-0 os-menubar flex items-center px-4"
        style={{ paddingTop: 'env(safe-area-inset-top)', height: 'calc(env(safe-area-inset-top) + 44px)', color: 'var(--text-primary)' }}
      >
        {current ? (
          <>
            <button
              onClick={minimizeAllWindows}
              className="flex items-center gap-1 min-h-[44px] pr-3 -ml-2 pl-1 border-none bg-transparent cursor-pointer text-[15px] font-medium"
              style={{ color: 'var(--accent-500)' }}
              aria-label="Back to home"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              Home
            </button>
            <span className="absolute left-1/2 -translate-x-1/2 text-[16px] font-semibold truncate max-w-[50%]">{currentTitle}</span>
          </>
        ) : (
          <div className="flex w-full items-center justify-between text-[14px] font-semibold">
            <Clock />
            <span className="opacity-70">JaredOS</span>
          </div>
        )}
      </header>

      {/* Home grid */}
      <main className="relative z-[1] flex-1 overflow-y-auto px-5 pt-8 pb-4">
        <div className="grid grid-cols-4 gap-x-3 gap-y-6 max-w-[420px] mx-auto">
          {GRID_APPS.map((item) => (
            <button
              key={item.id}
              onClick={() => launch(item)}
              className="flex flex-col items-center gap-1.5 border-none bg-transparent cursor-pointer p-0 active:scale-90 transition-transform"
              aria-label={item.label}
            >
              <span
                className="os-dock os-dock-icon flex items-center justify-center w-[60px] h-[60px] rounded-[16px]"
                style={{ color: 'var(--accent-400)' }}
              >
                <span className="w-7 h-7">{item.icon}</span>
              </span>
              <span className="text-[11px] font-medium leading-tight text-center line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* Open apps: full-screen, state kept while on home */}
      {Object.keys(windows).map((id) => {
        const Component = APP_COMPONENTS[id]
        if (!Component || !windows[id].isOpen) return null
        const visible = id === current
        return (
          <section
            key={id}
            className={`absolute left-0 right-0 z-[5] overflow-auto os-window-content ${visible ? 'mobile-app-in' : ''}`}
            style={{
              top: 'calc(env(safe-area-inset-top) + 44px)',
              bottom: 'calc(env(safe-area-inset-bottom) + 68px)',
              background: 'var(--win-bg)',
              display: visible ? 'block' : 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <Component />
          </section>
        )
      })}

      {/* Bottom bar */}
      <nav
        className="relative z-10 shrink-0 os-dock flex items-center justify-around px-2 mx-3 mb-2 rounded-3xl"
        style={{ height: 60, marginBottom: 'calc(env(safe-area-inset-bottom) + 8px)' }}
      >
        {[{ id: 'home', label: 'Home', icon: HOME_ICON }, ...SHORTCUTS].map((item) => {
          const isHome = item.id === 'home'
          const active = isHome ? !current : current === item.id
          return (
            <button
              key={item.id}
              onClick={() => (isHome ? minimizeAllWindows() : openWindow(item.id))}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl border-none cursor-pointer p-0 ${active ? 'os-dock-icon-active' : 'os-dock-icon'}`}
              aria-label={item.label}
            >
              <span className="w-6 h-6" style={{ color: active ? '#fff' : 'var(--dock-icon-color)' }}>{item.icon}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default MobileShell
