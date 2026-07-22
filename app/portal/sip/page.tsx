"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SIPTracker() {
  const router = useRouter();
  const [sips, setSips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sips").then(r => r.json()).then(d => {
      if (d.error) { router.push("/portal/login"); return; }
      setSips(d.sips || []);
      setLoading(false);
    });
  }, [router]);

  const totalSIP = sips.reduce((s, i) => s + (i.amount || 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`:root{--navy:#0a1628;--gold:#c9a84c;--cream:#f7f4ef;--light:#f0ece4;--gray:#6b7280;} *{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <div style={{ background: "var(--navy)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700, textDecoration: "none" }}>PK Financial Services</Link>
        <Link href="/portal/dashboard" style={{ color: "var(--gold)", textDecoration: "none", fontSize: 13 }}>← Dashboard</Link>
      </div>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: "var(--navy)", marginBottom: 8 }}>SIP Tracker</h1>
        <p style={{ color: "var(--gray)", marginBottom: 24, fontSize: 13 }}>Total Monthly SIP: <strong style={{ color: "var(--navy)", fontSize: 16 }}>₹{totalSIP.toLocaleString()}/month</strong></p>
        {loading ? <p>Loading...</p> : (
          <div style={{ display: "grid", gap: 16 }}>
            {sips.map((s, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: "var(--navy)", marginBottom: 4 }}>{s.scheme}</h3>
                    <p style={{ fontSize: 13, color: "var(--gray)" }}>{s.amc} · Folio: {s.folio}</p>
                  </div>
                  <span style={{ background: s.status === "Active" ? "#dcfce7" : "#fee2e2", color: s.status === "Active" ? "#16a34a" : "#dc2626", padding: "4px 14px", borderRadius: 20, fontWeight: 700, fontSize: 13 }}>{s.status}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 20 }}>
                  {[
                    { label: "Monthly Amount", val: `₹${s.amount?.toLocaleString()}` },
                    { label: "SIP Date", val: `${s.date}${s.date === 1 ? "st" : "th"} of every month` },
                    { label: "Instalments Done", val: s.instalmentsDone },
                    { label: "Next SIP Date", val: s.nextDate },
                  ].map(item => (
                    <div key={item.label} style={{ background: "var(--cream)", borderRadius: 8, padding: "12px 16px" }}>
                      <div style={{ fontSize: 11, color: "var(--gray)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: 15 }}>{item.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, background: "var(--cream)", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "var(--gray)" }}>
                  💡 Total invested so far: <strong style={{ color: "var(--navy)" }}>₹{(s.amount * s.instalmentsDone).toLocaleString()}</strong>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
