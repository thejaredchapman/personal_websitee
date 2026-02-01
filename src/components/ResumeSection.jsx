import './ResumeSection.css'

function ResumeSection() {
  const experience = [
    {
      title: 'Senior AI Engineer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading ML infrastructure and deploying production models at scale.',
    },
    {
      title: 'Machine Learning Engineer',
      company: 'AI Startup',
      period: '2020 - 2022',
      description: 'Built NLP systems and computer vision pipelines for enterprise clients.',
    },
    {
      title: 'Data Scientist',
      company: 'Analytics Firm',
      period: '2018 - 2020',
      description: 'Developed predictive models and data-driven insights for Fortune 500 companies.',
    },
  ]

  const education = [
    {
      degree: 'M.S. Computer Science',
      school: 'University Name',
      year: '2018',
      focus: 'Machine Learning & AI',
    },
    {
      degree: 'B.S. Computer Science',
      school: 'University Name',
      year: '2016',
      focus: 'Software Engineering',
    },
  ]

  const skills = [
    'Python', 'PyTorch', 'TensorFlow', 'Transformers', 'LLMs',
    'Computer Vision', 'NLP', 'MLOps', 'AWS', 'Kubernetes',
    'FastAPI', 'React', 'SQL', 'Docker', 'Git'
  ]

  return (
    <section id="resume" className="resume-section">
      <div className="container">
        <h2 className="section-title">Resume</h2>

        <div className="resume-content">
          <div className="resume-main">
            {/* Experience */}
            <div className="resume-block">
              <h3 className="resume-block-title">
                <span className="block-icon">💼</span>
                Experience
              </h3>
              <div className="timeline">
                {experience.map((job, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content card">
                      <span className="timeline-period">{job.period}</span>
                      <h4 className="timeline-title">{job.title}</h4>
                      <p className="timeline-company">{job.company}</p>
                      <p className="timeline-description">{job.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="resume-block">
              <h3 className="resume-block-title">
                <span className="block-icon">🎓</span>
                Education
              </h3>
              <div className="education-grid">
                {education.map((edu, index) => (
                  <div key={index} className="education-card card">
                    <span className="edu-year">{edu.year}</span>
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <p className="edu-school">{edu.school}</p>
                    <p className="edu-focus">{edu.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="resume-sidebar">
            {/* Skills */}
            <div className="resume-block skills-block">
              <h3 className="resume-block-title">
                <span className="block-icon">⚡</span>
                Skills
              </h3>
              <div className="skills-list">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            {/* Download Resume */}
            <div className="resume-download card">
              <div className="download-icon">📄</div>
              <h4>Download Full Resume</h4>
              <p>Get the complete PDF version with all details</p>
              <button className="btn btn-primary">Download PDF</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection
