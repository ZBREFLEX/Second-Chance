"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import RiskLevelCard from "../components/RiskLevelCard"
import RecoveryProgressCard from "../components/RecoveryProgressCard"
import CounselorMessageCard from "../components/CounselorMessageCard"
import AwarenessResourceCard from "../components/AwarenessResourceCard"
import "../styles/Dashboard.css"

const Dashboard = ({ onLogout }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchUserData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const userData = JSON.parse(localStorage.getItem("user")) || {}

        // Merge with mock data for demo
        setUser({
          ...userData,
          name: userData.name || "John Doe",
          riskLevel: "Moderate",
          lastAssessment: "2023-05-15",
          daysInRecovery: 42,
          counselingSessions: 8,
          milestonesAchieved: 3,
          counselor: {
            name: "Dr. Sarah Johnson",
            specialization: "Addiction Specialist",
            avatar: "/placeholder.svg?height=50&width=50",
          },
          lastMessage: "How are you feeling today? Remember to complete your daily journal entry.",
        })
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [])

  return (
    <div className="dashboard-layout">
      <Sidebar onLogout={onLogout} />

      <main className="dashboard-main">
        {isLoading ? (
          <div className="dashboard-loading">
            <div className="loading-spinner"></div>
            <p>Loading your dashboard...</p>
          </div>
        ) : (
          <>
            <header className="dashboard-header">
              <div className="header-content">
                <h1>Welcome back, {user?.name || "User"}</h1>
                <p className="dashboard-date">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </header>

            <div className="dashboard-summary">
              <div className="summary-item">
                <h3>Days in Recovery</h3>
                <span className="summary-value">{user?.daysInRecovery || 0}</span>
              </div>
              <div className="summary-item">
                <h3>Counseling Sessions</h3>
                <span className="summary-value">{user?.counselingSessions || 0}</span>
              </div>
              <div className="summary-item">
                <h3>Milestones Achieved</h3>
                <span className="summary-value">{user?.milestonesAchieved || 0}</span>
              </div>
            </div>

            <div className="dashboard-grid">
              <RiskLevelCard riskLevel={user?.riskLevel} lastAssessment={user?.lastAssessment} />
              <RecoveryProgressCard />
              <CounselorMessageCard counselor={user?.counselor} lastMessage={user?.lastMessage} />
              <AwarenessResourceCard />
            </div>

            <div className="dashboard-actions">
              <Link to="/risk-assessment" className="dashboard-action-btn">
                Take Risk Assessment
              </Link>
              <Link to="/counselor-chat" className="dashboard-action-btn">
                Chat with Counselor
              </Link>
              <Link to="/awareness-hub" className="dashboard-action-btn">
                Browse Resources
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default Dashboard
