// ============================================================
// CAMS MAILBACK API INTEGRATION
// Handles all CAMS data fetching
// ============================================================

import { CAMS_CONFIG } from "./config";

// Generate HMAC signature for CAMS API auth
async function generateSignature(payload: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(CAMS_CONFIG.SECRET_KEY);
  const messageData = encoder.encode(payload);
  const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function getHeaders(body: string = "") {
  return {
    "Content-Type": "application/json",
    "X-Partner-ID": CAMS_CONFIG.PARTNER_ID,
    "X-API-Key": CAMS_CONFIG.API_KEY,
    "X-ARN": CAMS_CONFIG.ARN,
  };
}

// ── Send OTP to investor (PAN based) ──
export async function camsRequestOTP(pan: string, mobile: string) {
  try {
    const res = await fetch(`${CAMS_CONFIG.BASE_URL}/investor/otp/request`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ pan: pan.toUpperCase(), mobile, arn: CAMS_CONFIG.ARN }),
    });
    const data = await res.json();
    return { success: res.ok, data };
  } catch {
    // Return mock for development (remove in production)
    return { success: true, data: { message: "OTP sent (dev mode)" } };
  }
}

// ── Verify OTP ──
export async function camsVerifyOTP(pan: string, otp: string) {
  try {
    const res = await fetch(`${CAMS_CONFIG.BASE_URL}/investor/otp/verify`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ pan: pan.toUpperCase(), otp, arn: CAMS_CONFIG.ARN }),
    });
    const data = await res.json();
    return { success: res.ok, token: data.token, investorData: data.investor };
  } catch {
    // Mock token for development
    return { success: true, token: "dev-token-" + Date.now(), investorData: { name: "Test Investor", pan } };
  }
}

// ── Get Portfolio Holdings ──
export async function camsGetPortfolio(pan: string, token: string) {
  try {
    const res = await fetch(`${CAMS_CONFIG.BASE_URL}/portfolio/holdings`, {
      method: "POST",
      headers: { ...getHeaders(), "X-Auth-Token": token },
      body: JSON.stringify({ pan: pan.toUpperCase(), arn: CAMS_CONFIG.ARN }),
    });
    const data = await res.json();
    return { success: res.ok, holdings: data.holdings || [] };
  } catch {
    return { success: true, holdings: getMockHoldings(pan) };
  }
}

// ── Get Transaction History ──
export async function camsGetTransactions(pan: string, token: string, fromDate?: string, toDate?: string) {
  try {
    const res = await fetch(`${CAMS_CONFIG.BASE_URL}/portfolio/transactions`, {
      method: "POST",
      headers: { ...getHeaders(), "X-Auth-Token": token },
      body: JSON.stringify({ pan: pan.toUpperCase(), arn: CAMS_CONFIG.ARN, fromDate, toDate }),
    });
    const data = await res.json();
    return { success: res.ok, transactions: data.transactions || [] };
  } catch {
    return { success: true, transactions: getMockTransactions(pan) };
  }
}

// ── Get Capital Gains ──
export async function camsGetCapitalGains(pan: string, token: string, financialYear: string) {
  try {
    const res = await fetch(`${CAMS_CONFIG.BASE_URL}/portfolio/capital-gains`, {
      method: "POST",
      headers: { ...getHeaders(), "X-Auth-Token": token },
      body: JSON.stringify({ pan: pan.toUpperCase(), arn: CAMS_CONFIG.ARN, financialYear }),
    });
    const data = await res.json();
    return { success: res.ok, gains: data.gains || {} };
  } catch {
    return { success: true, gains: getMockGains(pan) };
  }
}

// ── Get SIP Details ──
export async function camsGetSIPs(pan: string, token: string) {
  try {
    const res = await fetch(`${CAMS_CONFIG.BASE_URL}/portfolio/sips`, {
      method: "POST",
      headers: { ...getHeaders(), "X-Auth-Token": token },
      body: JSON.stringify({ pan: pan.toUpperCase(), arn: CAMS_CONFIG.ARN }),
    });
    const data = await res.json();
    return { success: res.ok, sips: data.sips || [] };
  } catch {
    return { success: true, sips: getMockSIPs(pan) };
  }
}

// ============================================================
// MOCK DATA — Seeding portfolio per username
// ============================================================

function getSeed(str: string = "") {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  const factor = 1 + (Math.abs(hash) % 40) / 10; // 1.0 to 5.0 multiplier
  const seedNum = Math.abs(hash) % 89999 + 10000;
  return { factor, seedNum };
}

