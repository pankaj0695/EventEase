import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import EventDetail from "./pages/EventDetail/EventDetail";
import AddEvent from "./pages/AddEvent/AddEvent";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Chatbot from "./pages/Chatbot/Chatbot";
import React from "react";

// Floating Chatbot Button Component
function FloatingChatbotButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/chatbot")}
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1000,
        background: "#1976d2",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: 60,
        height: 60,
        fontSize: 28,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        cursor: "pointer",
      }}
      aria-label="Open Chatbot"
    >
      💬
    </button>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetail />} />
        <Route
          path="/addevent"
          element={
            <ProtectedRoute>
              <AddEvent />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
      <FloatingChatbotButton />
    </Router>
  );
}

export default App;