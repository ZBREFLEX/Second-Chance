"use client"

import { useState, useEffect, useRef } from "react"
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
    // Simulate API call to fetch patients
    setPatients([
      {
        id: 1,
        name: "John Doe",
        lastMessage: "I'll be there for the session tomorrow.",
        time: "10:30 AM",
        unread: 2,
        status: "online",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        lastMessage: "Thank you for your help yesterday.",
        time: "Yesterday",
        unread: 0,
        status: "offline",
      },
      {
        id: 3,
        name: "Michael Brown",
        lastMessage: "Can we reschedule the appointment?",
        time: "Yesterday",
        unread: 1,
        status: "offline",
      },
      {
        id: 4,
        name: "Emily Wilson",
        lastMessage: "I've been feeling much better this week.",
        time: "Monday",
        unread: 0,
        status: "online",
      },
      {
        id: 5,
        name: "Robert Garcia",
        lastMessage: "I need to talk about something important.",
        time: "Sunday",
        unread: 0,
        status: "offline",
      },
    ])
  }, [])

  useEffect(() => {
    // Scroll to bottom of messages when messages change or when a patient is selected
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, selectedPatient])

  useEffect(() => {
    // Load messages when a patient is selected
    if (selectedPatient) {
      // Simulate API call to fetch messages for the selected patient
      const mockMessages = [
        {
          id: 1,
          sender: "patient",
          content: "Hello Dr. Smith, I wanted to ask about the medication you prescribed.",
          time: "10:15 AM",
        },
        { id: 2, sender: "counselor", content: "Hi John, what questions do you have about it?", time: "10:20 AM" },
        {
          id: 3,
          sender: "patient",
          content: "I've been experiencing some side effects like drowsiness. Is that normal?",
          time: "10:22 AM",
        },
        {
          id: 4,
          sender: "counselor",
          content:
            "Yes, drowsiness is a common side effect, especially in the first few days. It should improve as your body adjusts. If it persists or becomes severe, we might need to adjust the dosage.",
          time: "10:25 AM",
        },
        {
          id: 5,
          sender: "patient",
          content: "I see. Thank you for explaining. Also, I'll be there for the session tomorrow.",
          time: "10:30 AM",
        },
      ]
      setMessages(mockMessages)
    } else {
      setMessages([])
    }
  }, [selectedPatient])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim() === "" || !selectedPatient) return

    // Add new message to the list
    const newMsg = {
      id: messages.length + 1,
      sender: "counselor",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // In a real app, you would send this message to your backend
  }

  const filteredPatients = patients.filter((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))

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
                  <div className={`status-indicator ${patient.status}`}></div>
                </div>
                <div className="patient-info">
                  <div className="patient-name-container">
                    <h3>{patient.name}</h3>
                    <span className="message-time">{patient.time}</span>
                  </div>
                  <p className="last-message">{patient.lastMessage}</p>
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
                    <div className={`status-indicator ${selectedPatient.status}`}></div>
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
