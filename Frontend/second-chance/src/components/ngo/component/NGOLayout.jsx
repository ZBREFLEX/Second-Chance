"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"

function NGOLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false)

  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed)
  }

  const toggleMobileSidebar = () => {
    setSidebarMobileOpen(!sidebarMobileOpen)
  }

  return (
    <div className="app">
      <Sidebar onToggle={handleSidebarToggle} />
      <div className={`main-content ${sidebarCollapsed ? "expanded" : ""}`}>
        <Header toggleSidebar={toggleMobileSidebar} />
        <div className="page-container">{children}</div>
      </div>
    </div>
  )
}

export default NGOLayout
