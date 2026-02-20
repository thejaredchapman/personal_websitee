import './AISection.css'

function AISection() {
  const projects = [
    {
      title: 'LLM Developer Support Platform',
      description: 'Supporting and educating developers on LLM integration, conducting A/B testing between models to optimize results for internal and external customers.',
      tags: ['LLMs', 'Vertex AI', 'REST APIs'],
      icon: '🤖'
    },
    {
      title: 'BigQuery DataFrames',
      description: 'Developed and tested BigQuery Python and DataFrames APIs using Pandas, Ibis, and PyArrow for scalable data processing.',
      tags: ['Python', 'Pandas', 'BigQuery'],
      icon: '📊'
    },
    {
      title: 'Ibis Open Source Contribution',
      description: 'Contributed to the Ibis library enabling users to write SQL with Python. Added microsecond precision method and tests.',
      tags: ['Open Source', 'Python', 'SQL'],
      icon: '🔧'
    },
    {
      title: 'Searchmark Performance Tools',
      description: 'Designed code architecture using OOP principles in Java for critical Google Search performance tools. Refactored APIs using protocol buffers (gRPC).',
      tags: ['Java', 'gRPC', 'Performance'],
      icon: '🔍'
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
