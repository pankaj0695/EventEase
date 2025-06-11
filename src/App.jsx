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
        bottom: 32,
        right: 32,
        zIndex: 1200,
        background: "linear-gradient(90deg, #ff8c42 0%, #ff3c6f 100%)",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: 64,
        height: 64,
        fontSize: 32,
        boxShadow: "0 4px 16px rgba(255, 60, 111, 0.18), 0 1.5px 4px rgba(255,140,66,0.13)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "box-shadow 0.2s, transform 0.2s",
        outline: "none",
        padding: 0,
      }}
      aria-label="Open Chatbot"
      onMouseOver={e => {
        e.currentTarget.style.transform = "scale(1.08)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 60, 111, 0.23), 0 2px 8px rgba(255,140,66,0.18)";
      }}
      onMouseOut={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(255, 60, 111, 0.18), 0 1.5px 4px rgba(255,140,66,0.13)";
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          fontSize: "32px",
          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.10))",
        }}
      >
        {/* Thinking face emoji as the "thinking" image */}
        <span role="img" aria-label="thinking" style={{ fontSize: 36, lineHeight: 1 }}>
          🤖
        </span>
      </span>
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
