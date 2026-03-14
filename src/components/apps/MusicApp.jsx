function MusicApp() {
  return (
    <div className="p-6 max-[768px]:p-4 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Music</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>What I'm listening to</p>

      <div className="flex-1 min-h-0 rounded-xl overflow-hidden">
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1EplC472HQfCzs?utm_source=generator&theme=0"
          width="100%"
          height="100%"
          style={{ minHeight: '360px', border: 'none', borderRadius: '12px' }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Spotify Playlist"
        />
      </div>
    </div>
  )
}

export default MusicApp
