"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function fmt(n: number): string {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function RangeField({ label, id, min, max, step, value, onChange, minLabel, maxLabel, unit = "" }: {
  label: string; id: string; min: number; max: number; step: number; value: number;
  onChange: (v: number) => void; minLabel: string; maxLabel: string; unit?: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".5px" }}>
        <label htmlFor={id}>{label}</label>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {unit === "₹" && <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 14 }}>₹</span>}
          <input
            type="number"
            value={value || ""}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const val = e.target.value === "" ? 0 : Number(e.target.value);
              onChange(val);
            }}
            style={{
              width: "120px",
              padding: "4px 10px",
              border: "1.5px solid var(--gold)",
              borderRadius: 8,
              fontSize: 14.5,
              fontWeight: 700,
              color: "var(--navy)",
              background: "#fff",
              outline: "none",
              textAlign: "right",
              fontFamily: "inherit"
            }}
          />
          {unit && unit !== "₹" && <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 12.5 }}>{unit}</span>}
        </div>
      </div>
      <input id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
        style={{ "--range-val": pct + "%" } as React.CSSProperties}
      />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--gray)", marginTop: 4 }}>
        <span>{minLabel}</span><span>{maxLabel}</span>
      </div>
    </div>
  );
}

function Donut({ pct, label }: { pct: number; label: string }) {
  const circ = 345;
  const offset = circ - (Math.min(pct, 100) / 100) * circ;
  return (
    <div style={{ margin: "16px auto", position: "relative", width: 140, height: 140 }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r="55" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="16"/>
        <circle cx="70" cy="70" r="55" fill="none" stroke="var(--gold)" strokeWidth="16"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset .6s ease" }}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 22, color: "var(--gold)", fontWeight: 700 }}>{Math.round(pct)}%</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)" }}>{label}</div>
      </div>
    </div>
  );
}

function ResultPill({ label, val, valStyle }: { label: string; val: string; valStyle?: React.CSSProperties }) {
  return (
    <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 10, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 700, color: "#fff", ...valStyle }}>{val}</span>
    </div>
  );
}

function SIPCalc() {
  const [amt, setAmt] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const r = rate / 100 / 12, n = years * 12;
  const total = amt * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  const invested = amt * n;
  const returns = total - invested;
  const gainPct = (returns / invested) * 100;
  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,.07)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="calc-grid">
        <div style={{ padding: 36, borderRight: "1px solid #eee" }}>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 22, color: "var(--navy)", marginBottom: 6 }}>SIP Calculator</h2>
          <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 28 }}>Estimate returns on your monthly SIP investments</p>
          <RangeField label="Monthly Investment" id="sip-amt" min={500} max={100000} step={500} value={amt} onChange={setAmt} minLabel="₹500" maxLabel="₹1,00,000" unit="₹" />
          <RangeField label="Expected Annual Return" id="sip-rate" min={1} max={30} step={0.5} value={rate} onChange={setRate} minLabel="1%" maxLabel="30%" unit="%" />
          <RangeField label="Investment Period" id="sip-years" min={1} max={40} step={1} value={years} onChange={setYears} minLabel="1 Yr" maxLabel="40 Yrs" unit="Yrs" />
        </div>
        <div style={{ padding: 36, background: "linear-gradient(160deg,var(--navy) 0%,#1a3560 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,.5)", marginBottom: 6 }}>Total Value at Maturity</div>
          <div style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 36, fontWeight: 700, color: "var(--gold)", marginBottom: 16 }}>{fmt(total)}</div>
          <Donut pct={Math.min(gainPct / 3, 100)} label="Gain" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <ResultPill label="Total Invested" val={fmt(invested)} />
            <ResultPill label="Est. Returns" val={fmt(returns)} valStyle={{ color: "var(--gold2)" }} />
          </div>
        </div>
      </div>
      <div style={{ background: "var(--light)", padding: "16px 36px", fontSize: 12, color: "var(--gray)", lineHeight: 1.7, borderTop: "1px solid #e5e0d8" }}>
        <strong style={{ color: "var(--navy)" }}>Formula:</strong> M = P × {"{[(1 + r)ⁿ – 1] / r} × (1 + r)"} | P = monthly amount, r = monthly rate, n = total months. Mutual fund investments are subject to market risks.
      </div>
    </div>
  );
}

