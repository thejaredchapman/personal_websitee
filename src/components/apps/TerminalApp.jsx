import { useState, useRef, useEffect, useCallback } from 'react'
import { LINK_COMMAND_NAMES, getLinkCommandOutput, openLink } from '../../utils/terminalLinks'

const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  "I told my wife I was going to a comedy open mic. She said \"Don't quit your day job.\" I said \"That's literally the joke.\"",
  'A SQL query walks into a bar, walks up to two tables and asks... "Can I JOIN you?"',
  "There are only 10 types of people in the world: those who understand binary, and those who don't.",
  "Why do Java developers wear glasses? Because they can't C#.",
  "My code doesn't have bugs. It has surprise features.",
  'How do you comfort a JavaScript bug? You console it.',
  "A programmer puts two glasses on his nightstand before going to sleep. A full one in case he gets thirsty, and an empty one in case he doesn't.",
  "!false — It's funny because it's true.",
  "I'd tell you a UDP joke, but you might not get it.",
  'Why did the developer go broke? Because he used up all his cache.',
  'I have a joke about recursion, but first I have to tell you my joke about recursion.',
  'A QA engineer walks into a bar. Orders 1 beer. Orders 0 beers. Orders 99999999 beers. Orders -1 beers. Orders a lizard. Orders NULL beers.',
  "What's the object-oriented way to become wealthy? Inheritance.",
  'Hip hop and coding are the same. You start with "Hello World" and end up with bars.',
]

const ASCII_ART = [
  { text: '     ██  █████  ██████  ███████ ██████ ', type: 'accent' },
  { text: '     ██ ██   ██ ██   ██ ██      ██   ██', type: 'accent' },
  { text: '     ██ ███████ ██████  █████   ██   ██', type: 'accent' },
  { text: '██   ██ ██   ██ ██   ██ ██      ██   ██', type: 'accent' },
  { text: ' █████  ██   ██ ██   ██ ███████ ██████ ', type: 'accent' },
  { text: '' },
  { text: '██ ███████      █████      ██    ██ ███████ ██████  ██    ██', type: 'info' },
  { text: '██ ██          ██   ██     ██    ██ ██      ██   ██  ██  ██', type: 'info' },
  { text: '██ ███████     ███████     ██    ██ █████   ██████    ████', type: 'info' },
  { text: '██      ██     ██   ██      ██  ██  ██      ██   ██    ██', type: 'info' },
  { text: '██ ███████     ██   ██       ████   ███████ ██   ██    ██', type: 'info' },
  { text: '' },
  { text: ' ██████  ██████   ██████  ██', type: 'joke' },
  { text: '██      ██    ██ ██    ██ ██', type: 'joke' },
  { text: '██      ██    ██ ██    ██ ██', type: 'joke' },
  { text: '██      ██    ██ ██    ██ ██', type: 'joke' },
  { text: ' ██████  ██████   ██████  ███████', type: 'joke' },
  { text: '██████  ██      ███████ ██████  ██████', type: 'cmd' },
  { text: '██   ██ ██      ██      ██   ██ ██   ██', type: 'cmd' },
  { text: '██████  ██      █████   ██████  ██   ██', type: 'cmd' },
  { text: '██   ██ ██      ██      ██   ██ ██   ██', type: 'cmd' },
  { text: '██████  ███████ ███████ ██   ██ ██████  ██', type: 'cmd' },
  { text: '' },
  { text: '██████  ██       █████   ██████ ██   ██     ███    ██ ███████ ██████  ██████', type: 'link' },
  { text: '██   ██ ██      ██   ██ ██      ██  ██      ████   ██ ██      ██   ██ ██   ██', type: 'link' },
  { text: '██████  ██      ███████ ██      █████       ██ ██  ██ █████   ██████  ██   ██', type: 'link' },
  { text: '██   ██ ██      ██   ██ ██      ██  ██      ██  ██ ██ ██      ██   ██ ██   ██', type: 'link' },
  { text: '██████  ███████ ██   ██  ██████ ██   ██     ██   ████ ███████ ██   ██ ██████', type: 'link' },
]

