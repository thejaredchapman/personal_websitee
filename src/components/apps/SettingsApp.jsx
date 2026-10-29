import OsThemePicker from '../OsThemePicker'

function SettingsApp() {
  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Settings</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>Customize your experience</p>

      <div className="p-4 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)', borderRadius: 'var(--os-radius)' }}>
        <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Appearance</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>Pick an operating system, then light or dark</p>
        <OsThemePicker />
      </div>
    </div>
  )
}

export default SettingsApp
