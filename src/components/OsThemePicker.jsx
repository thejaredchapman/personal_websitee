import { useTheme } from '../context/ThemeContext'
import { OS_THEMES } from '../themes/themes'

function OsThemePicker() {
  const { os, setOs, theme, toggleTheme } = useTheme()

  return (
    <div>
      <div className="grid grid-cols-2 gap-2 max-[480px]:grid-cols-1">
        {OS_THEMES.map((t) => {
          const active = os === t.id
          return (
            <button
              key={t.id}
              onClick={() => setOs(t.id)}
              aria-pressed={active}
              className="flex items-center gap-3 p-3 border-2 text-left cursor-pointer transition-transform hover:scale-[1.02]"
              style={{
                borderRadius: 'var(--os-radius)',
                background: active ? 'var(--accent-50)' : 'var(--bg-primary)',
                borderColor: active ? 'var(--accent-500)' : 'var(--border-light)',
                boxShadow: active ? '0 0 12px var(--shadow-accent)' : 'none',
              }}
            >
              <span className="flex shrink-0 overflow-hidden border" style={{ borderColor: 'var(--border-medium)' }} aria-hidden="true">
                {t.swatch.map((c) => (
                  <span key={c} className="block w-4 h-8" style={{ background: c }} />
                ))}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.label}</span>
                <span className="block text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>{t.tagline}</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Mode</span>
        <div role="group" aria-label="Light or dark mode" className="flex border" style={{ borderColor: 'var(--border-medium)' }}>
          {['light', 'dark'].map((mode) => (
            <button
              key={mode}
              onClick={() => { if (theme !== mode) toggleTheme() }}
              aria-pressed={theme === mode}
              className="px-3 py-1 text-xs font-medium capitalize cursor-pointer border-none"
              style={{
                background: theme === mode ? 'var(--accent-500)' : 'transparent',
                color: theme === mode ? '#ffffff' : 'var(--text-secondary)',
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OsThemePicker
