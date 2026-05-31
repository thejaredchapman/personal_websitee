import { useState } from 'react'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const devProjects = [
  {
    title: 'Claude Code Updates',
    description: 'Curated changelog tracking Claude Code feature updates, improvements, and new capabilities over time.',
    tags: ['Claude Code', 'AI', 'Changelog'],
    url: 'https://github.com/thejaredchapman/claude-code-updates',
    cta: 'View on GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: '4D Orchestrator MCP',
    description: 'An MCP server enabling multi-agent orchestration using the 4D framework for complex AI workflow coordination.',
    tags: ['MCP', 'AI', 'Orchestration'],
    url: 'https://github.com/thejaredchapman/4d-orchestrator-mcp',
    cta: 'View on GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <circle cx="4" cy="6" r="2" />
        <circle cx="20" cy="6" r="2" />
        <circle cx="4" cy="18" r="2" />
        <circle cx="20" cy="18" r="2" />
        <path d="M6 6.5l4 4M14 13.5l4 4M6 17.5l4-4M14 10.5l4-4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    title: 'Claude Code Deep Dive',
    description: 'A comprehensive presentation deck for a technical deep dive into Claude Code architecture, features, and best practices.',
    tags: ['Claude Code', 'Deck', 'AI'],
    url: 'https://github.com/thejaredchapman/claude-code-deep-dive-deck',
    cta: 'View on GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Claude Code Guide',
    description: 'A practical guide for getting the most out of Claude Code, covering tips, workflows, and advanced usage patterns.',
    tags: ['Claude Code', 'AI', 'Guide'],
    url: 'https://github.com/thejaredchapman/claude-code-guide',
    cta: 'View on GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 7h6M9 11h6M9 15h4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'AI Explained: Deep Learn',
    description: 'Deep learning concepts explained clearly, bridging the gap between AI theory and practical implementation.',
    tags: ['AI', 'Deep Learning', 'Education'],
    url: 'https://github.com/thejaredchapman/ai_explained_deep_learn',
    cta: 'View on GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 2a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 14a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 22h10M8 18v4M16 18v4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  },
  {
    title: 'Ask the Docs',
    description: 'A documentation query tool that lets you ask natural language questions against any codebase or documentation set.',
    tags: ['AI', 'RAG', 'Developer Tools'],
    url: 'https://github.com/thejaredchapman/ask-the-docs',
    cta: 'View on GitHub',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 12h6M9 16h4M14 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 3v5h5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="16" cy="17" r="2.5" />
        <path d="M18 18.5l1.5 1.5" strokeLinecap="round" />
      </svg>
    )
  },
]

