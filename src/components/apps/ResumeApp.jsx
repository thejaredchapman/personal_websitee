const experience = [
  {
    role: 'Developer Support Engineer (GenAI)',
    company: 'AbbVie',
    period: '2024 — Present',
    bullets: [
      'Supporting developers on LLM integration and A/B testing models',
      'Building enterprise AI solutions with Vertex AI',
      'Prompt engineering and model evaluation at scale',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Google',
    period: '2022 — 2024',
    bullets: [
      'Built BigQuery DataFrames APIs using Pandas, Ibis, PyArrow',
      'Contributed microsecond precision method to Ibis open source library',
      'Developed OOP architecture in Java for Search performance tools',
    ],
  },
  {
    role: 'Appraisal Team Lead',
    company: 'Guaranteed Rate',
    period: '2018 — 2021',
    bullets: [
      'Led appraisal operations and team management',
      'Streamlined processes and improved team efficiency',
    ],
  },
]

const education = [
  { school: 'Multiverse', degree: 'Software Engineering Apprenticeship', year: '2024' },
  { school: 'Google / Coursera', degree: 'IT Support Professional Certificate', year: '2022' },
  { school: 'Georgia State University', degree: 'Bachelor of Arts', year: '2014' },
]

const skills = [
  'Python', 'Java', 'JavaScript', 'TypeScript', 'HTML', 'CSS',
  'React', 'Angular', 'Next.js', 'Spring Boot', 'Django',
  'LLMs', 'Vertex AI', 'Prompt Engineering',
  'BigQuery', 'Pandas', 'PyArrow', 'Ibis', 'PostgreSQL',
  'GCP', 'Git', 'gRPC',
]

function ResumeApp() {
  return (
    <div className="p-6 max-[768px]:p-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Resume</h2>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Experience, education & skills</p>
        </div>
        <a
          href="/Jared_Chapman_Resume.docx"
          download
          className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium no-underline transition-all hover:opacity-80"
          style={{ background: 'var(--accent-500)', color: 'white' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Download
        </a>
      </div>

      {/* Experience */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Experience</h3>
      <div className="flex flex-col gap-4 mb-6">
        {experience.map((exp) => (
          <div key={exp.company} className="rounded-xl p-4 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <div className="flex items-start justify-between mb-1 max-[768px]:flex-col max-[768px]:gap-1">
              <div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{exp.role}</h4>
                <p className="text-xs font-medium" style={{ color: 'var(--accent-500)' }}>{exp.company}</p>
              </div>
              <span className="text-[11px] font-mono shrink-0" style={{ color: 'var(--text-tertiary)' }}>{exp.period}</span>
            </div>
            <ul className="mt-2 flex flex-col gap-1 list-none p-0 m-0">
              {exp.bullets.map((b, i) => (
                <li key={i} className="text-xs leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent-400)' }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Education</h3>
      <div className="flex flex-col gap-2 mb-6">
        {education.map((edu) => (
          <div key={edu.school} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{edu.school}</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{edu.degree}</p>
            </div>
            <span className="text-[11px] font-mono" style={{ color: 'var(--text-tertiary)' }}>{edu.year}</span>
          </div>
        ))}
      </div>

      {/* Skills */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Skills</h3>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((s) => (
          <span key={s} className="text-[11px] py-1 px-2.5 rounded-full font-medium" style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}>{s}</span>
        ))}
      </div>
    </div>
  )
}

export default ResumeApp
