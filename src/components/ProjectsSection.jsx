import { useState } from 'react'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 })
  const [cardsRef, visibleCards] = useStaggerAnimation(10, { baseDelay: 100 })

  const projects = [
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
      title: 'DDJ-FLX4 Trainer',
      description: 'An interactive training tool for learning the Pioneer DDJ-FLX4 DJ controller, helping users master controls, effects, and mixing techniques.',
      tags: ['React', 'Music', 'DJ'],
      url: 'https://ddj-flx4-trainer-react.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
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
      title: 'AI Explorer',
      description: 'An interactive application for exploring and experimenting with artificial intelligence concepts and capabilities.',
      tags: ['React', 'AI', 'Interactive'],
      url: 'https://app-dun-phi.vercel.app/',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2a4 4 0 014 4c0 1.1-.45 2.1-1.17 2.83L12 12l-2.83-3.17A4 4 0 0112 2z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 12l4.24 4.24M12 12l-4.24 4.24M12 12v6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="21" r="1" fill="currentColor" />
          <circle cx="16.24" cy="16.24" r="1" fill="currentColor" />
          <circle cx="7.76" cy="16.24" r="1" fill="currentColor" />
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
    }
  ]

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-8 relative z-1 max-[768px]:py-12 max-[768px]:px-4 scroll-mt-20" style={{ background: 'linear-gradient(180deg, var(--bg-tertiary) 0%, var(--bg-primary) 100%)' }}>
      <div className="container">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Projects</h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Things I've built and shipped
        </p>

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
      </div>
    </section>
  )
}

export default ProjectsSection
