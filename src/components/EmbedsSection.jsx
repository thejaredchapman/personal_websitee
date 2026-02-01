import './EmbedsSection.css'

function EmbedsSection() {
  return (
    <section id="connect" className="embeds-section">
      <div className="container">
        <h2 className="section-title">Stay Connected</h2>
        <p className="section-subtitle">
          Check out what I'm listening to, follow my latest posts, and see when I'm available
        </p>

        <div className="embeds-grid">
          {/* Spotify Embed */}
          <div className="embed-card">
            <div className="embed-header">
              <span className="embed-icon">🎵</span>
              <h3>Now Playing</h3>
            </div>
            <div className="embed-content spotify-embed">
              {/* Replace with your Spotify playlist/artist embed */}
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Playlist"
              />
              <p className="embed-note">
                Replace with your own Spotify playlist or artist URL
              </p>
            </div>
          </div>

          {/* Instagram Embed */}
          <div className="embed-card">
            <div className="embed-header">
              <span className="embed-icon">📸</span>
              <h3>Instagram</h3>
            </div>
            <div className="embed-content instagram-embed">
              {/* Instagram embed placeholder - requires Instagram's embed script */}
              <div className="instagram-placeholder">
                <div className="instagram-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <p>Follow me on Instagram</p>
                <a
                  href="https://instagram.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-link btn btn-secondary"
                >
                  @yourusername
                </a>
                <p className="embed-note">
                  To embed posts, add Instagram's embed code here or use the oEmbed API
                </p>
              </div>
            </div>
          </div>

          {/* Google Calendar Embed */}
          <div className="embed-card embed-card-full">
            <div className="embed-header">
              <span className="embed-icon">📅</span>
              <h3>My Schedule</h3>
            </div>
            <div className="embed-content calendar-embed">
              {/* Replace with your Google Calendar embed */}
              <iframe
                src="https://calendar.google.com/calendar/embed?height=400&wkst=1&ctz=America%2FNew_York&bgcolor=%23ffffff&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&mode=WEEK"
                width="100%"
                height="400"
                frameBorder="0"
                scrolling="no"
                title="Google Calendar"
              />
              <p className="embed-note">
                Replace the src URL with your own public Google Calendar embed link
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmbedsSection
