import { useState, useRef, useEffect } from 'react'
import { useClippy } from '../context/ClippyContext'
import { useWindows } from '../context/WindowContext'
import ClippyCharacter from './ClippyCharacter'

const CLIPPY_TIPS = [
  "It looks like you're browsing a portfolio!",
  'Need help finding something?',
  'Ask me about Jared!',
  "I know a few good coding jokes...",
  "Try clicking me for a chat!",
]

function ClippyBubble() {
  const { messages, isLoading, error, isBubbleExpanded, toggleBubble, sendMessage, setIsBubbleExpanded } = useClippy()
  const { windows } = useWindows()
  const [input, setInput] = useState('')
  const [tip, setTip] = useState(null)
  const messagesEndRef = useRef(null)
  const tipTimerRef = useRef(null)

  // Auto-collapse bubble when ClippyApp window is open
  const clippyWindowOpen = windows.clippy?.isOpen && !windows.clippy?.isMinimized
  useEffect(() => {
    if (clippyWindowOpen && isBubbleExpanded) {
      setIsBubbleExpanded(false)
    }
  }, [clippyWindowOpen, isBubbleExpanded, setIsBubbleExpanded])

  // Periodic tips when collapsed
  useEffect(() => {
    if (isBubbleExpanded || clippyWindowOpen) {
      setTip(null)
      return
    }

    const showTip = () => {
      const randomTip = CLIPPY_TIPS[Math.floor(Math.random() * CLIPPY_TIPS.length)]
      setTip(randomTip)
      setTimeout(() => setTip(null), 4000)
    }

    // First tip after 10s
    tipTimerRef.current = setTimeout(() => {
      showTip()
      // Then every 30-60s
      tipTimerRef.current = setInterval(showTip, 30000 + Math.random() * 30000)
    }, 10000)

    return () => {
      clearTimeout(tipTimerRef.current)
      clearInterval(tipTimerRef.current)
    }
  }, [isBubbleExpanded, clippyWindowOpen])

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

  // Don't show bubble if ClippyApp window is open
  if (clippyWindowOpen) return null

  return (
    <div className="fixed bottom-[72px] right-4 z-[800] max-[768px]:bottom-[64px] max-[768px]:right-2">
      {/* Expanded chat panel */}
      {isBubbleExpanded && (
        <div
          className="absolute bottom-14 right-0 w-80 rounded-2xl border shadow-xl overflow-hidden animate-[clippySpeechIn_0.2s_ease] max-[768px]:fixed max-[768px]:bottom-[56px] max-[768px]:left-0 max-[768px]:right-0 max-[768px]:w-auto max-[768px]:rounded-b-none max-[768px]:rounded-t-2xl"
          style={{
            background: 'var(--win-bg)',
            borderColor: 'var(--win-border)',
            height: '400px',
            maxHeight: 'calc(100vh - 140px)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-3 py-2.5 border-b shrink-0"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">📎</span>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Clippy
              </span>
            </div>
            <button
              onClick={toggleBubble}
              className="w-6 h-6 flex items-center justify-center rounded-md transition-colors cursor-pointer hover:opacity-70"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5" style={{ height: 'calc(100% - 100px)' }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-1.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <span className="text-sm shrink-0 mt-0.5">📎</span>
                )}
                <div
                  className="max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed"
                  style={
                    msg.role === 'user'
                      ? { background: 'var(--accent-primary)', color: 'white', borderBottomRightRadius: '4px' }
                      : { background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderBottomLeftRadius: '4px' }
                  }
                >
                  {msg.role === 'assistant' && msg.content === '' && isLoading ? (
                    <div className="flex gap-1 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full animate-[typingDots_1.4s_ease-in-out_infinite]" style={{ background: 'var(--text-tertiary)' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-[typingDots_1.4s_ease-in-out_infinite]" style={{ background: 'var(--text-tertiary)', animationDelay: '0.2s' }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-[typingDots_1.4s_ease-in-out_infinite]" style={{ background: 'var(--text-tertiary)', animationDelay: '0.4s' }} />
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {error && (
              <div className="text-center text-xs py-1" style={{ color: '#ef4444' }}>{error}</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-2 px-3 py-2.5 border-t shrink-0"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border outline-none"
              style={{
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-light)',
              }}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-opacity cursor-pointer disabled:opacity-40"
              style={{ background: 'var(--accent-primary)' }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Speech bubble tip */}
      {tip && !isBubbleExpanded && (
        <div
          className="absolute bottom-14 right-0 px-3 py-2 rounded-xl text-xs max-w-[200px] shadow-lg animate-[clippySpeechIn_0.2s_ease]"
          style={{
            background: 'var(--win-bg)',
            color: 'var(--text-primary)',
            border: '1px solid var(--win-border)',
          }}
        >
          {tip}
          <div
            className="absolute -bottom-1.5 right-5 w-3 h-3 rotate-45"
            style={{ background: 'var(--win-bg)', border: '1px solid var(--win-border)', borderTop: 'none', borderLeft: 'none' }}
          />
        </div>
      )}

      {/* Clippy button */}
      <button
        onClick={toggleBubble}
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-all cursor-pointer hover:scale-110 active:scale-95"
        style={{
          background: 'var(--win-bg)',
          borderColor: isBubbleExpanded ? 'var(--accent-primary)' : 'var(--border-medium)',
          boxShadow: isBubbleExpanded ? '0 0 16px var(--shadow-accent)' : '0 4px 16px rgba(0,0,0,0.15)',
        }}
      >
        <ClippyCharacter size={32} animated={!isBubbleExpanded} />
      </button>
    </div>
  )
}

export default ClippyBubble
