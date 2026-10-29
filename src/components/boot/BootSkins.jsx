import BootLog from './BootLog'

// Each skin gets { lines, progress, showProgress } and draws its own splash frame.
// The data-boot-skin attribute lets tests and CSS find the active skin.

function Segments({ progress, count = 20 }) {
  const lit = Math.round((progress / 100) * count)
  return (
    <div className="flex gap-[2px]" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="block h-4 flex-1" style={{ background: i < lit ? 'var(--seg-on)' : 'var(--seg-off)' }} />
      ))}
    </div>
  )
}

export function XpSkin({ lines, progress, showProgress }) {
  return (
    <div
      data-boot-skin="xp"
      className="w-full max-w-[640px] px-8 text-sm"
      style={{
        fontFamily: 'Tahoma, Verdana, sans-serif',
        '--boot-text': '#c8d4f0', '--boot-accent': '#ffffff', '--boot-dim': '#7e8db5',
        '--boot-ok': '#8fd88f', '--boot-warn': '#ffd866', '--boot-new': '#7ab8ff',
        '--seg-on': 'linear-gradient(180deg,#6fa6ff,#2457d6)', '--seg-off': 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="text-center mb-5">
        <div className="text-3xl text-white font-bold tracking-tight">
          Jared<span style={{ color: '#ff6a2b' }}>OS</span> <span className="text-xl italic font-normal" style={{ color: '#ff6a2b' }}>xp</span>
        </div>
        <div className="text-xs text-white/60 mt-1">Professional Portfolio Edition</div>
      </div>
      <BootLog lines={lines} />
      {showProgress && (
        <div className="mt-5 p-[3px] rounded-[4px] border" style={{ borderColor: '#b9c6e8' }}>
          <Segments progress={progress} />
        </div>
      )}
      <p className="mt-3 text-center text-xs text-white/50">Copyright © Jared Chapman</p>
    </div>
  )
}

export function Win95Skin({ lines, progress, showProgress }) {
  return (
    <div
      data-boot-skin="win95"
      className="w-full max-w-[560px] px-6 text-sm"
      style={{
        fontFamily: "'MS Sans Serif', Tahoma, Arial, sans-serif",
        '--boot-text': '#000000', '--boot-accent': '#000080', '--boot-dim': '#555555',
        '--boot-ok': '#006400', '--boot-warn': '#8a5a00', '--boot-new': '#000080',
        '--seg-on': '#000080', '--seg-off': '#dfdfdf',
      }}
    >
      <div
        className="p-4"
        style={{ background: '#c0c0c0', boxShadow: 'inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px #808080, inset 2px 2px #ffffff' }}
      >
        <div className="mb-3 px-1 py-[2px] text-white font-bold" style={{ background: 'linear-gradient(90deg,#000080,#1084d0)' }}>
          Starting JaredOS 95...
        </div>
        <BootLog lines={lines} />
        {showProgress && (
          <div className="mt-3 p-[2px]" style={{ background: '#ffffff', boxShadow: 'inset 1px 1px #808080, inset -1px -1px #dfdfdf' }}>
            <Segments progress={progress} count={24} />
          </div>
        )}
      </div>
    </div>
  )
}

export function MyspaceSkin({ lines, progress, showProgress }) {
  return (
    <div
      data-boot-skin="myspace"
      className="w-full max-w-[600px] text-sm"
      style={{
        fontFamily: 'Verdana, Arial, sans-serif',
        '--boot-text': '#1a1a1a', '--boot-accent': '#336699', '--boot-dim': '#667788',
        '--boot-ok': '#2a7a2a', '--boot-warn': '#b36200', '--boot-new': '#cc6600',
      }}
    >
      <div className="bg-white border" style={{ borderColor: '#6698cb' }}>
        <div className="px-4 py-2 text-white font-bold text-lg" style={{ background: '#6698cb', borderBottom: '3px solid #ff9933' }}>
          JaredOS <span className="text-xs font-normal opacity-90">a place for friends</span>
        </div>
        <div className="p-4">
          <p className="mb-3 text-xs" style={{ color: '#667788' }}>Loading Jared's profile...</p>
          <BootLog lines={lines} />
          {showProgress && (
            <div className="mt-4 h-3 border" style={{ borderColor: '#6698cb', background: '#f0f5fa' }}>
              <div className="h-full" style={{ width: `${progress}%`, background: 'repeating-linear-gradient(45deg,#ff9933 0 8px,#ffb566 8px 16px)' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function UbuntuSkin({ lines, progress, showProgress }) {
  return (
    <div
      data-boot-skin="ubuntu"
      className="w-full max-w-[600px] px-8 text-sm"
      style={{
        fontFamily: 'Ubuntu, Cantarell, system-ui, sans-serif',
        '--boot-text': 'rgba(255,255,255,0.78)', '--boot-accent': '#ffffff', '--boot-dim': 'rgba(255,255,255,0.4)',
        '--boot-ok': '#9fe3a0', '--boot-warn': '#ffd27a', '--boot-new': '#ffab85',
      }}
    >
      <div className="text-center mb-6">
        <div className="text-2xl font-light text-white tracking-wide">
          jared<span className="font-bold">os</span>
          <span className="inline-block w-2 h-2 rounded-full ml-1 align-baseline" style={{ background: '#e95420' }} />
        </div>
      </div>
      <BootLog lines={lines} />
      {showProgress && (
        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {Array.from({ length: 5 }, (_, i) => (
            <span
              key={i}
              className="block w-2.5 h-2.5 rounded-full"
              style={{ background: progress >= (i + 1) * 20 ? '#e95420' : 'rgba(255,255,255,0.2)', transition: 'background 0.1s' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export function MacosSkin({ lines, progress, showProgress }) {
  return (
    <div
      data-boot-skin="macos"
      className="w-full max-w-[560px] px-8 text-sm"
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', system-ui, sans-serif",
        '--boot-text': 'rgba(255,255,255,0.7)', '--boot-accent': '#ffffff', '--boot-dim': 'rgba(255,255,255,0.35)',
        '--boot-ok': '#8fe0a0', '--boot-warn': '#ffd27a', '--boot-new': '#fdba74',
      }}
    >
      <div className="text-center mb-6 text-4xl font-semibold text-white tracking-tight">
        Jared<span style={{ color: '#fb923c' }}>OS</span>
      </div>
      <BootLog lines={lines} />
      {showProgress && (
        <div className="mt-6 mx-auto h-[5px] w-48 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.2)' }} aria-hidden="true">
          <div className="h-full rounded-full bg-white" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  )
}

export function TandySkin({ lines, progress, showProgress }) {
  const blocks = 30
  const lit = Math.round((progress / 100) * blocks)
  return (
    <div
      data-boot-skin="tandy"
      className="w-full max-w-[640px] px-6 text-sm"
      style={{
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        '--boot-text': '#ffffff', '--boot-accent': '#55ffff', '--boot-dim': '#aaaaaa',
        '--boot-ok': '#55ff55', '--boot-warn': '#ffff55', '--boot-new': '#ff55ff',
      }}
    >
      <div className="mb-4 py-1 px-2 font-bold text-center" style={{ background: '#aaaaaa', color: '#000000' }}>
        JAREDOS DESKMATE — TANDY 1000 COMPATIBLE
      </div>
      <BootLog lines={lines} />
      {showProgress && (
        <p className="mt-4 text-white" aria-hidden="true">
          {'█'.repeat(lit)}<span style={{ color: '#555555' }}>{'░'.repeat(blocks - lit)}</span> {progress}%
        </p>
      )}
    </div>
  )
}
