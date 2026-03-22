import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ClippyContext = createContext(undefined)

const GREETING = "Hi! I'm Clippy, Jared's digital assistant that looks similar but in no way the same. It looks like you're checking out his portfolio! Ask me anything about his projects, experience, skills, or just ask for a joke."

let msgId = 0
function nextId() {
  return `msg-${++msgId}`
}

export function ClippyProvider({ children }) {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isBubbleExpanded, setIsBubbleExpanded] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const abortRef = useRef(null)
  const messagesRef = useRef([])

  // Keep ref in sync with state
  const updateMessages = useCallback((updater) => {
    setMessages((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      messagesRef.current = next
      return next
    })
  }, [])

  const greet = useCallback(() => {
    if (hasGreeted) return
    setHasGreeted(true)
    updateMessages([{ id: nextId(), role: 'assistant', content: GREETING }])
  }, [hasGreeted, updateMessages])

  const toggleBubble = useCallback(() => {
    setIsBubbleExpanded((prev) => {
      const next = !prev
      if (next && !hasGreeted) {
        setHasGreeted(true)
        updateMessages([{ id: nextId(), role: 'assistant', content: GREETING }])
      }
      return next
    })
  }, [hasGreeted, updateMessages])

  const clearChat = useCallback(() => {
    if (abortRef.current) abortRef.current.abort()
    updateMessages([])
    setIsLoading(false)
    setError(null)
    setHasGreeted(false)
  }, [updateMessages])

  const sendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return

    const userMsg = { id: nextId(), role: 'user', content: text.trim() }
    const assistantMsg = { id: nextId(), role: 'assistant', content: '' }

    updateMessages((prev) => [...prev, userMsg, assistantMsg])
    setIsLoading(true)
    setError(null)

    // Build messages for API from ref (synchronous, always current)
    // Filter out the empty assistant placeholder and any empty-content messages
    const apiMessages = messagesRef.current
      .filter((msg) => msg.id !== assistantMsg.id && msg.content.trim().length > 0)
      .map(({ role, content }) => ({ role, content }))

    // Keep only last 20 messages for API
    const trimmed = apiMessages.slice(-20)

    const controller = new AbortController()
    abortRef.current = controller

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: trimmed }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(err.error || `HTTP ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue

          try {
            const parsed = JSON.parse(data)
            if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
              updateMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMsg.id
                    ? { ...msg, content: msg.content + parsed.delta.text }
                    : msg
                )
              )
            }
          } catch {
            // Skip non-JSON lines
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message)
      // Remove the empty assistant message on error
      updateMessages((prev) => prev.filter((msg) => msg.id !== assistantMsg.id))
    } finally {
      setIsLoading(false)
      abortRef.current = null
    }
  }, [isLoading, updateMessages])

  return (
    <ClippyContext.Provider
      value={{
        messages,
        isLoading,
        error,
        isBubbleExpanded,
        hasGreeted,
        greet,
        toggleBubble,
        clearChat,
        sendMessage,
        setIsBubbleExpanded,
      }}
    >
      {children}
    </ClippyContext.Provider>
  )
}

export function useClippy() {
  const ctx = useContext(ClippyContext)
  if (!ctx) throw new Error('useClippy must be used within ClippyProvider')
  return ctx
}
