import './ResumeSection.css'

function ResumeSection() {
  const experience = [
    {
      title: 'Developer Support Engineer - Generative AI Applications',
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
                <span className="block-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                  </svg>
                </span>
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
                <span className="block-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                  </svg>
                </span>
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
                <span className="block-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
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
              <div className="download-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
              </div>
              <h4>Download Full Resume</h4>
              <p>Get the complete PDF version with all details</p>
              <a href="/Jared_Chapman_Resume.docx" download className="btn btn-primary">Download Resume</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection
