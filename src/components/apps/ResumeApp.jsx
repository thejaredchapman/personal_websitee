const experience = [
  {
    role: 'Developer Support Engineer',
    team: 'ILIAD & Go/AI Team | Supporting & Educating Users and Developers of various LLMs',
    company: 'AbbVie — Los Angeles, CA',
    period: 'Aug 2024 — Now',
    bullets: [
      'Led org-wide AI enablement for AbbVie employees across functions — advising on prompting strategies, model selection for data ingestion, and how to transform data structures based on tool and use case requirements.',
      'Built and led monthly technical sessions for ~300 engineers on Go/AI, AbbVie\'s enterprise AI platform — covering RAG architecture, tokenization, and REST API integration. Paired group sessions with 1:1 support to ensure engineers understood not just how to use the system but why it works.',
      'Served as primary technical liaison between engineering and cross-functional partner teams, owning escalation and resolution workflows for LLM REST API integration failures — diagnosing unexpected behavior, reproducing failures in isolation, and coordinating fixes with engineering.',
      'Authored canonical API documentation, troubleshooting guides, and setup resources adopted org-wide; reduced new-engineer onboarding friction through structured Claude Code environment configuration and step-by-step integration walkthroughs.',
      'Consulted engineering teams on LLM model selection, architectural fit, and Responsible AI standards, translating business requirements into technical configurations and ensuring alignment with enterprise security and compliance constraints.',
      'Designed and deployed LLM-powered developer tooling using Claude and other large language models, enabling engineers to query enterprise data via natural language and accelerating internal AI capability development.',
    ],
  },
  {
    role: 'Software Engineer',
    team: 'Google Searchmark | Search performance tools for capacity & latency',
    company: 'Google — Chicago, IL',
    period: 'Aug 2023 — May 2024',
    bullets: [
      'Refactored the Searchmark API using Java gRPC and Protocol Buffers, improving client onboarding efficiency and reducing integration friction for new consumers.',
      'Designed testable, maintainable code architecture for a critical internal performance measurement tool used across Google engineering teams.',
      'Reduced CPU usage for distributed query execution across Google\'s internal performance testing infrastructure via automated deployment.',
      'Maintained high test coverage through interface-driven unit tests, keeping the Searchmark codebase reliable for downstream partner teams.',
    ],
  },
  {
    role: 'Software Engineer',
    team: 'Google BigQuery | BigQuery DataFrames',
    company: 'Google — Chicago, IL',
    period: 'Sep 2022 — Aug 2023',
    bullets: [
      'Extended the BigQuery Python API for public release, writing and testing datetime method APIs using Pandas, Ibis, and PyArrow — directly enabling external developer adoption at scale.',
      'Authored a full design document outlining engineering architecture and implementation plan for a new BigQuery DataFrames feature (PRD-equivalent).',
      'Contributed to the Ibis open-source library for cross-compatibility with Pandas, supporting the broader ecosystem of developers building on BigQuery.',
      'Built automated test suites and debugged edge cases to meet quality standards ahead of public API releases for external partners.',
    ],
  },
  {
    role: 'Appraisal Desk Team Lead',
    company: 'Guaranteed Rate — Chicago, IL',
    period: 'May 2018 — Sep 2021',
    bullets: [
      'Managed appraisal order workflows, issue escalations, and cross-functional service support across three client companies simultaneously.',
      'Built daily operational dashboards by compiling and cleaning multi-system data, streamlining department reporting.',
    ],
  },
]

const education = [
  { school: 'Multiverse', degree: 'Software Engineering Bootcamp', year: '2024' },
  { school: 'Georgia State University', degree: 'Bachelor of Science', year: '2014' },
]

const certifications = [
  { org: 'Anthropic', name: 'Claude Code 101', year: '2026' },
  { org: 'Anthropic', name: 'Introduction to Model Context Protocol', year: '2026' },
  { org: 'Anthropic', name: 'Claude Code in Action', year: '2026' },
  { org: 'Anthropic', name: 'AI Fluency: Framework & Foundations', year: '2026' },
  { org: 'LinkedIn Learning', name: 'Fundamentals to Become a Machine Learning Engineer', year: '2026' },
  { org: 'Coursera', name: 'Google Data Analytics Professional Certificate', year: '2022' },
]

const skills = [
  'Python', 'Java', 'JavaScript', 'HTML', 'CSS',
  'Technical Troubleshooting', 'Community Programs', 'Scaled Enablement', 'Program Management',
  'gRPC', 'Protocol Buffers', 'REST API Design', 'GCP',
  'BigQuery', 'PostgreSQL',
  'LLM Integration', 'Prompt Engineering', 'Claude Code', 'RAG',
  'Agentic Workflows', 'MCP Servers', 'Subagents', 'Agent Orchestration',
  'Workshop Design', 'Technical Enablement',
  'Git', 'Agile', 'Automated Testing', 'Technical Documentation',
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

      {/* Certifications */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Certifications</h3>
      <div className="flex flex-col gap-2 mb-6">
        {certifications.map((cert) => (
          <div key={cert.name} className="flex items-center justify-between py-2 px-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{cert.name}</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{cert.org}</p>
            </div>
            <span className="text-[11px] font-mono" style={{ color: 'var(--text-tertiary)' }}>{cert.year}</span>
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
