"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassWater, Flower2, Moon, Coffee, type LucideIcon } from "lucide-react";
import { MENU_ITEMS } from "@/app/data/menu";

type Mood = "after-work" | "chill" | "romantic" | "party";
type Sweetness = "dry" | "balanced" | "sweet" | "any";



function tokenize(input: string) {
  return input
    .toLowerCase()
    .split(/[,/|]+|\s+/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 10);
}

function scoreItem(
  item: (typeof MENU_ITEMS)[number],
  prefs: { mood: Mood; sweetness: Sweetness; likes: string[]; avoid: string[] }
) {
  let score = 0;

  if (item.vibes.includes(prefs.mood)) score += 3;

  if (prefs.sweetness !== "any") {
    if (item.sweetness === prefs.sweetness) score += 2;
    else score -= 1;
  }

  for (const like of prefs.likes) {
    if (item.tags.includes(like)) score += 2;

    if (
      item.description.en.toLowerCase().includes(like) ||
      item.description.jp.toLowerCase().includes(like)
    ) score += 1;

    if (
      item.name.en.toLowerCase().includes(like) ||
      item.name.jp.toLowerCase().includes(like)
    ) score += 1;
  }

  for (const bad of prefs.avoid) {
    if (
      item.tags.includes(bad) ||
      item.description.en.toLowerCase().includes(bad) ||
      item.description.jp.toLowerCase().includes(bad)
    ) score -= 5;
  }

  return score;
}

const MOOD_OPTIONS = [
  { value: "after-work", en: "After-work", jp: "仕事帰り" },
  { value: "chill", en: "Chill", jp: "リラックス" },
  { value: "romantic", en: "Romantic", jp: "デート向け" },
  { value: "party", en: "Party", jp: "盛り上がり" },
] as const;

const SWEETNESS_OPTIONS = [
  { value: "any", en: "Any", jp: "指定なし" },
  { value: "dry", en: "Dry", jp: "ドライ" },
  { value: "balanced", en: "Balanced", jp: "バランス" },
  { value: "sweet", en: "Sweet", jp: "甘め" },
] as const;

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

const BASE_LABELS = {
  whiskey: { en: "Whiskey", jp: "ウイスキー" },
  gin: { en: "Gin", jp: "ジン" },
  vodka: { en: "Vodka", jp: "ウォッカ" },
  umeshu: { en: "Umeshu", jp: "梅酒" },
};

const SWEETNESS_LABELS = {
  dry: { en: "Dry", jp: "ドライ" },
  balanced: { en: "Balanced", jp: "バランス" },
  sweet: { en: "Sweet", jp: "甘め" },
};

const MENU_ICONS: LucideIcon[] = [GlassWater, Flower2, Moon, Coffee];



export default function CocktailFinderMini({
  t,
  lang,
}: {
  t: any;
  lang: "en" | "jp";
}) {

  const [mood, setMood] = useState<Mood>("after-work");
  const [sweetness, setSweetness] = useState<Sweetness>("any");
  const [likesText, setLikesText] = useState("");
  const [avoidText, setAvoidText] = useState("");

  const likes = useMemo(() => tokenize(likesText), [likesText]);
  const avoid = useMemo(() => tokenize(avoidText), [avoidText]);

  const best = useMemo(() => {
    const scored = MENU_ITEMS.map((item) => ({
      item,
      score: scoreItem(item, { mood, sweetness, likes, avoid }),
    }))
      .sort((a, b) => b.score - a.score);

    // Always return something (fallback to first menu item)
    return scored[0]?.item ?? MENU_ITEMS[0];
  }, [mood, sweetness, likes, avoid]);

  return (
    <div className="glow-border rounded-2xl bg-white/5 backdrop-blur-sm p-5">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="neon-line mb-2" />
          <div className="text-sm font-semibold neon-text">{t.title}</div>
        </div>
        <div className="text-xs text-white/50 border border-white/10 rounded-full px-2 py-0.5">{t.bestMatch}</div>
      </div>

      <div className="space-y-4">
        {/* Mood toggles */}
        <div>
          <p className="text-xs text-white/60 mb-2">{t.mood}</p>
          <div className="flex flex-wrap gap-2">
            {MOOD_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setMood(opt.value)}
                className={`rounded-full px-3 py-1.5 text-xs transition border ${
                  mood === opt.value
                    ? "border-cyan-400/40 bg-cyan-500/15 text-cyan-200"
                    : "border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:text-white/80"
                }`}
              >
                {lang === "jp" ? opt.jp : opt.en}
              </button>
            ))}
          </div>
        </div>

        {/* Sweetness toggles */}
        <div>
          <p className="text-xs text-white/60 mb-2">{t.sweetness}</p>
          <div className="flex flex-wrap gap-2">
            {SWEETNESS_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSweetness(opt.value)}
                className={`rounded-full px-3 py-1.5 text-xs transition border ${
                  sweetness === opt.value
                    ? "border-violet-400/40 bg-violet-500/15 text-violet-200"
                    : "border-white/10 bg-white/5 text-white/55 hover:border-white/20 hover:text-white/80"
                }`}
              >
                {lang === "jp" ? opt.jp : opt.en}
              </button>
            ))}
          </div>
        </div>

        {/* Likes input */}
        <div>
          <p className="text-xs text-white/60 mb-2">{t.likes}</p>
          <input
            className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25 transition"
            placeholder={lang === "jp" ? "柑橘系、フローラル" : "citrus, floral"}
            value={likesText}
            onChange={(e) => setLikesText(e.target.value)}
          />
        </div>
      </div>

      <label className="mt-1 block text-xs text-white/60">
        {t.avoid}
        <input
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25 transition"
          placeholder={lang === "jp" ? "苦味、スモーキー" : "bitter, smoky"}
          value={avoidText}
          onChange={(e) => setAvoidText(e.target.value)}
        />
      </label>

      <AnimatePresence mode="wait">
        <motion.div
          key={best.name.en}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="mt-4 neon-ring glow-border rounded-2xl bg-black/30 p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 flex-1 min-w-0">
              {(() => {
                const Icon = MENU_ICONS[MENU_ITEMS.indexOf(best)] ?? GlassWater;
                return (
                  <div className="rounded-lg p-1.5 bg-white/5 text-white/40 shrink-0 mt-0.5">
                    <Icon className="h-4 w-4" />
                  </div>
                );
              })()}
              <div className="flex-1 min-w-0">
              <div className="font-semibold text-white">
                {lang === "jp" ? best.name.jp : best.name.en}
              </div>
              <div className="mt-1 text-sm text-white/70">
                {lang === "jp" ? best.description.jp : best.description.en}
              </div>
              <div className="mt-2 text-xs text-white/50">
                {lang === "jp" ? BASE_LABELS[best.base].jp : BASE_LABELS[best.base].en}
                {" · "}
                {lang === "jp" ? SWEETNESS_LABELS[best.sweetness].jp : SWEETNESS_LABELS[best.sweetness].en}
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {best.tags.map((tag) => {
                  const label = TAG_LABELS[tag];
                  return (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-0.5 text-[11px] border border-cyan-400/20 bg-cyan-500/10 text-cyan-300/80 lowercase"
                    >
                      {label ? (lang === "jp" ? label.jp : label.en) : tag}
                    </span>
                  );
                })}
              </div>
            </div>
            </div>
            <div className="shrink-0 text-sm font-semibold neon-price">
              ¥{best.priceYen.toLocaleString("ja-JP")}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="mt-2 text-[11px] text-white/40">
        {t.tip}
      </div>
    </div>
  );
}