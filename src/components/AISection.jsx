import './AISection.css'

function AISection() {
  const projects = [
    {
      title: 'LLM Developer Support Platform',
      description: 'Supporting and educating developers on LLM integration, conducting A/B testing between models to optimize results for internal and external customers.',
      tags: ['LLMs', 'Vertex AI', 'REST APIs'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <circle cx="15.5" cy="8.5" r="1.5" />
          <path d="M9 14c.5 1 1.5 2 3 2s2.5-1 3-2" />
        </svg>
      )
    },
    {
      title: 'BigQuery DataFrames',
      description: 'Developed and tested BigQuery Python and DataFrames APIs using Pandas, Ibis, and PyArrow for scalable data processing.',
      tags: ['Python', 'Pandas', 'BigQuery'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Ibis Open Source Contribution',
      description: 'Contributed to the Ibis library enabling users to write SQL with Python. Added microsecond precision method and tests.',
      tags: ['Open Source', 'Python', 'SQL'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Searchmark Performance Tools',
      description: 'Designed code architecture using OOP principles in Java for critical Google Search performance tools. Refactored APIs using protocol buffers (gRPC).',
      tags: ['Java', 'gRPC', 'Performance'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
      )
    }
  ]

  return (
    <section id="ai" className="ai-section">
      <div className="container">
        <h2 className="section-title">AI & Machine Learning</h2>
        <p className="section-subtitle">
          Pushing the boundaries of what's possible with artificial intelligence
        </p>

        <div className="ai-grid grid grid-2">
          {projects.map((project, index) => (
            <div key={index} className="ai-card card">
              <div className="ai-card-icon">{project.icon}</div>
              <h3 className="ai-card-title">{project.title}</h3>
              <p className="ai-card-description">{project.description}</p>
              <div className="ai-card-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="ai-stats">
          <div className="stat-item">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years in Tech</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">Google</span>
            <span className="stat-label">Former Employer</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">LLMs</span>
            <span className="stat-label">Current Focus</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AISection
