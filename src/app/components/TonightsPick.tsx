"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { MENU_ITEMS } from "@/app/data/menu";

// Day-of-year (1–366) so every visitor sees the same pick on a given date,
// and it rotates automatically at midnight without any backend.
function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000);
}

export default function TonightsPick({
  lang,
  t,
  onSelect,
}: {
  lang: "en" | "jp";
  t: { badge: string; note: string; cta: string };
  onSelect: (index: number) => void;
}) {
  // new Date() differs between the server prerender and the browser,
  // so wait until mounted to avoid a hydration mismatch.
  const [index, setIndex] = useState<number | null>(null);
  useEffect(() => {
    setIndex(dayOfYear(new Date()) % MENU_ITEMS.length);
  }, []);

  if (index === null) return null;
  const item = MENU_ITEMS[index];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      onClick={() => onSelect(index)}
      className="glow-border neon-ring relative mb-4 w-full overflow-hidden rounded-2xl bg-white/5 p-5 md:p-6 text-left cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400/60 via-violet-400/40 to-transparent" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
            <Sparkles className="h-3 w-3" />
            {t.badge}
          </span>
          <p
            className="neon-text mt-3 text-xl md:text-2xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {lang === "jp" ? item.name.jp : item.name.en}
          </p>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">
            {lang === "jp" ? item.description.jp : item.description.en}
          </p>
        </div>

        <div className="flex items-center gap-4 md:flex-col md:items-end md:gap-2 shrink-0">
          <p className="neon-price text-lg font-semibold">
            ¥{item.priceYen.toLocaleString("ja-JP")}
          </p>
          <span className="inline-flex items-center gap-1 text-xs text-white/50">
            {t.cta} <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>

      <p className="mt-3 text-xs text-white/35">{t.note}</p>
    </motion.button>
  );
}
