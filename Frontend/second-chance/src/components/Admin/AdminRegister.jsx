"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./css/Auth.css"

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateForm = () => {
    
    const newErrors = {}

    if (!formData.username) newErrors.username = "Username is required"
    else if (formData.username.length < 3) newErrors.username = "Username must be at least 3 characters"

    if (!formData.email) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password"
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/admin/register", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    username: formData.username,
    email: formData.email,
    password: formData.password
  })
});


      const data = await response.json();

      if (response.ok) {
        navigate("/admin/login");
      } else {
        setErrors({ general: data.message || "Registration failed." });
      }
    } catch (error) {
      setErrors({ general: "Server error. Please try again later." });
    } finally {
      setIsLoading(false);
    }
  }


  // Add `role: "admin"` in the POST body


};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Admin Account</h2>
          <p>Register to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && <div className="auth-error">{errors.general}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className={errors.username ? "input-error" : ""}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? "input-error" : ""}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <a href="/admin/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
