import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import ContactApp from '../../components/apps/ContactApp'

describe('ContactApp — rendering', () => {
  it('renders the Contact heading', () => {
    render(<ContactApp />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders the "Get in touch" subheading', () => {
    render(<ContactApp />)
    expect(screen.getByText('Get in touch')).toBeInTheDocument()
  })

  it('renders name input', () => {
    render(<ContactApp />)
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
  })

  it('renders email input', () => {
    render(<ContactApp />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
  })

  it('renders subject input', () => {
    render(<ContactApp />)
    expect(screen.getByPlaceholderText('Subject')).toBeInTheDocument()
  })

  it('renders message textarea', () => {
    render(<ContactApp />)
    expect(screen.getByPlaceholderText('Message')).toBeInTheDocument()
  })

  it('renders Send Message button', () => {
    render(<ContactApp />)
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })

  it('renders Connect section', () => {
    render(<ContactApp />)
    expect(screen.getByText('Connect')).toBeInTheDocument()
  })

  it('renders all 5 social links', () => {
    render(<ContactApp />)
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('LinkedIn')).toBeInTheDocument()
    expect(screen.getByText('Instagram')).toBeInTheDocument()
    expect(screen.getByText('Spotify')).toBeInTheDocument()
    expect(screen.getByText('Linktree')).toBeInTheDocument()
  })

  it('renders Schedule a meeting link', () => {
    render(<ContactApp />)
    expect(screen.getByText('Schedule a meeting')).toBeInTheDocument()
  })
})

describe('ContactApp — form fields', () => {
  it('name field is required', () => {
    render(<ContactApp />)
    const name = screen.getByPlaceholderText('Name')
    expect(name).toBeRequired()
  })

  it('email field is required', () => {
    render(<ContactApp />)
    const email = screen.getByPlaceholderText('Email')
    expect(email).toBeRequired()
  })

  it('email field has type=email', () => {
    render(<ContactApp />)
    const email = screen.getByPlaceholderText('Email')
    expect(email).toHaveAttribute('type', 'email')
  })

  it('subject field is NOT required', () => {
    render(<ContactApp />)
    const subject = screen.getByPlaceholderText('Subject')
    expect(subject).not.toBeRequired()
  })

  it('message field is required', () => {
    render(<ContactApp />)
    const message = screen.getByPlaceholderText('Message')
    expect(message).toBeRequired()
  })

  it('message field is a textarea', () => {
    render(<ContactApp />)
    const message = screen.getByPlaceholderText('Message')
    expect(message.tagName.toLowerCase()).toBe('textarea')
  })

  it('accepts user input in name field', () => {
    render(<ContactApp />)
    const name = screen.getByPlaceholderText('Name')
    fireEvent.change(name, { target: { value: 'Alice' } })
    expect(name.value).toBe('Alice')
  })

  it('accepts user input in email field', () => {
    render(<ContactApp />)
    const email = screen.getByPlaceholderText('Email')
    fireEvent.change(email, { target: { value: 'alice@example.com' } })
    expect(email.value).toBe('alice@example.com')
  })

  it('accepts user input in message field', () => {
    render(<ContactApp />)
    const message = screen.getByPlaceholderText('Message')
    fireEvent.change(message, { target: { value: 'Hello Jared!' } })
    expect(message.value).toBe('Hello Jared!')
  })
})

describe('ContactApp — form submission', () => {
  let openSpy

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => {})
    vi.useFakeTimers()
  })

  afterEach(() => {
    openSpy.mockRestore()
    vi.useRealTimers()
  })

  function fillAndSubmit({ name = 'Alice', email = 'alice@test.com', subject = 'Hi', message = 'Hello' } = {}) {
    render(<ContactApp />)
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: name } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: email } })
    fireEvent.change(screen.getByPlaceholderText('Subject'), { target: { value: subject } })
    fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value: message } })
    fireEvent.click(screen.getByRole('button', { name: 'Send Message' }))
  }

  it('calls window.open with a mailto: URL on submit', () => {
    fillAndSubmit()
    expect(openSpy).toHaveBeenCalledOnce()
    const url = openSpy.mock.calls[0][0]
    expect(url).toContain('mailto:thejaredchapman@gmail.com')
  })

  it('encodes subject in mailto URL', () => {
    fillAndSubmit({ subject: 'Test Subject' })
    const url = openSpy.mock.calls[0][0]
    expect(url).toContain(encodeURIComponent('Test Subject'))
  })

  it('uses default subject when subject field is empty', () => {
    fillAndSubmit({ subject: '' })
    const url = openSpy.mock.calls[0][0]
    expect(url).toContain(encodeURIComponent('Hello from JaredOS'))
  })

  it('encodes message in mailto URL', () => {
    fillAndSubmit({ message: 'My special message' })
    const url = openSpy.mock.calls[0][0]
    expect(url).toContain(encodeURIComponent('My special message'))
  })

  it('includes sender name and email in body', () => {
    fillAndSubmit({ name: 'Bob', email: 'bob@test.com', message: 'Hi there' })
    const url = openSpy.mock.calls[0][0]
    expect(url).toContain(encodeURIComponent('Bob'))
    expect(url).toContain(encodeURIComponent('bob@test.com'))
  })

  it('opens in _self target', () => {
    fillAndSubmit()
    expect(openSpy.mock.calls[0][1]).toBe('_self')
  })

  it('shows "Opening mail client..." after submit', async () => {
    fillAndSubmit()
    expect(screen.getByRole('button', { name: 'Opening mail client...' })).toBeInTheDocument()
  })

  it('button resets to "Send Message" after 3 seconds', async () => {
    fillAndSubmit()
    expect(screen.getByRole('button', { name: 'Opening mail client...' })).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })
})

describe('ContactApp — social links', () => {
  it('GitHub link points to correct URL', () => {
    render(<ContactApp />)
    const githubLink = screen.getByText('GitHub').closest('a')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/thejaredchapman')
  })

  it('LinkedIn link points to correct URL', () => {
    render(<ContactApp />)
    const link = screen.getByText('LinkedIn').closest('a')
    expect(link).toHaveAttribute('href', 'https://linkedin.com/in/thejaredchapman')
  })

  it('Instagram link points to correct URL', () => {
    render(<ContactApp />)
    const link = screen.getByText('Instagram').closest('a')
    expect(link).toHaveAttribute('href', 'https://instagram.com/thejaredchapman')
  })

  it('all social links open in new tab', () => {
    render(<ContactApp />)
    const links = ['GitHub', 'LinkedIn', 'Instagram', 'Spotify', 'Linktree']
    for (const name of links) {
      const link = screen.getByText(name).closest('a')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('Schedule a meeting link opens in new tab', () => {
    render(<ContactApp />)
    const link = screen.getByText('Schedule a meeting').closest('a')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('Schedule a meeting link is a Google Calendar URL', () => {
    render(<ContactApp />)
    const link = screen.getByText('Schedule a meeting').closest('a')
    expect(link.href).toContain('calendar.google.com')
  })
})
