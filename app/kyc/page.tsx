"use client";

import { useState } from "react";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";
import Footer from "@/components/Footer";

interface KYCResult {
  success: boolean;
  pan: string;
  kraName: string;
  kycDate: string;
  kycStatus: string;
  kycStatusDate: string;
  kycRemarks: string;
  kycMode: string;
  modificationStatus: string;
  modificationStatusDate: string;
  modificationRemarks: string;
}

export default function KYCPage() {
  const [pan, setPan] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<KYCResult | null>(null);

  const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().slice(0, 10);
    setPan(value);
    setError("");
  };

  const validatePAN = (val: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(val);
  };

  const handleCheckKYC = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pan) {
      setError("Please enter your PAN number.");
      return;
    }
    if (!validatePAN(pan)) {
      setError("Please enter a valid 10-character PAN (e.g., ABCDE1234F).");
      return;
    }

    setLoading(true);
    setResult(null);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Smooth loading transition
      const res = await fetch(`/api/kyc?pan=${pan}`);
      const data = await res.json();
      if (data.success) {
        setResult(data);
      } else {
        setError(data.error || "Failed to fetch KYC details.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPan("");
    setResult(null);
    setError("");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Hide navbar elements during standard printing of results */}
      <div className="no-print">
        <MarketTicker />
        <Header />
        <TopBar />
      </div>

      {/* Hero Banner (hidden on print) */}
      <div className="no-print" style={{ background: "linear-gradient(135deg,var(--navy),#1a3560)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(28px,4.5vw,42px)", fontWeight: 700, color: "#fff", marginBottom: 12 }}>
          KYC Status Verification
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 15, maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          Enter your PAN below to check your live compliance status retrieved securely from the registry.
        </p>
      </div>

      {/* Main Content Area */}
      <main style={{ background: "var(--cream)", padding: "40px 24px", minHeight: "55vh" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          
          {/* Query Form Card (hidden on print) */}
          {!result && !loading && (
            <div className="no-print" style={{
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 10px 30px rgba(10,22,40,0.06)",
              border: "1px solid #e5e0d8",
              padding: "36px 30px",
              maxWidth: 640,
              margin: "0 auto"
            }}>
              <form onSubmit={handleCheckKYC}>
                <label style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--navy)", marginBottom: 8 }}>
                  Enter PAN (Permanent Account Number)
                </label>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <input
                    type="text"
                    value={pan}
                    onChange={handlePanChange}
                    placeholder="E.G. ABCDE1234F"
                    style={{
                      flex: "1 1 280px",
                      padding: "12px 16px",
                      borderRadius: 8,
                      border: error ? "1.5px solid #ef4444" : "1px solid #cbd5e1",
                      fontSize: 16,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      outline: "none",
                      transition: "border-color 0.2s"
                    }}
                    className="pan-input"
                  />
                  <button
                    type="submit"
                    style={{
                      background: "linear-gradient(135deg, var(--gold), #d97706)",
                      color: "var(--navy)",
                      padding: "12px 28px",
                      borderRadius: 8,
                      fontSize: 15,
                      fontWeight: 700,
                      border: "none",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      minWidth: 160,
                      transition: "transform 0.1s, box-shadow 0.2s",
                      fontFamily: "inherit"
                    }}
                    className="submit-btn"
                  >
                    Check Status
                  </button>
                </div>
                
                {error && (
                  <div style={{ color: "#ef4444", fontSize: 13.5, fontWeight: 500, marginTop: 10, display: "flex", alignItems: "center", gap: 6 }}>
                    <span>⚠️</span> {error}
                  </div>
                )}
              </form>

              {/* Info Tips under Form */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                marginTop: 30
              }} className="info-grid">
                <div style={{ background: "rgba(10,22,40,0.02)", padding: 18, borderRadius: 10, border: "1px dashed #cbd5e1" }}>
                  <span style={{ fontSize: 20 }}>🛡️</span>
                  <h4 style={{ color: "var(--navy)", fontWeight: 700, margin: "6px 0 4px", fontSize: 13.5 }}>Encrypted Gateway</h4>
                  <p style={{ fontSize: 11.5, color: "var(--gray)", lineHeight: 1.5, margin: 0 }}>PAN queries are handled via secure distributor channels and are not cached or stored.</p>
                </div>
                <div style={{ background: "rgba(10,22,40,0.02)", padding: 18, borderRadius: 10, border: "1px dashed #cbd5e1" }}>
                  <span style={{ fontSize: 20 }}>📋</span>
                  <h4 style={{ color: "var(--navy)", fontWeight: 700, margin: "6px 0 4px", fontSize: 13.5 }}>Check Captcha Free</h4>
                  <p style={{ fontSize: 11.5, color: "var(--gray)", lineHeight: 1.5, margin: 0 }}>Retrieve verified statuses instantly without typing manual visual verification codes.</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div style={{
              background: "#ffffff",
              borderRadius: 16,
              border: "1px solid #e5e0d8",
              padding: "60px 40px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
              maxWidth: 640,
              margin: "0 auto"
            }}>
              <div className="spinner-large" />
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--navy)" }}>
                Fetching live compliance records from KRA databases...
              </div>
            </div>
          )}

          {/* KARVY KRA RESULTS PORTAL VIEW */}
          {result && (
            <div style={{
              background: "#ffffff",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              boxShadow: "0 1px 15px rgba(0,0,0,0.05)",
              padding: "16px",
              fontFamily: "Arial, sans-serif"
            }} className="print-container">
              
              {/* KRISP KYC Header Bar */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid #0f3a61",
                paddingBottom: "10px",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: 12
              }}>
                {/* Logo Section */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ border: "2px solid #0f3a61", padding: "4px 8px", background: "#f8fafc", marginRight: 8 }}>
                    <span style={{ fontSize: 22, fontWeight: 900, color: "#0f3a61", letterSpacing: "1px" }}>KRISP</span>
                  </div>
                  <div style={{ background: "#0f3a61", color: "#ffffff", padding: "6px 10px", fontSize: 11, fontWeight: "bold", textTransform: "uppercase" }}>
                    KYC Services
                  </div>
                </div>

                {/* Right Side Info & Actions Wrapper */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  
                  {/* PAN Badge */}
                  <div style={{
                    background: "#e0f2fe",
                    borderRadius: "20px",
                    padding: "6px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    border: "1px solid #bae6fd"
                  }}>
                    <span style={{ fontSize: 11, color: "#0369a1", fontWeight: "bold" }}>💳 PAN —</span>
                    <span style={{ fontSize: 13, color: "#0369a1", fontWeight: "800", letterSpacing: "0.5px" }}>{result.pan}</span>
                  </div>

                  {/* Action Icons (Hidden on print) */}
                  <div className="no-print" style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button 
                      onClick={handlePrint}
                      title="Download PDF" 
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: "bold"
                      }}
                    >
                      📄
                    </button>
                    <button 
                      onClick={handlePrint}
                      title="Print page" 
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#eab308",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: "bold"
                      }}
                    >
                      🖨️
                    </button>
                    <button 
                      onClick={handleReset}
                      title="Close results" 
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: "#dc2626",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: "bold"
                      }}
                    >
                      ✕
                    </button>
                  </div>

                </div>
              </div>

              {/* Table Data */}
              <div style={{ marginBottom: "20px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
                  <tbody>
                    
                    {/* Row 1: PAN */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b", width: "35%" }}>PAN</td>
                      <td style={{ padding: "10px 0", color: "#475569", width: "5%" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.pan}</td>
                    </tr>

                    {/* Row 2: KRA Name */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b" }}>KRA Name</td>
                      <td style={{ padding: "10px 0", color: "#475569" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.kraName}</td>
                    </tr>

                    {/* Row 3: KYC Date */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b" }}>KYC Date</td>
                      <td style={{ padding: "10px 0", color: "#475569" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.kycDate}</td>
                    </tr>

                    {/* Row 4: KYC Status */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b" }}>KYC Status</td>
                      <td style={{ padding: "10px 0", color: "#475569" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.kycStatus}</td>
                    </tr>

                    {/* Row 5: KYC Status Date */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b" }}>KYC Status Date</td>
                      <td style={{ padding: "10px 0", color: "#475569" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.kycStatusDate}</td>
                    </tr>

                    {/* Row 6: KYC Remarks */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b" }}>KYC Remarks</td>
                      <td style={{ padding: "10px 0", color: "#475569" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.kycRemarks || "-"}</td>
                    </tr>

                    {/* Row 7: KYC Mode */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b" }}>KYC Mode</td>
                      <td style={{ padding: "10px 0", color: "#475569" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.kycMode}</td>
                    </tr>

                    {/* Row 8: Modification Status */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b" }}>Modification Status</td>
                      <td style={{ padding: "10px 0", color: "#475569" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.modificationStatus}</td>
                    </tr>

                    {/* Row 9: Modification Status Date */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b" }}>Modification Status Date</td>
                      <td style={{ padding: "10px 0", color: "#475569" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.modificationStatusDate}</td>
                    </tr>

                    {/* Row 10: Modification Remarks */}
                    <tr style={{ borderBottom: "1px dashed #d1d5db" }}>
                      <td style={{ padding: "10px 0", fontWeight: "bold", color: "#1e293b" }}>Modification Remarks</td>
                      <td style={{ padding: "10px 0", color: "#475569" }}>:</td>
                      <td style={{ padding: "10px 0", color: "#0f3a61", fontWeight: "bold" }}>{result.modificationRemarks || "-"}</td>
                    </tr>

                  </tbody>
                </table>
              </div>

              {/* Disclaimer Box */}
              <div style={{
                background: "#fef2f2",
                borderLeft: "4px solid #ef4444",
                padding: "12px 16px",
                borderRadius: "2px"
              }}>
                <span style={{ fontSize: "11px", fontWeight: "bold", color: "#b91c1c", display: "flex", alignItems: "center", gap: 4 }}>
                  ⚠️ Disclaimer
                </span>
                <p style={{ fontSize: "11px", color: "#475569", lineHeight: "1.5", margin: "4px 0 0" }}>
                  This KYC status shall not be used or relied upon for any purpose other than those specified in the KARVY KRA guidelines. KARVY KRA shall not be liable to any person using this information.
                </p>
              </div>

              {/* Back to Check Form Action (Hidden on print) */}
              <div className="no-print" style={{ marginTop: 24, textAlign: "center" }}>
                <button
                  onClick={handleReset}
                  style={{
                    background: "var(--navy)",
                    color: "#fff",
                    border: "none",
                    padding: "10px 22px",
                    borderRadius: 6,
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: "inherit"
                  }}
                  className="reset-btn"
                >
                  Verify Another PAN
                </button>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />

      {/* Styled utilities for the page */}
      <style dangerouslySetInnerHTML={{ __html: `
        .pan-input:focus {
          border-color: var(--gold) !important;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.15);
        }
        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(217,119,6,0.3);
        }
        .reset-btn:hover {
          background: var(--navy2);
        }
        .spinner-large {
          width: 48px;
          height: 48px;
          border: 4px solid rgba(201,168,76,0.15);
          border-top-color: var(--gold);
          border-radius: 50%;
          display: inline-block;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media(max-width: 600px) {
          .info-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: #fff !important;
            color: #000 !important;
          }
          main {
            background: #fff !important;
            padding: 0 !important;
          }
          .print-container {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
        }
      `}} />
    </>
  );
}