function LumpsumCalc() {
  const [amt, setAmt] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const total = amt * Math.pow(1 + rate / 100, years);
  const returns = total - amt;
  const gainPct = (returns / amt) * 100;
  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,.07)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="calc-grid">
        <div style={{ padding: 36, borderRight: "1px solid #eee" }}>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 22, color: "var(--navy)", marginBottom: 6 }}>Lumpsum Calculator</h2>
          <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 28 }}>Calculate the future value of a one-time investment</p>
          <RangeField label="Total Investment" id="lump-amt" min={5000} max={10000000} step={5000} value={amt} onChange={setAmt} minLabel="₹5,000" maxLabel="₹1 Cr" unit="₹" />
          <RangeField label="Expected Annual Return" id="lump-rate" min={1} max={30} step={0.5} value={rate} onChange={setRate} minLabel="1%" maxLabel="30%" unit="%" />
          <RangeField label="Investment Period" id="lump-years" min={1} max={40} step={1} value={years} onChange={setYears} minLabel="1 Yr" maxLabel="40 Yrs" unit="Yrs" />
        </div>
        <div style={{ padding: 36, background: "linear-gradient(160deg,var(--navy) 0%,#1a3560 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,.5)", marginBottom: 6 }}>Total Value at Maturity</div>
          <div style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 36, fontWeight: 700, color: "var(--gold)", marginBottom: 16 }}>{fmt(total)}</div>
          <Donut pct={Math.min(gainPct / 3, 100)} label="Gain" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <ResultPill label="Initial Investment" val={fmt(amt)} />
            <ResultPill label="Est. Returns" val={fmt(returns)} valStyle={{ color: "var(--gold2)" }} />
          </div>
        </div>
      </div>
      <div style={{ background: "var(--light)", padding: "16px 36px", fontSize: 12, color: "var(--gray)", lineHeight: 1.7, borderTop: "1px solid #e5e0d8" }}>
        <strong style={{ color: "var(--navy)" }}>Formula:</strong> A = P × (1 + r/100)ⁿ | P = principal, r = annual rate %, n = years. Read all scheme-related documents carefully before investing.
      </div>
    </div>
  );
}

function LoanCalc() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);
  const r = rate / 100 / 12, n = years * 12;
  const emi = principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
  const totalPay = emi * n;
  const interest = totalPay - principal;
  const intPct = (interest / totalPay) * 100;
  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,.07)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="calc-grid">
        <div style={{ padding: 36, borderRight: "1px solid #eee" }}>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 22, color: "var(--navy)", marginBottom: 6 }}>Loan / EMI Calculator</h2>
          <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 28 }}>Calculate your monthly EMI for any loan</p>
          <RangeField label="Loan Amount" id="loan-amt" min={10000} max={10000000} step={10000} value={principal} onChange={setPrincipal} minLabel="₹10,000" maxLabel="₹1 Cr" unit="₹" />
          <RangeField label="Annual Interest Rate" id="loan-rate" min={1} max={24} step={0.1} value={rate} onChange={setRate} minLabel="1%" maxLabel="24%" unit="%" />
          <RangeField label="Loan Tenure" id="loan-years" min={1} max={30} step={1} value={years} onChange={setYears} minLabel="1 Yr" maxLabel="30 Yrs" unit="Yrs" />
        </div>
        <div style={{ padding: 36, background: "linear-gradient(160deg,var(--navy) 0%,#1a3560 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,.5)", marginBottom: 6 }}>Monthly EMI</div>
          <div style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 36, fontWeight: 700, color: "var(--gold)", marginBottom: 16 }}>{fmt(emi)}</div>
          <Donut pct={intPct} label="Interest" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <ResultPill label="Total Payment" val={fmt(totalPay)} />
            <ResultPill label="Total Interest" val={fmt(interest)} valStyle={{ color: "#ff9a9a" }} />
            <ResultPill label="Principal" val={fmt(principal)} />
          </div>
        </div>
      </div>
      <div style={{ background: "var(--light)", padding: "16px 36px", fontSize: 12, color: "var(--gray)", lineHeight: 1.7, borderTop: "1px solid #e5e0d8" }}>
        <strong style={{ color: "var(--navy)" }}>Formula:</strong> EMI = P × r × (1+r)ⁿ / [(1+r)ⁿ – 1] | P = loan amount, r = monthly interest rate, n = total months.
      </div>
    </div>
  );
}

const TABS = [
  { id: "sip", icon: "📈", label: "SIP Calculator" },
  { id: "lumpsum", icon: "💰", label: "Lumpsum Calculator" },
  { id: "loan", icon: "🏦", label: "Loan / EMI" },
];

