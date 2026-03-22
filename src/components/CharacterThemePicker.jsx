import { useColor } from '../context/ColorContext'
import { characterThemes } from '../data/characterThemes'

const characters = Object.values(characterThemes)

function CharacterThemePicker() {
  const { activeCharacter, activateCharacterTheme, clearCharacterTheme } = useColor()

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Default / None button */}
      <button
        onClick={clearCharacterTheme}
        className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105"
        style={{
          background: !activeCharacter ? 'var(--accent-50)' : 'var(--bg-primary)',
          borderColor: !activeCharacter ? 'var(--accent-500)' : 'var(--border-light)',
          boxShadow: !activeCharacter ? '0 0 12px var(--shadow-accent)' : 'none',
        }}
      >
        <span className="text-lg">✨</span>
        <span
          className="text-xs font-medium"
          style={{ color: 'var(--text-primary)' }}
        >
          Default
        </span>
      </button>

      {/* Character buttons */}
      {characters.map((char) => {
        const isActive = activeCharacter === char.id
        return (
          <button
            key={char.id}
            onClick={() => activateCharacterTheme(char.id)}
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:scale-105"
            style={{
              background: isActive ? `${char.palette[500]}18` : 'var(--bg-primary)',
              borderColor: isActive ? char.palette[500] : 'var(--border-light)',
              boxShadow: isActive ? `0 0 12px ${char.palette[500]}66` : 'none',
            }}
          >
            <span className="text-lg">{char.icon}</span>
            <span
              className="text-xs font-medium leading-tight text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              {char.name}
            </span>
            <span
              className="w-4 h-4 rounded-full border"
              style={{
                background: char.palette[500],
                borderColor: char.palette[700],
              }}
            />
          </button>
        )
      })}
    </div>
  )
}

export default CharacterThemePicker
