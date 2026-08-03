"use client";


export default function About() {
  return (
    <section id="about" style={{ background: "var(--cream)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start" }} className="about-grid">
        <div>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(26px,3vw,36px)", fontWeight: 700, color: "var(--navy)", marginBottom: 18, lineHeight: 1.25 }}>
            Welcome to <span style={{ color: "var(--gold)" }}>PK Financial Services</span>
          </h2>
          <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 14 }}>We are an AMFI-registered Mutual Fund Distributor based in Lucknow, dedicated to helping individuals and families achieve their financial dreams through smart, personalised planning.</p>
          <p style={{ color: "var(--gray)", lineHeight: 1.8, marginBottom: 20 }}>Our team brings deep expertise across mutual funds, insurance, retirement planning, and tax optimisation — always putting your interests first.</p>
          <ul style={{ listStyle: "none", margin: "0 0 28px" }}>
            {["AMFI Registered Mutual Fund Distributor","Personalised financial roadmaps for every life stage","Transparent advisory with no hidden charges","Dedicated relationship manager for every client","Regular portfolio review and rebalancing"].map(item => (
              <li key={item} style={{ padding: "10px 0", display: "flex", alignItems: "flex-start", gap: 12, borderBottom: "1px solid #e5e0d8", fontSize: 14, color: "#1e293b" }}>
                <span style={{ background: "var(--gold)", color: "var(--navy)", width: 20, height: 20, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          {/* Founder Spotlight Card */}
          <div style={{
            background: "linear-gradient(135deg, rgba(10, 22, 40, 0.02) 0%, rgba(201, 168, 76, 0.04) 100%)",
            borderLeft: "4px solid var(--gold)",
            borderTop: "1px solid rgba(201,168,76,0.1)",
            borderRight: "1px solid rgba(201,168,76,0.1)",
            borderBottom: "1px solid rgba(201,168,76,0.1)",
            borderRadius: "8px",
            padding: "18px 20px",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.01)"
          }}>
            <div style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background: "var(--navy)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: 700,
              color: "var(--gold)",
              boxShadow: "0 4px 10px rgba(10,22,40,0.15)",
              flexShrink: 0
            }}>
              PK
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--navy)" }}>Praful Kumar</span>
                <span style={{ fontSize: "10px", fontWeight: 700, background: "rgba(201, 168, 76, 0.15)", color: "var(--navy)", padding: "2px 8px", borderRadius: "10px", textTransform: "uppercase" }}>Founder</span>
              </div>
              <p style={{ fontSize: "13px", color: "var(--gray)", margin: "4px 0 2px" }}>AMFI Registered Mutual Fund Distributor</p>
              <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--gold)" }}>
                ARN-253947 <span style={{ color: "var(--gray)", fontWeight: "normal", margin: "0 4px" }}>|</span> AMFI Registered MFD
              </div>
            </div>
          </div>

          <a href="#contact" style={{ background: "var(--gold)", color: "var(--navy)", padding: "13px 28px", borderRadius: 5, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block", marginBottom: "32px" }}>Know More →</a>
        </div>
        <div>
          {/* Investment Operations Associates */}
          <div style={{ marginBottom: "28px" }}>
            <h3 style={{ fontSize: "15px", fontWeight: 700, color: "var(--navy)", marginBottom: "12px", borderBottom: "1px solid rgba(201,168,76,0.2)", paddingBottom: "8px" }}>
              Investment Operations Associates
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Associate 1 */}
              <div style={{
                background: "linear-gradient(135deg, rgba(10, 22, 40, 0.01) 0%, rgba(201, 168, 76, 0.02) 100%)",
                borderLeft: "3px solid var(--gold)",
                borderTop: "1px solid rgba(201,168,76,0.1)",
                borderRight: "1px solid rgba(201,168,76,0.1)",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                borderRadius: "6px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--navy)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--gold)",
                  flexShrink: 0
                }}>
                  AK
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)" }}>Abhishek Kunwar</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "var(--gray)", margin: "2px 0" }}>EX-JE at Northern Railway</p>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--gold)" }}>
                    ARN-366509
                  </div>
                </div>
              </div>

              {/* Associate 2 */}
              <div style={{
                background: "linear-gradient(135deg, rgba(10, 22, 40, 0.01) 0%, rgba(201, 168, 76, 0.02) 100%)",
                borderLeft: "3px solid var(--gold)",
                borderTop: "1px solid rgba(201,168,76,0.1)",
                borderRight: "1px solid rgba(201,168,76,0.1)",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                borderRadius: "6px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--navy)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--gold)",
                  flexShrink: 0
                }}>
                  MR
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)" }}>Manish Rai</span>
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--gold)", marginTop: "2px" }}>
                    ARN-181978
                  </div>
                </div>
              </div>

              {/* Associate 3 */}
              <div style={{
                background: "linear-gradient(135deg, rgba(10, 22, 40, 0.01) 0%, rgba(201, 168, 76, 0.02) 100%)",
                borderLeft: "3px solid var(--gold)",
                borderTop: "1px solid rgba(201,168,76,0.1)",
                borderRight: "1px solid rgba(201,168,76,0.1)",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                borderRadius: "6px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--navy)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--gold)",
                  flexShrink: 0
                }}>
                  AK
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--navy)" }}>Ayush Kumar</span>
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--gold)", marginTop: "2px" }}>
                    ARN-123456
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .about-grid{ grid-template-columns:1fr !important; gap:36px !important; } }
      `}</style>
    </section>
  );
}
