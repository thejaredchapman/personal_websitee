import './ComedySection.css'

function ComedySection() {
  const shows = [
    {
      title: 'Tech Talk Comedy Night',
      venue: 'The Laugh Factory',
      date: 'Every Friday',
      description: 'Where debugging meets stand-up. Come watch me explain why AI will never understand humor.',
    },
    {
      title: 'Nerd Night Live',
      venue: 'Comedy Store',
      date: 'Monthly',
      description: 'A night of jokes about algorithms, coffee addiction, and why semicolons matter.',
    },
    {
      title: 'Corporate Comedy',
      venue: 'Tech Companies',
      date: 'Available for Booking',
      description: 'Custom comedy sets for tech events, conferences, and team building.',
    }
  ]

  const testimonials = [
    {
      quote: "Finally, a comedian who understands why my code doesn't work!",
      author: "Anonymous Developer"
    },
    {
      quote: "Made our entire engineering team laugh. That's harder than deploying on Friday.",
      author: "Tech Conference Organizer"
    }
  ]

  return (
    <section id="comedy" className="comedy-section">
      <div className="container">
        <h2 className="section-title">Comedy</h2>
        <p className="section-subtitle">
          Making humans laugh while working to ensure AI never can
        </p>

        <div className="comedy-content">
          <div className="shows-grid">
            {shows.map((show, index) => (
              <div key={index} className="show-card card">
                <div className="show-badge">{show.date}</div>
                <h3 className="show-title">{show.title}</h3>
                <p className="show-venue">📍 {show.venue}</p>
                <p className="show-description">{show.description}</p>
                <button className="btn btn-secondary show-btn">Learn More</button>
              </div>
            ))}
          </div>

          <div className="comedy-features">
            <div className="feature-card">
              <div className="feature-icon">🎤</div>
              <h4>Stand-Up</h4>
              <p>Regular performances at clubs across the city</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏢</div>
              <h4>Corporate Events</h4>
              <p>Custom sets for tech companies and conferences</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎬</div>
              <h4>Video Content</h4>
              <p>Sketches and clips on social media</p>
            </div>
          </div>

          <div className="testimonials">
            <h3 className="testimonials-title">What People Say</h3>
            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-card">
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                  <p className="testimonial-author">— {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComedySection
