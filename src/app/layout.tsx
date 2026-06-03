import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
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

const SITE_URL = "https://tokyo-neon-bar.vercel.app";

export const metadata =  {
  metadataBase: new URL(SITE_URL),
  title: "NEON KISSA | Tokyo Night Bar",
  description:
    "A bilingual cyber-modern Tokyo nightbar with a reservation request form — designed for international guests and locals alike.",
  openGraph: {
    title: "NEON KISSA | Tokyo Night Bar",
    description:
      "Bilingual cyber-modern Tokyo nightbar with reservation requests for international guests and locals alike.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NEON KISSA | Tokyo Night Bar",
    description:
      "Bilingual cyber-modern Tokyo nightbar with reservation requests for international guests and locals alike.",
  },
};

// NOTE: address and geo are demo values — replace with the real venue's
// details for a live client.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BarOrNightClub",
  name: "NEON KISSA",
  description:
    "A bilingual cyber-modern Tokyo nightbar with a reservation request form.",
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: "¥¥",
  servesCuisine: "Cocktails",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1-2-3 Shinjuku",
    addressLocality: "Shinjuku-ku",
    addressRegion: "Tokyo",
    addressCountry: "JP",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 35.7016,
    longitude: 139.6886,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday", "Sunday",
    ],
    opens: "18:00",
    closes: "03:00",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-[var(--font-body)]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
