import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import YouTubeEmbed from '../../components/YouTubeEmbed'
import { getYouTubeId } from '../../utils/youtube'

describe('getYouTubeId', () => {
  it('parses a watch URL', () => {
    expect(getYouTubeId('https://www.youtube.com/watch?v=IkaPHiMDazM')).toBe('IkaPHiMDazM')
  })

  it('parses a youtu.be short link', () => {
    expect(getYouTubeId('https://youtu.be/IkaPHiMDazM')).toBe('IkaPHiMDazM')
  })

  it('parses a shorts URL', () => {
    expect(getYouTubeId('https://www.youtube.com/shorts/450ZL_wfSqo')).toBe('450ZL_wfSqo')
  })

  it('handles IDs that start with a dash', () => {
    expect(getYouTubeId('https://www.youtube.com/watch?v=-GMmoXbU004')).toBe('-GMmoXbU004')
  })

  it('returns null for non-YouTube links', () => {
    expect(getYouTubeId('https://github.com/obra/superpowers')).toBeNull()
  })

  it('returns null for malformed URLs', () => {
    expect(getYouTubeId('not a url')).toBeNull()
  })
})

describe('YouTubeEmbed', () => {
  it('shows a thumbnail play button and no iframe before clicking', () => {
    render(<YouTubeEmbed id="IkaPHiMDazM" title="Hooks in Claude Code" />)
    expect(screen.getByRole('button', { name: 'Play video: Hooks in Claude Code' })).toBeInTheDocument()
    expect(document.querySelector('img')).toHaveAttribute('src', 'https://i.ytimg.com/vi/IkaPHiMDazM/hqdefault.jpg')
    expect(document.querySelector('iframe')).toBeNull()
  })

  it('loads the privacy-enhanced player after clicking', async () => {
    render(<YouTubeEmbed id="IkaPHiMDazM" title="Hooks in Claude Code" />)
    await userEvent.click(screen.getByRole('button', { name: 'Play video: Hooks in Claude Code' }))
    const iframe = screen.getByTitle('Hooks in Claude Code')
    expect(iframe.tagName).toBe('IFRAME')
    expect(iframe).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/IkaPHiMDazM?autoplay=1')
    expect(screen.queryByRole('button', { name: /Play video/ })).toBeNull()
  })
})
