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
              <span className="embed-icon">📸</span>
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
              <span className="embed-icon">📅</span>
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
