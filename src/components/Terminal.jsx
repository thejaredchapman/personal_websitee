import { useState, useRef, useEffect, useCallback } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { LINK_COMMAND_NAMES, getLinkCommandOutput, openLink } from '../utils/terminalLinks'

const JOKES = [
  'Why do programmers prefer dark mode? Because light attracts bugs.',
  'I told my wife I was going to a comedy open mic. She said "Don\'t quit your day job." I said "That\'s literally the joke."',
  'A SQL query walks into a bar, walks up to two tables and asks... "Can I JOIN you?"',
  'There are only 10 types of people in the world: those who understand binary, and those who don\'t.',
  'Why do Java developers wear glasses? Because they can\'t C#.',
  'My code doesn\'t have bugs. It has surprise features.',
  'How do you comfort a JavaScript bug? You console it.',
  'A programmer puts two glasses on his nightstand before going to sleep. A full one in case he gets thirsty, and an empty one in case he doesn\'t.',
  '!false — It\'s funny because it\'s true.',
  'I\'d tell you a UDP joke, but you might not get it.',
  'Why did the developer go broke? Because he used up all his cache.',
  'I have a joke about recursion, but first I have to tell you my joke about recursion.',
  'A QA engineer walks into a bar. Orders 1 beer. Orders 0 beers. Orders 99999999 beers. Orders -1 beers. Orders a lizard. Orders NULL beers.',
  'What\'s the object-oriented way to become wealthy? Inheritance.',
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
  { text: '██████  ██      ███████ ██████  ██████', type: 'help-cmd' },
  { text: '██   ██ ██      ██      ██   ██ ██   ██', type: 'help-cmd' },
  { text: '██████  ██      █████   ██████  ██   ██', type: 'help-cmd' },
  { text: '██   ██ ██      ██      ██   ██ ██   ██', type: 'help-cmd' },
  { text: '██████  ███████ ███████ ██   ██ ██████  ██', type: 'help-cmd' },
  { text: '' },
  { text: '██████  ██       █████   ██████ ██   ██     ███    ██ ███████ ██████  ██████', type: 'link' },
  { text: '██   ██ ██      ██   ██ ██      ██  ██      ████   ██ ██      ██   ██ ██   ██', type: 'link' },
  { text: '██████  ██      ███████ ██      █████       ██ ██  ██ █████   ██████  ██   ██', type: 'link' },
  { text: '██   ██ ██      ██   ██ ██      ██  ██      ██  ██ ██ ██      ██   ██ ██   ██', type: 'link' },
  { text: '██████  ███████ ██   ██  ██████ ██   ██     ██   ████ ███████ ██   ██ ██████', type: 'link' },
]

const SKILLS_DATA = {
  languages: ['Python', 'Java', 'JavaScript', 'HTML', 'CSS'],
  ai: ['LLMs', 'Claude Code', 'MCP', 'Tool Use', 'Anthropic API', 'Prompt Engineering'],
  enablement: ['Demos', 'Hands-on Labs', 'Office Hours', 'Training', 'Docs'],
  frameworks: ['React', 'Angular', 'Spring Boot', 'Django'],
  data: ['BigQuery', 'Pandas', 'PyArrow', 'Ibis', 'PostgreSQL'],
  tools: ['GCP', 'Git', 'gRPC', 'REST APIs'],
}

function getRandomJoke() {
  return JOKES[Math.floor(Math.random() * JOKES.length)]
}

