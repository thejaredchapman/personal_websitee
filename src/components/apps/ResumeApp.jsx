const experience = [
  {
    role: 'Developer Support, Generative AI Applications',
    company: 'AbbVie — Los Angeles, CA',
    period: 'Aug 2024 — Present',
    bullets: [
      'Built ILIAD LiteLLM Model Explorer (full-stack, solo ownership) -- React 18 + Tailwind CSS + Vite frontend; FastAPI async proxy backend with server-side API key injection serving 160+ LLMs (OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek); features include API Playground with real-time token usage tracking, A/B multi-model comparison, LLM-as-judge grading across 5 dimensions, and rate limiting; 111 tests across 10 suites covering components, interactions, and edge cases.',
      'Developed Enterprise RAG pipeline enabling employees to query 8 internal developer repositories using natural language -- 2,800+ document chunks with overlapping chunking strategy, L2-normalized embeddings, cosine-similarity cache (0.95 threshold) for instant repeat-query responses; automatic enforcement of AbbVie data classification policy, GxP regulations, and SLC security policies; Discourse bot auto-replying to unanswered compliance threads with source-cited AI answers. Stack: Python, Flask, FAISS, GPT-4o, LiteLLM, SSE, Discourse API.',
      'Served as primary technical resource for LLM integration and prompt engineering issues across the organization -- diagnosed API failures, debugged prompt outputs, reproduced bugs, coordinated fixes with engineering teams, and translated technical constraints into actionable guidance for developers and non-technical stakeholders.',
      'Drove Claude Code adoption enterprise-wide through hands-on guidance, setup documentation, and practical usage examples; authored installation, troubleshooting, and usage guides distributed across the developer community; Claude Code became a preferred developer tool across AbbVie engineering.',
      'Facilitated monthly technical sessions for ~300 engineers embedded across 7 internal developer communities (including AI Quest and the Data Science Committee); curated AI literacy content, synthesized findings, and delivered actionable takeaways for technical and non-technical audiences.',
      'Authored org-wide technical documentation -- API integration guides, prompt engineering references, LLM troubleshooting playbooks, setup walkthroughs, and the "Should I?" decision framework adopted company-wide to guide appropriate AI use per corporate policy.',
      'Collaborated with legal, security, and privacy teams to define data governance boundaries for LLM tool usage in a regulated pharmaceutical environment; consulted on Responsible AI standards, security configurations, and compliance requirements for enterprise AI deployments.',
    ],
  },
  {
    role: 'Software Engineer — Searchmark',
    company: 'Google — Chicago, IL',
    period: 'Aug 2023 — May 2024',
    bullets: [
      'Refactored Searchmark\'s internal API using Java gRPC and Protocol Buffers, reducing integration friction for new engineering teams onboarding to the service.',
      'Reduced CPU usage for distributed query execution across Google\'s internal performance testing infrastructure through automated deployment.',
    ],
  },
  {
    role: 'Software Engineer — BigQuery DataFrames',
    company: 'Google — Chicago, IL',
    period: 'Sep 2022 — Aug 2023',
    bullets: [
      'Extended the BigQuery Python API for public release -- implemented and tested datetime method APIs using Pandas, Ibis, and PyArrow, directly enabling external developer adoption at scale.',
      'Contributed microsecond datetime support to the Ibis open-source library -- implemented cross-compatibility with Pandas for SQL-via-Python operations; used in production by data engineers globally.',
      'Authored the engineering architecture and implementation design document for a new BigQuery DataFrames feature end-to-end.',
    ],
  },
  {
    role: 'Team Lead, Appraisal Operations',
    company: 'Guaranteed Rate — Chicago, IL',
    period: 'May 2018 — Sep 2021',
    bullets: [
      'Managed appraisal workflows, escalations, and cross-functional service delivery across three simultaneous client accounts; built operational dashboards from multi-system data to streamline reporting.',
    ],
  },
]

