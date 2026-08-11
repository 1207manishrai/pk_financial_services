"use client";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/*                        PROFESSIONAL LARGE SVG LOGOS                        */
/* -------------------------------------------------------------------------- */

const EducationPlanningLogo = () => (
  <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 16px rgba(11,26,48,0.35))" }}>
    <defs>
      <linearGradient id="eduCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1e3a8a" />
        <stop offset="100%" stopColor="#0b1a30" />
      </linearGradient>
      <linearGradient id="goldGradEdu" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
      <linearGradient id="scrollGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#f3f4f6" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="54" fill="url(#goldGradEdu)" opacity="0.15" />
    <circle cx="60" cy="60" r="48" stroke="url(#goldGradEdu)" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.6" />
    <path d="M60 12L62 18L68 18L63 22L65 28L60 24L55 28L57 22L52 18L58 18Z" fill="url(#goldGradEdu)" />
    <path d="M22 45L23.5 49.5L28 49.5L24.5 52.5L26 57L22 54L18 57L19.5 52.5L16 49.5L20.5 49.5Z" fill="url(#goldGradEdu)" opacity="0.7" />
    <path d="M98 45L99.5 49.5L104 49.5L100.5 52.5L102 57L98 54L94 57L95.5 52.5L92 49.5L96.5 49.5Z" fill="url(#goldGradEdu)" opacity="0.7" />
    <polygon points="60,26 102,44 60,62 18,44" fill="url(#eduCapGrad)" stroke="url(#goldGradEdu)" strokeWidth="2.5" />
    <path d="M35 52v16c0 8 11.2 14 25 14s25-6 25-14V52" fill="url(#eduCapGrad)" stroke="url(#goldGradEdu)" strokeWidth="2" />
    <rect x="32" y="80" width="56" height="14" rx="7" fill="url(#scrollGrad)" stroke="#d1d5db" strokeWidth="1.5" />
    <rect x="54" y="78" width="12" height="18" rx="2" fill="url(#goldGradEdu)" />
    <path d="M52 96l8 8 8-8" stroke="url(#goldGradEdu)" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M92 46v28" stroke="url(#goldGradEdu)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="92" cy="76" r="3.5" fill="url(#goldGradEdu)" />
    <path d="M89 79.5l-2 12h10l-2-12z" fill="url(#goldGradEdu)" />
  </svg>
);

const MarriagePlanningLogo = () => (
  <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 16px rgba(225,29,72,0.35))" }}>
    <defs>
      <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#eab308" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
      <linearGradient id="roseRing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fecdd3" />
        <stop offset="50%" stopColor="#fb7185" />
        <stop offset="100%" stopColor="#be123c" />
      </linearGradient>
      <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="50%" stopColor="#e0f2fe" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" fill="#fff1f2" opacity="0.2" />
    <circle cx="60" cy="60" r="48" stroke="url(#roseRing)" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.6" />
    <path d="M30 95C30 60 43.4 32 60 32C76.6 32 90 60 90 95" stroke="url(#goldRing)" strokeWidth="2" strokeDasharray="3 3" fill="none" />
    <circle cx="48" cy="64" r="24" stroke="url(#roseRing)" strokeWidth="7" fill="none" />
    <circle cx="72" cy="64" r="24" stroke="url(#goldRing)" strokeWidth="7" fill="none" />
    <polygon points="72,24 79,33 72,42 65,33" fill="url(#diamondGrad)" stroke="#0284c7" strokeWidth="1.5" />
    <path d="M64 33h16" stroke="#ffffff" strokeWidth="1.5" />
    <path d="M72 14v6M60 22l4 4M84 22l-4 4" stroke="url(#goldRing)" strokeWidth="2" strokeLinecap="round" />
    <path d="M60 55c-2.5-4-7.5-4.5-10-2c-3 3-2 7.5 1 10.5l9 9.5l9-9.5c3-3 4-7.5 1-10.5c-2.5-2.5-7.5-2-10 2z" fill="url(#roseRing)" opacity="0.9" />
  </svg>
);

