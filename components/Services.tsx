"use client";
import Link from "next/link";

const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 80, height: 80 }}>
    {/* Diamond mortarboard shape */}
    <polygon points="12 3 22 8.5 12 14 2 8.5 12 3" fill="var(--navy)" stroke="var(--navy)" strokeWidth="1" />
    {/* Cap body */}
    <path d="M6 11.5v3.5c0 2 3 3.5 6 3.5s6-1.5 6-3.5v-3.5" fill="var(--navy)" />
    {/* Tassel line */}
    <line x1="20" y1="9" x2="20" y2="15.5" stroke="var(--gold)" strokeWidth="1.5" />
    {/* Tassel bead */}
    <circle cx="20" cy="17" r="1.5" fill="var(--gold)" />
    {/* Tassel tail */}
    <rect x="19.25" y="19" width="1.5" height="4" rx="0.5" fill="var(--gold)" />
  </svg>
);

const services = [
  { icon: <GraduationCapIcon />, bg: "linear-gradient(135deg,#f0ece4,#e2dcd0)", tag: "Planning", title: "Education Planning", desc: "Secure your child's future with dedicated education funds and SIP-based investment strategies." },
  { icon: "💍", bg: "linear-gradient(135deg,#fff8e7,#fdecc8)", tag: "Planning", title: "Marriage Planning", desc: "Plan weddings and major life events with goal-based investments that grow with time." },
  { icon: "🌅", bg: "linear-gradient(135deg,#e7f0ff,#d0e4ff)", tag: "Planning", title: "Retirement Planning", desc: "Build a robust retirement corpus through NPS, PPF, and mutual funds for a stress-free future." },
  { icon: "📈", bg: "linear-gradient(135deg,#e7fff0,#c8f5dc)", tag: "Investments", title: "Mutual Fund Investments", desc: "Expert guidance on equity, debt, hybrid, and ELSS funds. Start SIP from just ₹500/month." },
  { icon: "🛡️", bg: "linear-gradient(135deg,#fff0e7,#ffd9bb)", tag: "Insurance", title: "Life & Health Insurance", desc: "Compare and buy the best term life, health, and ULIP plans with complete claim support." },
  { icon: "💰", bg: "linear-gradient(135deg,#f0e7ff,#e0cfff)", tag: "Tax", title: "Tax Saving Solutions", desc: "Smart ELSS investments, NPS deductions, and 80C planning to minimise your tax burden." },
  { icon: "🏢", bg: "linear-gradient(135deg,#e2e8f0,#cbd5e1)", tag: "Investments", title: "Bonds & Fixed Deposits", desc: "Secure your capital with guaranteed returns. Invest in high-yield corporate FDs, government bonds, and sovereign gold bonds (SGB)." },
  { icon: "🚗", bg: "linear-gradient(135deg,#ffe4e6,#fecdd3)", tag: "Insurance", title: "General Insurance", desc: "Protect what matters most. Get comprehensive insurance policies for motor vehicles, home property, and business liabilities." },
];

interface ServicesProps {
  onEnquire?: (serviceTitle: string) => void;
}

export default function Services({ onEnquire }: ServicesProps) {
  return (
    <section id="services" style={{ background: "#fff", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>What We Offer</div>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--navy)" }}>Our Best <span style={{ color: "var(--gold)" }}>Services</span></h2>
          <p style={{ color: "var(--gray)", marginTop: 14, maxWidth: 580, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>Comprehensive financial solutions designed to help you at every stage of life.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }} className="services-grid">
          {services.map((s) => (
            <div key={s.title} style={{ background: "var(--cream)", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,.05)", position: "relative", transition: "transform .25s, box-shadow .25s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,.1)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,.05)"; }}
            >
              <div style={{ width: "100%", height: 200, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>{s.icon}</div>
              <span style={{ position: "absolute", top: 14, left: 14, background: "var(--navy)", color: "var(--gold)", fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", padding: "4px 10px", borderRadius: 20 }}>{s.tag}</span>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 20, color: "var(--navy)", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.7, marginBottom: 18 }}>{s.desc}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {s.title === "Education Planning" ? (
                    <Link
                      href="/calculators/education-planning"
                      style={{ color: "var(--gold)", fontSize: 13, fontWeight: 700, textDecoration: "none" }}
                    >
                      Enquire Now →
                    </Link>
                  ) : onEnquire ? (
                    <button
                      onClick={() => onEnquire(s.title)}
                      style={{ background: "none", border: "none", color: "var(--gold)", fontSize: 13, fontWeight: 700, cursor: "pointer", padding: 0 }}
                    >
                      Enquire Now →
                    </button>
                  ) : (
                    <a href="#contact" style={{ color: "var(--gold)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>Enquire Now →</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .services-grid{ grid-template-columns:1fr 1fr !important; } } @media(max-width:600px){ .services-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

