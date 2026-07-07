import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://developers.revnuvo.site"),
  title: {
    default: "Revnuvo Developers — Programmable Payments for AI Agents",
    template: "%s · Revnuvo Developers",
  },
  description:
    "Pay-per-request infrastructure for AI agents. SDK, gateway, and resource APIs settled in USDC on Base via the x402 protocol.",
  openGraph: {
    title: "Revnuvo Developers",
    description:
      "Pay-per-request infrastructure for AI agents. Settled in USDC on Base via x402.",
    url: "https://developers.revnuvo.site",
    siteName: "Revnuvo Developers",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revnuvo Developers",
    description:
      "Pay-per-request infrastructure for AI agents. Settled in USDC on Base via x402.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="min-h-screen bg-base font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
