

import { useState } from "react"
import "./Header.css"

const Header = ({ title }) => {
  const [showNotifications, setShowNotifications] = useState(false)

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications)
  }

  return (
    <header className="main-header">
      <div className="header-title">
        <h1>{title}</h1>
      </div>
      <div className="header-actions">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button className="search-btn">
            <i className="search-icon"></i>
          </button>
        </div>

        <div className="notification-container">
          <button className="notification-btn" onClick={toggleNotifications}>
            <i className="notification-icon"></i>
            <span className="notification-badge">3</span>
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <h3>Notifications</h3>
              <ul>
                <li>
                  <div className="notification-item">
                    <div className="notification-content">
                      <p>
                        <strong>New message</strong> from John Doe
                      </p>
                      <span className="notification-time">5 minutes ago</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="notification-item">
                    <div className="notification-content">
                      <p>
                        <strong>Session reminder:</strong> Meeting with Sarah at 2:00 PM
                      </p>
                      <span className="notification-time">1 hour ago</span>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="notification-item">
                    <div className="notification-content">
                      <p>
                        <strong>Risk alert:</strong> Michael Johnson's assessment shows high risk
                      </p>
                      <span className="notification-time">3 hours ago</span>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="notification-footer">
                <button>View all notifications</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
