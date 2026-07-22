import { NextRequest, NextResponse } from "next/server";
import { camsRequestOTP } from "@/lib/cams";
import { kfinRequestOTP } from "@/lib/kfin";
export async function POST(req: NextRequest) {
  const { pan, mobile } = await req.json();
  if (!pan || !mobile) return NextResponse.json({ error: "PAN and mobile required" }, { status: 400 });
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase())) return NextResponse.json({ error: "Invalid PAN format" }, { status: 400 });
  await Promise.allSettled([camsRequestOTP(pan, mobile), kfinRequestOTP(pan, mobile)]);
  return NextResponse.json({ success: true, message: "OTP sent to your registered mobile number" });
}
