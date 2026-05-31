import { useState } from 'react'

const workProjects = [
  {
    name: 'ILIAD LiteLLM Model Explorer',
    company: 'AbbVie',
    period: 'Aug 2024 – Present',
    status: 'Production',
    desc: 'Full-stack LLM API gateway serving 160+ models across 6 providers. A/B multi-model comparison, LLM-as-judge grading across 5 quality dimensions, real-time token tracking, rate limiting, and 111 automated tests. Enterprise-deployed org-wide.',
    tags: ['Python', 'FastAPI', 'React 18', 'LiteLLM', 'FAISS', 'Claude Code'],
  },
  {
    name: 'Enterprise RAG Pipeline',
    company: 'AbbVie',
    period: 'Aug 2024 – Present',
    status: 'Production',
    desc: 'Natural language access over 8 internal repositories — 2,800+ document chunks, L2-normalized embeddings, cosine-similarity cache (0.95 threshold), and automated GxP/compliance enforcement. Discourse bot for auto-cited AI replies.',
    tags: ['Python', 'Flask', 'FAISS', 'GPT-4o', 'LiteLLM', 'SSE'],
  },
  {
    name: 'BigQuery DataFrames Python API',
    company: 'Google',
    period: 'Sep 2022 – Aug 2023',
    status: 'Open Source',
    desc: "Extended Google's BigQuery DataFrames public Python API with datetime method support. Contributed microsecond datetime cross-compatibility to the Ibis open-source library — used in production by data engineers globally.",
    tags: ['Python', 'BigQuery', 'Pandas', 'Ibis', 'PyArrow'],
    url: 'https://github.com/googleapis/python-bigquery-dataframes',
  },
]

const personalProjects = [
  { title: 'AI Explorer', desc: 'Foundational vocabulary for understanding how modern AI is built, customized, and deployed.', tags: ['AI', 'Explanation', 'Concepts'], url: 'https://app-dun-phi.vercel.app/' },
  { title: 'LLM Frameworks', desc: 'Learn LLM orchestration frameworks like LangChain — chains, agents, and tools.', tags: ['React', 'AI', 'LLMs'], url: 'https://langchain-learning-app.vercel.app/' },
  { title: 'DJ Master Academy', desc: 'Training resource for mastering the Pioneer DDJ-FLX4 DJ controller.', tags: ['React', 'Music'], url: 'https://dj-master-academy.vercel.app/' },
  { title: 'LoanLens', desc: 'Amortization and affordability calculator for understanding loan financing.', tags: ['React', 'Finance'], url: 'https://amortization.vercel.app/' },
  { title: 'Art Portfolio', desc: 'Curated gallery showcasing original artwork and creative projects.', tags: ['React', 'Art'], url: 'https://art-portfolio-navy.vercel.app/' },
  { title: 'DS&A Interview Prep', desc: 'Study resource for data structures and algorithms interview preparation.', tags: ['React', 'Education'], url: 'https://dsa-interview-prep-seven.vercel.app/' },
  { title: 'Citizenship Pathways', desc: 'Guide for navigating residency requirements and citizenship options abroad.', tags: ['React', 'Guide'], url: 'https://citizenpathwayss.vercel.app/' },
  { title: 'Chess Learning App', desc: 'Interactive chess platform for studying openings and practicing tactics.', tags: ['Angular', 'Chess'], url: 'https://chess-learning-app-teal.vercel.app/' },
  { title: 'The Daily Impact', desc: 'Personalized news app curating impact-driven journalism.', tags: ['React', 'News'], url: 'https://news-impact-app-omega.vercel.app/' },
  { title: 'Break Into Tech', desc: 'Career transition platform for breaking into cybersecurity.', tags: ['Next.js', 'Security'], url: 'https://break-into-tech.vercel.app/' },
  { title: 'Camp Javery Wedding', desc: 'Summer camp-themed wedding celebration site.', tags: ['React', 'Event'], url: 'https://simple-summer-camp-wedding.vercel.app/' },
  { title: 'PyTorch Interactive Guide', desc: 'Interactive educational tool for learning PyTorch and ML fundamentals.', tags: ['React', 'ML'], url: 'https://pytorch-interactive-guide.vercel.app/' },
]

