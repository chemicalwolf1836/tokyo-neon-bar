"use client";
import { Sparkles } from "lucide-react";

export default function NeonSign() {
  return (
    <div
      className="neon-sign inline-flex items-center gap-3 rounded-2xl px-6 py-4 bg-black/50 border border-white/10 neon-ring"
      aria-label="NEON KISSA"
    >
      <Sparkles className="h-7 w-7 flex-shrink-0 text-white/80" />
      <span
        className="neon-text font-bold tracking-[0.18em] text-2xl md:text-3xl text-white"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        NEON KISSA
      </span>
    </div>
  );
}