function getRandomJoke() { return JOKES[Math.floor(Math.random() * JOKES.length)] }

function processCommand(input) {
  const cmd = input.trim().toLowerCase()
  const args = cmd.split(/\s+/)
  const base = args[0]

  const commands = {
    help: () => [
      { text: 'Available commands:', type: 'info' },
      { text: '' },
      { text: '  help        Show this help', type: 'cmd' },
      { text: '  claude      How this site was made', type: 'cmd' },
      { text: '  anthropic   My developer education work', type: 'cmd' },
      { text: '  about       Learn about Jared', type: 'cmd' },
      { text: '  skills      View technical skills', type: 'cmd' },
      { text: '  joke        Get a random joke', type: 'cmd' },
      { text: '  projects    List projects', type: 'cmd' },
      { text: '  experience  Work experience', type: 'cmd' },
      { text: '  writing     Articles & guides', type: 'cmd' },
      { text: '  certs       Anthropic certifications', type: 'cmd' },
      { text: '  social      Social links', type: 'cmd' },
      { text: '  hire        Get in touch', type: 'cmd' },
      { text: '  github      Open GitHub (also linkedin, instagram, spotify)', type: 'cmd' },
      { text: '  meeting     Schedule a meeting with Jared', type: 'cmd' },
      { text: '  contact     Send Jared an email (or: email)', type: 'cmd' },
      { text: '  whoami      Who are you?', type: 'cmd' },
      { text: '  ls          List files', type: 'cmd' },
      { text: '  date        Current date', type: 'cmd' },
      { text: '  echo [txt]  Echo text', type: 'cmd' },
      { text: '  sudo        Try root', type: 'cmd' },
      { text: '  matrix      Red pill?', type: 'cmd' },
      { text: '  coffee      Brew coffee', type: 'cmd' },
      { text: '  clear       Clear screen', type: 'cmd' },
      { text: '' },
      { text: '  Tip: Try some secret commands too...', type: 'dim' },
    ],
    about: () => [
      { text: '  JARED CHAPMAN', type: 'accent' },
      { text: '  GenAI Specialist · Rabbit Hole Explorer · Dog Dad', type: 'accent' },
      { text: '' },
      { text: '  Hey, I\'m Jared — GenAI specialist, professional', type: 'info' },
      { text: '  rabbit hole explorer, and proud dog dad to', type: 'info' },
      { text: '  Dr. Pugsley Bikini.', type: 'info', href: 'https://www.instagram.com/drpugsleybikini' },
      { text: '' },
      { text: '  ── What I Do ──', type: 'accent' },
      { text: '  I\'m an engineer who teaches. I build LLM tools and' },
      { text: '  agent workflows, then turn them into hands-on training,' },
      { text: '  clear docs, and working demos that help teams get real' },
      { text: '  value from AI.' },
      { text: '' },
      { text: '  Outside work, I build interactive tools that help', type: 'cmd' },
      { text: '  everyday people engage with AI on their own terms.', type: 'cmd' },
      { text: '' },
      { text: '  ── How I\'m Wired ──', type: 'accent' },
      { text: '  If I find a rabbit hole, I map every tunnel until', type: 'joke' },
      { text: '  I understand the whole thing. That\'s how I taught', type: 'joke' },
      { text: '  myself to code. That\'s just how I\'m wired.', type: 'joke' },
      { text: '' },
      { text: '  ── Life ──', type: 'accent' },
      { text: '  From Atlanta. Chicago holds my heart — where I' },
      { text: '  fell in love with fiancée Avery Wine, did improv,' },
      { text: '  and still visit for a great haircut. Now in LA.' },
      { text: '' },
      { text: '  At home: Avery & Dr. Pugsley Bikini, who', type: 'link', href: 'https://www.instagram.com/drpugsleybikini' },
      { text: '  absolutely runs the household.', type: 'link' },
      { text: '' },
      { text: '  ── Music ──', type: 'accent' },
      { text: '  Stevie Wonder is home. Sade\'s Sweetest Taboo', type: 'info' },
      { text: '  never gets old. Ring My Bell by Anita Ward', type: 'info' },
      { text: '  makes it into the rotation every single day.', type: 'info' },
      { text: '' },
      { text: '  Always open to conversations & collabs.', type: 'dim' },
      { text: '  Reach out — I love a good conversation.', type: 'dim' },
    ],
    skills: () => [
      { text: '  Languages:  Python | Java | JavaScript | HTML | CSS', type: 'info' },
      { text: '  AI/ML:      Claude Code | Anthropic API | MCP | Tool Use | Agents | Bedrock | Vertex AI | Foundry', type: 'info' },
      { text: '  Enablement: Demos | Hands-on Labs | Curriculum | Office Hours | Field Coaching | Content-Freshness Automation', type: 'info' },
      { text: '  Frameworks: React | Angular | Spring Boot | Django', type: 'info' },
      { text: '  Data:       BigQuery | Pandas | PyArrow | Ibis | PostgreSQL', type: 'info' },
      { text: '  Tools:      GCP | Git | gRPC | REST APIs', type: 'info' },
    ],
    joke: () => [
      { text: '' },
      { text: `  ${getRandomJoke()}`, type: 'joke' },
      { text: '' },
      { text: '  Run "joke" again for another one', type: 'dim' },
    ],
    projects: () => [
      { text: '  [1] AI Platform Field Guide  Claude, ChatGPT, Gemini, Copilot, sourced', type: 'accent' },
      { text: '      ai-platform-field-guide.vercel.app', type: 'link' },
      { text: '  [2] EvalForge Lite      Multi-cloud model comparison + MCP', type: 'accent' },
      { text: '      evalforge-lite.onrender.com', type: 'link' },
      { text: '  [3] Tag, You\'re It      Claude Tag course', type: 'accent' },
      { text: '      thejaredchapman.com/tag-youre-it-course.html', type: 'link' },
      { text: '  [4] AI Explorer         Core AI vocabulary', type: 'accent' },
      { text: '      ai-explorer-theta.vercel.app', type: 'link' },
      { text: '  [5] LLM Frameworks      LangChain learning', type: 'accent' },
      { text: '      langchain-learning-app.vercel.app', type: 'link' },
      { text: '  [6] PyTorch Guide       Interactive ML fundamentals', type: 'accent' },
      { text: '      pytorch-interactive-guide.vercel.app', type: 'link' },
      { text: '  [7] Break Into Tech     Cybersecurity guide', type: 'accent' },
      { text: '      break-into-tech.vercel.app', type: 'link' },
      { text: '  [8] DJ Master Academy   DDJ-FLX4 trainer', type: 'accent' },
      { text: '      dj-master-academy.vercel.app', type: 'link' },
      { text: '  [9] LoanLens            Amortization calculator', type: 'accent' },
      { text: '      amortization.vercel.app', type: 'link' },
    ],
    experience: () => [
      { text: '  [2024 - Now]  AbbVie: Developer Support, Generative AI Applications', type: 'accent' },
      { text: '                First Claude Code practitioner: office hours, 1:1 installs,' },
      { text: '                live demos in 5 regions, a 3,500-user learning platform' },
      { text: '' },
      { text: '  [2022 - 2024] Google: Software Engineer Apprentice (Multiverse)', type: 'accent' },
      { text: '                Searchmark tools, BigQuery DataFrames, Ibis open source' },
      { text: '' },
      { text: '  [2018 - 2021] Guaranteed Rate: Team Lead, Appraisal Operations', type: 'accent' },
      { text: '                Escalations, cross-functional delivery, dashboards' },
    ],
    writing: () => [
      { text: '  [1] What Is an AI Agent, Really?', type: 'accent' },
      { text: '      thejaredchapman.com/?read=what-is-an-ai-agent', type: 'link' },
      { text: '  [2] Fixing Hallucinated Tool Calls', type: 'accent' },
      { text: '      thejaredchapman.com/?read=fixing-hallucinated-tool-calls', type: 'link' },
      { text: '  [3] Does AI Know I\'m Not White?', type: 'accent' },
      { text: '      thejaredchapman.com/?read=does-ai-know-im-not-white', type: 'link' },
      { text: '  [4] Meet Users Where They Are', type: 'accent' },
      { text: '      thejaredchapman.com/?read=meet-users-where-they-are', type: 'link' },
      { text: '  [5] Stay the Engineer', type: 'accent' },
      { text: '      thejaredchapman.com/?read=stay-the-engineer', type: 'link' },
      { text: '  [6] From Vibe Coding to Agentic Engineering', type: 'accent' },
      { text: '      thejaredchapman.com/?read=vibe-coding-to-agentic-engineering', type: 'link' },
    ],
    certs: () => [
      { text: '  Anthropic certifications (12):', type: 'info' },
      { text: '  - Claude Code in Action', type: 'accent' },
      { text: '  - Claude Code 101', type: 'accent' },
      { text: '  - Claude 101', type: 'accent' },
      { text: '  - AI Fluency: Framework & Foundations', type: 'accent' },
      { text: '  - Introduction to Agent Skills', type: 'accent' },
      { text: '  - Introduction to Claude Cowork', type: 'accent' },
      { text: '  - Introduction to Subagents', type: 'accent' },
      { text: '  - Model Context Protocol: Advanced Topics', type: 'accent' },
      { text: '  - Building with the Claude API', type: 'accent' },
      { text: '  - Claude with Amazon Bedrock', type: 'accent' },
      { text: '  - AI capabilities and limitations', type: 'accent' },
      { text: '  - Introduction to Claude Tag', type: 'accent' },
    ],
    social: () => [
      { text: '  GitHub:    github.com/thejaredchapman', type: 'link' },
      { text: '  LinkedIn:  linkedin.com/in/thejaredchapman', type: 'link' },
      { text: '  Instagram: instagram.com/thejaredchapman', type: 'link' },
      { text: '  Linktree:  linktr.ee/thejaredchapman', type: 'link' },
    ],
    hire: () => [
      { text: '  Open to conversations about roles aligned with this background.', type: 'accent' },
      { text: '  If you think there is a fit, I would genuinely love to hear from you.', type: 'info' },
      { text: '  Email: thejaredchapman@gmail.com', type: 'link' },
      { text: '  Based in Los Angeles. Will relocate to SF, NYC, or Seattle.', type: 'info' },
    ],
    anthropic: () => [
      { text: '  Hey Anthropic 👋🏿  I teach developers to build with Claude.', type: 'accent' },
      { text: '  Here is the developer-education evidence:', type: 'accent' },
      { text: '' },
      { text: '  ── Launches → field-ready content ──', type: 'accent' },
      { text: '  • AI Platform Field Guide: plans, API pricing, models, privacy,', type: 'info' },
      { text: '    200 use cases. A weekly Claude Haiku routine checks for news', type: 'info' },
      { text: '    and logs changes with sources (content-freshness automation)', type: 'info' },
      { text: '  • Tag, You\'re It: a Claude Tag course for non-technical teams', type: 'info' },
      { text: '' },
      { text: '  ── Training + coaching the field ──', type: 'accent' },
      { text: '  • Live Claude Code demos in 5 global regions, 1:1 and group', type: 'info' },
      { text: '  • Monthly sessions for ~300 engineers in 7 developer communities', type: 'info' },
      { text: '  • Recurring office hours; coached sales teams and demoed to', type: 'info' },
      { text: '    sellers, scientists, and manufacturing audiences', type: 'info' },
      { text: '' },
      { text: '  ── Scaling beyond live sessions ──', type: 'accent' },
      { text: '  • Gamified Claude Code learning platform: 3,500 users, 28-min', type: 'info' },
      { text: '    average session, 76% quiz completion, support requests -30%', type: 'info' },
      { text: '  • 75-slide hands-on training deck on all 5 extension points', type: 'info' },
      { text: '' },
      { text: '  ── Building on the Claude Platform ──', type: 'accent' },
      { text: '  • Tool use + MCP: 4D Orchestrator, FastMCP servers, and', type: 'info' },
      { text: '    EvalForge Lite (MCP server, 9 tools, Claude Code plugin)', type: 'info' },
      { text: '  • Three Claude agents (expense checker, research analyst,', type: 'info' },
      { text: '    scheduler): tool use, human approval, evals (98% success)', type: 'info' },
      { text: '  • AI Explorer refreshes weekly: Claude Code in GitHub Actions', type: 'info' },
      { text: '    runs a custom skill against official pages and opens a PR', type: 'info' },
      { text: '  • Claude via Bedrock, Vertex AI, and Foundry, compared side by', type: 'info' },
      { text: '    side in EvalForge Lite', type: 'info' },
      { text: '  • Claude Code is daily infrastructure. This site included:', type: 'info' },
      { text: '    type "claude"', type: 'info' },
      { text: '' },
      { text: '  ── Community ──', type: 'accent' },
      { text: '  • Led teams at the Orange County and Life Sciences Claude', type: 'info' },
      { text: '    Impact Labs; coach presenters at Claude Community events', type: 'info' },
      { text: '' },
      { text: '  ── Closing the loop with product ──', type: 'accent' },
      { text: '  • Turned office-hours friction into tickets for owning teams', type: 'info' },
      { text: '' },
      { text: '  ── Work sample: Claude for Work call plan ──', type: 'accent' },
      { text: '  Verified facts with sources and dates, a timed call flow, three', type: 'info' },
      { text: '  demo paths, eleven objections, and a 90-day pilot plan.', type: 'info' },
      { text: '  Unlisted; direct URL only:', type: 'dim' },
      { text: '  thejaredchapman.com/samples/claude-for-work-call-plan.pdf', type: 'link' },
      { text: '' },
      { text: '  12 Anthropic certifications.', type: 'info' },
      { text: '  Please check my writings: type "writing"', type: 'accent' },
      { text: '  I love helping developers learn and grow.', type: 'joke' },
      { text: '' },
      { text: '  Try: claude | projects | experience | certs | hire', type: 'dim' },
    ],
    claude: () => [
      { text: '  ✻ Made with Claude', type: 'accent' },
      { text: '' },
      { text: '  Everything on this site was made with Claude: the code, the', type: 'info' },
      { text: '  copy, the six OS themes, the boot screens, the projects window,', type: 'info' },
      { text: '  and the terminal you\'re typing in right now.', type: 'info' },
      { text: '' },
      { text: '  It was built in Claude Code. I set the direction, reviewed', type: 'info' },
      { text: '  every change, and decided what shipped. Claude did the rest.', type: 'info' },
      { text: '' },
      { text: '  That is the workflow I teach: you stay the engineer, and', type: 'joke' },
      { text: '  Claude does the building.', type: 'joke' },
      { text: '' },
      { text: '  Read more: thejaredchapman.com/?read=stay-the-engineer', type: 'link' },
    ],
    whoami: () => [{ text: '  visitor@jaredos — Role: Appreciated Guest', type: 'accent' }],
    date: () => [{ text: `  ${new Date().toString()}`, type: 'info' }],
    echo: () => [{ text: `  ${args.slice(1).join(' ') || ''}` }],
    ls: () => [
      { text: '  about.txt  projects/  writing/  certs/  resume.pdf  jokes/  skills.json', type: 'info' },
      { text: '  secret_plans.txt  definitely_not_bugs/  samples/  MADE_WITH_CLAUDE.md', type: 'dim' },
    ],
    cat: () => {
      if (args[1] === 'made_with_claude.md') return [
        { text: '  ✻ Made with Claude', type: 'accent' },
        { text: '' },
        { text: '  Everything on this site was made with Claude: the code, the', type: 'info' },
        { text: '  copy, the six OS themes, the boot screens, the projects window,', type: 'info' },
        { text: '  and the terminal you\'re typing in right now.', type: 'info' },
        { text: '' },
        { text: '  It was built in Claude Code. I set the direction, reviewed', type: 'info' },
        { text: '  every change, and decided what shipped. Claude did the rest.', type: 'info' },
        { text: '' },
        { text: '  That is the workflow I teach: you stay the engineer, and', type: 'joke' },
        { text: '  Claude does the building.', type: 'joke' },
        { text: '' },
        { text: '  Read more: thejaredchapman.com/?read=stay-the-engineer', type: 'link' },
      ]
      if (args[1] === 'secret_plans.txt') return [
        { text: '  Step 1: Write code', type: 'info' },
        { text: '  Step 2: Do comedy', type: 'info' },
        { text: '  Step 3: ???', type: 'info' },
        { text: '  Step 4: Profit', type: 'accent' },
      ]
      if (args[1] === 'samples/' || args[1] === 'samples' || args[1] === 'samples/claude-for-work-call-plan.pdf') return [
        { text: '  samples/claude-for-work-call-plan.pdf', type: 'accent' },
        { text: '  Claude for Work discovery call plan: verified facts with sources', type: 'info' },
        { text: '  and dates, a timed call flow, demo paths, objections, 90-day pilot.', type: 'info' },
        { text: '  Unlisted; direct URL only:', type: 'dim' },
        { text: '  thejaredchapman.com/samples/claude-for-work-call-plan.pdf', type: 'link' },
      ]
      return [{ text: '  Usage: cat <filename>', type: 'dim' }]
    },
    pwd: () => [{ text: '  /home/visitor/jaredos', type: 'info' }],
    sudo: () => [
      { text: "  Nice try! You don't have root access here.", type: 'error' },
      { text: '  But I respect the hustle.', type: 'dim' },
    ],
    rm: () => input.includes('-rf') ? [
      { text: '  That command is forbidden in this terminal.', type: 'error' },
    ] : [{ text: `  Command not found: ${base}`, type: 'error' }],
    matrix: () => [
      { text: '  Wake up, visitor...', type: 'accent' },
      { text: '  The Matrix has you...', type: 'accent' },
      { text: '  Follow the white rabbit.', type: 'dim' },
    ],
    coffee: () => [
      { text: '  Brewing... Error: Coffee machine not found.', type: 'error' },
      { text: '  But honestly, I could use one too.', type: 'dim' },
    ],
    ping: () => [
      { text: '  PING jaredos (127.0.0.1): 56 bytes', type: 'info' },
      { text: '  Connection: Strong (just like my WiFi jokes)', type: 'accent' },
    ],
    ascii: () => ASCII_ART,
    hello: () => [{ text: '  Hey! Type "help" to see what you can do.', type: 'accent' }],
    hi: () => [{ text: '  Hey! Type "help" to see what you can do.', type: 'accent' }],
    vim: () => [
      { text: `  Opening vim... Just kidding. You'd be stuck forever.`, type: 'dim' },
    ],
    nano: () => [{ text: '  This is a website, not your terminal.', type: 'dim' }],
    clear: () => [{ text: '__CLEAR__', type: 'system' }],
    exit: () => [{ text: '__EXIT__', type: 'system' }],
  }

  if (!base) return []
  const handler = commands[base]
  if (handler) return handler()
  const linkOutput = getLinkCommandOutput(base)
  if (linkOutput) return linkOutput
  return [
    { text: `  Command not found: ${base}`, type: 'error' },
    { text: '  Type "help" for available commands.', type: 'dim' },
  ]
}

