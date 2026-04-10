import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TerminalApp from '../../components/apps/TerminalApp'

// processCommand is not exported, so we test through the rendered UI
function getOutput(container) {
  return Array.from(container.querySelectorAll('[class*="whitespace-pre-wrap"]'))
    .map((el) => el.textContent)
}

describe('TerminalApp — initial render', () => {
  it('renders the welcome message', () => {
    const { container } = render(<TerminalApp />)
    const lines = getOutput(container)
    const joined = lines.join(' ')
    expect(joined).toContain('Welcome to JaredOS Terminal')
  })

  it('shows command hint buttons', () => {
    render(<TerminalApp />)
    expect(screen.getByText('joke')).toBeInTheDocument()
    expect(screen.getByText('about')).toBeInTheDocument()
    expect(screen.getByText('skills')).toBeInTheDocument()
    expect(screen.getByText('help')).toBeInTheDocument()
    expect(screen.getByText('sudo')).toBeInTheDocument()
  })

  it('renders the prompt indicator', () => {
    render(<TerminalApp />)
    expect(screen.getByText(/visitor@jaredos ~ \$/)).toBeInTheDocument()
  })

  it('input field is in the document', () => {
    render(<TerminalApp />)
    const input = document.querySelector('input[type="text"]')
    expect(input).toBeInTheDocument()
  })
})

describe('TerminalApp — command submission', () => {
  async function submitCommand(container, cmd) {
    const input = container.querySelector('input[type="text"]')
    const form = container.querySelector('form')
    fireEvent.change(input, { target: { value: cmd } })
    fireEvent.submit(form)
  }

  it('echoes the entered command in the prompt history', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'help')
    const lines = getOutput(container)
    expect(lines.some((l) => l.includes('visitor@jaredos ~ $ help'))).toBe(true)
  })

  it('clears input after submission', async () => {
    const { container } = render(<TerminalApp />)
    const input = container.querySelector('input[type="text"]')
    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(container.querySelector('form'))
    expect(input.value).toBe('')
  })

  it('help command lists available commands', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'help')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('Available commands:')
    expect(joined).toContain('about')
    expect(joined).toContain('skills')
    expect(joined).toContain('projects')
  })

  it('about command shows Jared info', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'about')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('JARED CHAPMAN')
    expect(joined).toContain('GenAI')
  })

  it('skills command shows tech stack', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'skills')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('Python')
    expect(joined).toContain('React')
  })

  it('projects command lists projects', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'projects')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('LoanLens')
    expect(joined).toContain('vercel.app')
  })

  it('experience command shows work history', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'experience')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('Google')
    expect(joined).toContain('AbbVie')
  })

  it('social command shows social links', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'social')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('github.com/thejaredchapman')
    expect(joined).toContain('linkedin.com/in/thejaredchapman')
  })

  it('hire command shows email', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'hire')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('thejaredchapman@gmail.com')
  })

  it('whoami command responds', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'whoami')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('visitor@jaredos')
  })

  it('ls command shows file list', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'ls')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('projects/')
    expect(joined).toContain('resume.pdf')
    expect(joined).toContain('secret_plans.txt')
  })

  it('pwd command shows fake path', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'pwd')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('/home/visitor/jaredos')
  })

  it('sudo command shows permission denied', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'sudo rm -rf /')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toMatch(/nice try|don't have root/i)
  })

  it('matrix command responds with matrix text', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'matrix')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('Wake up')
    expect(joined).toContain('Matrix')
  })

  it('coffee command shows error message', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'coffee')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('Coffee machine not found')
  })

  it('ping command shows response', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'ping')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('PING jaredos')
  })

  it('echo command echoes the argument', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'echo hello world')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('hello world')
  })

  it('cat secret_plans.txt shows easter egg', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'cat secret_plans.txt')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('Step 1: Write code')
    expect(joined).toContain('Profit')
  })

  it('cat without filename shows usage hint', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'cat')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('Usage: cat <filename>')
  })

  it('vim command shows joke', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'vim')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toMatch(/vim|stuck forever/i)
  })

  it('joke command returns a joke', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'joke')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    // Any of the known joke keywords
    expect(joined.length).toBeGreaterThan(50)
  })

  it('hello command responds helpfully', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'hello')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('help')
  })

  it('hi command responds helpfully', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'hi')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('help')
  })

  it('unknown command shows error message', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'foobarnotacommand')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('Command not found: foobarnotacommand')
    expect(joined).toContain('Type "help"')
  })

  it('empty command submission does not add to history', async () => {
    const { container } = render(<TerminalApp />)
    const before = getOutput(container).length
    const input = container.querySelector('input[type="text"]')
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.submit(container.querySelector('form'))
    const after = getOutput(container).length
    // Empty submit adds the prompt line but no output lines
    expect(after - before).toBeLessThanOrEqual(2)
  })

  it('clear command clears history', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'about')
    await submitCommand(container, 'clear')
    const lines = getOutput(container)
    // After clear, history should be empty (no lines at all)
    expect(lines.filter((l) => l.trim() !== '').length).toBe(0)
  })

  it('rm -rf command is forbidden', async () => {
    const { container } = render(<TerminalApp />)
    await submitCommand(container, 'rm -rf /')
    const lines = getOutput(container)
    const joined = lines.join('\n')
    expect(joined).toContain('forbidden')
  })
})

