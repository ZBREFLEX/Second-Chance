"use client"

import { useState, useEffect } from "react"
import { User, Lock, Bell, Shield, Save } from "react-feather"
import Sidebar from "../components/Sidebar"
import "../styles/ProfileSettings.css"

const ProfileSettings = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("profile")
  const [userData, setUserData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    emailNotifications: true,
    smsNotifications: false,
    reminderFrequency: "daily",
    dataSharing: "counselor",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    // In a real app, you would fetch this data from your API
    // Simulating API call with timeout
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sample data
      const user = {
        id: "u123",
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "(555) 123-4567",
        emergencyContact: "Jane Doe",
        emergencyPhone: "(555) 987-6543",
        emailNotifications: true,
        smsNotifications: false,
        reminderFrequency: "daily",
        dataSharing: "counselor",
      }

      setUserData(user)
      setFormData({
        ...formData,
        name: user.name,
        email: user.email,
        phone: user.phone,
        emergencyContact: user.emergencyContact,
        emergencyPhone: user.emergencyPhone,
        emailNotifications: user.emailNotifications,
        smsNotifications: user.smsNotifications,
        reminderFrequency: user.reminderFrequency,
        dataSharing: user.dataSharing,
      })

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setSaveMessage("")

    try {
      // In a real app, you would send this data to your API
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update local user data
      setUserData((prev) => ({
        ...prev,
        ...formData,
      }))

      setSaveMessage("Settings saved successfully!")
    } catch (error) {
      setSaveMessage("Error saving settings. Please try again.")
    } finally {
      setIsSaving(false)

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveMessage("")
      }, 3000)
    }
  }

  const renderProfileTab = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h3>Personal Information</h3>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
        </div>

        <div className="settings-section">
          <h3>Emergency Contact</h3>
          <div className="form-group">
            <label htmlFor="emergencyContact">Contact Name</label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="emergencyPhone">Contact Phone</label>
            <input
              type="tel"
              id="emergencyPhone"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
            <Save size={16} />
          </button>
        </div>
      </form>
    )
  }

  const renderSecurityTab = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h3>Change Password</h3>
          <div className="form-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Account Security</h3>
          <div className="form-group">
            <button type="button" className="secondary-btn">
              Enable Two-Factor Authentication
            </button>
          </div>

          <div className="form-group">
            <button type="button" className="secondary-btn">
              View Login History
            </button>
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
            <Save size={16} />
          </button>
        </div>
      </form>
    )
  }

  const renderNotificationsTab = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h3>Notification Preferences</h3>
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={formData.emailNotifications}
                onChange={handleChange}
              />
              Email Notifications
            </label>
            <p className="form-help">Receive updates, reminders, and messages via email</p>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="smsNotifications"
                checked={formData.smsNotifications}
                onChange={handleChange}
              />
              SMS Notifications
            </label>
            <p className="form-help">Receive updates, reminders, and messages via text message</p>
          </div>
        </div>

        <div className="settings-section">
          <h3>Reminder Frequency</h3>
          <div className="form-group">
            <select name="reminderFrequency" value={formData.reminderFrequency} onChange={handleChange}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <p className="form-help">How often you want to receive check-in reminders</p>
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
            <Save size={16} />
          </button>
        </div>
      </form>
    )
  }

  const renderPrivacyTab = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h3>Data Sharing</h3>
          <div className="form-group">
            <label>Who can see your recovery data?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="dataSharing"
                  value="counselor"
                  checked={formData.dataSharing === "counselor"}
                  onChange={handleChange}
                />
                Only my counselor
              </label>

              <label>
                <input
                  type="radio"
                  name="dataSharing"
                  value="team"
                  checked={formData.dataSharing === "team"}
                  onChange={handleChange}
                />
                My care team
              </label>

              <label>
                <input
                  type="radio"
                  name="dataSharing"
                  value="anonymous"
                  checked={formData.dataSharing === "anonymous"}
                  onChange={handleChange}
                />
                Anonymous data for research
              </label>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h3>Privacy Controls</h3>
          <div className="form-group">
            <button type="button" className="secondary-btn">
              Download My Data
            </button>
            <p className="form-help">Get a copy of all your personal data</p>
          </div>

          <div className="form-group">
            <button type="button" className="danger-btn">
              Delete My Account
            </button>
            <p className="form-help">Permanently delete your account and all associated data</p>
          </div>
        </div>

        <div className="settings-actions">
          <button type="submit" className="save-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
            <Save size={16} />
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="dashboard-container">
      <Sidebar onLogout={onLogout} />

      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Profile Settings</h1>
          <p className="settings-subtitle">Manage your account preferences and information</p>
        </header>

        {isLoading ? (
          <div className="loading">Loading settings...</div>
        ) : (
          <div className="settings-container">
            <div className="settings-tabs">
              <button
                className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <User size={18} />
                Profile
              </button>
              <button
                className={`tab-btn ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <Lock size={18} />
                Security
              </button>
              <button
                className={`tab-btn ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <Bell size={18} />
                Notifications
              </button>
              <button
                className={`tab-btn ${activeTab === "privacy" ? "active" : ""}`}
                onClick={() => setActiveTab("privacy")}
              >
                <Shield size={18} />
                Privacy
              </button>
            </div>

            <div className="settings-content">
              {saveMessage && (
                <div className={`save-message ${saveMessage.includes("Error") ? "error" : "success"}`}>
                  {saveMessage}
                </div>
              )}

              {activeTab === "profile" && renderProfileTab()}
              {activeTab === "security" && renderSecurityTab()}
              {activeTab === "notifications" && renderNotificationsTab()}
              {activeTab === "privacy" && renderPrivacyTab()}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default ProfileSettings
