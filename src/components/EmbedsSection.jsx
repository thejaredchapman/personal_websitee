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
              <span className="embed-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </span>
              <h3>Now Playing</h3>
            </div>
            <div className="embed-content spotify-embed">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1EplC472HQfCzs?utm_source=generator&theme=0"
                width="100%"
                height="480"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Playlist"
              />
            </div>
          </div>

          {/* Instagram Embed */}
          <div className="embed-card">
            <div className="embed-header">
              <span className="embed-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </span>
              <h3>Instagram</h3>
            </div>
            <div className="embed-content instagram-embed">
              <iframe
                src="https://www.instagram.com/p/DO9Hk8CAYxJ/embed/"
                width="100%"
                height="480"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                loading="lazy"
                title="Instagram Post"
              />
            </div>
          </div>

          {/* Google Calendar Embed */}
          <div className="embed-card embed-card-full">
            <div className="embed-header">
              <span className="embed-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <h3>My Schedule</h3>
            </div>
            <div className="embed-content calendar-embed">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2xBvrZSNqTaMqCElAfXvxamIzivllwdOSAdK-dho0KOyZsJkTAkv0wzyGEkSjJljM7r4mTO6Gl?gv=true"
                width="100%"
                height="600"
                frameBorder="0"
                title="Google Calendar Appointment Scheduling"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmbedsSection
