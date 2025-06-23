"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "./components/Layout"
import "./css/CounselorDashboard.css"

const CounselorDashboard = () => {
  const [stats, setStats] = useState({
    activePatients: 0,
    highRiskPatients: 0,
    scheduledSessions: 0,
    completedSessions: 0,
  })

  const [recentActivities, setRecentActivities] = useState([])
  const [upcomingSessions, setUpcomingSessions] = useState([])
  const [patients, setPatients] = useState([])

  useEffect(() => {
    // Simulate API calls
    // In a real app, these would be actual API calls to your Node.js backend

    // Fetch dashboard stats
    setStats({
      activePatients: 24,
      highRiskPatients: 7,
      scheduledSessions: 12,
      completedSessions: 156,
    })

    // Fetch recent activities
    setRecentActivities([
      { id: 1, type: "note", patient: "John Doe", action: "Added a new progress note", time: "10 minutes ago" },
      { id: 2, type: "assessment", patient: "Sarah Johnson", action: "Completed risk assessment", time: "1 hour ago" },
      { id: 3, type: "message", patient: "Michael Brown", action: "Sent you a message", time: "3 hours ago" },
      { id: 4, type: "session", patient: "Emily Wilson", action: "Completed therapy session", time: "5 hours ago" },
      { id: 5, type: "note", patient: "Robert Garcia", action: "Updated recovery plan", time: "Yesterday" },
    ])

    // Fetch upcoming sessions
    setUpcomingSessions([
      { id: 1, patient: "John Doe", date: "2023-06-15", time: "09:00 AM", type: "Initial Assessment" },
      { id: 2, patient: "Sarah Johnson", date: "2023-06-15", time: "11:30 AM", type: "Follow-up" },
      { id: 3, patient: "Michael Brown", date: "2023-06-16", time: "02:00 PM", type: "Crisis Intervention" },
      { id: 4, patient: "Emily Wilson", date: "2023-06-17", time: "10:15 AM", type: "Regular Session" },
    ])

    // Fetch patients
    setPatients([
      { id: 1, name: "John Doe", age: 25, riskLevel: "High", status: "Active", lastSession: "2023-06-10" },
      { id: 2, name: "Sarah Johnson", age: 32, riskLevel: "Medium", status: "Active", lastSession: "2023-06-08" },
      { id: 3, name: "Michael Brown", age: 19, riskLevel: "High", status: "Active", lastSession: "2023-06-12" },
      { id: 4, name: "Emily Wilson", age: 28, riskLevel: "Low", status: "Active", lastSession: "2023-06-05" },
      { id: 5, name: "Robert Garcia", age: 41, riskLevel: "Medium", status: "Inactive", lastSession: "2023-05-30" },
    ])
  }, [])

  return (
    <Layout title="Counselor Dashboard">
      <div className="dashboard-container">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon patients-icon"></div>
            <div className="stat-details">
              <h3>Active Patients</h3>
              <p className="stat-value">{stats.activePatients}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon risk-icon"></div>
            <div className="stat-details">
              <h3>High Risk Patients</h3>
              <p className="stat-value">{stats.highRiskPatients}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon scheduled-icon"></div>
            <div className="stat-details">
              <h3>Scheduled Sessions</h3>
              <p className="stat-value">{stats.scheduledSessions}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon completed-icon"></div>
            <div className="stat-details">
              <h3>Completed Sessions</h3>
              <p className="stat-value">{stats.completedSessions}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card patients-list">
            <div className="card-header">
              <h2>Patients</h2>
              <Link to="/patient/list" className="view-all">
                View All
              </Link>
            </div>
            <div className="card-content">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Risk Level</th>
                    <th>Status</th>
                    <th>Last Session</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.id}>
                      <td>{patient.name}</td>
                      <td>{patient.age}</td>
                      <td>
                        <span className={`risk-badge ${patient.riskLevel.toLowerCase()}`}>{patient.riskLevel}</span>
                      </td>
                      <td>{patient.status}</td>
                      <td>{patient.lastSession}</td>
                      <td>
                        <div className="action-buttons">
                          <Link to={`/patient/${patient.id}`} className="view-btn">
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dashboard-card upcoming-sessions">
            <div className="card-header">
              <h2>Upcoming Sessions</h2>
              <Link to="/schedule" className="view-all">
                View All
              </Link>
            </div>
            <div className="card-content">
              {upcomingSessions.map((session) => (
                <div key={session.id} className="session-item">
                  <div className="session-time">
                    <div className="session-date">{session.date}</div>
                    <div className="session-hour">{session.time}</div>
                  </div>
                  <div className="session-details">
                    <h4>{session.patient}</h4>
                    <p>{session.type}</p>
                  </div>
                  <div className="session-actions">
                    <button className="reschedule-btn">Reschedule</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card recent-activities">
            <div className="card-header">
              <h2>Recent Activities</h2>
            </div>
            <div className="card-content">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}-icon`}></div>
                  <div className="activity-details">
                    <p>
                      <strong>{activity.patient}</strong> {activity.action}
                    </p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CounselorDashboard
