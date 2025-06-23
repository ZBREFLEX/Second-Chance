"use client"

import { useState, useEffect } from "react"
import { User, Shield, Lock, Clock, Send, Paperclip, Info, ArrowLeft } from "lucide-react"
import "./css/CounselorCommunication.css"

const CounselorCommunication = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "counselor",
      name: "Dr. Sarah Johnson",
      message: "Hello, I'm Dr. Sarah Johnson. How are you feeling today?",
      time: "10:30 AM",
      isRead: true,
    },
    {
      id: 2,
      sender: "user",
      message: "Hi Dr. Johnson. I've been struggling with anxiety about my recovery progress.",
      time: "10:32 AM",
      isRead: true,
    },
    {
      id: 3,
      sender: "counselor",
      name: "Dr. Sarah Johnson",
      message:
        "I understand that recovery can be challenging. Would you like to talk about what specific concerns you have?",
      time: "10:33 AM",
      isRead: true,
    },
    {
      id: 4,
      sender: "user",
      message: "I'm worried about going back to my old neighborhood. There are triggers everywhere.",
      time: "10:35 AM",
      isRead: true,
    },
    {
      id: 5,
      sender: "counselor",
      name: "Dr. Sarah Johnson",
      message:
        "That's a valid concern. Let's work on developing some coping strategies for when you encounter these triggers.",
      time: "10:36 AM",
      isRead: false,
    },
  ])

  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      sender: "user",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isRead: false,
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate counselor typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const counselorResponse = {
        id: messages.length + 2,
        sender: "counselor",
        name: "Dr. Sarah Johnson",
        message:
          "That's a great point. Let's discuss some strategies you can use when you encounter those situations. Would you like to schedule a video session to talk about this in more detail?",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isRead: false,
      }
      setMessages((prev) => [...prev, counselorResponse])
    }, 3000)
  }

  useEffect(() => {
    // Scroll to bottom of messages
    const messageContainer = document.querySelector(".chat-messages")
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight
    }
  }, [messages])

  return (
    <div className="counselor-communication-page">
      <div className="back-to-home">
        <button className="back-button" onClick={() => (window.location.href = "/")}>
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
      </div>
      <div className="page-header">
        <h1>Counselor Communication Portal</h1>
        <p>Connect with certified counselors through our secure communication portal</p>
      </div>

      <div className="info-section">
        <div className="info-card">
          <Shield className="info-icon" />
          <h3>Secure & Confidential</h3>
          <p>All communications are encrypted end-to-end and strictly confidential</p>
        </div>
        <div className="info-card">
          <User className="info-icon" />
          <h3>Certified Professionals</h3>
          <p>Connect with licensed counselors specialized in addiction recovery</p>
        </div>
        <div className="info-card">
          <Clock className="info-icon" />
          <h3>24/7 Support</h3>
          <p>Access support whenever you need it, day or night</p>
        </div>
      </div>

      <div className="chat-demo-section">
        <h2>Communication Portal Demo</h2>
        <p>Experience how our secure messaging system works</p>

        <div className="chat-container">
          <div className="chat-header">
            <div className="counselor-info">
              <div className="counselor-avatar">SJ</div>
              <div className="counselor-details">
                <h3>Dr. Sarah Johnson</h3>
                <span className="counselor-status online">Online</span>
              </div>
            </div>
            <div className="chat-actions">
              <button className="action-button">
                <Info size={18} />
                <span>Info</span>
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender === "user" ? "user-message" : "counselor-message"}`}>
                {msg.sender === "counselor" && (
                  <div className="message-avatar">
                    {msg.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div className="message-content">
                  {msg.sender === "counselor" && <div className="message-sender">{msg.name}</div>}
                  <div className="message-bubble">{msg.message}</div>
                  <div className="message-info">
                    <span className="message-time">{msg.time}</span>
                    {msg.sender === "user" && (
                      <span className={`message-status ${msg.isRead ? "read" : "sent"}`}>
                        {msg.isRead ? "Read" : "Sent"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message counselor-message">
                <div className="message-avatar">SJ</div>
                <div className="message-content">
                  <div className="message-sender">Dr. Sarah Johnson</div>
                  <div className="message-bubble typing">
                    <span className="typing-indicator"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={handleSendMessage}>
            <button type="button" className="attachment-button">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              placeholder="Type your message here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="send-button" disabled={!newMessage.trim()}>
              <Send size={20} />
            </button>
          </form>

          <div className="chat-footer">
            <Lock size={14} />
            <span>End-to-end encrypted | Your privacy is our priority</span>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>How It Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-number">1</div>
            <h3>Connect with a Counselor</h3>
            <p>Get matched with a certified counselor specialized in addiction recovery</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">2</div>
            <h3>Secure Messaging</h3>
            <p>Communicate through our encrypted platform at your convenience</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">3</div>
            <h3>Schedule Sessions</h3>
            <p>Set up video or voice calls for more in-depth counseling sessions</p>
          </div>
          <div className="feature-card">
            <div className="feature-number">4</div>
            <h3>Track Progress</h3>
            <p>Monitor your recovery journey with personalized tracking tools</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Connect?</h2>
        <p>Take the first step towards recovery with professional support</p>
        <button className="cta-button">Connect with a Counselor</button>
        <div className="privacy-note">
          <Lock size={14} />
          <span>Your privacy is protected. All communications are confidential.</span>
        </div>
      </div>
    </div>
  )
}

export default CounselorCommunication
