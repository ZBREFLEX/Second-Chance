"use client"

import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import "./Sidebar.css"

const Sidebar = ({ onToggle }) => {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed
    setCollapsed(newCollapsedState)

    // Notify parent component about the sidebar state change
    if (onToggle) {
      onToggle(newCollapsedState)
    }
  }

  // Check for mobile view on initial load and window resize
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        setCollapsed(true)
        if (onToggle) onToggle(true)
      }
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [onToggle])

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2 className={collapsed ? "hidden" : ""}>NGO Portal</h2>
        <button className="toggle-btn" onClick={toggleSidebar}>
          {collapsed ? "→" : "←"}
        </button>
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <ul>
            <li className={location.pathname === "/ngo" ? "active" : ""}>
              <Link to="/ngo">
                <i className="icon dashboard-icon"></i>
                <span className={collapsed ? "hidden" : ""}>Dashboard</span>
              </Link>
            </li>
            <li className={location.pathname.includes("/counselor/patientdetails") ? "active" : ""}>
              <Link to="/counselor/patientdetails">
                <i className="fas fa-file-alt"></i>
                <span className={collapsed ? "hidden" : ""}> Content</span>
              </Link>
            </li>
            <li className={location.pathname === "/counselor/communication" ? "active" : ""}>
              <Link to="/counselor/communication">
                <i className="icon communication-icon"></i>
                <span className={collapsed ? "hidden" : ""}>Communication</span>
              </Link>
            </li>
            <li className={location.pathname === "/counselor/session" ? "active" : ""}>
              <Link to="/counselor/session">
                <i className="icon schedule-icon"></i>
                <span className={collapsed ? "hidden" : ""}>Schedule</span>
              </Link>
            </li>
            <li className={location.pathname === "/counselor/notes" ? "active" : ""}>
              <Link to="/counselor/notes">
                <i className="icon notes-icon"></i>
                <span className={collapsed ? "hidden" : ""}>Notes</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="counselor-info">
          {!collapsed && (
            <>
              <div className="counselor-avatar"></div>
              <div className="counselor-details">
                <h4>Dr. Jane Smith</h4>
                <p>Senior Counselor</p>
              </div>
            </>
          )}
          <button className="logout-btn">
            <i className="icon logout-icon"></i>
            <span className={collapsed ? "hidden" : ""}>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
