import './Footer.css'

function Footer() {
  const socialLinks = [
    { name: 'GitHub', icon: '👨‍💻', url: 'https://github.com/thejaredchapman' },
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/thejaredchapman' },
    { name: 'Instagram', icon: '📸', url: 'https://instagram.com/thejaredchapman' },
    { name: 'Spotify', icon: '🎵', url: 'https://open.spotify.com/user/thejaredchapman' },
    { name: 'Linktree', icon: '🌳', url: 'https://linktr.ee/thejaredchapman' },
  ]

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-main">
            <h2 className="footer-title">Let's Connect</h2>
            <p className="footer-description">
              Whether you want to discuss AI, book me for a show, or just say hi —
              I'd love to hear from you.
            </p>
            <a href="mailto:thejaredchapman@gmail.com" className="footer-email">
              Contact Jared
            </a>
          </div>

          <div className="footer-social">
            <h3>Find Me Online</h3>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="social-link"
                  aria-label={link.name}
                >
                  <span className="social-icon">{link.icon}</span>
                  <span className="social-name">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Jared Chapman. All rights reserved.</p>
          <p className="footer-tagline">
            Built with <span className="heart">❤️</span> and a healthy dose of caffeine
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