const RetirementPlanningLogo = () => (
  <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 16px rgba(245,158,11,0.35))" }}>
    <defs>
      <linearGradient id="sunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="60%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
      <linearGradient id="goldNest" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#d97706" />
      </linearGradient>
      <linearGradient id="skyBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#eff6ff" />
        <stop offset="100%" stopColor="#dbeafe" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" fill="url(#skyBg)" opacity="0.15" />
    <circle cx="60" cy="60" r="48" stroke="url(#sunGrad)" strokeWidth="2" strokeDasharray="5 3" opacity="0.7" />
    <circle cx="60" cy="50" r="22" fill="url(#sunGrad)" />
    <path d="M60 18v8M35 25l6 6M85 25l-6 6M22 50h8M90 50h8" stroke="url(#sunGrad)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 78c20-10 45-12 96 0v22H12V78z" fill="#1e3a8a" opacity="0.9" />
    <path d="M12 84c25-6 50-8 96 4v14H12V84z" fill="#0b1a30" />
    <polygon points="45,74 60,60 75,74" fill="url(#goldNest)" />
    <rect x="49" y="74" width="22" height="14" fill="#fef08a" />
    <rect x="57" y="79" width="6" height="9" fill="#0b1a30" />
    <path d="M86 86c-4-12-2-22 6-30" stroke="#d97706" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M92 56c-6-4-12-2-15 2M92 56c6-4 12-2 15 2M92 56c-2-7 2-13 7-15M92 56c2-7-2-13-7-15" stroke="#166534" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="28" cy="80" r="6" fill="url(#sunGrad)" stroke="#ffffff" strokeWidth="1" />
    <circle cx="36" cy="82" r="5" fill="url(#sunGrad)" stroke="#ffffff" strokeWidth="1" />
  </svg>
);

const MutualFundLogo = () => (
  <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 16px rgba(16,185,129,0.35))" }}>
    <defs>
      <linearGradient id="bar1" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#6ee7b7" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
      <linearGradient id="bar2" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="bar3" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="goldArrow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" fill="#ecfdf5" opacity="0.15" />
    <circle cx="60" cy="60" r="48" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" opacity="0.6" />
    <rect x="26" y="65" width="18" height="30" rx="4" fill="url(#bar1)" stroke="#047857" strokeWidth="1" />
    <rect x="51" y="48" width="18" height="47" rx="4" fill="url(#bar2)" stroke="#047857" strokeWidth="1" />
    <rect x="76" y="32" width="18" height="63" rx="4" fill="url(#bar3)" stroke="#047857" strokeWidth="1" />
    <path d="M20 72 Q 45 60 70 34 T 98 18" fill="none" stroke="url(#goldArrow)" strokeWidth="4" strokeLinecap="round" />
    <polygon points="98,14 104,26 90,24" fill="url(#goldArrow)" stroke="#b45309" strokeWidth="1" />
    <circle cx="34" cy="34" r="14" fill="url(#goldArrow)" stroke="#ffffff" strokeWidth="2" />
    <text x="34" y="39" fontSize="15" fontWeight="bold" fill="#0b1a30" textAnchor="middle" fontFamily="sans-serif">₹</text>
  </svg>
);

const LifeHealthInsuranceLogo = () => (
  <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 16px rgba(239,68,68,0.35))" }}>
    <defs>
      <linearGradient id="shieldRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f87171" />
        <stop offset="50%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
    </defs>
    <path d="M60 14L98 28V58C98 82 80 101 60 108C40 101 22 82 22 58V28L60 14Z" fill="#fff1f2" fillOpacity="0.1" stroke="url(#goldBorder)" strokeWidth="3" />
    <path d="M60 22L90 33V58C90 77 75 93 60 99C45 93 30 77 30 58V33L60 22Z" fill="url(#shieldRed)" />
    <path d="M36 60h12l4-10l6 22l6-16l4 8h16" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="54" y="32" width="12" height="16" rx="2" fill="#ffffff" />
    <rect x="52" y="34" width="16" height="12" rx="2" fill="#ffffff" />
    <circle cx="60" cy="40" r="3" fill="url(#goldBorder)" />
  </svg>
);

