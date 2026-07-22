"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/calculators", label: "Calculators" },
  { href: "/#contact", label: "Contact Us" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header style={{
      background: scrolled ? "rgba(255, 255, 255, 0.96)" : "#ffffff",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      boxShadow: scrolled ? "0 10px 30px -10px rgba(10,22,40,0.08)" : "0 2px 10px rgba(10,22,40,0.02)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      borderBottom: scrolled ? "1px solid rgba(10,22,40,0.04)" : "1px solid #f1f5f9"
    }}>
      <div style={{
        maxWidth: 1200,
        margin: "auto",
        padding: scrolled ? "12px 24px" : "18px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="/logo.svg"
            alt="PK Financial Services Logo"
            style={{
              height: scrolled ? 46 : 54,
              maxWidth: 240,
              width: "auto",
              objectFit: "contain",
              transition: "height 0.3s ease"
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <ul style={{
          display: "flex",
          alignItems: "center",
          listStyle: "none",
          gap: 32,
          margin: 0,
          padding: 0
        }} className="nav-links-desktop">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                style={{
                  color: "var(--navy)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  transition: "color 0.2s ease"
                }}
                className="nav-link-hover"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Button */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }} className="actions-desktop">
          <Link
            href="/portal"
            style={{
              background: "linear-gradient(135deg, var(--gold), #d97706)",
              color: "var(--navy)",
              padding: "10px 22px",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: 13.5,
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(201,168,76,.2)",
              transition: "transform 0.2s, box-shadow 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-1px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(201,168,76,.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(201,168,76,.2)";
            }}
          >
            💼 Client Portal
          </Link>
        </div>

        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            zIndex: 1100,
            outline: "none"
          }}
          className="hamburger-btn"
          aria-label="Toggle Menu"
        >
          <div style={{
            width: 24,
            height: 2,
            background: "var(--navy)",
            margin: "5px 0",
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(45deg) translate(5px, 5px)" : "none"
          }} />
          <div style={{
            width: 24,
            height: 2,
            background: "var(--navy)",
            margin: "5px 0",
            transition: "all 0.3s ease",
            opacity: isOpen ? 0 : 1
          }} />
          <div style={{
            width: 24,
            height: 2,
            background: "var(--navy)",
            margin: "5px 0",
            transition: "all 0.3s ease",
            transform: isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"
          }} />
        </button>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : "-100%",
          width: "100%",
          maxWidth: 300,
          height: "100vh",
          background: "#ffffff",
          boxShadow: "-10px 0 30px rgba(10,22,40,0.12)",
          zIndex: 1050,
          transition: "right 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          padding: "80px 24px 40px"
        }}
      >
        <ul style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 32px",
          display: "flex",
          flexDirection: "column",
          gap: 20
        }}>
          {links.map((l) => (
            <li key={l.label} onClick={() => setIsOpen(false)}>
              <Link
                href={l.href}
                style={{
                  color: "var(--navy)",
                  textDecoration: "none",
                  fontSize: 15,
                  fontWeight: 600,
                  display: "block",
                  padding: "8px 0",
                  borderBottom: "1px solid #f1f5f9"
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: "auto" }}>
          <Link
            href="/portal"
            onClick={() => setIsOpen(false)}
            style={{
              background: "var(--navy)",
              color: "#fff",
              textAlign: "center",
              padding: "12px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700
            }}
          >
            💼 Client Portal
          </Link>
          
          {/* Mobile Contacts */}
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid #e2e8f0", paddingTop: 20 }}>
            <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: 1, color: "var(--gray)", fontWeight: 700 }}>Direct Support</div>
            <a href="tel:+918318442129" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--navy)", textDecoration: "none", fontSize: 13.5, fontWeight: 600 }}>
              <span>📞</span> +91 83184 42129
            </a>
            <a href="mailto:pkfinance11@gmail.com" style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--navy)", textDecoration: "none", fontSize: 13.5, fontWeight: 600 }}>
              <span>✉️</span> pkfinance11@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Backdrop when drawer is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(10,22,40,0.4)",
            backdropFilter: "blur(4px)",
            zIndex: 1040
          }}
        />
      )}

      <style>{`
        .nav-link-hover:hover {
          color: var(--gold) !important;
        }
        @media(max-width: 900px) {
          .nav-links-desktop, .actions-desktop {
            display: none !important;
          }
          .hamburger-btn {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
