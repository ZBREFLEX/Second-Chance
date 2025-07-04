"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Layout from "./components/Layout"
import "./css/CommunicationPortal.css"

const CommunicationPortal = () => {
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [patients, setPatients] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef(null)

  useEffect(() => {
    axios.get("http://localhost:5000/api/chat/users?role=victim")
      .then(res => setPatients(res.data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (selectedPatient) {
      axios.get(`http://localhost:5000/api/chat/messages?senderId=${selectedPatient.id}&receiverId=2`)
        .then(res => setMessages(res.data.map((msg, index) => ({
          id: index,
          sender: msg.sender_id === 2 ? "counselor" : "patient",
          content: msg.content,
          time: new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }))))
        .catch(console.error)
    }
  }, [selectedPatient])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedPatient) return

    const msg = {
      sender_id: 2, // counselor
      receiver_id: selectedPatient.id,
      content: newMessage,
    }

    await axios.post("http://localhost:5000/api/chat/messages", msg)

    setMessages([...messages, {
      id: messages.length + 1,
      sender: "counselor",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }])

    setNewMessage("")
  }

  const filteredPatients = patients.filter(
  (patient) => patient.name?.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <Layout title="Communication Portal">
      <div className="communication-container">
        <div className="patients-sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="patient-search"
            />
          </div>

          <div className="patients-list">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className={`patient-item ${selectedPatient?.id === patient.id ? "active" : ""}`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="patient-avatar">
                  <div className={`status-indicator ${patient.status || "offline"}`}></div>
                </div>
                <div className="patient-info">
                  <div className="patient-name-container">
                    <h3>{patient.name}</h3>
                    <span className="message-time">{patient.time || ""}</span>
                  </div>
                  <p className="last-message">{patient.lastMessage || ""}</p>
                </div>
                {patient.unread > 0 && <div className="unread-badge">{patient.unread}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="chat-container">
          {selectedPatient ? (
            <>
              <div className="chat-header">
                <div className="chat-patient-info">
                  <div className="patient-avatar large">
                    <div className={`status-indicator ${selectedPatient.status || "offline"}`}></div>
                  </div>
                  <div>
                    <h3>{selectedPatient.name}</h3>
                    <p className="patient-status">{selectedPatient.status === "online" ? "Online" : "Offline"}</p>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-icon video-call-btn" title="Video Call">
                    <i className="video-icon"></i>
                  </button>
                  <button className="action-icon voice-call-btn" title="Voice Call">
                    <i className="voice-icon"></i>
                  </button>
                  <button className="action-icon more-options-btn" title="More Options">
                    <i className="more-icon"></i>
                  </button>
                </div>
              </div>

              <div className="messages-container">
                <div className="messages-list">
                  {messages.map((message) => (
                    <div key={message.id} className={`message ${message.sender === "counselor" ? "sent" : "received"}`}>
                      <div className="message-content">
                        <p>{message.content}</p>
                        <span className="message-time">{message.time}</span>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <form className="message-input-container" onSubmit={handleSendMessage}>
                <button type="button" className="attachment-btn" title="Add Attachment">
                  <i className="attachment-icon"></i>
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="message-input"
                />
                <button type="submit" className="send-btn" disabled={newMessage.trim() === ""}>
                  <i className="send-icon"></i>
                </button>
              </form>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-content">
                <div className="no-chat-icon"></div>
                <h3>Select a patient to start messaging</h3>
                <p>Choose from your patient list or search for a specific patient</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CommunicationPortal
