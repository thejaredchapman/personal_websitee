import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import WritingApp from '../../components/apps/WritingApp'

const STAY_TITLE = 'Stay the Engineer: Using AI to Get Better, Not Get Replaced'

describe('WritingApp — Stay the Engineer', () => {
  it('lists the article under Publications', () => {
    render(<WritingApp />)
    expect(screen.getByText(STAY_TITLE)).toBeInTheDocument()
  })

  it('renders inline video players for its YouTube links', async () => {
    render(<WritingApp />)
    await userEvent.click(screen.getByText(STAY_TITLE))
    expect(screen.getByRole('button', { name: 'Play video: Hooks in Claude Code' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: /^Play video:/ }).length).toBe(25)
  })

  it('keeps each video link as a readable text link too', async () => {
    render(<WritingApp />)
    await userEvent.click(screen.getByText(STAY_TITLE))
    expect(screen.getByRole('link', { name: 'Hooks in Claude Code' })).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=IkaPHiMDazM',
    )
  })
})

describe('WritingApp — other articles', () => {
  it('does not embed videos in articles that have not opted in', async () => {
    render(<WritingApp />)
    await userEvent.click(screen.getByText('From Vibe Coding to Agentic Engineering'))
    expect(screen.queryByRole('button', { name: /^Play video:/ })).toBeNull()
  })
})
