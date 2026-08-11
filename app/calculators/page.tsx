"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

function fmt(n: number): string {
  if (isNaN(n) || !isFinite(n)) return "₹0";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function fmtShort(n: number): string {
  if (isNaN(n) || !isFinite(n)) return "₹0";
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " Lakh";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function RangeField({ label, id, min, max, step, value, onChange, minLabel, maxLabel, unit = "" }: {
  label: string; id: string; min: number; max: number; step: number; value: number;
  onChange: (v: number) => void; minLabel: string; maxLabel: string; unit?: string;
}) {
  const pct = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
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

  const safeAmt = Math.max(0, amt);
  const safeYears = Math.max(1, years);
  const safeRate = Math.max(0, rate);

  // Standard SIP Annuity-Due Formula: M = P × {[(1+r)^n – 1] / r} × (1+r)
  const r = safeRate / 100 / 12; // monthly rate
  const n = safeYears * 12;      // total months

  const total = r === 0 ? safeAmt * n : safeAmt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const invested = safeAmt * n;
  const returns = Math.max(0, total - invested);

  // Absolute Return % (Gain over invested principal)
  const absReturnPct = invested > 0 ? (returns / invested) * 100 : 0;
  // Expected Annualised Return (XIRR/IRR) is the input rate
  const xirrPct = safeRate;
  // Donut = returns as % of total corpus
  const donutPct = total > 0 ? Math.min((returns / total) * 100, 100) : 0;

  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,.07)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="calc-grid">
        <div style={{ padding: 36, borderRight: "1px solid #eee" }}>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 22, color: "var(--navy)", marginBottom: 6 }}>SIP Calculator</h2>
          <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 28 }}>Estimate wealth accumulation on your monthly SIP investments</p>
          <RangeField label="Monthly Investment" id="sip-amt" min={500} max={100000} step={500} value={amt} onChange={setAmt} minLabel="₹500" maxLabel="₹1,00,000" unit="₹" />
          <RangeField label="Expected Annual Return (Rate)" id="sip-rate" min={1} max={30} step={0.5} value={rate} onChange={setRate} minLabel="1%" maxLabel="30%" unit="%" />
          <RangeField label="Investment Period" id="sip-years" min={1} max={40} step={1} value={years} onChange={setYears} minLabel="1 Yr" maxLabel="40 Yrs" unit="Yrs" />
          <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(201,168,76,0.07)", borderRadius: 10, borderLeft: "3px solid var(--gold)" }}>
            <div style={{ fontSize: 12, color: "var(--gray)", marginBottom: 4 }}>Key Financial Metrics</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Absolute Return</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{absReturnPct.toFixed(1)}%</div></div>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Expected Rate (XIRR)</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{xirrPct.toFixed(1)}%</div></div>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Total Instalments</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{n} months</div></div>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Wealth Multiplier</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{invested > 0 ? (total / invested).toFixed(2) : "1.00"}x</div></div>
            </div>
          </div>
        </div>
        <div style={{ padding: 36, background: "linear-gradient(160deg,var(--navy) 0%,#1a3560 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,.5)", marginBottom: 6 }}>Total Value at Maturity</div>
          <div style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 34, fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>{fmt(total)}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 14 }}>({fmtShort(total)})</div>
          <Donut pct={donutPct} label="Returns Share" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <ResultPill label="Total Principal Invested" val={fmt(invested)} />
            <ResultPill label="Est. Wealth Gain (Returns)" val={fmt(returns)} valStyle={{ color: "#86efac" }} />
            <ResultPill label="Returns Share in Corpus" val={donutPct.toFixed(1) + "%"} valStyle={{ color: "var(--gold)" }} />
          </div>
        </div>
      </div>
      <div style={{ background: "var(--light)", padding: "16px 36px", fontSize: 12, color: "var(--gray)", lineHeight: 1.7, borderTop: "1px solid #e5e0d8" }}>
        <strong style={{ color: "var(--navy)" }}>Formula:</strong> M = P × [(1+r)ⁿ – 1] / r × (1+r) | r = annual rate ÷ 12, n = years × 12. Standard SEBI/AMFI SIP compounding model.
      </div>
    </div>
  );
}

