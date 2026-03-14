import { useState } from 'react'

const socials = [
  { name: 'GitHub', url: 'https://github.com/thejaredchapman', icon: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/thejaredchapman', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { name: 'Instagram', url: 'https://instagram.com/thejaredchapman', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z' },
  { name: 'Spotify', url: 'https://open.spotify.com/user/thejaredchapman', icon: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z' },
  { name: 'Linktree', url: 'https://linktr.ee/thejaredchapman', icon: 'M13.736 5.853l4.005-4.117 2.325 2.38-4.2 4.005h5.908v3.305h-5.937l4.229 4.108-2.325 2.334-5.74-5.769-5.741 5.769-2.325-2.325 4.229-4.108H2.226V8.121h5.909l-4.2-4.004 2.324-2.381 4.005 4.117V0h3.472zm-3.472 10.306h3.472V24h-3.472z' },
]

function ContactApp() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const subject = encodeURIComponent(data.get('subject') || 'Hello from JaredOS')
    const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`)
    window.open(`mailto:thejaredchapman@gmail.com?subject=${subject}&body=${body}`, '_self')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Contact</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>Get in touch</p>

      <div className="grid grid-cols-2 gap-6 max-[768px]:grid-cols-1">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            name="name"
            placeholder="Name"
            required
            className="py-2 px-3 rounded-lg border text-sm bg-transparent outline-none transition-colors focus:border-[var(--accent-400)]"
            style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="py-2 px-3 rounded-lg border text-sm bg-transparent outline-none transition-colors focus:border-[var(--accent-400)]"
            style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
          />
          <input
            name="subject"
            placeholder="Subject"
            className="py-2 px-3 rounded-lg border text-sm bg-transparent outline-none transition-colors focus:border-[var(--accent-400)]"
            style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
          />
          <textarea
            name="message"
            placeholder="Message"
            required
            rows={4}
            className="py-2 px-3 rounded-lg border text-sm bg-transparent outline-none resize-none transition-colors focus:border-[var(--accent-400)]"
            style={{ borderColor: 'var(--border-light)', color: 'var(--text-primary)' }}
          />
          <button
            type="submit"
            className="py-2 px-4 rounded-lg text-sm font-medium border-0 cursor-pointer transition-opacity hover:opacity-80"
            style={{ background: 'var(--accent-500)', color: 'white' }}
          >
            {sent ? 'Opening mail client...' : 'Send Message'}
          </button>
        </form>

        {/* Social links */}
        <div>
          <h3 className="text-sm font-bold mb-3" style={{ color: 'var(--text-primary)' }}>Connect</h3>
          <div className="flex flex-col gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg no-underline transition-all hover:translate-x-1"
                style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" style={{ fill: 'var(--accent-500)' }}>
                  <path d={s.icon} />
                </svg>
                <span className="text-sm">{s.name}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 ml-auto opacity-30">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>

          {/* Calendar link */}
          <a
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ2xBvrZSNqTaMqCElAfXvxamIzivllwdOSAdK-dho0KOyZsJkTAkv0wzyGEkSjJljM7r4mTO6Gl?gv=true"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 mt-4 py-2.5 px-3 rounded-lg no-underline text-sm font-medium border transition-colors hover:border-[var(--accent-400)]"
            style={{ borderColor: 'var(--border-light)', color: 'var(--accent-500)' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <rect x="3" y="4" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Schedule a meeting
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactApp
