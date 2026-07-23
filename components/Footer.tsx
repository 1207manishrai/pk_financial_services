"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      {/* CTA Banner */}
      <div style={{ background: "var(--gold)", padding: "40px 24px", textAlign: "center" }}>
        <h3 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(20px,2.5vw,28px)", color: "var(--navy)", marginBottom: 16 }}>Over 8 Years of Experience — We Ensure You Always Get the Best.</h3>
        <a href="#contact" style={{ background: "var(--navy)", color: "#fff", padding: "13px 28px", borderRadius: 5, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>Get a Free Quote →</a>
      </div>
      {/* Main Footer */}
      <footer style={{ background: "var(--navy)", padding: "60px 24px 0", color: "rgba(255,255,255,.65)" }}>
        <div style={{ maxWidth: 1200, margin: "auto", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: 40, paddingBottom: 40 }} className="footer-grid">
          <div>
            <Link href="/" style={{ display: "inline-block", textDecoration: "none", marginBottom: 16 }}>
              <img src="/logo-white.svg" alt="PK Financial Services Logo" style={{ height: 175, maxWidth: 420, width: "auto", objectFit: "contain" }} />
            </Link>
            <p style={{ fontSize: 13.5, lineHeight: 1.8 }}>We are committed to helping every Indian household achieve financial freedom through disciplined investing, smart tax planning, and the right insurance coverage.</p>
            <div style={{ marginTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)" }}>Praful Kumar</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>AMFI Registered MFD</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>ARN-253947</div>
            </div>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 18, paddingBottom: 12, borderBottom: "2px solid var(--gold)", display: "inline-block" }}>Our Services</h4>
            <ul style={{ listStyle: "none" }}>
              {["Mutual Fund Investments","Life & Health Insurance","Retirement Planning","Education Planning","Tax Saving (ELSS)","FD / Bonds","NRI Services"].map(s => (
                <li key={s} style={{ marginBottom: 9 }}><a href="#services" style={{ color: "rgba(255,255,255,.62)", textDecoration: "none", fontSize: 13.5 }}>› {s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 18, paddingBottom: 12, borderBottom: "2px solid var(--gold)", display: "inline-block" }}>Quick Links</h4>
            <ul style={{ listStyle: "none" }}>
              {[["Home","/"],["About Us","/#about"],["Calculators","/calculators"],["Financial Planning","/#"],["Downloads","/#"],["FAQ","/#"],["Contact Us","/#contact"]].map(([l,h]) => (
                <li key={l} style={{ marginBottom: 9 }}><Link href={h} style={{ color: "rgba(255,255,255,.62)", textDecoration: "none", fontSize: 13.5 }}>› {l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 18, paddingBottom: 12, borderBottom: "2px solid var(--gold)", display: "inline-block" }}>Contact Us</h4>
            <ul style={{ listStyle: "none" }}>
              {[
                { ico: "📍", val: "Sector-16A/232, Vrindavan Yojna-4, Raebareli Road, Lucknow - 226029" },
                { ico: "📞", val: <><a href="tel:+918318442129" style={{ color: "inherit", textDecoration: "none" }}>+91 83184 42129</a> / <a href="tel:+919936408150" style={{ color: "inherit", textDecoration: "none" }}>99364 08150</a></> },
                { ico: "✉️", val: <a href="mailto:pkfinance11@gmail.com" style={{ color: "inherit", textDecoration: "none" }}>pkfinance11@gmail.com</a> },
                { ico: "⏰", val: "Mon–Sat: 9:00 AM – 6:00 PM" },
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 14, fontSize: 13.5 }}>
                  <span style={{ flexShrink: 0, marginTop: 2 }}>{item.ico}</span>
                  <span>{item.val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", borderTop: "1px solid rgba(255,255,255,.08)", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, fontSize: 12.5 }}>
          <div>
            <span>© 2026 PK Financial Services. All Rights Reserved.</span>
            <span style={{ margin: "0 8px", color: "rgba(255,255,255,.2)" }}>|</span>
            <span style={{ color: "rgba(255,255,255,.6)" }}>Designed & Developed by <strong style={{ color: "var(--gold)", fontWeight: 600 }}>Manish Rai</strong></span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy","Disclaimer","Terms of Use","FAQ"].map(l => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,.5)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
      <style>{`@media(max-width:900px){ .footer-grid{ grid-template-columns:1fr 1fr !important; } } @media(max-width:600px){ .footer-grid{ grid-template-columns:1fr !important; } }`}</style>
    </>
  );
}
