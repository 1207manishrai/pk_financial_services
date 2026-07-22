"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function fmt(n: number) {
  if (n >= 10000000) return "₹" + (n / 10000000).toFixed(2) + " Cr";
  if (n >= 100000) return "₹" + (n / 100000).toFixed(2) + " L";
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export default function Dashboard() {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [sips, setSips] = useState<any[]>([]);
  const [txns, setTxns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [investorName, setInvestorName] = useState("Investor");

  useEffect(() => {
    async function load() {
      const [p, s, t] = await Promise.all([
        fetch("/api/portfolio").then(r => r.json()),
        fetch("/api/sips").then(r => r.json()),
        fetch("/api/transactions").then(r => r.json()),
      ]);
      if (p.error) { router.push("/portal/login"); return; }
      if (p.investorName) setInvestorName(p.investorName);
      setPortfolio(p);
      setSips(s.sips || []);
      setTxns((t.transactions || []).slice(0, 5));
      setLoading(false);
    }
    load();
  }, [router]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/portal/login");
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--cream)", fontFamily: "'DM Sans',sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 48, height: 48, border: "4px solid var(--gold)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 16px" }} />
        <p style={{ color: "var(--gray)" }}>Fetching your portfolio from CAMS & KFintech...</p>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} :root{--navy:#0a1628;--gold:#c9a84c;--cream:#f7f4ef;--gray:#6b7280;--light:#f0ece4;}`}</style>
    </div>
  );

  const summary = portfolio?.summary || {};
  const gainPositive = (summary.totalGain || 0) >= 0;

  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", fontFamily: "'DM Sans',sans-serif" }}>
      <Styles />
      {/* Top Nav */}
      <div style={{ background: "var(--navy)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none"><path d="M4 22L10 14L14 18L18 10L24 22H4Z" fill="#c9a84c"/><circle cx="20" cy="7" r="3" fill="#e8c975"/></svg>
          <span style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700 }}>PK Financial Services</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}>👤 {investorName}</span>
          <button onClick={logout} style={{ background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", padding: "6px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Logout</button>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div style={{ display: "flex", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }} className="portal-layout">
        {/* Sidebar */}
        <aside style={{ width: 220, flexShrink: 0, paddingTop: 24 }} className="portal-sidebar">
          {[
            { href: "/portal/dashboard", icon: "🏠", label: "Dashboard", active: true },
            { href: "/portal/portfolio", icon: "📊", label: "Portfolio" },
            { href: "/portal/transactions", icon: "📋", label: "Transactions" },
            { href: "/portal/sip", icon: "📅", label: "SIP Tracker" },
            { href: "/portal/gains", icon: "💰", label: "Capital Gains" },
          ].map(item => (
            <Link key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 8, textDecoration: "none", marginBottom: 4, background: item.active ? "var(--navy)" : "transparent", color: item.active ? "#fff" : "var(--navy)", fontWeight: item.active ? 600 : 400, fontSize: 14 }}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
          <div style={{ marginTop: 24, padding: "14px", background: "#fff", borderRadius: 10, fontSize: 12, color: "var(--gray)", lineHeight: 1.6 }}>
            📞 Need help?<br/>
            <a href="tel:+918318442129" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: 600 }}>8318442129</a>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, paddingTop: 24, paddingLeft: 28 }} className="portal-main">
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: "var(--navy)", marginBottom: 6 }}>Portfolio Dashboard</h1>
          <p style={{ color: "var(--gray)", fontSize: 13, marginBottom: 24 }}>Data fetched live from CAMS & KFintech · Last updated: {new Date().toLocaleString("en-IN")}</p>

          {/* Summary Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }} className="summary-grid">
            {[
              { label: "Total Portfolio Value", value: fmt(summary.totalValue || 0), color: "var(--navy)", icon: "💼" },
              { label: "Total Invested", value: fmt(summary.totalInvested || 0), color: "#1a56db", icon: "💸" },
              { label: "Total Gain / Loss", value: fmt(Math.abs(summary.totalGain || 0)), color: gainPositive ? "#16a34a" : "#dc2626", icon: gainPositive ? "📈" : "📉" },
              { label: "Return %", value: (summary.gainPct || 0) + "%", color: gainPositive ? "#16a34a" : "#dc2626", icon: "🎯" },
            ].map(c => (
              <div key={c.label} style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                <div style={{ fontSize: 11, color: "var(--gray)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>{c.label}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, color: c.color }}>{c.value}</div>
              </div>
            ))}
          </div>

          {/* Holdings Table */}
          <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.05)", marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--navy)" }}>Holdings</h3>
              <Link href="/portal/portfolio" style={{ color: "var(--gold)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>View All →</Link>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "var(--cream)" }}>
                    {["Scheme Name", "Folio", "Units", "NAV", "Current Value", "Invested", "Gain/Loss", "Returns"].map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "var(--navy)", fontSize: 11, textTransform: "uppercase", letterSpacing: .5, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(portfolio?.holdings || []).map((h: any, i: number) => (
                    <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
                      <td style={{ padding: "12px", maxWidth: 220 }}>
                        <div style={{ fontWeight: 600, color: "var(--navy)", fontSize: 13, marginBottom: 2 }}>{h.schemeName}</div>
                        <div style={{ fontSize: 11, color: "var(--gray)" }}>{h.amc} · {h.category}</div>
                      </td>
                      <td style={{ padding: "12px", color: "var(--gray)", fontSize: 12 }}>{h.folioNo}</td>
                      <td style={{ padding: "12px" }}>{h.units?.toFixed(3)}</td>
                      <td style={{ padding: "12px" }}>₹{h.nav?.toFixed(2)}</td>
                      <td style={{ padding: "12px", fontWeight: 600, color: "var(--navy)" }}>{fmt(h.currentValue)}</td>
                      <td style={{ padding: "12px", color: "var(--gray)" }}>{fmt(h.investedValue)}</td>
                      <td style={{ padding: "12px", color: h.gain >= 0 ? "#16a34a" : "#dc2626", fontWeight: 600 }}>{h.gain >= 0 ? "+" : ""}{fmt(h.gain)}</td>
                      <td style={{ padding: "12px" }}>
                        <span style={{ background: h.gainPct >= 0 ? "#dcfce7" : "#fee2e2", color: h.gainPct >= 0 ? "#16a34a" : "#dc2626", padding: "3px 8px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                          {h.gainPct >= 0 ? "+" : ""}{h.gainPct?.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SIP + Transactions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="bottom-grid">
            {/* Active SIPs */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--navy)" }}>Active SIPs</h3>
                <Link href="/portal/sip" style={{ color: "var(--gold)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>View All →</Link>
              </div>
              {sips.map((s, i) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid #f0ece4" }}>
                  <div style={{ fontWeight: 600, color: "var(--navy)", fontSize: 13, marginBottom: 4 }}>{s.scheme}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--gray)" }}>
                    <span>₹{s.amount?.toLocaleString()}/month · {s.date}{s.date === 1 ? "st" : s.date === 2 ? "nd" : "th"} every month</span>
                    <span style={{ background: "#dcfce7", color: "#16a34a", padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>{s.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Transactions */}
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: "var(--navy)" }}>Recent Transactions</h3>
                <Link href="/portal/transactions" style={{ color: "var(--gold)", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>View All →</Link>
              </div>
              {txns.map((t, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid #f0ece4", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", marginBottom: 2 }}>{t.scheme?.substring(0, 28)}...</div>
                    <div style={{ fontSize: 11, color: "var(--gray)" }}>{t.date} · {t.type}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700, color: "var(--navy)", fontSize: 14 }}>₹{t.amount?.toLocaleString()}</div>
                    <span style={{ fontSize: 11, background: "#dcfce7", color: "#16a34a", padding: "2px 6px", borderRadius: 10 }}>{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Styles() {
  return (
    <style>{`
      :root{--navy:#0a1628;--navy2:#112240;--gold:#c9a84c;--cream:#f7f4ef;--light:#f0ece4;--gray:#6b7280;}
      *{box-sizing:border-box;margin:0;padding:0;}
      @keyframes spin{to{transform:rotate(360deg)}}
      @media(max-width:900px){
        .portal-layout{flex-direction:column !important;}
        .portal-sidebar{width:100% !important;display:flex;gap:6px;flex-wrap:wrap;padding-top:16px !important;padding-bottom:8px;}
        .portal-main{padding-left:0 !important;padding-top:16px !important;}
        .summary-grid{grid-template-columns:1fr 1fr !important;}
        .bottom-grid{grid-template-columns:1fr !important;}
      }
      @media(max-width:480px){
        .summary-grid{grid-template-columns:1fr !important;}
      }
    `}</style>
  );
}
