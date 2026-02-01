import { useColor } from '../context/ColorContext'
import './ColorPicker.css'

function ColorPicker() {
  const { accentColor, changeColor, colorThemes } = useColor()

  return (
    <div className="color-picker">
      <span className="color-picker-label">Theme</span>
      <div className="color-options">
        {Object.entries(colorThemes).map(([key, theme]) => (
          <button
            key={key}
            className={`color-option ${accentColor === key ? 'active' : ''}`}
            onClick={() => changeColor(key)}
            style={{ backgroundColor: theme[500] }}
            aria-label={`Select ${theme.name} theme`}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  )
}

export default ColorPicker
