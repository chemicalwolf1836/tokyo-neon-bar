"use client";

import { useEffect, useState } from "react";

function isOpenInTokyo(): boolean {
  // Current time in Tokyo, regardless of the visitor's own timezone.
  const tokyo = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const h = tokyo.getHours();
  // Open 18:00 → 03:00 (overnight).
  return h >= 18 || h < 3;
}

export default function OpenStatus({
  lang,
  className = "",
}: {
  lang: "en" | "jp";
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOpen(isOpenInTokyo());
    const id = setInterval(() => setOpen(isOpenInTokyo()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Time-dependent — render nothing until mounted to avoid hydration mismatch.
  if (!mounted) return null;

  const label = open
    ? lang === "jp"
      ? "営業中"
      : "Open now"
    : lang === "jp"
      ? "閉店中 · 18:00開店"
      : "Closed · opens 18:00";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs ${
        open
          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-300"
          : "border-white/15 bg-white/5 text-white/55"
      } ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          open ? "bg-emerald-400 animate-pulse" : "bg-white/40"
        }`}
      />
      {label}
    </span>
  );
}
