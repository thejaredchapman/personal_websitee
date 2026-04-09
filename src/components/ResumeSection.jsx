import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

function ResumeSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 })
  const [expRef, visibleExp] = useStaggerAnimation(4, { baseDelay: 200 })
  const [eduRef, visibleEdu] = useStaggerAnimation(2, { baseDelay: 150 })
  const [certRef, visibleCerts] = useStaggerAnimation(4, { baseDelay: 150 })
  const [skillsRef, visibleSkills] = useStaggerAnimation(23, { baseDelay: 40 })

  const experience = [
    {
      title: 'Developer Support Engineer',
      team: 'ILIAD & Go/AI Team | Supporting & Educating Users and Developers of various LLMs (Large Language Models)',
      company: 'AbbVie | Los Angeles, California',
      period: 'August 2024 - Now',
      bullets: [
        'Led org-wide AI enablement for AbbVie employees across functions — advising on prompting strategies, model selection for data ingestion, and how to transform data structures based on tool and use case requirements.',
        'Built and led monthly technical sessions for ~300 engineers on Go/AI, AbbVie\'s enterprise AI platform — covering RAG architecture, tokenization, and REST API integration. Paired group sessions with 1:1 support to ensure engineers understood not just how to use the system but why it works.',
        'Served as primary technical liaison between engineering and cross-functional partner teams, owning escalation and resolution workflows for LLM REST API integration failures — diagnosing unexpected behavior, reproducing failures in isolation, and coordinating fixes with engineering.',
        'Authored canonical API documentation, troubleshooting guides, and setup resources adopted org-wide; reduced new-engineer onboarding friction through structured Claude Code environment configuration and step-by-step integration walkthroughs.',
        'Consulted engineering teams on LLM model selection, architectural fit, and Responsible AI standards, translating business requirements into technical configurations and ensuring alignment with enterprise security and compliance constraints.',
        'Designed and deployed LLM-powered developer tooling using Claude and other large language models, enabling engineers to query enterprise data via natural language and accelerating internal AI capability development.',
      ],
    },
    {
      title: 'Software Engineer',
      team: 'Google Searchmark | Search performance tools for capacity & latency',
      company: 'Google | Chicago, Illinois',
      period: 'August 2023 - May 2024',
      bullets: [
        'Refactored the Searchmark API using Java gRPC and Protocol Buffers, improving client onboarding efficiency and reducing integration friction for new consumers.',
        'Designed testable, maintainable code architecture for a critical internal performance measurement tool used across Google engineering teams.',
        'Reduced CPU usage for distributed query execution across Google\'s internal performance testing infrastructure via automated deployment.',
        'Maintained high test coverage through interface-driven unit tests, keeping the Searchmark codebase reliable for downstream partner teams.',
      ],
    },
    {
      title: 'Software Engineer',
      team: 'Google BigQuery | BigQuery DataFrames',
      company: 'Google | Chicago, Illinois',
      period: 'September 2022 - August 2023',
      bullets: [
        'Extended the BigQuery Python API for public release, writing and testing datetime method APIs using Pandas, Ibis, and PyArrow — directly enabling external developer adoption at scale.',
        'Authored a full design document outlining engineering architecture and implementation plan for a new BigQuery DataFrames feature (PRD-equivalent).',
        'Contributed to the Ibis open-source library for cross-compatibility with Pandas, supporting the broader ecosystem of developers building on BigQuery.',
        'Built automated test suites and debugged edge cases to meet quality standards ahead of public API releases for external partners.',
      ],
    },
    {
      title: 'Appraisal Desk Team Lead',
      company: 'Guaranteed Rate | Chicago, Illinois',
      period: 'May 2018 - September 2021',
      bullets: [
        'Managed appraisal order workflows, issue escalations, and cross-functional service support across three client companies simultaneously.',
        'Built daily operational dashboards by compiling and cleaning multi-system data, streamlining department reporting.',
      ],
    },
  ]

  const education = [
    {
      degree: 'Software Engineering Bootcamp',
      school: 'Multiverse',
      year: '2024',
      focus: 'Full-stack software engineering and Agile project management; contributed directly to Google\'s production codebase.',
    },
    {
      degree: 'Bachelor of Science',
      school: 'Georgia State University',
      year: '2014',
      focus: '',
    },
  ]

  const certifications = [
    { name: 'Claude Code in Action', org: 'Anthropic', year: '2026' },
    { name: 'AI Fluency: Framework & Foundations', org: 'Anthropic', year: '2026' },
    { name: 'Fundamentals to Become a Machine Learning Engineer', org: 'LinkedIn Learning', year: '2026' },
    { name: 'Google Data Analytics Professional Certificate', org: 'Coursera', year: '2022' },
  ]

  const skillCategories = [
    {
      label: 'Languages',
      skills: ['Python', 'Java', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      label: 'Partner Support',
      skills: ['Technical Troubleshooting', 'Community Programs', 'Scaled Enablement', 'Program Management'],
    },
    {
      label: 'APIs & Infra',
      skills: ['gRPC', 'Protocol Buffers', 'REST API Design', 'GCP'],
    },
    {
      label: 'Data',
      skills: ['BigQuery', 'PostgreSQL'],
    },
    {
      label: 'AI / LLM',
      skills: ['LLM Integration', 'Prompt Engineering', 'Claude Code', 'Generative AI', 'RAG'],
    },
    {
      label: 'Tooling',
      skills: ['Git', 'GitHub', 'Agile', 'Automated Testing', 'Technical Documentation'],
    },
  ]

  let skillIndex = 0

  return (
    <section ref={sectionRef} id="resume" className="py-20 px-8 relative z-1 max-[768px]:py-12 max-[768px]:px-4 scroll-mt-20" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="container">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Resume</h2>

        <div className="grid grid-cols-[2fr_1fr] gap-12 max-[968px]:grid-cols-1">
          <div>
            {/* Experience */}
            <div className="mb-12">
              <h3 className={`text-2xl mb-6 flex items-center gap-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ color: 'var(--text-primary)' }}>
                <span className="inline-flex w-7 h-7" style={{ color: 'var(--accent-500)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
                  </svg>
                </span>
                Professional Experience
              </h3>
              <div ref={expRef} className="relative pl-8 timeline-line">
                {experience.map((job, index) => (
                  <div
                    key={index}
                    className={`relative mb-6 group transition-all duration-700 ${visibleExp.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  >
                    <div className="absolute -left-8 top-6 w-3 h-3 rounded-full border-[3px] shadow-[0_0_0_3px_var(--accent-light)] transition-all duration-300 group-hover:scale-150" style={{ background: 'var(--accent-primary)', borderColor: 'var(--bg-primary)' }}></div>
                    <div className="card ml-4">
                      <span className="inline-block py-1 px-3 rounded-full text-sm font-semibold mb-3" style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>{job.period}</span>
                      <h4 className="text-xl mb-1" style={{ color: 'var(--text-primary)' }}>{job.title}</h4>
                      <p className="font-medium mb-1" style={{ color: 'var(--accent-secondary)' }}>{job.company}</p>
                      {job.team && <p className="text-sm italic mb-3" style={{ color: 'var(--text-secondary)' }}>{job.team}</p>}
                      <ul className="space-y-1.5 pl-4">
                        {job.bullets.map((bullet, i) => (
                          <li key={i} className="leading-relaxed text-sm list-disc" style={{ color: 'var(--text-secondary)' }}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-12">
              <h3 className={`text-2xl mb-6 flex items-center gap-3 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ color: 'var(--text-primary)' }}>
                <span className="inline-flex w-7 h-7" style={{ color: 'var(--accent-500)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
                  </svg>
                </span>
                Education
              </h3>
              <div ref={eduRef} className="grid gap-6">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className={`card relative pl-20 max-[480px]:pl-6 transition-all duration-700 ${visibleEdu.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-extrabold max-[480px]:static max-[480px]:translate-y-0 max-[480px]:block max-[480px]:mb-2" style={{ color: 'var(--accent-500)' }}>{edu.year}</span>
                    <h4 className="text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{edu.degree}</h4>
                    <p className="mb-1" style={{ color: 'var(--text-secondary)' }}>{edu.school}</p>
                    {edu.focus && <p className="text-sm font-medium" style={{ color: 'var(--accent-secondary)' }}>{edu.focus}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-12">
              <h3 className={`text-2xl mb-6 flex items-center gap-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ color: 'var(--text-primary)' }}>
                <span className="inline-flex w-7 h-7" style={{ color: 'var(--accent-500)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </span>
                Certifications
              </h3>
              <div ref={certRef} className="grid gap-4">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className={`card relative pl-20 max-[480px]:pl-6 transition-all duration-700 ${visibleCerts.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-extrabold max-[480px]:static max-[480px]:translate-y-0 max-[480px]:block max-[480px]:mb-2" style={{ color: 'var(--accent-500)' }}>{cert.year}</span>
                    <h4 className="text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{cert.name}</h4>
                    <p className="mb-1" style={{ color: 'var(--text-secondary)' }}>{cert.org}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Open Source */}
            <div className="mb-12">
              <h3 className={`text-2xl mb-6 flex items-center gap-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ color: 'var(--text-primary)' }}>
                <span className="inline-flex w-7 h-7" style={{ color: 'var(--accent-500)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                </span>
                Open Source Contribution
              </h3>
              <div className={`card transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h4 className="text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Ibis</h4>
                <p className="font-medium mb-2" style={{ color: 'var(--accent-secondary)' }}>June 2023</p>
                <ul className="space-y-1.5 pl-4">
                  <li className="leading-relaxed text-sm list-disc" style={{ color: 'var(--text-secondary)' }}>Open source Python library that enables users to make SQL with Python without knowing how to write SQL.</li>
                  <li className="leading-relaxed text-sm list-disc" style={{ color: 'var(--text-secondary)' }}>Added microsecond method and tests for user precision.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="max-[968px]:grid max-[968px]:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] max-[968px]:gap-8">
            {/* Skills */}
            <div className={`rounded-2xl p-8 shadow-[var(--card-shadow)] mb-8 max-[968px]:mb-0 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ background: 'var(--card-bg)' }}>
              <h3 className="text-2xl mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                <span className="inline-flex w-7 h-7" style={{ color: 'var(--accent-500)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                Skills
              </h3>
              <div ref={skillsRef} className="space-y-5">
                {skillCategories.map((cat) => (
                  <div key={cat.label}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--accent-secondary)' }}>{cat.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => {
                        const idx = skillIndex++
                        return (
                          <span
                            key={skill}
                            className={`py-1.5 px-3 rounded-full text-sm font-medium cursor-default transition-all duration-300 hover:translate-y-[-3px] hover:scale-105 hover:shadow-[0_4px_12px_rgba(249,115,22,0.4)] ${visibleSkills.has(idx) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                            style={{ background: 'linear-gradient(135deg, var(--accent-light), var(--accent-lighter))', color: 'var(--accent-dark)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, var(--accent-500), var(--accent-600))'; e.currentTarget.style.color = 'var(--white)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, var(--accent-light), var(--accent-lighter))'; e.currentTarget.style.color = 'var(--accent-dark)' }}
                          >
                            {skill}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download Resume */}
            <div className={`card text-center py-10 px-8 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--accent-500)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
              </div>
              <h4 className="text-xl mb-2" style={{ color: 'var(--text-primary)' }}>Download Full Resume</h4>
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>View the full resume with all details</p>
              <a href="/jared_chapman_resume.html" target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Resume</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection
