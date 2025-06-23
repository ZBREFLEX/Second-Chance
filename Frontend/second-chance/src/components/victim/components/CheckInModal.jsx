"use client"

import { useState } from "react"
import { X } from "react-feather"
import "../styles/Modal.css"

const CheckInModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    mood: "good",
    substanceUse: "none",
    cravingLevel: "low",
    sleepQuality: "good",
    activities: [],
    notes: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      const updatedActivities = checked
        ? [...formData.activities, value]
        : formData.activities.filter((activity) => activity !== value)

      setFormData((prev) => ({
        ...prev,
        activities: updatedActivities,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    // Basic validation
    if (!formData.mood) {
      newErrors.mood = "Please select your mood"
    }

    if (!formData.cravingLevel) {
      newErrors.cravingLevel = "Please select your craving level"
    }

    if (!formData.sleepQuality) {
      newErrors.sleepQuality = "Please select your sleep quality"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Add timestamp to the data
      const checkInData = {
        ...formData,
        date: new Date().toISOString(),
      }

      onSubmit(checkInData)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Complete Today's Check-in</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>How are you feeling today?</label>
            <div className="radio-options">
              <label className={`radio-option ${formData.mood === "excellent" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="mood"
                  value="excellent"
                  checked={formData.mood === "excellent"}
                  onChange={handleChange}
                />
                <span className="option-label">Excellent</span>
              </label>
              <label className={`radio-option ${formData.mood === "good" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="mood"
                  value="good"
                  checked={formData.mood === "good"}
                  onChange={handleChange}
                />
                <span className="option-label">Good</span>
              </label>
              <label className={`radio-option ${formData.mood === "fair" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="mood"
                  value="fair"
                  checked={formData.mood === "fair"}
                  onChange={handleChange}
                />
                <span className="option-label">Fair</span>
              </label>
              <label className={`radio-option ${formData.mood === "poor" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="mood"
                  value="poor"
                  checked={formData.mood === "poor"}
                  onChange={handleChange}
                />
                <span className="option-label">Poor</span>
              </label>
            </div>
            {errors.mood && <span className="error-message">{errors.mood}</span>}
          </div>

          <div className="form-group">
            <label>Did you use any substances today?</label>
            <div className="radio-options">
              <label className={`radio-option ${formData.substanceUse === "none" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="substanceUse"
                  value="none"
                  checked={formData.substanceUse === "none"}
                  onChange={handleChange}
                />
                <span className="option-label">None</span>
              </label>
              <label className={`radio-option ${formData.substanceUse === "slight" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="substanceUse"
                  value="slight"
                  checked={formData.substanceUse === "slight"}
                  onChange={handleChange}
                />
                <span className="option-label">Slight</span>
              </label>
              <label className={`radio-option ${formData.substanceUse === "moderate" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="substanceUse"
                  value="moderate"
                  checked={formData.substanceUse === "moderate"}
                  onChange={handleChange}
                />
                <span className="option-label">Moderate</span>
              </label>
              <label className={`radio-option ${formData.substanceUse === "heavy" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="substanceUse"
                  value="heavy"
                  checked={formData.substanceUse === "heavy"}
                  onChange={handleChange}
                />
                <span className="option-label">Heavy</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>How strong were your cravings today?</label>
            <div className="radio-options">
              <label className={`radio-option ${formData.cravingLevel === "none" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="cravingLevel"
                  value="none"
                  checked={formData.cravingLevel === "none"}
                  onChange={handleChange}
                />
                <span className="option-label">None</span>
              </label>
              <label className={`radio-option ${formData.cravingLevel === "low" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="cravingLevel"
                  value="low"
                  checked={formData.cravingLevel === "low"}
                  onChange={handleChange}
                />
                <span className="option-label">Low</span>
              </label>
              <label className={`radio-option ${formData.cravingLevel === "moderate" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="cravingLevel"
                  value="moderate"
                  checked={formData.cravingLevel === "moderate"}
                  onChange={handleChange}
                />
                <span className="option-label">Moderate</span>
              </label>
              <label className={`radio-option ${formData.cravingLevel === "high" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="cravingLevel"
                  value="high"
                  checked={formData.cravingLevel === "high"}
                  onChange={handleChange}
                />
                <span className="option-label">High</span>
              </label>
            </div>
            {errors.cravingLevel && <span className="error-message">{errors.cravingLevel}</span>}
          </div>

          <div className="form-group">
            <label>How was your sleep quality?</label>
            <div className="radio-options">
              <label className={`radio-option ${formData.sleepQuality === "excellent" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="sleepQuality"
                  value="excellent"
                  checked={formData.sleepQuality === "excellent"}
                  onChange={handleChange}
                />
                <span className="option-label">Excellent</span>
              </label>
              <label className={`radio-option ${formData.sleepQuality === "good" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="sleepQuality"
                  value="good"
                  checked={formData.sleepQuality === "good"}
                  onChange={handleChange}
                />
                <span className="option-label">Good</span>
              </label>
              <label className={`radio-option ${formData.sleepQuality === "fair" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="sleepQuality"
                  value="fair"
                  checked={formData.sleepQuality === "fair"}
                  onChange={handleChange}
                />
                <span className="option-label">Fair</span>
              </label>
              <label className={`radio-option ${formData.sleepQuality === "poor" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="sleepQuality"
                  value="poor"
                  checked={formData.sleepQuality === "poor"}
                  onChange={handleChange}
                />
                <span className="option-label">Poor</span>
              </label>
            </div>
            {errors.sleepQuality && <span className="error-message">{errors.sleepQuality}</span>}
          </div>

          <div className="form-group">
            <label>What activities did you engage in today? (Select all that apply)</label>
            <div className="checkbox-options">
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="activities"
                  value="exercise"
                  checked={formData.activities.includes("exercise")}
                  onChange={handleChange}
                />
                <span className="option-label">Exercise</span>
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="activities"
                  value="meditation"
                  checked={formData.activities.includes("meditation")}
                  onChange={handleChange}
                />
                <span className="option-label">Meditation</span>
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="activities"
                  value="therapy"
                  checked={formData.activities.includes("therapy")}
                  onChange={handleChange}
                />
                <span className="option-label">Therapy</span>
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="activities"
                  value="socializing"
                  checked={formData.activities.includes("socializing")}
                  onChange={handleChange}
                />
                <span className="option-label">Socializing</span>
              </label>
              <label className="checkbox-option">
                <input
                  type="checkbox"
                  name="activities"
                  value="hobbies"
                  checked={formData.activities.includes("hobbies")}
                  onChange={handleChange}
                />
                <span className="option-label">Hobbies</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Additional notes (optional)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional thoughts or reflections about your day..."
              rows={3}
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Submit Check-in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CheckInModal
