"use client";
import { useState } from "react";

const AMC_PARTNERS = [
  {
    name: "SBI Mutual Fund",
    abbr: "SBI MF",
    color: "#1a56db",
    bg: "#e8f0fe",
    logo: "https://www.sbimf.com/Content/images/sbi-mf-logo.png",
    domain: "sbimf.com",
  },
  {
    name: "HDFC Mutual Fund",
    abbr: "HDFC MF",
    color: "#004c97",
    bg: "#dceeff",
    logo: "https://www.hdfcfund.com/content/dam/abc/india/assets/images/header/hdfc_amc_logo.png",
    domain: "hdfcfund.com",
  },
  {
    name: "ICICI Prudential MF",
    abbr: "ICICI Pru",
    color: "#c8102e",
    bg: "#fde8eb",
    logo: "https://www.icicipruamc.com/content/dam/icici-mutual-fund/logos/icici-prudential-mf-logo.png",
    domain: "icicipruamc.com",
  },
  {
    name: "Nippon India MF",
    abbr: "Nippon",
    color: "#d62b31",
    bg: "#fde8eb",
    logo: "https://mf.nipponindiaim.com/NipponIndiaAMC/img/Nippon-India-MF-Logo.svg",
    domain: "nipponindiaim.com",
  },
  {
    name: "Axis Mutual Fund",
    abbr: "Axis MF",
    color: "#9b1b1b",
    bg: "#fde8eb",
    logo: "https://www.axismf.com/assets/images/axis-mf-logo.png",
    domain: "axismf.com",
  },
  {
    name: "Kotak Mahindra MF",
    abbr: "Kotak MF",
    color: "#ee1c25",
    bg: "#fde8eb",
    logo: "https://www.kotakmf.com/Content/img/kotak-mf-logo.png",
    domain: "kotakmf.com",
  },
  {
    name: "Aditya Birla Sun Life MF",
    abbr: "ABSL MF",
    color: "#e05c0b",
    bg: "#fef3e8",
    logo: "https://mutualfund.adityabirlacapital.com/Content/img/ABSL-MF-Logo.png",
    domain: "adityabirlacapital.com",
  },
  {
    name: "Mirae Asset MF",
    abbr: "Mirae",
    color: "#1e3a8a",
    bg: "#e8f0fe",
    logo: "https://www.miraeassetmf.co.in/images/mirae-asset-logo.png",
    domain: "miraeassetmf.co.in",
  },
  {
    name: "UTI Mutual Fund",
    abbr: "UTI MF",
    color: "#004990",
    bg: "#dceeff",
    logo: "https://www.utimf.com/content/dam/uti/logo/uti-mf-logo.svg",
    domain: "utimf.com",
  },
  {
    name: "DSP Mutual Fund",
    abbr: "DSP MF",
    color: "#003087",
    bg: "#e8f0fe",
    logo: "https://www.dspim.com/img/DSP-Logo.svg",
    domain: "dspim.com",
  },
  {
    name: "Franklin Templeton MF",
    abbr: "Franklin",
    color: "#b5251e",
    bg: "#fde8eb",
    logo: "https://www.franklintempletonindia.com/content/dam/franklin-templeton/global/logos/franklin-templeton-logo.svg",
    domain: "franklintempletonindia.com",
  },
  {
    name: "Tata Mutual Fund",
    abbr: "Tata MF",
    color: "#004990",
    bg: "#dceeff",
    logo: "https://www.tatamutualfund.com/content/dam/tata-mf/logo/tata-mf-logo.png",
    domain: "tatamutualfund.com",
  },
  {
    name: "Sundaram Mutual Fund",
    abbr: "Sundaram",
    color: "#0072bc",
    bg: "#e8f0fe",
    logo: "https://www.sundarammutual.com/Content/images/sundaram-mf-logo.png",
    domain: "sundarammutual.com",
  },
  {
    name: "PGIM India MF",
    abbr: "PGIM",
    color: "#003087",
    bg: "#e8f0fe",
    logo: "https://www.pgimindiamf.com/images/pgim-india-mf-logo.png",
    domain: "pgimindiamf.com",
  },
  {
    name: "Edelweiss MF",
    abbr: "Edelweiss",
    color: "#00529b",
    bg: "#e8f0fe",
    logo: "https://www.edelweissmf.com/Images/edelweiss-logo.png",
    domain: "edelweissmf.com",
  },
  {
    name: "Canara Robeco MF",
    abbr: "Canara",
    color: "#0a6640",
    bg: "#e8f5ee",
    logo: "https://www.canararobeco.com/Content/images/canara-robeco-logo.png",
    domain: "canararobeco.com",
  },
  {
    name: "Bandhan Mutual Fund",
    abbr: "Bandhan",
    color: "#7b2d8b",
    bg: "#f3e8fe",
    logo: "https://www.bandhanmf.com/images/bandhan-mf-logo.png",
    domain: "bandhanmf.com",
  },
  {
    name: "Invesco India MF",
    abbr: "Invesco",
    color: "#006272",
    bg: "#e8f5f5",
    logo: "https://www.invescomutualfund.com/content/dam/invesco/india/en/images/invesco-logo.svg",
    domain: "invescomutualfund.com",
  },
  {
    name: "HSBC Mutual Fund",
    abbr: "HSBC MF",
    color: "#db0011",
    bg: "#fde8eb",
    logo: "https://www.assetmanagement.hsbc.co.in/content/dam/hsbc/as/en/images/logos/hsbc-logo.svg",
    domain: "assetmanagement.hsbc.co.in",
  },
  {
    name: "Motilal Oswal MF",
    abbr: "Motilal",
    color: "#e07b00",
    bg: "#fef3e8",
    logo: "https://www.motilaloswalmf.com/img/motilal-oswal-mf-logo.png",
    domain: "motilaloswalmf.com",
  },
  {
    name: "Quant Mutual Fund",
    abbr: "Quant MF",
    color: "#1a1a6e",
    bg: "#eeeef5",
    logo: "https://www.quantmutual.com/images/quant-logo.png",
    domain: "quantmutual.com",
  },
  {
    name: "Navi Mutual Fund",
    abbr: "Navi MF",
    color: "#8b3dff",
    bg: "#f3e8fe",
    logo: "https://www.navimutualfund.com/images/navi-logo.png",
    domain: "navimutualfund.com",
  },
  {
    name: "Zerodha Fund House",
    abbr: "Zerodha",
    color: "#387ed1",
    bg: "#e8f0fe",
    logo: "https://zerodha.com/static/images/logo.svg",
    domain: "zerodha.com",
  },
  {
    name: "JM Financial MF",
    abbr: "JM MF",
    color: "#003087",
    bg: "#e8f0fe",
    logo: "https://www.jmfinancialmf.com/images/jm-financial-logo.png",
    domain: "jmfinancialmf.com",
  },
  {
    name: "WhiteOak Capital MF",
    abbr: "WhiteOak",
    color: "#2c5f2e",
    bg: "#e8f5ee",
    logo: "https://www.whiteoakcapital.com/images/whiteoak-logo.png",
    domain: "whiteoakcapital.com",
  },
];

const DOUBLED = [...AMC_PARTNERS, ...AMC_PARTNERS];

function AmcCard({ amc }: { amc: typeof AMC_PARTNERS[0] }) {
  // Multi-stage fallback: direct logo → Google favicon → text badge
  const [stage, setStage] = useState<"logo" | "favicon" | "badge">("logo");

  const faviconUrl = `https://www.google.com/s2/favicons?domain=${amc.domain}&sz=128`;

  return (
    <div
      className="amc-card"
      title={amc.name}
      style={{
        background: "#fff",
        border: "1px solid rgba(10,22,40,0.08)",
        borderRadius: 14,
        padding: "12px 18px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        minWidth: 210,
        boxShadow: "0 2px 12px rgba(10,22,40,0.06)",
        flexShrink: 0,
      }}
    >
      {/* Logo container */}
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          background: stage === "badge" ? amc.bg : "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: `1.5px solid ${amc.color}22`,
          overflow: "hidden",
          padding: stage === "badge" ? 0 : 4,
        }}
      >
        {stage === "badge" ? (
          // Final fallback: colour-coded text badge
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 800,
              color: amc.color,
              letterSpacing: 0.3,
              textAlign: "center",
              lineHeight: 1.25,
              padding: "0 4px",
            }}
          >
            {amc.abbr}
          </span>
        ) : (
          // Try logo image, then favicon, then badge
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={stage === "logo" ? amc.logo : faviconUrl}
            alt={amc.name}
            style={{
              width: stage === "favicon" ? 32 : "100%",
              height: stage === "favicon" ? 32 : "100%",
              objectFit: "contain",
              display: "block",
            }}
            onError={() => {
              if (stage === "logo") setStage("favicon");
              else setStage("badge");
            }}
          />
        )}
      </div>

      {/* Name + label */}
      <div style={{ overflow: "hidden" }}>
        <div
          style={{
            fontSize: 12.5,
            fontWeight: 700,
            color: "var(--navy)",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {amc.name}
        </div>
        <div style={{ fontSize: 11, color: amc.color, fontWeight: 600, marginTop: 2 }}>
          AMC Partner
        </div>
      </div>
    </div>
  );
}

