import { NextRequest, NextResponse } from "next/server";
import { camsGetSIPs } from "@/lib/cams";
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("pk_session");
  if (!cookie) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  const session = JSON.parse(cookie.value);
  const result = await camsGetSIPs(session.pan, session.camsToken);
  return NextResponse.json({ success: true, sips: result.sips });
}
