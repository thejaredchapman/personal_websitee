import { useState } from 'react'
import './PhotoGallery.css'

function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const photos = [
    { id: 1, src: '/photos/IMG_0531.jpg', alt: 'Photo 1' },
    { id: 2, src: '/photos/IMG_1454.jpg', alt: 'Photo 2' },
    { id: 3, src: '/photos/IMG_1848.jpg', alt: 'Photo 3' },
    { id: 4, src: '/photos/IMG_3337.jpg', alt: 'Photo 4' },
    { id: 5, src: '/photos/IMG_4003.jpg', alt: 'Photo 5' },
    { id: 6, src: '/photos/IMG_4437.jpg', alt: 'Photo 6' },
    { id: 7, src: '/photos/IMG_4917.jpg', alt: 'Photo 7' },
    { id: 8, src: '/photos/IMG_4985.jpg', alt: 'Photo 8' },
    { id: 9, src: '/photos/IMG_6048.jpg', alt: 'Photo 9' },
    { id: 10, src: '/photos/IMG_6067.jpg', alt: 'Photo 10' },
    { id: 11, src: '/photos/IMG_7269.jpg', alt: 'Photo 11' },
    { id: 12, src: '/photos/IMG_7802.jpg', alt: 'Photo 12' },
    { id: 13, src: '/photos/IMG_7843.jpg', alt: 'Photo 13' },
    { id: 14, src: '/photos/IMG_7919.jpg', alt: 'Photo 14' },
    { id: 15, src: '/photos/IMG_8082.jpg', alt: 'Photo 15' },
    { id: 16, src: '/photos/IMG_8290.jpg', alt: 'Photo 16' },
    { id: 17, src: '/photos/IMG_8347.jpg', alt: 'Photo 17' },
    { id: 18, src: '/photos/IMG_9188.jpg', alt: 'Photo 18' },
    { id: 19, src: '/photos/IMG_9591.jpg', alt: 'Photo 19' },
    { id: 20, src: '/photos/2acfb0d4-1cd7-4b9f-860e-5db03757e714.jpg', alt: 'Photo 20' },
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
