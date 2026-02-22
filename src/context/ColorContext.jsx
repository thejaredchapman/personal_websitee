import { createContext, useContext, useEffect, useState } from 'react'

const ColorContext = createContext(undefined)

const COLOR_KEY = 'accent-color-preference'
const CUSTOM_COLOR_KEY = 'accent-custom-color'

export const colorThemes = {
  orange: {
    name: 'Orange',
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  blue: {
    name: 'Blue',
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  green: {
    name: 'Green',
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  purple: {
    name: 'Purple',
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
  },
  pink: {
    name: 'Pink',
    50: '#fdf2f8',
    100: '#fce7f3',
    200: '#fbcfe8',
    300: '#f9a8d4',
    400: '#f472b6',
    500: '#ec4899',
    600: '#db2777',
    700: '#be185d',
    800: '#9d174d',
    900: '#831843',
  },
  teal: {
    name: 'Teal',
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
  },
  red: {
    name: 'Red',
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  yellow: {
    name: 'Yellow',
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
}

// --- Color conversion utilities ---

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function hslToHex(h, s, l) {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * Math.max(0, Math.min(1, color)))
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

export function hexToHsl(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  return rgbToHsl(rgb.r, rgb.g, rgb.b)
}

export function hslToHexExport(h, s, l) {
  return hslToHex(h, s, l)
}

// Generate a full 50-900 palette from a single hex color
export function generatePalette(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return null
  const { h, s } = rgbToHsl(rgb.r, rgb.g, rgb.b)

  // Lightness values for each shade tier
  const shades = {
    50: { s: Math.min(100, s + 10), l: 97 },
    100: { s: Math.min(100, s + 5), l: 93 },
    200: { s: Math.min(100, s + 2), l: 86 },
    300: { s: s, l: 74 },
    400: { s: s, l: 60 },
    500: { s: s, l: 48 },
    600: { s: Math.min(100, s + 5), l: 40 },
    700: { s: Math.min(100, s + 8), l: 32 },
    800: { s: Math.min(100, s + 8), l: 26 },
    900: { s: Math.min(100, s + 10), l: 20 },
  }

  const palette = { name: 'Custom' }
  for (const [key, val] of Object.entries(shades)) {
    palette[key] = hslToHex(h, val.s, val.l)
  }
  return palette
}

export function isValidHex(hex) {
  return /^#?([a-f\d]{3}|[a-f\d]{6})$/i.test(hex)
}

// Normalize 3-digit hex to 6-digit
function normalizeHex(hex) {
  hex = hex.replace('#', '')
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  return '#' + hex
}

export function ColorProvider({ children }) {
  const [accentColor, setAccentColor] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(COLOR_KEY)
      if (stored === 'custom') return 'custom'
      if (stored && colorThemes[stored]) return stored
    }
    return 'orange'
  })

  const [customHex, setCustomHex] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(CUSTOM_COLOR_KEY)
      if (stored && isValidHex(stored)) return normalizeHex(stored)
    }
    return '#6366f1'
  })

  useEffect(() => {
    let theme
    if (accentColor === 'custom') {
      theme = generatePalette(customHex)
      if (!theme) theme = colorThemes.orange
    } else {
      theme = colorThemes[accentColor]
    }

    const root = document.documentElement
    root.style.setProperty('--accent-50', theme[50])
    root.style.setProperty('--accent-100', theme[100])
    root.style.setProperty('--accent-200', theme[200])
    root.style.setProperty('--accent-300', theme[300])
    root.style.setProperty('--accent-400', theme[400])
    root.style.setProperty('--accent-500', theme[500])
    root.style.setProperty('--accent-600', theme[600])
    root.style.setProperty('--accent-700', theme[700])
    root.style.setProperty('--accent-800', theme[800])
    root.style.setProperty('--accent-900', theme[900])

    const rgb500 = hexToRgb(theme[500])
    if (rgb500) {
      root.style.setProperty(
        '--shadow-accent',
        `rgba(${rgb500.r}, ${rgb500.g}, ${rgb500.b}, 0.4)`
      )
    }

    localStorage.setItem(COLOR_KEY, accentColor)
    if (accentColor === 'custom') {
      localStorage.setItem(CUSTOM_COLOR_KEY, customHex)
    }
  }, [accentColor, customHex])

  const changeColor = (colorName) => {
    if (colorThemes[colorName]) {
      setAccentColor(colorName)
    }
  }

  const setCustomColor = (hex) => {
    const normalized = normalizeHex(hex)
    setCustomHex(normalized)
    setAccentColor('custom')
  }

  return (
    <ColorContext.Provider
      value={{
        accentColor,
        changeColor,
        colorThemes,
        customHex,
        setCustomColor,
        hexToHsl,
        hslToHexExport,
      }}
    >
      {children}
    </ColorContext.Provider>
  )
}

export function useColor() {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider')
  }
  return context
}
