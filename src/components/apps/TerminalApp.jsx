import { useState, useRef, useEffect, useCallback } from 'react'

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
      { text: '  about       Learn about Jared', type: 'cmd' },
      { text: '  skills      View technical skills', type: 'cmd' },
      { text: '  joke        Get a random joke', type: 'cmd' },
      { text: '  projects    List projects', type: 'cmd' },
      { text: '  experience  Work experience', type: 'cmd' },
      { text: '  social      Social links', type: 'cmd' },
      { text: '  hire        Get in touch', type: 'cmd' },
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
      { text: '  I work in GenAI enabling developers to understand' },
      { text: '  AI products, drive adoption of tools like Claude' },
      { text: '  Code, and help teams use AI responsibly.' },
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
      { text: '  AI/ML:      LLMs | Vertex AI | Prompt Engineering', type: 'info' },
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
      { text: '  [1] LoanLens            Amortization calculator', type: 'accent' },
      { text: '      amortization.vercel.app', type: 'link' },
      { text: '  [2] Art Portfolio        Gallery showcase', type: 'accent' },
      { text: '      art-portfolio-navy.vercel.app', type: 'link' },
      { text: '  [3] DS&A Interview Prep  Technical prep', type: 'accent' },
      { text: '      dsa-interview-prep-seven.vercel.app', type: 'link' },
      { text: '  [4] DJ Master Academy   DDJ-FLX4 trainer', type: 'accent' },
      { text: '      dj-master-academy.vercel.app', type: 'link' },
      { text: '  [5] Chess Learning App   Chess platform', type: 'accent' },
      { text: '      chess-learning-app-teal.vercel.app', type: 'link' },
      { text: '  [6] AI Explorer          AI experimentation', type: 'accent' },
      { text: '      app-dun-phi.vercel.app', type: 'link' },
      { text: '  [7] Break Into Tech      Cybersecurity guide', type: 'accent' },
      { text: '      break-into-tech.vercel.app', type: 'link' },
      { text: '  [8] LLM Frameworks       LangChain learning', type: 'accent' },
      { text: '      langchain-learning-app.vercel.app', type: 'link' },
    ],
    experience: () => [
      { text: '  [2024-Now]  AbbVie — Developer Support Engineer (GenAI)', type: 'accent' },
      { text: '  [2022-2024] Google — Software Engineer', type: 'accent' },
      { text: '  [2018-2021] Guaranteed Rate — Appraisal Team Lead', type: 'accent' },
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
    ],
    anthropic: () => [
      { text: '  Hey Anthropic 👋🏿 — you already know.', type: 'accent' },
    ],
    whoami: () => [{ text: '  visitor@jaredos — Role: Appreciated Guest', type: 'accent' }],
    date: () => [{ text: `  ${new Date().toString()}`, type: 'info' }],
    echo: () => [{ text: `  ${args.slice(1).join(' ') || ''}` }],
    ls: () => [
      { text: '  about.txt  projects/  resume.pdf  jokes/  skills.json', type: 'info' },
      { text: '  secret_plans.txt  definitely_not_bugs/', type: 'dim' },
    ],
    cat: () => {
      if (args[1] === 'secret_plans.txt') return [
        { text: '  Step 1: Write code', type: 'info' },
        { text: '  Step 2: Do comedy', type: 'info' },
        { text: '  Step 3: ???', type: 'info' },
        { text: '  Step 4: Profit', type: 'accent' },
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
  return [
    { text: `  Command not found: ${base}`, type: 'error' },
    { text: '  Type "help" for available commands.', type: 'dim' },
  ]
}

function TerminalApp() {
  const [history, setHistory] = useState([
    { text: '  Welcome to JaredOS Terminal', type: 'accent' },
    { text: '  Try these commands:', type: 'dim' },
    { text: '' },
    { text: '    joke  about  skills  projects  hire  sudo  matrix', type: 'cmd' },
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
      const cmds = ['help','about','skills','joke','projects','experience','social','ascii','hire','whoami','date','echo','sudo','clear','ls','cat','pwd','ping','coffee','matrix','vim','anthropic']
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
        {['joke', 'about', 'skills', 'projects', 'hire', 'sudo', 'matrix', 'coffee', 'ls', 'help'].map((cmd) => (
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
