import { describe, it, expect } from 'vitest'
import {
  hexToHsl,
  hslToHexExport,
  generatePalette,
  isValidHex,
  colorThemes,
} from '../../context/ColorContext'

describe('isValidHex', () => {
  it('accepts 6-digit hex with #', () => {
    expect(isValidHex('#f97316')).toBe(true)
  })

  it('accepts 3-digit hex with #', () => {
    expect(isValidHex('#abc')).toBe(true)
  })

  it('accepts hex without #', () => {
    expect(isValidHex('f97316')).toBe(true)
  })

  it('accepts 3-digit hex without #', () => {
    expect(isValidHex('abc')).toBe(true)
  })

  it('rejects invalid hex', () => {
    expect(isValidHex('not-a-color')).toBe(false)
  })

  it('rejects empty string', () => {
    expect(isValidHex('')).toBe(false)
  })

  it('rejects 5-digit hex', () => {
    expect(isValidHex('#12345')).toBe(false)
  })

  it('rejects hex with invalid chars', () => {
    expect(isValidHex('#gggggg')).toBe(false)
  })
})

describe('hexToHsl', () => {
  it('converts pure red', () => {
    const result = hexToHsl('#ff0000')
    expect(result.h).toBe(0)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('converts pure green', () => {
    const result = hexToHsl('#00ff00')
    expect(result.h).toBe(120)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('converts pure blue', () => {
    const result = hexToHsl('#0000ff')
    expect(result.h).toBe(240)
    expect(result.s).toBe(100)
    expect(result.l).toBe(50)
  })

  it('converts white (#ffffff)', () => {
    const result = hexToHsl('#ffffff')
    expect(result.s).toBe(0)
    expect(result.l).toBe(100)
  })

  it('converts black (#000000)', () => {
    const result = hexToHsl('#000000')
    expect(result.s).toBe(0)
    expect(result.l).toBe(0)
  })

  it('returns null for invalid hex', () => {
    expect(hexToHsl('not-valid')).toBeNull()
  })

  it('converts orange theme 500 color', () => {
    const result = hexToHsl('#f97316')
    expect(result).not.toBeNull()
    // Orange hue is roughly 20-30 degrees
    expect(result.h).toBeGreaterThan(15)
    expect(result.h).toBeLessThan(35)
  })
})

describe('hslToHexExport', () => {
  it('converts red hsl(0, 100%, 50%) back to red hex', () => {
    const result = hslToHexExport(0, 100, 50)
    expect(result.toLowerCase()).toBe('#ff0000')
  })

  it('converts green hsl(120, 100%, 50%) back to green hex', () => {
    const result = hslToHexExport(120, 100, 50)
    expect(result.toLowerCase()).toBe('#00ff00')
  })

  it('converts blue hsl(240, 100%, 50%) back to blue hex', () => {
    const result = hslToHexExport(240, 100, 50)
    expect(result.toLowerCase()).toBe('#0000ff')
  })

  it('produces a valid 7-character hex string', () => {
    const result = hslToHexExport(200, 80, 60)
    expect(result).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('round-trips: hexToHsl then hslToHexExport recovers approximate original', () => {
    const original = '#3b82f6'
    const hsl = hexToHsl(original)
    const recovered = hslToHexExport(hsl.h, hsl.s, hsl.l)
    // Parse each channel separately and allow ±5 rounding tolerance
    const parse = (hex) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    })
    const orig = parse(original)
    const rec = parse(recovered)
    expect(Math.abs(orig.r - rec.r)).toBeLessThanOrEqual(5)
    expect(Math.abs(orig.g - rec.g)).toBeLessThanOrEqual(5)
    expect(Math.abs(orig.b - rec.b)).toBeLessThanOrEqual(5)
  })
})

describe('generatePalette', () => {
  it('returns an object with all shade keys', () => {
    const palette = generatePalette('#f97316')
    expect(palette).not.toBeNull()
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
    for (const shade of shades) {
      expect(palette[shade]).toBeDefined()
      expect(typeof palette[shade]).toBe('string')
    }
  })

  it('each shade value is a valid hex color', () => {
    const palette = generatePalette('#a855f7')
    for (const shade of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]) {
      expect(palette[shade]).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })

  it('has name "Custom"', () => {
    const palette = generatePalette('#22c55e')
    expect(palette.name).toBe('Custom')
  })

  it('lighter shades have higher lightness than darker ones', () => {
    const palette = generatePalette('#3b82f6')
    const l50 = hexToHsl(palette[50]).l
    const l900 = hexToHsl(palette[900]).l
    expect(l50).toBeGreaterThan(l900)
  })

  it('returns null for invalid hex', () => {
    expect(generatePalette('not-a-color')).toBeNull()
  })

  it('works for all predefined color theme colors', () => {
    for (const [, theme] of Object.entries(colorThemes)) {
      const palette = generatePalette(theme[500])
      expect(palette).not.toBeNull()
      expect(palette[500]).toBeDefined()
    }
  })
})

describe('colorThemes', () => {
  const themeNames = ['orange', 'blue', 'green', 'purple', 'pink', 'teal', 'red', 'yellow']

  it('has all expected themes', () => {
    for (const name of themeNames) {
      expect(colorThemes[name]).toBeDefined()
    }
  })

  it('each theme has all shade levels', () => {
    for (const name of themeNames) {
      const theme = colorThemes[name]
      for (const shade of [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]) {
        expect(theme[shade]).toBeDefined()
        expect(theme[shade]).toMatch(/^#[0-9a-f]{6}$/i)
      }
    }
  })

  it('each theme has a name property', () => {
    for (const name of themeNames) {
      expect(typeof colorThemes[name].name).toBe('string')
    }
  })

  it('orange theme 500 is the correct brand color', () => {
    expect(colorThemes.orange[500]).toBe('#f97316')
  })

  it('blue theme 500 is the correct brand color', () => {
    expect(colorThemes.blue[500]).toBe('#3b82f6')
  })

  it('shades get darker from 50 to 900', () => {
    for (const name of themeNames) {
      const theme = colorThemes[name]
      const l50 = hexToHsl(theme[50]).l
      const l500 = hexToHsl(theme[500]).l
      const l900 = hexToHsl(theme[900]).l
      expect(l50).toBeGreaterThan(l500)
      expect(l500).toBeGreaterThan(l900)
    }
  })
})
