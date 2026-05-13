"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, LucideIcon } from "lucide-react";
import type { MenuItem } from "@/app/data/menu";

const TAG_LABELS: Record<string, { en: string; jp: string }> = {
  citrus: { en: "Citrus", jp: "柑橘" },
  sparkling: { en: "Sparkling", jp: "スパークリング" },
  refreshing: { en: "Refreshing", jp: "爽やか" },
  light: { en: "Light", jp: "軽め" },
  smoky: { en: "Smoky", jp: "スモーキー" },
  yuzu: { en: "Yuzu", jp: "ゆず" },
  tonic: { en: "Tonic", jp: "トニック" },
  floral: { en: "Floral", jp: "フローラル" },
  plum: { en: "Plum", jp: "梅" },
  umeshu: { en: "Umeshu", jp: "梅酒" },
  smooth: { en: "Smooth", jp: "まろやか" },
  spice: { en: "Spice", jp: "スパイス" },
  lime: { en: "Lime", jp: "ライム" },
  coffee: { en: "Coffee", jp: "コーヒー" },
  cocoa: { en: "Cocoa", jp: "ココア" },
  strong: { en: "Strong", jp: "強め" },
  dessert: { en: "Dessert", jp: "デザート系" },
};

const BASE_LABELS: Record<string, { en: string; jp: string }> = {
  whiskey: { en: "Whiskey", jp: "ウイスキー" },
  gin: { en: "Gin", jp: "ジン" },
  vodka: { en: "Vodka", jp: "ウォッカ" },
  umeshu: { en: "Umeshu", jp: "梅酒" },
};

const SWEETNESS_LABELS: Record<string, { en: string; jp: string }> = {
  dry: { en: "Dry", jp: "ドライ" },
  balanced: { en: "Balanced", jp: "バランス" },
  sweet: { en: "Sweet", jp: "甘め" },
};

const VIBE_LABELS: Record<string, { en: string; jp: string }> = {
  "after-work": { en: "After-work", jp: "仕事帰り" },
  chill: { en: "Chill", jp: "リラックス" },
  romantic: { en: "Romantic", jp: "デート向け" },
  party: { en: "Party", jp: "盛り上がり" },
};

export default function DrinkModal({
  item,
  icon: Icon,
  lang,
  onClose,
}: {
  item: MenuItem | null;
  icon: LucideIcon | null;
  lang: "en" | "jp";
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="glow-border neon-ring rounded-2xl bg-[#0d0c18] w-full max-w-md pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top neon accent border */}
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/60 via-violet-400/40 to-transparent" />
              <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <div className="rounded-xl p-2 bg-white/5 text-white/50">
                      <Icon className="h-5 w-5" />
                    </div>
                  )}
                  <div>
                    <div className="neon-line mb-1.5" />
                    <h2 className="neon-text font-semibold text-lg leading-tight" style={{ fontFamily: "var(--font-mono)" }}>
                      {lang === "jp" ? item.name.jp : item.name.en}
                    </h2>
                    <p className="text-xs text-white/40 mt-0.5">
                      {lang === "jp" ? item.name.en : item.name.jp}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition p-1 shrink-0"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Description */}
              <p className="text-sm text-white/80 mb-1">
                {lang === "jp" ? item.description.jp : item.description.en}
              </p>
              <p className="text-xs text-white/40 mb-5">
                {lang === "jp" ? item.description.en : item.description.jp}
              </p>

              {/* Price + badges */}
              <div className="flex items-center gap-3 mb-5">
                <span className="neon-price text-xl font-semibold">
                  ¥{item.priceYen.toLocaleString("ja-JP")}
                </span>
                <span className="rounded-full px-2.5 py-1 text-xs border border-white/20 bg-white/10 text-white/80">
                  {lang === "jp" ? BASE_LABELS[item.base].jp : BASE_LABELS[item.base].en}
                </span>
                <span className="rounded-full px-2.5 py-1 text-xs border border-white/20 bg-white/10 text-white/80">
                  {lang === "jp" ? SWEETNESS_LABELS[item.sweetness].jp : SWEETNESS_LABELS[item.sweetness].en}
                </span>
              </div>

              {/* Flavor tags */}
              <div className="mb-4">
                <p className="text-xs text-white/40 mb-2">
                  {lang === "jp" ? "フレーバー" : "Flavors"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => {
                    const label = TAG_LABELS[tag];
                    return (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-1 text-xs border border-cyan-400/20 bg-cyan-500/10 text-cyan-300/80"
                      >
                        {label ? (lang === "jp" ? label.jp : label.en) : tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Vibes */}
              <div className="mb-6">
                <p className="text-xs text-white/40 mb-2">
                  {lang === "jp" ? "おすすめの場面" : "Best for"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.vibes.map((vibe) => {
                    const label = VIBE_LABELS[vibe];
                    return (
                      <span
                        key={vibe}
                        className="rounded-full px-2.5 py-1 text-xs border border-violet-400/20 bg-violet-500/10 text-violet-300/80"
                      >
                        {label ? (lang === "jp" ? label.jp : label.en) : vibe}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                <a
                  href="#reserve"
                  onClick={onClose}
                  className="neon-ring inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm bg-cyan-500/15 border border-cyan-400/35 text-cyan-100 hover:bg-cyan-500/25 transition"
                  style={{ boxShadow: "0 0 18px rgba(0,229,255,0.18), 0 0 6px rgba(0,229,255,0.12)" }}
                >
                  {lang === "jp" ? "このお席を予約する" : "Reserve a table"} <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
