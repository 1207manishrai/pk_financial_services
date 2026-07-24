"use client";

import { useState, useEffect } from "react";

interface IndexItem {
  name: string;
  value: number;
  change: number;
  pct: number;
}

export default function MarketTicker() {
  const [timeStr, setTimeStr] = useState("");
  const [marketOpen, setMarketOpen] = useState(true);
  const [indices, setIndices] = useState<IndexItem[]>([
    { name: "BSE SENSEX", value: 75645.34, change: -746.05, pct: -0.98 },
    { name: "BSE BANKEX", value: 63711.56, change: -469.93, pct: -0.73 },
    { name: "BSE Focused IT", value: 33956.34, change: -322.37, pct: -0.94 },
    { name: "NIFTY 50", value: 22957.12, change: -210.45, pct: -0.91 },
    { name: "NIFTY BANK", value: 48950.80, change: 125.60, pct: 0.26 }
  ]);

  // Fetch real market rates from Yahoo Finance via Next.js API
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const res = await fetch("/api/market-data");
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && data.indices && data.indices.length > 0) {
          setIndices(data.indices);
        }
      } catch (err) {
        console.error("Failed to fetch live market data:", err);
      }
    };

    fetchMarketData();
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Update date/time and market status
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Market hours check (Mon-Fri 9:15 to 15:30 IST)
      const day = now.getDay();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMins = hours * 60 + minutes;
      const isOpen = day >= 1 && day <= 5 && totalMins >= 9 * 60 + 15 && totalMins <= 15 * 60 + 30;
      setMarketOpen(isOpen);

      // Formatter: 24 Jul 26 | 11:35
      const d = now.getDate();
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const m = months[now.getMonth()];
      const y = now.getFullYear().toString().slice(-2);
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      setTimeStr(`${d} ${m} ${y} | ${hh}:${mm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Simulate price changes when market is open
  useEffect(() => {
    if (!marketOpen) return;

    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((ind) => {
          // Micro fluctuations
          const diff = (Math.random() - 0.5) * (ind.name.includes("SENSEX") ? 25 : 8);
          const newValue = Number((ind.value + diff).toFixed(2));
          const newChange = Number((ind.change + diff).toFixed(2));
          const newPct = Number(((newChange / (newValue - newChange)) * 100).toFixed(2));
          return {
            ...ind,
            value: newValue,
            change: newChange,
            pct: newPct
          };
        })
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [marketOpen]);

  return (
    <div style={{
      background: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      height: 36,
      display: "flex",
      alignItems: "center",
      fontFamily: "system-ui, -apple-system, sans-serif",
      fontSize: 12.5,
      overflow: "hidden",
      width: "100%",
      position: "relative",
      zIndex: 100
    }} className="no-print">
      {/* Market Status Box */}
      <div style={{
        background: marketOpen ? "#16a34a" : "#dc2626",
        color: "#ffffff",
        fontWeight: "bold",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        fontSize: 13,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        zIndex: 5,
        boxShadow: "2px 0 5px rgba(0,0,0,0.08)",
        flexShrink: 0
      }}>
        {marketOpen ? "Open" : "Closed"}
      </div>

      {/* Date-Time Segment */}
      <div style={{
        color: "#1e293b",
        fontWeight: 700,
        padding: "0 16px",
        borderRight: "1px solid #cbd5e1",
        height: "100%",
        display: "flex",
        alignItems: "center",
        background: "#f8fafc",
        zIndex: 4,
        flexShrink: 0
      }}>
        {timeStr}
      </div>

      {/* Scrolling Indices Container */}
      <div style={{
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        overflow: "hidden",
        position: "relative",
        height: "100%"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
          paddingLeft: 24,
          whiteSpace: "nowrap",
          animation: "ticker-animation 30s linear infinite"
        }} className="ticker-wrapper">
          {/* Double list for smooth loop marquee effect */}
          {[...indices, ...indices].map((ind, i) => {
            const isNegative = ind.change < 0;
            const linkUrl = ind.name.startsWith("NIFTY") ? "https://www.nseindia.com" : "https://www.bseindia.com";
            return (
              <a 
                key={`${ind.name}-${i}`} 
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  display: "inline-flex", 
                  alignItems: "center", 
                  gap: 8,
                  cursor: "pointer",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                  border: "1px solid #e2e8f0",
                  borderRadius: "16px",
                  padding: "3px 12px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04), inset 0 1px 0 #ffffff",
                  margin: "2px 0"
                }}
                className="ticker-card-item"
                title={`Click to view live official rates on ${ind.name.startsWith("NIFTY") ? "NSE India" : "BSE India"}`}
              >
                <span style={{ color: "#2563eb", fontWeight: 700, fontSize: 11.5 }}>{ind.name}</span>
                <span style={{ color: "#0f172a", fontWeight: 700 }}>{ind.value.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
                <span style={{ color: isNegative ? "#dc2626" : "#16a34a", fontWeight: 600, display: "flex", alignItems: "center", gap: 2 }}>
                  {isNegative ? ind.change : `+${ind.change}`} ({isNegative ? `${ind.pct}%` : `+${ind.pct}%`})
                  <span style={{ fontSize: 9 }}>{isNegative ? "▼" : "▲"}</span>
                </span>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes ticker-animation {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .ticker-wrapper:hover {
          animation-play-state: paused;
        }
        .ticker-card-item {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .ticker-card-item:hover {
          transform: translateY(-2px) scale(1.06);
          border-color: #2563eb !important;
          background: #ffffff !important;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.12), inset 0 1px 0 #ffffff !important;
        }
        .ticker-card-item:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>
    </div>
  );
}
