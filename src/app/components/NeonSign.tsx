"use client";

export default function NeonSign() {
  return (
    <svg
      viewBox="0 0 520 72"
      aria-label="NEON KISSA"
      className="neon-sign w-full max-w-[420px] md:max-w-[520px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Wide outer bloom — ambient light spread on the wall */}
        <filter id="neon-bloom-outer" x="-40%" y="-200%" width="180%" height="600%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur-outer" />
          <feColorMatrix
            in="blur-outer"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.2 0"
            result="glow-outer"
          />
        </filter>

        {/* Tight inner halo — the coloured aura right around the tube */}
        <filter id="neon-bloom-inner" x="-20%" y="-100%" width="140%" height="400%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur-inner" />
        </filter>
      </defs>

      {/* Layer 1: wide ambient bloom (magenta) */}
      <text
        x="260"
        y="56"
        textAnchor="middle"
        fontFamily="var(--font-mono), monospace"
        fontSize="54"
        fontWeight="700"
        letterSpacing="4"
        fill="none"
        stroke="rgb(var(--neonB))"
        strokeWidth="3"
        filter="url(#neon-bloom-outer)"
        opacity="0.5"
        aria-hidden="true"
      >
        NEON KISSA
      </text>

      {/* Layer 2: tight cyan aura around the tube */}
      <text
        x="260"
        y="56"
        textAnchor="middle"
        fontFamily="var(--font-mono), monospace"
        fontSize="54"
        fontWeight="700"
        letterSpacing="4"
        fill="none"
        stroke="rgb(var(--neonA))"
        strokeWidth="2"
        filter="url(#neon-bloom-inner)"
        aria-hidden="true"
      >
        NEON KISSA
      </text>

      {/* Layer 3: the hot white-blue core of the tube — this is what flickers */}
      <text
        x="260"
        y="56"
        textAnchor="middle"
        fontFamily="var(--font-mono), monospace"
        fontSize="54"
        fontWeight="700"
        letterSpacing="4"
        fill="none"
        stroke="rgb(220 240 255)"
        strokeWidth="1"
        className="neon-sign-tube"
      >
        NEON KISSA
      </text>
    </svg>
  );
}
