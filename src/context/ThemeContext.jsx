import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(undefined)

const THEME_KEY = 'theme-preference'

const DARK_QUERY = '(prefers-color-scheme: dark)'

function readStored() {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return stored === 'dark' || stored === 'light' ? stored : null
  } catch {
    return null
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
  const theme = override ?? system

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