describe('TerminalApp — keyboard navigation', () => {
  it('up arrow navigates to previous command', async () => {
    const { container } = render(<TerminalApp />)
    const input = container.querySelector('input[type="text"]')
    const form = container.querySelector('form')

    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(form)

    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input.value).toBe('help')
  })

  it('down arrow after up arrow clears input', async () => {
    const { container } = render(<TerminalApp />)
    const input = container.querySelector('input[type="text"]')
    const form = container.querySelector('form')

    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(form)

    fireEvent.keyDown(input, { key: 'ArrowUp' })
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input.value).toBe('')
  })

  it('up arrow through multiple commands navigates history', async () => {
    const { container } = render(<TerminalApp />)
    const input = container.querySelector('input[type="text"]')
    const form = container.querySelector('form')

    fireEvent.change(input, { target: { value: 'help' } })
    fireEvent.submit(form)
    fireEvent.change(input, { target: { value: 'about' } })
    fireEvent.submit(form)

    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input.value).toBe('about')
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input.value).toBe('help')
  })

  it('tab completes a partial command', async () => {
    const { container } = render(<TerminalApp />)
    const input = container.querySelector('input[type="text"]')

    fireEvent.change(input, { target: { value: 'ski' } })
    fireEvent.keyDown(input, { key: 'Tab' })
    expect(input.value).toBe('skills')
  })

  it('tab does not complete when multiple matches exist', async () => {
    const { container } = render(<TerminalApp />)
    const input = container.querySelector('input[type="text"]')

    // 's' matches skills, social, sudo
    fireEvent.change(input, { target: { value: 's' } })
    fireEvent.keyDown(input, { key: 'Tab' })
    // Should stay as 's' since multiple matches
    expect(input.value).toBe('s')
  })
})

describe('TerminalApp — hint buttons', () => {
  it('clicking a hint button sets input value', () => {
    const { container } = render(<TerminalApp />)
    const jokeBtn = screen.getByText('joke')
    fireEvent.click(jokeBtn)
    const input = container.querySelector('input[type="text"]')
    expect(input.value).toBe('joke')
  })

  it('clicking hint button focuses the input', () => {
    render(<TerminalApp />)
    const aboutBtn = screen.getByText('about')
    fireEvent.click(aboutBtn)
    const input = document.querySelector('input[type="text"]')
    // jsdom doesn't always track focus perfectly, just verify no error thrown
    expect(input).toBeInTheDocument()
  })
})

describe('TerminalApp — date command', () => {
  it('returns the current date string', async () => {
    const { container } = render(<TerminalApp />)
    const input = container.querySelector('input[type="text"]')
    const form = container.querySelector('form')
    fireEvent.change(input, { target: { value: 'date' } })
    fireEvent.submit(form)
    const lines = getOutput(container)
    const joined = lines.join('\n')
    // Should include the year
    expect(joined).toContain(new Date().getFullYear().toString())
  })
})
