import React, { useEffect, useState } from "react";
import "./TravelLogs.css";

const TravelLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [images, setImages] = useState("");
  const [rating, setRating] = useState(3);

  // Get userId from localStorage (Remove if not needed)
  const userId = localStorage.getItem("userId");

  // Fetch all travel logs when the component loads
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/travellogs");
        const data = await response.json();

        if (response.ok) {
          setLogs(data);
        } else {
          console.error("Error fetching logs:", data.message);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // Function to handle adding a new travel log
  const handleAddLog = async (e) => {
    e.preventDefault();

    if (!location || !description || !date) {
      alert("Location, description, and date are required!");
      return;
    }

    try {
      const logData = {
        userId, // Keeping userId if needed, otherwise remove
        location,
        description,
        date,
        images: images ? images.split(",") : [], // Convert CSV string to array
        rating,
      };

      console.log("Sending data:", logData);

      const response = await fetch("http://localhost:5000/api/travellogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logData),
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (!response.ok) {
        alert(`Error: ${result.message || "Failed to add travel log"}`);
        return;
      }

      setLogs([...logs, result]); // Update UI with new log
      setLocation("");
      setDescription("");
      setDate("");
      setImages("");
      setRating(3);
    } catch (error) {
      console.error("❌ Error adding log:", error);
      alert("Network error! Check if backend is running.");
    }
  };

  return (
    <div className="travel-logs-container">
      <h2>Travel Logs</h2>

      {/* Travel Log Form */}
      <form className="travel-log-form" onSubmit={handleAddLog}>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URLs (comma-separated)"
          value={images}
          onChange={(e) => setImages(e.target.value)}
        />
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num} ⭐</option>
          ))}
        </select>
        <button type="submit">Add Travel Log</button>
      </form>

      {/* Display Travel Logs */}
      {loading ? (
        <p>Loading...</p>
      ) : logs.length > 0 ? (
        <ul>
          {logs.map((log) => (
            <li key={log._id}>
              <h3>{log.location}</h3>
              <p>{log.description}</p>
              <small>Visited on: {new Date(log.date).toLocaleDateString()}</small>
              <p>Rating: {log.rating} ⭐</p>
              {log.images && log.images.length > 0 && (
                <div className="images-container">
                  {log.images.map((img, index) => (
                    <img key={index} src={img} alt="Travel" className="travel-image" />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No travel logs found.</p>
      )}
    </div>
  );
};

export default TravelLogs;
