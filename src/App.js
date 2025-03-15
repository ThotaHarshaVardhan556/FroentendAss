import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Navbar always visible
import Home from "./pages/Home";
import Explore from "./pages/Explore"; // New Explore Page
import Login from "./pages/Login";
import Register from "./pages/Register";
import TravelLogs from "./pages/TravelLogs";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Navbar /> {/* Navbar on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/travellogs" element={<TravelLogs />} />
        
        {/* ✅ Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={localStorage.getItem("token") ? <Dashboard /> : <Login />}
        />
      </Routes>
    </Router>
  );
};

export default App;
