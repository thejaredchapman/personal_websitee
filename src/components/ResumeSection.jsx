import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

function ResumeSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 })
  const [expRef, visibleExp] = useStaggerAnimation(4, { baseDelay: 200 })
  const [eduRef, visibleEdu] = useStaggerAnimation(3, { baseDelay: 150 })
  const [skillsRef, visibleSkills] = useStaggerAnimation(24, { baseDelay: 40 })

  const experience = [
    {
      title: 'Developer Support Engineer',
      team: 'ILIAD & Go/AI Team | Supporting & Educating Users and Developers of various LLMs (Large Language Models)',
      company: 'AbbVie | Los Angeles, California',
      period: 'August 2024 - Now',
      bullets: [
        'Created learning materials and educational content that explains AI concepts in accessible, layman\'s terms, empowering new users to feel comfortable adopting Enterprise AI products.',
        'Onboarded new users onto generative AI platforms, providing hands-on guidance and setting up Claude Code environments to accelerate productivity.',
        'Developed prompt engineering strategies and templates enabling users to transform and reshape their data with ease using LLM-powered tools.',
        'Provided critical support to developers by explaining features, debugging applications interfacing with LLMs, and resolving support tickets related to unexpected REST API behavior.',
      ],
    },
    {
      title: 'Software Engineer',
      team: 'Google Searchmark | Search performance tools for capacity & latency',
      company: 'Google | Chicago, Illinois',
      period: 'August 2023 - May 2024',
      bullets: [
        'Refactored Searchmark API using agile changes with Java protocol buffers (gRPC) Microservices to improve user results communication, enhancing client onboarding efficiency.',
        'Designed the code architecture, integrating OOP principles in Java to ensure easy testing and maintainability for critical performance tools.',
        'Supported Google infrastructure performance testing tool by lowering CPU usage for distributed systems.',
        'Deployed code over Google\'s internal and automated testing framework to enhance CPU usage.',
      ],
    },
    {
      title: 'Software Engineer',
      team: 'Google BigQuery | BigQuery DataFrames',
      company: 'Google | Chicago, Illinois',
      period: 'September 2022 - August 2023',
      bullets: [
        'Wrote, expanded, refactored and tested BigQuery Python API as well as BQ Dataframes API, writing accommodating documentation.',
        'Planned and authored a design document that outlined engineering solutions and architecture for a new feature for BQ Dataframes.',
        'Executed plans by writing and testing datetime method APIs using Pandas, Ibis, and PyArrow Python libraries for public release, supporting team unit functions.',
        'Contributed to Ibis open source to ensure cross-functionality between Ibis and Pandas libraries, a key tool for data handling.',
      ],
    },
    {
      title: 'Appraisal Desk Team Lead',
      company: 'Guaranteed Rate | Chicago, Illinois',
      period: 'May 2018 - September 2021',
      bullets: [
        'Created daily dashboards for the department using Microsoft Excel by compiling and cleaning data from various sources.',
        'Monitored and processed appraisal orders, issues and escalations for various mortgage executives, underwriting teams, appraisers, and other clients.',
        'Provided cross-functional service support while managing an appraisal desk solely for three simultaneous companies.',
        'Led appraisal desk operations, coordinating workflows and resolving escalations to ensure timely completion of mortgage processes.',
      ],
    },
  ]

  const education = [
    {
      degree: 'Multiverse Bootcamp',
      school: 'Multiverse',
      year: '2024',
      focus: 'Learned the fundamentals of Software Development while contributing to Google\'s codebase. Software engineer and project manager for full stack projects utilizing Agile frameworks.',
    },
    {
      degree: 'Google Data Analytics Professional Certificate',
      school: 'Coursera',
      year: '2022',
      focus: 'Learned the fundamentals of Data Analytics using R, Tableau.',
    },
    {
      degree: 'Bachelors of Science',
      school: 'Georgia State University',
      year: '2014',
      focus: '',
    },
  ]

  const skillCategories = [
    {
      label: 'Languages',
      skills: ['Python', 'Java', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      label: 'Technologies',
      skills: ['API Design', 'React', 'Angular', 'Spring Boot', 'Github', 'Django', 'Testing', 'Documentation'],
    },
    {
      label: 'Other',
      skills: ['PostgreSQL', 'GCP', 'Git / Version Control', 'Protocol Buffers', 'Improvisational Comedy Performer', 'SDLC'],
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
              <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>Get the complete PDF version with all details</p>
              <a href="/resume.pdf" download className="btn btn-primary">Download Resume</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResumeSection
