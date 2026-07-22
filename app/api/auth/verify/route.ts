import { NextRequest, NextResponse } from "next/server";
import { camsVerifyOTP } from "@/lib/cams";
import { kfinVerifyOTP } from "@/lib/kfin";
export async function POST(req: NextRequest) {
  const { pan, otp } = await req.json();
  if (!pan || !otp) return NextResponse.json({ error: "PAN and OTP required" }, { status: 400 });
  const [cams, kfin] = await Promise.allSettled([camsVerifyOTP(pan, otp), kfinVerifyOTP(pan, otp)]);
  const camsResult = cams.status === "fulfilled" ? cams.value : null;
  const kfinResult = kfin.status === "fulfilled" ? kfin.value : null;
  if (!camsResult?.success && !kfinResult?.success) return NextResponse.json({ error: "Invalid OTP. Please try again." }, { status: 401 });
  const investorData = camsResult?.investorData || kfinResult?.investorData;
  const session = { pan: pan.toUpperCase(), name: investorData?.name || "Investor", camsToken: camsResult?.token, kfinToken: kfinResult?.token, loginTime: Date.now() };
  const res = NextResponse.json({ success: true, investor: { pan: session.pan, name: session.name } });
  res.cookies.set("pk_session", JSON.stringify(session), { httpOnly: true, maxAge: 60*60*8, path: "/" });
  return res;
}