const projects = [
  {
    name: 'ILIAD LiteLLM Model Explorer',
    status: 'Production',
    description: 'Full-stack LLM API gateway built solo from scratch: FastAPI async backend serving 160+ models across 6 providers, A/B multi-model comparison, LLM-as-judge grading across 5 dimensions, real-time token tracking, and rate limiting. 111 automated tests across 10 suites. Enterprise-deployed at AbbVie.',
    tags: ['Python', 'FastAPI', 'React 18', 'Tailwind CSS', 'Vite', 'LiteLLM', 'FAISS', 'Claude Code'],
  },
  {
    name: 'Enterprise RAG Pipeline',
    status: 'Production',
    description: 'Natural language access layer over 8 enterprise data repositories -- 2,800+ document chunks, L2-normalized vector embeddings, cosine-similarity caching, automated compliance enforcement (GxP, data classification, security policy). Discourse bot for auto-cited AI replies. Built solo in Python.',
    tags: ['Python', 'Flask', 'FAISS', 'GPT-4o', 'LiteLLM', 'SSE', 'Discourse API'],
  },
  {
    name: 'BigQuery DataFrames Python API (Google)',
    status: 'Open Source',
    description: 'Extended Google\'s BigQuery DataFrames public Python API with datetime method support. Contributed microsecond datetime cross-compatibility to the Ibis open-source library -- used in production by data engineers globally.',
    tags: ['Python', 'BigQuery', 'Pandas', 'Ibis', 'PyArrow'],
  },
]

const education = [
  { school: 'Multiverse', degree: 'Software Engineering Bootcamp', year: '2022 - 2024' },
  { school: 'Georgia State University', degree: 'B.S., Communications', year: '2014' },
]

const certifications = [
  { org: 'Anthropic', name: 'Claude Code in Action', year: '2026' },
  { org: 'Anthropic', name: 'Claude Code 101', year: '2026' },
  { org: 'Anthropic', name: 'Claude 101', year: '2026' },
  { org: 'Anthropic', name: 'AI Fluency: Framework & Foundations', year: '2026' },
  { org: 'Anthropic', name: 'Introduction to Agent Skills', year: '2026' },
  { org: 'Anthropic', name: 'Introduction to Claude Cowork', year: '2026' },
  { org: 'Anthropic', name: 'Introduction to Subagents', year: '2026' },
  { org: 'Anthropic', name: 'Model Context Protocol: Advanced Topics', year: '2026' },
]

const skills = [
  'Large Language Models (LLMs)', 'Generative AI', 'RAG', 'Prompt Engineering', 'LLM Integration',
  'Claude Code', 'Anthropic API', 'Agent SDK', 'LiteLLM', 'FAISS', 'Model Context Protocol (MCP)',
  'Python', 'JavaScript', 'TypeScript', 'Java',
  'React 18', 'Tailwind CSS', 'Vite',
  'FastAPI', 'Flask', 'REST API Design', 'gRPC', 'Protocol Buffers', 'GraphQL',
  'GCP', 'BigQuery', 'PostgreSQL', 'PyArrow', 'Pandas',
  'Developer Relations', 'Technical Documentation', 'Solutions Engineering', 'Technical Training', 'Community Building',
  'Git', 'GitHub', 'Agile', 'Automated Testing', 'CI/CD',
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

      {/* Projects */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Projects</h3>
      <div className="flex flex-col gap-4 mb-6">
        {projects.map((proj) => (
          <div key={proj.name} className="rounded-xl p-4 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{proj.name}</h4>
              <span className="text-[10px] py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}>{proj.status}</span>
            </div>
            <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>
            <div className="flex flex-wrap gap-1">
              {proj.tags.map((tag) => (
                <span key={tag} className="text-[10px] py-0.5 px-1.5 rounded font-mono" style={{ background: 'var(--bg-primary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}>{tag}</span>
              ))}
            </div>
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
