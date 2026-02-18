import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEON KISSA | Tokyo Night Bar",
  description:
    "Bilingual cyber-modern cocktail bar website demo for tourists in Tokyo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
