import './ResumeSection.css'

function ResumeSection() {
  const experience = [
    {
      title: 'Developer Support Engineer',
      company: 'AbbVie | Los Angeles, California',
      period: 'August 2024 - Present',
      description: 'Supporting and educating developers on LLM integration, driving organizational adoption of generative AI products. Primary technical bridge between the EPIC team and internal developers.',
    },
    {
      title: 'Software Engineer',
      company: 'Google | Chicago, Illinois',
      period: 'September 2022 - May 2024',
      description: 'Worked on Google Searchmark (performance tools) and BigQuery DataFrames. Designed code architecture using OOP principles, developed Python and DataFrames APIs using Pandas, Ibis, and PyArrow.',
    },
    {
      title: 'Appraisal Desk Team Lead',
      company: 'Guaranteed Rate | Chicago, Illinois',
      period: 'May 2018 - September 2021',
      description: 'Created automated daily dashboards in Excel, managed appraisal orders and escalations for multiple companies, providing cross-functional support.',
    },
  ]

  const education = [
    {
      degree: 'Software Development Bootcamp',
      school: 'Multiverse',
      year: '2024',
      focus: 'Full Stack Development & Agile Frameworks',
    },
    {
      degree: 'Data Analytics Professional Certificate',
      school: 'Google / Coursera',
      year: '2022',
      focus: 'R, Tableau, Data Analytics',
    },
    {
      degree: 'Bachelor of Science',
      school: 'Georgia State University',
      year: '2014',
      focus: 'General Studies',
    },
  ]

  const skills = [
    'Python', 'Java', 'JavaScript', 'HTML', 'CSS',
    'LLMs', 'Vertex AI', 'Prompt Engineering', 'API Design',
    'GCP', 'BigQuery', 'PostgreSQL', 'gRPC',
    'React', 'Angular', 'Spring Boot', 'Django', 'Git',
    'Pandas', 'PyArrow', 'Ibis'
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
