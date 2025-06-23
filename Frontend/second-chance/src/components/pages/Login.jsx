import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Auth.css"; // Styling
import axios from "axios";
import { useAuth } from "./AuthContext"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = useAuth(); // <-- get from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      const user = res.data.user;

      // ✅ Store in localStorage and context
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("token", res.data.token || "mock-token"); // optional
      setUser(user); // ✅ update context

      if (user.role === "victim") {
        navigate("/victim");
      } else if (user.role === "counselor") {
        navigate("/counselor");
      } else if (user.role === "ngo") {
        navigate("/ngo");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
};


  return (
    <div className="authContainer">
      <div className="authCard">
        <h2 className="authTitle">Login</h2>

        {error && <div className="authError">{error}</div>}

        <form onSubmit={handleSubmit} className="authForm">
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
            />
          </div>

          <button type="submit" className="authButton" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="authLinks">
          <Link to="/forgot-password" className="authLink">
            Forgot Password?
          </Link>
          <div className="authDivider"></div>
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="authLink">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
