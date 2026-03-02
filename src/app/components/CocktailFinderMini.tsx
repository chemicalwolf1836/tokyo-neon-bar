"use client";

import { useMemo, useState } from "react";
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

  // Mood match
  if (item.vibes.includes(prefs.mood)) score += 3;

  // Sweetness match
  if (prefs.sweetness !== "any") {
    if (item.sweetness === prefs.sweetness) score += 2;
    else score -= 1;
  }

  // Likes tags
  for (const like of prefs.likes) {
    if (item.tags.includes(like)) score += 2;
    if (item.description.toLowerCase().includes(like)) score += 1;
    if (item.name.toLowerCase().includes(like)) score += 1;
  }

  // Avoid tags (heavy penalty)
  for (const bad of prefs.avoid) {
    if (item.tags.includes(bad) || item.description.toLowerCase().includes(bad)) score -= 5;
  }

  return score;
}

export default function CocktailFinderMini ({ t }: { t: any })  {
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
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-white">{t.title}</div>
        <div className="text-xs text-white/60">{t.bestMatch}</div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <label className="text-xs text-white/70">
          {t.mood}
          <select
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none"
            value={mood}
            onChange={(e) => setMood(e.target.value as Mood)}
          >
            <option value="after-work">After-work</option>
            <option value="chill">Chill</option>
            <option value="romantic">Romantic</option>
            <option value="party">Party</option>
          </select>
        </label>

        <label className="text-xs text-white/70">
          {t.sweetness}
          <select
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white outline-none"
            value={sweetness}
            onChange={(e) => setSweetness(e.target.value as Sweetness)}
          >
            <option value="any">Any</option>
            <option value="dry">Dry</option>
            <option value="balanced">Balanced</option>
            <option value="sweet">Sweet</option>
          </select>
        </label>

        <label className="text-xs text-white/70">
          {t.likes}
          <input
            className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none"
            placeholder="citrus, floral, coffee"
            value={likesText}
            onChange={(e) => setLikesText(e.target.value)}
          />
        </label>
      </div>

      <label className="mt-3 block text-xs text-white/70">
        {t.avoid}
        <input
          className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none"
          placeholder="bitter, smoky, strong"
          value={avoidText}
          onChange={(e) => setAvoidText(e.target.value)}
        />
      </label>

      <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="font-semibold text-white">{best.name}</div>
            <div className="mt-1 text-sm text-white/70">{best.description}</div>
            <div className="mt-2 text-xs text-white/60">
              {best.base} • {best.sweetness}
            </div>
          </div>
          <div className="shrink-0 text-sm font-semibold text-white/80">
            ¥{best.priceYen.toLocaleString("ja-JP")}
          </div>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-white/50">
        {t.tip}
      </div>
    </div>
  );
}