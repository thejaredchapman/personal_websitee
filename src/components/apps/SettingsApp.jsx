import ThemeToggle from '../ThemeToggle'
import ColorPicker from '../ColorPicker'
import CharacterThemePicker from '../CharacterThemePicker'

function SettingsApp() {
  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Settings</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>Customize your experience</p>

      {/* Theme */}
      <div className="rounded-xl p-4 border mb-4" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Appearance</h3>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>Toggle light and dark mode</p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Color */}
      <div className="rounded-xl p-4 border mb-4" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
        <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Accent Color</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>Choose a preset or pick your own</p>
        <ColorPicker />
      </div>

      {/* Character Themes */}
      <div className="rounded-xl p-4 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
        <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Character Themes</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>Apply a themed wallpaper and color palette</p>
        <CharacterThemePicker />
      </div>
    </div>
  )
}

export default SettingsApp
