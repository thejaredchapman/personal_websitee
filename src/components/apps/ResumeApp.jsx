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

const tagStyle = { background: 'var(--bg-primary)', color: 'var(--text-tertiary)', border: '1px solid var(--border-light)' }
const badgeStyle = { background: 'var(--accent-100)', color: 'var(--accent-700)' }

function ResumeApp() {
  return (
    <div className="p-6 max-[768px]:p-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Resume</h2>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Experience, education & skills</p>
        </div>
        <a
          href="/jared_chapman_resume.html"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium no-underline transition-all hover:opacity-80"
          style={{ background: 'var(--accent-500)', color: 'white' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          View Full Resume
        </a>
      </div>

      {/* Summary */}
      <div className="rounded-xl p-4 border mb-6" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--accent-500)' }}>Developer educator and engineer for Claude and LLM platforms</p>
        <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{summary}</p>
        <div className="flex flex-wrap gap-1">
          {competencies.map((c) => (
            <span key={c} className="text-[10px] py-0.5 px-1.5 rounded font-mono" style={tagStyle}>{c}</span>
          ))}
        </div>
      </div>

      {/* Experience */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Experience</h3>
      <div className="flex flex-col gap-4 mb-6">
        {experience.map((exp) => (
          <div key={exp.company} className="rounded-xl p-4 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
            <div className="flex items-start justify-between mb-1 max-[768px]:flex-col max-[768px]:gap-1">
              <div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{exp.role}</h4>
                <p className="text-xs font-medium" style={{ color: 'var(--accent-500)' }}>{exp.company}</p>
              </div>
              <span className="text-[11px] font-mono shrink-0" style={{ color: 'var(--text-tertiary)' }}>{exp.period}</span>
            </div>
            <ul className="mt-2 flex flex-col gap-1 list-none p-0 m-0">
              {exp.bullets.map((b, i) => (
                <li key={i} className="text-xs leading-relaxed flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--accent-400)' }} />
                  <span>{b.lead && <strong style={{ color: 'var(--text-primary)' }}>{b.lead} </strong>}{b.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Portfolio */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Portfolio: guides, tools and writing</h3>
      <div className="flex flex-col gap-3 mb-6">
        {portfolio.map((proj) => (
          <a
            key={proj.name}
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl p-4 border no-underline transition-all duration-200 hover:border-[var(--accent-300)]"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)', color: 'inherit' }}
          >
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{proj.name}</h4>
              <span className="text-[10px] py-0.5 px-2 rounded-full font-medium" style={badgeStyle}>{proj.status}</span>
            </div>
            <p className="text-[10px] font-mono mb-2" style={{ color: 'var(--text-tertiary)' }}>{proj.meta}</p>
            <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>
            <div className="flex flex-wrap gap-1">
              {proj.tags.map((tag) => (
                <span key={tag} className="text-[10px] py-0.5 px-1.5 rounded font-mono" style={tagStyle}>{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

      <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Developer Improvements</p>
      <div className="flex flex-col gap-3 mb-6">
        {devImprovements.map((proj) => (
          <a
            key={proj.name}
            href={proj.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl p-4 border no-underline transition-all duration-200 hover:border-[var(--accent-300)]"
            style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-light)', color: 'inherit' }}
          >
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>{proj.name}</h4>
              <span className="text-[10px] py-0.5 px-2 rounded-full font-medium" style={badgeStyle}>{proj.status}</span>
            </div>
            <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--text-secondary)' }}>{proj.description}</p>
            <div className="flex flex-wrap gap-1">
              {proj.tags.map((tag) => (
                <span key={tag} className="text-[10px] py-0.5 px-1.5 rounded font-mono" style={tagStyle}>{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>

      {/* Speaking and performance */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Speaking and Performance</h3>
      <ul className="flex flex-col gap-2 mb-6 list-none p-0 m-0">
        {speaking.map((s) => (
          <li key={s} className="text-xs leading-relaxed py-2 px-3 rounded-lg" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>{s}</li>
        ))}
      </ul>

      {/* Education */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Education</h3>
      <div className="flex flex-col gap-2 mb-6">
        {education.map((edu) => (
          <div key={edu.school} className="flex items-center justify-between gap-3 py-2 px-3 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{edu.degree}</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{edu.school}</p>
              {edu.focus && <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{edu.focus}</p>}
            </div>
            <span className="text-[11px] font-mono shrink-0" style={{ color: 'var(--text-tertiary)' }}>{edu.year}</span>
          </div>
        ))}
      </div>

      {/* Anthropic Academy */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Anthropic Academy</h3>
      <div className="py-2 px-3 rounded-lg mb-6" style={{ background: 'var(--bg-secondary)' }}>
        <p className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Course certificates ({academy.count})</p>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Including {academy.highlights.join(', ')}</p>
      </div>

      {/* Skills */}
      <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--accent-500)' }}>Skills</h3>
      <div className="flex flex-col gap-3">
        {skillCategories.map((cat) => (
          <div key={cat.label}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--text-tertiary)' }}>{cat.label}</p>
            <div className="flex flex-wrap gap-1.5">
              {cat.skills.map((s) => (
                <span key={s} className="text-[11px] py-1 px-2.5 rounded-full font-medium" style={badgeStyle}>{s}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResumeApp
