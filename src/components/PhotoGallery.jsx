import { useState } from 'react'
import './PhotoGallery.css'

function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Sample photos - replace with your own images
  const photos = [
    { id: 1, src: 'https://picsum.photos/800/600?random=1', alt: 'Photo 1', caption: 'Comedy Show 2024' },
    { id: 2, src: 'https://picsum.photos/600/800?random=2', alt: 'Photo 2', caption: 'Behind the Scenes' },
    { id: 3, src: 'https://picsum.photos/800/800?random=3', alt: 'Photo 3', caption: 'Team Photo' },
    { id: 4, src: 'https://picsum.photos/800/600?random=4', alt: 'Photo 4', caption: 'Conference Talk' },
    { id: 5, src: 'https://picsum.photos/600/800?random=5', alt: 'Photo 5', caption: 'Hackathon Winner' },
    { id: 6, src: 'https://picsum.photos/800/600?random=6', alt: 'Photo 6', caption: 'Open Mic Night' },
    { id: 7, src: 'https://picsum.photos/800/800?random=7', alt: 'Photo 7', caption: 'Workshop Session' },
    { id: 8, src: 'https://picsum.photos/600/800?random=8', alt: 'Photo 8', caption: 'Podcast Recording' },
    { id: 9, src: 'https://picsum.photos/800/600?random=9', alt: 'Photo 9', caption: 'Award Ceremony' },
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
    <section id="gallery" className="gallery-section">
      <div className="container">
        <h2 className="section-title">Photo Gallery</h2>
        <p className="section-subtitle">
          Moments captured from shows, events, and behind the scenes
        </p>

        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="gallery-item"
              onClick={() => openLightbox(photo, index)}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <div className="gallery-item-overlay">
                <span className="gallery-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </span>
                <span className="gallery-caption">{photo.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Previous button */}
          <button className="lightbox-nav lightbox-prev" onClick={goToPrevious} aria-label="Previous photo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Image container */}
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="lightbox-image"
            />
            <div className="lightbox-info">
              <p className="lightbox-caption">{selectedPhoto.caption}</p>
              <p className="lightbox-counter">{currentIndex + 1} / {photos.length}</p>
            </div>
          </div>

          {/* Next button */}
          <button className="lightbox-nav lightbox-next" onClick={goToNext} aria-label="Next photo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          {/* Thumbnail strip */}
          <div className="lightbox-thumbnails" onClick={(e) => e.stopPropagation()}>
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                className={`lightbox-thumb ${index === currentIndex ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                  setSelectedPhoto(photo)
                }}
              >
                <img src={photo.src} alt={photo.alt} />
              </button>
            ))}
          </div>

          {/* Keyboard hint */}
          <div className="lightbox-hint">
            Use arrow keys to navigate, ESC to close
          </div>
        </div>
      )}
    </section>
  )
}

export default PhotoGallery
