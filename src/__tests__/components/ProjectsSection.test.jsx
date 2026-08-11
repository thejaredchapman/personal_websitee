import { describe, it, expect, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsSection from '../../components/ProjectsSection'

beforeAll(() => {
  global.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

describe('ProjectsSection — heading', () => {
  it('renders the Projects heading', () => {
    render(<ProjectsSection />)
    expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<ProjectsSection />)
    expect(screen.getByText("Things I've built and shipped")).toBeInTheDocument()
  })
})

describe('ProjectsSection — main projects', () => {
  const titles = [
    'AI Explorer',
    'LLM Frameworks',
    'DJ Master Academy',
    'LoanLens',
    'Art Portfolio',
    'Citizenship Pathways',
    'Chess Learning App',
    'The Daily Impact',
    'Break Into Tech',
    'Camp Javery Wedding',
    'PyTorch Interactive Guide',
  ]

  for (const title of titles) {
    it(`renders "${title}"`, () => {
      render(<ProjectsSection />)
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    })
  }

  it('renders 11 "Visit Project" CTAs', () => {
    render(<ProjectsSection />)
    const ctaLinks = screen.getAllByText('Visit Project')
    expect(ctaLinks.length).toBe(11)
  })

  it('main project links open in a new tab', () => {
    render(<ProjectsSection />)
    const allLinks = screen.getAllByRole('link')
    const vercelLinks = allLinks.filter((a) => a.href.includes('vercel.app'))
    for (const link of vercelLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})

describe('ProjectsSection — Developer Improvements section', () => {
  it('renders the "Developer Improvements" heading', () => {
    render(<ProjectsSection />)
    expect(screen.getByRole('heading', { name: 'Developer Improvements' })).toBeInTheDocument()
  })

  it('renders the Developer Improvements subtitle', () => {
    render(<ProjectsSection />)
    expect(screen.getByText('Tools, guides, and resources for developer workflows')).toBeInTheDocument()
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
    it(`renders "${title}" card`, () => {
      render(<ProjectsSection />)
      expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
    })

    it(`"${title}" links to the correct GitHub URL`, () => {
      render(<ProjectsSection />)
      const heading = screen.getByRole('heading', { name: title })
      const link = heading.closest('a')
      expect(link).toHaveAttribute('href', url)
    })
  }

  it('renders 6 "View on GitHub" CTAs', () => {
    render(<ProjectsSection />)
    const ctaLinks = screen.getAllByText('View on GitHub')
    expect(ctaLinks.length).toBe(6)
  })

  it('all dev project links open in a new tab with noopener noreferrer', () => {
    render(<ProjectsSection />)
    const allLinks = screen.getAllByRole('link')
    const githubLinks = allLinks.filter((a) => a.href.includes('github.com/thejaredchapman'))
    expect(githubLinks.length).toBe(6)
    for (const link of githubLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('renders the Orchestration tag for 4D Orchestrator MCP', () => {
    render(<ProjectsSection />)
    expect(screen.getByText('Orchestration')).toBeInTheDocument()
  })

  it('renders the RAG tag for Ask the Docs', () => {
    render(<ProjectsSection />)
    expect(screen.getByText('RAG')).toBeInTheDocument()
  })

  it('renders the Developer Tools tag for Ask the Docs', () => {
    render(<ProjectsSection />)
    expect(screen.getByText('Developer Tools')).toBeInTheDocument()
  })

  it('renders the Deep Learning tag for AI Explained', () => {
    render(<ProjectsSection />)
    expect(screen.getByText('Deep Learning')).toBeInTheDocument()
  })
})
