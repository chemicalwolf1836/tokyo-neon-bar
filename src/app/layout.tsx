import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
