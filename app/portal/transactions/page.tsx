"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Transactions() {
  const router = useRouter();
  const [txns, setTxns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/transactions").then(r => r.json()).then(d => {
      if (d.error) { router.push("/portal/login"); return; }
      setTxns(d.transactions || []);
      setLoading(false);
    });
  }, [router]);

  const types = ["All", "SIP", "Purchase", "Redemption", "Switch"];
  const filtered = filter === "All" ? txns : txns.filter(t => t.type === filter);

  return (
    <PortalLayout title="Transaction History" active="transactions">
      <div style={{ background: "#fff", borderRadius: 14, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.05)" }}>
        {/* Filter Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ padding: "7px 18px", borderRadius: 20, border: "1.5px solid", borderColor: filter === t ? "var(--navy)" : "#ddd", background: filter === t ? "var(--navy)" : "#fff", color: filter === t ? "#fff" : "var(--gray)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{t}</button>
          ))}
        </div>
        {loading ? <Loader /> : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "var(--cream)" }}>
                  {["Date", "Scheme", "Type", "Amount", "Units", "NAV", "Folio", "Status"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "var(--navy)", fontSize: 11, textTransform: "uppercase", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0ece4" }}>
                    <td style={{ padding: "12px", whiteSpace: "nowrap", color: "var(--gray)" }}>{t.date}</td>
                    <td style={{ padding: "12px", maxWidth: 200, fontWeight: 600, color: "var(--navy)" }}>{t.scheme}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ background: t.type === "SIP" ? "#dbeafe" : t.type === "Redemption" ? "#fee2e2" : "#dcfce7", color: t.type === "SIP" ? "#1d4ed8" : t.type === "Redemption" ? "#dc2626" : "#16a34a", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{t.type}</span>
                    </td>
                    <td style={{ padding: "12px", fontWeight: 700, color: "var(--navy)" }}>₹{t.amount?.toLocaleString()}</td>
                    <td style={{ padding: "12px", color: "var(--gray)" }}>{t.units?.toFixed(3)}</td>
                    <td style={{ padding: "12px" }}>₹{t.nav?.toFixed(2)}</td>
                    <td style={{ padding: "12px", color: "var(--gray)", fontSize: 12 }}>{t.folio}</td>
                    <td style={{ padding: "12px" }}>
                      <span style={{ background: "#dcfce7", color: "#16a34a", padding: "3px 8px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{t.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

function Loader() { return <div style={{ textAlign: "center", padding: 40, color: "var(--gray)" }}>Loading transactions...</div>; }

function PortalLayout({ children, title, active }: { children: React.ReactNode; title: string; active: string }) {
  const router = useRouter();
  const logout = async () => { await fetch("/api/auth/logout", { method: "POST" }); router.push("/portal/login"); };
  const navItems = [
    { href: "/portal/dashboard", icon: "🏠", label: "Dashboard" },
    { href: "/portal/portfolio", icon: "📊", label: "Portfolio" },
    { href: "/portal/transactions", icon: "📋", label: "Transactions" },
    { href: "/portal/sip", icon: "📅", label: "SIP Tracker" },
    { href: "/portal/gains", icon: "💰", label: "Capital Gains" },
  ];
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", fontFamily: "'DM Sans',sans-serif" }}>
      <style>{`:root{--navy:#0a1628;--gold:#c9a84c;--cream:#f7f4ef;--light:#f0ece4;--gray:#6b7280;} *{box-sizing:border-box;margin:0;padding:0;} @media(max-width:900px){.pl{flex-direction:column !important;} .ps{width:100% !important;display:flex;gap:6px;flex-wrap:wrap;}}`}</style>
      <div style={{ background: "var(--navy)", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none"><path d="M4 22L10 14L14 18L18 10L24 22H4Z" fill="#c9a84c"/><circle cx="20" cy="7" r="3" fill="#e8c975"/></svg>
          <span style={{ color: "#fff", fontFamily: "'Playfair Display',serif", fontSize: 16, fontWeight: 700 }}>PK Financial Services</span>
        </Link>
        <button onClick={logout} style={{ background: "rgba(255,255,255,.1)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", padding: "6px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>Logout</button>
      </div>
      <div style={{ display: "flex", maxWidth: 1200, margin: "0 auto", padding: "0 24px" }} className="pl">
        <aside style={{ width: 220, flexShrink: 0, paddingTop: 24 }} className="ps">
          {navItems.map(item => (
            <Link key={item.label} href={item.href} style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 8, textDecoration: "none", marginBottom: 4, background: active === item.label.toLowerCase().replace(" ", "") ? "var(--navy)" : "transparent", color: active === item.label.toLowerCase().replace(" ", "") ? "#fff" : "var(--navy)", fontWeight: 600, fontSize: 14 }}>
              <span>{item.icon}</span> {item.label}
            </Link>
          ))}
        </aside>
        <main style={{ flex: 1, paddingTop: 24, paddingLeft: 28 }}>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 26, color: "var(--navy)", marginBottom: 20 }}>{title}</h1>
          {children}
        </main>
      </div>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
    </div>
  );
}
