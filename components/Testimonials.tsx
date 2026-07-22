const testi = [
  { init: "R", name: "Rajesh Gupta", role: "Business Owner, Mainpuri", text: "PK Financial Services helped me start my SIP journey 5 years ago. Today my portfolio is up 3x. Their personalised approach and regular reviews make all the difference!" },
  { init: "S", name: "Sunita Sharma", role: "Government Employee, Agra", text: "I was confused about where to invest my retirement savings. The team explained everything clearly and set up a diversified plan that gives me peace of mind." },
  { init: "A", name: "Anil Verma", role: "Software Engineer, Noida", text: "Their tax planning advice saved me over ₹80,000 last year! Highly professional and always available. I refer all my friends to PK Financial." },
];

export default function Testimonials() {
  return (
    <section style={{ background: "var(--cream)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>Client Stories</div>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "var(--navy)" }}>What Our Clients <span style={{ color: "var(--gold)" }}>Say</span></h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="testi-grid">
          {testi.map((t) => (
            <div key={t.name} style={{ background: "#fff", borderRadius: 14, padding: 30, boxShadow: "0 4px 20px rgba(0,0,0,.06)", position: "relative" }}>
              <div style={{ position: "absolute", top: 10, left: 22, fontFamily: "var(--font-playfair,serif)", fontSize: 80, lineHeight: 1, color: "var(--gold)", opacity: .25, pointerEvents: "none" }}>"</div>
              <div style={{ color: "var(--gold)", fontSize: 13, marginBottom: 10 }}>★★★★★</div>
              <p style={{ fontSize: 14, color: "var(--gray)", lineHeight: 1.8, marginBottom: 20, position: "relative", zIndex: 1 }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-playfair,serif)", fontSize: 18, color: "var(--gold)", fontWeight: 700, flexShrink: 0 }}>{t.init}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--navy)" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--gray)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:900px){ .testi-grid{ grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}
