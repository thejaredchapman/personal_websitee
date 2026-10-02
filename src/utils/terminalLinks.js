const EMAIL = 'thejaredchapman@gmail.com'

const mailto = (subject) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`

// Opens a Google Calendar event with Jared already added as a guest
const MEETING_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent('Meeting with Jared Chapman')}` +
  `&add=${encodeURIComponent(EMAIL)}` +
  `&details=${encodeURIComponent('Scheduled from JaredOS')}`

// Terminal keywords that open somewhere directly: { label shown in terminal, url }
export const LINK_COMMANDS = {
  github: { label: 'GitHub', url: 'https://github.com/thejaredchapman' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/thejaredchapman' },
  instagram: { label: 'Instagram', url: 'https://instagram.com/thejaredchapman' },
  spotify: { label: 'Spotify', url: 'https://open.spotify.com/user/thejaredchapman' },
  linktree: { label: 'Linktree', url: 'https://linktr.ee/thejaredchapman' },
  meeting: { label: 'a meeting invite', url: MEETING_URL, verb: 'Scheduling' },
  contact: { label: 'an email', url: mailto('Hello from JaredOS'), verb: 'Drafting' },
  email: { label: 'an email', url: mailto('Hello from JaredOS'), verb: 'Drafting' },
}

export const LINK_COMMAND_NAMES = Object.keys(LINK_COMMANDS)

// Terminal output for a link keyword; the line carries `open` so the terminal
// can launch it from the submit handler (a user gesture, so popups aren't blocked)
export function getLinkCommandOutput(base) {
  const link = LINK_COMMANDS[base]
  if (!link) return null
  const isMail = link.url.startsWith('mailto:')
  const text = link.verb
    ? `  ${link.verb} ${link.label}${isMail ? ` to ${EMAIL}` : ' with Jared'}...`
    : `  Opening ${link.label}...`
  return [{ text, type: 'accent', open: link.url }]
}

export function openLink(url) {
  if (url.startsWith('mailto:')) window.location.href = url
  else window.open(url, '_blank', 'noopener,noreferrer')
}
