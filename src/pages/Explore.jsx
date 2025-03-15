import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Explore.css"; // CSS for styling

const Explore = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchTravelLogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/travelLogs");
        setLogs(res.data);
      } catch (error) {
        console.error("❌ Error fetching travel logs:", error);
      }
    };
    fetchTravelLogs();
  }, []);

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore Travel Logs</h1>
      <div className="logs-grid">
        {logs.length > 0 ? (
          logs.map((log) => (
            <div className="log-card" key={log._id}>
              {log.images.length > 0 && <img src={log.images[0]} alt="Travel" className="log-image" />}
              <h2>{log.location}</h2>
              <p>{log.description}</p>
              <p><strong>Date:</strong> {new Date(log.date).toDateString()}</p>
              <p><strong>Rating:</strong> ⭐ {log.rating}</p>
            </div>
          ))
        ) : (
          <p>No travel logs found.</p>
        )}
      </div>
    </div>
  );
};

export default Explore;
