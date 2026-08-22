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

  it('renders the Projects section label', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders the Education section label', () => {
    render(<ResumeApp />)
    expect(screen.getByRole('heading', { name: 'Education' })).toBeInTheDocument()
  })

  it('renders the Certifications section label', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Certifications')).toBeInTheDocument()
  })

  it('renders the Skills section label', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })
})

describe('ResumeApp — main projects', () => {
  it('renders ILIAD LiteLLM Model Explorer', () => {
    render(<ResumeApp />)
    expect(screen.getByText('ILIAD LiteLLM Model Explorer')).toBeInTheDocument()
  })

  it('renders Enterprise RAG Pipeline', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Enterprise RAG Pipeline')).toBeInTheDocument()
  })

  it('renders BigQuery DataFrames Python API (Google)', () => {
    render(<ResumeApp />)
    expect(screen.getByText('BigQuery DataFrames Python API (Google)')).toBeInTheDocument()
  })

  it('renders Production status badge for ILIAD', () => {
    render(<ResumeApp />)
    const badges = screen.getAllByText('Production')
    expect(badges.length).toBeGreaterThanOrEqual(2)
  })

  it('renders Open Source status badge for BigQuery project', () => {
    render(<ResumeApp />)
    const badges = screen.getAllByText('Open Source')
    expect(badges.length).toBeGreaterThanOrEqual(1)
  })
})

describe('ResumeApp — Developer Improvements section', () => {
  it('renders the "Developer Improvements" sub-label', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Developer Improvements')).toBeInTheDocument()
  })

  const devProjects = [
    { title: 'Claude Code Updates', url: 'https://github.com/thejaredchapman/claude-code-updates' },
    { title: '4D Orchestrator MCP', url: 'https://github.com/thejaredchapman/4d-orchestrator-mcp' },
    { title: 'Claude Code Deep Dive', url: 'https://github.com/thejaredchapman/claude-code-deep-dive-deck' },
    { title: 'Claude Code Guide', url: 'https://github.com/thejaredchapman/claude-code-guide' },
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

  it('renders 6 dev improvement project links to GitHub', () => {
    render(<ResumeApp />)
    const allLinks = screen.getAllByRole('link')
    const githubLinks = allLinks.filter((a) => a.href.includes('github.com/thejaredchapman'))
    expect(githubLinks.length).toBe(6)
  })

  it('renders Open Source badge for all dev improvement projects', () => {
    render(<ResumeApp />)
    const badges = screen.getAllByText('Open Source')
    expect(badges.length).toBe(7) // 1 BigQuery + 6 dev improvements
  })

  it('renders the Changelog tag', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Changelog')).toBeInTheDocument()
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

describe('ResumeApp — experience', () => {
  it('renders AbbVie role', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Developer Support, Generative AI Applications')).toBeInTheDocument()
  })

  it('renders Google roles', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Software Engineer — Searchmark')).toBeInTheDocument()
    expect(screen.getByText('Software Engineer — BigQuery DataFrames')).toBeInTheDocument()
  })
})

describe('ResumeApp — certifications', () => {
  it('renders Claude Code in Action certification', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Claude Code in Action')).toBeInTheDocument()
  })

  it('renders Model Context Protocol: Advanced Topics certification', () => {
    render(<ResumeApp />)
    expect(screen.getByText('Model Context Protocol: Advanced Topics')).toBeInTheDocument()
  })

  it('renders 9 certifications total', () => {
    render(<ResumeApp />)
    const anthropicLabels = screen.getAllByText('Anthropic')
    expect(anthropicLabels.length).toBe(9)
  })
})
