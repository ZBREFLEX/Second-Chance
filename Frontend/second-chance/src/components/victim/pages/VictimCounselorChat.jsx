"use client"

import { useState, useEffect, useRef } from "react"
import { Send, Paperclip, Info, Phone, Video, ChevronDown, ChevronUp } from "react-feather"
import Sidebar from "../components/Sidebar"
import "../styles/CounselorChat.css"

const CounselorChat = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [counselor, setCounselor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState({
    info: false,
    session: true,
  })
  const messagesEndRef = useRef(null)

 useEffect(() => {
  const fetchData = async () => {
    setIsLoading(true)

    try {
      // Replace this with API call in production
      const defaultCounselor = {
        id: "c1",
        name: "Dr. Sarah Johnson",
        title: "Addiction Specialist",
        avatar: "/placeholder.svg?height=150&width=150",
        specialization: "Substance Abuse, Trauma Recovery",
        experience: "12 years",
        availability: "Mon, Wed, Fri",
        bio: "Dr. Johnson specializes in helping individuals overcome addiction through evidence-based approaches. She has extensive experience in trauma-informed care and cognitive behavioral therapy.",
        rating: 4.9,
        reviewCount: 124,
        status: "online",
        nextSession: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      }

      setCounselor(defaultCounselor)

      setMessages([
        {
          id: "m1",
          sender: "counselor",
          text: `Hello! I'm ${defaultCounselor.name}. How are you feeling today?`,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
      ])
    } catch (error) {
      console.error("Error loading chat data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  fetchData()
}, [])


  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    const userMessage = {
      id: `m${messages.length + 1}`,
      sender: "user",
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages([...messages, userMessage])
    setNewMessage("")

    // Simulate counselor response after a delay
    setTimeout(() => {
      const counselorMessage = {
        id: `m${messages.length + 2}`,
        sender: "counselor",
        text: "Thank you for sharing. I'm here to help you through this process. Is there anything specific you'd like to discuss today?",
        timestamp: new Date().toISOString(),
      }

      setMessages((prevMessages) => [...prevMessages, counselorMessage])
    }, 2000)
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatNextSession = (timestamp) => {
    const date = new Date(timestamp)
    return `${date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    })} at ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })}`
  }

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = {}

    messages.forEach((message) => {
      const date = new Date(message.timestamp).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })

    return Object.entries(groups).map(([date, messages]) => ({
      date,
      messages,
    }))
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <div className="chat-container">
          {isLoading ? (
            <div className="loading">Loading conversation...</div>
          ) : (
            <>
              {/* Compact Counselor Info */}
              <div className="chat-header">
                <div className="counselor-info">
                  <img src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} className="counselor-avatar" />
                  <div className="counselor-details">
                    <div className="counselor-name-status">
                      <h2>{counselor.name}</h2>
                      <span className={`counselor-status ${counselor.status}`}>
                        {counselor.status === "online" ? "Online" : "Offline"}
                      </span>
                    </div>
                    <p>{counselor.title}</p>
                  </div>
                </div>

                <div className="chat-actions">
                  <button
                    className="section-toggle"
                    onClick={() => toggleSection("info")}
                    aria-label="Toggle counselor info"
                  >
                    <Info size={18} />
                    {expandedSections.info ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button className="chat-action-btn" aria-label="Call">
                    <Phone size={18} />
                  </button>
                  <button className="chat-action-btn" aria-label="Video call">
                    <Video size={18} />
                  </button>
                </div>
              </div>

              {/* Expandable Counselor Info */}
              {expandedSections.info && (
                <div className="counselor-expanded-info">
                  <div className="info-item">
                    <span className="info-label">Specialization:</span>
                    <span className="info-value">{counselor.specialization}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Experience:</span>
                    <span className="info-value">{counselor.experience}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Availability:</span>
                    <span className="info-value">{counselor.availability}</span>
                  </div>
                </div>
              )}

              {/* Next Session Banner */}
              <div className="next-session-banner">
                <div className="session-info">
                  <button
                    className="session-toggle"
                    onClick={() => toggleSection("session")}
                    aria-label="Toggle session details"
                  >
                    {expandedSections.session ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <span>Next session: {formatNextSession(counselor.nextSession)}</span>
                </div>
                {expandedSections.session && <button className="reschedule-btn">Reschedule</button>}
              </div>

              {/* Chat Messages */}
              <div className="chat-messages">
                {groupMessagesByDate().map((group, groupIndex) => (
                  <div key={groupIndex} className="message-group">
                    <div className="date-separator">
                      <span>{formatDate(new Date(group.date))}</span>
                    </div>

                    {group.messages.map((message) => (
                      <div key={message.id} className={`message ${message.sender}`}>
                        {message.sender === "counselor" && (
                          <img
                            src={counselor.avatar || "/placeholder.svg"}
                            alt={counselor.name}
                            className="message-avatar"
                          />
                        )}
                        <div className="message-content">
                          <div className="message-text">{message.text}</div>
                          <div className="message-time">{formatTime(message.timestamp)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form className="chat-input" onSubmit={handleSendMessage}>
                <button type="button" className="attachment-btn" aria-label="Add attachment">
                  <Paperclip size={18} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="send-btn" disabled={!newMessage.trim()} aria-label="Send message">
                  <Send size={18} />
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default CounselorChat
