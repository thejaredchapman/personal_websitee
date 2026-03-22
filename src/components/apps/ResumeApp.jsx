const experience = [
  {
    role: 'Developer Support Engineer',
    team: 'ILIAD & Go/AI Team | Supporting & Educating Users and Developers of various LLMs',
    company: 'AbbVie — Los Angeles, CA',
    period: 'Aug 2024 — Now',
    bullets: [
      'Created learning materials and educational content that explains AI concepts in accessible, layman\'s terms, empowering new users to adopt Enterprise AI products.',
      'Onboarded new users onto generative AI platforms, providing hands-on guidance and setting up Claude Code environments to accelerate productivity.',
      'Developed prompt engineering strategies and templates enabling users to transform and reshape their data with ease using LLM-powered tools.',
      'Provided critical support to developers by explaining features, debugging applications interfacing with LLMs, and resolving support tickets related to unexpected REST API behavior.',
    ],
  },
  {
    role: 'Software Engineer',
    team: 'Google Searchmark | Search performance tools for capacity & latency',
    company: 'Google — Chicago, IL',
    period: 'Aug 2023 — May 2024',
    bullets: [
      'Refactored Searchmark API using agile changes with Java protocol buffers (gRPC) Microservices to improve user results communication.',
      'Designed the code architecture, integrating OOP principles in Java to ensure easy testing and maintainability for critical performance tools.',
      'Supported Google infrastructure performance testing tool by lowering CPU usage for distributed systems.',
      'Deployed code over Google\'s internal and automated testing framework to enhance CPU usage.',
    ],
  },
  {
    role: 'Software Engineer',
    team: 'Google BigQuery | BigQuery DataFrames',
    company: 'Google — Chicago, IL',
    period: 'Sep 2022 — Aug 2023',
    bullets: [
      'Wrote, expanded, refactored and tested BigQuery Python API as well as BQ Dataframes API, writing accommodating documentation.',
      'Planned and authored a design document that outlined engineering solutions and architecture for a new feature for BQ Dataframes.',
      'Executed plans by writing and testing datetime method APIs using Pandas, Ibis, and PyArrow Python libraries for public release.',
      'Contributed to Ibis open source to ensure cross-functionality between Ibis and Pandas libraries, a key tool for data handling.',
    ],
  },
  {
    role: 'Appraisal Desk Team Lead',
    company: 'Guaranteed Rate — Chicago, IL',
    period: 'May 2018 — Sep 2021',
    bullets: [
      'Created daily dashboards for the department using Microsoft Excel by compiling and cleaning data from various sources.',
      'Monitored and processed appraisal orders, issues and escalations for various mortgage executives, underwriting teams, appraisers, and other clients.',
      'Provided cross-functional service support while managing an appraisal desk solely for three simultaneous companies.',
      'Led appraisal desk operations, coordinating workflows and resolving escalations to ensure timely completion of mortgage processes.',
    ],
  },
]

const education = [
  { school: 'LinkedIn Learning', degree: 'Fundamentals to Become a Machine Learning Engineer', year: '2026' },
  { school: 'Multiverse', degree: 'Multiverse Bootcamp', year: '2024' },
  { school: 'Coursera', degree: 'Google Data Analytics Professional Certificate', year: '2022' },
  { school: 'Georgia State University', degree: 'Bachelors of Science', year: '2014' },
]

const skills = [
  'Python', 'Java', 'JavaScript', 'HTML', 'CSS',
  'API Design', 'React', 'Angular', 'Spring Boot', 'Django',
  'Testing', 'Documentation', 'Github',
  'PostgreSQL', 'GCP', 'Git / Version Control', 'Protocol Buffers', 'SDLC',
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
          href="/jared_chapman_resume.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium no-underline transition-all hover:opacity-80"
          style={{ background: 'var(--accent-500)', color: 'white' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          View Full Resume
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
                {exp.team && <p className="text-[11px] italic mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{exp.team}</p>}
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
