"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Auth.css"; // Update this path if necessary
import axios from "axios";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });

    if (errors[name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!credentials.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(credentials.email)) newErrors.email = "Email is invalid";

    if (!credentials.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true);

      try {
        // Use the full URL with port 5000 instead of 3000
        const res = await axios.post("http://localhost:5000/api/auth/admin/login", credentials);

        const { token, admin } = res.data;

        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminUser", JSON.stringify(admin));

        navigate("/admin"); // Update this to "/admin/counselors" if needed

      } catch (error) {
        console.error("Login failed:", error);

        if (error.message === "Network Error") {
          setErrors({ auth: "Cannot connect to server. Please make sure the backend server is running on port 5000." });
          return;
        }

        if (error.response?.data?.message?.includes("jwt expired")) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
          navigate("/admin/login");
          return;
        }

        if (error.response && error.response.data) {
          setErrors({ auth: error.response.data.message || "Invalid email or password." });
        } else {
          setErrors({ auth: "Login failed. Please check your network and try again." });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Admin Login</h2>
          <p>Enter your credentials to access the admin panel</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.auth && <div className="auth-error">{errors.auth}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={credentials.email}
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
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={errors.password ? "input-error" : ""}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group remember-me">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="auth-button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <a href="/admin/register">Register</a>
          </p>
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;