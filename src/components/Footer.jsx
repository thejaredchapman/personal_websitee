import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function Footer() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 })

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/thejaredchapman', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
    )},
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/thejaredchapman', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    )},
    { name: 'Instagram', url: 'https://instagram.com/thejaredchapman', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    )},
    { name: 'Spotify', url: 'https://open.spotify.com/user/thejaredchapman', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
    )},
    { name: 'Linktree', url: 'https://linktr.ee/thejaredchapman', icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7.953 15.066l-.038-4.259-4.166-.04.07-2.902 4.166.04L3.936 3.86l2.248-1.834L9.298 6.18l3.235-4.155 2.248 1.834-4.049 4.046 4.166-.04.07 2.902-4.166.04-.038 4.26zm3.071 1.87h-1.06v5.023h1.06z"/></svg>
    )},
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message from ${formData.name}`)
    const body = encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)
    window.location.href = `mailto:thejaredchapman@gmail.com?subject=${subject}&body=${body}`
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <footer ref={sectionRef} id="contact" className="pt-20 px-8 pb-8 relative z-1 scroll-mt-20" style={{ background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--black) 100%)', color: 'var(--white)' }}>
      <div className="container">
        <div className="grid grid-cols-[2fr_1fr] gap-16 mb-16 max-[768px]:grid-cols-1 max-[768px]:gap-12">
          <div className={`max-w-[500px] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h2 className="text-[2.5rem] mb-4 bg-gradient-to-br from-[var(--accent-400)] to-[var(--accent-500)] bg-clip-text max-[768px]:text-[2rem]" style={{ WebkitTextFillColor: 'transparent' }}>Let's Connect</h2>
            <p className="text-lg leading-7 mb-6" style={{ color: 'var(--gray-200)' }}>
              Whether you want to discuss AI, book me for a show, or just say hi —
              I'd love to hear from you.
            </p>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-3 max-[768px]:grid-cols-1">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="py-3 px-4 bg-white/[0.08] border border-white/15 rounded-[10px] text-[0.95rem] font-[inherit] transition-all duration-300 focus:outline-none focus:border-[var(--accent-400)] focus:bg-white/[0.12] placeholder:text-[var(--gray-400)]"
                  style={{ color: 'var(--white)' }}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="py-3 px-4 bg-white/[0.08] border border-white/15 rounded-[10px] text-[0.95rem] font-[inherit] transition-all duration-300 focus:outline-none focus:border-[var(--accent-400)] focus:bg-white/[0.12] placeholder:text-[var(--gray-400)]"
                  style={{ color: 'var(--white)' }}
                />
              </div>
              <textarea
                placeholder="Your Message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="py-3 px-4 bg-white/[0.08] border border-white/15 rounded-[10px] text-[0.95rem] font-[inherit] transition-all duration-300 focus:outline-none focus:border-[var(--accent-400)] focus:bg-white/[0.12] resize-y min-h-[100px] placeholder:text-[var(--gray-400)]"
                style={{ color: 'var(--white)' }}
              />
              <button type="submit" className="btn btn-primary self-start mt-1 max-[768px]:self-stretch">
                {submitted ? 'Opening Mail Client...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <h3 className="text-xl mb-6" style={{ color: 'var(--white)' }}>Find Me Online</h3>
            <div className="flex flex-col gap-3 max-[768px]:flex-row max-[768px]:flex-wrap">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="flex items-center gap-3 py-3 px-4 bg-white/5 rounded-xl transition-all duration-300 no-underline hover:bg-[var(--accent-500)] hover:translate-x-2.5 max-[768px]:flex-1 max-[768px]:min-w-[140px] max-[768px]:justify-center max-[768px]:hover:translate-x-0 max-[768px]:hover:-translate-y-[5px]"
                  style={{ color: 'var(--gray-200)' }}
                  aria-label={link.name}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--white)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--gray-200)'}
                >
                  <span className="inline-flex w-6 h-6 transition-transform duration-300 group-hover:scale-120">{link.icon}</span>
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white/10">
          <p className="mb-2" style={{ color: 'var(--gray-200)' }}>&copy; {new Date().getFullYear()} Jared Chapman. All rights reserved.</p>
          <p className="text-sm" style={{ color: 'var(--gray-700)' }}>
            Built with <span className="inline-block animate-[heartbeat_1.5s_infinite]">❤️</span> and a healthy dose of caffeine
          </p>
          <p className="text-xs mt-2 opacity-30 font-mono" style={{ color: 'var(--gray-500)' }}>
            Try the Konami Code...
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
