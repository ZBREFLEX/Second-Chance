"use client"

import { useState } from "react"
import "../styles/CounselorMessageCard.css"
// Import your custom icon instead
import MessageCircle from "./icons/MessageCircle"

const CounselorMessageCard = ({ counselor, lastMessage }) => {
  const [message, setMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    console.log("Sending message:", message)
    setMessage("")
  }

  return (
    <div className="counselor-message-card">
      <div className="counselor-message-header">
        <h3>Your Counselor</h3>
        <span className="counselor-name">{counselor?.name || "Not assigned yet"}</span>
      </div>

      <div className="counselor-message-content">
        {counselor ? (
          <>
            <div className="counselor-info">
              <img src={counselor.avatar || "/placeholder.svg"} alt={counselor.name} className="counselor-avatar" />
              <div className="counselor-details">
                <h4>{counselor.name}</h4>
                <p>{counselor.specialization}</p>
              </div>
            </div>

            <div className="last-message">
              <p className="message-label">Last message:</p>
              <p className="message-text">{lastMessage || "No messages yet"}</p>
            </div>

            <form className="quick-message-form" onSubmit={handleSendMessage}>
              <input
                type="text"
                placeholder="Type a quick message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <div className="no-counselor">
            <MessageCircle size={48} />
            <p>You don't have a counselor assigned yet.</p>
            <button className="request-counselor-btn">Request Counselor</button>
          </div>
        )}
      </div>

      <div className="counselor-message-footer">
        <button className="view-chat-btn">View Full Conversation</button>
      </div>
    </div>
  )
}

export default CounselorMessageCard
