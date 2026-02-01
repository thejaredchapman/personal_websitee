import './Hero.css'

function Hero({ onPlayGame }) {
  return (
    <section id="about" className="hero">
      <div className="hero-content container">
        <div className="hero-text">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">Your Name</h1>
          <h2 className="hero-tagline">
            <span className="highlight">AI Engineer</span> by Day,{' '}
            <span className="highlight">Comedian</span> by Night
          </h2>
          <p className="hero-description">
            I build intelligent systems that make life easier and tell jokes that make
            life funnier. Combining the precision of algorithms with the chaos of
            stand-up comedy.
          </p>
          <div className="hero-buttons">
            <a href="#ai" className="btn btn-primary">Explore My AI Work</a>
            <a href="#comedy" className="btn btn-secondary">Watch My Comedy</a>
            <button onClick={onPlayGame} className="btn btn-game">
              Play Asteroids
            </button>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-wrapper">
            <div className="image-placeholder">
              <span>Your Photo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  )
}

export default Hero
