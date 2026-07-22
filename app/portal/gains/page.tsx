"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CapitalGains() {
  const router = useRouter();
  const [gains, setGains] = useState<any>(null);
  const [fy, setFy] = useState("2025-26");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/gains?fy=${fy}`).then(r => r.json()).then(d => {
      if (d.error) { router.push("/portal/login"); return; }
      setGains(d.gains);
      setLoading(false);
    });
  }, [fy, router]);

  const fyOptions = ["2025-26", "2024-25", "2023-24", "2022-23"];

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`:root{--navy:#0a1628;--gold:#c9a84c;--cream:#f7f4ef;--light:#f0ece4;--gray:#6b7280;} *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <div style={{ background: "var(--navy)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, textDecoration: "none" }}>PK Financial Services</Link>
        <Link href="/portal/dashboard" style={{ color: "var(--gold)", textDecoration: "none", fontSize: 13 }}>← Dashboard</Link>
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: "var(--navy)", marginBottom: 4 }}>Capital Gains Report</h1>
            <p style={{ color: "var(--gray)", fontSize: 13 }}>For Income Tax Filing (ITR)</p>
          </div>
          <select value={fy} onChange={e => setFy(e.target.value)} style={{ padding: "9px 16px", borderRadius: 8, border: "1.5px solid #ddd", fontSize: 14, fontFamily: "inherit", cursor: "pointer" }}>
            {fyOptions.map(f => <option key={f}>FY {f}</option>)}
          </select>
        </div>
        {loading ? <p style={{ color: "var(--gray)" }}>Loading capital gains...</p> : gains && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              {/* LTCG */}
              <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--navy)", marginBottom: 16 }}>Long Term Capital Gains (LTCG)</h3>
                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    { label: "Taxable Gains (above ₹1 lakh)", val: `₹${gains.ltcg?.taxableGains?.toLocaleString()}`, color: "#dc2626" },
                    { label: "Exempt Gains (up to ₹1 lakh)", val: `₹${gains.ltcg?.exemptGains?.toLocaleString()}`, color: "#16a34a" },
                    { label: "Tax Payable @ 10%", val: `₹${gains.ltcg?.tax?.toLocaleString()}`, color: "#dc2626" },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--cream)", borderRadius: 8 }}>
                      <span style={{ fontSize: 13, color: "var(--gray)" }}>{item.label}</span>
                      <strong style={{ color: item.color }}>{item.val}</strong>
                    </div>
                  ))}
                </div>
              </div>
              {/* STCG */}
              <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--navy)", marginBottom: 16 }}>Short Term Capital Gains (STCG)</h3>
                <div style={{ display: "grid", gap: 10 }}>
                  {[
                    { label: "Total STCG", val: `₹${gains.stcg?.gains?.toLocaleString()}`, color: "#dc2626" },
                    { label: "Tax Payable @ 20%", val: `₹${gains.stcg?.tax?.toLocaleString()}`, color: "#dc2626" },
                  ].map(item => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", background: "var(--cream)", borderRadius: 8 }}>
                      <span style={{ fontSize: 13, color: "var(--gray)" }}>{item.label}</span>
                      <strong style={{ color: item.color }}>{item.val}</strong>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, padding: "12px 14px", background: "#fff7ed", borderRadius: 8, fontSize: 12, color: "#92400e" }}>
                  💡 STCG applies to equity funds held less than 1 year
                </div>
              </div>
            </div>
            {/* Total Summary */}
            <div style={{ background: "var(--navy)", borderRadius: 14, padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { label: "Total Capital Gains", val: `₹${gains.totalGains?.toLocaleString()}` },
                { label: "Total Tax Liability", val: `₹${gains.totalTax?.toLocaleString()}` },
              ].map(item => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 28, fontWeight: 700, color: "var(--gold)" }}>{item.val}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: "14px", background: "#fffbeb", borderRadius: 10, fontSize: 13, color: "#92400e", lineHeight: 1.6 }}>
              ⚠️ This is an estimated tax report based on your CAMS & KFintech data. Please consult a Chartered Accountant before filing your ITR.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
