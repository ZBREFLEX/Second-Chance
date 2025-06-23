"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import "./Layout.css"

const Layout = ({ children, title }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Handle sidebar toggle
  const handleSidebarToggle = (collapsed) => {
    setSidebarCollapsed(collapsed)
  }

  return (
    <div className="app-container">
      <Sidebar onToggle={handleSidebarToggle} />
      <div className="main-content" style={sidebarCollapsed ? { marginLeft: "70px", width: "calc(100% - 70px)" } : {}}>
        <Header title={title} />
        <main className="content-area">{children}</main>
      </div>
    </div>
  )
}

export default Layout
