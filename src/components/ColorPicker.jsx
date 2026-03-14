import { useState, useEffect, useRef, useCallback } from 'react'
import { useColor, hexToHsl, hslToHexExport, isValidHex } from '../context/ColorContext'

function hslToRgbValues(h, s, l) {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n) => {
    const k = (n + h / 30) % 12
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
  }
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)]
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b]
    .map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0'))
    .join('')
}

function hexToRgbValues(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null
}

const WHEEL_SIZE = 200
const WHEEL_RADIUS = WHEEL_SIZE / 2

function ColorPicker() {
  const { accentColor, changeColor, colorThemes, customHex, setCustomColor } = useColor()
  const [showWheel, setShowWheel] = useState(accentColor === 'custom')
  const [hexInput, setHexInput] = useState(customHex || '#6366f1')
  const [hslValues, setHslValues] = useState(() => {
    const hsl = hexToHsl(customHex || '#6366f1')
    return hsl || { h: 239, s: 84, l: 67 }
  })
  const [rgbValues, setRgbValues] = useState(() => {
    const rgb = hexToRgbValues(customHex || '#6366f1')
    return rgb ? { r: rgb[0], g: rgb[1], b: rgb[2] } : { r: 99, g: 102, b: 241 }
  })
  const [lightness, setLightness] = useState(() => {
    const hsl = hexToHsl(customHex || '#6366f1')
    return hsl ? hsl.l : 67
  })
  const [dragging, setDragging] = useState(false)

  const canvasRef = useRef(null)
  const wheelImageRef = useRef(null)
  const lastLightnessRef = useRef(null)
  const internalUpdate = useRef(false)

  useEffect(() => {
    if (internalUpdate.current) {
      internalUpdate.current = false
      return
    }
    if (customHex) {
      setHexInput(customHex)
      const hsl = hexToHsl(customHex)
      if (hsl) {
        setHslValues(hsl)
        setLightness(hsl.l)
      }
      const rgb = hexToRgbValues(customHex)
      if (rgb) {
        setRgbValues({ r: rgb[0], g: rgb[1], b: rgb[2] })
      }
    }
  }, [customHex])

  useEffect(() => {
    if (!showWheel) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    if (lastLightnessRef.current !== lightness || !wheelImageRef.current) {
      const imageData = ctx.createImageData(WHEEL_SIZE, WHEEL_SIZE)
      const data = imageData.data

      for (let y = 0; y < WHEEL_SIZE; y++) {
        for (let x = 0; x < WHEEL_SIZE; x++) {
          const dx = x - WHEEL_RADIUS
          const dy = y - WHEEL_RADIUS
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist <= WHEEL_RADIUS - 1) {
            const angle = Math.atan2(dy, dx)
            const hue = ((angle * 180) / Math.PI + 360) % 360
            const saturation = (dist / (WHEEL_RADIUS - 1)) * 100
            const [r, g, b] = hslToRgbValues(hue, saturation, lightness)
            const idx = (y * WHEEL_SIZE + x) * 4
            data[idx] = r
            data[idx + 1] = g
            data[idx + 2] = b
            data[idx + 3] = 255
          }
        }
      }

      wheelImageRef.current = imageData
      lastLightnessRef.current = lightness
    }

    ctx.putImageData(wheelImageRef.current, 0, 0)

    const angle = (hslValues.h * Math.PI) / 180
    const dist = (hslValues.s / 100) * (WHEEL_RADIUS - 1)
    const ix = WHEEL_RADIUS + dist * Math.cos(angle)
    const iy = WHEEL_RADIUS + dist * Math.sin(angle)

    ctx.beginPath()
    ctx.arc(ix, iy, 8, 0, Math.PI * 2)
    ctx.fillStyle = hslToHexExport(hslValues.h, hslValues.s, lightness)
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2.5
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(ix, iy, 8, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(0,0,0,0.25)'
    ctx.lineWidth = 1
    ctx.stroke()
  }, [showWheel, lightness, hslValues.h, hslValues.s])

  const pickColorFromWheel = useCallback(
    (clientX, clientY) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      const scaleX = WHEEL_SIZE / rect.width
      const scaleY = WHEEL_SIZE / rect.height
      const x = (clientX - rect.left) * scaleX
      const y = (clientY - rect.top) * scaleY
      const dx = x - WHEEL_RADIUS
      const dy = y - WHEEL_RADIUS
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist <= WHEEL_RADIUS) {
        const angle = Math.atan2(dy, dx)
        const hue = Math.round(((angle * 180) / Math.PI + 360) % 360)
        const saturation = Math.round(
          Math.min((dist / (WHEEL_RADIUS - 1)) * 100, 100)
        )

        const hex = hslToHexExport(hue, saturation, lightness)
        const [r, g, b] = hslToRgbValues(hue, saturation, lightness)
        setHslValues({ h: hue, s: saturation, l: lightness })
        setRgbValues({ r, g, b })
        setHexInput(hex)
        internalUpdate.current = true
        setCustomColor(hex)
      }
    },
    [lightness, setCustomColor]
  )

  const handleWheelPointerDown = (e) => {
    e.preventDefault()
    setDragging(true)
    pickColorFromWheel(e.clientX, e.clientY)
  }

  useEffect(() => {
    if (!dragging) return
    const handleMove = (e) => {
      e.preventDefault()
      const clientX = e.touches ? e.touches[0].clientX : e.clientX
      const clientY = e.touches ? e.touches[0].clientY : e.clientY
      pickColorFromWheel(clientX, clientY)
    }

    const handleUp = () => setDragging(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleUp)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleUp)
    }
  }, [dragging, pickColorFromWheel])

  const updateFromHsl = (h, s, l) => {
    const hex = hslToHexExport(h, s, l)
    const [r, g, b] = hslToRgbValues(h, s, l)
    setHslValues({ h, s, l })
    setRgbValues({ r, g, b })
    setHexInput(hex)
    setLightness(l)
    internalUpdate.current = true
    setCustomColor(hex)
  }

  const handleHexChange = (e) => {
    let val = e.target.value
    if (!val.startsWith('#')) val = '#' + val
    setHexInput(val)
    if (isValidHex(val)) {
      const hsl = hexToHsl(val)
      if (hsl) {
        setHslValues(hsl)
        setLightness(hsl.l)
      }
      const rgb = hexToRgbValues(val)
      if (rgb) setRgbValues({ r: rgb[0], g: rgb[1], b: rgb[2] })
      internalUpdate.current = true
      setCustomColor(val)
    }
  }

  const handleRgbChange = (channel, value) => {
    const num = parseInt(value, 10)
    if (isNaN(num)) return
    const clamped = Math.max(0, Math.min(255, num))
    const newRgb = { ...rgbValues, [channel]: clamped }
    setRgbValues(newRgb)
    const hex = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
    setHexInput(hex)
    const hsl = hexToHsl(hex)
    if (hsl) {
      setHslValues(hsl)
      setLightness(hsl.l)
    }
    internalUpdate.current = true
    setCustomColor(hex)
  }

  const handleLightnessChange = (e) => {
    const val = parseInt(e.target.value, 10)
    updateFromHsl(hslValues.h, hslValues.s, val)
  }

  const handleHueChange = (e) => {
    const val = parseInt(e.target.value, 10)
    updateFromHsl(val, hslValues.s, lightness)
  }

  const handlePresetClick = (key) => {
    changeColor(key)
    setShowWheel(false)
  }

  const handleCustomToggle = () => {
    if (!showWheel) {
      internalUpdate.current = true
      setCustomColor(hexInput)
    }
    setShowWheel(!showWheel)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-1.5 flex-wrap items-center">
        {Object.entries(colorThemes).map(([key, theme]) => (
          <button
            key={key}
            className={`w-7 h-7 rounded-full border-[2.5px] border-transparent cursor-pointer transition-all duration-200 p-0 relative hover:scale-115 ${accentColor === key ? 'border-[var(--text-primary)] shadow-[0_0_0_2px_var(--bg-primary)]' : ''}`}
            onClick={() => handlePresetClick(key)}
            style={{ backgroundColor: theme[500] }}
            aria-label={`Select ${theme.name} theme`}
            title={theme.name}
          />
        ))}
        <button
          className={`w-7 h-7 rounded-full border-[2.5px] border-transparent cursor-pointer transition-all duration-200 p-0 relative hover:scale-115 flex items-center justify-center ${showWheel || accentColor === 'custom' ? 'border-[var(--text-primary)] shadow-[0_0_0_2px_var(--bg-primary)]' : ''}`}
          style={{ background: 'conic-gradient(#f87171, #fb923c, #facc15, #4ade80, #60a5fa, #a855f7, #ec4899, #f87171)' }}
          onClick={handleCustomToggle}
          aria-label="Custom color"
          title="Custom"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" className={`w-3.5 h-3.5 transition-transform duration-200 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)] ${showWheel ? 'rotate-45' : ''}`}>
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {showWheel && (
        <div className="flex flex-col gap-3 pt-3 border-t animate-[wheel-slide-in_0.25s_ease]" style={{ borderColor: 'var(--border-light)' }}>
          <div className="flex justify-center py-1">
            <canvas
              ref={canvasRef}
              width={WHEEL_SIZE}
              height={WHEEL_SIZE}
              className="w-[180px] h-[180px] rounded-full cursor-crosshair shadow-[0_2px_12px_rgba(0,0,0,0.12)] touch-none"
              onMouseDown={handleWheelPointerDown}
              onTouchStart={handleWheelPointerDown}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[0.7rem] font-semibold uppercase tracking-wide min-w-[34px]" style={{ color: 'var(--text-tertiary)' }}>Hue</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hslValues.h}
              onChange={handleHueChange}
              className="color-slider hue-slider flex-1 h-2.5 appearance-none rounded-[5px] outline-none cursor-pointer border border-black/[0.08]"
            />
            <span className="font-mono text-[0.7rem] min-w-[26px] text-right" style={{ color: 'var(--text-tertiary)' }}>{hslValues.h}</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[0.7rem] font-semibold uppercase tracking-wide min-w-[34px]" style={{ color: 'var(--text-tertiary)' }}>Light</label>
            <input
              type="range"
              min="5"
              max="95"
              value={lightness}
              onChange={handleLightnessChange}
              className="color-slider lightness-slider flex-1 h-2.5 appearance-none rounded-[5px] outline-none cursor-pointer border border-black/[0.08]"
              style={{
                '--sl-left': hslToHexExport(hslValues.h, hslValues.s, 5),
                '--sl-mid': hslToHexExport(hslValues.h, hslValues.s, 50),
                '--sl-right': hslToHexExport(hslValues.h, hslValues.s, 95),
              }}
            />
            <span className="font-mono text-[0.7rem] min-w-[26px] text-right" style={{ color: 'var(--text-tertiary)' }}>{lightness}</span>
          </div>

          <div className="flex flex-col gap-2.5 pt-2 border-t" style={{ borderColor: 'var(--border-light)' }}>
            <div className="flex flex-col gap-1">
              <label className="text-[0.65rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>HEX</label>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-[22px] h-[22px] rounded-[5px] border shrink-0"
                  style={{
                    backgroundColor: isValidHex(hexInput) ? hexInput : '#888',
                    borderColor: 'var(--border-medium)',
                  }}
                />
                <input
                  type="text"
                  value={hexInput}
                  onChange={handleHexChange}
                  maxLength={7}
                  placeholder="#6366f1"
                  spellCheck={false}
                  className="font-mono text-[0.8rem] py-1.5 px-2 rounded-md border w-full outline-none transition-colors duration-200 focus:border-[var(--accent-primary)]"
                  style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[0.65rem] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>RGB</label>
              <div className="flex gap-1.5">
                {['r', 'g', 'b'].map((ch) => (
                  <div key={ch} className="flex flex-col items-center gap-0.5 flex-1">
                    <span className="text-[0.6rem] font-semibold uppercase" style={{ color: 'var(--text-tertiary)' }}>{ch.toUpperCase()}</span>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={rgbValues[ch]}
                      onChange={(e) => handleRgbChange(ch, e.target.value)}
                      className="rgb-number-input font-mono text-[0.75rem] py-1 px-1 rounded-[5px] border w-full text-center outline-none transition-colors duration-200 focus:border-[var(--accent-primary)]"
                      style={{ borderColor: 'var(--border-medium)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
