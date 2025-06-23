import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // use if you're calling backend directly
import "./css/Auth.css"; // shared with login
import API from '../api/api'
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("victim");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);

      // 👉 Replace this with your backend API
      await axios.post("http://localhost:3000/api/auth/register", {
        username: name,
        email,
        password,
        role,
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to create an account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authContainer">
      <div className="authCard">
        <h2 className="authTitle">Register</h2>

        {error && <div className="authError">{error}</div>}

        <form onSubmit={handleSubmit} className="authForm">
          <div className="formGroup">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              className="formControl"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="formControl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="formControl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>

          <div className="formGroup">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="formControl"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="role">Register as</label>
            <select
              id="role"
              className="formControl"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="victim">Individual Seeking Help</option>
              <option value="counselor">Counselor</option>
              <option value="ngo">NGO Representative</option>
            </select>
          </div>

          <button type="submit" className="authButton" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="authLinks">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="authLink">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
