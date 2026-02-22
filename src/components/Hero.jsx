import './Hero.css'

function Hero({ onPlayGame }) {
  return (
    <section id="about" className="hero">
      <div className="hero-content container">
        <div className="hero-text">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">Jared Chapman</h1>
          <h2 className="hero-tagline">
            <span className="highlight">Software Engineer</span> by Day,{' '}
            <span className="highlight">Comedian</span> by Night
          </h2>
          <p className="hero-description">
            Building intelligent systems with LLMs and GenAI at scale. From Google BigQuery
            to enterprise AI solutions, I bridge the gap between complex technology
            and real-world impact.
          </p>
          <div className="hero-buttons">
            <a href="#ai" className="btn btn-primary">Explore My AI Work</a>
            {/* <a href="#comedy" className="btn btn-secondary">Watch My Comedy</a> */}
          </div>
        </div>

        <div className="hero-image">
          <div className="image-wrapper" onClick={onPlayGame} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onPlayGame()} title="Click me...">
            <img src="/selfie.jpg" alt="Jared Chapman" className="profile-photo" />
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
