"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/calculators", label: "Calculators" },
  { href: "/kyc", label: "Check KYC" },
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
    <header 
      style={{
        background: scrolled ? "rgba(255, 255, 255, 0.88)" : "#ffffff",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        boxShadow: scrolled 
          ? "0 15px 35px -10px rgba(10, 22, 40, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.7)" 
          : "0 2px 10px rgba(10,22,40,0.02)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",
        borderBottom: scrolled ? "1px solid rgba(10,22,40,0.05)" : "1px solid #f1f5f9",
        transform: scrolled ? "scale(0.99) translateY(2px)" : "scale(1) translateY(0px)"
      }} 
      className="header-floating-card"
    >
      <div style={{
        maxWidth: 1200,
        margin: "auto",
        padding: scrolled ? "6px 24px" : "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)"
      }}>
        {/* Logo with 3D Perspective Tilt on Hover */}
        <Link href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }} className="logo-container">
          <img
            src="/logo.jpg?v=3"
            alt="PK Financial Services Logo"
            style={{
              height: scrolled ? 80 : 110,
              maxWidth: 280,
              width: "auto",
              objectFit: "contain",
              transition: "height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)"
            }}
          />
        </Link>

        <ul style={{
          display: "flex",
          alignItems: "center",
          listStyle: "none",
          gap: 16,
          margin: 0,
          padding: 0,
          marginRight: "auto",
          marginLeft: 48
        }} className="nav-links-desktop">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                style={{
                  color: "var(--navy)",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  display: "inline-block",
                  border: "1px solid transparent"
                }}
                className="nav-link-hover"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

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
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
          <Link
            href="/admin"
            onClick={() => setIsOpen(false)}
            style={{
              background: "#ffffff",
              color: "var(--navy)",
              textAlign: "center",
              padding: "12px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              border: "1.5px solid #cbd5e1",
              boxShadow: "0 2px 6px rgba(0,0,0,.05)"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 15, height: 15 }} fill="currentColor">
              <ellipse cx="50" cy="32" rx="16" ry="21" />
              <path d="M14,90 C14,80 18,70 32,63 C40,58 42,58 45,71 L48,80 L52,80 L55,71 C58,58 60,58 68,63 C82,70 86,80 86,90 L86,92 C86,94.2 84.2,96 82,96 L18,96 C15.8,96 14,94.2 14,92 Z" />
              <polygon points="48,72 52,72 51,77 49,77" />
              <polygon points="49.2,78 50.8,78 52,90 50,93 48,90" />
            </svg>
            Admin Portal
          </Link>
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
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 15, height: 15 }} fill="currentColor">
              <ellipse cx="50" cy="32" rx="16" ry="21" />
              <path d="M16,90 C16,76 26,65 50,65 C74,65 84,76 84,90 L84,92 C84,94.2 82.2,96 80,96 L20,96 C17.8,96 16,94.2 16,92 Z" />
            </svg>
            Client Portal
          </Link>
          <a
            href="https://www.nseinvest.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{
              background: "#ffffff",
              color: "#251a70",
              textAlign: "center",
              padding: "12px",
              borderRadius: 8,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              border: "1.5px solid #cbd5e1",
              boxShadow: "0 2px 6px rgba(0,0,0,.05)"
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{ width: 15, height: 15 }} fill="none">
              <polygon points="50,5 11,27.5 32,50 50,35" fill="#f97316" />
              <polygon points="50,5 89,27.5 68,50 50,35" fill="#251a70" />
              <polygon points="89,27.5 89,72.5 68,50" fill="#f58220" />
              <polygon points="89,72.5 50,95 50,65 68,50" fill="#fbb03b" />
              <polygon points="50,95 11,72.5 32,50 50,65" fill="#f7ec1e" />
              <polygon points="11,72.5 11,27.5 32,50" fill="#ed1c24" />
            </svg>
            NSE Invest
          </a>
          
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
        /* 3D Perspective Logo Tilt */
        .logo-container {
          transition: transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1);
          transform-style: preserve-3d;
          perspective: 500px;
        }
        .logo-container:hover {
          transform: rotateX(8deg) rotateY(-8deg) scale(1.03);
        }

        /* 3D Floating Header Scale transition */
        .header-floating-card {
          transform-origin: top center;
        }

        /* 3D Pill Link Pop Effect with corporate gold theme */
        .nav-link-hover {
          position: relative;
        }
        .nav-link-hover:hover {
          color: var(--navy) !important;
          background: rgba(201, 168, 76, 0.1) !important;
          border-color: rgba(201, 168, 76, 0.3) !important;
          box-shadow: 0 6px 15px rgba(201, 168, 76, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.8) !important;
          transform: translateY(-2px) scale(1.05);
        }
        .nav-link-hover:active {
          transform: translateY(0px) scale(0.98);
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
