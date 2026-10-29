// Boot log lines, coloured per line style. Colours come from --boot-* vars set by the skin.
const STYLE_VAR = {
  accent: 'var(--boot-accent)',
  dim: 'var(--boot-dim)',
  ok: 'var(--boot-ok)',
  warn: 'var(--boot-warn)',
  new: 'var(--boot-new)',
}

function BootLog({ lines }) {
  return (
    <div className="max-h-[48vh] overflow-hidden text-left">
      {lines.map((line, i) => (
        <div
          key={i}
          className={`leading-relaxed animate-[bootLineIn_0.15s_ease] ${line.style === 'accent' || line.style === 'new' ? 'font-bold' : ''}`}
          style={{ color: STYLE_VAR[line.style] ?? 'var(--boot-text)' }}
        >
          {line.text || ' '}
        </div>
      ))}
    </div>
  )
}

export default BootLog
