"use client"

import { useState } from "react"
import "./css/RecoveryTracking.css"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data for user's recovery journey
const mockUserData = {
  name: "User",
  startDate: "2023-08-15",
  sobrietyDays: 247,
  programType: "Outpatient",
  counselor: "Dr. Priya Sharma",
  nextAppointment: "2024-05-22T10:30:00",
  riskLevel: "Moderate", // Changed from "Low" to "Moderate"
  goals: [
    { id: 1, title: "Attend all therapy sessions", progress: 100, completed: true },
    { id: 2, title: "Practice mindfulness daily", progress: 85, completed: false },
    { id: 3, title: "Reconnect with family", progress: 70, completed: false },
    { id: 4, title: "Find stable employment", progress: 50, completed: false },
    { id: 5, title: "Complete education course", progress: 30, completed: false },
  ],
  moodData: [
    { date: "2024-04-12", mood: 6, triggers: 2, notes: "Felt anxious after work meeting" },
    { date: "2024-04-13", mood: 7, triggers: 1, notes: "Better day, practiced meditation" },
    { date: "2024-04-14", mood: 8, triggers: 0, notes: "Great day with family" },
    { date: "2024-04-15", mood: 7, triggers: 1, notes: "Slight stress but managed well" },
    { date: "2024-04-16", mood: 9, triggers: 0, notes: "Productive day, feeling confident" },
    { date: "2024-04-17", mood: 8, triggers: 0, notes: "Good energy throughout the day" },
    { date: "2024-04-18", mood: 6, triggers: 3, notes: "Difficult day, but used coping strategies" },
    { date: "2024-04-19", mood: 7, triggers: 1, notes: "Improving after yesterday" },
    { date: "2024-04-20", mood: 8, triggers: 0, notes: "Peaceful weekend" },
    { date: "2024-04-21", mood: 9, triggers: 0, notes: "Feeling strong and motivated" },
  ],
  achievements: [
    { id: 1, title: "30 Days Sober", date: "2023-09-14", icon: "award" },
    { id: 2, title: "Completed Initial Assessment", date: "2023-08-17", icon: "clipboard-check" },
    { id: 3, title: "First Therapy Milestone", date: "2023-10-05", icon: "star" },
    { id: 4, title: "90 Days Sober", date: "2023-11-13", icon: "award" },
    { id: 5, title: "Healthy Coping Skills Mastery", date: "2023-12-20", icon: "shield" },
    { id: 6, title: "6 Months Sober", date: "2024-02-15", icon: "award" },
    { id: 7, title: "Family Reconciliation", date: "2024-03-10", icon: "heart" },
  ],
  supportNetwork: [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      role: "Counselor",
      lastContact: "2024-04-15",
      contactInfo: "Available via portal",
    },
    { id: 2, name: "Support Person", role: "Sponsor", lastContact: "2024-04-19", contactInfo: "9876543210" },
    {
      id: 3,
      name: "Kerala Recovery Group",
      role: "Support Group",
      lastContact: "2024-04-17",
      contactInfo: "Meets Wednesdays 6PM",
    },
    { id: 4, name: "Family Support", role: "Family Support", lastContact: "2024-04-20", contactInfo: "9876543211" },
  ],
}

