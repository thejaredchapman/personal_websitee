import './Footer.css'

function Footer() {
  const socialLinks = [
    { name: 'GitHub', icon: '👨‍💻', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Instagram', icon: '📸', url: '#' },
    { name: 'Spotify', icon: '🎵', url: '#' },
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
            <a href="mailto:your.email@example.com" className="footer-email">
              your.email@example.com
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
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <p className="footer-tagline">
            Built with <span className="heart">❤️</span> and a healthy dose of caffeine
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
