const experience = [
  {
    role: 'Developer Support, Generative AI Applications',
    company: 'AbbVie — Los Angeles, CA',
    period: 'Aug 2024 — Present',
    bullets: [
      "As the organization's first Claude Code practitioner, built the enablement system around it: a Python Stop hook cost tracker deployed via an idempotent installer, an interactive React setup guide, a 75-slide training deck covering all 5 Claude Code extension points (CLAUDE.md, subagents, skills, MCP, hooks) with hands-on exercises, and a 1-hour compliance-forward training session with facilitator guide and handout.",
      "Ran recurring Claude Code office hours and scheduled 1:1 install support, and filed Jira tickets to the owning teams for friction that surfaced there, closing the loop between the field and the people who could fix it.",
      "Delivered live Claude Code demonstrations across 5 global regions (Americas, Latin America, Germany, England, Japan) in 1:1 pairing and group sessions. One demo led to a CRISPR research application that eliminated a $75,000/year external consultant: built the first draft, handed it off, and helped tune it as newer models shipped. Another, an Angular-to-React migration, was verified by the developer as cutting 4 months of development time.",
      "Coached sales teams on what AbbVie's AI offering made available and gave demos to sellers, scientists, and manufacturing audiences.",
      "Shipped a 16-page gamified Claude Code learning platform: 3,500 registered users at a 28-minute average session versus the 4-5 minute norm for documentation, 76% quiz completion, and a GxP compliance page that reduced related support requests 30%. Shipped AI Workflow Magic (Next.js, 60+ templates): 2,000+ users in three months, 87% quiz completion, cutting prompt-writing time from 15+ minutes to under 2.",
      "Built with tool use and MCP: the 4D Orchestrator MCP Server (TypeScript), two FastMCP servers around an Enterprise RAG pipeline (40+ developer questions answered per week, zero compliance policy violations), and support for teams adopting Figma's MCP server with Claude Code.",
      "Built ILIAD Lite LiteLLM Model Explorer (solo, full-stack) after the org's migration to LiteLLM across Amazon Bedrock, Microsoft Azure, and Google Vertex AI: 800+ internal users, comparison time cut from 15-20 minutes to 45 seconds, LLM-as-judge grades validated at 92% accuracy against human expert scoring.",
      "Facilitated monthly technical sessions for ~300 engineers across 7 internal developer communities; assisted Anthropic's team during an on-site Claude Code presentation at AbbVie, pairing it with follow-up support and documentation.",
      "Authored org-wide API integration guides, LLM troubleshooting playbooks, the \"Should I?\" decision framework, and Responsible AI and PII guidance with legal, security, and privacy teams.",
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Google — Chicago, IL',
    period: 'Sep 2022 — May 2024',
    bullets: [
      'Refactored Searchmark\'s internal API using Java gRPC and Protocol Buffers, reducing integration friction for new engineering teams onboarding to the service.',
      'Reduced CPU usage for distributed query execution across Google\'s internal performance testing infrastructure through automated deployment.',
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
    name: 'EvalForge Lite',
    status: 'Open Source',
    description: "Open-source tool for choosing an AI model with evidence instead of guesswork. Write a prompt and grading rubric, pick up to 4 models, and compare them side by side, including the same model on OpenRouter, Amazon Bedrock, Google Vertex AI, and Microsoft Foundry. Scores every response with an LLM judge and six criteria, compares latency, tokens per second, and cost with a \"what matters most\" selector, screens prompts against your company policy, exports PDF and CSV reports, and ships as an MCP server (9 tools, installable with uvx evalforge-lite) and a Claude Code plugin. Engineering: Python and Flask with no database, thin REST clients (AWS SigV4 signing through botocore), a single gateway that routes every call to the right backend, input validation against SSRF, secret scrubbing on every error message, and 568 automated tests that never touch the network. Built with Claude Code using a spec, plan, implement loop with independent reviewer agents.",
    tags: ['Python', 'Flask', 'Amazon Bedrock', 'Vertex AI', 'Foundry', 'MCP', 'Claude Code'],
  },
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

const devImprovements = [
  {
    name: 'Claude Code Updates',
    status: 'Open Source',
    description: 'Curated changelog tracking Claude Code feature updates, improvements, and new capabilities over time.',
    tags: ['Claude Code', 'AI', 'Changelog'],
    url: 'https://github.com/thejaredchapman/claude-code-updates',
  },
  {
    name: '4D Orchestrator MCP',
    status: 'Open Source',
    description: 'An MCP server enabling multi-agent orchestration using the 4D framework for complex AI workflow coordination.',
    tags: ['MCP', 'AI', 'Orchestration'],
    url: 'https://github.com/thejaredchapman/4d-orchestrator-mcp',
  },
  {
    name: 'Claude Code Deep Dive',
    status: 'Open Source',
    description: 'A comprehensive presentation deck for a technical deep dive into Claude Code architecture, features, and best practices.',
    tags: ['Claude Code', 'Deck', 'AI'],
    url: 'https://github.com/thejaredchapman/claude-code-deep-dive-deck',
  },
  {
    name: 'Claude Code Guide',
    status: 'Open Source',
    description: 'A practical guide for getting the most out of Claude Code, covering tips, workflows, and advanced usage patterns.',
    tags: ['Claude Code', 'AI', 'Guide'],
    url: 'https://github.com/thejaredchapman/claude-code-guide',
  },
  {
    name: 'AI Explained: Deep Learn',
    status: 'Open Source',
    description: 'Deep learning concepts explained clearly, bridging the gap between AI theory and practical implementation.',
    tags: ['AI', 'Deep Learning', 'Education'],
    url: 'https://github.com/thejaredchapman/ai_explained_deep_learn',
  },
  {
    name: 'Ask the Docs',
    status: 'Open Source',
    description: 'A documentation query tool that lets you ask natural language questions against any codebase or documentation set.',
    tags: ['AI', 'RAG', 'Developer Tools'],
    url: 'https://github.com/thejaredchapman/ask-the-docs',
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
  { org: 'Anthropic', name: 'Building with the Claude API', year: '2026' },
  { org: 'Anthropic', name: 'Claude with Amazon Bedrock', year: '2026' },
  { org: 'Anthropic', name: 'AI capabilities and limitations', year: '2026' },
  { org: 'Anthropic', name: 'Introduction to Claude Tag', year: '2026' },
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
      <div className="flex flex-col gap-4 mb-4">
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

      <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Developer Improvements</p>
      <div className="flex flex-col gap-3 mb-6">
        {devImprovements.map((proj) => (
          <a
            key={proj.name}
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl p-4 border no-underline transition-all duration-200 hover:border-[var(--accent-300)]"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)', color: 'inherit' }}
          >
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
          </a>
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
