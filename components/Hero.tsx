"use client";
import Link from "next/link";

interface HeroProps {
  onOpenEnquiry?: () => void;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  return (
    <section style={{ background: "linear-gradient(135deg,var(--navy) 0%,#1a3560 60%,#243b6e 100%)", minHeight: 520, display: "flex", alignItems: "center", padding: "60px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div style={{ maxWidth: 1200, margin: "auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 340px", gap: 30, alignItems: "center", position: "relative" }} className="hero-grid">
        <div>
          <h1 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(32px,4.5vw,54px)", fontWeight: 700, color: "#fff", lineHeight: 1.18, marginBottom: 18 }}>
            Your <span style={{ color: "var(--gold)" }}>Financial Goals</span>,<br />Our Expertise
          </h1>
          <p style={{ color: "rgba(255,255,255,.72)", fontSize: 16, lineHeight: 1.7, maxWidth: 520, marginBottom: 34 }}>
            PK Financial Services helps you build, grow and protect your wealth with expert guidance in Mutual Funds, Insurance, Tax Planning, and more — tailored to your life journey.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }} className="hero-buttons">
            {onOpenEnquiry ? (
              <button
                onClick={onOpenEnquiry}
                style={{ background: "var(--gold)", color: "var(--navy)", border: "none", padding: "13px 28px", borderRadius: 5, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}
              >
                Get Free Consultation →
              </button>
            ) : (
              <a href="#contact" style={{ background: "var(--gold)", color: "var(--navy)", padding: "13px 28px", borderRadius: 5, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>Get Free Consultation →</a>
            )}
            <a href="#services" style={{ border: "2px solid rgba(255,255,255,.35)", color: "#fff", padding: "13px 28px", borderRadius: 5, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Our Services</a>
            <Link href="/calculators" style={{ border: "2px solid var(--gold)", color: "var(--gold)", padding: "13px 28px", borderRadius: 5, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>🧮 Calculators</Link>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }} className="hero-cards">
          {[
            { icon: "📈", title: "Mutual Fund Investments", desc: "SIP, lump sum, or portfolio rebalancing — we guide every step." },
            { icon: "🛡️", title: "Life & Health Insurance", desc: "Protect what matters most with the right coverage plan." },
            { icon: "💰", title: "Tax Saving Solutions", desc: "Maximize returns and minimise your tax outgo legally." },
          ].map((c) => (
            <a key={c.title} href="#services" style={{ background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", backdropFilter: "blur(10px)", borderRadius: 12, padding: 20, textDecoration: "none", display: "block" }} className="hero-card-item">
              <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.icon} {c.title}</h4>
              <p style={{ color: "rgba(255,255,255,.55)", fontSize: 12, lineHeight: 1.5 }}>{c.desc}</p>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .hero-card-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-card-item:hover {
          background: rgba(255,255,255,0.12) !important;
          border-color: rgba(255,255,255,0.25) !important;
          transform: translateY(-3px);
        }
        @media(max-width:900px){
          .hero-grid{ grid-template-columns:1fr !important; gap: 40px !important; }
          .hero-cards{
            display: flex !important;
            flex-direction: row !important;
            gap: 16px !important;
            overflow-x: auto !important;
            padding-bottom: 12px;
            scroll-snap-type: x mandatory;
            scrollbar-width: none;
          }
          .hero-cards::-webkit-scrollbar {
            display: none;
          }
          .hero-card-item {
            flex: 0 0 280px !important;
            scroll-snap-align: start;
          }
        }
        @media(max-width:480px){ .hero-buttons > * { width: 100% !important; text-align: center !important; justify-content: center !important; } }
      `}</style>
    </section>
  );
}

