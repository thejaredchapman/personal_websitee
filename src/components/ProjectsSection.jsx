import { useState } from 'react'
import './ProjectsSection.css'

function ProjectsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

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
    <section id="projects" className="projects-section">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">
          Things I've built and shipped
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card card"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === index && (
                <div className="project-preview">
                  <iframe
                    src={project.url}
                    title={`${project.title} preview`}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="project-card-icon">{project.icon}</div>
              <h3 className="project-card-title">{project.title}</h3>
              <p className="project-card-description">{project.description}</p>
              <div className="project-card-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
              <span className="project-card-link">
                Visit Project
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
