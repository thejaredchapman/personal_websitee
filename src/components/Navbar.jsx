import { useState, useEffect, useRef } from 'react'
import ThemeToggle from './ThemeToggle'
import ColorPicker from './ColorPicker'

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
    { href: '#code-comedy', label: 'Code & Comedy', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )},
    { href: '#terminal', label: 'Terminal', icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    )},
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
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] px-8 transition-all duration-300 backdrop-blur-[10px] ${scrolled ? 'py-2 shadow-[0_2px_20px_var(--shadow-color)]' : 'py-3'} md:max-[768px]:px-4`} style={{ background: 'var(--glass-bg)' }}>
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-extrabold no-underline transition-all duration-300 hover:scale-105" style={{ color: 'var(--text-primary)' }}>
          <span className="bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-600)] bg-clip-text" style={{ WebkitTextFillColor: 'transparent' }}>JC</span>
          <span className="text-sm font-mono ml-1 opacity-50 max-[1100px]:hidden" style={{ WebkitTextFillColor: 'initial', color: 'var(--text-tertiary)' }}>//dev+comedy</span>
        </a>

        {/* Mobile hamburger */}
        <button
          className={`hidden max-[768px]:flex flex-col justify-between w-7 h-5 bg-transparent border-none cursor-pointer p-0 z-[1001]`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-full h-[3px] rounded-[3px] transition-all duration-300 ${menuOpen ? 'translate-y-[8.5px] rotate-45' : ''}`} style={{ background: 'var(--text-primary)' }}></span>
          <span className={`block w-full h-[3px] rounded-[3px] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ background: 'var(--text-primary)' }}></span>
          <span className={`block w-full h-[3px] rounded-[3px] transition-all duration-300 ${menuOpen ? '-translate-y-[8.5px] -rotate-45' : ''}`} style={{ background: 'var(--text-primary)' }}></span>
        </button>

        {/* Nav links */}
        <ul className={`flex items-center gap-1 list-none m-0 p-0 max-[768px]:fixed max-[768px]:top-0 max-[768px]:w-[280px] max-[768px]:max-w-[85%] max-[768px]:h-screen max-[768px]:flex-col max-[768px]:justify-start max-[768px]:items-stretch max-[768px]:gap-2 max-[768px]:pt-20 max-[768px]:px-6 max-[768px]:pb-8 max-[768px]:shadow-[-5px_0_30px_var(--shadow-color)] max-[768px]:transition-[right] max-[768px]:duration-300 max-[768px]:overflow-y-auto max-[480px]:w-full max-[480px]:max-w-full max-[480px]:pt-[4.5rem] max-[480px]:px-4 ${menuOpen ? 'max-[768px]:right-0' : 'max-[768px]:-right-full'}`} style={{ background: undefined }} >
          <style>{`.nav-links-bg { background: var(--bg-primary); }`}</style>
          <div className="hidden max-[768px]:block fixed inset-0 -z-1 nav-links-bg"></div>
          {navItems.map((item) => (
            <li key={item.href} className="flex items-center max-[768px]:w-full">
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-1.5 font-medium text-[0.9rem] py-2 px-3 rounded-lg relative transition-all duration-300 no-underline hover:bg-[var(--accent-lighter)] max-[1100px]:p-2.5 max-[768px]:w-full max-[768px]:py-3.5 max-[768px]:px-4 max-[768px]:text-base max-[768px]:rounded-xl max-[768px]:hover:bg-[var(--accent-light)]"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                <span className="flex items-center justify-center w-[18px] h-[18px] max-[1100px]:w-[22px] max-[1100px]:h-[22px] max-[768px]:w-[22px] max-[768px]:h-[22px]">{item.icon}</span>
                <span className="whitespace-nowrap max-[1100px]:hidden max-[768px]:block">{item.label}</span>
              </a>
            </li>
          ))}

          {/* Theme button */}
          <li className="relative max-[768px]:static max-[768px]:w-full flex items-center">
            <button
              ref={themeBtnRef}
              className={`flex items-center gap-1.5 font-medium text-[0.9rem] py-2 px-3 rounded-lg relative transition-all duration-300 bg-transparent border-none cursor-pointer font-[inherit] max-[1100px]:p-2.5 max-[768px]:w-full max-[768px]:py-3.5 max-[768px]:px-4 max-[768px]:text-base max-[768px]:rounded-xl`}
              style={{ color: themeOpen ? 'var(--accent-primary)' : 'var(--text-secondary)', background: themeOpen ? 'var(--accent-lighter)' : 'none' }}
              onClick={() => setThemeOpen(!themeOpen)}
              aria-label="Theme settings"
              title="Theme settings"
            >
              <span className="flex items-center justify-center w-[18px] h-[18px] max-[1100px]:w-[22px] max-[1100px]:h-[22px] max-[768px]:w-[22px] max-[768px]:h-[22px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 2.7c5.1 0 9.3 4.2 9.3 9.3 0 3-1.4 4.8-4.6 4.8h-1.8c-1.2 0-2.2 1-2.2 2.2 0 .5.2 1 .5 1.3.3.4.5.8.5 1.3 0 1.2-1 2.2-2.2 2.2C6.4 23.7 2.2 19.6 2.2 14.4c0-6.5 5.3-11.7 9.8-11.7z" />
                  <circle cx="8" cy="11" r="2" fill="var(--accent-400)" stroke="none" />
                  <circle cx="13" cy="7.5" r="2" fill="var(--accent-300)" stroke="none" />
                  <circle cx="17.5" cy="11" r="2" fill="var(--accent-500)" stroke="none" />
                </svg>
              </span>
              <span className="whitespace-nowrap max-[1100px]:hidden max-[768px]:block">Theme</span>
            </button>
            {themeOpen && (
              <div ref={themePanelRef} className="absolute top-[calc(100%+8px)] right-0 border rounded-2xl shadow-[0_12px_40px_var(--shadow-color)] min-w-[300px] max-h-[calc(100vh-120px)] overflow-y-auto z-[1002] animate-[nav-theme-in_0.25s_ease] max-[768px]:relative max-[768px]:top-auto max-[768px]:right-auto max-[768px]:mt-2 max-[768px]:min-w-0 max-[768px]:w-full max-[768px]:shadow-none [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--border-medium)] [&::-webkit-scrollbar-thumb]:rounded-sm" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-medium)' }}>
                <div className="flex items-center justify-between py-4 px-5 border-b" style={{ borderColor: 'var(--border-light)' }}>
                  <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>Theme</span>
                  <ThemeToggle />
                </div>
                <div className="py-4 px-5">
                  <ColorPicker />
                </div>
              </div>
            )}
          </li>

          {/* CTA */}
          <li className="max-[768px]:w-full">
            <a href="#contact" className="btn btn-primary flex! items-center gap-2 py-2! px-4! text-[0.9rem]! ml-2 max-[1100px]:py-2! max-[1100px]:px-3! max-[768px]:w-full max-[768px]:justify-center max-[768px]:ml-0 max-[768px]:mt-2 max-[768px]:py-3.5! max-[768px]:px-4!" onClick={() => setMenuOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 max-[1100px]:w-[18px] max-[1100px]:h-[18px]" aria-hidden="true">
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
