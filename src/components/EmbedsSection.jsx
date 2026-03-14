import { useScrollAnimation } from '../hooks/useScrollAnimation'

function EmbedsSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 })

  return (
    <section ref={sectionRef} id="connect" className="py-20 px-8 relative z-1 max-[768px]:py-12 max-[768px]:px-4 scroll-mt-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Stay Connected</h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Check out what I'm listening to, follow my latest posts, and see when I'm available
        </p>

        <div className="grid grid-cols-2 gap-8 max-[968px]:grid-cols-1">
          {/* Spotify Embed */}
          <div className={`rounded-2xl overflow-hidden shadow-[var(--card-shadow)] border transition-all duration-700 delay-100 hover:-translate-y-1 hover:shadow-[0_12px_24px_var(--shadow-color)] hover:border-[var(--accent-300)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="flex items-center gap-3 py-5 px-6" style={{ background: 'linear-gradient(135deg, var(--accent-500), var(--accent-600))', color: 'var(--white)' }}>
              <span className="inline-flex w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </span>
              <h3 className="m-0 text-xl font-semibold">Now Playing</h3>
            </div>
            <div className="p-6">
              <iframe
                src="https://open.spotify.com/embed/playlist/37i9dQZF1EplC472HQfCzs?utm_source=generator&theme=0"
                width="100%"
                height="480"
                frameBorder="0"
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Spotify Playlist"
                className="rounded-xl"
              />
            </div>
          </div>

          {/* Instagram Embed */}
          <div className={`rounded-2xl overflow-hidden shadow-[var(--card-shadow)] border transition-all duration-700 delay-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_var(--shadow-color)] hover:border-[var(--accent-300)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="flex items-center gap-3 py-5 px-6" style={{ background: 'linear-gradient(135deg, var(--accent-500), var(--accent-600))', color: 'var(--white)' }}>
              <span className="inline-flex w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </span>
              <h3 className="m-0 text-xl font-semibold">Instagram</h3>
            </div>
            <div className="p-6">
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
          <div className={`rounded-2xl overflow-hidden shadow-[var(--card-shadow)] border transition-all duration-700 delay-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_var(--shadow-color)] hover:border-[var(--accent-300)] col-span-full max-[968px]:col-auto ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
            <div className="flex items-center gap-3 py-5 px-6" style={{ background: 'linear-gradient(135deg, var(--accent-500), var(--accent-600))', color: 'var(--white)' }}>
              <span className="inline-flex w-6 h-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <h3 className="m-0 text-xl font-semibold">My Schedule</h3>
            </div>
            <div className="p-6 calendar-embed max-[480px]:p-4">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2xBvrZSNqTaMqCElAfXvxamIzivllwdOSAdK-dho0KOyZsJkTAkv0wzyGEkSjJljM7r4mTO6Gl?gv=true"
                width="100%"
                height="600"
                frameBorder="0"
                title="Google Calendar Appointment Scheduling"
                className="rounded-xl"
                style={{ background: 'var(--bg-primary)' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmbedsSection
