import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/eventease-logo.png";
import { useUser } from "../../contexts/userContext";
import { logout } from "../../firebase/auth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await logout();
    setDropdownOpen(false);
    navigate("/login");
  };

  // Hide navbar on login and signup pages
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  return (
    <nav className={styles.navbar}>
      <a href="/" className={styles.logoTitle}>
        <img src={logo} alt="EventEase Logo" className={styles.logo} />
        <span className={styles.title}>EventEase</span>
      </a>
      <div className={styles.navLinks}>
        <Link to="/events" className={styles.link}>
          Explore Events
        </Link>
        <Link to="/addevent" className={styles.link}>
          Add Event
        </Link>
        {isLoggedIn ? (
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginLeft: 18,
            }}
            ref={dropdownRef}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
              }}
              onClick={() => setDropdownOpen((open) => !open)}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #ff3c6f",
                  }}
                />
              ) : (
                <span
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#ffe3ec",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    color: "#ff3c6f",
                    border: "2px solid #ff3c6f",
                  }}
                >
                  <svg
                    width="22"
                    height="22"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                  </svg>
                </span>
              )}
              <span
                style={{
                  fontWeight: 600,
                  color: "#ff3c6f",
                  fontSize: "1.08rem",
                }}
              >
                {user?.displayName || user?.email}
              </span>
            </div>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: 48,
                  right: 0,
                  background: "#fff",
                  border: "1px solid #eee",
                  borderRadius: 8,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
                  minWidth: 120,
                  zIndex: 1000,
                }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "10px 0",
                    background: "none",
                    border: "none",
                    color: "#ff3c6f",
                    fontWeight: 600,
                    cursor: "pointer",
                    borderRadius: 8,
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className={styles.loginBtn}
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
