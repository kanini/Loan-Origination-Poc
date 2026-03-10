import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import axios from 'axios'
import './Chatbot.css'

export default function Chatbot({ documentText }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I can answer questions about the uploaded document. What would you like to know?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMsg = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/chat/', {
        message: trimmed,
        document_text: documentText,
        history: messages.slice(-10),
      })

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: response.data.reply }
      ])
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.reply || 'Failed to get response. Please try again.'
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: errorMsg }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-fab"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <MessageCircle size={20} />
              <span>Document Assistant</span>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-msg ${msg.role}`}>
                <div className="chatbot-msg-bubble">{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg assistant">
                <div className="chatbot-msg-bubble typing">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask about the document..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />
            <button
              className="chatbot-send"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
