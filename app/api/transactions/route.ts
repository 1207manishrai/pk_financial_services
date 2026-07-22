import { NextRequest, NextResponse } from "next/server";
import { camsGetTransactions } from "@/lib/cams";
import { kfinGetTransactions } from "@/lib/kfin";
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("pk_session");
  if (!cookie) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const session = JSON.parse(cookie.value);
  const url = new URL(req.url);
  const fromDate = url.searchParams.get("from") || "";
  const toDate = url.searchParams.get("to") || "";
  const [cams, kfin] = await Promise.allSettled([
    camsGetTransactions(session.pan, session.camsToken, fromDate, toDate),
    kfinGetTransactions(session.pan, session.kfinToken),
  ]);
  const all = [
    ...(cams.status === "fulfilled" ? cams.value.transactions : []),
    ...(kfin.status === "fulfilled" ? kfin.value.transactions : []),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return NextResponse.json({ success: true, transactions: all });
}
