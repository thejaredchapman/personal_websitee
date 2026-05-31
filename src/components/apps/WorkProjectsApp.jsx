const workProjects = [
  {
    name: 'ILIAD LiteLLM Model Explorer',
    company: 'AbbVie',
    period: 'Aug 2024 – Present',
    status: 'Production',
    role: 'Full-Stack Engineer (solo ownership)',
    description: 'Full-stack LLM API gateway built solo from scratch. React 18 + Tailwind CSS + Vite frontend with a FastAPI async proxy backend that injects API keys server-side and routes requests across 160+ models from OpenAI, Anthropic, Google, Meta, Mistral, and DeepSeek.',
    impact: [
      'API Playground with real-time token usage tracking and cost estimation',
      'A/B multi-model comparison and LLM-as-judge grading across 5 quality dimensions',
      'Rate limiting, error normalization, and provider fallback handling',
      '111 automated tests across 10 suites — components, interactions, and edge cases',
      'Enterprise-deployed org-wide at AbbVie as the primary LLM access layer',
    ],
    tags: ['Python', 'FastAPI', 'React 18', 'Tailwind CSS', 'Vite', 'LiteLLM', 'FAISS', 'Claude Code'],
  },
  {
    name: 'Enterprise RAG Pipeline',
    company: 'AbbVie',
    period: 'Aug 2024 – Present',
    status: 'Production',
    role: 'ML Engineer (solo ownership)',
    description: 'Natural language access layer over 8 internal developer repositories. Employees can query internal docs, compliance guidelines, and engineering knowledge bases using plain English — answers are source-cited and enforced against AbbVie data classification policy, GxP regulations, and SLC security policies.',
    impact: [
      '2,800+ document chunks with overlapping chunking strategy for context continuity',
      'L2-normalized vector embeddings with cosine-similarity cache (0.95 threshold) for instant repeat-query responses',
      'Discourse bot auto-replying to unanswered compliance threads with source-cited AI answers',
      'Automatic policy enforcement — GxP, data classification, and security policies checked on every query',
    ],
    tags: ['Python', 'Flask', 'FAISS', 'GPT-4o', 'LiteLLM', 'SSE', 'Discourse API'],
  },
  {
    name: 'BigQuery DataFrames Python API',
    company: 'Google',
    period: 'Sep 2022 – Aug 2023',
    status: 'Open Source',
    role: 'Software Engineer',
    description: 'Extended Google\'s BigQuery DataFrames public Python API for external developer release. Implemented and tested datetime method APIs using Pandas, Ibis, and PyArrow — enabling external developer adoption of BigQuery via a familiar DataFrame interface.',
    impact: [
      'Implemented datetime method support across the public BigQuery Python API',
      'Contributed microsecond datetime cross-compatibility to the Ibis open-source library',
      'Cross-compatibility with Pandas for SQL-via-Python operations — used in production by data engineers globally',
      'Authored the engineering architecture and implementation design document end-to-end',
    ],
    tags: ['Python', 'BigQuery', 'Pandas', 'Ibis', 'PyArrow'],
    url: 'https://github.com/googleapis/python-bigquery-dataframes',
  },
]

const statusColors = {
  Production: { bg: 'var(--accent-100)', text: 'var(--accent-700)' },
  'Open Source': { bg: 'rgba(34,197,94,0.12)', text: 'rgb(21,128,61)' },
}

function WorkProjectsApp() {
  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Work Projects</h2>
      <p className="text-sm mb-6" style={{ color: 'var(--text-tertiary)' }}>Production systems built professionally at AbbVie and Google</p>

      <div className="flex flex-col gap-5">
        {workProjects.map((proj) => (
          <div
            key={proj.name}
            className="rounded-xl border overflow-hidden"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
          >
            {/* Accent top bar */}
            <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, var(--accent-500), var(--accent-300))' }} />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-1 flex-wrap">
                <div>
                  <h3 className="font-bold text-base leading-tight" style={{ color: 'var(--text-primary)' }}>{proj.name}</h3>
                  <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--accent-500)' }}>{proj.company} · {proj.period}</p>
                  <p className="text-xs mt-0.5 italic" style={{ color: 'var(--text-tertiary)' }}>{proj.role}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="text-[10px] py-0.5 px-2.5 rounded-full font-semibold"
                    style={{ background: statusColors[proj.status]?.bg, color: statusColors[proj.status]?.text }}
                  >
                    {proj.status}
                  </span>
                  {proj.url && (
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] py-0.5 px-2.5 rounded-full font-semibold no-underline transition-opacity hover:opacity-70"
                      style={{ background: 'var(--bg-primary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed mt-3 mb-3" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>

              {/* Impact bullets */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-tertiary)' }}>Impact</p>
                <ul className="flex flex-col gap-1 list-none p-0 m-0">
                  {proj.impact.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent-400)' }} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] py-0.5 px-1.5 rounded font-mono"
                    style={{ background: 'var(--bg-primary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WorkProjectsApp
