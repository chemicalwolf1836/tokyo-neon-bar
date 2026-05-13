import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

const zenKaku = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jp",
  display: "swap",
});

export const metadata =  {
  title: "NEON KISSA | Tokyo Night Bar",
  description:
    "A bilingual cyber-modern Tokyo nightbar with a reservation request form — designed for international guests and locals alike.",
  openGraph: {
    title: "NEON KISSA | Tokyo Night Bar",
    description:
      "Bilingual cyber-modern Tokyo nightbar with reservation requests for international guests and locals alike.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} ${zenKaku.variable} font-[var(--font-body)]`}>{children}</body>
    </html>
  );
}
