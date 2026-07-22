"use client";
const articles = [
  { bg: "linear-gradient(135deg,#f0ece4,#ddd8d0)", icon: "📰", date: "15 May 2026", cat: "Mutual Funds", title: "Top 5 ELSS Funds to Invest in for FY 2026-27", desc: "Save tax and build wealth simultaneously. Here are the best ELSS funds based on 3-year performance." },
  { bg: "linear-gradient(135deg,#fff8e7,#fdecc8)", icon: "💡", date: "02 May 2026", cat: "Financial Planning", title: "Why Every 30-Year-Old Should Start Retirement Planning Now", desc: "Compound interest works best over time. Starting at 30 can completely change your financial future." },
  { bg: "linear-gradient(135deg,#e7f0ff,#d0e4ff)", icon: "📊", date: "20 Apr 2026", cat: "Insurance", title: "Term Insurance vs ULIP: Which Is Right for You in 2026?", desc: "A complete comparison of term plans and ULIPs to help you choose the best life insurance product." },
];

export default function News() {
  return (
    <section style={{ background: "var(--cream)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>Stay Informed</div>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--navy)" }}>Latest <span style={{ color: "var(--gold)" }}>News & Insights</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }} className="news-grid">
          {articles.map((a) => (
            <div key={a.title} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 18px rgba(0,0,0,.05)", transition: "transform .25s" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "")}
            >
              <div style={{ height: 180, background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>{a.icon}</div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ background: "var(--navy)", color: "var(--gold)", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 4 }}>{a.date}</span>
                  <span style={{ color: "var(--gray)", fontSize: 11 }}>{a.cat}</span>
                </div>
                <h4 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 17, color: "var(--navy)", marginBottom: 8, lineHeight: 1.4 }}>{a.title}</h4>
                <p style={{ fontSize: 13, color: "var(--gray)", lineHeight: 1.7, marginBottom: 14 }}>{a.desc}</p>
                <a href="#" style={{ color: "var(--gold)", fontSize: 12, fontWeight: 600, textDecoration: "none" }}>Read More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .news-grid{ grid-template-columns:1fr 1fr !important; } } @media(max-width:600px){ .news-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}
