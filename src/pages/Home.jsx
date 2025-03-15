import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import CSS for styling

const Home = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Travel Log</h1>
        <p>Share your amazing travel experiences with the world!</p>
        <button className="explore-btn" onClick={() => navigate("/explore")}>
          Explore Now
        </button>
      </div>
      <div className="features-section">
        <div className="feature-card">
          <h2>🌍 Discover New Places</h2>
          <p>Explore hidden gems and popular destinations around the globe.</p>
        </div>
        <div className="feature-card">
          <h2>📸 Share Your Journey</h2>
          <p>Upload photos, write stories, and inspire others to travel.</p>
        </div>
        <div className="feature-card">
          <h2>✈️ Plan Your Next Trip</h2>
          <p>Get travel tips, itineraries, and recommendations from fellow travelers.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