const devProjects = [
  { title: 'Claude Code Updates', desc: 'Curated changelog tracking Claude Code feature updates, improvements, and new capabilities over time.', tags: ['Claude Code', 'AI', 'Changelog'], url: 'https://github.com/thejaredchapman/claude-code-updates' },
  { title: '4D Orchestrator MCP', desc: 'An MCP server enabling multi-agent orchestration using the 4D framework for complex AI workflow coordination.', tags: ['MCP', 'AI', 'Orchestration'], url: 'https://github.com/thejaredchapman/4d-orchestrator-mcp' },
  { title: 'Claude Code Deep Dive', desc: 'A comprehensive presentation deck for a technical deep dive into Claude Code architecture, features, and best practices.', tags: ['Claude Code', 'Deck', 'AI'], url: 'https://github.com/thejaredchapman/claude-code-deep-dive-deck' },
  { title: 'Claude Code Guide', desc: 'A practical guide for getting the most out of Claude Code, covering tips, workflows, and advanced usage patterns.', tags: ['Claude Code', 'AI', 'Guide'], url: 'https://github.com/thejaredchapman/claude-code-guide' },
  { title: 'AI Explained: Deep Learn', desc: 'Deep learning concepts explained clearly, bridging the gap between AI theory and practical implementation.', tags: ['AI', 'Deep Learning', 'Education'], url: 'https://github.com/thejaredchapman/ai_explained_deep_learn' },
  { title: 'Ask the Docs', desc: 'A documentation query tool that lets you ask natural language questions against any codebase or documentation set.', tags: ['AI', 'RAG', 'Developer Tools'], url: 'https://github.com/thejaredchapman/ask-the-docs' },
]

function ProjectsApp() {
  const [hoveredTitle, setHoveredTitle] = useState(null)

  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Projects</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>Things I've built and shipped</p>

      {/* Work Projects */}
      <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Work Projects</p>
      <div className="flex flex-col gap-3 mb-7">
        {workProjects.map((p) => (
          <div
            key={p.name}
            className="rounded-xl p-4 border overflow-hidden relative"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, var(--accent-500), var(--accent-300))' }} />
            <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{p.name}</h3>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}>{p.status}</span>
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-[10px] py-0.5 px-2 rounded-full font-medium no-underline transition-opacity hover:opacity-70" style={{ background: 'var(--bg-primary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}>
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
            <p className="text-[10px] font-medium mb-2" style={{ color: 'var(--accent-500)' }}>{p.company} · {p.period}</p>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{p.desc}</p>
            <div className="flex gap-1 flex-wrap">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] py-0.5 px-1.5 rounded font-mono" style={{ background: 'var(--bg-primary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Personal Projects */}
      <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Personal Projects</p>
      <div className="grid grid-cols-2 gap-3 mb-8 max-[768px]:grid-cols-1">
        {personalProjects.map((p) => (
          <a
            key={p.title}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-xl p-4 border no-underline transition-all duration-200 hover:border-[var(--accent-300)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_var(--shadow-accent)]"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)', color: 'inherit' }}
            onMouseEnter={() => setHoveredTitle(p.title)}
            onMouseLeave={() => setHoveredTitle(null)}
          >
            {hoveredTitle === p.title && (
              <div className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-[320px] h-[200px] rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] border pointer-events-none z-[100] animate-[previewFadeIn_0.2s_ease]" style={{ borderColor: 'var(--border-color, rgba(255,255,255,0.1))', background: 'var(--bg-secondary)' }}>
                <iframe
                  src={p.url}
                  title={`${p.title} preview`}
                  loading="lazy"
                  className="w-[960px] h-[600px] border-none scale-[0.333] origin-top-left pointer-events-none"
                />
              </div>
            )}
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0 opacity-30 group-hover:opacity-80 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--accent-500)' }}>
                <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-tertiary)' }}>{p.desc}</p>
            <div className="flex gap-1 flex-wrap">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}>{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Developer Improvements */}
      <div className="pt-6 border-t" style={{ borderColor: 'var(--border-light)' }}>
        <h3 className="text-base font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Developer Improvements</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>Tools, guides, and resources for developer workflows</p>
        <div className="grid grid-cols-2 gap-3 max-[768px]:grid-cols-1">
          {devProjects.map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl p-4 border no-underline transition-all duration-200 hover:border-[var(--accent-300)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_var(--shadow-accent)]"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)', color: 'inherit' }}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{p.title}</h3>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0 opacity-30 group-hover:opacity-80 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" style={{ color: 'var(--accent-500)' }}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-tertiary)' }}>{p.desc}</p>
              <div className="flex gap-1 flex-wrap">
                {p.tags.map((t) => (
                  <span key={t} className="text-[10px] py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}>{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProjectsApp
