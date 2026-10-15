import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const summary = "Built AI enablement at AbbVie from zero as its first Claude Code practitioner. Supported 5,000+ developers on using AI, fixing REST API errors, and transforming their data. Trained and consulted for technical and non-technical audiences, and demoed Claude Code across five regions. Built a learning platform with 3,500 registered users (28-minute average session) and the guidance other teams used to run their own demos under GxP rules. Builds the tooling hands-on: RAG, MCP servers, skills, hooks, and LLM-as-judge evals across Bedrock, Vertex AI, and Azure. Ten years of Chicago improv (The Second City, iO, The Annoyance); now training at The Groundlings."

const competencies = [
  'Technical curriculum, demos and hands-on labs', 'Developer support at scale', 'Claude API and Claude Code',
  'MCP servers, skills and hooks', 'Bedrock, Vertex AI and Azure', 'LLM evaluation',
  'Responsible AI and compliance guidance', 'Live facilitation',
]

const experience = [
  {
    role: 'Developer Support Engineer, Generative AI Applications',
    company: 'AbbVie — Los Angeles, CA',
    period: 'Aug 2024 — Present',
    bullets: [
      { lead: 'Built Claude Code enablement from zero.', text: "As AbbVie's first Claude Code practitioner, ran office hours, community trainings and demos before it was officially supported. Partnered with security, privacy and Responsible AI teams to write the guidelines and documentation for using it under GxP." },
      { lead: 'Ran demos that became products.', text: "Delivered live Claude Code demos 1:1 and to groups in North America, Latin America, Germany, the UK and Japan, on each team's own code, including a proprietary language with no public documentation. Results include an Angular-to-React migration (about 4 months saved, per the developer) and a CRISPR research tool that replaced a $75,000/year external consultant." },
      { lead: 'Equipped others to demo, and partnered with Anthropic.', text: "Wrote the guidance and blueprints other AbbVie teams used to run their own Claude Code demos within GxP limits. Supported Anthropic's on-site Claude Code presentation at AbbVie (March 2026) and turned it into sustained use with follow-up support and documentation." },
      { lead: 'Built curriculum for technical and non-technical audiences.', text: 'A 75-slide Claude Code deck covering all five extension points with hands-on exercises; a 1-hour compliance-forward session with facilitator guide; and the "Should I?" framework, four questions to answer before using AI on regulated work, including what to do when you don\'t know your own compliance position.' },
      { lead: 'Supported developers at scale.', text: 'Worked with 5,000+ developers on understanding AI tools, resolving REST API errors and environment setup across frontend and backend stacks, and transforming their data. Onboarded 400+ engineers onto the internal ILIAD API.' },
      { lead: 'Scaled learning beyond the live session.', text: 'Claude Code Guide, a 16-page gamified learning platform: 3,500 registered users and a 28-minute average session; its compliance page cut related support requests 30%. AI Workflow Magic, a Next.js adoption platform: 2,000+ users in its first three months and 87% quiz completion. Also built an interactive React setup guide and a Python Stop hook that tracks per-turn cost and context use.' },
      { lead: 'Built content-freshness automation.', text: 'Combined six internal AbbVie libraries into one repository, with a compliance gate that refreshes each repository every 6 hours. A policy gate blocks out-of-policy questions and cites the policy violated. Exposed it through two FastMCP servers for Claude Code and Cursor; started the team Discourse forum, where a bot built on the pipeline answers 40+ developer questions a week with under 2% manual correction and zero compliance policy violations in production.' },
      { lead: 'Turned launches into usable docs and fed signal back to product.', text: "Tested other internal teams' releases hands-on, including an ontology and knowledge-graph API and MCP server, and wrote the docs developers used. Reproduced developer-reported failures, coordinated fixes with engineering, and filed product tickets from observed developer friction." },
      { lead: 'Built model-selection tooling.', text: 'ILIAD Lite Model Explorer (full-stack, solo): 160+ models across Bedrock, Azure and Vertex AI through LiteLLM, with A/B comparison and LLM-as-judge grading at 92% agreement with human expert scoring. 800+ internal users; 95% of new model evaluations use its Compare view; comparison time fell from 15–20 minutes to 45 seconds.' },
      { lead: 'Ran the developer community.', text: 'Monthly technical sessions for ~300 engineers across 7 internal developer communities; planned the launch of an internal AI Specialist Community of Practice.' },
    ],
  },
  {
    role: 'Software Engineer Apprentice (Multiverse)',
    company: 'Google — Chicago, IL',
    period: 'Sep 2022 — May 2024',
    bullets: [
      { text: "Shipped production code across the full development lifecycle in Google's codebase." },
      { text: "Extended BigQuery DataFrames, BigQuery's Python API, for public release: implemented and tested datetime methods using pandas, Ibis and PyArrow, enabling external developer adoption." },
      { text: 'Contributed microsecond datetime support to the open-source Ibis library, with cross-compatibility with pandas for SQL-via-Python operations.' },
    ],
  },
  {
    role: 'Appraisal Desk Team Lead (previously Appraisal Desk Escalations Coordinator)',
    company: 'Guaranteed Rate — Chicago, IL',
    period: 'May 2018 — Sep 2021',
    bullets: [
      { text: 'Owned end-to-end appraisal order management and escalations across Guaranteed Rate and its subsidiaries, ensuring XML, UCDP and EAD compliance on all deliverables.' },
    ],
  },
]

const portfolio = [
  {
    name: 'AI Ready Reps',
    status: 'Guide',
    meta: 'aireadyreps.com',
    description: 'A plain-English sales-enablement guide, quiz and arcade game that teach sales reps who have never used AI at work to use it safely. Rates every sales use case with a traffic-light rule (green safe, amber needs guardrails and sign-off, red never), compares six AI tools, and covers prompts, a playbook, go-to-market, and a first-week plan.',
    tags: ['Sales Enablement', 'Responsible AI', 'Quiz', 'Game'],
    url: 'https://aireadyreps.com/',
  },
  {
    name: 'The Nonprofit AI Almanac',
    status: 'Guide',
    meta: 'nonprofit-ai-almanac.vercel.app',
    description: 'A free, independent guide that teaches small nonprofit teams to use AI safely, written for non-technical readers: five short lessons, 100+ ready-made use cases with a safety light showing what is safe to paste, provider comparisons where every fact carries a source and check date and is re-checked within 90 days, and a 90-day implementation plan.',
    tags: ['Nonprofit', 'Responsible AI', 'Education'],
    url: 'https://nonprofit-ai-almanac.vercel.app/',
  },
  {
    name: 'EvalForge Lite',
    status: 'Open Source',
    meta: 'Python, Flask, MCP',
    description: 'Open-source tool for choosing a model with evidence: compare up to four models side by side across OpenRouter, Amazon Bedrock, Google Vertex AI and Microsoft Foundry, with LLM-judge scoring, latency, tokens per second, cost, a policy gate, and PDF/CSV reports. Ships on PyPI as an MCP server (9 tools, uvx evalforge-lite) and as a Claude Code plugin, with a documentation site and 568 offline tests.',
    tags: ['Python', 'Flask', 'Amazon Bedrock', 'Vertex AI', 'Foundry', 'MCP', 'Claude Code'],
    url: 'https://github.com/thejaredchapman/evalforge-lite',
  },
  {
    name: 'AI-Explorer: a field guide to AI',
    status: 'Guide',
    meta: 'Next.js, built with Claude Code',
    description: 'Interactive learning guide laid out as a seven-step ladder from concepts to building: 28 concept cards, a 68-model comparison rubric, 18 prompt techniques, and 42 build guides across 7 stacks, six of them Claude-specific, including an MCP server guide. Architecture and curation are mine; generation was done with Claude Code.',
    tags: ['Next.js', 'Claude Code', 'MCP', 'Education'],
    url: 'https://ai-explorer-theta.vercel.app',
  },
  {
    name: 'Stay the Engineer: Using AI to Get Better, Not Get Replaced',
    status: 'Medium · Sep 2026',
    meta: 'Article',
    description: "Five habits, a 30-second checklist and responsible-use rules for engineers working with AI coding tools. Core rule: if you can't explain the change, you don't own it.",
    tags: ['Writing', 'AI Coding Tools', 'Responsible AI'],
    url: 'https://medium.com/@thejaredchapman/stay-the-engineer-using-ai-to-get-better-not-get-replaced-f19d3799f19d',
  },
  {
    name: 'Meet Users Where They Are',
    status: 'Medium · Sep 2026',
    meta: 'Article',
    description: 'How AI products can detect who is on the other end and answer in a form that person can use: language, accessibility, cognitive load, device and region.',
    tags: ['Writing', 'Accessibility', 'Product'],
    url: 'https://medium.com/@thejaredchapman/meet-users-where-they-are-93441513ae60',
  },
]

const speaking = [
  "Co-led and emceed ILIAD Fest, AbbVie's yearly developer festival, for about 300 attendees in 2024 and 2025.",
  'Improv: 10 years in Chicago at The Second City, iO and The Annoyance; currently training at The Groundlings, Los Angeles.',
]

const education = [
  { school: 'Georgia State University', degree: 'B.S., Film & Video', year: '2014', focus: '' },
  { school: 'Multiverse', degree: 'Software Engineering Apprenticeship', year: '2022 - 2024', focus: "Apprenticeship-based full-stack engineering program; shipped production code to Google's codebase during the program." },
]

const academy = {
  count: 8,
  highlights: ['Building with the Claude API', 'Claude with Amazon Bedrock', 'Claude Code in Action'],
}

