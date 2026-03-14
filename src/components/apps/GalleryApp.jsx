import { useState } from 'react'

const photos = [
  '/photos/IMG_0531.jpg', '/photos/IMG_1454.jpg', '/photos/IMG_1848.jpg',
  '/photos/IMG_3337.jpg', '/photos/IMG_4003.jpg', '/photos/IMG_4437.jpg',
  '/photos/IMG_4917.jpg', '/photos/IMG_4985.jpg', '/photos/IMG_6048.jpg',
  '/photos/IMG_6067.jpg', '/photos/IMG_7269.jpg', '/photos/IMG_7802.jpg',
  '/photos/IMG_7843.jpg', '/photos/IMG_7919.jpg', '/photos/IMG_8082.jpg',
  '/photos/IMG_8290.jpg', '/photos/IMG_8347.jpg', '/photos/IMG_9188.jpg',
  '/photos/IMG_9591.jpg', '/photos/2acfb0d4-1cd7-4b9f-860e-5db03757e714.jpg',
]

function GalleryApp() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Gallery</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>Moments captured</p>

      <div className="grid grid-cols-4 gap-2 max-[768px]:grid-cols-3 max-[480px]:grid-cols-2">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className="aspect-square rounded-lg overflow-hidden border-0 p-0 cursor-pointer bg-black/20 transition-all hover:opacity-80 hover:scale-[1.02]"
          >
            <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setSelected(selected > 0 ? selected - 1 : photos.length - 1) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border-0 text-white text-xl cursor-pointer hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            ‹
          </button>
          <img
            src={photos[selected]}
            alt={`Photo ${selected + 1}`}
            className="max-w-[85vw] max-h-[85vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={(e) => { e.stopPropagation(); setSelected(selected < photos.length - 1 ? selected + 1 : 0) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border-0 text-white text-xl cursor-pointer hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            ›
          </button>
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border-0 text-white text-sm cursor-pointer hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            ✕
          </button>
          <div className="absolute bottom-4 text-white/40 text-xs font-mono">
            {selected + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  )
}

export default GalleryApp
