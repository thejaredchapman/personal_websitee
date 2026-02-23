import { useState, useEffect, useRef } from 'react'
import ThemeToggle from './ThemeToggle'
import ColorPicker from './ColorPicker'
import './Navbar.css'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [themeOpen, setThemeOpen] = useState(false)
  const ticking = useRef(false)
  const themeBtnRef = useRef(null)
  const themePanelRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50)
          ticking.current = false
        })
        ticking.current = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        themeOpen &&
        themePanelRef.current &&
        !themePanelRef.current.contains(e.target) &&
        themeBtnRef.current &&
        !themeBtnRef.current.contains(e.target)
      ) {
        setThemeOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [themeOpen])

  const navItems = [
    { href: '#about', label: 'About', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a7.5 7.5 0 0115 0" />
      </svg>
    )},
    { href: '#ai', label: 'AI Work', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <circle cx="15.5" cy="8.5" r="1.5" />
        <path d="M9 14c.5 1 1.5 2 3 2s2.5-1 3-2" />
      </svg>
    )},
    // { href: '#comedy', label: 'Comedy', icon: (
    //   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    //     <circle cx="12" cy="12" r="10" />
    //     <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    //     <line x1="9" y1="9" x2="9.01" y2="9" />
    //     <line x1="15" y1="9" x2="15.01" y2="9" />
    //   </svg>
    // )},
    { href: '#projects', label: 'Projects', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    )},
    { href: '#resume', label: 'Resume', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    )},
    { href: '#gallery', label: 'Gallery', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    )},
    { href: '#connect', label: 'Connect', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    )},
  ]

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="logo">
          <span className="logo-text">Jared Chapman</span>
        </a>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setMenuOpen(false)} className="nav-item">
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </a>
            </li>
          ))}
          <li className="nav-theme-li">
            <button
              ref={themeBtnRef}
              className={`nav-item nav-theme-btn ${themeOpen ? 'active' : ''}`}
              onClick={() => setThemeOpen(!themeOpen)}
              aria-label="Theme settings"
              title="Theme settings"
            >
              <span className="nav-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2.7c5.1 0 9.3 4.2 9.3 9.3 0 3-1.4 4.8-4.6 4.8h-1.8c-1.2 0-2.2 1-2.2 2.2 0 .5.2 1 .5 1.3.3.4.5.8.5 1.3 0 1.2-1 2.2-2.2 2.2C6.4 23.7 2.2 19.6 2.2 14.4c0-6.5 5.3-11.7 9.8-11.7z" />
                  <circle cx="8" cy="11" r="2" fill="var(--accent-400)" stroke="none" />
                  <circle cx="13" cy="7.5" r="2" fill="var(--accent-300)" stroke="none" />
                  <circle cx="17.5" cy="11" r="2" fill="var(--accent-500)" stroke="none" />
                </svg>
              </span>
              <span className="nav-label">Theme</span>
            </button>
            {themeOpen && (
              <div ref={themePanelRef} className="nav-theme-panel">
                <div className="nav-theme-panel-header">
                  <span className="nav-theme-panel-title">Theme</span>
                  <ThemeToggle />
                </div>
                <div className="nav-theme-panel-body">
                  <ColorPicker />
                </div>
              </div>
            )}
          </li>
          <li>
            <a href="#contact" className="btn btn-primary nav-cta" onClick={() => setMenuOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="cta-icon" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
