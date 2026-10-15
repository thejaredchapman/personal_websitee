import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import ResumeSection from '../../components/ResumeSection'

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('ResumeSection — heading', () => {
  it('renders the Resume heading', () => {
    render(<ResumeSection />)
    expect(screen.getByRole('heading', { name: 'Resume' })).toBeInTheDocument()
  })
})

describe('ResumeSection — section headings', () => {
  it('renders the Professional Experience heading', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Professional Experience')).toBeInTheDocument()
  })

  it('renders the Education heading', () => {
    render(<ResumeSection />)
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument()
  })

  it('renders the Anthropic Academy heading', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Anthropic Academy')).toBeInTheDocument()
  })

  it('renders the Portfolio heading', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Portfolio: guides, tools and writing')).toBeInTheDocument()
  })

  it('renders the Speaking and Performance heading', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Speaking and Performance')).toBeInTheDocument()
  })

  it('renders the Skills heading', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })
})

describe('ResumeSection — portfolio', () => {
  const portfolio = [
    { title: 'AI Ready Reps', url: 'https://aireadyreps.com/' },
    { title: 'The Nonprofit AI Almanac', url: 'https://nonprofit-ai-almanac.vercel.app/' },
    { title: 'EvalForge Lite', url: 'https://github.com/thejaredchapman/evalforge-lite' },
    { title: 'AI-Explorer: a field guide to AI', url: 'https://ai-explorer-theta.vercel.app' },
    { title: 'Meet Users Where They Are', url: 'https://medium.com/@thejaredchapman/meet-users-where-they-are-93441513ae60' },
  ]

  for (const { title, url } of portfolio) {
    it(`renders "${title}" linking to ${url}`, () => {
      render(<ResumeSection />)
      expect(screen.getByText(title).closest('a')).toHaveAttribute('href', url)
    })
  }
})

describe('ResumeSection — Developer Improvements section', () => {
  it('renders the "Developer Improvements" sub-label', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Developer Improvements')).toBeInTheDocument()
  })

  const devProjects = [
    { title: 'Claude Code Usage Guard', url: 'https://github.com/thejaredchapman/claude-code-usage-guard' },
    { title: '4D Orchestrator MCP', url: 'https://github.com/thejaredchapman/4d-orchestrator-mcp' },
    { title: 'Claude Code Deep Dive', url: 'https://github.com/thejaredchapman/claude-code-deep-dive-deck' },
    { title: 'AI Coding Assistant Guide', url: 'https://ai-coding-assistants-guide.vercel.app/' },
    { title: 'AI Explained: Deep Learn', url: 'https://github.com/thejaredchapman/ai_explained_deep_learn' },
    { title: 'Ask the Docs', url: 'https://github.com/thejaredchapman/ask-the-docs' },
  ]

  for (const { title, url } of devProjects) {
    it(`renders "${title}"`, () => {
      render(<ResumeSection />)
      expect(screen.getByText(title)).toBeInTheDocument()
    })

    it(`"${title}" is a link to the correct GitHub URL`, () => {
      render(<ResumeSection />)
      const link = screen.getByText(title).closest('a')
      expect(link).toHaveAttribute('href', url)
    })

    it(`"${title}" opens in a new tab with noopener noreferrer`, () => {
      render(<ResumeSection />)
      const link = screen.getByText(title).closest('a')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  }

  it('renders 6 GitHub links (5 dev improvements + EvalForge Lite)', () => {
    render(<ResumeSection />)
    const allLinks = screen.getAllByRole('link')
    const githubLinks = allLinks.filter((a) => a.href.includes('github.com/thejaredchapman'))
    expect(githubLinks.length).toBe(6) // 5 dev improvements + EvalForge Lite
  })

  it('renders Open Source badges for dev improvement projects', () => {
    render(<ResumeSection />)
    const badges = screen.getAllByText('Open Source')
    expect(badges.length).toBeGreaterThanOrEqual(6)
  })

  it('renders the Cost Tracking tag', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Cost Tracking')).toBeInTheDocument()
  })

  it('renders the Orchestration tag', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Orchestration')).toBeInTheDocument()
  })

  it('renders the RAG tag', () => {
    render(<ResumeSection />)
    expect(screen.getAllByText('RAG').length).toBeGreaterThanOrEqual(1)
  })

  it('renders the Developer Tools tag', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Developer Tools')).toBeInTheDocument()
  })
})

describe('ResumeSection — experience', () => {
  it('renders AbbVie role title', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Developer Support Engineer, Generative AI Applications')).toBeInTheDocument()
  })

  it('renders the Google apprentice role', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Software Engineer Apprentice (Multiverse)')).toBeInTheDocument()
    expect(screen.getByText('Sep 2022 — May 2024')).toBeInTheDocument()
  })

  it('renders Guaranteed Rate role', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Appraisal Desk Team Lead (previously Appraisal Desk Escalations Coordinator)')).toBeInTheDocument()
  })
})

describe('ResumeSection — education and Anthropic Academy', () => {
  it('renders B.S., Film & Video', () => {
    render(<ResumeSection />)
    expect(screen.getByText('B.S., Film & Video')).toBeInTheDocument()
  })

  it('renders the course certificate count', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Course certificates (8)')).toBeInTheDocument()
  })
})

describe('ResumeSection — download link', () => {
  it('renders View Resume link pointing to the HTML resume', () => {
    render(<ResumeSection />)
    const link = screen.getByText('View Resume').closest('a')
    expect(link).toHaveAttribute('href', '/jared_chapman_resume.html')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