function TerminalApp() {
  const [history, setHistory] = useState([
    { text: '  Welcome to JaredOS Terminal', type: 'accent' },
    { text: '  ✻ Everything here was made with Claude. Type "claude" for the story.', type: 'dim' },
    { text: '  Try these commands:', type: 'dim' },
    { text: '' },
    { text: '    anthropic  claude  about  projects  joke  hire  sudo', type: 'cmd' },
    { text: '' },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [])

  useEffect(() => { scrollToBottom() }, [history, scrollToBottom])
  useEffect(() => { inputRef.current?.focus() }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()
    const newHistory = [...history, { text: `visitor@jaredos ~ $ ${trimmed}`, type: 'prompt' }]
    const output = processCommand(trimmed)
    output.forEach((o) => { if (o.open) openLink(o.open) })

    if (output.some((o) => o.text === '__CLEAR__')) {
      setHistory([])
      setInput('')
      if (trimmed) setCmdHistory((p) => [trimmed, ...p])
      setHistIdx(-1)
      return
    }

    setHistory([...newHistory, ...output.filter((o) => o.type !== 'system'), { text: '' }])
    if (trimmed) setCmdHistory((p) => [trimmed, ...p])
    setInput('')
    setHistIdx(-1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (histIdx < cmdHistory.length - 1) {
        const i = histIdx + 1
        setHistIdx(i)
        setInput(cmdHistory[i])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx > 0) {
        const i = histIdx - 1
        setHistIdx(i)
        setInput(cmdHistory[i])
      } else { setHistIdx(-1); setInput('') }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const cmds = ['help','about','skills','joke','projects','experience','writing','certs','social','ascii','hire','whoami','date','echo','sudo','clear','ls','cat','pwd','ping','coffee','matrix','vim','anthropic','claude',...LINK_COMMAND_NAMES]
      const match = cmds.filter((c) => c.startsWith(input.toLowerCase()))
      if (match.length === 1) setInput(match[0])
    }
  }

  const lineColor = (type) => {
    const colors = {
      prompt: 'text-[#89b4fa]',
      accent: 'text-[var(--accent-400)]',
      error: 'text-[#f38ba8]',
      info: 'text-[#a6e3a1]',
      dim: 'text-white/40',
      joke: 'text-[#f9e2af] italic',
      link: 'text-[#89dceb] underline',
      cmd: 'text-[#cba6f7]',
      warn: 'text-[#f9e2af]',
    }
    return colors[type] || 'text-white/70'
  }

  return (
    <div className="h-full flex flex-col bg-[#0d0d1a]" onClick={() => inputRef.current?.focus()}>
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed cursor-text [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10">
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words ${lineColor(line.type)}`}>
            {line.href ? <a href={line.href} target="_blank" rel="noreferrer" className="hover:opacity-80">{line.text}</a> : line.text}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-[#89b4fa] shrink-0">visitor@jaredos ~ $&nbsp;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white/90 font-mono text-sm p-0 caret-[var(--accent-400)]"
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
      {/* Command hints */}
      <div className="flex flex-wrap gap-1.5 p-2 border-t border-white/5 bg-[#0a0a15]">
        {['anthropic', 'claude', 'about', 'projects', 'skills', 'joke', 'hire', 'sudo', 'ls', 'help'].map((cmd) => (
          <button
            key={cmd}
            onClick={(e) => { e.stopPropagation(); setInput(cmd); inputRef.current?.focus() }}
            className="py-0.5 px-2 rounded text-[11px] font-mono border border-white/10 bg-white/5 text-white/40 hover:border-[var(--accent-400)] hover:text-[var(--accent-400)] transition-colors cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TerminalApp
