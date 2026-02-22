import { useState, useEffect } from 'react'
import { useColor, hexToHsl, hslToHexExport, isValidHex } from '../context/ColorContext'
import './ColorPicker.css'

function ColorPicker() {
  const { accentColor, changeColor, colorThemes, customHex, setCustomColor } = useColor()
  const [showCustom, setShowCustom] = useState(accentColor === 'custom')
  const [hexInput, setHexInput] = useState(customHex || '#6366f1')
  const [hslInput, setHslInput] = useState({ h: 0, s: 0, l: 0 })

  // Sync HSL when hex changes
  useEffect(() => {
    const hsl = hexToHsl(hexInput)
    if (hsl) {
      setHslInput(hsl)
    }
  }, [hexInput])

  // Sync hex input when customHex changes externally
  useEffect(() => {
    if (customHex) {
      setHexInput(customHex)
    }
  }, [customHex])

  const handleHexChange = (e) => {
    let val = e.target.value
    if (!val.startsWith('#')) val = '#' + val
    setHexInput(val)
    if (isValidHex(val)) {
      setCustomColor(val)
    }
  }

  const handleHslChange = (field, value) => {
    const num = parseInt(value, 10)
    if (isNaN(num)) return
    const clamped = {
      h: field === 'h' ? Math.max(0, Math.min(360, num)) : hslInput.h,
      s: field === 's' ? Math.max(0, Math.min(100, num)) : hslInput.s,
      l: field === 'l' ? Math.max(0, Math.min(100, num)) : hslInput.l,
    }
    setHslInput(clamped)
    const hex = hslToHexExport(clamped.h, clamped.s, clamped.l)
    setHexInput(hex)
    setCustomColor(hex)
  }

  const handlePresetClick = (key) => {
    changeColor(key)
    setShowCustom(false)
  }

  const handleCustomToggle = () => {
    setShowCustom(!showCustom)
    if (!showCustom) {
      setCustomColor(hexInput)
    }
  }

  return (
    <div className="color-picker">
      <span className="color-picker-label">Theme</span>
      <div className="color-options">
        {Object.entries(colorThemes).map(([key, theme]) => (
          <button
            key={key}
            className={`color-option ${accentColor === key ? 'active' : ''}`}
            onClick={() => handlePresetClick(key)}
            style={{ backgroundColor: theme[500] }}
            aria-label={`Select ${theme.name} theme`}
            title={theme.name}
          />
        ))}
        <button
          className={`color-option color-option-custom ${accentColor === 'custom' ? 'active' : ''}`}
          onClick={handleCustomToggle}
          aria-label="Custom color"
          title="Custom"
        />
      </div>

      {showCustom && (
        <div className="custom-color-panel">
          <div className="custom-color-row">
            <label className="custom-color-label">Hex</label>
            <div className="hex-input-wrapper">
              <span
                className="hex-preview"
                style={{ backgroundColor: isValidHex(hexInput) ? hexInput : '#888' }}
              />
              <input
                type="text"
                className="hex-input"
                value={hexInput}
                onChange={handleHexChange}
                maxLength={7}
                placeholder="#6366f1"
                spellCheck={false}
              />
            </div>
          </div>

          <div className="custom-color-row">
            <label className="custom-color-label">HSL</label>
            <div className="hsl-inputs">
              <div className="hsl-field">
                <label>H</label>
                <input
                  type="number"
                  min="0"
                  max="360"
                  value={hslInput.h}
                  onChange={(e) => handleHslChange('h', e.target.value)}
                />
              </div>
              <div className="hsl-field">
                <label>S</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hslInput.s}
                  onChange={(e) => handleHslChange('s', e.target.value)}
                />
              </div>
              <div className="hsl-field">
                <label>L</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={hslInput.l}
                  onChange={(e) => handleHslChange('l', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
