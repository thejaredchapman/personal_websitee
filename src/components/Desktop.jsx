import { useEffect } from 'react'
import { useWindows } from '../context/WindowContext'
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

  // Auto-open About on first render
  useEffect(() => {
    const timer = setTimeout(() => {
      openWindow('about')
      notify('Welcome to JaredOS! Click the dock icons below to explore.')
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 os-wallpaper">
      {/* Wallpaper animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="os-wallpaper-blob os-wallpaper-blob-1" />
        <div className="os-wallpaper-blob os-wallpaper-blob-2" />
        <div className="os-wallpaper-blob os-wallpaper-blob-3" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

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
