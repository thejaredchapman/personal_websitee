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

  it('renders the Certifications heading', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Certifications')).toBeInTheDocument()
  })

  it('renders the Projects heading', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders the Skills heading', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })
})

describe('ResumeSection — main projects', () => {
  it('renders ILIAD LiteLLM Model Explorer', () => {
    render(<ResumeSection />)
    expect(screen.getByText('ILIAD LiteLLM Model Explorer')).toBeInTheDocument()
  })

  it('renders Enterprise RAG Pipeline', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Enterprise RAG Pipeline')).toBeInTheDocument()
  })

  it('renders BigQuery DataFrames Python API (Google)', () => {
    render(<ResumeSection />)
    expect(screen.getByText('BigQuery DataFrames Python API (Google)')).toBeInTheDocument()
  })
})

describe('ResumeSection — Developer Improvements section', () => {
  it('renders the "Developer Improvements" sub-label', () => {
    render(<ResumeSection />)
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

  it('renders 6 dev improvement links to GitHub', () => {
    render(<ResumeSection />)
    const allLinks = screen.getAllByRole('link')
    const githubLinks = allLinks.filter((a) => a.href.includes('github.com/thejaredchapman'))
    expect(githubLinks.length).toBe(6)
  })

  it('renders Open Source badges for dev improvement projects', () => {
    render(<ResumeSection />)
    const badges = screen.getAllByText('Open Source')
    expect(badges.length).toBeGreaterThanOrEqual(6)
  })

  it('renders the Changelog tag', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Changelog')).toBeInTheDocument()
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
    expect(screen.getByText('Developer Support, Generative AI Applications')).toBeInTheDocument()
  })

  it('renders Google Searchmark role', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Software Engineer — Searchmark')).toBeInTheDocument()
  })

  it('renders Google BigQuery role', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Software Engineer — BigQuery DataFrames')).toBeInTheDocument()
  })

  it('renders Guaranteed Rate role', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Team Lead, Appraisal Operations')).toBeInTheDocument()
  })
})

describe('ResumeSection — certifications', () => {
  it('renders Claude Code in Action', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Claude Code in Action')).toBeInTheDocument()
  })

  it('renders Model Context Protocol: Advanced Topics', () => {
    render(<ResumeSection />)
    expect(screen.getByText('Model Context Protocol: Advanced Topics')).toBeInTheDocument()
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