function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 })
  const [cardsRef, visibleCards] = useStaggerAnimation(12, { baseDelay: 100 })
  const [devCardsRef, visibleDevCards] = useStaggerAnimation(6, { baseDelay: 100 })

  const projects = [
    {
      title: 'AI Explorer',
      description: 'The core AI concepts outlined on the AI Explorer site provide a foundational vocabulary for understanding how modern artificial intelligence is built, customized, and deployed.',
      tags: ['AI', 'Explanation', 'What is AI?', 'Concepts', 'Tools'],
      url: 'https://app-dun-phi.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2a4 4 0 014 4c0 1.1-.45 2.1-1.17 2.83L12 12l-2.83-3.17A4 4 0 0112 2z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12v6M8 16l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 12h4M16 12h4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4" cy="12" r="1" fill="currentColor" />
          <circle cx="20" cy="12" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'LLM Frameworks',
      description: 'An educational resource for learning LLM orchestration frameworks like LangChain, covering chains, agents, memory, and tool integration patterns.',
      tags: ['React', 'AI', 'LLMs'],
      url: 'https://langchain-learning-app.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'DJ Master Academy',
      description: 'A training resource for mastering the Pioneer DDJ-FLX4 DJ controller, covering skills, techniques, and equipment operation.',
      tags: ['React', 'Music', 'DJ'],
      url: 'https://dj-master-academy.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 7v6M9 10h6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'LoanLens',
      description: 'An amortization and affordability calculator that helps users understand loan financing by breaking down payments into principal and interest components over time.',
      tags: ['React', 'Finance', 'Calculator'],
      url: 'https://amortization.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Art Portfolio',
      description: 'A curated gallery showcasing original artwork and creative projects, built with a focus on visual presentation and smooth browsing.',
      tags: ['React', 'Art', 'Portfolio'],
      url: 'https://art-portfolio-navy.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-4.96-4.48-9-10-9z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6.5" cy="11.5" r="1.5" fill="currentColor" />
          <circle cx="9.5" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="14.5" cy="7.5" r="1.5" fill="currentColor" />
          <circle cx="17.5" cy="11.5" r="1.5" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'DS&A Interview Prep',
      description: 'A study resource for data structures and algorithms interview preparation, covering key concepts and patterns commonly tested in technical interviews.',
      tags: ['React', 'Education', 'Interviews'],
      url: 'https://dsa-interview-prep-seven.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Citizenship Pathways',
      description: 'An informational guide to help navigate the process of moving abroad, exploring residency requirements and citizenship options across different countries.',
      tags: ['React', 'Immigration', 'Guide'],
      url: 'https://citizenpathwayss.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Chess Learning App',
      description: 'An interactive chess learning platform designed to help players study openings, practice tactics, and improve their game through structured lessons and exercises.',
      tags: ['Angular', 'Chess', 'Education'],
      url: 'https://chess-learning-app-teal.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a3 3 0 013 3h1a1 1 0 011 1v1a1 1 0 01-1 1h-1v2l2 4H5l2-4v-2H6a1 1 0 01-1-1v-1a1 1 0 011-1h1a3 3 0 013-3h1V5.73A2 2 0 0112 2z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 21h10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'The Daily Impact',
      description: 'A personalized news application that curates and delivers stories that matter most to you, focusing on impact-driven journalism and relevance.',
      tags: ['React', 'News', 'AI'],
      url: 'https://news-impact-app-omega.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 4h16a1 1 0 011 1v14a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 8h4v4H7zM13 8h4M13 11h4M7 15h10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'Break Into Tech',
      description: 'A career transition platform offering structured guidance for breaking into cybersecurity, featuring roadmaps, certification paths, free resources, and apprenticeship programs.',
      tags: ['Next.js', 'Cybersecurity', 'Education'],
      url: 'https://break-into-tech.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      )
    },
    {
      title: 'Camp Javery Wedding',
      description: 'A summer camp-themed wedding celebration site for a Labor Day weekend event in Newaygo, Michigan, featuring event details and scheduling.',
      tags: ['React', 'Wedding', 'Event'],
      url: 'https://simple-summer-camp-wedding.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    },
    {
      title: 'PyTorch Interactive Guide',
      description: 'An interactive educational tool for learning PyTorch, offering hands-on guidance through core machine learning concepts and framework fundamentals.',
      tags: ['React', 'ML', 'Education'],
      url: 'https://pytorch-interactive-guide.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )
    }
  ]

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-8 relative z-1 max-[768px]:py-12 max-[768px]:px-4 scroll-mt-20" style={{ background: 'linear-gradient(180deg, var(--bg-tertiary) 0%, var(--bg-primary) 100%)' }}>
      <div className="container">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Projects</h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Things I've built and shipped
        </p>

        {/* Work Projects */}
        <div className={`mb-16 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Work Projects</h3>
          <p className="mb-8" style={{ color: 'var(--text-secondary)' }}>Production systems built professionally at AbbVie and Google</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 max-w-[1100px] mx-auto">
            {[
              {
                name: 'ILIAD LiteLLM Model Explorer',
                company: 'AbbVie',
                period: 'Aug 2024 – Present',
                status: 'Production',
                description: 'Full-stack LLM API gateway serving 160+ models across 6 providers. Features A/B multi-model comparison, LLM-as-judge grading across 5 dimensions, real-time token tracking, and rate limiting. 111 automated tests. Enterprise-deployed org-wide.',
                tags: ['Python', 'FastAPI', 'React 18', 'LiteLLM', 'FAISS', 'Claude Code'],
              },
              {
                name: 'Enterprise RAG Pipeline',
                company: 'AbbVie',
                period: 'Aug 2024 – Present',
                status: 'Production',
                description: 'Natural language access over 8 internal repositories — 2,800+ document chunks, L2-normalized embeddings, cosine-similarity caching (0.95 threshold), and automated GxP/compliance enforcement. Discourse bot for auto-cited AI replies.',
                tags: ['Python', 'Flask', 'FAISS', 'GPT-4o', 'LiteLLM', 'SSE'],
              },
              {
                name: 'BigQuery DataFrames Python API',
                company: 'Google',
                period: 'Sep 2022 – Aug 2023',
                status: 'Open Source',
                description: "Extended Google's BigQuery DataFrames public Python API with datetime method support. Contributed microsecond datetime cross-compatibility to the Ibis open-source library — used in production by data engineers globally.",
                tags: ['Python', 'BigQuery', 'Pandas', 'Ibis', 'PyArrow'],
                url: 'https://github.com/googleapis/python-bigquery-dataframes',
              },
            ].map((proj, index) => (
              <div
                key={proj.name}
                className={`card card-top-border flex flex-col transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                  <h4 className="text-xl" style={{ color: 'var(--text-primary)' }}>{proj.name}</h4>
                  <span className="text-xs py-0.5 px-2 rounded-full font-medium shrink-0" style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>{proj.status}</span>
                </div>
                <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent-500)' }}>{proj.company} · {proj.period}</p>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="text-xs py-0.5 px-2 rounded font-mono" style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}>{tag}</span>
                  ))}
                </div>
                {proj.url ? (
                  <a href={proj.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-[0.95rem] no-underline transition-all duration-300 hover:gap-3" style={{ color: 'var(--accent-500)' }}>
                    View on GitHub
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true"><path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                ) : (
                  <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>Internal / Enterprise</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Personal Projects */}
        <h3 className={`text-2xl font-bold mb-2 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: 'var(--text-primary)' }}>Personal Projects</h3>
        <p className={`mb-10 transition-all duration-700 delay-[350ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: 'var(--text-secondary)' }}>Side projects, tools, and apps I've built for fun or learning</p>

        <div ref={cardsRef} className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 max-w-[1100px] mx-auto">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`card card-top-border relative overflow-visible no-underline flex flex-col group transition-all duration-700 ${visibleCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ color: 'inherit' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[400px] h-[250px] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)] border pointer-events-none z-[100] animate-[previewFadeIn_0.2s_ease] max-[768px]:hidden" style={{ borderColor: 'var(--border-color, rgba(255,255,255,0.1))', background: 'var(--bg-secondary, #1a1a2e)' }}>
                  <iframe
                    src={project.url}
                    title={`${project.title} preview`}
                    loading="lazy"
                    className="w-[1200px] h-[750px] border-none scale-[0.333] origin-top-left pointer-events-none"
                  />
                </div>
              )}
              <div className="w-12 h-12 mb-4 transition-all duration-300 group-hover:scale-120 group-hover:rotate-10" style={{ color: 'var(--accent-500)' }}>
                {project.icon}
              </div>
              <h3 className="text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
              <p className="mb-6 leading-7 flex-1" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 font-semibold text-[0.95rem] transition-all duration-300 group-hover:gap-3" style={{ color: 'var(--accent-500)' }}>
                Visit Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-20">
          <h3 className={`text-2xl font-bold mb-2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: 'var(--text-primary)' }}>Developer Improvements</h3>
          <p className={`mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: 'var(--text-secondary)' }}>
            Tools, guides, and resources for developer workflows
          </p>
          <div ref={devCardsRef} className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 max-w-[1100px] mx-auto">
            {devProjects.map((project, index) => (
              <a
                key={index}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`card card-top-border relative overflow-visible no-underline flex flex-col group transition-all duration-700 ${visibleDevCards.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ color: 'inherit' }}
              >
                <div className="w-12 h-12 mb-4 transition-all duration-300 group-hover:scale-120 group-hover:rotate-10" style={{ color: 'var(--accent-500)' }}>
                  {project.icon}
                </div>
                <h3 className="text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>{project.title}</h3>
                <p className="mb-6 leading-7 flex-1" style={{ color: 'var(--text-secondary)' }}>{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">{tag}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 font-semibold text-[0.95rem] transition-all duration-300 group-hover:gap-3" style={{ color: 'var(--accent-500)' }}>
                  {project.cta}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">
                    <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
