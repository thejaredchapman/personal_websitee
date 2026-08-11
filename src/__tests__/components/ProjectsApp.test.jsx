import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsApp from '../../components/apps/ProjectsApp'

describe('ProjectsApp — heading', () => {
  it('renders the Projects heading', () => {
    render(<ProjectsApp />)
    expect(screen.getByText('Projects')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    render(<ProjectsApp />)
    expect(screen.getByText("Things I've built and shipped")).toBeInTheDocument()
  })
})

describe('ProjectsApp — main projects', () => {
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
      render(<ProjectsApp />)
      expect(screen.getByText(title)).toBeInTheDocument()
    })
  }

  it('renders 11 main project links', () => {
    render(<ProjectsApp />)
    const allLinks = screen.getAllByRole('link')
    const vercelLinks = allLinks.filter((a) => a.href.includes('vercel.app'))
    expect(vercelLinks.length).toBe(11)
  })

  it('main project links open in a new tab', () => {
    render(<ProjectsApp />)
    const allLinks = screen.getAllByRole('link')
    const vercelLinks = allLinks.filter((a) => a.href.includes('vercel.app'))
    for (const link of vercelLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })
})

describe('ProjectsApp — Developer Improvements section', () => {
  it('renders the "Developer Improvements" heading', () => {
    render(<ProjectsApp />)
    expect(screen.getByText('Developer Improvements')).toBeInTheDocument()
  })

  it('renders the Developer Improvements subtitle', () => {
    render(<ProjectsApp />)
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
      render(<ProjectsApp />)
      expect(screen.getByText(title)).toBeInTheDocument()
    })

    it(`"${title}" links to the correct GitHub URL`, () => {
      render(<ProjectsApp />)
      const link = screen.getByText(title).closest('a')
      expect(link).toHaveAttribute('href', url)
    })
  }

  it('all dev project links open in a new tab with noopener noreferrer', () => {
    render(<ProjectsApp />)
    const allLinks = screen.getAllByRole('link')
    const githubLinks = allLinks.filter((a) => a.href.includes('github.com/thejaredchapman'))
    expect(githubLinks.length).toBe(6)
    for (const link of githubLinks) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('renders tags for Claude Code Updates', () => {
    render(<ProjectsApp />)
    const tags = screen.getAllByText('Changelog')
    expect(tags.length).toBeGreaterThanOrEqual(1)
  })

  it('renders tags for 4D Orchestrator MCP', () => {
    render(<ProjectsApp />)
    expect(screen.getByText('Orchestration')).toBeInTheDocument()
  })

  it('renders tags for Ask the Docs', () => {
    render(<ProjectsApp />)
    expect(screen.getByText('RAG')).toBeInTheDocument()
    expect(screen.getByText('Developer Tools')).toBeInTheDocument()
  })
})