const TaxSavingLogo = () => (
  <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 16px rgba(139,92,246,0.35))" }}>
    <defs>
      <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a78bfa" />
        <stop offset="50%" stopColor="#7c3aed" />
        <stop offset="100%" stopColor="#4c1d95" />
      </linearGradient>
      <linearGradient id="goldCoinTax" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#f59e0b" />
        <stop offset="100%" stopColor="#b45309" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" fill="#f5f3ff" opacity="0.15" />
    <circle cx="60" cy="60" r="48" stroke="#7c3aed" strokeWidth="2" strokeDasharray="5 3" opacity="0.6" />
    <rect x="28" y="24" width="52" height="68" rx="6" fill="#ffffff" stroke="url(#purpleGrad)" strokeWidth="2.5" />
    <path d="M38 38h32M38 48h24M38 58h28" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
    <circle cx="78" cy="42" r="20" fill="url(#purpleGrad)" stroke="#ffffff" strokeWidth="2" />
    <text x="78" y="49" fontSize="20" fontWeight="bold" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">%</text>
    <ellipse cx="50" cy="85" rx="18" ry="6" fill="url(#goldCoinTax)" stroke="#78350f" strokeWidth="1" />
    <ellipse cx="50" cy="80" rx="18" ry="6" fill="url(#goldCoinTax)" stroke="#78350f" strokeWidth="1" />
    <ellipse cx="50" cy="75" rx="18" ry="6" fill="url(#goldCoinTax)" stroke="#ffffff" strokeWidth="1" />
    <circle cx="76" cy="80" r="14" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
    <path d="M70 80l4 4l8-8" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BondsFdLogo = () => (
  <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 16px rgba(71,85,105,0.35))" }}>
    <defs>
      <linearGradient id="vaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#64748b" />
        <stop offset="50%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>
      <linearGradient id="goldVault" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" fill="#f8fafc" opacity="0.15" />
    <circle cx="60" cy="60" r="48" stroke="url(#vaultGrad)" strokeWidth="2" strokeDasharray="5 3" />
    <rect x="24" y="24" width="72" height="72" rx="12" fill="url(#vaultGrad)" stroke="url(#goldVault)" strokeWidth="3" />
    <circle cx="60" cy="60" r="25" fill="#1e293b" stroke="url(#goldVault)" strokeWidth="3" />
    <circle cx="60" cy="60" r="12" fill="url(#goldVault)" stroke="#ffffff" strokeWidth="1.5" />
    <path d="M60 38v10M60 72v10M38 60h10M72 60h10" stroke="url(#goldVault)" strokeWidth="3.5" strokeLinecap="round" />
    <rect x="36" y="80" width="48" height="16" rx="4" fill="url(#goldVault)" />
    <text x="60" y="92" fontSize="11" fontWeight="bold" fill="#0b1a30" textAnchor="middle" fontFamily="sans-serif">SECURED</text>
  </svg>
);

const GeneralInsuranceLogo = () => (
  <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 16px rgba(225,29,72,0.35))" }}>
    <defs>
      <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fda4af" />
        <stop offset="50%" stopColor="#e11d48" />
        <stop offset="100%" stopColor="#881337" />
      </linearGradient>
      <linearGradient id="shieldGen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" fill="#fff1f2" opacity="0.15" />
    <path d="M20 60 C 20 28, 100 28, 100 60" stroke="url(#shieldGen)" strokeWidth="3" fill="none" strokeDasharray="4 2" />
    <path d="M24 48 Q 60 22 96 48" stroke="url(#carGrad)" strokeWidth="4" fill="none" strokeLinecap="round" />
    <polygon points="60,34 84,54 36,54" fill="url(#shieldGen)" opacity="0.8" />
    <path d="M32 76 c2-8 6-12 14-12 h28 c8 0 12 4 14 12 l4 4 c2 2 2 6 0 8 h-64 c-2 0-2-6 0-8 z" fill="url(#carGrad)" stroke="#881337" strokeWidth="1.5" />
    <circle cx="44" cy="86" r="6" fill="#1e293b" stroke="url(#shieldGen)" strokeWidth="2" />
    <circle cx="76" cy="86" r="6" fill="#1e293b" stroke="url(#shieldGen)" strokeWidth="2" />
    <circle cx="90" cy="80" r="2" fill="#fef08a" />
  </svg>
);

