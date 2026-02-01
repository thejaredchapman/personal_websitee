import { useState, useRef, useEffect } from 'react'
import './Chatbot.css'

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm an AI assistant. Ask me anything about my work in AI or comedy!",
      sender: 'bot',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot response - replace with actual API call
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const getBotResponse = (input) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes('ai') || lowerInput.includes('machine learning')) {
      return "I specialize in ML infrastructure, NLP, and computer vision. Check out my AI Work section to see some of my projects!"
    }
    if (lowerInput.includes('comedy') || lowerInput.includes('show') || lowerInput.includes('funny')) {
      return "I perform stand-up comedy at various venues! Check out the Comedy section for upcoming shows and booking info."
    }
    if (lowerInput.includes('hire') || lowerInput.includes('work') || lowerInput.includes('job')) {
      return "I'm always open to interesting opportunities! Check out my Resume section and feel free to reach out via email."
    }
    if (lowerInput.includes('contact') || lowerInput.includes('email')) {
      return "You can reach me at your.email@example.com or connect with me on LinkedIn and Twitter!"
    }
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! Great to meet you. How can I help you today?"
    }

    return "That's a great question! Feel free to explore my website or drop me an email for more details. Is there anything specific about AI or comedy you'd like to know?"
  }

  const quickReplies = [
    "Tell me about your AI work",
    "Upcoming comedy shows?",
    "How can I hire you?",
  ]

  const handleQuickReply = (reply) => {
    setInputValue(reply)
  }

  return (
    <div className="chatbot-container">
      {/* Chat Window */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">🤖</div>
            <div>
              <h4>Chat Assistant</h4>
              <span className="chatbot-status">Online</span>
            </div>
          </div>
          <button
            className="chatbot-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
            >
              {message.sender === 'bot' && (
                <span className="message-avatar">🤖</span>
              )}
              <div className="message-bubble">{message.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot">
              <span className="message-avatar">🤖</span>
              <div className="message-bubble typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="quick-replies">
          {quickReplies.map((reply, index) => (
            <button
              key={index}
              className="quick-reply-btn"
              onClick={() => handleQuickReply(reply)}
            >
              {reply}
            </button>
          ))}
        </div>

        <form className="chatbot-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" aria-label="Send message">
            <span>➤</span>
          </button>
        </form>
      </div>

      {/* Toggle Button */}
      <button
        className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        <span className="toggle-icon chat-icon">💬</span>
        <span className="toggle-icon close-icon">✕</span>
      </button>
    </div>
  )
}

export default Chatbot
