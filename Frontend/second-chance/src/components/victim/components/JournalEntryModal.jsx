"use client"

import { useState } from "react"
import { X } from "react-feather"
import "../styles/Modal.css"

const JournalEntryModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    mood: "good",
    triggers: "",
    content: "",
    gratitude: "",
    goals: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    // Basic validation
    if (!formData.mood) {
      newErrors.mood = "Please select your mood"
    }

    if (!formData.content || formData.content.trim().length < 10) {
      newErrors.content = "Please write at least 10 characters in your journal entry"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      // Add timestamp to the data
      const journalData = {
        ...formData,
        date: new Date().toISOString(),
      }

      onSubmit(journalData)
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Add Journal Entry</h2>
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
            <label>Did you experience any triggers today? (optional)</label>
            <input
              type="text"
              name="triggers"
              value={formData.triggers}
              onChange={handleChange}
              placeholder="E.g., work stress, social event, argument, etc."
            />
          </div>

          <div className="form-group">
            <label>Journal Entry</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write about your day, thoughts, feelings, challenges, and victories..."
              rows={6}
            ></textarea>
            {errors.content && <span className="error-message">{errors.content}</span>}
          </div>

          <div className="form-group">
            <label>What are you grateful for today? (optional)</label>
            <textarea
              name="gratitude"
              value={formData.gratitude}
              onChange={handleChange}
              placeholder="List things you're thankful for..."
              rows={2}
            ></textarea>
          </div>

          <div className="form-group">
            <label>Goals for tomorrow (optional)</label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="What would you like to accomplish tomorrow?"
              rows={2}
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Journal Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JournalEntryModal
