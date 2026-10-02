import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent, within } from '@testing-library/react'
import GuideContent from '../../components/guide/GuideContent'
import SplashGuide from '../../components/guide/SplashGuide'
import { MODELS } from '../../data/guideData'

beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn()
})

describe('GuideContent', () => {
  it('covers the required topics', () => {
    render(<GuideContent />)
    for (const heading of [
      /What is a coding assistant/, /The field/, /Why Claude Code/, /Claude models, old and new/,
      /Using AI responsibly/, /permission modes/, /The \.md files/, /Skills, plugins and MCP/,
      /Spend less/, /Make a plan first/,
    ]) {
      expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument()
    }
  })

  it('names the competitors and the permission modes', () => {
    render(<GuideContent />)
    expect(screen.getByText('GitHub Copilot')).toBeInTheDocument()
    expect(screen.getByText('Cursor')).toBeInTheDocument()
    for (const mode of ['Manual', 'Plan', 'Accept edits', 'Auto', 'Bypass']) {
      expect(screen.getAllByText(mode).length).toBeGreaterThan(0)
    }
  })

  it('explains the markdown file differences, including intent.md', () => {
    render(<GuideContent />)
    for (const f of ['CLAUDE.md', 'AGENTS.md', 'SKILL.md', 'README.md']) {
      expect(screen.getAllByText(f).length).toBeGreaterThan(0)
    }
    expect(screen.getAllByText(/intent\.md/).length).toBeGreaterThan(0)
  })

  it('shows current models first, then older ones through the filters', () => {
    render(<GuideContent />)
    const current = MODELS.filter((m) => m.status === 'current')
    for (const m of current) expect(screen.getByText(m.name)).toBeInTheDocument()
    expect(screen.queryByText('Claude Opus 4.1')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Retired \(/ }))
    expect(screen.getByText('Claude Opus 4.1')).toBeInTheDocument()
    expect(screen.getByText('Claude 1 and Instant')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /Still available/ }))
    expect(screen.getByText('Claude Opus 4.6')).toBeInTheDocument()
  })
})

describe('SplashGuide', () => {
  it('is a modal dialog and closes from the CTA, Skip, and Escape', () => {
    const onClose = vi.fn()
    render(<SplashGuide onClose={onClose} />)
    const dialog = screen.getByRole('dialog', { name: /coding assistants/i })
    expect(dialog).toHaveAttribute('aria-modal', 'true')

    fireEvent.click(within(dialog).getByRole('button', { name: /Enter JaredOS/ }))
    fireEvent.click(within(dialog).getByRole('button', { name: 'Skip' }))
    fireEvent.keyDown(window, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(3)
  })
})
