import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

function AISection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 })
  const [cardsRef, visibleCards] = useStaggerAnimation(4, { baseDelay: 120 })

  const projects = [
    {
      title: 'LLM Developer Support Platform',
      description: 'Supporting and educating developers on LLM integration, conducting A/B testing between models to optimize results for internal and external customers.',
      tags: ['LLMs', 'Vertex AI', 'REST APIs'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <circle cx="15.5" cy="8.5" r="1.5" />
          <path d="M9 14c.5 1 1.5 2 3 2s2.5-1 3-2" />
        </svg>
      )
    },
    {
      title: 'BigQuery DataFrames',
      description: 'Developed and tested BigQuery Python and DataFrames APIs using Pandas, Ibis, and PyArrow for scalable data processing.',
      tags: ['Python', 'Pandas', 'BigQuery'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Ibis Open Source Contribution',
      description: 'Contributed to the Ibis library enabling users to write SQL with Python. Added microsecond precision method and tests.',
      tags: ['Open Source', 'Python', 'SQL'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Searchmark Performance Tools',
      description: 'Designed code architecture using OOP principles in Java for critical Google Search performance tools. Refactored APIs using protocol buffers (gRPC).',
      tags: ['Java', 'gRPC', 'Performance'],
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
        </svg>
      )
    }
  ]

  return (
    <section ref={sectionRef} id="ai" className="py-20 px-8 relative z-1 max-[768px]:py-12 max-[768px]:px-4 scroll-mt-20" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-tertiary) 100%)' }}>
      <div className="container">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>AI & Machine Learning</h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Pushing the boundaries of what's possible with artificial intelligence
        </p>

        <div ref={cardsRef} className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`card card-top-border relative overflow-hidden group transition-all duration-700 ${visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              <div className="w-12 h-12 mb-4 transition-all duration-300 group-hover:scale-120 group-hover:rotate-10" style={{ color: 'var(--accent-500)' }}>
                {project.icon}
              </div>
              <h3 className="text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
              <p className="mb-6 leading-7" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={`flex justify-center gap-16 flex-wrap max-[768px]:gap-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { number: '3+', label: 'Years in Tech' },
            { number: 'Google', label: 'Former Employer' },
            { number: 'LLMs', label: 'Current Focus' },
          ].map((stat, i) => (
            <div key={i} className="text-center transition-transform duration-300 hover:scale-110">
              <span className="block text-5xl font-extrabold leading-tight bg-gradient-to-br from-[var(--accent-500)] to-[var(--accent-600)] bg-clip-text max-[768px]:text-[2.5rem]" style={{ WebkitTextFillColor: 'transparent' }}>{stat.number}</span>
              <span className="font-medium" style={{ color: 'var(--text-secondary)' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AISection
