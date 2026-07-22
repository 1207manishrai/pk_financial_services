import { NextRequest, NextResponse } from "next/server";

function formatInvestorName(str: string): string {
  const clean = str.trim().split("@")[0].replace(/[._-]/g, " ");
  return clean
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const cleanUsername = String(username).trim();
    const displayName = formatInvestorName(cleanUsername);

    // Create unique investor session object
    const session = {
      pan: cleanUsername.toUpperCase(),
      username: cleanUsername,
      name: displayName,
      camsToken: "dev-token-cams-" + cleanUsername,
      kfinToken: "dev-token-kfin-" + cleanUsername,
      loginTime: Date.now(),
    };

    const res = NextResponse.json({
      success: true,
      investor: { username: session.username, name: session.name },
    });

    // Set HTTP-only session cookie for portal pages
    res.cookies.set("pk_session", JSON.stringify(session), {
      httpOnly: true,
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
      sameSite: "lax",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Authentication failed. Please try again." }, { status: 500 });
  }
}
