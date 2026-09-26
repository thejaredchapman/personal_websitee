import { allArticles } from '../content/writing'

// Direct links to Writing articles: https://thejaredchapman.com/?read=<article id>
const PARAM = 'read'

export function getLinkedArticleId(search = window.location.search) {
  const id = new URLSearchParams(search).get(PARAM)
  return allArticles.some((a) => a.id === id) ? id : null
}

// Mirrors the open article into the address bar (without adding history
// entries) so the current URL is always a shareable link.
export function setLinkedArticleId(id) {
  const url = new URL(window.location.href)
  if (id) url.searchParams.set(PARAM, id)
  else url.searchParams.delete(PARAM)
  window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash)
}
