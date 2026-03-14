import { useState } from 'react'

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

dream = careers[
    (careers["happiness"] > 9) &
    (careers["sleep"] > 2)  # impossible, but let's try
]
print(dream)  # Empty DataFrame. As expected.`,
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

# This code has fewer bugs than my set`,
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
  },
]

const PY_KEYWORDS = ['def', 'class', 'return', 'if', 'elif', 'else', 'try', 'except', 'import', 'from', 'while', 'for', 'in', 'not', 'and', 'or', 'True', 'False', 'None', 'raise', 'match', 'case', 'self', 'print', 'pass']
const PY_BUILTINS = ['pd', 'list', 'str', 'int', 'Never', 'dataclass', 'Exception']

function colorize(line) {
  const tokens = line.split(/(\s+|[{}()[\]:;,<>=!?.|&+\-*/]+|"[^"]*"|'[^']*'|#.*$|@\w+)/g)
  return tokens.map((token, i) => {
    if (!token) return null
    if (token.startsWith('#')) return <span key={i} className="text-[#6a9955] italic">{token}</span>
    if (token.startsWith('"') || token.startsWith("'")) return <span key={i} className="text-[#ce9178]">{token}</span>
    if (token.startsWith('@')) return <span key={i} className="text-[#dcdcaa]">{token}</span>
    if (PY_KEYWORDS.includes(token)) return <span key={i} className="text-[#c586c0]">{token}</span>
    if (PY_BUILTINS.includes(token)) return <span key={i} className="text-[#4ec9b0]">{token}</span>
    if (/^\d+$/.test(token)) return <span key={i} className="text-[#b5cea8]">{token}</span>
    return <span key={i}>{token}</span>
  })
}

function CodeComedyApp() {
  const [copiedIdx, setCopiedIdx] = useState(null)

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code)
    setCopiedIdx(idx)
    setTimeout(() => setCopiedIdx(null), 2000)
  }

  return (
    <div className="p-6 max-[768px]:p-4">
      <h2 className="text-xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>Code & Comedy</h2>
      <p className="text-sm mb-5" style={{ color: 'var(--text-tertiary)' }}>Where syntax meets punchlines</p>

      <div className="flex flex-col gap-4">
        {codeJokes.map((joke, idx) => (
          <div key={idx} className="rounded-lg overflow-hidden border border-white/[0.08] hover:border-[var(--accent-500)] transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between py-2 px-3 bg-[#1e1e2e] border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                  <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                  <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-white/40 text-[11px] font-mono">{joke.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#3776ab] bg-[#3776ab]/10 py-0.5 px-1.5 rounded">python</span>
                <button
                  onClick={() => handleCopy(joke.code, idx)}
                  className="text-white/20 hover:text-white/60 transition-colors bg-transparent border-none cursor-pointer p-0.5"
                >
                  {copiedIdx === idx ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                  )}
                </button>
              </div>
            </div>
            {/* Code */}
            <div className="bg-[#0d0d1a] p-3 overflow-x-auto font-mono text-[12px] leading-6 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-white/10">
              <pre className="m-0">
                {joke.code.split('\n').map((line, i) => (
                  <div key={i} className="flex hover:bg-white/[0.03] transition-colors">
                    <span className="select-none text-white/15 text-right pr-3 shrink-0 w-6">{i + 1}</span>
                    <code className="text-white/70">{colorize(line)}</code>
                  </div>
                ))}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CodeComedyApp
