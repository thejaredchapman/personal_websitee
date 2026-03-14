import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className="relative w-11 h-11 rounded-full border-2 cursor-pointer flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-110 max-[768px]:w-10 max-[768px]:h-10"
      style={{
        background: 'var(--accent-lighter)',
        borderColor: 'var(--accent-primary)',
        transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-light)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'var(--accent-lighter)'}
    >
      <svg className="theme-icon-sun absolute w-[22px] h-[22px] max-[768px]:w-5 max-[768px]:h-5 transition-all duration-400 opacity-100 rotate-0 scale-100" style={{ color: 'var(--accent-dark)', transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg className="theme-icon-moon absolute w-[22px] h-[22px] max-[768px]:w-5 max-[768px]:h-5 transition-all duration-400 opacity-0 -rotate-90 scale-50" style={{ color: 'var(--accent-dark)', transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}

export default ThemeToggle
