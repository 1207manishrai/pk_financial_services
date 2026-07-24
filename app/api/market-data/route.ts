import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const symbols = {
  "BSE SENSEX": "^BSESN",
  "NIFTY 50": "^NSEI",
  "NIFTY BANK": "^NSEBANK",
  "NIFTY IT": "^CNXIT"
};

export async function GET() {
  const results = [];
  for (const [name, sym] of Object.entries(symbols)) {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${sym}?interval=1d&range=1d`;
      const res = await fetch(url, { 
        next: { revalidate: 60 },
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      });
      if (!res.ok) continue;
      const data = await res.json();
      const result = data?.chart?.result?.[0];
      if (!result) continue;
      
      const meta = result.meta;
      const price = meta.regularMarketPrice;
      const prev = meta.chartPreviousClose || price;
      const change = price - prev;
      const pct = prev > 0 ? (change / prev) * 100 : 0;
      
      results.push({
        name,
        value: Number(price.toFixed(2)),
        change: Number(change.toFixed(2)),
        pct: Number(pct.toFixed(2))
      });
    } catch (err) {
      console.error(`Error fetching ${name}:`, err);
    }
  }
  
  return NextResponse.json({ success: true, indices: results });
}
