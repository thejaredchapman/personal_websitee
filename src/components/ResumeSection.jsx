import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

function ResumeSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 })
  const [expRef, visibleExp] = useStaggerAnimation(4, { baseDelay: 200 })
  const [eduRef, visibleEdu] = useStaggerAnimation(2, { baseDelay: 150 })
  const [certRef, visibleCerts] = useStaggerAnimation(8, { baseDelay: 150 })
  const [skillsRef, visibleSkills] = useStaggerAnimation(38, { baseDelay: 40 })

  const experience = [
    {
      title: 'Developer Support, Generative AI Applications',
      company: 'AbbVie | Los Angeles, California',
      period: 'August 2024 - Present',
      bullets: [
        "As the organization's first Claude Code practitioner, built the enablement system around it: a Python Stop hook cost tracker deployed via an idempotent installer, an interactive React setup guide, a 75-slide training deck covering all 5 Claude Code extension points (CLAUDE.md, subagents, skills, MCP, hooks) with hands-on exercises, and a 1-hour compliance-forward training session with facilitator guide and handout.",
        "Ran recurring Claude Code office hours and scheduled 1:1 install support, and filed Jira tickets to the owning teams for friction that surfaced there, closing the loop between the field and the people who could fix it.",
        "Delivered live Claude Code demonstrations across 5 global regions (Americas, Latin America, Germany, England, Japan) in 1:1 pairing and group sessions. One demo led to a CRISPR research application that eliminated a $75,000/year external consultant: built the first draft, handed it off, and helped tune it as newer models shipped. Another, an Angular-to-React migration, was verified by the developer as cutting 4 months of development time.",
        "Coached sales teams on what AbbVie's AI offering made available and gave demos to sellers, scientists, and manufacturing audiences.",
        "Shipped a 16-page gamified Claude Code learning platform: 3,500 registered users at a 28-minute average session versus the 4-5 minute norm for documentation, 76% quiz completion, and a GxP compliance page that reduced related support requests 30%. Shipped AI Workflow Magic (Next.js, 60+ templates): 2,000+ users in three months, 87% quiz completion, cutting prompt-writing time from 15+ minutes to under 2.",
        "Built with tool use and MCP: the 4D Orchestrator MCP Server (TypeScript), two FastMCP servers around an Enterprise RAG pipeline (40+ developer questions answered per week, zero compliance policy violations), and support for teams adopting Figma's MCP server with Claude Code.",
        "Built ILIAD Lite LiteLLM Model Explorer (solo, full-stack) after the org's migration to LiteLLM across Amazon Bedrock, Microsoft Azure, and Google Vertex AI: 800+ internal users, comparison time cut from 15-20 minutes to 45 seconds, LLM-as-judge grades validated at 92% accuracy against human expert scoring.",
        "Facilitated monthly technical sessions for ~300 engineers across 7 internal developer communities; assisted Anthropic's team during an on-site Claude Code presentation at AbbVie, pairing it with follow-up support and documentation.",
        "Authored org-wide API integration guides, LLM troubleshooting playbooks, the \"Should I?\" decision framework, and Responsible AI and PII guidance with legal, security, and privacy teams.",
      ],
    },
    {
      title: 'Software Engineer',
      company: 'Google | Chicago, Illinois',
      period: 'September 2022 - May 2024',
      bullets: [
        'Refactored Searchmark\'s internal API using Java gRPC and Protocol Buffers, reducing integration friction for new engineering teams onboarding to the service.',
        'Reduced CPU usage for distributed query execution across Google\'s internal performance testing infrastructure through automated deployment.',
        'Extended the BigQuery Python API for public release -- implemented and tested datetime method APIs using Pandas, Ibis, and PyArrow, directly enabling external developer adoption at scale.',
        'Contributed microsecond datetime support to the Ibis open-source library -- implemented cross-compatibility with Pandas for SQL-via-Python operations; used in production by data engineers globally.',
        'Authored the engineering architecture and implementation design document for a new BigQuery DataFrames feature end-to-end.',
      ],
    },
    {
      title: 'Team Lead, Appraisal Operations',
      company: 'Guaranteed Rate | Chicago, Illinois',
      period: 'May 2018 - September 2021',
      bullets: [
        'Managed appraisal workflows, escalations, and cross-functional service delivery across three simultaneous client accounts; built operational dashboards from multi-system data to streamline reporting.',
      ],
    },
  ]

  const education = [
    {
      degree: 'Software Engineering Bootcamp',
      school: 'Multiverse',
      year: '2022 - 2024',
      focus: 'Apprenticeship-based full-stack engineering program; deployed production code to Google\'s codebase during the program.',
    },
    {
      degree: 'B.S., Communications',
      school: 'Georgia State University',
      year: '2014',
      focus: '',
    },
  ]

  const certifications = [
    { name: 'Claude Code in Action', org: 'Anthropic', year: '2026' },
    { name: 'Claude Code 101', org: 'Anthropic', year: '2026' },
    { name: 'Claude 101', org: 'Anthropic', year: '2026' },
    { name: 'AI Fluency: Framework & Foundations', org: 'Anthropic', year: '2026' },
    { name: 'Introduction to Agent Skills', org: 'Anthropic', year: '2026' },
    { name: 'Introduction to Claude Cowork', org: 'Anthropic', year: '2026' },
    { name: 'Introduction to Subagents', org: 'Anthropic', year: '2026' },
    { name: 'Model Context Protocol: Advanced Topics', org: 'Anthropic', year: '2026' },
    { name: 'Building with the Claude API', org: 'Anthropic', year: '2026' },
    { name: 'Claude with Amazon Bedrock', org: 'Anthropic', year: '2026' },
    { name: 'AI capabilities and limitations', org: 'Anthropic', year: '2026' },
    { name: 'Introduction to Claude Tag', org: 'Anthropic', year: '2026' },
  ]

  const skillCategories = [
    {
      label: 'AI / LLM',
      skills: ['Large Language Models', 'Generative AI', 'RAG', 'Prompt Engineering', 'Claude Code', 'Anthropic API', 'LiteLLM', 'FAISS', 'MCP'],
    },
    {
      label: 'Languages',
      skills: ['Python', 'JavaScript', 'TypeScript', 'Java'],
    },
    {
      label: 'Frontend',
      skills: ['React 18', 'Tailwind CSS', 'Vite'],
    },
    {
      label: 'Backend & APIs',
      skills: ['FastAPI', 'Flask', 'REST API Design', 'gRPC', 'Protocol Buffers', 'GraphQL', 'SSE'],
    },
    {
      label: 'Data & Cloud',
      skills: ['GCP', 'BigQuery', 'PostgreSQL', 'PyArrow', 'Pandas'],
    },
    {
      label: 'Developer Enablement',
      skills: ['Developer Relations', 'Technical Documentation', 'Solutions Engineering', 'Technical Training', 'Community Building'],
    },
    {
      label: 'Tooling',
      skills: ['Git', 'GitHub', 'Agile', 'Automated Testing', 'CI/CD'],
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

            {/* Projects */}
            <div className="mb-12">
              <h3 className={`text-2xl mb-6 flex items-center gap-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ color: 'var(--text-primary)' }}>
                <span className="inline-flex w-7 h-7" style={{ color: 'var(--accent-500)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                  </svg>
                </span>
                Projects
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  {
                    name: 'EvalForge Lite',
                    status: 'Open Source',
                    description: "Open-source tool for choosing an AI model with evidence instead of guesswork. Write a prompt and grading rubric, pick up to 4 models, and compare them side by side, including the same model on OpenRouter, Amazon Bedrock, Google Vertex AI, and Microsoft Foundry. Scores every response with an LLM judge and six criteria, compares latency, tokens per second, and cost with a \"what matters most\" selector, screens prompts against your company policy, exports PDF and CSV reports, and ships as an MCP server (9 tools, installable with uvx evalforge-lite) and a Claude Code plugin. Engineering: Python and Flask with no database, thin REST clients (AWS SigV4 signing through botocore), a single gateway that routes every call to the right backend, input validation against SSRF, secret scrubbing on every error message, and 568 automated tests that never touch the network. Built with Claude Code using a spec, plan, implement loop with independent reviewer agents.",
                    tags: ['Python', 'Flask', 'Amazon Bedrock', 'Vertex AI', 'Foundry', 'MCP', 'Claude Code'],
                  },
                  {
                    name: 'ILIAD LiteLLM Model Explorer',
                    status: 'Production',
                    description: 'Full-stack LLM API gateway built solo from scratch: FastAPI async backend serving 160+ models across 6 providers, A/B multi-model comparison, LLM-as-judge grading across 5 dimensions, real-time token tracking, and rate limiting. 111 automated tests across 10 suites. Enterprise-deployed at AbbVie.',
                    tags: ['Python', 'FastAPI', 'React 18', 'Tailwind CSS', 'Vite', 'LiteLLM', 'FAISS', 'Claude Code'],
                  },
                  {
                    name: 'Enterprise RAG Pipeline',
                    status: 'Production',
                    description: 'Natural language access layer over 8 enterprise data repositories -- 2,800+ document chunks, L2-normalized vector embeddings, cosine-similarity caching, automated compliance enforcement (GxP, data classification, security policy). Discourse bot for auto-cited AI replies. Built solo in Python.',
                    tags: ['Python', 'Flask', 'FAISS', 'GPT-4o', 'LiteLLM', 'SSE', 'Discourse API'],
                  },
                  {
                    name: 'BigQuery DataFrames Python API (Google)',
                    status: 'Open Source',
                    description: "Extended Google's BigQuery DataFrames public Python API with datetime method support. Contributed microsecond datetime cross-compatibility to the Ibis open-source library -- used in production by data engineers globally.",
                    tags: ['Python', 'BigQuery', 'Pandas', 'Ibis', 'PyArrow'],
                  },
                ].map((proj, index) => (
                  <div key={proj.name} className={`card transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: `${400 + index * 100}ms` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg" style={{ color: 'var(--text-primary)' }}>{proj.name}</h4>
                      <span className="text-xs py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>{proj.status}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="text-xs py-0.5 px-2 rounded font-mono" style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className={`text-sm font-semibold uppercase tracking-widest mt-8 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: 'var(--text-tertiary)', transitionDelay: '700ms' }}>Developer Improvements</p>
              <div className="flex flex-col gap-4">
                {[
                  { name: 'Claude Code Usage Guard', status: 'Open Source', description: 'A drop-in Claude Code Stop hook that logs per-turn cost, tracks rolling 12-hour and daily spend across all open sessions, and alerts on cost, token, and context-window thresholds. One-command install.', tags: ['Claude Code', 'Hooks', 'Cost Tracking'], url: 'https://github.com/thejaredchapman/claude-code-usage-guard' },
                  { name: '4D Orchestrator MCP', status: 'Open Source', description: 'An MCP server enabling multi-agent orchestration using the 4D framework for complex AI workflow coordination.', tags: ['MCP', 'AI', 'Orchestration'], url: 'https://github.com/thejaredchapman/4d-orchestrator-mcp' },
                  { name: 'Claude Code Deep Dive', status: 'Open Source', description: 'A comprehensive presentation deck for a technical deep dive into Claude Code architecture, features, and best practices.', tags: ['Claude Code', 'Deck', 'AI'], url: 'https://github.com/thejaredchapman/claude-code-deep-dive-deck' },
                  { name: 'AI Coding Assistant Guide', status: 'Open Source', description: 'An interactive guide to choosing and getting the most out of AI coding assistants, covering tools, workflows, and practical usage patterns.', tags: ['AI', 'Coding Assistants', 'Guide'], url: 'https://ai-coding-assistants-guide.vercel.app/' },
                  { name: 'AI Explained: Deep Learn', status: 'Open Source', description: 'Deep learning concepts explained clearly, bridging the gap between AI theory and practical implementation.', tags: ['AI', 'Deep Learning', 'Education'], url: 'https://github.com/thejaredchapman/ai_explained_deep_learn' },
                  { name: 'Ask the Docs', status: 'Open Source', description: 'A documentation query tool that lets you ask natural language questions against any codebase or documentation set.', tags: ['AI', 'RAG', 'Developer Tools'], url: 'https://github.com/thejaredchapman/ask-the-docs' },
                ].map((proj, index) => (
                  <a
                    key={proj.name}
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`card no-underline group transition-all duration-700 hover:border-[var(--accent-300)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ color: 'inherit', transitionDelay: `${700 + index * 80}ms` }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-lg" style={{ color: 'var(--text-primary)' }}>{proj.name}</h4>
                      <span className="text-xs py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>{proj.status}</span>
                    </div>
                    <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag) => (
                        <span key={tag} className="text-xs py-0.5 px-2 rounded font-mono" style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}>{tag}</span>
                      ))}
                    </div>
                  </a>
                ))}
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