export default function AmcPartners() {
  return (
    <section
      id="amc-partners"
      style={{
        background: "linear-gradient(180deg, #f0f4ff 0%, #ffffff 100%)",
        padding: "64px 0 52px",
        overflow: "hidden",
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: "center", marginBottom: 40, padding: "0 24px" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 16,
            background: "rgba(10,22,40,0.05)",
            borderRadius: 40,
            padding: "10px 24px",
            marginBottom: 20,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/amfi-logo.svg" alt="AMFI Logo" style={{ height: 42, width: "auto" }} />
          <span
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: "var(--navy)",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            Our AMC Partners
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-playfair,serif)",
            fontSize: "clamp(24px,3vw,34px)",
            fontWeight: 700,
            color: "var(--navy)",
            marginBottom: 12,
            lineHeight: 1.25,
          }}
        >
          We Partner With{" "}
          <span style={{ color: "var(--gold)" }}>India&apos;s Top AMCs</span>
        </h2>
        <p
          style={{
            color: "var(--gray)",
            fontSize: 15,
            maxWidth: 580,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Access{" "}
          <strong style={{ color: "var(--navy)" }}>25+ leading AMCs</strong>{" "}
          through a single trusted advisor — giving you the widest choice for
          your mutual fund investments.
        </p>
      </div>

      {/* Row 1 — Left to Right */}
      <div style={{ overflow: "hidden", position: "relative", marginBottom: 14 }}>
        <div className="amc-fade-left" />
        <div className="amc-fade-right" />
        <div
          className="amc-track amc-ltr"
          style={{ display: "flex", gap: 14, width: "max-content" }}
        >
          {DOUBLED.map((amc, i) => (
            <AmcCard key={`ltr-${i}`} amc={amc} />
          ))}
        </div>
      </div>

      {/* Row 2 — Right to Left */}
      <div style={{ overflow: "hidden", position: "relative" }}>
        <div className="amc-fade-left" />
        <div className="amc-fade-right" />
        <div
          className="amc-track amc-rtl"
          style={{ display: "flex", gap: 14, width: "max-content" }}
        >
          {[...DOUBLED].reverse().map((amc, i) => (
            <AmcCard key={`rtl-${i}`} amc={amc} />
          ))}
        </div>
      </div>

      {/* Count badge */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "var(--gray)",
            background: "rgba(10,22,40,0.04)",
            borderRadius: 20,
            padding: "7px 20px",
          }}
        >
          <span style={{ color: "var(--gold)", fontWeight: 700 }}>✦</span>
          Empanelled with{" "}
          <strong style={{ color: "var(--navy)" }}>25+ AMCs</strong> across
          Equity, Debt, Hybrid &amp; ETF categories
          <span style={{ color: "var(--gold)", fontWeight: 700 }}>✦</span>
        </span>
      </div>

      <style>{`
        @keyframes amc-marquee-ltr {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes amc-marquee-rtl {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .amc-ltr { animation: amc-marquee-ltr 50s linear infinite; }
        .amc-rtl { animation: amc-marquee-rtl 50s linear infinite; }
        .amc-ltr:hover,
        .amc-rtl:hover { animation-play-state: paused; }
        .amc-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
        }
        .amc-card:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow: 0 12px 28px rgba(10,22,40,0.13) !important;
        }
        .amc-fade-left {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 100px;
          background: linear-gradient(to right, #f0f4ff 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }
        .amc-fade-right {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 100px;
          background: linear-gradient(to left, #ffffff 0%, transparent 100%);
          z-index: 2;
          pointer-events: none;
        }
      `}</style>
    </section>
  );
}