function LumpsumCalc() {
  const [amt, setAmt] = useState(100000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const safeAmt = Math.max(0, amt);
  const safeYears = Math.max(1, years);
  const safeRate = Math.max(0, rate);

  // Standard Lumpsum compounding formula: A = P × (1 + r)^n
  const total = safeAmt * Math.pow(1 + safeRate / 100, safeYears);
  const returns = Math.max(0, total - safeAmt);
  const gainPct = safeAmt > 0 ? (returns / safeAmt) * 100 : 0;
  const cagr = safeRate;
  const donutPct = total > 0 ? Math.min((returns / total) * 100, 100) : 0;
  const doublingYears = safeRate > 0 ? Math.log(2) / Math.log(1 + safeRate / 100) : 0;

  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,.07)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="calc-grid">
        <div style={{ padding: 36, borderRight: "1px solid #eee" }}>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 22, color: "var(--navy)", marginBottom: 6 }}>Lumpsum Calculator</h2>
          <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 28 }}>Calculate the future value of a one-time capital investment</p>
          <RangeField label="Total Investment" id="lump-amt" min={5000} max={10000000} step={5000} value={amt} onChange={setAmt} minLabel="₹5,000" maxLabel="₹1 Cr" unit="₹" />
          <RangeField label="Expected Annual Return (CAGR)" id="lump-rate" min={1} max={30} step={0.5} value={rate} onChange={setRate} minLabel="1%" maxLabel="30%" unit="%" />
          <RangeField label="Investment Period" id="lump-years" min={1} max={40} step={1} value={years} onChange={setYears} minLabel="1 Yr" maxLabel="40 Yrs" unit="Yrs" />
          <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(201,168,76,0.07)", borderRadius: 10, borderLeft: "3px solid var(--gold)" }}>
            <div style={{ fontSize: 12, color: "var(--gray)", marginBottom: 4 }}>Key Financial Metrics</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Absolute Return</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{gainPct.toFixed(1)}%</div></div>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>CAGR</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{cagr.toFixed(2)}%</div></div>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Wealth Multiplier</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{safeAmt > 0 ? (total / safeAmt).toFixed(2) : "1.00"}x</div></div>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Doubles In</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{doublingYears > 0 ? doublingYears.toFixed(1) + " yrs" : "N/A"}</div></div>
            </div>
          </div>
        </div>
        <div style={{ padding: 36, background: "linear-gradient(160deg,var(--navy) 0%,#1a3560 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,.5)", marginBottom: 6 }}>Total Value at Maturity</div>
          <div style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 34, fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>{fmt(total)}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 14 }}>({fmtShort(total)})</div>
          <Donut pct={donutPct} label="Returns Share" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <ResultPill label="Principal Invested" val={fmt(safeAmt)} />
            <ResultPill label="Est. Wealth Gain (Returns)" val={fmt(returns)} valStyle={{ color: "#86efac" }} />
            <ResultPill label="Returns Share in Corpus" val={donutPct.toFixed(1) + "%"} valStyle={{ color: "var(--gold)" }} />
          </div>
        </div>
      </div>
      <div style={{ background: "var(--light)", padding: "16px 36px", fontSize: 12, color: "var(--gray)", lineHeight: 1.7, borderTop: "1px solid #e5e0d8" }}>
        <strong style={{ color: "var(--navy)" }}>Formula:</strong> A = P × (1 + r)ⁿ | P = principal, r = annual CAGR %, n = years. Standard SEBI compounding rule.
      </div>
    </div>
  );
}