function processCommand(input) {
  const cmd = input.trim().toLowerCase()
  const args = cmd.split(/\s+/)
  const base = args[0]

  switch (base) {
    case 'help':
      return [
        { text: 'Available commands:', type: 'info' },
        { text: '' },
        { text: '  help          Show this help message', type: 'help-cmd' },
        { text: '  about         Learn about Jared', type: 'help-cmd' },
        { text: '  skills        View technical skills', type: 'help-cmd' },
        { text: '  joke          Get a programmer/comedy joke', type: 'help-cmd' },
        { text: '  projects      List featured projects', type: 'help-cmd' },
        { text: '  experience    View work experience', type: 'help-cmd' },
        { text: '  writing       Articles and guides', type: 'help-cmd' },
        { text: '  certs         Anthropic certifications', type: 'help-cmd' },
        { text: '  social        Social media links', type: 'help-cmd' },
        { text: '  github        Open GitHub (also linkedin, instagram, spotify)', type: 'help-cmd' },
        { text: '  meeting       Schedule a meeting with Jared', type: 'help-cmd' },
        { text: '  contact       Send Jared an email (or: email)', type: 'help-cmd' },
        { text: '  ascii         Display ASCII art', type: 'help-cmd' },
        { text: '  whoami        Who are you?', type: 'help-cmd' },
        { text: '  date          Current date', type: 'help-cmd' },
        { text: '  echo [text]   Echo text back', type: 'help-cmd' },
        { text: '  sudo [cmd]    Try running as root', type: 'help-cmd' },
        { text: '  rm -rf /      Don\'t even think about it', type: 'help-cmd' },
        { text: '  clear         Clear the terminal', type: 'help-cmd' },
        { text: '  exit          Close the terminal', type: 'help-cmd' },
        { text: '' },
        { text: '  Tip: Try some secret commands too...', type: 'dim' },
      ]

    case 'about':
      return [
        { text: '╔══════════════════════════════════════════════════════════╗', type: 'accent' },
        { text: '║  JARED CHAPMAN                                          ║', type: 'accent' },
        { text: '║  GenAI Specialist · Rabbit Hole Explorer · Dog Dad       ║', type: 'accent' },
        { text: '╚══════════════════════════════════════════════════════════╝', type: 'accent' },
        { text: '' },
        { text: '  Hey, I\'m Jared Chapman — Generative AI specialist,', type: 'info' },
        { text: '  professional rabbit hole explorer, and proud dog dad to', type: 'info' },
        { text: '  Dr. Pugsley Bikini (yes, he\'s a dog, and yes, the title', type: 'info', href: 'https://www.instagram.com/drpugsleybikini' },
        { text: '  is earned).', type: 'info' },
        { text: '' },
        { text: '  ── What I Do ──', type: 'accent' },
        { text: '  I\'m an engineer who teaches. I build LLM tools and agent' },
        { text: '  workflows with Claude and other models, then turn them' },
        { text: '  into hands-on training, clear documentation, and working' },
        { text: '  demos that help teams get real value from AI — from a' },
        { text: '  first prompt to a production rollout, in any environment.' },
        { text: '' },
        { text: '  Outside of work, I\'m just as passionate about AI', type: 'help-cmd' },
        { text: '  literacy, safety, and security — building interactive', type: 'help-cmd' },
        { text: '  tools that help everyday people engage with AI on their', type: 'help-cmd' },
        { text: '  own terms. More on that soon.', type: 'help-cmd' },
        { text: '' },
        { text: '  ── How I\'m Wired ──', type: 'accent' },
        { text: '  If I find a rabbit hole, I don\'t just peek in — I map', type: 'joke' },
        { text: '  every tunnel until I understand the whole thing. That\'s', type: 'joke' },
        { text: '  how I taught myself to code. That\'s how I figured out', type: 'joke' },
        { text: '  stick shift. That\'s just how I\'m wired.', type: 'joke' },
        { text: '' },
        { text: '  ── Life ──', type: 'accent' },
        { text: '  Extreme extrovert. Originally from Atlanta. Chicago will' },
        { text: '  always have a special place in my heart — it\'s where I' },
        { text: '  fell in love with my fiancée Avery Wine, where my people' },
        { text: '  are, where I did improv, and where I still make the trip' },
        { text: '  just to get a great haircut. Now in Los Angeles with my' },
        { text: '  family, enjoying everything California has to offer.' },
        { text: '' },
        { text: '  At home, life is shared with Avery and our son,', type: 'link' },
        { text: '  Dr. Pugsley Bikini, who absolutely runs the household.', type: 'link', href: 'https://www.instagram.com/drpugsleybikini' },
        { text: '' },
        { text: '  ── Music ──', type: 'accent' },
        { text: '  Stevie Wonder has always been home for me.', type: 'info' },
        { text: '  Sade\'s Sweetest Taboo never gets old.', type: 'info' },
        { text: '  Ring My Bell by Anita Ward makes it into the', type: 'info' },
        { text: '  rotation every single day.', type: 'info' },
        { text: '' },
        { text: '  Always open to interesting conversations, new ideas,', type: 'dim' },
        { text: '  and collaborations that don\'t come with a job', type: 'dim' },
        { text: '  description. Reach out — I love a good conversation.', type: 'dim' },
      ]

    case 'skills':
      return [
        { text: '┌─ Technical Skills ─────────────────────┐', type: 'accent' },
        { text: '' },
        { text: `  Languages:   ${SKILLS_DATA.languages.join(' | ')}`, type: 'info' },
        { text: `  AI/ML:       ${SKILLS_DATA.ai.join(' | ')}`, type: 'info' },
        { text: `  Frameworks:  ${SKILLS_DATA.frameworks.join(' | ')}`, type: 'info' },
        { text: `  Data:        ${SKILLS_DATA.data.join(' | ')}`, type: 'info' },
        { text: `  Tools:       ${SKILLS_DATA.tools.join(' | ')}`, type: 'info' },
        { text: `  Enablement:  ${SKILLS_DATA.enablement.join(' | ')}`, type: 'info' },
        { text: '' },
        { text: '└────────────────────────────────────────┘', type: 'accent' },
      ]

    case 'joke':
      return [
        { text: '' },
        { text: `  ${getRandomJoke()}`, type: 'joke' },
        { text: '' },
        { text: '  (Run "joke" again for another one)', type: 'dim' },
      ]

    case 'projects':
      return [
        { text: '  Featured Projects:', type: 'info' },
        { text: '' },
        { text: '  [1] EvalForge Lite      - Multi-cloud model comparison', type: 'accent' },
        { text: '      evalforge-lite.onrender.com', type: 'link' },
        { text: '  [2] Tag, You\'re It      - Claude Tag course', type: 'accent' },
        { text: '      thejaredchapman.com/tag-youre-it-course.html', type: 'link' },
        { text: '  [3] LoanLens            - Amortization calculator', type: 'accent' },
        { text: '      amortization.vercel.app', type: 'link' },
        { text: '  [4] Art Portfolio       - Gallery showcase', type: 'accent' },
        { text: '      art-portfolio-navy.vercel.app', type: 'link' },
        { text: '  [5] DJ Master Academy   - DDJ-FLX4 trainer', type: 'accent' },
        { text: '      dj-master-academy.vercel.app', type: 'link' },
        { text: '  [6] Chess Learning App  - Chess platform', type: 'accent' },
        { text: '      chess-learning-app-teal.vercel.app', type: 'link' },
        { text: '  [7] AI Explorer         - AI experimentation', type: 'accent' },
        { text: '      ai-explorer-theta.vercel.app', type: 'link' },
        { text: '  [8] Break Into Tech     - Cybersecurity guide', type: 'accent' },
        { text: '      break-into-tech.vercel.app', type: 'link' },
        { text: '  [9] LLM Frameworks      - LangChain learning', type: 'accent' },
        { text: '      langchain-learning-app.vercel.app', type: 'link' },
        { text: '' },
        { text: '  Open the Projects window for live demos!', type: 'dim' },
      ]

    case 'experience':
      return [
        { text: '  Work Experience:', type: 'info' },
        { text: '' },
        { text: '  [2024 - Now]  AbbVie - Developer Support Engineer (GenAI)', type: 'accent' },
        { text: '                Claude Code enablement, office hours, live demos, learning platforms' },
        { text: '' },
        { text: '  [2022 - 2024] Google - Software Engineer', type: 'accent' },
        { text: '                Searchmark tools, BigQuery DataFrames' },
        { text: '' },
        { text: '  [2018 - 2021] Guaranteed Rate - Appraisal Desk Team Lead', type: 'accent' },
        { text: '                Automated dashboards, managed appraisal orders' },
      ]

    case 'writing':
      return [
        { text: '  Writing:', type: 'info' },
        { text: '' },
        { text: '  [1] Does AI Know I\'m Not White?', type: 'accent' },
        { text: '      thejaredchapman.com/?read=does-ai-know-im-not-white', type: 'link' },
        { text: '  [2] Meet Users Where They Are', type: 'accent' },
        { text: '      thejaredchapman.com/?read=meet-users-where-they-are', type: 'link' },
        { text: '  [3] Stay the Engineer', type: 'accent' },
        { text: '      thejaredchapman.com/?read=stay-the-engineer', type: 'link' },
        { text: '  [4] From Vibe Coding to Agentic Engineering', type: 'accent' },
        { text: '      thejaredchapman.com/?read=vibe-coding-to-agentic-engineering', type: 'link' },
      ]

    case 'certs':
      return [
        { text: '  Anthropic certifications (12):', type: 'info' },
        { text: '' },
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
      ]

    case 'social':
      return [
        { text: '  Find me online:', type: 'info' },
        { text: '' },
        { text: '  GitHub:    github.com/thejaredchapman', type: 'link' },
        { text: '  LinkedIn:  linkedin.com/in/thejaredchapman', type: 'link' },
        { text: '  Instagram: instagram.com/thejaredchapman', type: 'link' },
        { text: '  Linktree:  linktr.ee/thejaredchapman', type: 'link' },
      ]

    case 'ascii':
      return ASCII_ART

    case 'anthropic':
      return [
        { text: '  Hey Anthropic 👋🏿 — you already know. Short version:', type: 'accent' },
        { text: '' },
        { text: '  ── What I bring to the Claude Platform ──', type: 'accent' },
        { text: '  • Engineer who teaches: demos, hands-on labs, curriculum', type: 'info' },
        { text: '  • Claude Code as core infrastructure. First practitioner at', type: 'info' },
        { text: '    AbbVie: office hours, 1:1 installs, training, guardrails', type: 'info' },
        { text: '  • Live demos in 5 global regions; coached sales teams on', type: 'info' },
        { text: '    what was available', type: 'info' },
        { text: '  • Tool use + MCP: 4D Orchestrator, FastMCP servers,', type: 'info' },
        { text: '    EvalForge Lite (MCP server, 9 tools)', type: 'info' },
        { text: '  • Claude via Bedrock, Vertex AI, and Foundry, compared', type: 'info' },
        { text: '    side by side in EvalForge Lite', type: 'info' },
        { text: '  • Self-service learning: a 3,500-user learning platform;', type: 'info' },
        { text: '    related support requests down 30%', type: 'info' },
        { text: '  • 12 Anthropic certifications', type: 'info' },
        { text: '' },
        { text: '  ── What drives me ──', type: 'accent' },
        { text: '  I love helping developers learn and grow.', type: 'joke' },
        { text: '' },
        { text: '  Try: projects | experience | certs | hire', type: 'dim' },
      ]

    case 'whoami':
      return [
        { text: '  visitor@thejaredchapman.com', type: 'accent' },
        { text: '  Role: Appreciated Guest', type: 'dim' },
        { text: '  Permissions: Read, Explore, Be Amazed', type: 'dim' },
      ]

    case 'date':
      return [{ text: `  ${new Date().toString()}`, type: 'info' }]

    case 'echo':
      return [{ text: `  ${args.slice(1).join(' ') || ''}` }]

    case 'sudo':
      return [
        { text: '  [sudo] password for visitor: ********', type: 'error' },
        { text: '  Nice try! You don\'t have root access here.', type: 'error' },
        { text: '  But I respect the hustle.', type: 'dim' },
      ]

    case 'rm':
      if (input.includes('-rf')) {
        return [
          { text: '  🚨 WHOA THERE! 🚨', type: 'error' },
          { text: '  That command is forbidden in this terminal.', type: 'error' },
          { text: '  The website lives to see another day.', type: 'dim' },
        ]
      }
      return [{ text: `  Command not found: ${base}`, type: 'error' }]

    case 'ls':
      return [
        { text: '  about.txt  projects/  writing/  resume.pdf  jokes/  skills.json', type: 'info' },
        { text: '  secret_plans.txt  definitely_not_bugs/', type: 'dim' },
      ]

    case 'cat':
      if (args[1] === 'secret_plans.txt') {
        return [
          { text: '  Step 1: Write code', type: 'info' },
          { text: '  Step 2: Do comedy', type: 'info' },
          { text: '  Step 3: ???', type: 'info' },
          { text: '  Step 4: Profit', type: 'accent' },
        ]
      }
      return [{ text: '  Usage: cat <filename>', type: 'dim' }]

    case 'pwd':
      return [{ text: '  /home/visitor/thejaredchapman.com', type: 'info' }]

    case 'ping':
      return [
        { text: '  PING thejaredchapman.com (127.0.0.1): 56 data bytes', type: 'info' },
        { text: '  64 bytes: icmp_seq=0 ttl=64 time=0.042 ms', type: 'dim' },
        { text: '  64 bytes: icmp_seq=1 ttl=64 time=0.031 ms', type: 'dim' },
        { text: '  --- thejaredchapman.com ping statistics ---', type: 'info' },
        { text: '  Connection: Strong (just like my WiFi jokes)', type: 'accent' },
      ]

    case 'coffee':
    case 'brew':
      return [
        { text: '  ☕ Brewing...', type: 'info' },
        { text: '    ⣾⣽⣻⢿⡿⣟⣯⣷', type: 'accent' },
        { text: '  Error: Coffee machine not found.', type: 'error' },
        { text: '  But honestly, I could use one too.', type: 'dim' },
      ]

    case 'matrix':
      return [
        { text: '  Wake up, visitor...', type: 'accent' },
        { text: '  The Matrix has you...', type: 'accent' },
        { text: '  Follow the white rabbit.', type: 'accent' },
        { text: '  Knock, knock, visitor.', type: 'dim' },
      ]

    case 'hello':
    case 'hi':
    case 'hey':
      return [
        { text: `  Hey there! Welcome to my corner of the internet.`, type: 'accent' },
        { text: '  Type "help" to see what you can do here.', type: 'dim' },
      ]

    case 'vim':
    case 'nano':
    case 'emacs':
      return [
        { text: `  Opening ${base}...`, type: 'info' },
        { text: '  Just kidding. This is a website, not your terminal.', type: 'dim' },
        { text: base === 'vim' ? '  (You\'d be stuck here forever anyway)' : '  Nice editor choice though.', type: 'dim' },
      ]

    case 'hire':
      return [
        { text: '  ╔════════════════════════════════╗', type: 'accent' },
        { text: '  ║  Glad you\'re interested!       ║', type: 'accent' },
        { text: '  ║  Let\'s connect:                ║', type: 'accent' },
        { text: '  ║  thejaredchapman@gmail.com     ║', type: 'accent' },
        { text: '  ╚════════════════════════════════╝', type: 'accent' },
      ]

    case 'exit':
      return [{ text: '__EXIT__', type: 'system' }]

    case 'clear':
      return [{ text: '__CLEAR__', type: 'system' }]

    case '':
      return []

    default: {
      const linkOutput = getLinkCommandOutput(base)
      if (linkOutput) return linkOutput
      return [
        { text: `  Command not found: ${base}`, type: 'error' },
        { text: '  Type "help" for available commands.', type: 'dim' },
      ]
    }
  }
}

