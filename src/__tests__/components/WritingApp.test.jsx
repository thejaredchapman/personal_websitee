import { describe, it, expect, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WritingApp from '../../components/apps/WritingApp'
import { ThemeProvider } from '../../context/ThemeContext'

const STAY_TITLE = 'Stay the Engineer: Using AI to Get Better, Not Get Replaced'

describe('WritingApp — Stay the Engineer', () => {
  it('lists the article under Publications', () => {
    render(<ThemeProvider><WritingApp /></ThemeProvider>)
    expect(screen.getByText(STAY_TITLE)).toBeInTheDocument()
  })

  it('renders inline video players for its YouTube links', async () => {
    render(<ThemeProvider><WritingApp /></ThemeProvider>)
    await userEvent.click(screen.getByText(STAY_TITLE))
    expect(screen.getByRole('button', { name: 'Play video: Hooks in Claude Code' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^Play video:/ }).length).toBe(25)
  })

  it('keeps each video link as a readable text link too', async () => {
    render(<ThemeProvider><WritingApp /></ThemeProvider>)
    await userEvent.click(screen.getByText(STAY_TITLE))
    expect(screen.getByRole('link', { name: 'Hooks in Claude Code' })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=IkaPHiMDazM',
    )
  })
})

describe('WritingApp — other articles', () => {
  it('does not embed videos in articles that have not opted in', async () => {
    render(<ThemeProvider><WritingApp /></ThemeProvider>)
    await userEvent.click(screen.getByText('From Vibe Coding to Agentic Engineering'))
    expect(screen.queryByRole('button', { name: /^Play video:/ })).toBeNull()
  })
})

describe('WritingApp — direct links', () => {
  afterEach(() => {
    window.history.replaceState(null, '', '/')
  })

  it('opens straight to the linked article', () => {
    window.history.replaceState(null, '', '/?read=stay-the-engineer')
    render(<ThemeProvider><WritingApp /></ThemeProvider>)
    expect(screen.getByText('Back to Writing')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: STAY_TITLE })).toBeInTheDocument()
  })

  it('shows the list for an unknown article id', () => {
    window.history.replaceState(null, '', '/?read=nope')
    render(<ThemeProvider><WritingApp /></ThemeProvider>)
    expect(screen.getByText('Articles and developer guides')).toBeInTheDocument()
  })

  it('puts the article link in the address bar when opened, and clears it on back', async () => {
    window.history.replaceState(null, '', '/')
    render(<ThemeProvider><WritingApp /></ThemeProvider>)
    await userEvent.click(screen.getByText(STAY_TITLE))
    expect(window.location.search).toBe('?read=stay-the-engineer')
    await userEvent.click(screen.getByText('Back to Writing'))
    expect(window.location.search).toBe('')
  })

  it('clears the link when the window closes', () => {
    window.history.replaceState(null, '', '/?read=stay-the-engineer')
    const { unmount } = render(<ThemeProvider><WritingApp /></ThemeProvider>)
    unmount()
    expect(window.location.search).toBe('')
  })
})

describe('WritingApp — full-fidelity HTML article', () => {
  const TITLE = "Does AI Know I'm Not White?"

  it('lists the article under Publications', () => {
    render(<ThemeProvider><WritingApp /></ThemeProvider>)
    expect(screen.getByText(TITLE)).toBeInTheDocument()
  })

  it('shows the original page in a frame with an open-full-page link', async () => {
    render(<ThemeProvider><WritingApp /></ThemeProvider>)
    await userEvent.click(screen.getByText(TITLE))
    expect(screen.getByTitle(TITLE)).toHaveAttribute('src', '/does-ai-know-im-not-white.html')
    expect(screen.getByRole('link', { name: 'Open full page' })).toHaveAttribute('href', '/does-ai-know-im-not-white.html')
  })
})
