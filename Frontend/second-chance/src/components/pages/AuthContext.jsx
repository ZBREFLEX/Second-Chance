"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create the auth context
const AuthContext = createContext()

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userData = localStorage.getItem("userData")
        if (userData) {
          setUser(JSON.parse(userData))
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        // Clear potentially corrupted data
        localStorage.removeItem("userData")
        localStorage.removeItem("token")
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])

  // Logout function
  const logout = () => {
    localStorage.removeItem("userData")
    localStorage.removeItem("token")
    setUser(null)
  }

  // The value that will be provided to consumers of this context
  const value = {
    user,
    setUser,
    loading,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
