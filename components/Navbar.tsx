"use client";
import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Us" },
  { href: "/#services", label: "Services" },
  { href: "/#", label: "Mutual Funds" },
  { href: "/#", label: "Life Insurance" },
  { href: "/#", label: "Financial Planning" },
  { href: "/#", label: "Downloads" },
  { href: "/#contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ background: "var(--navy)", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <ul style={{ display: open ? "flex" : "flex", flexDirection: "row", listStyle: "none", flexWrap: "wrap", gap: 0, margin: 0, padding: 0 }} className="nav-desktop">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} style={{ display: "block", padding: "14px 14px", color: "rgba(255,255,255,.82)", textDecoration: "none", fontSize: 13.5, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.82)")}
              >{l.label}</Link>
            </li>
          ))}
          <li>
            <Link href="/calculators" style={{ display: "block", padding: "8px 16px", margin: "8px 6px", background: "var(--gold)", color: "var(--navy)", borderRadius: 4, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>🧮 Calculators</Link>
          </li>
          <li>
            <Link href="/portal" style={{ display: "block", padding: "8px 16px", margin: "8px 6px", background: "linear-gradient(135deg, var(--gold), #d97706)", color: "var(--navy)", borderRadius: 4, textDecoration: "none", fontSize: 13, fontWeight: 800 }}>💼 Client Portal</Link>
          </li>
        </ul>
        <button onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }} className="hamburger" aria-label="Menu">
          <span style={{ display: "block", width: 24, height: 2, background: "#fff", margin: "5px 0", borderRadius: 2 }}/>
          <span style={{ display: "block", width: 24, height: 2, background: "#fff", margin: "5px 0", borderRadius: 2 }}/>
          <span style={{ display: "block", width: 24, height: 2, background: "#fff", margin: "5px 0", borderRadius: 2 }}/>
        </button>
      </div>
      <style>{`
        @media(max-width:900px){
          .nav-desktop { display: ${open ? "flex" : "none"} !important; flex-direction: column !important; position: absolute; top: 100%; left: 0; right: 0; background: var(--navy2); z-index: 200; padding: 8px 0; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
