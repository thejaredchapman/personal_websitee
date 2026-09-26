const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

export function getYouTubeId(href) {
  let url
  try {
    url = new URL(href)
  } catch {
    return null
  }
  const host = url.hostname.replace(/^(www\.|m\.)/, '')
  let id = null
  if (host === 'youtu.be') id = url.pathname.slice(1)
  else if (host === 'youtube.com') {
    if (url.pathname === '/watch') id = url.searchParams.get('v')
    else if (url.pathname.startsWith('/shorts/')) id = url.pathname.split('/')[2]
  }
  return id && ID_PATTERN.test(id) ? id : null
}