function LoanCalc() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const safePrincipal = Math.max(0, principal);
  const safeYears = Math.max(1, years);
  const safeRate = Math.max(0, rate);

  // Standard reducing-balance EMI formula
  const r = safeRate / 100 / 12; // monthly interest rate
  const n = safeYears * 12;       // total months

  let exactEmi = 0;
  if (r === 0) {
    exactEmi = n > 0 ? safePrincipal / n : 0;
  } else {
    const comp = Math.pow(1 + r, n);
    exactEmi = (safePrincipal * r * comp) / (comp - 1);
  }

  // Banking standard: EMI rounded to nearest rupee
  const emi = Math.round(exactEmi);
  const totalPay = emi * n;
  const interest = Math.max(0, totalPay - safePrincipal);
  const intPct = totalPay > 0 ? (interest / totalPay) * 100 : 0;
  const prinPct = totalPay > 0 ? (safePrincipal / totalPay) * 100 : 0;

  // Exact Month when cumulative Principal repaid reaches 50%
  let balance = safePrincipal;
  let monthHalfway = n;
  for (let m = 1; m <= n; m++) {
    const intComp = balance * r;
    const prinComp = emi - intComp;
    balance = Math.max(0, balance - prinComp);
    if (balance <= safePrincipal / 2 && monthHalfway === n) {
      monthHalfway = m;
    }
  }
  const halfwayYear = Math.ceil(monthHalfway / 12);

  return (
    <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 24px rgba(0,0,0,.07)", overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }} className="calc-grid">
        <div style={{ padding: 36, borderRight: "1px solid #eee" }}>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 22, color: "var(--navy)", marginBottom: 6 }}>Loan / EMI Calculator</h2>
          <p style={{ fontSize: 13, color: "var(--gray)", marginBottom: 28 }}>Calculate your exact monthly EMI and interest schedule for home, car, or personal loans</p>
          <RangeField label="Loan Amount" id="loan-amt" min={10000} max={10000000} step={10000} value={principal} onChange={setPrincipal} minLabel="₹10,000" maxLabel="₹1 Cr" unit="₹" />
          <RangeField label="Annual Interest Rate" id="loan-rate" min={1} max={24} step={0.1} value={rate} onChange={setRate} minLabel="1%" maxLabel="24%" unit="%" />
          <RangeField label="Loan Tenure" id="loan-years" min={1} max={30} step={1} value={years} onChange={setYears} minLabel="1 Yr" maxLabel="30 Yrs" unit="Yrs" />
          <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(255,80,80,0.05)", borderRadius: 10, borderLeft: "3px solid #f87171" }}>
            <div style={{ fontSize: 12, color: "var(--gray)", marginBottom: 4 }}>Loan Insights</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Interest Share</div><div style={{ fontSize: 15, fontWeight: 700, color: "#dc2626" }}>{intPct.toFixed(1)}%</div></div>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Principal Share</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>{prinPct.toFixed(1)}%</div></div>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>50% Principal Paid By</div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--navy)" }}>Year {halfwayYear}</div></div>
              <div><div style={{ fontSize: 11, color: "var(--gray)" }}>Effective Interest Burden</div><div style={{ fontSize: 15, fontWeight: 700, color: "#dc2626" }}>{safePrincipal > 0 ? ((interest / safePrincipal) * 100).toFixed(1) : 0}%</div></div>
            </div>
          </div>
        </div>
        <div style={{ padding: 36, background: "linear-gradient(160deg,var(--navy) 0%,#1a3560 100%)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,.5)", marginBottom: 6 }}>Monthly EMI</div>
          <div style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 34, fontWeight: 700, color: "var(--gold)", marginBottom: 4 }}>{fmt(emi)}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginBottom: 14 }}>({fmtShort(emi)} / mo)</div>
          <Donut pct={intPct} label="Interest Share" />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
            <ResultPill label="Total Loan Repayment" val={fmt(totalPay)} />
            <ResultPill label="Total Interest Payable" val={fmt(interest)} valStyle={{ color: "#ff9a9a" }} />
            <ResultPill label="Principal Loan Amount" val={fmt(safePrincipal)} />
          </div>
        </div>
      </div>
      <div style={{ background: "var(--light)", padding: "16px 36px", fontSize: 12, color: "var(--gray)", lineHeight: 1.7, borderTop: "1px solid #e5e0d8" }}>
        <strong style={{ color: "var(--navy)" }}>Formula:</strong> EMI = [P × r × (1+r)ⁿ] ÷ [(1+r)ⁿ – 1] | Reducing balance method as mandated by RBI for Indian Banks & NBFCs.
      </div>
    </div>
  );
}

import MfVsFdComparison from "@/components/MfVsFdComparison";

const TABS = [
  { id: "sip", icon: "📈", label: "SIP Calculator" },
  { id: "lumpsum", icon: "💰", label: "Lumpsum Calculator" },
  { id: "loan", icon: "🏦", label: "Loan / EMI" },
  { id: "mf-vs-fd", icon: "⚖️", label: "MF vs FD/RD" },
];

export default function CalculatorsPage() {
  const [active, setActive] = useState("sip");
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "lumpsum" || hash === "loan" || hash === "mf-vs-fd") setActive(hash);
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
      <div style={{ maxWidth: 1050, margin: "-24px auto 0", padding: "0 24px", position: "relative", zIndex: 10 }}>
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
      <div style={{ maxWidth: active === "mf-vs-fd" ? 1150 : 900, margin: "0 auto", padding: "30px 24px 60px" }}>
        {active === "sip" && <SIPCalc />}
        {active === "lumpsum" && <LumpsumCalc />}
        {active === "loan" && <LoanCalc />}
        {active === "mf-vs-fd" && <MfVsFdComparison standalonePage />}
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
