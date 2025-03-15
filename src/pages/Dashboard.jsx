import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [newLog, setNewLog] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:5000/api/travellogs", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setLogs(res.data);
      } catch (err) {
        console.error("❌ Fetch Logs Error:", err.response?.data);
      }
    };

    fetchLogs();
  }, [navigate]);

  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/travellogs",
        { description: newLog },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLogs([...logs, res.data]);
      setNewLog("");
    } catch (err) {
      console.error("❌ Add Log Error:", err.response?.data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Travel Log</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>

      <form onSubmit={handleAddLog}>
        <input type="text" value={newLog} onChange={(e) => setNewLog(e.target.value)} placeholder="New Travel Log" required />
        <button type="submit">Add Log</button>
      </form>

      <h3>Your Travel Logs</h3>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>{log.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
