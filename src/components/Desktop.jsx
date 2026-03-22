import { useEffect } from 'react'
import { useWindows } from '../context/WindowContext'
import { useColor } from '../context/ColorContext'
import { characterThemes } from '../data/characterThemes'
import Window from './Window'

import AboutApp from './apps/AboutApp'
import TerminalApp from './apps/TerminalApp'
import CodeComedyApp from './apps/CodeComedyApp'
import ProjectsApp from './apps/ProjectsApp'
import ResumeApp from './apps/ResumeApp'
import GalleryApp from './apps/GalleryApp'
import MusicApp from './apps/MusicApp'
import ContactApp from './apps/ContactApp'
import SettingsApp from './apps/SettingsApp'
import ClippyApp from './apps/ClippyApp'
import GeometricWallpaper from './GeometricWallpaper'

const APP_COMPONENTS = {
  about: AboutApp,
  terminal: TerminalApp,
  codecomedy: CodeComedyApp,
  projects: ProjectsApp,
  resume: ResumeApp,
  gallery: GalleryApp,
  music: MusicApp,
  contact: ContactApp,
  settings: SettingsApp,
  clippy: ClippyApp,
}

function Notifications() {
  const { notifications, dismissNotification } = useWindows()

  useEffect(() => {
    // Auto-dismiss notifications after 5 seconds
    notifications.forEach((n) => {
      const timer = setTimeout(() => dismissNotification(n.id), 5000)
      return () => clearTimeout(timer)
    })
  }, [notifications, dismissNotification])

  return (
    <div className="fixed top-10 right-4 z-[9000] flex flex-col gap-2 pointer-events-none">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="os-notification pointer-events-auto animate-[notifIn_0.3s_ease] cursor-pointer"
          onClick={() => dismissNotification(n.id)}
        >
          <div className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-medium max-w-[320px]" style={{ background: 'var(--win-bg)', color: 'var(--text-primary)', border: '1px solid var(--win-border)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--accent-400)' }} />
            {n.text}
          </div>
        </div>
      ))}
    </div>
  )
}

function Desktop() {
  const { windows, openWindow, notify } = useWindows()
  const { activeCharacter } = useColor()
  const wallpaperConfig = activeCharacter && characterThemes[activeCharacter]
    ? characterThemes[activeCharacter].wallpaper
    : null

  // Auto-open About on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      openWindow('about')
      notify('Welcome to JaredOS! Click the dock icons below to explore.')
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="fixed inset-0 os-wallpaper"
      style={wallpaperConfig ? { background: wallpaperConfig.background, transition: 'background 0.8s ease' } : { transition: 'background 0.8s ease' }}
    >
      {/* Wallpaper */}
      {wallpaperConfig ? (
        <>
          {/* Character theme blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {wallpaperConfig.blobs.map((blob, i) => (
              <div
                key={i}
                className="absolute rounded-[50%] pointer-events-none"
                style={{
                  width: blob.width,
                  height: blob.height,
                  top: blob.top,
                  left: blob.left,
                  bottom: blob.bottom,
                  right: blob.right,
                  background: blob.color,
                  filter: `blur(${blob.blur}px)`,
                  opacity: blob.opacity,
                  animation: 'pulse 8s ease-in-out infinite',
                  animationDelay: `${-i * 2.5}s`,
                  transition: 'opacity 0.8s ease',
                }}
              />
            ))}
          </div>
          {wallpaperConfig.overlay && (
            <div className="absolute inset-0 pointer-events-none" style={wallpaperConfig.overlay} />
          )}
        </>
      ) : (
        /* Default geometric wallpaper */
        <GeometricWallpaper />
      )}

      {/* Windows area (below menubar, above dock) */}
      <div className="absolute inset-0 top-7 bottom-14">
        {Object.keys(windows).map((id) => {
          const Component = APP_COMPONENTS[id]
          if (!Component) return null
          return (
            <Window key={id} id={id}>
              <Component />
            </Window>
          )
        })}
      </div>

      {/* Notifications */}
      <Notifications />
    </div>
  )
}

export default Desktop
