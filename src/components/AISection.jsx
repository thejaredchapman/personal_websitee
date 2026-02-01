import './AISection.css'

function AISection() {
  const projects = [
    {
      title: 'Neural Network Optimizer',
      description: 'Built a custom optimizer that improved training convergence by 40% on large language models.',
      tags: ['PyTorch', 'CUDA', 'Transformers'],
      icon: '🧠'
    },
    {
      title: 'Computer Vision Pipeline',
      description: 'Developed real-time object detection system processing 60fps with 95% accuracy.',
      tags: ['TensorFlow', 'OpenCV', 'Edge AI'],
      icon: '👁️'
    },
    {
      title: 'NLP Chatbot Framework',
      description: 'Created an enterprise chatbot framework serving 1M+ daily conversations.',
      tags: ['LLMs', 'RAG', 'FastAPI'],
      icon: '💬'
    },
    {
      title: 'ML Infrastructure',
      description: 'Architected scalable ML infrastructure reducing deployment time from days to hours.',
      tags: ['Kubernetes', 'MLOps', 'AWS'],
      icon: '⚡'
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
            <span className="stat-number">50+</span>
            <span className="stat-label">ML Models Deployed</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10M+</span>
            <span className="stat-label">Predictions Daily</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AISection
