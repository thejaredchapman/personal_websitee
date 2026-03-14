import { useState } from 'react'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const codeJokes = [
  {
    title: 'life_advice.py',
    code: `def get_life_advice(situation):
    if situation == "bug in production":
        return "It's not a bug, it's a feature"
    elif situation == "Monday morning":
        return "Have you tried turning it off?"
        # and never turning it back on
    elif situation == "imposter syndrome":
        return "Everyone on Stack Overflow is faking it too"
    else:
        return print("I have no idea what I'm doing")`,
    highlight: [1, 4, 5, 7],
  },
  {
    title: 'dating.py',
    code: `class SoftwareEngineer:
    def __init__(self):
        self.relationship_status = "It's complicated"
        self.love_language = "Pull Requests"

    def flirt(self, person):
        try:
            connection = person.connect()
            return "Are you a git repo? I want to commit to you"
        except RejectionError:
            self.debug_personality()  # TODO: fix this
            return self.flirt(person)  # infinite loop of trying`,
    highlight: [2, 3, 8, 10, 11],
  },
  {
    title: 'standup.py',
    code: `class DailyStandup:
    MAX_DURATION = 15  # minutes, allegedly

    def what_did_you_do_yesterday(self):
        return "I mass Googled things very intensely"

    def what_will_you_do_today(self):
        return "The same thing, but with more confidence"

    def any_blockers(self):
        return "Yes. Motivation. And also this meeting."`,
    highlight: [4, 7, 10],
  },
  {
    title: 'career.py',
    code: `import pandas as pd

careers = pd.DataFrame({
    "role": ["Engineer", "Comedian", "Both"],
    "salary": [120000, 12, 120012],
    "happiness": [7, 10, 11],
    "sleep": [4, 3, 0],
})

# Filter for the dream job
dream = careers[
    (careers["happiness"] > 9) &
    (careers["sleep"] > 2)  # impossible, but let's try
]
print(dream)  # Empty DataFrame. As expected.`,
    highlight: [4, 5, 6, 12, 14],
  },
  {
    title: 'comedy.py',
    code: `def tell_joke(audience):
    match audience.mood:
        case "excited":
            return "Standing ovation!"
        case "tired":
            return "Polite chuckle"
        case "developers":
            # They'll laugh 2 weeks later
            # when they finally get the joke
            return "Delayed laughter"
        case _:
            raise Exception("tough crowd")

# Fun fact: this code has fewer bugs than my set`,
    highlight: [3, 5, 7, 8, 11, 13],
  },
  {
    title: 'weekend.py',
    code: `from dataclasses import dataclass
from typing import Never

@dataclass
class Weekend:
    plans: list[str]
    productivity: Never  # by design

my_weekend = Weekend(
    plans=[
        "finally learn Kubernetes",
        "build that side project",
        "touch grass (optional)",
    ],
)

# Actual weekend:
while True:
    netflix.binge()
    sleep()`,
    highlight: [6, 10, 11, 12, 17, 18, 19],
  },
]

function CodeBlock({ joke, isVisible, delay }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(joke.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/[0.08] group hover:border-[var(--accent-500)] hover:shadow-[0_12px_40px_var(--shadow-accent)] transition-all duration-400 hover:-translate-y-2">
        {/* File header */}
        <div className="flex items-center justify-between py-3 px-4 bg-[#1e1e2e] border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-white/50 text-xs font-mono">{joke.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 rounded"
              style={{ color: '#3776ab', background: 'rgba(55, 118, 171, 0.15)' }}
            >
              python
            </span>
            <button
              onClick={handleCopy}
              className="text-white/30 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer p-1"
              title="Copy code"
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Code body */}
        <div className="bg-[#0d0d1a] p-5 overflow-x-auto font-mono text-sm leading-7 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-sm">
          <pre className="m-0">
            {joke.code.split('\n').map((line, i) => (
              <div
                key={i}
                className={`flex transition-colors duration-300 ${
                  joke.highlight?.includes(i)
                    ? 'bg-[var(--accent-500)]/[0.06]'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                <span className="select-none text-white/20 text-right pr-4 shrink-0 w-8">
                  {i + 1}
                </span>
                <code
                  className={`${
                    joke.highlight?.includes(i) ? 'text-[var(--accent-300)]' : 'text-white/70'
                  }`}
                >
                  {colorizePython(line)}
                </code>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  )
}

function colorizePython(line) {
  const keywords = [
    'def', 'class', 'return', 'if', 'elif', 'else', 'try', 'except',
    'import', 'from', 'while', 'for', 'in', 'not', 'and', 'or',
    'True', 'False', 'None', 'raise', 'match', 'case', 'self',
    'print', 'pass', 'break', 'continue', 'with', 'as', 'yield',
  ]

  const builtins = ['pd', 'list', 'str', 'int', 'Never', 'dataclass', 'Exception']

  const parts = []
  const tokens = line.split(/(\s+|[{}()[\]:;,<>=!?.|&+\-*/]+|"[^"]*"|'[^']*'|#.*$|@\w+)/g)

  tokens.forEach((token, i) => {
    if (!token) return

    if (token.startsWith('#')) {
      parts.push(<span key={i} className="text-[#6a9955] italic">{token}</span>)
    } else if (token.startsWith('"') || token.startsWith("'")) {
      parts.push(<span key={i} className="text-[#ce9178]">{token}</span>)
    } else if (token.startsWith('@')) {
      parts.push(<span key={i} className="text-[#dcdcaa]">{token}</span>)
    } else if (keywords.includes(token)) {
      parts.push(<span key={i} className="text-[#c586c0]">{token}</span>)
    } else if (builtins.includes(token)) {
      parts.push(<span key={i} className="text-[#4ec9b0]">{token}</span>)
    } else if (/^\d+$/.test(token)) {
      parts.push(<span key={i} className="text-[#b5cea8]">{token}</span>)
    } else {
      parts.push(<span key={i}>{token}</span>)
    }
  })

  return parts
}

function CodeComedy() {
  const [sectionRef, isVisible] = useScrollAnimation({ threshold: 0.05 })
  const [containerRef, visibleItems] = useStaggerAnimation(codeJokes.length, { baseDelay: 150 })

  return (
    <section
      ref={sectionRef}
      id="code-comedy"
      className="py-20 px-8 relative z-1 max-[768px]:py-12 max-[768px]:px-4 scroll-mt-20"
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)' }}
    >
      <div className="container">
        <h2 className={`section-title transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Code & Comedy
        </h2>
        <p className={`section-subtitle transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Where syntax meets punchlines — bugs not included (probably)
        </p>

        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,minmax(420px,1fr))] gap-8 max-w-[1100px] mx-auto max-[480px]:grid-cols-1 max-[480px]:gap-6"
        >
          {codeJokes.map((joke, index) => (
            <CodeBlock
              key={index}
              joke={joke}
              isVisible={visibleItems.has(index)}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CodeComedy
