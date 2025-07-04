"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Send, Paperclip, Info, Phone, Video, ChevronDown, ChevronUp } from "react-feather"
import Sidebar from "../components/Sidebar"
import "../styles/CounselorChat.css"

const VictimCounselorChat = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [counselor, setCounselor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [expandedSections, setExpandedSections] = useState({
    info: false,
    session: true,
  })
  const messagesEndRef = useRef(null)

  const victimId = 1 // In real app: get from auth
  const counselorId = 2 // Fixed or assigned counselor

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/chat/messages?senderId=${victimId}&receiverId=${counselorId}`)
        setMessages(res.data)
      } catch (err) {
        console.error("Failed to load messages", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMessages()

    // Mock counselor info (replace with API later)
    setCounselor({
      id: counselorId,
      name: "Dr. Sarah Johnson",
      title: "Addiction Specialist",
      avatar: "/placeholder.svg",
      specialization: "Substance Abuse, Trauma Recovery",
      experience: "12 years",
      availability: "Mon, Wed, Fri",
      bio: "Helping individuals overcome addiction using trauma-informed care.",
      rating: 4.9,
      reviewCount: 124,
      status: "online",
      nextSession: new Date(Date.now() + 86400000).toISOString(),
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const userMessage = {
      id: `m${Date.now()}`,
      sender: "user",
      text: newMessage,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    try {
      await axios.post("http://localhost:5000/api/chat/messages", {
        sender_id: victimId,
        receiver_id: counselorId,
        content: newMessage,
      })
    } catch (err) {
      console.error("Error sending message", err)
    }
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

  const groupMessagesByDate = () => {
    const groups = {}
    messages.forEach((message) => {
      const date = new Date(message.timestamp).toDateString()
      if (!groups[date]) groups[date] = []
      groups[date].push(message)
    })

    return Object.entries(groups).map(([date, msgs]) => ({
      date,
      messages: msgs,
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
              {/* Header */}
              <div className="chat-header">
                <div className="counselor-info">
                  <img src={counselor.avatar} alt={counselor.name} className="counselor-avatar" />
                  <div className="counselor-details">
                    <div className="counselor-name-status">
                      <h2>{counselor.name}</h2>
                      <span className={`counselor-status ${counselor.status}`}>{counselor.status}</span>
                    </div>
                    <p>{counselor.title}</p>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="section-toggle" onClick={() => toggleSection("info")}>
                    <Info size={18} />
                    {expandedSections.info ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <button className="chat-action-btn"><Phone size={18} /></button>
                  <button className="chat-action-btn"><Video size={18} /></button>
                </div>
              </div>

              {/* Expanded Info */}
              {expandedSections.info && (
                <div className="counselor-expanded-info">
                  <div className="info-item"><strong>Specialization:</strong> {counselor.specialization}</div>
                  <div className="info-item"><strong>Experience:</strong> {counselor.experience}</div>
                  <div className="info-item"><strong>Availability:</strong> {counselor.availability}</div>
                </div>
              )}

              {/* Next Session */}
              <div className="next-session-banner">
                <div className="session-info">
                  <button className="session-toggle" onClick={() => toggleSection("session")}>
                    {expandedSections.session ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  <span>Next session: {formatNextSession(counselor.nextSession)}</span>
                </div>
                {expandedSections.session && <button className="reschedule-btn">Reschedule</button>}
              </div>

              {/* Messages */}
              <div className="chat-messages">
                {groupMessagesByDate().map((group, groupIndex) => (
                  <div key={groupIndex} className="message-group">
                    <div className="date-separator"><span>{formatDate(group.date)}</span></div>
                    {group.messages.map((message) => (
                      <div key={message.id} className={`message ${message.sender === "user" ? "user" : "counselor"}`}>
                        {message.sender === "counselor" && (
                          <img src={counselor.avatar} alt={counselor.name} className="message-avatar" />
                        )}
                        <div className="message-content">
                          <div className="message-text">{message.text || message.content}</div>
                          <div className="message-time">{formatTime(message.timestamp)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form className="chat-input" onSubmit={handleSendMessage}>
                <button type="button" className="attachment-btn"><Paperclip size={18} /></button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button type="submit" className="send-btn" disabled={!newMessage.trim()}>
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

export default VictimCounselorChat
