// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Second Chance</Link>
      </div>

      <ul className="navbar-links">
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/about" ? "active" : ""}>
  <Link to="/about">About</Link>
</li>

        <li className={location.pathname === "/login" ? "active" : ""}>
          <Link to="/login">Login</Link>
        </li>
        <li className={location.pathname === "/register" ? "active" : ""}>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
