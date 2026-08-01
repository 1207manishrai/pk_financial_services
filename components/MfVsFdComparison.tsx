"use client";
import { useState } from "react";
import Link from "next/link";

function fmt(n: number): string {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

interface MfVsFdComparisonProps {
  onOpenEnquiry?: (service: string) => void;
  title?: string;
  subtitle?: string;
  standalonePage?: boolean;
}

export default function MfVsFdComparison({
  onOpenEnquiry,
  title = "Mutual Funds vs FD / RD Comparison",
  subtitle = "See how your money grows over time with market-linked Mutual Funds versus traditional Fixed & Recurring Deposits.",
  standalonePage = false,
}: MfVsFdComparisonProps) {
  const [mode, setMode] = useState<"sip" | "lumpsum">("sip");
  const [amount, setAmount] = useState<number>(mode === "sip" ? 10000 : 500000);
  const [years, setYears] = useState<number>(10);
  const [mfRate, setMfRate] = useState<number>(12);
  const [fdRate, setFdRate] = useState<number>(6.5);

  // Switch modes reset sensible amounts if needed
  const handleModeChange = (newMode: "sip" | "lumpsum") => {
    setMode(newMode);
    if (newMode === "sip" && amount > 200000) {
      setAmount(10000);
    } else if (newMode === "lumpsum" && amount < 10000) {
      setAmount(500000);
    }
  };

  // Calculations
  let invested = 0;
  let mfTotal = 0;
  let fdTotal = 0;

  if (mode === "sip") {
    // Monthly SIP vs RD
    const n = years * 12;
    invested = amount * n;

    // MF SIP (Monthly compounding)
    const rMf = mfRate / 100 / 12;
    mfTotal = amount * (((Math.pow(1 + rMf, n) - 1) / rMf) * (1 + rMf));

    // RD (Quarterly compounded standard calculation for Indian Banks)
    const rFdQuarterly = fdRate / 100 / 4;
    let rdMaturity = 0;
    for (let i = 1; i <= n; i++) {
      const monthsRemaining = n - i + 1;
      const quarters = monthsRemaining / 3;
      rdMaturity += amount * Math.pow(1 + rFdQuarterly, quarters);
    }
    fdTotal = rdMaturity;
  } else {
    // Lumpsum vs FD
    invested = amount;

    // MF Lumpsum (Annual compounding)
    mfTotal = amount * Math.pow(1 + mfRate / 100, years);

    // FD (Quarterly compounding)
    fdTotal = amount * Math.pow(1 + fdRate / 100 / 4, 4 * years);
  }

  const mfGain = mfTotal - invested;
  const fdGain = fdTotal - invested;
  const wealthGap = mfTotal - fdTotal;
  const mfGainPct = ((mfTotal - invested) / invested) * 100;
  const fdGainPct = ((fdTotal - invested) / invested) * 100;

  // Max value for progress bar scaling
  const maxVal = Math.max(mfTotal, fdTotal, 1);
  const mfBarPct = Math.min(Number(((mfTotal / maxVal) * 100).toFixed(2)), 100);
  const fdBarPct = Math.min(Number(((fdTotal / maxVal) * 100).toFixed(2)), 100);
  const invBarPct = Math.min(Number(((invested / maxVal) * 100).toFixed(2)), 100);

  return (
    <section
      id="mf-vs-fd"
      style={{
        background: standalonePage ? "transparent" : "#f7f4ef",
        padding: standalonePage ? "20px 0" : "80px 24px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        {/* Section Header */}
        {!standalonePage && (
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "var(--gold)",
                marginBottom: 10,
              }}
            >
              Smart Wealth Comparison
            </div>
            <h2
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: "clamp(26px,3.5vw,40px)",
                fontWeight: 700,
                color: "var(--navy)",
                lineHeight: 1.2,
              }}
            >
              Mutual Funds <span style={{ color: "var(--gold)" }}>vs</span> FD / RD Returns
            </h2>
            <p
              style={{
                color: "var(--gray)",
                marginTop: 12,
                maxWidth: 680,
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              {subtitle}
            </p>
          </div>
        )}

        {/* Main Comparison Container Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 20,
            boxShadow: "0 10px 40px rgba(10,22,40,0.08)",
            border: "1px solid rgba(10,22,40,0.06)",
            overflow: "hidden",
            marginBottom: 40,
          }}
        >
          {/* Top Control Header: Mode Switcher & Presets */}
          <div
            style={{
              background: "var(--navy)",
              padding: "24px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div>
              <h3
                style={{
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 700,
                  margin: 0,
                  fontFamily: "var(--font-playfair, serif)",
                }}
              >
                Investment Mode
              </h3>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "4px 0 0" }}>
                Select SIP / RD for recurring deposits or Lumpsum / FD for one-time capital
              </p>
            </div>

            {/* Toggle Pills */}
            <div
              style={{
                display: "inline-flex",
                background: "rgba(255,255,255,0.1)",
                padding: 4,
                borderRadius: 30,
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <button
                onClick={() => handleModeChange("sip")}
                style={{
                  padding: "10px 22px",
                  borderRadius: 25,
                  border: "none",
                  background: mode === "sip" ? "var(--gold)" : "transparent",
                  color: mode === "sip" ? "var(--navy)" : "#ffffff",
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  fontFamily: "inherit",
                }}
              >
                🔄 Monthly SIP vs RD
              </button>
              <button
                onClick={() => handleModeChange("lumpsum")}
                style={{
                  padding: "10px 22px",
                  borderRadius: 25,
                  border: "none",
                  background: mode === "lumpsum" ? "var(--gold)" : "transparent",
                  color: mode === "lumpsum" ? "var(--navy)" : "#ffffff",
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  fontFamily: "inherit",
                }}
              >
                💰 One-Time Lumpsum vs FD
              </button>
            </div>
          </div>

          {/* Interactive Calculator Body Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 1fr",
            }}
            className="mf-fd-grid"
          >
            {/* Left Controls Panel */}
            <div
              style={{
                padding: "36px 32px",
                borderRight: "1px solid #f0ece4",
                background: "#faf8f5",
              }}
            >
              {/* Amount Slider */}
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--navy)",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    {mode === "sip" ? "Monthly Investment Amount" : "One-Time Lumpsum Amount"}
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 16 }}>₹</span>
                    <input
                      type="number"
                      value={amount || ""}
                      min={mode === "sip" ? 500 : 5000}
                      max={mode === "sip" ? 200000 : 10000000}
                      step={mode === "sip" ? 500 : 5000}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      style={{
                        width: 130,
                        padding: "6px 12px",
                        border: "1.5px solid var(--gold)",
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--navy)",
                        background: "#ffffff",
                        textAlign: "right",
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={mode === "sip" ? 500 : 5000}
                  max={mode === "sip" ? 200000 : 10000000}
                  step={mode === "sip" ? 500 : 5000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  style={{
                    "--range-val": `${
                      ((amount - (mode === "sip" ? 500 : 5000)) /
                        ((mode === "sip" ? 200000 : 10000000) - (mode === "sip" ? 500 : 5000))) *
                      100
                    }%`,
                  } as React.CSSProperties}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "var(--gray)",
                    marginTop: 6,
                  }}
                >
                  <span>{mode === "sip" ? "₹500/mo" : "₹5,000"}</span>
                  <span>{mode === "sip" ? "₹2,00,000/mo" : "₹1 Cr"}</span>
                </div>
              </div>

              {/* Time Horizon Slider */}
              <div style={{ marginBottom: 28 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <label
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--navy)",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                    }}
                  >
                    Investment Horizon (Tenure)
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <input
                      type="number"
                      value={years || ""}
                      min={1}
                      max={35}
                      step={1}
                      onChange={(e) => setYears(Number(e.target.value))}
                      style={{
                        width: 70,
                        padding: "6px 10px",
                        border: "1.5px solid var(--gold)",
                        borderRadius: 8,
                        fontSize: 15,
                        fontWeight: 700,
                        color: "var(--navy)",
                        background: "#ffffff",
                        textAlign: "right",
                        fontFamily: "inherit",
                        outline: "none",
                      }}
                    />
                    <span style={{ color: "var(--navy)", fontWeight: 700, fontSize: 13 }}>Yrs</span>
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={35}
                  step={1}
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  style={{
                    "--range-val": `${((years - 1) / (35 - 1)) * 100}%`,
                  } as React.CSSProperties}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "var(--gray)",
                    marginTop: 6,
                  }}
                >
                  <span>1 Year</span>
                  <span>35 Years</span>
                </div>
              </div>

              {/* Return Rates Controls Grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  background: "#ffffff",
                  padding: 16,
                  borderRadius: 12,
                  border: "1px solid #e5e0d8",
                }}
              >
                {/* MF Rate */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#166534", marginBottom: 4 }}>
                    📈 MF Expected Return
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <input
                      type="number"
                      value={mfRate}
                      min={6}
                      max={24}
                      step={0.5}
                      onChange={(e) => setMfRate(Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "6px 8px",
                        border: "1px solid #bbf7d0",
                        background: "#f0fdf4",
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#14532d",
                        fontFamily: "inherit",
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>%</span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--gray)", marginTop: 4 }}>
                    Hist. Avg: 12% - 15%
                  </div>
                </div>

                {/* FD/RD Rate */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#1e3a8a", marginBottom: 4 }}>
                    🏦 FD/RD Interest Rate
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <input
                      type="number"
                      value={fdRate}
                      min={3}
                      max={10}
                      step={0.25}
                      onChange={(e) => setFdRate(Number(e.target.value))}
                      style={{
                        width: "100%",
                        padding: "6px 8px",
                        border: "1px solid #bfdbfe",
                        background: "#eff6ff",
                        borderRadius: 6,
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#1e40af",
                        fontFamily: "inherit",
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1e3a8a" }}>%</span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--gray)", marginTop: 4 }}>
                    Bank Avg: 6% - 7.5%
                  </div>
                </div>
              </div>

              {/* Quick Summary Pill */}
              <div
                style={{
                  marginTop: 20,
                  padding: "12px 16px",
                  borderRadius: 10,
                  background: "rgba(201,168,76,0.12)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--navy)" }}>
                  Total Principal Invested:
                </span>
                <span style={{ fontSize: 16, fontWeight: 800, color: "var(--navy)" }}>
                  {fmt(invested)}
                </span>
              </div>
            </div>

            {/* Right Output Results Panel */}
            <div
              style={{
                padding: "36px 32px",
                background: "linear-gradient(160deg, var(--navy) 0%, #112240 100%)",
                color: "#ffffff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Highlight Wealth Gap Banner */}
              <div
                style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.05) 100%)",
                  border: "1px solid var(--gold)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  textAlign: "center",
                  marginBottom: 24,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    color: "var(--gold2)",
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  🚀 Additional Wealth Created by Mutual Funds
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-playfair, serif)",
                    fontSize: "clamp(24px,2.8vw,34px)",
                    fontWeight: 800,
                    color: "#ffffff",
                  }}
                >
                  +{fmt(wealthGap)}
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
                  You earn <strong style={{ color: "var(--gold)" }}>{((wealthGap / fdTotal) * 100).toFixed(0)}% more wealth</strong> over {mode === "sip" ? "RD" : "FD"} in {years} years!
                </div>
              </div>

              {/* Visual Bars Comparison */}
              <div style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Mutual Fund Bar */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontWeight: 700, color: "#86efac", display: "flex", alignItems: "center", gap: 6 }}>
                      <span>📈</span> Mutual Funds (@{mfRate}%)
                    </span>
                    <span style={{ fontWeight: 800, fontSize: 16, color: "var(--gold)" }}>
                      {fmt(mfTotal)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 14,
                      width: "100%",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 7,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${mfBarPct}%`,
                        background: "linear-gradient(90deg, #22c55e, #10b981)",
                        borderRadius: 7,
                        transition: "width 0.5s ease-out",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                    <span>Est. Profit: {fmt(mfGain)}</span>
                    <span>+{mfGainPct.toFixed(0)}% Total Gain</span>
                  </div>
                </div>

                {/* FD / RD Bar */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 13,
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontWeight: 700, color: "#93c5fd", display: "flex", alignItems: "center", gap: 6 }}>
                      <span>🏦</span> {mode === "sip" ? "Recurring Deposit (RD)" : "Fixed Deposit (FD)"} (@{fdRate}%)
                    </span>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#ffffff" }}>
                      {fmt(fdTotal)}
                    </span>
                  </div>
                  <div
                    style={{
                      height: 14,
                      width: "100%",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 7,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${fdBarPct}%`,
                        background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                        borderRadius: 7,
                        transition: "width 0.5s ease-out",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                    <span>Est. Profit: {fmt(fdGain)}</span>
                    <span>+{fdGainPct.toFixed(0)}% Total Gain</span>
                  </div>
                </div>

                {/* Total Invested Reference Bar */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize: 12,
                      marginBottom: 4,
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    <span>💼 Capital Invested</span>
                    <span style={{ fontWeight: 600 }}>{fmt(invested)}</span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      width: "100%",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${invBarPct}%`,
                        background: "rgba(255,255,255,0.4)",
                        borderRadius: 4,
                        transition: "width 0.5s ease-out",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Call to Action Button */}
              <div>
                {onOpenEnquiry ? (
                  <button
                    onClick={() => onOpenEnquiry("Mutual Fund SIP")}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, var(--gold), #d97706)",
                      color: "var(--navy)",
                      padding: "14px 20px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 800,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      boxShadow: "0 6px 20px rgba(201,168,76,0.3)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(201,168,76,0.45)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(201,168,76,0.3)";
                    }}
                  >
                    <span>🎯</span> Start Building Wealth with Mutual Funds →
                  </button>
                ) : (
                  <Link
                    href="/#contact"
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, var(--gold), #d97706)",
                      color: "var(--navy)",
                      padding: "14px 20px",
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 800,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      boxShadow: "0 6px 20px rgba(201,168,76,0.3)",
                      boxSizing: "border-box",
                    }}
                  >
                    <span>🎯</span> Consult Advisor for SIP Plan →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Comparison Matrix Table */}
        <div style={{ marginTop: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <h3
              style={{
                fontFamily: "var(--font-playfair, serif)",
                fontSize: "clamp(20px,2.5vw,28px)",
                color: "var(--navy)",
                fontWeight: 700,
              }}
            >
              Key Differences: Mutual Funds vs Fixed Deposits (FD/RD)
            </h3>
            <p style={{ color: "var(--gray)", fontSize: 14, marginTop: 6 }}>
              Compare taxation, inflation impact, liquidity, and long-term compounding benefits.
            </p>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              overflow: "hidden",
              border: "1px solid #e5e0d8",
            }}
          >
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  fontSize: 14,
                }}
              >
                <thead>
                  <tr style={{ background: "var(--navy)", color: "#ffffff" }}>
                    <th style={{ padding: "16px 20px", fontWeight: 700, width: "25%" }}>Feature / Aspect</th>
                    <th style={{ padding: "16px 20px", fontWeight: 700, width: "37.5%", background: "rgba(201,168,76,0.15)", color: "var(--gold)" }}>
                      📈 Equity / Hybrid Mutual Funds
                    </th>
                    <th style={{ padding: "16px 20px", fontWeight: 700, width: "37.5%" }}>
                      🏦 Bank FD / Recurring Deposit (RD)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      feature: "Expected Returns",
                      mf: "12% – 15%+ p.a. (Historical equity compounding over long-term horizon)",
                      fd: "6.0% – 7.5% p.a. (Fixed interest rate pre-determined at account opening)",
                      highlight: true,
                    },
                    {
                      feature: "Inflation Protection",
                      mf: "High. Beating annual inflation (approx 6%), resulting in 6% - 9% real wealth growth.",
                      fd: "Low to Negative. Returns barely equal or fail to match inflation after tax deductions.",
                      highlight: false,
                    },
                    {
                      feature: "Tax Treatment",
                      mf: "Tax-efficient! Equity LTCG taxed at 12.5% ONLY on gains above ₹1.25 Lakh/yr. STCG at 20%. Taxed ONLY when redeemed.",
                      fd: "Taxed every year! Interest added to your income slab (taxed up to 30%+) plus 10% TDS applicable.",
                      highlight: true,
                    },
                    {
                      feature: "Liquidity & Exit",
                      mf: "High Liquidity. Withdraw money anytime (T+1 to T+2 days) with no premature penalty for open-ended funds.",
                      fd: "Restricted Liquidity. Premature withdrawal incurs 0.5% – 1.0% interest penalty.",
                      highlight: false,
                    },
                    {
                      feature: "Investment Flexibility",
                      mf: "Flexible SIP. Pause, increase (Step-up SIP), or stop SIP anytime without fine.",
                      fd: "Fixed Commitment. RD requires fixed monthly payments; defaulting breaks tenure.",
                      highlight: true,
                    },
                    {
                      feature: "Compounding Power",
                      mf: "Power of rupee cost averaging & reinvested market equity growth.",
                      fd: "Simple or quarterly compounding on guaranteed fixed interest rates.",
                      highlight: false,
                    },
                  ].map((row, idx) => (
                    <tr
                      key={row.feature}
                      style={{
                        background: idx % 2 === 0 ? "#ffffff" : "#fbf9f5",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      <td
                        style={{
                          padding: "16px 20px",
                          fontWeight: 700,
                          color: "var(--navy)",
                          fontSize: 13.5,
                        }}
                      >
                        {row.feature}
                      </td>
                      <td
                        style={{
                          padding: "16px 20px",
                          color: "#14532d",
                          fontWeight: 600,
                          background: row.highlight ? "rgba(240,253,244,0.6)" : "transparent",
                          lineHeight: 1.5,
                        }}
                      >
                        {row.mf}
                      </td>
                      <td
                        style={{
                          padding: "16px 20px",
                          color: "#475569",
                          lineHeight: 1.5,
                        }}
                      >
                        {row.fd}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .mf-fd-grid {
            grid-template-columns: 1fr !important;
          }
          .mf-fd-grid > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid #f0ece4 !important;
          }
        }
      `}</style>
    </section>
  );
}