const NriServicesLogo = () => (
  <svg width="115" height="115" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 8px 16px rgba(2,132,199,0.35))" }}>
    <defs>
      <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="50%" stopColor="#0284c7" />
        <stop offset="100%" stopColor="#0369a1" />
      </linearGradient>
      <linearGradient id="goldNri" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fef08a" />
        <stop offset="50%" stopColor="#d4af37" />
        <stop offset="100%" stopColor="#854d0e" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="60" r="52" fill="#f0f9ff" opacity="0.15" />
    <circle cx="60" cy="60" r="48" stroke="url(#goldNri)" strokeWidth="2" strokeDasharray="5 3" />
    <circle cx="60" cy="60" r="32" fill="url(#globeGrad)" stroke="url(#goldNri)" strokeWidth="2" />
    <ellipse cx="60" cy="60" rx="32" ry="14" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
    <ellipse cx="60" cy="60" rx="14" ry="32" stroke="#ffffff" strokeWidth="1.5" fill="none" opacity="0.6" />
    <line x1="28" y1="60" x2="92" y2="60" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
    <line x1="60" y1="28" x2="60" y2="92" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" />
    <path d="M24 75 Q 60 20 96 45" stroke="url(#goldNri)" strokeWidth="3" fill="none" strokeDasharray="4 2" />
    <polygon points="96,45 92,36 85,44" fill="url(#goldNri)" />
    <circle cx="30" cy="35" r="10" fill="url(#goldNri)" stroke="#ffffff" strokeWidth="1" />
    <text x="30" y="39" fontSize="11" fontWeight="bold" fill="#0b1a30" textAnchor="middle" fontFamily="sans-serif">$</text>
    <circle cx="90" cy="80" r="10" fill="url(#goldNri)" stroke="#ffffff" strokeWidth="1" />
    <text x="90" y="84" fontSize="11" fontWeight="bold" fill="#0b1a30" textAnchor="middle" fontFamily="sans-serif">₹</text>
  </svg>
);

/* -------------------------------------------------------------------------- */
/*                              SERVICES DATA                                 */
/* -------------------------------------------------------------------------- */

const services = [
  {
    icon: <EducationPlanningLogo />,
    bg: "linear-gradient(135deg, #0b1a30 0%, #1e3a8a 100%)",
    tag: "Planning",
    title: "Education Planning",
    desc: "Secure your child's educational future with dedicated goal-based SIP projections and inflation-adjusted corpus strategies."
  },
  {
    icon: <MarriagePlanningLogo />,
    bg: "linear-gradient(135deg, #4c0519 0%, #881337 100%)",
    tag: "Planning",
    title: "Marriage Planning",
    desc: "Plan grand weddings and major life events with disciplined investment portfolios that grow steadily alongside your timelines."
  },
  {
    icon: <RetirementPlanningLogo />,
    bg: "linear-gradient(135deg, #451a03 0%, #78350f 100%)",
    tag: "Planning",
    title: "Retirement Planning",
    desc: "Build an inflation-proof retirement corpus through NPS, PPF, and mutual fund systematic withdrawal plans (SWP) for lifelong independence."
  },
  {
    icon: <MutualFundLogo />,
    bg: "linear-gradient(135deg, #022c22 0%, #065f46 100%)",
    tag: "Investments",
    title: "Mutual Fund Investments",
    desc: "Expert guidance across equity, hybrid, small-cap, and index funds. Start systematic investment plans (SIP) from ₹500/month."
  },
  {
    icon: <LifeHealthInsuranceLogo />,
    bg: "linear-gradient(135deg, #450a0a 0%, #991b1b 100%)",
    tag: "Insurance",
    title: "Life & Health Insurance",
    desc: "Compare top-rated term life and comprehensive health insurance policies with guaranteed claim support for total peace of mind."
  },
  {
    icon: <TaxSavingLogo />,
    bg: "linear-gradient(135deg, #2e1065 0%, #5b21b6 100%)",
    tag: "Tax",
    title: "Tax Saving Solutions",
    desc: "Maximise tax savings under Section 80C, 80D, and 80CCD(1B) through ELSS equity funds, NPS, and smart asset allocation."
  },
  {
    icon: <BondsFdLogo />,
    bg: "linear-gradient(135deg, #0f172a 0%, #334155 100%)",
    tag: "Investments",
    title: "Bonds & Fixed Deposits",
    desc: "Secure your capital with predictable, guaranteed returns. Invest in high-rated corporate FDs, government bonds, and Sovereign Gold Bonds (SGB)."
  },
  {
    icon: <GeneralInsuranceLogo />,
    bg: "linear-gradient(135deg, #312e81 0%, #4338ca 100%)",
    tag: "Insurance",
    title: "General Insurance",
    desc: "Safeguard your assets with comprehensive coverage for motor vehicles, commercial property, residential structures, and transit risks."
  },
  {
    icon: <NriServicesLogo />,
    bg: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
    tag: "NRI Wealth",
    title: "NRI Investment Services",
    desc: "Specialised cross-border financial planning, NRE/NRO mutual fund investments, and tax advisory for Non-Resident Indians."
  }
];

