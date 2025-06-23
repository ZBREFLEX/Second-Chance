"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import "../styles/CounselorSelection.css"

const CounselorSelection = () => {
  const [counselors, setCounselors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCounselor, setSelectedCounselor] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    const fetchCounselors = async () => {
      setIsLoading(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Sample counselor data
        const counselorData = [
          {
            id: "c1",
            name: "Dr. Sarah Johnson",
            title: "Addiction Specialist",
            avatar: "/placeholder.svg?height=150&width=150",
            specialization: "Substance Abuse, Trauma Recovery",
            experience: "12 years",
            availability: "Mon, Wed, Fri",
            bio: "Dr. Johnson specializes in helping individuals overcome addiction through evidence-based approaches. She has extensive experience in trauma-informed care and cognitive behavioral therapy.",
            rating: 4.9,
            reviewCount: 124,
          },
          {
            id: "c2",
            name: "Dr. Michael Chen",
            title: "Clinical Psychologist",
            avatar: "/placeholder.svg?height=150&width=150",
            specialization: "Behavioral Addiction, Anxiety",
            experience: "8 years",
            availability: "Tue, Thu, Sat",
            bio: "Dr. Chen focuses on behavioral addictions and anxiety disorders. His approach combines mindfulness techniques with traditional therapeutic methods to help clients develop healthy coping mechanisms.",
            rating: 4.7,
            reviewCount: 98,
          },
          {
            id: "c3",
            name: "Dr. Amara Patel",
            title: "Recovery Specialist",
            avatar: "/placeholder.svg?height=150&width=150",
            specialization: "Substance Abuse, Family Therapy",
            experience: "15 years",
            availability: "Mon, Tue, Thu",
            bio: "With over 15 years of experience, Dr. Patel specializes in substance abuse recovery and family therapy. She believes in a holistic approach that addresses both individual needs and family dynamics.",
            rating: 4.8,
            reviewCount: 156,
          },
        ]

        setCounselors(counselorData)
      } catch (error) {
        console.error("Error fetching counselors:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCounselors()

    // Check if user already has a selected counselor
    const storedCounselor = localStorage.getItem("selectedCounselor")
    if (storedCounselor) {
      setSelectedCounselor(JSON.parse(storedCounselor))
    }
  }, [])

  const handleSelectCounselor = (counselor) => {
    setSelectedCounselor(counselor)
    // Store the selected counselor in localStorage
    localStorage.setItem("selectedCounselor", JSON.stringify(counselor))
  }

  const handleContinue = () => {
    if (selectedCounselor) {
      navigate("/victim/counselor-chat")
    }
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={`full-${i}`} className="star full">
          ★
        </span>,
      )
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ☆
        </span>,
      )
    }

    return stars
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Select a Counselor</h1>
          <p className="selection-subtitle">Choose a counselor to begin your chat sessions</p>
        </header>

        {isLoading ? (
          <div className="loading">Loading available counselors...</div>
        ) : (
          <div className="counselor-selection-container">
            <div className="counselor-grid">
              {counselors.map((counselor) => (
                <div
                  key={counselor.id}
                  className={`counselor-card ${selectedCounselor?.id === counselor.id ? "selected" : ""}`}
                  onClick={() => handleSelectCounselor(counselor)}
                >
                  <div className="counselor-header">
                    <img
                      src={counselor.avatar || "/placeholder.svg"}
                      alt={counselor.name}
                      className="counselor-avatar"
                    />
                    <div className="counselor-info">
                      <h3>{counselor.name}</h3>
                      <p className="counselor-title">{counselor.title}</p>
                      <div className="counselor-rating">
                        <div className="stars">{renderStars(counselor.rating)}</div>
                        <span className="rating-count">({counselor.reviewCount} reviews)</span>
                      </div>
                    </div>
                  </div>

                  <div className="counselor-details">
                    <div className="detail-item">
                      <span className="detail-label">Specialization:</span>
                      <span className="detail-value">{counselor.specialization}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Experience:</span>
                      <span className="detail-value">{counselor.experience}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Availability:</span>
                      <span className="detail-value">{counselor.availability}</span>
                    </div>
                  </div>

                  <p className="counselor-bio">{counselor.bio}</p>

                  {selectedCounselor?.id === counselor.id && (
                    <div className="selected-indicator">
                      <span>✓ Selected</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="selection-actions">
              <button className="continue-btn" disabled={!selectedCounselor} onClick={handleContinue}>
                Continue to Chat
              </button>
              <p className="selection-note">You can change your counselor later in your profile settings.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default CounselorSelection
