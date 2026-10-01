import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import BootSequence from '../../components/BootSequence'

describe('BootSequence — splash screen', () => {
  beforeEach(() => {
    sessionStorage.clear()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('announces the newest article', () => {
    render(<BootSequence onComplete={() => {}} />)
    act(() => vi.advanceTimersByTime(6000))
    expect(screen.getByText(/NEW.*"Stay the Engineer" published/)).toBeInTheDocument()
    expect(screen.getByText(/NEW.*EvalForge Lite/)).toBeInTheDocument()
    expect(screen.getByText(/NEW.*12 total/)).toBeInTheDocument()
  })

  it('shows the current last-updated date', () => {
    render(<BootSequence onComplete={() => {}} />)
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByText('Last updated: October 1, 2026')).toBeInTheDocument()
  })
})
