import { createContext, useContext, useEffect, useState } from 'react'
import { DEFAULT_OS, OS_IDS } from '../themes/themes'

const ThemeContext = createContext(undefined)

const THEME_KEY = 'theme-preference'
const OS_KEY = 'os-theme'

const DARK_QUERY = '(prefers-color-scheme: dark)'

function readStored() {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return stored === 'dark' || stored === 'light' ? stored : null
  } catch {
    return null
  }
}

function readStoredOs() {
  try {
    const stored = localStorage.getItem(OS_KEY)
    return OS_IDS.includes(stored) ? stored : DEFAULT_OS
  } catch {
    return DEFAULT_OS
  }
}

function systemTheme() {
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

// The theme follows the system setting (live, including when it changes) until
// the visitor toggles it by hand; only that explicit choice is saved.
export function ThemeProvider({ children }) {
  const [override, setOverride] = useState(readStored)
  const [system, setSystem] = useState(() => (typeof window !== 'undefined' ? systemTheme() : 'light'))
  const [os, setOsState] = useState(readStoredOs)
  const theme = override ?? system

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-os', os)
  }, [os])

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_QUERY)
    const handleChange = (e) => setSystem(e.matches ? 'dark' : 'light')
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setOverride(next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // storage unavailable: the choice still applies for this session
    }
  }

  const setOs = (next) => {
    if (!OS_IDS.includes(next)) return
    setOsState(next)
    try {
      localStorage.setItem(OS_KEY, next)
    } catch {
      // storage unavailable: the choice still applies for this session
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, os, setOs }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
