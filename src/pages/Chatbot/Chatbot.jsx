import React, { useState } from "react";
import { Link } from "react-router-dom";

const eventEaseRoutes = [
  { path: "/", label: "Home" },
  { path: "/events", label: "Browse Events" },
  { path: "/events/:eventId", label: "Event Details" },
  { path: "/addevent", label: "Add Event (requires login)" },
  { path: "/login", label: "Login" },
  { path: "/signup", label: "Signup" },
  { path: "/chatbot", label: "Chatbot" }
];

function getEventEaseInfo() {
  return (
    <div>
      <b>EventEase</b> is a platform to discover, create, and manage events easily.<br />
      <br />
      <b>Main Features & Routes:</b>
      <ul>
        {eventEaseRoutes.map((route) => (
          <li key={route.path}>
            <b>{route.label}:</b>{" "}
            <Link to={route.path} style={{ color: "#1976d2" }}>
              {route.path}
            </Link>
          </li>
        ))}
      </ul>
      <b>How to use:</b>
      <ul>
        <li>
          Browse events on the{" "}
          <Link to="/events" style={{ color: "#1976d2" }}>
            /events
          </Link>{" "}
          page.
        </li>
        <li>
          View event details by clicking an event on the{" "}
          <Link to="/events" style={{ color: "#1976d2" }}>
            /events
          </Link>{" "}
          page.
        </li>
        <li>
          Register or log in to create your own events:{" "}
          <Link to="/signup" style={{ color: "#1976d2" }}>
            Signup
          </Link>{" "}
          or{" "}
          <Link to="/login" style={{ color: "#1976d2" }}>
            Login
          </Link>
          .
        </li>
        <li>Use the chatbot anytime for help!</li>
      </ul>
    </div>
  );
}

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const isEventEaseQuestion = (text) => {
    const keywords = [
      "eventease", "event ease", "event", "feature", "route", "how", "register", "login", "create event", "add event", "platform"
    ];
    const lower = text.toLowerCase();
    return keywords.some((kw) => lower.includes(kw));
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");

    let botReply;
    if (isEventEaseQuestion(input)) {
      botReply = getEventEaseInfo();
    } else {
      botReply = "Sorry, I can only answer questions about EventEase.";
    }

    setTimeout(() => {
      setMessages((msgs) => [...msgs, { sender: "bot", text: botReply }]);
    }, 400);
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>EventEase Chatbot</h2>
      <div style={{ border: "1px solid #ccc", padding: 16, minHeight: 200 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <b>{msg.sender === "user" ? "You" : "EventEaseBot"}:</b>{" "}
            {typeof msg.text === "string" ? msg.text : msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={{ marginTop: 16 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "80%" }}
          placeholder="Type your message..."
        />
        <button type="submit" style={{ width: "18%" }}>Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
