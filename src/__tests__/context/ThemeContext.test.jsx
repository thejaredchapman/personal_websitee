import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from '../../context/ThemeContext'

function mockMatchMedia(matches) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }))
}

function TestConsumer({ onRender }) {
  const ctx = useTheme()
  onRender(ctx)
  return null
}

function renderWithProvider(onRender) {
  return render(
    <ThemeProvider>
      <TestConsumer onRender={onRender} />
    </ThemeProvider>
  )
}

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.removeAttribute('data-os')
  mockMatchMedia(false)
})

afterEach(() => {
  localStorage.clear()
})

describe('ThemeContext — initial state', () => {
  it('defaults to light when no stored preference and no system preference', () => {
    mockMatchMedia(false)
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.theme).toBe('light')
  })

  it('respects stored "dark" preference', () => {
    localStorage.setItem('theme-preference', 'dark')
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.theme).toBe('dark')
  })

  it('respects stored "light" preference even when system prefers dark', () => {
    localStorage.setItem('theme-preference', 'light')
    mockMatchMedia(true)
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.theme).toBe('light')
  })

  it('uses system dark preference when no stored value', () => {
    mockMatchMedia(true)
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.theme).toBe('dark')
  })

  it('ignores invalid stored values and falls back to system preference', () => {
    localStorage.setItem('theme-preference', 'invalid-value')
    mockMatchMedia(false)
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.theme).toBe('light')
  })
})

describe('ThemeContext — toggleTheme', () => {
  it('toggles from light to dark', () => {
    localStorage.setItem('theme-preference', 'light')
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.theme).toBe('light')
    act(() => ctx.toggleTheme())
    expect(ctx.theme).toBe('dark')
  })

  it('toggles from dark to light', () => {
    localStorage.setItem('theme-preference', 'dark')
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.toggleTheme())
    expect(ctx.theme).toBe('light')
  })

  it('toggles back and forth correctly (double toggle)', () => {
    localStorage.setItem('theme-preference', 'light')
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.toggleTheme())
    act(() => ctx.toggleTheme())
    expect(ctx.theme).toBe('light')
  })
})

describe('ThemeContext — DOM side effects', () => {
  it('sets data-theme attribute on documentElement', () => {
    localStorage.setItem('theme-preference', 'dark')
    renderWithProvider(() => {})
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('updates data-theme attribute after toggle', () => {
    localStorage.setItem('theme-preference', 'light')
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    act(() => ctx.toggleTheme())
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('persists theme to localStorage on toggle', () => {
    localStorage.setItem('theme-preference', 'light')
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.toggleTheme())
    expect(localStorage.getItem('theme-preference')).toBe('dark')
  })
})

describe('ThemeContext — follows the system setting', () => {
  it('does not save a preference until the visitor toggles', () => {
    mockMatchMedia(true)
    renderWithProvider(() => {})
    expect(localStorage.getItem('theme-preference')).toBeNull()
  })

  it('updates live when the system setting changes', () => {
    let listener
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: (_, fn) => { listener = fn },
      removeEventListener: vi.fn(),
    }))
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.theme).toBe('light')
    act(() => listener({ matches: true }))
    expect(ctx.theme).toBe('dark')
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  })

  it('keeps a manual choice when the system setting changes', () => {
    let listener
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: (_, fn) => { listener = fn },
      removeEventListener: vi.fn(),
    }))
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.toggleTheme())
    expect(ctx.theme).toBe('dark')
    act(() => listener({ matches: false }))
    expect(ctx.theme).toBe('dark')
  })
})

describe('ThemeContext — useTheme throws outside provider', () => {
  it('throws if used outside ThemeProvider', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => {
      render(<TestConsumer onRender={() => {}} />)
    }).toThrow('useTheme must be used within a ThemeProvider')
    spy.mockRestore()
  })
})

describe('ThemeContext — OS theme', () => {
  it('defaults to tandy and sets data-os', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.os).toBe('tandy')
    expect(document.documentElement.getAttribute('data-os')).toBe('tandy')
  })

  it('respects a stored os', () => {
    localStorage.setItem('os-theme', 'xp')
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.os).toBe('xp')
  })

  it('falls back to tandy for an invalid stored os', () => {
    localStorage.setItem('os-theme', 'beos')
    let ctx
    renderWithProvider((c) => { ctx = c })
    expect(ctx.os).toBe('tandy')
  })

  it('setOs persists and updates data-os', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.setOs('win95'))
    expect(ctx.os).toBe('win95')
    expect(localStorage.getItem('os-theme')).toBe('win95')
    expect(document.documentElement.getAttribute('data-os')).toBe('win95')
  })

  it('ignores unknown os ids', () => {
    let ctx
    renderWithProvider((c) => { ctx = c })
    act(() => ctx.setOs('nope'))
    expect(ctx.os).toBe('tandy')
    expect(localStorage.getItem('os-theme')).toBeNull()
  })
})