interface ServicesProps {
  onEnquire?: (serviceTitle: string) => void;
}

export default function Services({ onEnquire }: ServicesProps) {
  return (
    <section id="services" style={{ background: "#f8fafc", padding: "90px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>
            What We Offer
          </div>
          <h2 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: "clamp(30px,4vw,44px)", fontWeight: 700, color: "var(--navy)" }}>
            Our Best <span style={{ color: "var(--gold)" }}>Services</span>
          </h2>
          <p style={{ color: "var(--gray)", marginTop: 14, maxWidth: 620, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7, fontSize: 16 }}>
            Tailored, goal-driven financial plannings and wealth protection solutions for every stage of your life.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }} className="services-grid">
          {services.map((s) => (
            <div
              key={s.title}
              className="service-card"
              style={{
                background: "#ffffff",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                position: "relative",
                transition: "transform .3s ease, box-shadow .3s ease",
                border: "1px solid rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column"
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 22px 48px rgba(11,26,48,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 10px 30px rgba(0,0,0,0.06)";
              }}
            >
              {/* Card Header with Large SVG Logo */}
              <div
                style={{
                  width: "100%",
                  height: 210,
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden"
                }}
              >
                {/* Radial Lighting Overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.2) 100%)",
                    pointerEvents: "none"
                  }}
                />
                
                {/* Big Animated Logo Container */}
                <div className="service-logo-wrapper" style={{ zIndex: 2, transition: "transform 0.35s ease" }}>
                  {s.icon}
                </div>

                {/* Tag Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "rgba(11,26,48,0.85)",
                    backdropFilter: "blur(4px)",
                    color: "var(--gold)",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    padding: "5px 12px",
                    borderRadius: 20,
                    border: "1px solid rgba(212,175,55,0.4)",
                    zIndex: 3
                  }}
                >
                  {s.tag}
                </span>
              </div>

              {/* Card Content Body */}
              <div style={{ padding: "26px 24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-playfair,serif)", fontSize: 21, fontWeight: 700, color: "var(--navy)", marginBottom: 12 }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14.5, color: "var(--gray)", lineHeight: 1.7, marginBottom: 22 }}>
                    {s.desc}
                  </p>
                </div>

                <div style={{ paddingTop: 14, borderTop: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  {s.title === "Education Planning" ? (
                    <Link
                      href="/calculators/education-planning"
                      style={{ color: "var(--gold)", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
                    >
                      Enquire Now <span style={{ fontSize: 16 }}>→</span>
                    </Link>
                  ) : onEnquire ? (
                    <button
                      onClick={() => onEnquire(s.title)}
                      style={{ background: "none", border: "none", color: "var(--gold)", fontSize: 14, fontWeight: 700, cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}
                    >
                      Enquire Now <span style={{ fontSize: 16 }}>→</span>
                    </button>
                  ) : (
                    <a href="#contact" style={{ color: "var(--gold)", fontSize: 14, fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                      Enquire Now <span style={{ fontSize: 16 }}>→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-card:hover .service-logo-wrapper {
          transform: scale(1.1) translateY(-4px);
        }
        @media(max-width:960px){
          .services-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:640px){
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}


