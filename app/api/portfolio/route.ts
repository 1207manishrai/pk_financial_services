import { NextRequest, NextResponse } from "next/server";
import { camsGetPortfolio } from "@/lib/cams";
import { kfinGetPortfolio } from "@/lib/kfin";
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("pk_session");
  if (!cookie) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const session = JSON.parse(cookie.value);
  const [cams, kfin] = await Promise.allSettled([
    camsGetPortfolio(session.pan, session.camsToken),
    kfinGetPortfolio(session.pan, session.kfinToken),
  ]);
  const camsHoldings = cams.status === "fulfilled" ? cams.value.holdings : [];
  const kfinHoldings = kfin.status === "fulfilled" ? kfin.value.holdings : [];
  // Merge both — CAMS + KFintech holdings combined
  const allHoldings = [...camsHoldings, ...kfinHoldings];
  const totalValue = allHoldings.reduce((s, h) => s + (h.currentValue || 0), 0);
  const totalInvested = allHoldings.reduce((s, h) => s + (h.investedValue || 0), 0);
  return NextResponse.json({
    success: true,
    investorName: session.name || session.username || "Investor",
    holdings: allHoldings,
    summary: {
      totalValue,
      totalInvested,
      totalGain: totalValue - totalInvested,
      gainPct: totalInvested > 0 ? ((totalValue - totalInvested) / totalInvested * 100).toFixed(2) : "0.00",
    },
  });
}
