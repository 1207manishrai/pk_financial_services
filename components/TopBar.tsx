"use client";

import Link from "next/link";

export default function TopBar() {
  return (
    <div style={{
      background: "var(--navy)",
      color: "#e2e8f0",
      fontSize: 13.5,
      padding: "10px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 12,
      borderBottom: "1px solid rgba(255,255,255,0.08)"
    }}>
      {/* Left side: Contact Info */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <a href="tel:+918318442129" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}>
          <span>📞</span> +91 83184 42129
        </a>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <a href="mailto:pkfinance11@gmail.com" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "#fff"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.75)"}>
          <span>✉️</span> pkfinance11@gmail.com
        </a>
      </div>

      {/* Right side: Portals Menu */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        {/* Admin Portal */}
        <Link
          href="/admin"
          style={{
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: 4,
            textDecoration: "none",
            fontSize: 12.5,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.borderColor = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 13, height: 13 }} fill="currentColor">
            <ellipse cx="50" cy="32" rx="16" ry="21" />
            <path d="M14,90 C14,80 18,70 32,63 C40,58 42,58 45,71 L48,80 L52,80 L55,71 C58,58 60,58 68,63 C82,70 86,80 86,90 L86,92 C86,94.2 84.2,96 82,96 L18,96 C15.8,96 14,94.2 14,92 Z" />
            <polygon points="48,72 52,72 51,77 49,77" />
            <polygon points="49.2,78 50.8,78 52,90 50,93 48,90" />
          </svg>
          Admin Portal
        </Link>

        {/* Client Portal */}
        <Link
          href="/portal"
          style={{
            background: "linear-gradient(135deg, var(--gold), #d97706)",
            color: "var(--navy)",
            padding: "6px 12px",
            borderRadius: 4,
            textDecoration: "none",
            fontSize: 12.5,
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            boxShadow: "0 2px 6px rgba(201,168,76,.15)",
            transition: "transform 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-0.5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "none";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 13, height: 13 }} fill="currentColor">
            <ellipse cx="50" cy="32" rx="16" ry="21" />
            <path d="M16,90 C16,76 26,65 50,65 C74,65 84,76 84,90 L84,92 C84,94.2 82.2,96 80,96 L20,96 C17.8,96 16,94.2 16,92 Z" />
          </svg>
          Client Portal
        </Link>

        {/* NSE Invest */}
        <a
          href="https://www.nseinvest.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: "#ffffff",
            color: "#251a70",
            padding: "6px 12px",
            borderRadius: 4,
            textDecoration: "none",
            fontSize: 12.5,
            fontWeight: 800,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            boxShadow: "0 2px 6px rgba(0,0,0,.08)",
            border: "1px solid #e2e8f0",
            transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#f8fafc";
            e.currentTarget.style.transform = "translateY(-0.5px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.transform = "none";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 14, height: 14 }} fill="none">
            {/* Top-Left facet (orange) */}
            <polygon points="50,5 11,27.5 32,50 50,35" fill="#f97316" />
            {/* Top-Right facet (dark blue) */}
            <polygon points="50,5 89,27.5 68,50 50,35" fill="#251a70" />
            {/* Right facet (orange/amber) */}
            <polygon points="89,27.5 89,72.5 68,50" fill="#f58220" />
            {/* Bottom-Right facet (gold) */}
            <polygon points="89,72.5 50,95 50,65 68,50" fill="#fbb03b" />
            {/* Bottom-Left facet (yellow) */}
            <polygon points="50,95 11,72.5 32,50 50,65" fill="#f7ec1e" />
            {/* Left facet (red) */}
            <polygon points="11,72.5 11,27.5 32,50" fill="#ed1c24" />
          </svg>
          NSE Invest
        </a>
      </div>
    </div>
  );
}
