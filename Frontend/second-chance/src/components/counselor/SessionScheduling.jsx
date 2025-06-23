"use client"

import { useState, useEffect } from "react"
import Layout from "./components/Layout"
import "./css/SessionScheduling.css"

const SessionScheduling = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [sessions, setSessions] = useState([])
  const [showNewSessionModal, setShowNewSessionModal] = useState(false)
  const [newSession, setNewSession] = useState({
    patientId: "",
    date: "",
    time: "",
    duration: "60",
    type: "Individual Counseling",
    notes: "",
  })
  const [patients, setPatients] = useState([])
  const [view, setView] = useState("week") // 'day', 'week', 'month'

  useEffect(() => {
    // Simulate API call to fetch patients
    setPatients([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Sarah Johnson" },
      { id: 3, name: "Michael Brown" },
      { id: 4, name: "Emily Wilson" },
      { id: 5, name: "Robert Garcia" },
    ])

    // Simulate API call to fetch sessions
    const today = new Date()
    const mockSessions = [
      {
        id: 1,
        patientId: 1,
        patientName: "John Doe",
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0),
        duration: 60,
        type: "Individual Counseling",
        notes: "Follow-up on medication progress",
      },
      {
        id: 2,
        patientId: 2,
        patientName: "Sarah Johnson",
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0),
        duration: 45,
        type: "Group Therapy",
        notes: "Coping strategies discussion",
      },
      {
        id: 3,
        patientId: 3,
        patientName: "Michael Brown",
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 14, 30),
        duration: 60,
        type: "Crisis Intervention",
        notes: "Urgent session requested by patient",
      },
      {
        id: 4,
        patientId: 4,
        patientName: "Emily Wilson",
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 10, 0),
        duration: 60,
        type: "Family Therapy",
        notes: "Including parents in the session",
      },
    ]
    setSessions(mockSessions)
  }, [])

  const handlePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "day") {
      newDate.setDate(newDate.getDate() - 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  const handleNext = () => {
    const newDate = new Date(currentDate)
    if (view === "day") {
      newDate.setDate(newDate.getDate() + 1)
    } else if (view === "week") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (view === "month") {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  const handleNewSession = () => {
    setNewSession({
      patientId: "",
      date: formatDate(new Date()),
      time: "09:00",
      duration: "60",
      type: "Individual Counseling",
      notes: "",
    })
    setShowNewSessionModal(true)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewSession({
      ...newSession,
      [name]: value,
    })
  }

  const handleSubmitSession = (e) => {
    e.preventDefault()

    // Create a new session object
    const [year, month, day] = newSession.date.split("-").map(Number)
    const [hours, minutes] = newSession.time.split(":").map(Number)

    const sessionDate = new Date(year, month - 1, day, hours, minutes)

    const patient = patients.find((p) => p.id === Number.parseInt(newSession.patientId))

    const session = {
      id: sessions.length + 1,
      patientId: Number.parseInt(newSession.patientId),
      patientName: patient ? patient.name : "Unknown",
      date: sessionDate,
      duration: Number.parseInt(newSession.duration),
      type: newSession.type,
      notes: newSession.notes,
    }

    // Add the new session to the list
    setSessions([...sessions, session])

    // Close the modal
    setShowNewSessionModal(false)

    // In a real app, you would send this data to your backend
  }

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  const getWeekDays = () => {
    const days = []
    const startOfWeek = new Date(currentDate)
    const day = currentDate.getDay()
    const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Sunday
    startOfWeek.setDate(diff)

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(date.getDate() + i)
      days.push(date)
    }

    return days
  }

  return (
    <Layout>
      <div className="session-scheduling">
        <h2>Session Scheduling</h2>
        <div className="calendar-controls">
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleToday}>Today</button>
          <button onClick={handleNewSession}>New Session</button>
        </div>
        {/* Calendar View */}
        <div className="calendar">
          {/* Implement calendar view based on 'view' state ('day', 'week', 'month') */}
          {/* For simplicity, let's display the current date */}
          <h3>{currentDate.toDateString()}</h3>
          {/* Display sessions for the selected date/week/month */}
        </div>
        {/* New Session Modal */}
        {showNewSessionModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowNewSessionModal(false)}>
                &times;
              </span>
              <h2>New Session</h2>
              <form onSubmit={handleSubmitSession}>
                <label>
                  Patient:
                  <select name="patientId" value={newSession.patientId} onChange={handleInputChange}>
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Date:
                  <input type="date" name="date" value={newSession.date} onChange={handleInputChange} />
                </label>
                <label>
                  Time:
                  <input type="time" name="time" value={newSession.time} onChange={handleInputChange} />
                </label>
                <label>
                  Duration (minutes):
                  <input type="number" name="duration" value={newSession.duration} onChange={handleInputChange} />
                </label>
                <label>
                  Type:
                  <select name="type" value={newSession.type} onChange={handleInputChange}>
                    <option value="Individual Counseling">Individual Counseling</option>
                    <option value="Group Therapy">Group Therapy</option>
                    <option value="Family Therapy">Family Therapy</option>
                    <option value="Crisis Intervention">Crisis Intervention</option>
                  </select>
                </label>
                <label>
                  Notes:
                  <textarea name="notes" value={newSession.notes} onChange={handleInputChange} />
                </label>
                <button type="submit">Create Session</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default SessionScheduling
