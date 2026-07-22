"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotModal, setForgotModal] = useState(false);
  const [error, setError] = useState("");

  // Clear prefilled storage username on mount
  useEffect(() => {
    localStorage.removeItem("pk_portal_username");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    setError("");

    if (!username.trim()) {
      e.preventDefault();
      setError("Please enter your Username, Client ID, or PAN.");
      return;
    }
    if (!password) {
      e.preventDefault();
      setError("Please enter your password.");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("pk_portal_username", username);
    } else {
      localStorage.removeItem("pk_portal_username");
    }

    // Native HTML form submission continues to https://www.ifaplanet.com/login_check_pre.php
  };

  const inp: React.CSSProperties = {
    width: "100%",
    padding: "13px 16px",
    border: "1.5px solid #cbd5e1",
    borderRadius: 8,
    fontSize: 14.5,
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, var(--navy) 0%, #1a3560 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>

        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ width: 50, height: 50, background: "rgba(255,255,255,.1)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,.2)" }}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M4 22L10 14L14 18L18 10L24 22H4Z" fill="#c9a84c" /><circle cx="20" cy="7" r="3" fill="#e8c975" /></svg>
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: "#fff" }}>PK Financial Services</div>
                <div style={{ fontSize: 11, color: "var(--gold)", letterSpacing: "1px", textTransform: "uppercase", fontWeight: 600 }}>Client Investment Portal</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "36px 30px", boxShadow: "0 24px 60px rgba(0,0,0,.35)" }} className="login-card">

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "var(--navy)", marginBottom: 6 }}>
            Client Portal Login
          </h2>
          <p style={{ color: "#64748b", fontSize: 13.5, marginBottom: 24 }}>
            Sign in with your IFA Planet credentials to access your investments & portfolio.
          </p>

          {error && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#991b1b", display: "flex", alignItems: "center", gap: 8 }}>
              <span>⚠️</span> <span>{error}</span>
            </div>
          )}

          {/* Form posting directly to IFA Planet login check handler */}
          <form action="https://www.ifaplanet.com/login_check_pre.php" method="POST" target="_blank" onSubmit={handleSubmit} autoComplete="off">

            {/* Hidden field for IFA Planet login submission trigger */}
            <input type="hidden" name="log_submit" value="Login" />

            {/* Username Input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: ".5px", marginBottom: 6 }}>
                Username / Client ID / PAN
              </label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your Username or Client ID"
                required
                autoComplete="off"
                style={inp}
              />
            </div>

            {/* Password Input */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--navy)", textTransform: "uppercase", letterSpacing: ".5px" }}>
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModal(true)}
                  style={{ background: "none", border: "none", color: "#2563eb", fontSize: 12.5, fontWeight: 600, cursor: "pointer", padding: 0 }}
                >
                  Forgot Password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  style={{ ...inp, paddingRight: 68 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "#475569",
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    padding: "6px 10px",
                    borderRadius: 6,
                    transition: "all 0.2s ease",
                    userSelect: "none"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--navy)";
                    e.currentTarget.style.backgroundColor = "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#475569";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 26 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13.5, color: "#334155" }}>
                <input
                  type="checkbox"
                  name="log_remember"
                  value="1"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: "var(--navy)", cursor: "pointer" }}
                />
                <span>Remember me on this browser</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                background: "linear-gradient(135deg, var(--gold), #d97706)",
                color: "var(--navy)",
                border: "none",
                borderRadius: 8,
                fontSize: 15,
                fontWeight: 800,
                cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 14px rgba(217,119,6,0.25)",
                transition: "transform 0.1s, opacity 0.2s",
              }}
            >
              Sign In to Portal →
            </button>
          </form>

          {/* Security Note */}
          <div style={{ marginTop: 24, padding: "14px 16px", background: "var(--cream)", borderRadius: 10, fontSize: 12, color: "#475569", lineHeight: 1.6, border: "1px solid #e2e8f0" }}>
            🔒 <strong>Secure Direct Login:</strong> Form posts securely via SSL directly to IFA Planet&#39;s authentication portal (`login_check_pre.php`).
          </div>
        </div>

        {/* Support Footer */}
        <div style={{ textAlign: "center", marginTop: 22, fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>
          Need help logging in? Call <a href="tel:+918318442129" style={{ color: "var(--gold)", fontWeight: 600, textDecoration: "none" }}>+91 8318442129</a> / <a href="tel:+919936408150" style={{ color: "var(--gold)", fontWeight: 600, textDecoration: "none" }}>9936408150</a>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      {forgotModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, zIndex: 1000 }}>
          <div style={{ background: "#fff", borderRadius: 16, width: "100%", maxWidth: 440, padding: 28, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "var(--navy)" }}>Forgot Your Password?</h3>
              <button onClick={() => setForgotModal(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#64748b" }}>✕</button>
            </div>

            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 20 }}>
              To reset your password for your PK Financial / IFA Planet Client Portal account:
            </p>

            <ol style={{ fontSize: 13.5, color: "#334155", paddingLeft: 20, marginBottom: 24, lineHeight: 1.8 }}>
              <li>Visit the official IFA Planet password reset page.</li>
              <li>Or contact our support team directly for instant account reset assistance.</li>
            </ol>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <a
                href="https://www.ifaplanet.com/form_login.php"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", textAlign: "center", padding: 12, background: "var(--gold)", color: "var(--navy)", borderRadius: 8, fontSize: 14, fontWeight: 700, textDecoration: "none" }}
              >
                🌐 Reset Password on IFA Planet →
              </a>
              <a
                href="tel:+918318442129"
                style={{ display: "block", textAlign: "center", padding: 12, background: "var(--navy)", color: "#fff", borderRadius: 8, fontSize: 14, fontWeight: 600, textDecoration: "none" }}
              >
                📞 Call Support: +91 8318442129
              </a>
              <button
                onClick={() => setForgotModal(false)}
                style={{ padding: 10, background: "none", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13, color: "#64748b", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair Display:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`:root{--navy:#0a1628;--navy2:#112240;--gold:#c9a84c;--cream:#f7f4ef;--gray:#6b7280;} *{box-sizing:border-box;margin:0;padding:0;} @media(max-width:480px){ .login-card{ padding: 24px 18px !important; } }`}</style>
    </div>
  );
}
