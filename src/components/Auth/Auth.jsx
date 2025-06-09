import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Auth.module.css";
import logo from "../../assets/eventease-logo.png";
import googleIcon from "../../assets/google-icon.png";
import {
  loginWithEmailPassword,
  loginWithGoogle,
  signUpWithEmailPassword,
} from "../../firebase/auth";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmailPassword(form.email, form.password);
        navigate("/");
      } else {
        await signUpWithEmailPassword(form.email, form.password, form.name);
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message || "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authBg}>
      <div className={styles.authContainer}>
        <a href="/" className={styles.authLogoBlock}>
          <img src={logo} alt="EventEase Logo" className={styles.authLogo} />
          <div className={styles.authTitle}>EventEase</div>
        </a>
        <div className={styles.authSubtitle}>
          {isLogin ? "Login to your account" : "Create your EventEase account"}
        </div>
        <form className={styles.authForm} onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              className={styles.inputField}
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            className={styles.inputField}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            className={styles.inputField}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button className={styles.submitBtn} type="submit" disabled={loading}>
            {loading
              ? isLogin
                ? "Logging in..."
                : "Signing up..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>
          {isLogin && (
            <button
              type="button"
              className={styles.googleBtn}
              onClick={handleGoogleSignIn}
            >
              <img
                src={googleIcon}
                alt="Google"
                style={{ width: 20, height: 20 }}
              />
              Continue with Google
            </button>
          )}
        </form>
        {error && (
          <div
            style={{
              color: "var(--accent-cyan)",
              marginTop: 8,
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}
        <div className={styles.toggleLink}>
          {isLogin ? (
            <>
              Don't have an account?
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </>
          ) : (
            <>
              Already have an account?
              <span onClick={() => navigate("/login")}>Login</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
