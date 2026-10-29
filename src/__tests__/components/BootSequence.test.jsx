import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { ThemeProvider } from '../../context/ThemeContext'
import BootSequence from '../../components/BootSequence'

vi.mock('../../utils/buildInfo', () => ({
  commit: {
    hash: 'abc1234',
    date: '2026-10-28T23:53:21-07:00',
    subject: "feat: publish 'What Is an AI Agent, Really?' (interactive article, Oct 29 2026)",
  },
  cleanSubject: (s) => s.replace(/^\w+(\(.+\))?:\s*/, ''),
}))

function renderBoot() {
  return render(
    <ThemeProvider>
      <BootSequence onComplete={() => {}} />
    </ThemeProvider>
  )
}

describe('BootSequence — splash screen', () => {
  beforeEach(() => {
    sessionStorage.clear()
    localStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows the latest commit hash and date', () => {
    renderBoot()
    act(() => vi.advanceTimersByTime(1500))
    expect(screen.getByText(/Latest commit: abc1234/)).toBeInTheDocument()
    expect(screen.getByText(/Oct 28, 2026/)).toBeInTheDocument()
  })

  it('announces the latest commit message as a NEW line', () => {
    renderBoot()
    act(() => vi.advanceTimersByTime(6000))
    expect(screen.getByText(/NEW.*publish 'What Is an AI Agent, Really\?'/)).toBeInTheDocument()
  })

  it('no longer shows the hardcoded last-updated line', () => {
    renderBoot()
    act(() => vi.advanceTimersByTime(6000))
    expect(screen.queryByText(/Last updated/)).not.toBeInTheDocument()
  })

  it.each(['xp', 'win95', 'macos', 'myspace', 'ubuntu', 'tandy'])('renders the %s skin', (os) => {
    localStorage.setItem('os-theme', os)
    const { container } = renderBoot()
    expect(container.querySelector(`[data-boot-skin="${os}"]`)).not.toBeNull()
  })
})