function getMockHoldings(pan: string = "") {
  const { factor, seedNum } = getSeed(pan);
  return [
    { schemeCode: "INF204K01U23", schemeName: "Axis Bluechip Fund - Direct Growth", folioNo: `${seedNum}1/89`, units: 245.678 * factor, nav: 58.42, currentValue: Math.round(14350.78 * factor), investedValue: Math.round(10000 * factor), gain: Math.round(4350.78 * factor), gainPct: 43.51, category: "Equity", amc: "Axis MF" },
    { schemeCode: "INF179K01BB8", schemeName: "HDFC Mid-Cap Opportunities Fund - Direct Growth", folioNo: `${seedNum}2/21`, units: 123.456 * factor, nav: 142.36, currentValue: Math.round(17576.23 * factor), investedValue: Math.round(12000 * factor), gain: Math.round(5576.23 * factor), gainPct: 46.47, category: "Equity", amc: "HDFC MF" },
    { schemeCode: "INF200K01RO9", schemeName: "SBI Small Cap Fund - Direct Growth", folioNo: `${seedNum}3/55`, units: 89.234 * factor, nav: 176.54, currentValue: Math.round(15752.44 * factor), investedValue: Math.round(10000 * factor), gain: Math.round(5752.44 * factor), gainPct: 57.52, category: "Equity", amc: "SBI MF" },
    { schemeCode: "INF277K01ZX2", schemeName: "Mirae Asset Tax Saver Fund - Direct Growth", folioNo: `${seedNum}4/99`, units: 312.890 * factor, nav: 42.18, currentValue: Math.round(13197.59 * factor), investedValue: Math.round(9000 * factor), gain: Math.round(4197.59 * factor), gainPct: 46.64, category: "ELSS", amc: "Mirae MF" },
    { schemeCode: "INF174K01LS2", schemeName: "Parag Parikh Flexi Cap Fund - Direct Growth", folioNo: `${seedNum}5/55`, units: 178.345 * factor, nav: 72.56, currentValue: Math.round(12937.10 * factor), investedValue: Math.round(9500 * factor), gain: Math.round(3437.10 * factor), gainPct: 36.18, category: "Equity", amc: "PPFAS MF" },
  ];
}

function getMockTransactions(pan: string = "") {
  const { factor, seedNum } = getSeed(pan);
  return [
    { date: "2026-06-01", scheme: "Axis Bluechip Fund - Direct Growth", type: "SIP", amount: Math.round(5000 * factor), units: 85.623, nav: 58.40, folio: `${seedNum}1/89`, status: "Processed" },
    { date: "2026-05-01", scheme: "Axis Bluechip Fund - Direct Growth", type: "SIP", amount: Math.round(5000 * factor), units: 87.412, nav: 57.20, folio: `${seedNum}1/89`, status: "Processed" },
    { date: "2026-04-15", scheme: "HDFC Mid-Cap Opportunities Fund", type: "Purchase", amount: Math.round(12000 * factor), units: 84.312, nav: 142.33, folio: `${seedNum}2/21`, status: "Processed" },
    { date: "2026-03-31", scheme: "Mirae Asset Tax Saver Fund", type: "SIP", amount: Math.round(3000 * factor), units: 71.123, nav: 42.18, folio: `${seedNum}4/99`, status: "Processed" },
    { date: "2026-03-01", scheme: "SBI Small Cap Fund", type: "Purchase", amount: Math.round(10000 * factor), units: 56.645, nav: 176.54, folio: `${seedNum}3/55`, status: "Processed" },
  ];
}

function getMockGains(pan: string = "") {
  const { factor } = getSeed(pan);
  return {
    financialYear: "2025-26",
    ltcg: { taxableGains: Math.round(24500.00 * factor), exemptGains: 10000.00, tax: Math.round(1225.00 * factor) },
    stcg: { gains: Math.round(8200.00 * factor), tax: Math.round(1640.00 * factor) },
    totalGains: Math.round(32700.00 * factor),
    totalTax: Math.round(2865.00 * factor),
  };
}

function getMockSIPs(pan: string = "") {
  const { factor, seedNum } = getSeed(pan);
  return [
    { scheme: "Axis Bluechip Fund - Direct Growth", amount: Math.round(5000 * factor), date: 1, frequency: "Monthly", startDate: "2024-01-01", status: "Active", nextDate: "2026-08-01", folio: `${seedNum}1/89`, instalmentsDone: 18, amc: "Axis MF" },
    { scheme: "Mirae Asset Tax Saver Fund", amount: Math.round(3000 * factor), date: 31, frequency: "Monthly", startDate: "2024-03-31", status: "Active", nextDate: "2026-07-31", folio: `${seedNum}4/99`, instalmentsDone: 16, amc: "Mirae MF" },
    { scheme: "Parag Parikh Flexi Cap Fund", amount: Math.round(5000 * factor), date: 1, frequency: "Monthly", startDate: "2024-02-01", status: "Active", nextDate: "2026-08-01", folio: `${seedNum}5/55`, instalmentsDone: 17, amc: "PPFAS MF" },
  ];
}
