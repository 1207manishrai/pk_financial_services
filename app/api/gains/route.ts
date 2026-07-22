import { NextRequest, NextResponse } from "next/server";
import { camsGetCapitalGains } from "@/lib/cams";
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("pk_session");
  if (!cookie) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const session = JSON.parse(cookie.value);
  const fy = new URL(req.url).searchParams.get("fy") || "2025-26";
  const result = await camsGetCapitalGains(session.pan, session.camsToken, fy);
  return NextResponse.json({ success: true, gains: result.gains });
}
