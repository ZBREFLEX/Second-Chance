"use client"

import { useState } from "react"
import "./Header.css"

function Header({ toggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
    setShowProfile(false)
  }

  const toggleProfile = () => {
    setShowProfile(!showProfile)
    setShowNotifications(false)
  }

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <h2>NGO Dashboard</h2>
      </div>
      <div className="header-right">
        <div className="header-search">
          <input type="text" placeholder="Search..." />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="header-actions">
          <div className="notification-container">
            <button className="notification-btn" onClick={toggleNotifications}>
              <i className="fas fa-bell"></i>
              <span className="notification-badge">3</span>
            </button>
            {showNotifications && (
              <div className="notification-dropdown">
                <div className="notification-header">
                  <h3>Notifications</h3>
                  <button>Mark all as read</button>
                </div>
                <div className="notification-list">
                  <div className="notification-item unread">
                    <div className="notification-icon">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="notification-content">
                      <p>New counselor joined your campaign</p>
                      <span>2 hours ago</span>
                    </div>
                  </div>
                  <div className="notification-item unread">
                    <div className="notification-icon">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div className="notification-content">
                      <p>Your article was approved</p>
                      <span>Yesterday</span>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-icon">
                      <i className="fas fa-calendar"></i>
                    </div>
                    <div className="notification-content">
                      <p>Campaign "Drug Free Campus" starts tomorrow</p>
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
                <div className="notification-footer">
                  <button>View all notifications</button>
                </div>
              </div>
            )}
          </div>
          <div className="profile-container">
            <button className="profile-btn" onClick={toggleProfile}>
              <img src="/placeholder.svg?height=32&width=32" alt="Profile" className="profile-img" />
            </button>
            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <img src="/placeholder.svg?height=50&width=50" alt="Profile" />
                  <div>
                    <h4>Hope Foundation</h4>
                    <p>NGO Administrator</p>
                  </div>
                </div>
                <div className="profile-menu">
                  <a href="/profile">
                    <i className="fas fa-user"></i> My Profile
                  </a>
                  <a href="/settings">
                    <i className="fas fa-cog"></i> Settings
                  </a>
                  <a href="/help">
                    <i className="fas fa-question-circle"></i> Help Center
                  </a>
                  <a href="/login">
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
