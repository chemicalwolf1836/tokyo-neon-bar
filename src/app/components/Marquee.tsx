"use client";

const PHRASES = {
  en: ["OPEN LATE", "WALK-INS WELCOME", "EN/JP FRIENDLY", "NO COVER CHARGE", "SHINJUKU NIGHTS"],
  jp: ["深夜営業", "ウォークイン歓迎", "EN/JP対応", "チャージなし", "新宿の夜"],
};

export default function Marquee({ lang }: { lang: "en" | "jp" }) {
  const items = PHRASES[lang];

  // One sequence of phrases separated by a neon star.
  const Sequence = ({ ariaHidden }: { ariaHidden?: boolean }) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={ariaHidden}
    >
      {items.map((phrase, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 text-xs tracking-[0.25em] text-white/55">
            {phrase}
          </span>
          <span className="text-[rgb(var(--neonA))]/70 text-sm">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.02] py-3">
      <div className="flex w-max animate-[marquee_22s_linear_infinite] hover:[animation-play-state:paused]">
        <Sequence />
        <Sequence ariaHidden />
      </div>
    </div>
  );
}
