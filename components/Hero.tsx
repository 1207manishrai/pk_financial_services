"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface HeroProps {
  onOpenEnquiry?: () => void;
}

interface NewsItem {
  title: string;
  link: string;
  date: string;
}

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const [bgIndex, setBgIndex] = useState(0);
  const bgs = [
    "/hero-compounding.png",
    "/hero-tree.png",
    "/hero-bg.png",
    "/hero-bg-2.png",
    "/hero-bg-3.png"
  ];

  // Live news and updates states
  const [news, setNews] = useState<{ economy: NewsItem[]; schemes: NewsItem[] } | null>(null);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [bgs.length]);

  // Fetch live news from Next.js server RSS ingestion endpoint
  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch("/api/news");
        if (res.ok) {
          const data = await res.json();
          if (data && data.economy && data.schemes) {
            setNews(data);
          }
        }
      } catch (err) {
        console.error("Failed to load live news: ", err);
      } finally {
        setNewsLoading(false);
      }
    }
    loadNews();
  }, []);

  const fallbackEconomy = [
    { title: "RBI Holds Repo Rate at 6.5%", link: "https://news.google.com", date: new Date().toISOString() },
    { title: "GDP Forecast Upgraded to 7.0%", link: "https://news.google.com", date: new Date().toISOString() },
    { title: "Service Export Surge Reaches Peak", link: "https://news.google.com", date: new Date().toISOString() }
  ];

  const fallbackSchemes = [
    { title: "SBI Energy NFO Open Now", link: "https://news.google.com", date: new Date().toISOString() },
    { title: "ICICI Pru AUM Crosses Milestone", link: "https://news.google.com", date: new Date().toISOString() },
    { title: "IRDAI Cashless Claim Mandate", link: "https://news.google.com", date: new Date().toISOString() }
  ];

  return (
    <section style={{ 
      background: "linear-gradient(135deg, var(--navy) 0%, #162a4d 50%, #1e355e 100%)", 
      minHeight: 560, 
      display: "flex", 
      alignItems: "center", 
      padding: "80px 24px", 
      position: "relative", 
      overflow: "hidden" 
    }}>
      {/* Background patterns */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }} />
      
      {/* Automated Background Slideshow */}
      {bgs.map((bg, idx) => (
        <div
          key={bg}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url('${bg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            opacity: idx === bgIndex ? 0.35 : 0,
            mixBlendMode: "screen",
            transition: "opacity 1.5s ease-in-out",
            zIndex: 1
          }}
        />
      ))}
      
      {/* Finance related floating vector graphics in background */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 2 }}>
        {/* Floating Coin (₹) */}
        <svg viewBox="0 0 100 100" style={{ width: 110, height: 110, position: "absolute", top: "15%", left: "6%", opacity: 0.12, animation: "float-1 8s ease-in-out infinite" }}>
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--gold)" strokeWidth="5" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeDasharray="5 3" />
          <text x="50" y="61" textAnchor="middle" fill="var(--gold)" fontSize="34" fontWeight="bold" fontFamily="system-ui, -apple-system">₹</text>
        </svg>

        {/* Floating Line Chart */}
        <svg viewBox="0 0 100 100" style={{ width: 130, height: 130, position: "absolute", bottom: "12%", left: "45%", opacity: 0.1, animation: "float-2 10s ease-in-out infinite" }}>
          <path d="M10 80 L35 50 L55 62 L90 20" fill="none" stroke="#10b981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M70 20 H90 V40" fill="none" stroke="#10b981" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="35" cy="50" r="5" fill="#10b981" />
          <circle cx="55" cy="62" r="5" fill="#10b981" />
          <circle cx="90" cy="20" r="6" fill="#10b981" />
        </svg>

        {/* Floating Percentage (Growth rate indicator) */}
        <svg viewBox="0 0 100 100" style={{ width: 90, height: 90, position: "absolute", top: "20%", right: "28%", opacity: 0.12, animation: "float-3 7s ease-in-out infinite" }}>
          <circle cx="30" cy="30" r="10" fill="none" stroke="var(--gold)" strokeWidth="5" />
          <circle cx="70" cy="70" r="10" fill="none" stroke="var(--gold)" strokeWidth="5" />
          <line x1="75" y1="25" x2="25" y2="75" stroke="var(--gold)" strokeWidth="5" strokeLinecap="round" />
        </svg>

        {/* Floating Security Shield */}
        <svg viewBox="0 0 100 100" style={{ width: 100, height: 100, position: "absolute", bottom: "20%", left: "15%", opacity: 0.11, animation: "float-4 9s ease-in-out infinite" }}>
          <path d="M50 15 L80 25 V55 C80 75 50 85 50 85 C50 85 20 75 20 55 V25 L50 15 Z" fill="none" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 35 V65" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
          <path d="M35 50 H65" stroke="#60a5fa" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </div>

      <div 
        style={{ 
          maxWidth: 1300, 
          margin: "auto", 
          width: "100%", 
          display: "grid", 
          gridTemplateColumns: "3fr 1fr", 
          gap: 36, 
          alignItems: "stretch", 
          position: "relative", 
          zIndex: 5 
        }} 
        className="hero-main-container"
      >
        {/* Left Column: 75% - Containing the original details and feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 30, alignItems: "center" }} className="hero-grid-75">
          <div>
            <h1 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(32px,4vw,52px)", fontWeight: 700, color: "#fff", lineHeight: 1.18, marginBottom: 18 }}>
              Your <span style={{ color: "var(--gold)" }}>Financial Goals</span>,<br />Our Expertise
            </h1>
            <p style={{ color: "rgba(255,255,255,.76)", fontSize: 15.5, lineHeight: 1.7, maxWidth: 540, marginBottom: 34 }}>
              PK Financial Services helps you build, grow and protect your wealth with expert guidance in Mutual Funds, Insurance, Tax Planning, and more — tailored to your life journey.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} className="hero-buttons">
              {onOpenEnquiry ? (
                <button
                  onClick={onOpenEnquiry}
                  style={{ background: "var(--gold)", color: "var(--navy)", border: "none", padding: "12px 24px", borderRadius: 5, fontSize: 13.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "inherit" }}
                >
                  Get Free Consultation →
                </button>
              ) : (
                <a href="#contact" style={{ background: "var(--gold)", color: "var(--navy)", padding: "12px 24px", borderRadius: 5, fontSize: 13.5, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>Get Free Consultation →</a>
              )}
              <a href="#services" style={{ border: "2px solid rgba(255,255,255,.35)", color: "#fff", padding: "12px 24px", borderRadius: 5, fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}>Our Services</a>
              <Link href="/calculators" style={{ border: "2px solid var(--gold)", color: "var(--gold)", padding: "12px 24px", borderRadius: 5, fontSize: 13.5, fontWeight: 600, textDecoration: "none" }}>🧮 Calculators</Link>
            </div>
          </div>

          {/* Feature Cards with 3D Depth effects */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }} className="hero-cards">
            {[
              { icon: "📈", title: "Mutual Fund Investments", desc: "SIP, lump sum, or portfolio rebalancing — we guide every step." },
              { icon: "🛡️", title: "Life & Health Insurance", desc: "Protect what matters most with the right coverage plan." },
              { icon: "💰", title: "Tax Saving Solutions", desc: "Maximize returns and minimise your tax outgo legally." },
            ].map((c) => (
              <a 
                key={c.title} 
                href="#services" 
                style={{ 
                  background: "rgba(255, 255, 255, 0.05)", 
                  border: "1px solid rgba(255, 255, 255, 0.08)", 
                  backdropFilter: "blur(12px)", 
                  borderRadius: 12, 
                  padding: 18, 
                  textDecoration: "none", 
                  display: "flex", 
                  alignItems: "flex-start", 
                  gap: 14, 
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)" 
                }} 
                className="hero-card-item"
              >
                <div style={{
                  background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.03) 100%)",
                  border: "1px solid rgba(37, 99, 235, 0.25)",
                  borderRadius: 10,
                  width: 38,
                  height: 38,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  flexShrink: 0,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
                }}>
                  {c.icon}
                </div>
                <div>
                  <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 700, marginBottom: 4, letterSpacing: 0.3 }}>{c.title}</h4>
                  <p style={{ color: "rgba(255,255,255,.6)", fontSize: 12, lineHeight: 1.5 }}>{c.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: 25% - Containing 2 sub-sections stacked vertically */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="hero-grid-25">
          {/* Sub-section 1: Indian Economy News */}
          <div 
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(16px)",
              borderRadius: 14,
              padding: 16,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}
            className="hero-news-card"
          >
            <h3 style={{ color: "var(--gold)", fontSize: 14.5, fontWeight: 700, margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 8 }}>
              <span className="live-pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block", boxShadow: "0 0 8px #10b981" }} /> Live Indian Economy News
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {newsLoading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} style={{ paddingBottom: 6 }}>
                    <div style={{ background: "rgba(255,255,255,0.08)", height: 13, borderRadius: 4, width: "85%", marginBottom: 6, animation: "pulse 1.5s infinite" }} />
                    <div style={{ background: "rgba(255,255,255,0.04)", height: 9, borderRadius: 3, width: "95%", animation: "pulse 1.5s infinite" }} />
                  </div>
                ))
              ) : (
                (news?.economy || fallbackEconomy).map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hero-news-item" 
                    style={{ 
                      display: "block", 
                      textDecoration: "none", 
                      borderBottom: idx < 2 ? "1px solid rgba(255,255,255,0.04)" : "none", 
                      paddingBottom: 6 
                    }}
                  >
                    <div style={{ color: "#fff", fontSize: 12.2, fontWeight: 650, marginBottom: 2, lineHeight: 1.4 }} className="news-title">{item.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10.5 }}>
                      {item.date ? new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Live'}
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Sub-section 2: Updates (Mutual Fund & Insurance) */}
          <div 
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(16px)",
              borderRadius: 14,
              padding: 16,
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
            }}
            className="hero-news-card"
          >
            <h3 style={{ color: "#60a5fa", fontSize: 14.5, fontWeight: 700, margin: "0 0 12px 0", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 8 }}>
              <span className="live-pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#60a5fa", display: "inline-block", boxShadow: "0 0 8px #60a5fa" }} /> Scheme & Product Updates
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {newsLoading ? (
                [1, 2, 3].map((i) => (
                  <div key={i} style={{ paddingBottom: 6 }}>
                    <div style={{ background: "rgba(255,255,255,0.08)", height: 13, borderRadius: 4, width: "85%", marginBottom: 6, animation: "pulse 1.5s infinite" }} />
                    <div style={{ background: "rgba(255,255,255,0.04)", height: 9, borderRadius: 3, width: "95%", animation: "pulse 1.5s infinite" }} />
                  </div>
                ))
              ) : (
                (news?.schemes || fallbackSchemes).map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hero-news-item" 
                    style={{ 
                      display: "block", 
                      textDecoration: "none", 
                      borderBottom: idx < 2 ? "1px solid rgba(255,255,255,0.04)" : "none", 
                      paddingBottom: 6 
                    }}
                  >
                    <div style={{ color: "#fff", fontSize: 12.2, fontWeight: 650, marginBottom: 2, lineHeight: 1.4 }} className="news-title">{item.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10.5 }}>
                      {item.date ? new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Live'}
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Floating background keyframes */
        @keyframes float-1 {
          0% { transform: translateY(0px) rotate(15deg); }
          50% { transform: translateY(-15px) rotate(18deg); }
          100% { transform: translateY(0px) rotate(15deg); }
        }
        @keyframes float-2 {
          0% { transform: translateY(0px) rotate(-10deg); }
          50% { transform: translateY(-20px) rotate(-12deg); }
          100% { transform: translateY(0px) rotate(-10deg); }
        }
        @keyframes float-3 {
          0% { transform: translateY(0px) rotate(-20deg); }
          50% { transform: translateY(-12px) rotate(-18deg); }
          100% { transform: translateY(0px) rotate(-20deg); }
        }
        @keyframes float-4 {
          0% { transform: translateY(0px) rotate(10deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
          100% { transform: translateY(0px) rotate(10deg); }
        }

        /* Pulse animation for skeletons */
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.25; }
          100% { opacity: 0.6; }
        }

        /* 3D tilt and elevation hover animations */
        .hero-card-item {
          transform-style: preserve-3d;
          perspective: 1000px;
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .hero-card-item:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          border-color: rgba(37, 99, 235, 0.4) !important;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.25) !important;
          transform: perspective(600px) rotateX(6deg) rotateY(-6deg) translateY(-8px) scale(1.04);
        }
        .hero-card-item:hover div {
          border-color: rgba(37, 99, 235, 0.4) !important;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.25) 0%, rgba(37, 99, 235, 0.08) 100%) !important;
          transform: translateZ(10px);
        }

        /* Glassmorphic News Subsections interactive animations */
        .hero-news-card {
          transition: all 0.45s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .hero-news-card:hover {
          background: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(37, 99, 235, 0.3) !important;
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.35) !important;
        }
        .hero-news-item {
          transition: all 0.25s ease;
          padding: 6px 8px;
          border-radius: 8px;
        }
        .hero-news-item:hover {
          background: rgba(255, 255, 255, 0.05);
          padding-left: 12px;
        }
        .hero-news-item:hover .news-title {
          color: var(--gold) !important;
        }

        @media(max-width:1100px){
          .hero-main-container {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .hero-grid-25 {
            flex-direction: row !important;
            flex-wrap: wrap;
          }
          .hero-grid-25 > * {
            flex: 1 1 300px !important;
          }
        }

        @media(max-width:900px){
          .hero-grid-75 {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .hero-cards {
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
        @media(max-width:480px){ 
          .hero-buttons > * { width: 100% !important; text-align: center !important; justify-content: center !important; } 
        }
      `}</style>
    </section>
  );
}
