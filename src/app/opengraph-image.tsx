import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050508",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        {/* Ambient glows */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(700px 500px at 15% 25%, rgba(16,185,129,0.22), transparent 60%), radial-gradient(700px 500px at 85% 20%, rgba(217,70,239,0.20), transparent 60%)",
          }}
        />

        {/* Neon accent line */}
        <div
          style={{
            width: 72,
            height: 2,
            background:
              "linear-gradient(90deg, rgb(0,229,255), rgb(163,102,255), transparent)",
            borderRadius: 999,
            marginBottom: 28,
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 700,
            color: "rgb(0,229,255)",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            marginBottom: 18,
            fontFamily: "monospace",
          }}
        >
          NEON KISSA
        </div>

        {/* Kicker */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.10em",
            marginBottom: 28,
            fontFamily: "monospace",
          }}
        >
          Tokyo Nightlife  •  Shinjuku
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 30,
            color: "rgba(236,236,245,0.88)",
            lineHeight: 1.4,
            maxWidth: 560,
          }}
        >
          A Cyber-Modern Cocktail Hideout
        </div>

        {/* Badge pills */}
        <div style={{ display: "flex", gap: 12, marginTop: 52 }}>
          {[
            { label: "EN/JP Friendly", color: "rgba(0,229,255,0.9)", bg: "rgba(0,229,255,0.12)", border: "rgba(0,229,255,0.30)" },
            { label: "No Cover Charge", color: "rgba(255,120,180,0.9)", bg: "rgba(255,0,153,0.10)", border: "rgba(255,0,153,0.28)" },
            { label: "Late Night", color: "rgba(180,140,255,0.9)", bg: "rgba(163,102,255,0.10)", border: "rgba(163,102,255,0.28)" },
          ].map(({ label, color, bg, border }) => (
            <div
              key={label}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: `1px solid ${border}`,
                background: bg,
                color,
                fontSize: 16,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
