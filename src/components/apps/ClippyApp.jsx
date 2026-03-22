import { useState, useRef, useEffect } from 'react'
import { useClippy } from '../../context/ClippyContext'
import ClippyCharacter from '../ClippyCharacter'

const SUGGESTIONS = [
  "What are Jared's skills?",
  'Tell me about his projects',
  "What's his background?",
  'Tell me a joke',
]

function renderContent(text) {
  // Simple markdown: **bold**, [text](url), bullet lists
  return text.split('\n').map((line, i) => {
    const isBullet = line.match(/^[-•]\s+(.*)/)
    const content = isBullet ? isBullet[1] : line

    // Process inline formatting
    const parts = []
    let remaining = content
    let key = 0

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
      // Link
      const linkMatch = remaining.match(/\[(.+?)\]\((https?:\/\/.+?)\)/)

      const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity
      const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : Infinity

      if (boldIdx === Infinity && linkIdx === Infinity) {
        parts.push(<span key={key++}>{remaining}</span>)
        break
      }

      if (boldIdx <= linkIdx && boldMatch) {
        if (boldIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, boldIdx)}</span>)
        parts.push(<strong key={key++}>{boldMatch[1]}</strong>)
        remaining = remaining.slice(boldIdx + boldMatch[0].length)
      } else if (linkMatch) {
        if (linkIdx > 0) parts.push(<span key={key++}>{remaining.slice(0, linkIdx)}</span>)
        parts.push(
          <a
            key={key++}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            style={{ color: 'var(--accent-primary)' }}
          >
            {linkMatch[1]}
          </a>
        )
        remaining = remaining.slice(linkIdx + linkMatch[0].length)
      }
    }

    if (isBullet) {
      return (
        <div key={i} className="flex gap-1.5 ml-2">
          <span>•</span>
          <span>{parts}</span>
        </div>
      )
    }

    return line === '' ? <br key={i} /> : <div key={i}>{parts}</div>
  })
}

function ClippyApp() {
  const { messages, isLoading, error, sendMessage, clearChat, greet, hasGreeted } = useClippy()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!hasGreeted) greet()
  }, [hasGreeted, greet])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    sendMessage(input)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b shrink-0"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <div className="flex items-center gap-2">
          <ClippyCharacter size={28} />
          <div>
            <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Ask Clippy
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Your portfolio assistant
            </p>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer hover:opacity-80"
          style={{
            color: 'var(--text-secondary)',
            borderColor: 'var(--border-light)',
            background: 'var(--bg-secondary)',
          }}
        >
          Clear
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-4 pt-8">
            <ClippyCharacter size={64} animated />
            <p className="text-sm text-center" style={{ color: 'var(--text-tertiary)' }}>
              Ask me anything about Jared!
            </p>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <span className="text-lg shrink-0 mt-1">📎</span>
            )}
            <div
              className="max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
              style={
                msg.role === 'user'
                  ? {
                      background: 'var(--accent-primary)',
                      color: 'white',
                      borderBottomRightRadius: '4px',
                    }
                  : {
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      borderBottomLeftRadius: '4px',
                    }
              }
            >
              {msg.role === 'assistant' && msg.content === '' && isLoading ? (
                <div className="flex gap-1 py-1">
                  <span className="w-2 h-2 rounded-full animate-[typingDots_1.4s_ease-in-out_infinite]" style={{ background: 'var(--text-tertiary)', animationDelay: '0s' }} />
                  <span className="w-2 h-2 rounded-full animate-[typingDots_1.4s_ease-in-out_infinite]" style={{ background: 'var(--text-tertiary)', animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full animate-[typingDots_1.4s_ease-in-out_infinite]" style={{ background: 'var(--text-tertiary)', animationDelay: '0.4s' }} />
                </div>
              ) : (
                renderContent(msg.content)
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="text-center text-xs py-2" style={{ color: '#ef4444' }}>
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions (only when few messages) */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer hover:opacity-80"
              style={{
                color: 'var(--accent-primary)',
                borderColor: 'var(--accent-200)',
                background: 'var(--accent-50)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-t shrink-0"
        style={{ borderColor: 'var(--border-light)' }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Clippy something..."
          disabled={isLoading}
          className="flex-1 text-sm px-3 py-2 rounded-xl border outline-none transition-colors"
          style={{
            background: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-light)',
          }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-opacity cursor-pointer disabled:opacity-40"
          style={{ background: 'var(--accent-primary)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ClippyApp
