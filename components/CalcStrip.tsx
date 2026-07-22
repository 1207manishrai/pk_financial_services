"use client";
import Link from "next/link";

export default function CalcStrip() {
  return (
    <div style={{ background: "var(--navy2)", padding: "22px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>🧮</span>
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Financial Calculators</div>
            <div style={{ color: "rgba(255,255,255,.5)", fontSize: 12 }}>Plan smarter with our free tools</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { icon: "📈", label: "SIP Calculator", sub: "Monthly SIP returns", hash: "" },
            { icon: "💰", label: "Lumpsum Calculator", sub: "One-time investment", hash: "#lumpsum" },
            { icon: "🏦", label: "Loan / EMI", sub: "Monthly EMI & interest", hash: "#loan" },
          ].map((c) => (
            <Link key={c.label} href={`/calculators${c.hash}`}
              style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 18px", textDecoration: "none", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(201,168,76,.15)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.07)")}
            >
              <span style={{ fontSize: 22 }}>{c.icon}</span>
              <div>
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{c.label}</div>
                <div style={{ color: "rgba(255,255,255,.5)", fontSize: 11 }}>{c.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
