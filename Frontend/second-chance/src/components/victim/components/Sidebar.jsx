"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Home,
  FileText,
  TrendingUp,
  MessageCircle,
  BookOpen,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "react-feather"
import "../styles/Sidebar.css"

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Check if screen is mobile and set initial states
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)

      // On mobile, sidebar is closed by default
      if (mobile) {
        setIsOpen(false)
      } else {
        setIsOpen(true)

        // Auto-collapse on medium screens
        setIsCollapsed(window.innerWidth < 1280)
      }
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

 const handleLogout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem("userData")
    localStorage.removeItem("token")
    localStorage.removeItem("selectedCounselor")

    // Navigate directly to the homepage/login page
    navigate("/login")
  }

  const menuItems = [
    { path: "/victim", name: "Dashboard", icon: <Home size={20} /> },
    { path: "/victim/risk-assessment", name: "Risk Assessment", icon: <FileText size={20} /> },
    { path: "/victim/recovery-tracking", name: "Recovery Tracking", icon: <TrendingUp size={20} /> },
    { path: "/victim/counselor-chat", name: "Counselor Chat", icon: <MessageCircle size={20} /> },
    { path: "/victim/awareness-hub", name: "Awareness Hub", icon: <BookOpen size={20} /> },
    { path: "/victim/profile-settings", name: "Profile Settings", icon: <Settings size={20} /> },
  ]

  return (
    <>
      <div className={`sidebar-overlay ${isOpen && isMobile ? "active" : ""}`} onClick={toggleSidebar}></div>

      <div className="mobile-menu-toggle" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <div className={`sidebar ${isOpen ? "open" : "closed"} ${isCollapsed ? "collapsed" : "expanded"}`}>
        <div className="sidebar-header">
          <h2>Recovery Path</h2>
          {!isMobile && (
            <button className="collapse-toggle" onClick={toggleCollapse}>
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </button>
          )}
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => isMobile && setIsOpen(false)}
              title={isCollapsed ? item.name : ""}
            >
              {item.icon}
              <span className="sidebar-item-text">{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout} title={isCollapsed ? "Logout" : ""}>
            <LogOut size={20} />
            <span className="sidebar-item-text">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
