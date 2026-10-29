export const DEFAULT_OS = 'xp'

// Registry of OS themes. Each id has a matching stylesheet in this folder
// that defines its light and dark token sets under html[data-os="<id>"].
export const OS_THEMES = [
  { id: 'xp', label: 'Windows XP', tagline: 'Luna blue & Bliss hills', startLabel: 'start', swatch: ['#245edb', '#3c9a3c', '#ece9d8'] },
  { id: 'win95', label: 'Windows 95', tagline: 'Teal desktop, gray bevels', startLabel: 'Start', swatch: ['#008080', '#c0c0c0', '#000080'] },
  { id: 'macos', label: 'macOS', tagline: 'Glass, traffic lights & a dock', startLabel: 'J', swatch: ['#f97316', '#faf6f1', '#18181b'] },
  { id: 'myspace', label: 'MySpace', tagline: 'Top 8 profile blues', startLabel: 'Home', swatch: ['#6698cb', '#ff9933', '#ffffff'] },
  { id: 'ubuntu', label: 'Ubuntu', tagline: 'Aubergine & orange', startLabel: 'Activities', swatch: ['#2c001e', '#e95420', '#f6f5f4'] },
  { id: 'tandy', label: 'Tandy 1000', tagline: 'DeskMate, CGA cyan & blue', startLabel: 'DeskMate', swatch: ['#0000aa', '#00aaaa', '#aa00aa'] },
]

export const OS_IDS = OS_THEMES.map((t) => t.id)
