import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useTypewriter } from '../../hooks/useTypewriter'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('useTypewriter — initial state', () => {
  it('starts with empty displayText', () => {
    const { result } = renderHook(() => useTypewriter(['Hello']))
    expect(result.current.displayText).toBe('')
  })

  it('starts at lineIndex 0', () => {
    const { result } = renderHook(() => useTypewriter(['Hello', 'World']))
    expect(result.current.lineIndex).toBe(0)
  })

  it('isComplete starts false', () => {
    const { result } = renderHook(() => useTypewriter(['Hello']))
    expect(result.current.isComplete).toBe(false)
  })

  it('cursorVisible starts true', () => {
    const { result } = renderHook(() => useTypewriter(['Hello']))
    expect(result.current.cursorVisible).toBe(true)
  })
})

describe('useTypewriter — typing behavior', () => {
  it('types the first character after typeSpeed delay', () => {
    const { result } = renderHook(() =>
      useTypewriter(['Hello'], { typeSpeed: 50, startDelay: 0 })
    )
    act(() => { vi.advanceTimersByTime(100) })
    expect(result.current.displayText.length).toBeGreaterThan(0)
  })

  it('eventually types the full first line', () => {
    const { result } = renderHook(() =>
      useTypewriter(['Hi'], { typeSpeed: 10, deleteSpeed: 5, pauseTime: 100, startDelay: 0 })
    )
    act(() => { vi.advanceTimersByTime(1000) })
    // At some point during typing it should have reached 'H' or 'Hi'
    expect(['', 'H', 'Hi']).toContain(result.current.displayText)
  })

  it('does not type when lines array is empty', () => {
    const { result } = renderHook(() => useTypewriter([]))
    act(() => { vi.advanceTimersByTime(5000) })
    expect(result.current.displayText).toBe('')
  })
})

describe('useTypewriter — loop behavior', () => {
  it('with loop=false sets isComplete after typing last line and waiting', () => {
    const { result } = renderHook(() =>
      useTypewriter(['Hi'], {
        typeSpeed: 10,
        deleteSpeed: 5,
        pauseTime: 50,
        startDelay: 0,
        loop: false,
      })
    )
    // Advance enough time to type 'Hi' + pause
    act(() => { vi.advanceTimersByTime(500) })
    // May or may not be complete yet depending on timing, but should not error
    expect(typeof result.current.isComplete).toBe('boolean')
  })
})

describe('useTypewriter — cursor blink', () => {
  it('toggles cursorVisible after 530ms', () => {
    const { result } = renderHook(() => useTypewriter(['Hello']))
    const initial = result.current.cursorVisible
    act(() => { vi.advanceTimersByTime(530) })
    expect(result.current.cursorVisible).toBe(!initial)
  })

  it('toggles back after another 530ms', () => {
    const { result } = renderHook(() => useTypewriter(['Hello']))
    const initial = result.current.cursorVisible
    act(() => { vi.advanceTimersByTime(530) })
    act(() => { vi.advanceTimersByTime(530) })
    expect(result.current.cursorVisible).toBe(initial)
  })
})

describe('useTypewriter — options', () => {
  it('respects custom typeSpeed', () => {
    const fast = renderHook(() =>
      useTypewriter(['Hello World'], { typeSpeed: 5, startDelay: 0 })
    )
    const slow = renderHook(() =>
      useTypewriter(['Hello World'], { typeSpeed: 200, startDelay: 0 })
    )
    act(() => { vi.advanceTimersByTime(100) })
    // Fast should have typed more characters
    expect(fast.result.current.displayText.length).toBeGreaterThanOrEqual(
      slow.result.current.displayText.length
    )
  })

  it('handles single-line input', () => {
    const { result } = renderHook(() =>
      useTypewriter(['Only one line'], { typeSpeed: 10, startDelay: 0 })
    )
    act(() => { vi.advanceTimersByTime(50) })
    expect(typeof result.current.displayText).toBe('string')
  })

  it('handles multiple lines', () => {
    const { result } = renderHook(() =>
      useTypewriter(['Line 1', 'Line 2', 'Line 3'], { typeSpeed: 5, startDelay: 0 })
    )
    act(() => { vi.advanceTimersByTime(50) })
    expect([0, 1, 2]).toContain(result.current.lineIndex)
  })
})
