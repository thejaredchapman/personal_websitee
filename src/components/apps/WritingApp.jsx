import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { publications, handouts } from '../../content/writing'

const markdownComponents = {
  h1: ({ children }) => <h1 className="text-xl font-bold mt-6 mb-3 first:mt-0" style={{ color: 'var(--text-primary)' }}>{children}</h1>,
  h2: ({ children }) => <h2 className="text-lg font-bold mt-6 mb-2" style={{ color: 'var(--text-primary)' }}>{children}</h2>,
  h3: ({ children }) => <h3 className="text-base font-semibold mt-5 mb-2" style={{ color: 'var(--text-primary)' }}>{children}</h3>,
  h4: ({ children }) => <h4 className="text-sm font-semibold mt-4 mb-1.5" style={{ color: 'var(--text-primary)' }}>{children}</h4>,
  p: ({ children }) => <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{children}</p>,
  a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--accent-500)' }}>{children}</a>,
  ul: ({ children }) => <ul className="list-disc pl-5 mb-3 flex flex-col gap-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 flex flex-col gap-1">{children}</ol>,
  li: ({ children }) => <li className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{children}</li>,
  blockquote: ({ children }) => <blockquote className="border-l-2 pl-3 my-3 italic text-sm" style={{ borderColor: 'var(--accent-400)', color: 'var(--text-tertiary)' }}>{children}</blockquote>,
  code: ({ children }) => <code className="text-[11px] font-mono px-1 rounded" style={{ background: 'var(--bg-primary)', color: 'var(--accent-500)' }}>{children}</code>,
  pre: ({ children }) => <pre className="text-[11px] font-mono p-3 rounded-lg overflow-x-auto mb-3 border" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-light)' }}>{children}</pre>,
  table: ({ children }) => <div className="overflow-x-auto mb-4"><table className="w-full text-xs border-collapse">{children}</table></div>,
  th: ({ children }) => <th className="text-left py-1.5 px-2 font-semibold border-b" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-light)' }}>{children}</th>,
  td: ({ children }) => <td className="py-1.5 px-2 border-b align-top" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-light)' }}>{children}</td>,
  hr: () => <hr className="my-5" style={{ borderColor: 'var(--border-light)' }} />,
  strong: ({ children }) => <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>,
}

function ArticleCard({ item, onOpen }) {
  return (
    <button
      onClick={() => onOpen(item.id)}
      className="group text-left rounded-xl p-4 border transition-all duration-200 hover:border-[var(--accent-300)] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_var(--shadow-accent)] w-full cursor-pointer"
      style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)', color: 'inherit' }}
    >
      <div className="flex items-start justify-between mb-2 gap-2">
        <h3 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{item.title}</h3>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 shrink-0 opacity-30 group-hover:opacity-80 transition-all group-hover:translate-x-0.5" style={{ color: 'var(--accent-500)' }}>
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-tertiary)' }}>{item.description}</p>
      {item.tags && (
        <div className="flex gap-1 flex-wrap">
          {item.tags.map((t) => (
            <span key={t} className="text-[10px] py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-100)', color: 'var(--accent-700)' }}>{t}</span>
          ))}
        </div>
      )}
    </button>
  )
}

function WritingApp() {
  const [selectedId, setSelectedId] = useState(null)
  const all = [...publications, ...handouts]
  const selected = all.find((item) => item.id === selectedId)

  if (selected) {
    return (
      <div className="p-6 max-[768px]:p-4">
        <button
          onClick={() => setSelectedId(null)}
          className="flex items-center gap-1.5 text-xs font-medium mb-4 transition-opacity hover:opacity-70 cursor-pointer"
          style={{ color: 'var(--accent-500)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Back to Writing
        </button>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
          {selected.content}
        </ReactMarkdown>
      </div>
    )
  }

  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Writing</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>Articles and developer guides</p>

      <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Publications</p>
      <div className="flex flex-col gap-3 mb-7">
        {publications.map((item) => <ArticleCard key={item.id} item={item} onOpen={setSelectedId} />)}
      </div>

      <div className="pt-6 border-t" style={{ borderColor: 'var(--border-light)' }}>
        <h3 className="text-base font-semibold mb-0.5" style={{ color: 'var(--text-primary)' }}>Developer Guides</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-tertiary)' }}>Reference handouts for understanding agentic systems, from orchestration to evaluation</p>
        <div className="grid grid-cols-2 gap-3 max-[768px]:grid-cols-1">
          {handouts.map((item) => <ArticleCard key={item.id} item={item} onOpen={setSelectedId} />)}
        </div>
      </div>
    </div>
  )
}

export default WritingApp
