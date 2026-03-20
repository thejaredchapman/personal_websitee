import { useState } from 'react'

const projects = [
  { title: 'LoanLens', desc: 'Amortization and affordability calculator for understanding loan financing.', tags: ['React', 'Finance'], url: 'https://amortization.vercel.app/' },
  { title: 'Art Portfolio', desc: 'Curated gallery showcasing original artwork and creative projects.', tags: ['React', 'Art'], url: 'https://art-portfolio-navy.vercel.app/' },
  { title: 'DS&A Interview Prep', desc: 'Study resource for data structures and algorithms interview preparation.', tags: ['React', 'Education'], url: 'https://dsa-interview-prep-seven.vercel.app/' },
  { title: 'Citizenship Pathways', desc: 'Guide for navigating residency requirements and citizenship options abroad.', tags: ['React', 'Guide'], url: 'https://citizenpathwayss.vercel.app/' },
  { title: 'Chess Learning App', desc: 'Interactive chess platform for studying openings and practicing tactics.', tags: ['Angular', 'Chess'], url: 'https://chess-learning-app-teal.vercel.app/' },
  { title: 'DDJ-FLX4 DJ Guide', desc: 'Comprehensive reference guide for the Pioneer DDJ-FLX4 DJ controller.', tags: ['React', 'Music'], url: 'https://app-dun-phi.vercel.app/' },
  { title: 'The Daily Impact', desc: 'Personalized news app curating impact-driven journalism.', tags: ['React', 'News'], url: 'https://news-impact-app-omega.vercel.app/' },
  { title: 'Break Into Tech', desc: 'Career transition platform for breaking into cybersecurity.', tags: ['Next.js', 'Security'], url: 'https://break-into-tech.vercel.app/' },
  { title: 'Camp Javery Wedding', desc: 'Summer camp-themed wedding celebration site.', tags: ['React', 'Event'], url: 'https://simple-summer-camp-wedding.vercel.app/' },
  { title: 'PyTorch Interactive Guide', desc: 'Interactive educational tool for learning PyTorch and ML fundamentals.', tags: ['React', 'ML'], url: 'https://pytorch-interactive-guide.vercel.app/' },
]

function ProjectsApp() {
  const [hoveredTitle, setHoveredTitle] = useState(null)

  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Projects</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>Things I've built and shipped</p>

      <div className="grid grid-cols-2 gap-3 max-[768px]:grid-cols-1">
        {projects.map((p) => (
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
    </div>
  )
}

export default ProjectsApp
