import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { FaUserCircle } from "react-icons/fa"; // Profile Icon

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">🌍 Travel Log</h2>
      <ul className="nav-links">
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/explore" className="nav-link">Explore</Link></li>
        <li><Link to="/travellogs" className="nav-link">Travel Logs</Link></li>
      </ul>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="profile-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FaUserCircle size={28} />
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            {user ? (
              <>
                <p className="dropdown-item">Hello, {user.name}</p>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="dropdown-item">Login</Link>
                <Link to="/register" className="dropdown-item">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;