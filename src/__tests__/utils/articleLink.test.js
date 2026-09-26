import { describe, it, expect, beforeEach } from 'vitest'
import { getLinkedArticleId, setLinkedArticleId } from '../../utils/articleLink'

describe('getLinkedArticleId', () => {
  it('reads the ?read= param', () => {
    expect(getLinkedArticleId('?read=stay-the-engineer')).toBe('stay-the-engineer')
  })

  it('returns null when the param is missing', () => {
    expect(getLinkedArticleId('?foo=bar')).toBeNull()
    expect(getLinkedArticleId('')).toBeNull()
  })

  it('returns null for ids that are not known articles', () => {
    expect(getLinkedArticleId('?read=not-a-real-article')).toBeNull()
  })
})

describe('setLinkedArticleId', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/?utm_source=linkedin#top')
  })

  it('adds ?read= while keeping other params and the hash', () => {
    setLinkedArticleId('stay-the-engineer')
    expect(window.location.search).toBe('?utm_source=linkedin&read=stay-the-engineer')
    expect(window.location.hash).toBe('#top')
  })

  it('removes ?read= when given null', () => {
    setLinkedArticleId('stay-the-engineer')
    setLinkedArticleId(null)
    expect(window.location.search).toBe('?utm_source=linkedin')
  })

  it('does not add a history entry', () => {
    const before = window.history.length
    setLinkedArticleId('stay-the-engineer')
    expect(window.history.length).toBe(before)
  })
})
