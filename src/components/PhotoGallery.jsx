import { useState } from 'react'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 })
  const [gridRef, visiblePhotos] = useStaggerAnimation(20, { baseDelay: 60 })

  const photos = [
    { id: 1, src: '/photos/IMG_0531.jpg', alt: 'Jared posing with a goat at a farm' },
    { id: 2, src: '/photos/IMG_1454.jpg', alt: 'Jared at Waimea Canyon overlook in Hawaii' },
    { id: 3, src: '/photos/IMG_1848.jpg', alt: 'Jared relaxing at an outdoor city cafe' },
    { id: 4, src: '/photos/IMG_3337.jpg', alt: 'Jared selfie overlooking a hillside city at night' },
    { id: 5, src: '/photos/IMG_4003.jpg', alt: 'Jared wearing a hat outdoors in green garden' },
    { id: 6, src: '/photos/IMG_4437.jpg', alt: 'Jared and friend selfie at a coastal fortress' },
    { id: 7, src: '/photos/IMG_4917.jpg', alt: 'Jared with Shrek cosplayers at a convention' },
    { id: 8, src: '/photos/IMG_4985.jpg', alt: 'Jared with friends at a night market' },
    { id: 9, src: '/photos/IMG_6048.jpg', alt: 'Jared smiling at the Costco food court' },
    { id: 10, src: '/photos/IMG_6067.jpg', alt: 'Jared posing beside a large mural downtown' },
    { id: 11, src: '/photos/IMG_7269.jpg', alt: 'Jared at a backstage concert event' },
    { id: 12, src: '/photos/IMG_7802.jpg', alt: 'Jared selfie at an airport with international flags' },
    { id: 13, src: '/photos/IMG_7843.jpg', alt: 'Jared standing at the Chicago Bean sculpture' },
    { id: 14, src: '/photos/IMG_7919.jpg', alt: 'Jared eating a sandwich with mountain views' },
    { id: 15, src: '/photos/IMG_8082.jpg', alt: 'Jared and his dog on a car ride' },
    { id: 16, src: '/photos/IMG_8290.jpg', alt: 'Jared selfie outside a bar downtown' },
    { id: 17, src: '/photos/IMG_8347.jpg', alt: 'Jared selfie with city rooftop skyline view' },
    { id: 18, src: '/photos/IMG_9188.jpg', alt: 'Jared posing with Buc-ee\'s beaver mascot' },
    { id: 19, src: '/photos/IMG_9591.jpg', alt: 'Jared selfie with blue rooster sculpture' },
    { id: 20, src: '/photos/2acfb0d4-1cd7-4b9f-860e-5db03757e714.jpg', alt: 'Jared dancing in suspenders at a wedding reception' },
  ]

  const openLightbox = (photo, index) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
    document.body.style.overflow = 'auto'
  }

  const goToPrevious = (e) => {
    e.stopPropagation()
    const newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  const goToNext = (e) => {
    e.stopPropagation()
    const newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  const handleKeyDown = (e) => {
    if (!selectedPhoto) return
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') goToPrevious(e)
    if (e.key === 'ArrowRight') goToNext(e)
  }

  return (
    <section ref={sectionRef} id="gallery" className="py-20 px-8 relative z-1 max-[480px]:py-12 max-[480px]:px-4 scroll-mt-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Photo Gallery</h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Moments captured from shows, events, and behind the scenes
        </p>

        <div ref={gridRef} className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 max-[768px]:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] max-[768px]:gap-4 max-[480px]:grid-cols-2 max-[480px]:gap-3">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`relative rounded-2xl overflow-hidden cursor-pointer aspect-[4/3] max-[480px]:aspect-square group transition-all duration-500 ${visiblePhotos.has(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
              style={{ background: 'var(--bg-tertiary)' }}
              onClick={() => openLightbox(photo, index)}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col justify-end items-center p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)' }}>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full flex items-center justify-center scale-50 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" style={{ background: 'var(--accent-500)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease]"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          <button className="absolute top-6 right-6 w-[50px] h-[50px] bg-white/10 border-2 border-white/30 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 z-10 hover:bg-[var(--accent-500)] hover:border-[var(--accent-500)] hover:rotate-90 max-[768px]:top-4 max-[768px]:right-4 max-[768px]:w-10 max-[768px]:h-10" onClick={closeLightbox} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6 text-white max-[768px]:w-5 max-[768px]:h-5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <button className="absolute top-1/2 left-6 -translate-y-1/2 w-[60px] h-[60px] bg-white/10 border-2 border-white/30 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 z-10 hover:bg-[var(--accent-500)] hover:border-[var(--accent-500)] hover:-translate-y-1/2 hover:scale-110 max-[768px]:w-[45px] max-[768px]:h-[45px] max-[768px]:left-2" onClick={goToPrevious} aria-label="Previous photo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-white max-[768px]:w-5 max-[768px]:h-5">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="max-w-[90vw] max-h-[80vh] flex flex-col items-center animate-[zoomIn_0.3s_ease] max-[480px]:max-h-[70vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.5)] max-[480px]:max-h-[60vh]"
            />
            <div className="flex justify-between items-center w-full max-w-[600px] mt-4 px-4 max-[768px]:flex-col max-[768px]:gap-2 max-[768px]:text-center">
              <p className="text-white/60 text-sm">{currentIndex + 1} / {photos.length}</p>
            </div>
          </div>

          <button className="absolute top-1/2 right-6 -translate-y-1/2 w-[60px] h-[60px] bg-white/10 border-2 border-white/30 rounded-full cursor-pointer flex items-center justify-center transition-all duration-300 z-10 hover:bg-[var(--accent-500)] hover:border-[var(--accent-500)] hover:-translate-y-1/2 hover:scale-110 max-[768px]:w-[45px] max-[768px]:h-[45px] max-[768px]:right-2" onClick={goToNext} aria-label="Next photo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-white max-[768px]:w-5 max-[768px]:h-5">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 p-3 bg-black/50 rounded-xl max-w-[90vw] overflow-x-auto max-[768px]:bottom-4 max-[768px]:p-2" onClick={(e) => e.stopPropagation()}>
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                className={`w-[60px] h-[45px] rounded-md overflow-hidden border-2 border-transparent cursor-pointer opacity-50 transition-all duration-300 p-0 bg-transparent shrink-0 hover:opacity-80 max-[768px]:w-[50px] max-[768px]:h-[38px] ${index === currentIndex ? 'opacity-100 border-[var(--accent-500)] scale-110' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                  setSelectedPhoto(photo)
                }}
              >
                <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-xs bg-black/50 py-2 px-4 rounded-full max-[768px]:hidden">
            Use arrow keys to navigate, ESC to close
          </div>
        </div>
      )}
    </section>
  )
}

export default PhotoGallery
