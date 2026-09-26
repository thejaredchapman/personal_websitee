import { useState } from 'react'

// Click-to-load player: shows a thumbnail until clicked, so pages with many
// videos don't load a YouTube iframe (and its scripts/cookies) for each one.
function YouTubeEmbed({ id, title }) {
  const [playing, setPlaying] = useState(false)

  return (
    <span
      className="block relative w-full max-w-md aspect-video my-2 rounded-lg overflow-hidden border"
      style={{ borderColor: 'var(--border-light)', background: '#000' }}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            // inline size: the global `img { height: auto }` rule in index.css
            // is unlayered, so it beats Tailwind's h-full utility
            style={{ width: '100%', height: '100%' }}
            className="absolute inset-0 object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span
            className="absolute inset-0 m-auto w-14 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ background: 'var(--accent-500)' }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </button>
      )}
    </span>
  )
}

export default YouTubeEmbed
