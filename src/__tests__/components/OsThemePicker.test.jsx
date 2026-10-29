import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from '../../context/ThemeContext'
import OsThemePicker from '../../components/OsThemePicker'

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-os')
  document.documentElement.removeAttribute('data-theme')
})

function setup() {
  render(
    <ThemeProvider>
      <OsThemePicker />
    </ThemeProvider>
  )
}

describe('OsThemePicker', () => {
  it('offers the six OS themes with Tandy 1000 selected by default', () => {
    setup()
    for (const label of ['Windows XP', 'Windows 95', 'macOS', 'MySpace', 'Ubuntu', 'Tandy 1000']) {
      expect(screen.getByRole('button', { name: new RegExp(label) })).toBeInTheDocument()
    }
    expect(screen.getByRole('button', { name: /Tandy 1000/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('switches the OS on click', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: /Windows XP/ }))
    expect(document.documentElement.getAttribute('data-os')).toBe('xp')
    expect(screen.getByRole('button', { name: /Windows XP/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('switches between light and dark', () => {
    setup()
    fireEvent.click(screen.getByRole('button', { name: 'dark' }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    fireEvent.click(screen.getByRole('button', { name: 'light' }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })
})