function Terminal() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.1 })
  const [history, setHistory] = useState([
    { text: '  Welcome to JaredOS v2.0', type: 'accent' },
    { text: '  Type "help" to see all commands, or try one of these:', type: 'dim' },
    { text: '' },
    { text: '    joke       — Get a programmer/comedy joke', type: 'help-cmd' },
    { text: '    about      — Learn about Jared', type: 'help-cmd' },
    { text: '    skills     — View technical skills', type: 'help-cmd' },
    { text: '    projects   — List featured projects', type: 'help-cmd' },
    { text: '    hire       — Get in touch', type: 'help-cmd' },
    { text: '    sudo       — Try running as root', type: 'help-cmd' },
    { text: '    matrix     — Follow the white rabbit', type: 'help-cmd' },
    { text: '' },
  ])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isOpen, setIsOpen] = useState(true)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, scrollToBottom])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = input.trim()

    // Add command to display
    const newHistory = [
      ...history,
      { text: `visitor@jared ~ $ ${trimmed}`, type: 'prompt' },
    ]

    const output = processCommand(trimmed)
    output.forEach((o) => { if (o.open) openLink(o.open) })

    // Handle system commands
    if (output.some((o) => o.text === '__CLEAR__')) {
      setHistory([])
      setInput('')
      if (trimmed) setCommandHistory((prev) => [trimmed, ...prev])
      setHistoryIndex(-1)
      return
    }

    if (output.some((o) => o.text === '__EXIT__')) {
      setIsOpen(false)
      return
    }

    setHistory([...newHistory, ...output.filter((o) => o.type !== 'system'), { text: '' }])
    if (trimmed) setCommandHistory((prev) => [trimmed, ...prev])
    setInput('')
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const commands = ['help', 'about', 'skills', 'joke', 'projects', 'experience', 'writing', 'certs', 'social', 'ascii', 'whoami', 'date', 'echo', 'sudo', 'clear', 'exit', 'ls', 'cat', 'pwd', 'ping', 'coffee', 'matrix', 'hire', 'vim', ...LINK_COMMAND_NAMES]
      const match = commands.filter((c) => c.startsWith(input.toLowerCase()))
      if (match.length === 1) setInput(match[0])
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  if (!isOpen) {
    return (
      <section ref={sectionRef} id="terminal" className="py-20 px-8 relative z-1 max-[768px]:py-12 max-[768px]:px-4 scroll-mt-20">
        <div className="container">
          <div className={`max-w-[800px] mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <button
              onClick={() => setIsOpen(true)}
              className="btn btn-secondary mx-auto block"
            >
              Reopen Terminal
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="terminal" className="py-20 px-8 relative z-1 max-[768px]:py-12 max-[768px]:px-4 scroll-mt-20">
      <div className="container">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Interactive Terminal
        </h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Try typing some commands — start with "help"
        </p>

        <div
          className={`max-w-[800px] mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
          onClick={focusInput}
        >
          {/* Terminal window chrome */}
          <div className="rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-white/10">
            {/* Title bar */}
            <div className="flex items-center gap-2 py-3 px-4 bg-[#1e1e2e] border-b border-white/10">
              <div className="flex gap-2">
                <button
                  className="w-3 h-3 rounded-full bg-[#ff5f57] border-none cursor-pointer hover:brightness-110 transition-all"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                  aria-label="Close terminal"
                />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <span className="flex-1 text-center text-xs text-white/40 font-mono">
                visitor@thejaredchapman.com — bash
              </span>
            </div>

            {/* Terminal body */}
            <div
              ref={scrollRef}
              className="bg-[#0d0d1a] p-5 max-[768px]:p-3 h-[400px] max-[768px]:h-[300px] overflow-y-auto font-mono text-sm leading-relaxed cursor-text [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-sm"
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`whitespace-pre-wrap break-words ${
                    line.type === 'prompt'
                      ? 'text-[#89b4fa]'
                      : line.type === 'accent'
                        ? 'text-[var(--accent-400)]'
                        : line.type === 'error'
                          ? 'text-[#f38ba8]'
                          : line.type === 'info'
                            ? 'text-[#a6e3a1]'
                            : line.type === 'dim'
                              ? 'text-white/40'
                              : line.type === 'joke'
                                ? 'text-[#f9e2af] italic'
                                : line.type === 'link'
                                  ? 'text-[#89dceb] underline'
                                  : line.type === 'help-cmd'
                                    ? 'text-[#cba6f7]'
                                    : 'text-white/70'
                  }`}
                >
                  {line.href ? <a href={line.href} target="_blank" rel="noreferrer" className="hover:opacity-80">{line.text}</a> : line.text}
                </div>
              ))}

              {/* Input line */}
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-[#89b4fa] shrink-0">visitor@jared ~ $&nbsp;</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent border-none outline-none text-white/90 font-mono text-sm p-0 caret-[var(--accent-400)]"
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {['help', 'joke', 'about', 'skills', 'projects', 'hire', 'sudo', 'matrix', 'coffee', 'ls'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInput(cmd)
                  inputRef.current?.focus()
                }}
                className="py-1 px-3 rounded-full text-xs font-mono border transition-all duration-200 cursor-pointer hover:scale-105"
                style={{
                  background: 'var(--bg-secondary)',
                  borderColor: 'var(--border-light)',
                  color: 'var(--text-tertiary)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-400)'
                  e.currentTarget.style.color = 'var(--accent-400)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-light)'
                  e.currentTarget.style.color = 'var(--text-tertiary)'
                }}
              >
                {cmd}
              </button>
            ))}
          </div>
          <p className="text-center text-xs mt-2 opacity-30" style={{ color: 'var(--text-tertiary)' }}>
            Tab to autocomplete | Arrow keys for history | Click a command above to try it
          </p>
        </div>
      </div>
    </section>
  )
}

export default Terminal