// Mock data for program statistics
const programStats = {
  totalParticipants: 1458,
  successfulRecoveries: 1087,
  averageSobrietyDuration: "14 months",
  relapsePrevention: "74%",
  employmentRate: "68%",
  familyReunification: "82%",
  monthlyData: [
    { month: "Jan", participants: 120, recoveries: 87 },
    { month: "Feb", participants: 135, recoveries: 98 },
    { month: "Mar", participants: 142, recoveries: 105 },
    { month: "Apr", participants: 158, recoveries: 112 },
    { month: "May", participants: 162, recoveries: 118 },
    { month: "Jun", participants: 170, recoveries: 125 },
    { month: "Jul", participants: 175, recoveries: 130 },
    { month: "Aug", participants: 180, recoveries: 135 },
    { month: "Sep", participants: 185, recoveries: 140 },
    { month: "Oct", participants: 190, recoveries: 145 },
    { month: "Nov", participants: 195, recoveries: 150 },
    { month: "Dec", participants: 200, recoveries: 155 },
  ],
  outcomesByDistrict: [
    { district: "Thiruvananthapuram", successRate: 78 },
    { district: "Kollam", successRate: 72 },
    { district: "Pathanamthitta", successRate: 81 },
    { district: "Alappuzha", successRate: 75 },
    { district: "Kottayam", successRate: 79 },
    { district: "Idukki", successRate: 68 },
    { district: "Ernakulam", successRate: 76 },
    { district: "Thrissur", successRate: 74 },
    { district: "Palakkad", successRate: 71 },
    { district: "Malappuram", successRate: 73 },
    { district: "Kozhikode", successRate: 77 },
    { district: "Wayanad", successRate: 69 },
    { district: "Kannur", successRate: 75 },
    { district: "Kasaragod", successRate: 70 },
  ],
  recoveryFactors: [
    { name: "Counseling", value: 35 },
    { name: "Support Network", value: 25 },
    { name: "Medication", value: 15 },
    { name: "Life Skills", value: 15 },
    { name: "Employment", value: 10 },
  ],
}

// Mock data for testimonials
const testimonials = [
  {
    id: 1,
    name: "Anoop S.",
    age: 32,
    district: "Ernakulam",
    image: "/images/testimonial-1.jpg",
    quote:
      "This program gave me back my life. After 5 years of addiction, I've been sober for 18 months and have rebuilt relationships with my family.",
    sobriety: "18 months",
  },
  {
    id: 2,
    name: "Lakshmi P.",
    age: 28,
    district: "Thrissur",
    image: "/images/testimonial-2.jpg",
    quote:
      "The tracking tools helped me identify my triggers and develop healthier coping mechanisms. I'm now working full-time and mentoring others.",
    sobriety: "2 years",
  },
  {
    id: 3,
    name: "Mohammed K.",
    age: 35,
    district: "Kozhikode",
    image: "/images/testimonial-3.jpg",
    quote:
      "I was skeptical at first, but the personalized approach made all the difference. The counselors truly understood my struggles and helped me find my path to recovery.",
    sobriety: "14 months",
  },
  {
    id: 4,
    name: "Sujatha R.",
    age: 26,
    district: "Thiruvananthapuram",
    image: "/images/testimonial-4.jpg",
    quote:
      "Being able to track my progress gave me the motivation to keep going. Seeing how far I've come reminds me why I never want to go back.",
    sobriety: "9 months",
  },
]

// COLORS
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]
const MOOD_COLORS = {
  1: "#ef4444", // Very Bad
  2: "#f97316", // Bad
  3: "#f59e0b", // Poor
  4: "#eab308", // Below Average
  5: "#facc15", // Average
  6: "#84cc16", // Above Average
  7: "#22c55e", // Good
  8: "#10b981", // Very Good
  9: "#06b6d4", // Excellent
  10: "#0ea5e9", // Perfect
}

