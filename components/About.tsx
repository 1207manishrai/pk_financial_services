"use client";

import { useState, useEffect } from "react";

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = ["/about-graphic.png", "/about-graphic-2.png", "/about-graphic-3.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="about" style={{ background: "var(--cream)", padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="about-grid">
        {/* Slideshow 3D graphic block */}
        <div style={{ position: "relative", height: 420, display: "flex", alignItems: "center", justifyContent: "center" }} className="about-graphic">
          <div 
            style={{ 
              position: "relative", 
              width: "100%", 
              height: "100%", 
              overflow: "hidden", 
              borderRadius: 16, 
              boxShadow: "0 20px 40px rgba(10,22,40,0.12)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"
            }}
            className="slideshow-container"
          >
            {slides.map((slide, index) => (
              <img
                key={slide}
                src={slide}
                alt={`Financial Growth 3D Graphic ${index + 1}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: 16,
                  transition: "opacity 0.8s ease",
                  opacity: index === currentSlide ? 1 : 0,
                  zIndex: index === currentSlide ? 1 : 0,
                  pointerEvents: index === currentSlide ? "auto" : "none"
                }}
              />
            ))}

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(10, 22, 40, 0.65)",
                border: "none",
                color: "#fff",
                width: 36,
                height: 36,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                fontSize: 15,
                fontWeight: "bold",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--navy)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(10, 22, 40, 0.65)";
                e.currentTarget.style.transform = "translateY(-50%)";
              }}
            >
              ❮
            </button>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              style={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(10, 22, 40, 0.65)",
                border: "none",
                color: "#fff",
                width: 36,
                height: 36,
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 10,
                fontSize: 15,
                fontWeight: "bold",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--navy)";
                e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(10, 22, 40, 0.65)";
                e.currentTarget.style.transform = "translateY(-50%)";
              }}
            >
              ❯
            </button>

            {/* Navigation Dots */}
            <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  style={{
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    border: "none",
                    background: idx === currentSlide ? "var(--gold)" : "rgba(255, 255, 255, 0.4)",
                    cursor: "pointer",
                    padding: 0,
                    transition: "all 0.2s"
                  }}
                />
              ))}
            </div>
          </div>

          {/* Badge Overlay */}
          <div style={{ position: "absolute", bottom: 20, left: -20, background: "var(--navy)", color: "#fff", padding: "14px 18px", borderRadius: 10, boxShadow: "0 10px 30px rgba(0,0,0,.2)", zIndex: 12 }}>
            <span style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 32, fontWeight: 700, color: "var(--gold)", display: "block" }}>6+</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,.7)" }}>Years of Experience</span>
          </div>
        </div>

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
          <a href="#contact" style={{ background: "var(--gold)", color: "var(--navy)", padding: "13px 28px", borderRadius: 5, fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-block" }}>Know More →</a>
        </div>
      </div>
      <style>{`
        @media(max-width:900px){ .about-grid{ grid-template-columns:1fr !important; gap:36px !important; } }
        @media(max-width:600px){ .about-graphic{ height:280px !important; } }
        .slideshow-container:hover {
          transform: scale(1.02);
          box-shadow: 0 30px 60px rgba(10,22,40,0.18) !important;
        }
      `}</style>
    </section>
  );
}
