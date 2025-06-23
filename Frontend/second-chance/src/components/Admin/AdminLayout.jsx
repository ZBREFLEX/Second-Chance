"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  FileText,
  FileImage,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  HelpCircle,
} from "lucide-react"
import "./css/AdminDashboard.css"

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
    setProfileOpen(false)
  }

  const toggleProfile = () => {
    setProfileOpen(!profileOpen)
    setNotificationsOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }
  
  const handleLogout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem("adminUser")
    localStorage.removeItem("adminToken")
    localStorage.removeItem("selectedCounselor")

    // Navigate directly to the homepage/login page
    navigate("/admin/login")
  }

  const notifications = [
    { id: 1, message: "New report submitted from Ernakulam", time: "10 minutes ago" },
    { id: 2, message: "System update scheduled for tomorrow", time: "1 hour ago" },
    { id: 3, message: "5 new users registered today", time: "3 hours ago" },
    { id: 4, message: "Monthly report is ready for review", time: "1 day ago" },
  ]

  return (
    <div className="admin-layout">
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Kerala Drug Data</h2>
          <button className="close-sidebar" onClick={toggleSidebar}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/admin" className={`nav-item ${isActive("/admin") ? "active" : ""}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/users" className={`nav-item ${isActive("/admin/users") ? "active" : ""}`}>
            <Users size={20} />
            <span>Users</span>
          </Link>
          <Link to="/admin/counselor" className={`nav-item ${isActive("/admin/counselor") ? "active" : ""}`}>
            <Users size={20} />
            <span>Counselors</span>
          </Link>
          <Link to="/admin/reports" className={`nav-item ${isActive("/admin/reports") ? "active" : ""}`}>
            <FileText size={20} />
            <span>Reports</span>
          </Link>
          <Link to="/admin/content" className={`nav-item ${isActive("/admin/content") ? "active" : ""}`}>
            <FileImage size={20} />
            <span>Content</span>
          </Link>
          <Link to="/admin/settings" className={`nav-item ${isActive("/admin/settings") ? "active" : ""}`}>
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <Link to="/admin/help" className="help-link">
            <HelpCircle size={20} />
            <span>Help & Support</span>
          </Link>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="admin-content">
        <header className="admin-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Search..." />
            </div>
          </div>

          <div className="header-right">
            <div className="notification-container">
              <button className="notification-button" onClick={toggleNotifications}>
                <Bell size={20} />
                <span className="notification-badge">4</span>
              </button>

              {notificationsOpen && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                    <Link to="/admin/notifications">View All</Link>
                  </div>
                  <div className="notification-list">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="notification-item">
                        <p>{notification.message}</p>
                        <span>{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="profile-container">
              <button className="profile-button" onClick={toggleProfile}>
                <div className="profile-avatar">AD</div>
                <span className="profile-name">Admin</span>
                <ChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <Link to="/admin/profile" className="dropdown-item">
                    My Profile
                  </Link>
                  <Link to="/admin/settings" className="dropdown-item">
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="admin-main">{children}</main>
      </div>
    </div>
  )
}

export default AdminLayout