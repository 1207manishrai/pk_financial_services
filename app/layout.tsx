import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "PK Financial Services | Your Trusted Financial Partner",
  description: "Expert guidance in Mutual Funds, Insurance, Tax Planning. Based in Lucknow, UP.",
  icons: {
    icon: [
      { url: "/logo.jpg?v=4" },
      { url: "/favicon.ico?v=4" }
    ],
    shortcut: "/logo.jpg?v=4",
    apple: "/logo.jpg?v=4",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="p:domain_verify" content="257c2b6ba779e3d5b75077a92f2ff039" />
        <link rel="icon" type="image/jpeg" href="/logo.jpg?v=4" />
        <link rel="shortcut icon" href="/logo.jpg?v=4" />
        <link rel="apple-touch-icon" href="/logo.jpg?v=4" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

