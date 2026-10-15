import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ResumeApp from '../../components/apps/ResumeApp'

describe('ResumeApp — heading', () => {
  it('renders the Resume heading', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Resume')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Experience, education & skills')).toBeInTheDocument()
  })

  it('renders the View Full Resume link', () => {
    render(<ResumeApp />)
    const link = screen.getByText('View Full Resume').closest('a')
    expect(link).toHaveAttribute('href', '/jared_chapman_resume.html')
    expect(link).toHaveAttribute('target', '_blank')
  })
})

describe('ResumeApp — section labels', () => {
  it('renders the Experience section label', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Experience')).toBeInTheDocument()
  })

  it('renders the Portfolio section label', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Portfolio: guides, tools and writing')).toBeInTheDocument()
  })

  it('renders the Education section label', () => {
    render(<ResumeApp />)
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument()
  })

  it('renders the Anthropic Academy section label', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Anthropic Academy')).toBeInTheDocument()
  })

  it('renders the Speaking and Performance section label', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Speaking and Performance')).toBeInTheDocument()
  })

  it('renders the Skills section label', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })
})

describe('ResumeApp — portfolio', () => {
  const portfolio = [
    { title: 'AI Ready Reps', url: 'https://aireadyreps.com/' },
    { title: 'The Nonprofit AI Almanac', url: 'https://nonprofit-ai-almanac.vercel.app/' },
    { title: 'EvalForge Lite', url: 'https://github.com/thejaredchapman/evalforge-lite' },
    { title: 'AI-Explorer: a field guide to AI', url: 'https://ai-explorer-theta.vercel.app' },
    { title: 'Stay the Engineer: Using AI to Get Better, Not Get Replaced', url: 'https://medium.com/@thejaredchapman/stay-the-engineer-using-ai-to-get-better-not-get-replaced-f19d3799f19d' },
    { title: 'Meet Users Where They Are', url: 'https://medium.com/@thejaredchapman/meet-users-where-they-are-93441513ae60' },
  ]

  for (const { title, url } of portfolio) {
    it(`renders "${title}" linking to ${url}`, () => {
      render(<ResumeApp />)
      const link = screen.getByText(title).closest('a')
      expect(link).toHaveAttribute('href', url)
      expect(link).toHaveAttribute('target', '_blank')
    })
  }
})

describe('ResumeApp — Developer Improvements section', () => {
  it('renders the "Developer Improvements" sub-label', () => {
    render(<ResumeApp />)
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
      render(<ResumeApp />)
      expect(screen.getByText(title)).toBeInTheDocument()
    })

    it(`"${title}" links to the correct GitHub URL`, () => {
      render(<ResumeApp />)
      const link = screen.getByText(title).closest('a')
      expect(link).toHaveAttribute('href', url)
    })

    it(`"${title}" opens in a new tab with noopener noreferrer`, () => {
      render(<ResumeApp />)
      const link = screen.getByText(title).closest('a')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  }

  it('renders 6 GitHub links (5 dev improvements + EvalForge Lite)', () => {
    render(<ResumeApp />)
    const allLinks = screen.getAllByRole('link')
    const githubLinks = allLinks.filter((a) => a.href.includes('github.com/thejaredchapman'))
    expect(githubLinks.length).toBe(6) // 5 dev improvements + EvalForge Lite
  })

  it('renders Open Source badge for all dev improvement projects', () => {
    render(<ResumeApp />)
    const badges = screen.getAllByText('Open Source')
    expect(badges.length).toBe(7) // EvalForge Lite + 6 dev improvements
  })

  it('renders the Cost Tracking tag', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Cost Tracking')).toBeInTheDocument()
  })

  it('renders the Orchestration tag', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Orchestration')).toBeInTheDocument()
  })

  it('renders the RAG tag', () => {
    render(<ResumeApp />)
    expect(screen.getAllByText('RAG').length).toBeGreaterThanOrEqual(1)
  })

  it('renders the Developer Tools tag', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Developer Tools')).toBeInTheDocument()
  })
})

describe('ResumeApp — summary', () => {
  it('renders the resume tagline', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Developer educator and engineer for Claude and LLM platforms')).toBeInTheDocument()
  })
})

describe('ResumeApp — experience', () => {
  it('renders AbbVie role', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Developer Support Engineer, Generative AI Applications')).toBeInTheDocument()
  })

  it('renders the Google apprentice role', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Software Engineer Apprentice (Multiverse)')).toBeInTheDocument()
    expect(screen.getByText('Google — Chicago, IL')).toBeInTheDocument()
    expect(screen.getByText('Sep 2022 — May 2024')).toBeInTheDocument()
  })

  it('renders the Guaranteed Rate role', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Appraisal Desk Team Lead (previously Appraisal Desk Escalations Coordinator)')).toBeInTheDocument()
  })
})

describe('ResumeApp — education and Anthropic Academy', () => {
  it('renders B.S., Film & Video', () => {
    render(<ResumeApp />)
    expect(screen.getByText('B.S., Film & Video')).toBeInTheDocument()
  })

  it('renders the Multiverse apprenticeship', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Software Engineering Apprenticeship')).toBeInTheDocument()
  })

  it('renders the course certificate count and highlights', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Course certificates (8)')).toBeInTheDocument()
    expect(screen.getByText(/Building with the Claude API, Claude with Amazon Bedrock, Claude Code in Action/)).toBeInTheDocument()
  })
})