const skillCategories = [
  { label: 'AI and LLMs', skills: ['Claude API', 'Claude Code (skills, hooks, plugins)', 'MCP server development', 'RAG', 'LLM evaluation and LLM-as-judge', 'Prompt engineering', 'Agentic systems', 'LiteLLM', 'Responsible AI'] },
  { label: 'Cloud', skills: ['Amazon Bedrock', 'Google Vertex AI', 'Microsoft Azure and Foundry'] },
  { label: 'Developer enablement', skills: ['Technical training', 'Demos and hands-on labs', 'Developer onboarding', 'Technical documentation', 'Community building', 'Live facilitation'] },
  { label: 'Languages and frameworks', skills: ['Python', 'TypeScript', 'JavaScript', 'FastAPI', 'Flask', 'REST', 'React', 'Next.js'] },
]

const devImprovements = [
  {
    name: 'Claude Code Usage Guard',
    status: 'Open Source',
    description: 'A drop-in Claude Code Stop hook that logs per-turn cost, tracks rolling 12-hour and daily spend across all open sessions, and alerts on cost, token, and context-window thresholds. One-command install.',
    tags: ['Claude Code', 'Hooks', 'Cost Tracking'],
    url: 'https://github.com/thejaredchapman/claude-code-usage-guard',
  },
  {
    name: '4D Orchestrator MCP',
    status: 'Open Source',
    description: 'An MCP server enabling multi-agent orchestration using the 4D framework for complex AI workflow coordination.',
    tags: ['MCP', 'AI', 'Orchestration'],
    url: 'https://github.com/thejaredchapman/4d-orchestrator-mcp',
  },
  {
    name: 'Claude Code Deep Dive',
    status: 'Open Source',
    description: 'A comprehensive presentation deck for a technical deep dive into Claude Code architecture, features, and best practices.',
    tags: ['Claude Code', 'Deck', 'AI'],
    url: 'https://github.com/thejaredchapman/claude-code-deep-dive-deck',
  },
  {
    name: 'AI Coding Assistant Guide',
    status: 'Open Source',
    description: 'An interactive guide to choosing and getting the most out of AI coding assistants, covering tools, workflows, and practical usage patterns.',
    tags: ['AI', 'Coding Assistants', 'Guide'],
    url: 'https://ai-coding-assistants-guide.vercel.app/',
  },
  {
    name: 'AI Explained: Deep Learn',
    status: 'Open Source',
    description: 'Deep learning concepts explained clearly, bridging the gap between AI theory and practical implementation.',
    tags: ['AI', 'Deep Learning', 'Education'],
    url: 'https://github.com/thejaredchapman/ai_explained_deep_learn',
  },
  {
    name: 'Ask the Docs',
    status: 'Open Source',
    description: 'A documentation query tool that lets you ask natural language questions against any codebase or documentation set.',
    tags: ['AI', 'RAG', 'Developer Tools'],
    url: 'https://github.com/thejaredchapman/ask-the-docs',
  },
]

const skillCount = skillCategories.reduce((n, c) => n + c.skills.length, 0)