export default function CalculatorsPage() {
  const [active, setActive] = useState("sip");
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "lumpsum" || hash === "loan") setActive(hash);
  }, []);

  return (
    <>
      {/* Header */}
      <div style={{ background: "var(--navy)", color: "#a0aec0", fontSize: 12, padding: "7px 24px", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
        <span>⏰ Mon–Sat: 09:00 – 18:00 &nbsp;|&nbsp; 📞 <a href="tel:+918318442129" style={{ color: "#a0aec0" }}>8318442129</a></span>
        <Link href="/" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>← Back to Home</Link>
      </div>
      <header style={{ background: "#fff", boxShadow: "0 2px 20px rgba(0,0,0,.08)" }}>
        <div style={{ maxWidth: 1200, margin: "auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none", padding: "14px 0" }}>
            <img src="/logo.jpg" alt="PK Financial Services Logo" style={{ height: 160, maxWidth: 440, width: "auto", objectFit: "contain" }} />
          </Link>
          <Link href="/" style={{ background: "var(--navy)", color: "#fff", padding: "9px 20px", borderRadius: 5, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>← Back to Home</Link>
        </div>
      </header>

      {/* Page Hero */}
      <div style={{ background: "linear-gradient(135deg,var(--navy),#1a3560)", padding: "50px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", marginBottom: 16 }} className="interactive-calc-logo-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="interactive-calc-logo" style={{ width: 64, height: 64, cursor: "pointer", transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" }}>
            {/* Body */}
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" fill="rgba(201,168,76,0.06)" />
            {/* Screen */}
            <rect x="7" y="5" width="10" height="4" rx="1" fill="var(--navy)" stroke="var(--gold)" strokeWidth="1" />
            {/* Screen characters (simulated digits) */}
            <line x1="9" y1="7" x2="11" y2="7" stroke="var(--gold)" strokeWidth="1" />
            <line x1="13" y1="7" x2="15" y2="7" stroke="var(--gold)" strokeWidth="1" />
            {/* Keypad */}
            <circle cx="8" cy="12" r="1" fill="var(--gold)" />
            <circle cx="12" cy="12" r="1" fill="var(--gold)" />
            <circle cx="16" cy="12" r="1" fill="var(--gold)" />
            
            <circle cx="8" cy="15" r="1" fill="var(--gold)" />
            <circle cx="12" cy="15" r="1" fill="var(--gold)" />
            <circle cx="16" cy="15" r="1" fill="var(--gold)" />
            
            <circle cx="8" cy="18" r="1" fill="var(--gold)" />
            <circle cx="12" cy="18" r="1" fill="var(--gold)" />
            {/* Plus Key */}
            <rect x="15" y="17" width="2" height="3" rx="0.5" fill="var(--gold)" />
          </svg>
        </div>
        <h1 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(28px,4vw,42px)", color: "#fff", marginBottom: 10 }}>
          Financial <span style={{ color: "var(--gold)" }}>Calculators</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,.7)", fontSize: 15 }}>Plan your investments and loans smartly with our free tools</p>
      </div>

      {/* Tabs */}
      <div style={{ maxWidth: 900, margin: "-24px auto 0", padding: "0 24px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "flex", background: "#fff", borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,.12)", overflow: "auto" }} className="calc-tabs">
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActive(tab.id)}
              style={{ flex: "1 0 auto", minWidth: 120, padding: "16px 10px", border: "none", background: active === tab.id ? "var(--light)" : "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, color: active === tab.id ? "var(--navy)" : "var(--gray)", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, borderBottom: active === tab.id ? "3px solid var(--gold)" : "3px solid transparent", transition: "all .2s" }}>
              <span style={{ fontSize: 22 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calculator */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "30px 24px 60px" }}>
        {active === "sip" && <SIPCalc />}
        {active === "lumpsum" && <LumpsumCalc />}
        {active === "loan" && <LoanCalc />}
      </div>

      {/* Footer */}
      <div style={{ background: "var(--navy)", color: "rgba(255,255,255,.5)", textAlign: "center", padding: 18, fontSize: 12.5 }}>
        © 2026 <Link href="/" style={{ color: "var(--gold)", textDecoration: "none" }}>PK Financial Services</Link> &nbsp;|&nbsp; Sector-16A/232, Vrindavan Yojna-4, Raebareli Road, Lucknow - 226029
      </div>

      <style>{`
        .interactive-calc-logo:hover {
          transform: translateY(-4px) rotate(-8deg) scale(1.1);
          filter: drop-shadow(0 6px 16px rgba(201, 168, 76, 0.45));
        }
        @media(max-width:700px){
          .calc-grid { grid-template-columns:1fr !important; }
          .calc-grid > div { padding: 24px 20px !important; border-right: none !important; border-bottom: 1px solid #eee !important; }
        }
      `}</style>
    </>
  );
}
