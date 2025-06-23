"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Layout from "./components/Layout"
import "./css/PatientDetails.css"

const PatientDetails = () => {
  const { id } = useParams()
  const [patient, setPatient] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch patient details
    // In a real app, this would be an actual API call to your Node.js backend
    setTimeout(() => {
      setPatient({
        id: Number.parseInt(id),
        name: "John Doe",
        age: 25,
        gender: "Male",
        contactNumber: "+1 (555) 123-4567",
        email: "john.doe@example.com",
        address: "123 Main St, Anytown, USA",
        emergencyContact: "Jane Doe (Sister) - +1 (555) 987-6543",
        registrationDate: "2023-01-15",
        riskLevel: "High",
        status: "Active",

        // Risk assessment data
        riskAssessment: {
          lastAssessment: "2023-06-10",
          score: 78,
          factors: [
            { name: "Previous substance abuse", score: 8, maxScore: 10 },
            { name: "Family history", score: 7, maxScore: 10 },
            { name: "Mental health issues", score: 9, maxScore: 10 },
            { name: "Social support", score: 6, maxScore: 10 },
            { name: "Employment status", score: 5, maxScore: 10 },
          ],
          recommendations: "Weekly counseling sessions, regular drug testing, and family therapy.",
        },

        // Recovery progress data
        recoveryProgress: [
          { date: "2023-02-01", status: "Started", notes: "Initial assessment completed." },
          { date: "2023-03-01", status: "Improving", notes: "Showing signs of improvement. Attending all sessions." },
          { date: "2023-04-01", status: "Stable", notes: "Maintaining sobriety. Engaged in group therapy." },
          { date: "2023-05-01", status: "Improving", notes: "Significant improvement in coping mechanisms." },
          { date: "2023-06-01", status: "Stable", notes: "Continuing to make progress. Family involvement increased." },
        ],

        // Session history
        sessionHistory: [
          {
            id: 1,
            date: "2023-06-10",
            type: "Individual Counseling",
            notes: "Discussed coping strategies for triggers.",
          },
          { id: 2, date: "2023-06-03", type: "Group Therapy", notes: "Participated actively in group discussion." },
          {
            id: 3,
            date: "2023-05-27",
            type: "Family Therapy",
            notes: "Family members expressed concerns and support.",
          },
          {
            id: 4,
            date: "2023-05-20",
            type: "Individual Counseling",
            notes: "Reviewed progress and adjusted treatment plan.",
          },
          { id: 5, date: "2023-05-13", type: "Crisis Intervention", notes: "Emergency session due to relapse risk." },
        ],

        // Notes
        notes: [
          {
            id: 1,
            date: "2023-06-10",
            author: "Dr. Jane Smith",
            content:
              "Patient showing improved coping mechanisms when dealing with stress. Continues to attend all scheduled sessions.",
          },
          {
            id: 2,
            date: "2023-05-27",
            author: "Dr. Jane Smith",
            content:
              "Family therapy session was productive. Family members are supportive but concerned about potential relapse.",
          },
          {
            id: 3,
            date: "2023-05-20",
            author: "Dr. Jane Smith",
            content:
              "Patient reported difficulty sleeping. Discussed non-medicinal approaches to improve sleep quality.",
          },
          {
            id: 4,
            date: "2023-05-13",
            author: "Dr. Jane Smith",
            content:
              "Emergency session held due to patient reporting strong urges to use. Developed immediate action plan.",
          },
          {
            id: 5,
            date: "2023-05-06",
            author: "Dr. Jane Smith",
            content: "Patient missed scheduled appointment. Follow-up call revealed transportation issues.",
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }, [id])

  if (loading) {
    return (
      <Layout title="Patient Details">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading patient data...</p>
        </div>
      </Layout>
    )
  }

  if (!patient) {
    return (
      <Layout title="Patient Details">
        <div className="error-container">
          <h2>Patient Not Found</h2>
          <p>The requested patient information could not be found.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={`Patient: ${patient.name}`}>
      <div className="patient-details-container">
        <div className="patient-header">
          <div className="patient-info">
            <h2>{patient.name}</h2>
            <div className="patient-meta">
              <span className="patient-id">ID: {patient.id}</span>
              <span className="patient-age">Age: {patient.age}</span>
              <span className="patient-gender">Gender: {patient.gender}</span>
              <span className={`risk-level ${patient.riskLevel.toLowerCase()}`}>Risk Level: {patient.riskLevel}</span>
              <span className={`status ${patient.status.toLowerCase()}`}>Status: {patient.status}</span>
            </div>
          </div>
          <div className="patient-actions">
            <button className="action-btn message-btn">
              <i className="message-icon"></i> Message
            </button>
            <button className="action-btn schedule-btn">
              <i className="schedule-icon"></i> Schedule Session
            </button>
          </div>
        </div>

        <div className="tabs-container">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button className={`tab-btn ${activeTab === "risk" ? "active" : ""}`} onClick={() => setActiveTab("risk")}>
              Risk Assessment
            </button>
            <button
              className={`tab-btn ${activeTab === "progress" ? "active" : ""}`}
              onClick={() => setActiveTab("progress")}
            >
              Recovery Progress
            </button>
            <button
              className={`tab-btn ${activeTab === "sessions" ? "active" : ""}`}
              onClick={() => setActiveTab("sessions")}
            >
              Session History
            </button>
            <button
              className={`tab-btn ${activeTab === "notes" ? "active" : ""}`}
              onClick={() => setActiveTab("notes")}
            >
              Notes
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "overview" && (
              <div className="overview-tab">
                <div className="overview-grid">
                  <div className="overview-card personal-info">
                    <h3>Personal Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <label>Full Name</label>
                        <p>{patient.name}</p>
                      </div>
                      <div className="info-item">
                        <label>Age</label>
                        <p>{patient.age}</p>
                      </div>
                      <div className="info-item">
                        <label>Gender</label>
                        <p>{patient.gender}</p>
                      </div>
                      <div className="info-item">
                        <label>Contact Number</label>
                        <p>{patient.contactNumber}</p>
                      </div>
                      <div className="info-item">
                        <label>Email</label>
                        <p>{patient.email}</p>
                      </div>
                      <div className="info-item">
                        <label>Address</label>
                        <p>{patient.address}</p>
                      </div>
                      <div className="info-item">
                        <label>Emergency Contact</label>
                        <p>{patient.emergencyContact}</p>
                      </div>
                      <div className="info-item">
                        <label>Registration Date</label>
                        <p>{patient.registrationDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="overview-card risk-summary">
                    <h3>Risk Summary</h3>
                    <div className="risk-indicator">
                      <div className="risk-level-display">
                        <div className={`risk-circle ${patient.riskLevel.toLowerCase()}`}>
                          <span>{patient.riskAssessment.score}</span>
                        </div>
                        <div className="risk-label">
                          <h4>{patient.riskLevel} Risk</h4>
                          <p>Last assessed: {patient.riskAssessment.lastAssessment}</p>
                        </div>
                      </div>
                    </div>
                    <div className="risk-factors">
                      <h4>Key Risk Factors</h4>
                      <ul>
                        {patient.riskAssessment.factors.map((factor, index) => (
                          <li key={index}>
                            <span>{factor.name}</span>
                            <div className="progress-bar">
                              <div
                                className="progress-fill"
                                style={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                              ></div>
                            </div>
                            <span className="factor-score">
                              {factor.score}/{factor.maxScore}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="overview-card recent-activity">
                    <h3>Recent Activity</h3>
                    <div className="activity-timeline">
                      {patient.sessionHistory.slice(0, 3).map((session) => (
                        <div key={session.id} className="timeline-item">
                          <div className="timeline-date">{session.date}</div>
                          <div className="timeline-content">
                            <h4>{session.type}</h4>
                            <p>{session.notes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="overview-card recovery-summary">
                    <h3>Recovery Summary</h3>
                    <div className="recovery-chart">
                      <div className="chart-placeholder">
                        <p>Recovery progress chart would be displayed here</p>
                      </div>
                    </div>
                    <div className="recovery-status">
                      <h4>Current Status: {patient.recoveryProgress[patient.recoveryProgress.length - 1].status}</h4>
                      <p>{patient.recoveryProgress[patient.recoveryProgress.length - 1].notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "risk" && (
              <div className="risk-tab">
                <div className="risk-assessment-container">
                  <div className="risk-header">
                    <h3>Risk Assessment Details</h3>
                    <button className="new-assessment-btn">New Assessment</button>
                  </div>

                  <div className="risk-summary-card">
                    <div className="risk-score">
                      <div className={`score-circle ${patient.riskLevel.toLowerCase()}`}>
                        <span>{patient.riskAssessment.score}</span>
                      </div>
                      <div className="score-details">
                        <h4>{patient.riskLevel} Risk Level</h4>
                        <p>Last assessment: {patient.riskAssessment.lastAssessment}</p>
                      </div>
                    </div>

                    <div className="risk-recommendations">
                      <h4>Recommendations</h4>
                      <p>{patient.riskAssessment.recommendations}</p>
                    </div>
                  </div>

                  <div className="risk-factors-detailed">
                    <h3>Risk Factors Analysis</h3>
                    <table className="factors-table">
                      <thead>
                        <tr>
                          <th>Factor</th>
                          <th>Score</th>
                          <th>Max Score</th>
                          <th>Level</th>
                          <th>Visualization</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.riskAssessment.factors.map((factor, index) => (
                          <tr key={index}>
                            <td>{factor.name}</td>
                            <td>{factor.score}</td>
                            <td>{factor.maxScore}</td>
                            <td>
                              <span className={`factor-level ${getFactorLevel(factor.score, factor.maxScore)}`}>
                                {getFactorLevel(factor.score, factor.maxScore)}
                              </span>
                            </td>
                            <td>
                              <div className="factor-progress">
                                <div
                                  className={`factor-bar ${getFactorLevel(factor.score, factor.maxScore)}`}
                                  style={{ width: `${(factor.score / factor.maxScore) * 100}%` }}
                                ></div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="assessment-history">
                    <h3>Assessment History</h3>
                    <p className="placeholder-text">Historical risk assessment data would be displayed here.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "progress" && (
              <div className="progress-tab">
                <div className="progress-container">
                  <div className="progress-header">
                    <h3>Recovery Progress Tracking</h3>
                    <button className="update-progress-btn">Update Progress</button>
                  </div>

                  <div className="progress-chart-container">
                    <h4>Progress Over Time</h4>
                    <div className="chart-placeholder">
                      <p>Recovery progress chart would be displayed here</p>
                    </div>
                  </div>

                  <div className="progress-timeline">
                    <h4>Progress Timeline</h4>
                    <div className="timeline">
                      {patient.recoveryProgress.map((entry, index) => (
                        <div key={index} className="timeline-entry">
                          <div className="timeline-marker">
                            <div className={`marker-dot ${entry.status.toLowerCase()}`}></div>
                            <div className="marker-line"></div>
                          </div>
                          <div className="timeline-content">
                            <div className="timeline-header">
                              <h5>{entry.date}</h5>
                              <span className={`status-badge ${entry.status.toLowerCase()}`}>{entry.status}</span>
                            </div>
                            <p>{entry.notes}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="milestones-section">
                    <h4>Recovery Milestones</h4>
                    <div className="milestones-placeholder">
                      <p>Recovery milestones and goals would be displayed here.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "sessions" && (
              <div className="sessions-tab">
                <div className="sessions-container">
                  <div className="sessions-header">
                    <h3>Session History</h3>
                    <button className="new-session-btn">Record New Session</button>
                  </div>

                  <div className="sessions-list">
                    <table className="sessions-table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Type</th>
                          <th>Notes</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {patient.sessionHistory.map((session) => (
                          <tr key={session.id}>
                            <td>{session.date}</td>
                            <td>{session.type}</td>
                            <td>{session.notes}</td>
                            <td>
                              <div className="session-actions">
                                <button className="edit-btn">Edit</button>
                                <button className="view-btn">View Details</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="session-stats">
                    <h4>Session Statistics</h4>
                    <div className="stats-grid">
                      <div className="stat-item">
                        <span className="stat-value">{patient.sessionHistory.length}</span>
                        <span className="stat-label">Total Sessions</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">
                          {patient.sessionHistory.filter((s) => s.type === "Individual Counseling").length}
                        </span>
                        <span className="stat-label">Individual Sessions</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">
                          {patient.sessionHistory.filter((s) => s.type === "Group Therapy").length}
                        </span>
                        <span className="stat-label">Group Sessions</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-value">
                          {patient.sessionHistory.filter((s) => s.type === "Family Therapy").length}
                        </span>
                        <span className="stat-label">Family Sessions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="notes-tab">
                <div className="notes-container">
                  <div className="notes-header">
                    <h3>Counselor Notes</h3>
                    <button className="add-note-btn">Add New Note</button>
                  </div>

                  <div className="notes-list">
                    {patient.notes.map((note) => (
                      <div key={note.id} className="note-card">
                        <div className="note-header">
                          <div className="note-meta">
                            <span className="note-date">{note.date}</span>
                            <span className="note-author">{note.author}</span>
                          </div>
                          <div className="note-actions">
                            <button className="edit-note-btn">Edit</button>
                          </div>
                        </div>
                        <div className="note-content">
                          <p>{note.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Helper function to determine risk factor level
const getFactorLevel = (score, maxScore) => {
  const percentage = (score / maxScore) * 100
  if (percentage >= 75) return "high"
  if (percentage >= 50) return "medium"
  return "low"
}

export default PatientDetails