function SectionHeading({ icon, children, isVisible, delay = '' }) {
  return (
    <h3 className={`text-2xl mb-6 flex items-center gap-3 transition-all duration-700 ${delay} ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`} style={{ color: 'var(--text-primary)' }}>
      <span className="inline-flex w-7 h-7 shrink-0" style={{ color: 'var(--accent-500)' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{icon}</svg>
      </span>
      {children}
    </h3>
  )
}

function ProjectBody({ proj }) {
  return (
    <>
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <h4 className="text-lg" style={{ color: 'var(--text-primary)' }}>{proj.name}</h4>
        <span className="text-xs py-0.5 px-2 rounded-full font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>{proj.status}</span>
      </div>
      {proj.meta && <p className="text-xs font-mono mb-2" style={{ color: 'var(--text-tertiary)' }}>{proj.meta}</p>}
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {proj.tags.map((tag) => (
          <span key={tag} className="text-xs py-0.5 px-2 rounded font-mono" style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}>{tag}</span>
        ))}
      </div>
    </>
  )
}

function ResumeSection() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 })
  const [expRef, visibleExp] = useStaggerAnimation(experience.length, { baseDelay: 200 })
  const [eduRef, visibleEdu] = useStaggerAnimation(education.length, { baseDelay: 150 })
  const [skillsRef, visibleSkills] = useStaggerAnimation(skillCount, { baseDelay: 40 })

  let skillIndex = 0

  return (
    <section ref={sectionRef} id="resume" className="py-20 px-8 relative z-1 max-[768px]:py-12 max-[768px]:px-4 scroll-mt-20" style={{ background: 'var(--bg-tertiary)' }}>
      <div className="container">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>Resume</h2>

        <div className="grid grid-cols-[2fr_1fr] gap-12 max-[968px]:grid-cols-1">
          <div>
            {/* Summary */}
            <div className={`card mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="font-medium mb-3" style={{ color: 'var(--accent-secondary)' }}>Developer educator and engineer for Claude and LLM platforms</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{summary}</p>
              <div className="flex flex-wrap gap-1.5">
                {competencies.map((c) => (
                  <span key={c} className="text-xs py-0.5 px-2 rounded font-mono" style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }}>{c}</span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="mb-12">
              <SectionHeading isVisible={isVisible} icon={<><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></>}>Professional Experience</SectionHeading>
              <div ref={expRef} className="relative pl-8 timeline-line">
                {experience.map((job, index) => (
                  <div
                    key={job.company}
                    className={`relative mb-6 group transition-all duration-700 ${visibleExp.has(index) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  >
                    <div className="absolute -left-8 top-6 w-3 h-3 rounded-full border-[3px] shadow-[0_0_0_3px_var(--accent-light)] transition-all duration-300 group-hover:scale-150" style={{ background: 'var(--accent-primary)', borderColor: 'var(--bg-primary)' }}></div>
                    <div className="card ml-4">
                      <span className="inline-block py-1 px-3 rounded-full text-sm font-semibold mb-3" style={{ background: 'var(--accent-light)', color: 'var(--accent-dark)' }}>{job.period}</span>
                      <h4 className="text-xl mb-1" style={{ color: 'var(--text-primary)' }}>{job.role}</h4>
                      <p className="font-medium mb-3" style={{ color: 'var(--accent-secondary)' }}>{job.company}</p>
                      <ul className="space-y-1.5 pl-4">
                        {job.bullets.map((bullet, i) => (
                          <li key={i} className="leading-relaxed text-sm list-disc" style={{ color: 'var(--text-secondary)' }}>
                            {bullet.lead && <strong style={{ color: 'var(--text-primary)' }}>{bullet.lead} </strong>}{bullet.text}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            <div className="mb-12">
              <SectionHeading isVisible={isVisible} delay="delay-300" icon={<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />}>Portfolio: guides, tools and writing</SectionHeading>
              <div className="flex flex-col gap-4">
                {portfolio.map((proj, index) => (
                  <a
                    key={proj.name}
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`card no-underline group transition-all duration-700 hover:border-[var(--accent-300)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ color: 'inherit', transitionDelay: `${400 + index * 100}ms` }}
                  >
                    <ProjectBody proj={proj} />
                  </a>
                ))}
              </div>

              <p className={`text-sm font-semibold uppercase tracking-widest mt-8 mb-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ color: 'var(--text-tertiary)', transitionDelay: '700ms' }}>Developer Improvements</p>
              <div className="flex flex-col gap-4">
                {devImprovements.map((proj, index) => (
                  <a
                    key={proj.name}
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`card no-underline group transition-all duration-700 hover:border-[var(--accent-300)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ color: 'inherit', transitionDelay: `${700 + index * 80}ms` }}
                  >
                    <ProjectBody proj={proj} />
                  </a>
                ))}
              </div>
            </div>

            {/* Speaking and performance */}
            <div className="mb-12">
              <SectionHeading isVisible={isVisible} delay="delay-200" icon={<><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" /></>}>Speaking and Performance</SectionHeading>
              <div className="grid gap-4">
                {speaking.map((s) => (
                  <div key={s} className={`card transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-12">
              <SectionHeading isVisible={isVisible} delay="delay-200" icon={<><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" /></>}>Education</SectionHeading>
              <div ref={eduRef} className="grid gap-6">
                {education.map((edu, index) => (
                  <div
                    key={edu.school}
                    className={`card relative pl-40 max-[480px]:pl-6 transition-all duration-700 ${visibleEdu.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  >
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xl font-extrabold max-[480px]:static max-[480px]:translate-y-0 max-[480px]:block max-[480px]:mb-2" style={{ color: 'var(--accent-500)' }}>{edu.year}</span>
                    <h4 className="text-lg mb-1" style={{ color: 'var(--text-primary)' }}>{edu.degree}</h4>
                    <p className="mb-1" style={{ color: 'var(--text-secondary)' }}>{edu.school}</p>
                    {edu.focus && <p className="text-sm font-medium" style={{ color: 'var(--accent-secondary)' }}>{edu.focus}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Anthropic Academy */}
            <div className="mb-12">
              <SectionHeading isVisible={isVisible} delay="delay-300" icon={<><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" /></>}>Anthropic Academy</SectionHeading>
              <div className={`card transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h4 className="text-lg mb-1" style={{ color: 'var(--text-primary)' }}>Course certificates ({academy.count})</h4>
                <p style={{ color: 'var(--text-secondary)' }}>Including {academy.highlights.join(', ')}</p>
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