function RecoveryTracking() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [newGoal, setNewGoal] = useState("")
  const [userData, setUserData] = useState(mockUserData)
  const [moodRating, setMoodRating] = useState(8)
  const [triggerCount, setTriggerCount] = useState(0)
  const [moodNote, setMoodNote] = useState("")
  const [showAddMoodForm, setShowAddMoodForm] = useState(false)

  // Calculate days since recovery start
  const calculateDaysSince = (startDate) => {
    const start = new Date(startDate)
    const today = new Date()
    const diffTime = Math.abs(today - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // Format date to readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  // Format date to time
  const formatTime = (dateTimeString) => {
    const options = { hour: "2-digit", minute: "2-digit" }
    return new Date(dateTimeString).toLocaleTimeString(undefined, options)
  }

  // Handle adding a new goal
  const handleAddGoal = () => {
    if (newGoal.trim() === "") return

    const newGoalObj = {
      id: userData.goals.length + 1,
      title: newGoal,
      progress: 0,
      completed: false,
    }

    setUserData({
      ...userData,
      goals: [...userData.goals, newGoalObj],
    })

    setNewGoal("")
  }

  // Handle updating goal progress
  const handleUpdateGoalProgress = (goalId, newProgress) => {
    const updatedGoals = userData.goals.map((goal) => {
      if (goal.id === goalId) {
        return {
          ...goal,
          progress: newProgress,
          completed: newProgress === 100,
        }
      }
      return goal
    })

    setUserData({
      ...userData,
      goals: updatedGoals,
    })
  }

  // Handle adding new mood entry
  const handleAddMood = () => {
    if (moodNote.trim() === "") return

    const newMoodEntry = {
      date: new Date().toISOString().split("T")[0],
      mood: moodRating,
      triggers: triggerCount,
      notes: moodNote,
    }

    setUserData({
      ...userData,
      moodData: [newMoodEntry, ...userData.moodData],
    })

    // Reset form
    setMoodRating(8)
    setTriggerCount(0)
    setMoodNote("")
    setShowAddMoodForm(false)
  }

  // Get mood description based on rating
  const getMoodDescription = (rating) => {
    const descriptions = {
      1: "Very Bad",
      2: "Bad",
      3: "Poor",
      4: "Below Average",
      5: "Average",
      6: "Above Average",
      7: "Good",
      8: "Very Good",
      9: "Excellent",
      10: "Perfect",
    }
    return descriptions[rating] || "Unknown"
  }

  // Calculate average mood from mood data
  const calculateAverageMood = () => {
    if (userData.moodData.length === 0) return 0
    const sum = userData.moodData.reduce((acc, entry) => acc + entry.mood, 0)
    return (sum / userData.moodData.length).toFixed(1)
  }

  // Calculate trigger frequency
  const calculateTriggerFrequency = () => {
    if (userData.moodData.length === 0) return 0
    const totalTriggers = userData.moodData.reduce((acc, entry) => acc + entry.triggers, 0)
    return (totalTriggers / userData.moodData.length).toFixed(1)
  }

  // Format mood data for chart
  const formattedMoodData = userData.moodData
    .slice()
    .reverse()
    .map((entry) => ({
      date: entry.date.split("-").slice(1).join("/"), // Format as MM/DD
      mood: entry.mood,
      triggers: entry.triggers,
    }))

  return (
    <div className="recovery-tracking-page">
      <header className="tracking-header">
        <div className="header-content">
          <button className="back-to-home-btn" onClick={() => (window.location.href = "/")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="back-icon"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Home
          </button>
          <h1>Recovery Tracking</h1>
          <p>Monitor your recovery journey with personalized tracking tools and insights</p>
        </div>
      </header>

      <div className="container">
        {/*  <div className="user-profile-banner">
          <div className="user-info">
            <div className="user-avatar">
              <span>
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
           <div className="user-details">
              <h2>{userData.name}</h2>
              <p>
                <span className="detail-label">Recovery Start:</span> {formatDate(userData.startDate)}
              </p>
              <p>
                <span className="detail-label">Program:</span> {userData.programType}
              </p>
            </div> 
          </div>
          <div className="sobriety-counter">
            <div className="counter-value">{userData.sobrietyDays}</div>
            <div className="counter-label">Days Sober</div>
          </div>
        </div>*/}

        <div className="tracking-tabs">
          {/* <button
            className={`tab-button ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button> */}
          {/* <button
            className={`tab-button ${activeTab === "goals" ? "active" : ""}`}
            onClick={() => setActiveTab("goals")}
          >
            Goals & Achievements
          </button>
          <button className={`tab-button ${activeTab === "mood" ? "active" : ""}`} onClick={() => setActiveTab("mood")}>
            Mood Tracking
          </button> */}
          <button
            className={`tab-button ${activeTab === "support" ? "active" : ""}`}
            onClick={() => setActiveTab("support")}
          >
            Support Network
          </button>
          <button
            className={`tab-button ${activeTab === "impact" ? "active" : ""}`}
            onClick={() => setActiveTab("impact")}
          >
            Program Impact
          </button>
        </div>

        {activeTab === "dashboard" && (
          <div className="dashboard-section">
            <div className="dashboard-grid">
              <div className="dashboard-card summary-card">
                <h3>Recovery Summary</h3>
                <div className="summary-stats">
                  <div className="stat-item">
                    <div className="stat-value">{userData.sobrietyDays}</div>
                    <div className="stat-label">Days Sober</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{calculateAverageMood()}</div>
                    <div className="stat-label">Avg. Mood</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{calculateTriggerFrequency()}</div>
                    <div className="stat-label">Triggers/Day</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{userData.goals.filter((g) => g.completed).length}</div>
                    <div className="stat-label">Goals Met</div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card appointment-card">
                <h3>Next Appointment</h3>
                <div className="appointment-details">
                  <div className="appointment-counselor">
                    <div className="counselor-avatar">
                      <span>
                        {userData.counselor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div className="counselor-info">
                      <h4>{userData.counselor}</h4>
                      <p>Your Recovery Counselor</p>
                    </div>
                  </div>
                  <div className="appointment-time">
                    <div className="date">{formatDate(userData.nextAppointment)}</div>
                    <div className="time">{formatTime(userData.nextAppointment)}</div>
                  </div>
                  <button className="reschedule-btn">Reschedule</button>
                </div>
              </div>

              <div className="dashboard-card mood-chart-card">
                <h3>Recent Mood Trends</h3>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={formattedMoodData.slice(-7)} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="mood" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="chart-actions">
                  <button className="view-details-btn" onClick={() => setActiveTab("mood")}>
                    View Details
                  </button>
                </div>
              </div>

              <div className="dashboard-card goals-card">
                <h3>Goals Progress</h3>
                <div className="goals-list">
                  {userData.goals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="goal-item">
                      <div className="goal-info">
                        <h4>{goal.title}</h4>
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${goal.progress}%`,
                              backgroundColor: goal.completed ? "#10b981" : "#3b82f6",
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="goal-progress">{goal.progress}%</div>
                    </div>
                  ))}
                </div>
                {userData.goals.length > 3 && (
                  <div className="more-goals">
                    <button className="view-all-btn" onClick={() => setActiveTab("goals")}>
                      View All Goals ({userData.goals.length})
                    </button>
                  </div>
                )}
              </div>

              <div className="dashboard-card achievements-card">
                <h3>Recent Achievements</h3>
                <div className="achievements-list">
                  {userData.achievements.slice(-3).map((achievement) => (
                    <div key={achievement.id} className="achievement-item">
                      <div className="achievement-icon">
                        {achievement.icon === "award" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="8" r="7"></circle>
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                          </svg>
                        )}
                        {achievement.icon === "star" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        )}
                        {achievement.icon === "heart" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        )}
                        {achievement.icon === "shield" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        )}
                        {achievement.icon === "clipboard-check" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            <path d="M9 14l2 2 4-4"></path>
                          </svg>
                        )}
                      </div>
                      <div className="achievement-info">
                        <h4>{achievement.title}</h4>
                        <p>{formatDate(achievement.date)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="view-all-achievements">
                  <button className="view-all-btn" onClick={() => setActiveTab("goals")}>
                    View All Achievements ({userData.achievements.length})
                  </button>
                </div>
              </div>

              <div className="dashboard-card progress-summary-card">
                <h3>Recovery Progress</h3>
                <div className="progress-summary">
                  <div className="progress-chart">
                    <div className="progress-circle">
                      <span className="progress-percentage">68%</span>
                    </div>
                  </div>
                  <p className="progress-description">
                    You're making steady progress in your recovery journey. Continue building on your strengths and
                    working with your support network.
                  </p>
                </div>
                <div className="progress-actions">
                  <button className="view-details-btn">View Detailed Progress</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "goals" && (
          <div className="goals-section">
            <div className="section-grid">
              <div className="goals-container">
                <div className="section-header">
                  <h3>Recovery Goals</h3>
                  <p>Track your progress towards important recovery milestones</p>
                </div>

                <div className="add-goal-form">
                  <input
                    type="text"
                    placeholder="Add a new goal..."
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddGoal()
                    }}
                  />
                  <button className="add-goal-btn" onClick={handleAddGoal}>
                    Add Goal
                  </button>
                </div>

                <div className="goals-list-full">
                  {userData.goals.map((goal) => (
                    <div key={goal.id} className="goal-item-full">
                      <div className="goal-details">
                        <h4>{goal.title}</h4>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{
                                width: `${goal.progress}%`,
                                backgroundColor: goal.completed ? "#10b981" : "#3b82f6",
                              }}
                            ></div>
                          </div>
                          <span className="progress-text">{goal.progress}%</span>
                        </div>
                      </div>
                      <div className="goal-actions">
                        <div className="progress-controls">
                          <button
                            className="progress-btn"
                            onClick={() => handleUpdateGoalProgress(goal.id, Math.max(0, goal.progress - 10))}
                            disabled={goal.progress === 0}
                          >
                            -
                          </button>
                          <button
                            className="progress-btn"
                            onClick={() => handleUpdateGoalProgress(goal.id, Math.min(100, goal.progress + 10))}
                            disabled={goal.progress === 100}
                          >
                            +
                          </button>
                        </div>
                        <div className="goal-status">
                          {goal.completed ? (
                            <span className="completed-badge">Completed</span>
                          ) : (
                            <span className="in-progress-badge">In Progress</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="achievements-container">
                <div className="section-header">
                  <h3>Achievements</h3>
                  <p>Milestones reached in your recovery journey</p>
                </div>

                <div className="achievements-timeline">
                  {userData.achievements.map((achievement) => (
                    <div key={achievement.id} className="timeline-item">
                      <div className="timeline-icon">
                        {achievement.icon === "award" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"D
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="8" r="7"></circle>
                            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                          </svg>
                        )}
                        {achievement.icon === "star" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        )}
                        {achievement.icon === "heart" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                        )}
                        {achievement.icon === "shield" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        )}
                        {achievement.icon === "clipboard-check" && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                            <path d="M9 14l2 2 4-4"></path>
                          </svg>
                        )}
                      </div>
                      <div className="timeline-content">
                        <div className="achievement-date">{formatDate(achievement.date)}</div>
                        <h4 className="achievement-title">{achievement.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="upcoming-achievements">
                  <h4>Upcoming Milestones</h4>
                  <ul className="upcoming-list">
                    <li>
                      <span className="milestone-name">9 Months Sober</span>
                      <span className="milestone-date">May 15, 2024</span>
                    </li>
                    <li>
                      <span className="milestone-name">Complete Life Skills Program</span>
                      <span className="milestone-date">June 10, 2024</span>
                    </li>
                    <li>
                      <span className="milestone-name">1 Year Sober</span>
                      <span className="milestone-date">August 15, 2024</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mood" && (
          <div className="mood-section">
            <div className="section-header">
              <h3>Mood & Trigger Tracking</h3>
              <p>Monitor your emotional wellbeing and identify patterns</p>
            </div>

            <div className="mood-overview">
              <div className="mood-stats">
                <div className="stat-card">
                  <div className="stat-value">{calculateAverageMood()}</div>
                  <div className="stat-label">Average Mood</div>
                  <div className="stat-description">
                    Your average mood over the past {userData.moodData.length} days
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{calculateTriggerFrequency()}</div>
                  <div className="stat-label">Avg. Triggers Per Day</div>
                  <div className="stat-description">Frequency of reported triggers</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{userData.moodData.length > 0 ? userData.moodData[0].mood : "-"}</div>
                  <div className="stat-label">Latest Mood</div>
                  <div className="stat-description">
                    {userData.moodData.length > 0
                      ? getMoodDescription(userData.moodData[0].mood)
                      : "No mood data recorded"}
                  </div>
                </div>
              </div>

              <div className="mood-chart-container">
                <h4>Mood & Triggers - Last 10 Days</h4>
                <div className="chart-wrapper">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={formattedMoodData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" domain={[0, 10]} />
                      <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="mood"
                        name="Mood Rating"
                        stroke="#10b981"
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="triggers"
                        name="Triggers"
                        stroke="#ef4444"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="mood-tracking-tools">
              {!showAddMoodForm ? (
                <button className="add-mood-btn" onClick={() => setShowAddMoodForm(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Record Today's Mood
                </button>
              ) : (
                <div className="add-mood-form">
                  <h4>How are you feeling today?</h4>
                  <div className="mood-slider-container">
                    <div className="mood-slider">
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={moodRating}
                        onChange={(e) => setMoodRating(Number(e.target.value))}
                        className="slider"
                      />
                      <div className="mood-labels">
                        <span>Poor</span>
                        <span>Average</span>
                        <span>Excellent</span>
                      </div>
                    </div>
                    <div className="mood-value">
                      <span className="mood-number">{moodRating}</span>
                      <span className="mood-text">{getMoodDescription(moodRating)}</span>
                    </div>
                  </div>

                  <div className="trigger-counter">
                    <h4>Number of Triggers Experienced:</h4>
                    <div className="counter-controls">
                      <button
                        className="counter-btn"
                        onClick={() => setTriggerCount(Math.max(0, triggerCount - 1))}
                        disabled={triggerCount === 0}
                      >
                        -
                      </button>
                      <span className="counter-value">{triggerCount}</span>
                      <button className="counter-btn" onClick={() => setTriggerCount(triggerCount + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mood-notes">
                    <h4>Notes:</h4>
                    <textarea
                      placeholder="Describe how you're feeling and any triggers you experienced..."
                      value={moodNote}
                      onChange={(e) => setMoodNote(e.target.value)}
                    ></textarea>
                  </div>

                  <div className="form-actions">
                    <button className="cancel-btn" onClick={() => setShowAddMoodForm(false)}>
                      Cancel
                    </button>
                    <button className="save-mood-btn" onClick={handleAddMood} disabled={moodNote.trim() === ""}>
                      Save Entry
                    </button>
                  </div>
                </div>
              )}

              <div className="mood-history">
                <h4>Recent Mood Entries</h4>
                <div className="mood-entries">
                  {userData.moodData.slice(0, 5).map((entry, index) => (
                    <div key={index} className="mood-entry">
                      <div className="entry-header">
                        <div className="entry-date">{formatDate(entry.date)}</div>
                        <div className="entry-mood">
                          <span
                            className="mood-indicator"
                            style={{ backgroundColor: MOOD_COLORS[entry.mood] || "#10b981" }}
                          ></span>
                          <span className="mood-rating">
                            {entry.mood} - {getMoodDescription(entry.mood)}
                          </span>
                        </div>
                      </div>
                      <div className="entry-details">
                        <div className="entry-triggers">
                          <strong>Triggers:</strong> {entry.triggers}
                        </div>
                        <div className="entry-notes">{entry.notes}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mood-insights">
              <h4>Insights & Patterns</h4>
              <div className="insights-content">
                <div className="insight-card">
                  <div className="insight-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </div>
                  <div className="insight-content">
                    <h5>Mood Improvement</h5>
                    <p>
                      Your average mood has improved by 2.1 points over the past month, indicating positive progress in
                      your recovery journey.
                    </p>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div className="insight-content">
                    <h5>Trigger Pattern Detected</h5>
                    <p>
                      Work-related stress appears to be a common trigger for you. Consider discussing stress management
                      techniques with your counselor.
                    </p>
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                  </div>
                  <div className="insight-content">
                    <h5>Coping Strategy Success</h5>
                    <p>
                      Your mood ratings are consistently higher on days when you practice mindfulness. Consider making
                      this a daily habit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "support" && (
          <div className="support-section">
            <div className="section-header">
              <h3>Your Support Network</h3>
              <p>Connect with people who can help you on your recovery journey</p>
            </div>

            <div className="support-grid">
              <div className="support-contacts">
                <h4>Key Contacts</h4>
                <div className="contacts-list">
                  {userData.supportNetwork.map((contact) => (
                    <div key={contact.id} className="contact-card">
                      <div className="contact-avatar">
                        <span>
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="contact-info">
                        <h5>{contact.name}</h5>
                        <p className="contact-role">{contact.role}</p>
                        <p className="contact-details">
                          <span className="last-contact">Last contact: {formatDate(contact.lastContact)}</span>
                          <span className="contact-method">{contact.contactInfo}</span>
                        </p>
                      </div>
                      <div className="contact-actions">
                        <button className="contact-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                          </svg>
                        </button>
                        <button className="contact-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="add-contact-btn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add New Contact
                </button>
              </div>

              <div className="support-resources">
                <h4>Support Resources</h4>
                <div className="resources-list">
                  <div className="resource-card">
                    <div className="resource-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h5>24/7 Crisis Helpline</h5>
                      <p>Immediate support when you need it most</p>
                      <div className="resource-contact">1800-11-0031</div>
                    </div>
                  </div>
                  <div className="resource-card">
                    <div className="resource-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h5>Kerala Recovery Group</h5>
                      <p>Weekly support meetings</p>
                      <div className="resource-contact">Wednesdays, 6:00 PM at Community Center</div>
                    </div>
                  </div>
                  <div className="resource-card">
                    <div className="resource-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h5>Recovery App</h5>
                      <p>Mobile support tools and resources</p>
                      <button className="download-btn">Download</button>
                    </div>
                  </div>
                  <div className="resource-card">
                    <div className="resource-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                    </div>
                    <div className="resource-content">
                      <h5>Recovery Library</h5>
                      <p>Educational materials and self-help resources</p>
                      <button className="browse-btn">Browse</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="emergency-plan">
                <h4>Your Emergency Plan</h4>
                <div className="plan-content">
                  <p>If you experience a crisis or strong urges, follow these steps:</p>
                  <ol className="plan-steps">
                    <li>
                      <strong>Breathe:</strong> Practice deep breathing for 2 minutes (4 counts in, 4 counts out)
                    </li>
                    <li>
                      <strong>Reach Out:</strong> Call your sponsor (9876543210)
                    </li>
                    <li>
                      <strong>Change Environment:</strong> Move to a different location or go for a walk
                    </li>
                    <li>
                      <strong>Use Coping Skills:</strong> Practice mindfulness or distraction techniques
                    </li>
                    <li>
                      <strong>If Urgent:</strong> Call the 24/7 Crisis Helpline at 1800-11-0031
                    </li>
                  </ol>
                  <button className="edit-plan-btn">Edit Emergency Plan</button>
                </div>
              </div>

              <div className="upcoming-support">
                <h4>Upcoming Support Activities</h4>
                <div className="activities-list">
                  <div className="activity-item">
                    <div className="activity-date">
                      <div className="date-day">22</div>
                      <div className="date-month">May</div>
                    </div>
                    <div className="activity-details">
                      <h5>Counseling Session</h5>
                      <p>With Dr. Priya Sharma at 10:30 AM</p>
                    </div>
                    <div className="activity-actions">
                      <button className="activity-btn">Reschedule</button>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-date">
                      <div className="date-day">24</div>
                      <div className="date-month">May</div>
                    </div>
                    <div className="activity-details">
                      <h5>Group Support Meeting</h5>
                      <p>Kerala Recovery Group at 6:00 PM</p>
                    </div>
                    <div className="activity-actions">
                      <button className="activity-btn">Details</button>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-date">
                      <div className="date-day">28</div>
                      <div className="date-month">May</div>
                    </div>
                    <div className="activity-details">
                      <h5>Life Skills Workshop</h5>
                      <p>Community Center at 2:00 PM</p>
                    </div>
                    <div className="activity-actions">
                      <button className="activity-btn">Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "impact" && (
          <div className="impact-section">
            <div className="section-header">
              <h3>Program Impact & Success Stories</h3>
              <p>See how our recovery program is making a difference across Kerala</p>
            </div>

            <div className="impact-stats">
              <div className="stat-card">
                <div className="stat-value">{programStats.totalParticipants}</div>
                <div className="stat-label">Total Participants</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{programStats.successfulRecoveries}</div>
                <div className="stat-label">Successful Recoveries</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{programStats.averageSobrietyDuration}</div>
                <div className="stat-label">Avg. Sobriety Duration</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{programStats.relapsePrevention}</div>
                <div className="stat-label">Relapse Prevention Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{programStats.employmentRate}</div>
                <div className="stat-label">Employment Rate</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{programStats.familyReunification}</div>
                <div className="stat-label">Family Reunification</div>
              </div>
            </div>

            <div className="impact-charts">
              <div className="chart-container">
                <h4>Monthly Program Participation & Recovery</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={programStats.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="participants" name="Total Participants" fill="#3b82f6" />
                    <Bar dataKey="recoveries" name="Successful Recoveries" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h4>Success Rate by District</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={programStats.outcomesByDistrict}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="district" width={100} />
                    <Tooltip />
                    <Bar dataKey="successRate" name="Success Rate (%)" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h4>Key Recovery Factors</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={programStats.recoveryFactors}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {programStats.recoveryFactors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="success-stories">
              <h4>Success Stories</h4>
              <div className="testimonials">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="testimonial-card">
                    <div className="testimonial-header">
                      <div className="testimonial-avatar">
                        <img src={testimonial.image || "/placeholder.svg?height=80&width=80"} alt={testimonial.name} />
                      </div>
                      <div className="testimonial-person">
                        <h5>{testimonial.name}</h5>
                        <p>
                          {testimonial.age} • {testimonial.district}
                        </p>
                        <div className="sobriety-badge">{testimonial.sobriety} sober</div>
                      </div>
                    </div>
                    <div className="testimonial-content">
                      <div className="quote-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                        </svg>
                      </div>
                      <p className="testimonial-quote">{testimonial.quote}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="impact-cta">
              <div className="cta-content">
                <h4>Join Our Recovery Community</h4>
                <p>
                  Our program has helped over 1,000 individuals reclaim their lives from substance abuse. Take the first
                  step towards recovery today.
                </p>
                <div className="cta-buttons">
                  <button className="primary-btn">Get Started</button>
                  <button className="secondary-btn">Learn More</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="recovery-resources">
        <div className="container">
          <div className="resources-header">
            <h2>Recovery Resources</h2>
            <p>Additional tools and resources to support your recovery journey</p>
          </div>
          <div className="resources-grid">
            <div className="resource-item">
              <div className="resource-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h3>Recovery Workbooks</h3>
              <p>Structured exercises to support your recovery process</p>
              <button className="resource-link">Access Library</button>
            </div>
            <div className="resource-item">
              <div className="resource-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
              </div>
              <h3>Educational Videos</h3>
              <p>Learn about addiction, recovery, and healthy coping skills</p>
              <button className="resource-link">Watch Videos</button>
            </div>
            <div className="resource-item">
              <div className="resource-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3>Support Groups</h3>
              <p>Connect with others on similar recovery journeys</p>
              <button className="resource-link">Find Groups</button>
            </div>
            <div className="resource-item">
              <div className="resource-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </div>
              <h3>Recovery Planning</h3>
              <p>Tools to create and maintain your personalized recovery plan</p>
              <button className="resource-link">Create Plan</button>
            </div>
          </div>
        </div>
      </section>

      <footer className="tracking-footer">
        <div className="container">
          <p>
            This recovery tracking system is provided by the Kerala State Drug Prevention Authority. If you're
            experiencing a crisis, please call our helpline at <a href="tel:18001100031">1800-11-0031</a> or contact
            emergency services at 100.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default RecoveryTracking
