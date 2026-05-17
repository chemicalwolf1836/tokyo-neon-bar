"use client";
import CocktailFinderMini from "@/app/components/CocktailFinderMini";
import DrinkModal from "@/app/components/DrinkModal";
import GalleryLightbox from "@/app/components/GalleryLightbox";
import { MENU_ITEMS } from "@/app/data/menu";
import type { MenuItem } from "@/app/data/menu";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Instagram,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  Menu,
  X,
  GlassWater,
  Flower2,
  Moon,
  Coffee,
  ArrowUp,
  Globe,
  Star,
  CreditCard,
  CheckCircle,
} from "lucide-react";

type Lang = "en" | "jp";

const copy = {
  en: {
    brand: "NEON KISSA",
    nav: { menu: "Menu", reserve: "Reservations", access: "Access", about: "About" },
    hero: {
      kicker: "Tokyo Nightlife • Shinjuku",
      title: "A Cyber-Modern Cocktail Hideout",
      subtitleLine1: "Tourist-friendly, bilingual, and designed for the neon nights.",
      subtitleLine2: "Walk-ins welcome — reservations recommended.",
      ctaPrimary: "Reserve a Seat",
      ctaSecondary: "View Menu",
      badges: ["EN/JP Friendly", "No Cover Charge*", "Late Night"],
      fineprint: "*Example text for demo purposes.",
    },
    trust: {
       rating: "4.9 / 5",
       reviews: "120+ reviews",
       badges: ["English Friendly", "Tourist Approved", "Cashless OK", "Late Night"],
       },
    menu: {
      title: "Signature Menu",
      subtitle: "Simple, readable, and mobile-first. Perfect for tourists.",
      items: [
        { name: "Neon Highball", desc: "Citrus, soda, smoked ice", price: "¥1,200" },
        { name: "Shinjuku Bloom", desc: "Gin, yuzu, tonic, floral bitters", price: "¥1,600" },
        { name: "Midnight Ume", desc: "Umeshu, plum, spice, lime", price: "¥1,400" },
        { name: "Cyber Espresso", desc: "Vodka, coffee, cocoa, velvet foam", price: "¥1,700" },
      ],

      note: "Allergy info available on request.",
    },

finder: {
    title: "Cocktail Finder",
    bestMatch: "1 best match",
    mood: "Mood",
    sweetness: "Sweetness",
    likes: "Likes (optional)",
    avoid: "Avoid (optional)",
    tip: 'Tip: try "yuzu", "coffee", "plum", "sparkling".'
   },

    reserve: {
      title: "Reservations",
      subtitle:
        "Fast inquiry form. Real bars love this because it turns tourists into bookings.",
      fields: {
        name: "Name",
        email: "Email",
        date: "Date",
        time: "Time",
        guests: "Guests",
        message: "Message (optional)",
      },
      button: "Send Request",
      hint: "We respond to all requests within 24 hours.",
      successMsg: "We’ll be in touch shortly to confirm your reservation.",
    },
    access: {
      title: "Access",
      subtitle: "Clear directions + Google Maps = more walk-ins.",
      address: "1-2-3 Shinjuku, Shinjuku-ku, Tokyo (Demo Address)",
      hours: "Daily 18:00 – 03:00",
      phone: "+81 00-0000-0000",
      email: "hello@neonkissa.jp",
      mapNote:
        "Replace the map embed with your real location once you have the client.",
    },
    about: {
      title: "About",
      subtitle:
        "This demo is designed to sell to Tokyo bars targeting foreign visitors.",
      points: [
        "Bilingual toggle (EN/JP) so tourists understand the vibe, menu, and rules.",
        "Modern layout, neon brand style, and smooth motion for premium feel.",
        "Reservation funnel + Maps + Instagram — the conversion trifecta.",
      ],
    },
    atmosphere: {
    title: "Atmosphere",
    subtitle: "A quick look at the vibe before you book.",
   },
   info: {
   title: "Tourist Info",
   subtitle: "Clear rules and details reduce hesitation and increase bookings.",
   items: [
    { label: "Cover", value: "No cover charge (example) / Seat charge may apply" },
    { label: "Payment", value: "Cash + card accepted (example)" },
    { label: "Smoking", value: "Smoking policy varies (example)" },
    { label: "Last Entry", value: "Last entry 02:00 (example)" },
    { label: "Language", value: "English-friendly staff (example)" },
  ],
   trust: {
   rating: "4.9 / 5",
   reviews: "120+ reviews",
   badges: [
    "English Friendly",
    "Tourist Approved",
    "Cashless OK",
    "Late Night",
   ],
 },
},
    footer: "Demo site • Built with Next.js + Tailwind + Framer Motion",
  },
  jp: {
    brand: "NEON KISSA",
    nav: { menu: "メニュー", reserve: "予約", access: "アクセス", about: "紹介" },
    hero: {
      kicker: "東京ナイトライフ • 新宿",
      title: "サイバー・モダンなカクテルバー",
      subtitleLine1:"訪日外国人向けに見やすい二言語サイト。",
      subtitleLine2:"ウォークイン歓迎、予約推奨。 ",
      ctaPrimary: "予約する",
      ctaSecondary: "メニューを見る",
      badges: ["EN/JP対応", "チャージなし*", "深夜営業"],
      fineprint: "*デモ用の表記です。",
 },
     trust: {
      rating: "4.9 / 5",
      reviews: "レビュー 120件以上",
      badges: ["英語対応", "外国人歓迎", "キャッシュレス可", "深夜営業"],
    },
    menu: {
      title: "シグネチャーメニュー",
      subtitle: "スマホで読みやすい、外国人向けの設計。",
      items: [
        { name: "ネオン・ハイボール", desc: "シトラス、ソーダ、スモークアイス", price: "¥1,200" },
        { name: "新宿ブルーム", desc: "ジン、柚子、トニック、ビターズ", price: "¥1,600" },
        { name: "ミッドナイト梅", desc: "梅酒、プラム、スパイス、ライム", price: "¥1,400" },
        { name: "サイバー・エスプレッソ", desc: "ウォッカ、コーヒー、ココア、フォーム", price: "¥1,700" },
      ],
      note: "アレルギー情報はスタッフへお声がけください。",
    },
    finder: {
  title: "カクテル診断",
  bestMatch: "おすすめ 1杯",
  mood: "気分",
  sweetness: "甘さ",
  likes: "好きな味（任意）",
  avoid: "避けたい味（任意）",
  tip: "ヒント：「ゆず」「コーヒー」「梅」「スパークリング」など"
},
    reserve: {
      title: "予約",
      subtitle:
        "問い合わせフォームで予約導線を作ると、観光客の来店率が上がります。",
      fields: {
        name: "お名前",
        email: "メール",
        date: "日付",
        time: "時間",
        guests: "人数",
        message: "メッセージ（任意）",
      },
      button: "送信",
      hint: "ご予約リクエストには24時間以内に返信します。",
      successMsg: "まもなくご予約の確認ご連絡をお送りします。",
    },
    access: {
      title: "アクセス",
      subtitle: "地図＋道案内＝迷わず来店。",
      address: "東京都新宿区 新宿1-2-3（デモ住所）",
      hours: "毎日 18:00 – 03:00",
      phone: "+81 00-0000-0000",
      email: "hello@neonkissa.jp",
      mapNote: "実案件ではGoogleマップ埋め込みを実住所に差し替えます。",
    },
    about: {
      title: "紹介",
      subtitle:
        "このデモは\"訪日外国人を集客したいバー\"向けの提案用デザインです。",
      points: [
        "EN/JP切替で、雰囲気・ルール・メニューが伝わる。",
        "ネオン系ブランド表現＋滑らかなモーションで高級感。",
        "予約導線＋地図＋Instagramで集客に強い。",
      ],
    },
    atmosphere: {
    title: "雰囲気",
    subtitle: "予約前にお店の空気感をチェック。",
    },
   info: {
   title: "ご案内",
   subtitle: "ルールや詳細が分かると、予約につながりやすくなります。",
   items: [
     { label: "チャージ", value: "チャージなし（例）/ 席料がかかる場合あり" },
     { label: "支払い", value: "現金・カード可（例）" },
     { label: "喫煙", value: "喫煙ルールは店舗による（例）" },
     { label: "最終入店", value: "最終入店 02:00（例）" },
     { label: "言語", value: "英語対応可（例）" },
   ],
    trust: {
    rating: "4.9 / 5",
    reviews: "レビュー 120件以上",
    badges: [
     "英語対応",
     "外国人歓迎",
     "キャッシュレス可",
     "深夜営業",
   ],
   },
   },

    footer: "デモサイト • Next.js + Tailwind + Framer Motion",
  },
} as const;

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-14 md:py-18">
      <div className="mx-auto w-full max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-8"
        >
          <div className="neon-line mb-3" />
          <h2 className="neon-text text-2xl md:text-3xl font-semibold tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-2 text-sm md:text-base text-[rgb(var(--muted))] max-w-2xl">
              {subtitle}
            </p>
          ) : null}
        </motion.div>

        {children}
      </div>
    </section>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white/80"
      aria-label="Loading"
    />
  );
}

function StatusBanner({
  variant,
  children,
}: {
  variant: "success" | "error";
  children: React.ReactNode;
}) {
  const base =
    "mt-3 rounded-xl border px-3 py-2 text-sm flex items-start gap-2";
  const styles =
    variant === "success"
      ? "border-cyan-400/25 bg-cyan-500/10 text-cyan-200"
      : "border-pink-400/30 bg-pink-500/10 text-pink-200";

  return <div className={`${base} ${styles}`}>{children}</div>;
}

const THEMES = [
  { key: "dark",    label: "Dark",      swatch: "#3a3844" },
  { key: "blue",    label: "Blue Hour", swatch: "#1a5aaa" },
  { key: "emerald", label: "Emerald",   swatch: "#00cc66" },
  { key: "crimson", label: "Crimson",   swatch: "#cc1133" },
  { key: "teal",    label: "Teal",      swatch: "#00aa99" },
  { key: "gold",    label: "Gold",      swatch: "#ccaa33" },
] as const;
type Theme = typeof THEMES[number]["key"];

const GALLERY = [
  { src: "/images/gallery-1.jpg", alt: "Neon skyline vibe" },
  { src: "/images/gallery-2.jpg", alt: "Tokyo neon architecture" },
];

function validateField(name: string, value: string, lang: Lang): string {
  const today = new Date().toISOString().split("T")[0];
  switch (name) {
    case "name":   return value.trim().length < 2 ? (lang === "jp" ? "お名前を入力してください" : "Name is required") : "";
    case "email":  return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? (lang === "jp" ? "有効なメールを入力してください" : "Valid email required") : "";
    case "date":   return !value ? (lang === "jp" ? "日付を選んでください" : "Date required") : value < today ? (lang === "jp" ? "過去の日付は選べません" : "Pick a future date") : "";
    case "time":   return !value ? (lang === "jp" ? "時間を選んでください" : "Time required") : "";
    case "guests": { const n = parseInt(value); return isNaN(n) || n < 1 || n > 12 ? (lang === "jp" ? "1〜12名で入力してください" : "Enter 1–12 guests") : ""; }
    default:       return "";
  }
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const [submitted, setSubmitted] = useState(false);
  const t = useMemo(() => copy[lang], [lang]);
  const [reserveStatus, setReserveStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [reserveError, setReserveError] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [selectedDrink, setSelectedDrink] = useState<{ item: MenuItem; icon: LucideIcon } | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["menu", "reserve", "access", "about"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("nk-theme") as Theme | null;
    if (saved && THEMES.some((t) => t.key === saved)) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("nk-theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("nk-lang") as Lang | null;
    if (saved === "en" || saved === "jp") setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("nk-lang", lang);
    document.documentElement.lang = lang === "jp" ? "ja" : "en";
  }, [lang]);

  useEffect(() => {
    if (!themeOpen) return;
    const close = (e: MouseEvent) => {
      if (!(e.target as Element).closest("[data-theme-picker]")) setThemeOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [themeOpen]);

async function handleReserveSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setFieldErrors({});
  setReserveStatus("loading");
  setReserveError("");

  const form = e.currentTarget;
  const formData = new FormData(form);

  const payload = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    date: String(formData.get("date") ?? ""),
    time: String(formData.get("time") ?? ""),
    guests: String(formData.get("guests") ?? ""),
    message: String(formData.get("message") ?? ""),
    company: String(formData.get("company") ?? ""), // add honeypot field to catch bots (should be empty)
  };

  const nextErrors: Record<string, string> = {};
  for (const field of ["name", "email", "date", "time", "guests"] as const) {
    const err = validateField(field, payload[field], lang);
    if (err) nextErrors[field] = err;
  }

if (Object.keys(nextErrors).length > 0) {
  setFieldErrors(nextErrors);
  setReserveStatus("error");
  setReserveError("Please fix the highlighted fields.");
  return;
}

  try {
    const res = await fetch("/api/reserve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      setReserveStatus("error");
      setReserveError(data?.error ?? "Something went wrong.");
      return;
    }

    setReserveStatus("success");
    form.reset();
  } catch {
    setReserveStatus("error");
    setReserveError("Network error. Please try again.");
  }
}

  return (
    <main className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-scan" />

      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/30">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="neon-sign flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-white/80" />
            <span className="neon-text font-semibold tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>
              {t.brand}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {[
              { href: "#menu", label: t.nav.menu, id: "menu" },
              { href: "#reserve", label: t.nav.reserve, id: "reserve" },
              { href: "#access", label: t.nav.access, id: "access" },
              { href: "#about", label: t.nav.about, id: "about" },
            ].map(({ href, label, id }) => (
              <a
                key={id}
                href={href}
                className={`transition ${activeSection === id ? "text-cyan-300" : "text-white/60 hover:text-white"}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="relative" data-theme-picker>
              <button
                onClick={(e) => { e.stopPropagation(); setThemeOpen((p) => !p); }}
                className="neon-ring rounded-full px-3 py-1.5 text-xs text-white/90 hover:text-white transition"
                aria-label="Choose theme"
              >
                ◐
              </button>
              {themeOpen && (
                <div
                  className="absolute right-0 top-9 z-50 rounded-xl border border-white/10 bg-black/85 backdrop-blur-sm p-2 flex gap-2"
                  data-theme-picker
                >
                  {THEMES.map((th) => (
                    <button
                      key={th.key}
                      onClick={() => { setTheme(th.key); setThemeOpen(false); }}
                      className={`w-6 h-6 rounded-full border-2 transition hover:scale-110 ${theme === th.key ? "border-white/70 scale-110" : "border-transparent hover:border-white/30"}`}
                      style={{ background: th.swatch }}
                      title={th.label}
                    />
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setLang((p) => (p === "en" ? "jp" : "en"))}
              className="neon-ring rounded-full px-3 py-1.5 text-xs text-white/90 hover:text-white transition"
              aria-label="Toggle language"
            >
              {lang === "en" ? "JP" : "EN"}
            </button>
            <button
              onClick={() => setMenuOpen((p) => !p)}
              className="md:hidden p-1.5 text-white/70 hover:text-white transition"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/10 bg-black/60 backdrop-blur-md"
            >
              <div className="flex flex-col px-4 py-3 gap-1">
                {[
                  { href: "#menu", label: t.nav.menu, id: "menu" },
                  { href: "#reserve", label: t.nav.reserve, id: "reserve" },
                  { href: "#access", label: t.nav.access, id: "access" },
                  { href: "#about", label: t.nav.about, id: "about" },
                ].map(({ href, label, id }) => (
                  <a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-2.5 text-sm border-b border-white/5 last:border-0 transition ${activeSection === id ? "text-cyan-300" : "text-white/75 hover:text-white"}`}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="relative pt-14 md:pt-20 pb-10">
        <div className="mx-auto w-full max-w-6xl px-4">
          <div className="glow-border neon-ring rounded-3xl p-6 md:p-10 bg-[rgba(16,16,22,0.55)]">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xs md:text-sm text-white/70 tracking-wide"
            >
              {t.hero.kicker}
            </motion.p>

            <div className="neon-line mt-4 mb-1" />
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="neon-text mt-3 text-3xl md:text-5xl font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-4 text-sm md:text-base text-[rgb(var(--muted))] max-w-2xl"
            >
              <>
             {t.hero.subtitleLine1}
             <br />
             <span className="text-white/60">
             {t.hero.subtitleLine2}
             </span>
</>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#reserve"
                className="neon-ring rounded-2xl px-5 py-3 text-sm font-medium bg-cyan-500/10 border border-cyan-400/25 hover:bg-cyan-500/20 text-cyan-100 transition inline-flex items-center justify-center gap-2"
              >
                {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#menu"
                className="rounded-2xl px-5 py-3 text-sm font-medium border border-white/15 hover:border-white/25 transition inline-flex items-center justify-center"
              >
                {t.hero.ctaSecondary}
              </a>
            </motion.div>

            <div className="mt-6 flex flex-wrap gap-2">
              {t.hero.badges.map((b, i) => (
                <span
                  key={b}
                  className={`rounded-full px-3 py-1 text-xs ${
                    i === 0
                      ? "border border-cyan-400/30 bg-cyan-500/10 text-cyan-200"
                      : i === 1
                      ? "border border-pink-400/30 bg-pink-500/10 text-pink-200"
                      : "border border-violet-400/30 bg-violet-500/10 text-violet-200"
                  }`}
                >
                  {b}
                </span>
              ))}
            </div>

            <p className="mt-3 text-xs text-white/45">{t.hero.fineprint}</p>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
    <section className="border-y border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-8 text-center">

       <div className="flex flex-col md:flex-row items-center justify-center gap-6">

      {/* Rating */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-3"
      >
        <div className="text-yellow-400 text-xl">★★★★★</div>
        <div>
          <div className="font-semibold text-white">{t.trust.rating}</div>
          <div className="text-xs text-white/60">{t.trust.reviews}</div>
        </div>
      </motion.div>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-3">
        {t.trust.badges.map((badge: string, i: number) => {
          const icons = [Globe, Star, CreditCard, Moon];
          const Icon = icons[i] ?? Globe;
          return (
            <motion.span
              key={badge}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs rounded-full bg-white/10 border border-white/20 text-white/80"
            >
              <Icon className="h-3 w-3 text-white/50" />
              {badge}
            </motion.span>
          );
        })}
      </div>

    </div>
  </div>
</section>

      <Section id="menu" title={t.menu.title} subtitle={t.menu.subtitle}>
        {(() => {
          const menuIcons = [GlassWater, Flower2, Moon, Coffee];
          return (
        <div className="grid md:grid-cols-2 gap-4">
          {t.menu.items.map((it, i) => {
            const Icon = menuIcons[i];
            return (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => setSelectedDrink({ item: MENU_ITEMS[i], icon: Icon })}
              className="glow-border rounded-2xl p-5 bg-white/5 hover:bg-white/7 transition neon-ring transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg p-1.5 bg-white/5 text-white/40">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{it.name}</p>
                    <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                      {it.desc}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium neon-price shrink-0">{it.price}</p>
              </div>
            </motion.div>
            );
          })}
        </div>
          );
        })()}

       {/* Cocktail Finder */}
<div className="mt-8 flex justify-center">
  <div className="max-auto w-full max-w-3xl">
    <CocktailFinderMini t={t} lang={lang} />


  </div>
</div>

        <p className="mt-6 text-sm text-white/60 text-center">{t.menu.note}</p>
      </Section>

      {/* ATMOSPHERE */}
<Section id="atmosphere" title={t.atmosphere.title} subtitle={t.atmosphere.subtitle}>
  <div className="grid md:grid-cols-2 gap-6">
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="glow-border neon-ring rounded-2xl overflow-hidden bg-white/5 transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
      onClick={() => setLightboxIndex(0)}
    >
      <div className="relative aspect-[16/10]">
        <Image
          src="/images/gallery-1.jpg"
          alt="Neon skyline vibe"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAMklEQVQIW2NkYGD4z8BQDwAEhgF/AwMD/38GBgYGJgYGBv8MDAwMTAwMDP8ZGBj+AwALOgQFcp0rNAAAAABJRU5ErkJggg=="
          className="object-cover transition duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.05 }}
      className="glow-border neon-ring rounded-2xl overflow-hidden bg-white/5 transition-transform duration-300 hover:scale-[1.01] cursor-pointer"
      onClick={() => setLightboxIndex(1)}
    >
      <div className="relative aspect-[16/10]">
        <Image
          src="/images/gallery-2.jpg"
          alt="Tokyo neon architecture"
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAMklEQVQIW2NkYGD4z8BQDwAEhgF/AwMD/38GBgYGJgYGBv8MDAwMTAwMDP8ZGBj+AwALOgQFcp0rNAAAAABJRU5ErkJggg=="
          className="object-cover transition duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>
    </motion.div>
  </div>
</Section>

      <Section id="reserve" title={t.reserve.title} subtitle={t.reserve.subtitle}>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glow-border neon-ring rounded-2xl p-5 bg-white/5">
            <AnimatePresence mode="wait">
              {reserveStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="py-8 text-center"
                >
                  <div className="mb-5 flex justify-center">
                    <div className="rounded-full p-3 bg-cyan-500/15 border border-cyan-400/30">
                      <CheckCircle className="h-8 w-8 text-cyan-300" />
                    </div>
                  </div>
                  <h3 className="neon-text font-semibold text-lg mb-2">
                    {lang === "jp" ? "予約リクエストを送信しました" : "Request Sent"}
                  </h3>
                  <p className="text-sm text-white/60 mb-6">{t.reserve.successMsg}</p>
                  <button
                    onClick={() => setReserveStatus("idle")}
                    className="text-xs text-white/40 hover:text-white/70 transition border border-white/10 rounded-full px-4 py-1.5"
                  >
                    {lang === "jp" ? "別の予約をする" : "Make another reservation"}
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleReserveSubmit}
                  className="space-y-3"
                >
                  {/* Honeypot (anti-spam): humans won’t see this */}
                  <div className="hidden">
                    <label>
                      Company
                      <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <fieldset
                    disabled={reserveStatus === "loading"}
                    className="space-y-3 disabled:opacity-80 disabled:cursor-not-allowed"
                  >
                    <div className="grid sm:grid-cols-2 gap-3">
                      <label className="text-sm">
                        <span className="text-white/80">{t.reserve.fields.name}</span>
                        <input
                          name="name"
                          className={`mt-1 w-full rounded-xl bg-black/40 px-3 py-2 outline-none transition text-sm text-white placeholder:text-white/30 border ${fieldErrors.name ? "border-pink-400/50 focus:border-pink-400/60 focus:shadow-[0_0_0_2px_rgba(255,0,153,0.10)]" : "border-white/10 focus:border-cyan-400/40 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.10),0_0_12px_rgba(0,229,255,0.08)]"}`}
                          required
                          onBlur={(e) => setFieldErrors(prev => ({ ...prev, name: validateField("name", e.target.value, lang) }))}
                        />
                        {fieldErrors.name && <p className="mt-1 text-xs text-pink-400/80">{fieldErrors.name}</p>}
                      </label>
                      <label className="text-sm">
                        <span className="text-white/80">{t.reserve.fields.email}</span>
                        <input
                          name="email"
                          type="email"
                          className={`mt-1 w-full rounded-xl bg-black/40 px-3 py-2 outline-none transition text-sm text-white placeholder:text-white/30 border ${fieldErrors.email ? "border-pink-400/50 focus:border-pink-400/60 focus:shadow-[0_0_0_2px_rgba(255,0,153,0.10)]" : "border-white/10 focus:border-cyan-400/40 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.10),0_0_12px_rgba(0,229,255,0.08)]"}`}
                          required
                          onBlur={(e) => setFieldErrors(prev => ({ ...prev, email: validateField("email", e.target.value, lang) }))}
                        />
                        {fieldErrors.email && <p className="mt-1 text-xs text-pink-400/80">{fieldErrors.email}</p>}
                      </label>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-3">
                      <label className="text-sm">
                        <span className="text-white/80">{t.reserve.fields.date}</span>
                        <input
                          name="date"
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          className={`mt-1 w-full rounded-xl bg-black/40 pl-3 pr-8 py-2 outline-none transition text-sm text-white border ${fieldErrors.date ? "border-pink-400/50 focus:border-pink-400/60 focus:shadow-[0_0_0_2px_rgba(255,0,153,0.10)]" : "border-white/10 focus:border-cyan-400/40 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.10),0_0_12px_rgba(0,229,255,0.08)]"}`}
                          required
                          onBlur={(e) => setFieldErrors(prev => ({ ...prev, date: validateField("date", e.target.value, lang) }))}
                        />
                        {fieldErrors.date && <p className="mt-1 text-xs text-pink-400/80">{fieldErrors.date}</p>}
                      </label>
                      <label className="text-sm">
                        <span className="text-white/80">{t.reserve.fields.time}</span>
                        <input
                          name="time"
                          type="time"
                          className={`mt-1 w-full rounded-xl bg-black/40 pl-3 pr-8 py-2 outline-none transition text-sm text-white border ${fieldErrors.time ? "border-pink-400/50 focus:border-pink-400/60 focus:shadow-[0_0_0_2px_rgba(255,0,153,0.10)]" : "border-white/10 focus:border-cyan-400/40 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.10),0_0_12px_rgba(0,229,255,0.08)]"}`}
                          required
                          onBlur={(e) => setFieldErrors(prev => ({ ...prev, time: validateField("time", e.target.value, lang) }))}
                        />
                        {fieldErrors.time && <p className="mt-1 text-xs text-pink-400/80">{fieldErrors.time}</p>}
                      </label>
                      <label className="text-sm">
                        <span className="text-white/80">{t.reserve.fields.guests}</span>
                        <input
                          name="guests"
                          type="number"
                          min={1}
                          max={12}
                          defaultValue={2}
                          className={`mt-1 w-full rounded-xl bg-black/40 px-3 py-2 outline-none transition text-sm text-white border ${fieldErrors.guests ? "border-pink-400/50 focus:border-pink-400/60 focus:shadow-[0_0_0_2px_rgba(255,0,153,0.10)]" : "border-white/10 focus:border-cyan-400/40 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.10),0_0_12px_rgba(0,229,255,0.08)]"}`}
                          required
                          onBlur={(e) => setFieldErrors(prev => ({ ...prev, guests: validateField("guests", e.target.value, lang) }))}
                        />
                        {fieldErrors.guests && <p className="mt-1 text-xs text-pink-400/80">{fieldErrors.guests}</p>}
                      </label>
                    </div>

                    <label className="text-sm block">
                      <span className="text-white/80">{t.reserve.fields.message}</span>
                      <textarea
                        rows={4}
                        name="message"
                        className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none transition text-sm text-white placeholder:text-white/30 focus:border-cyan-400/40 focus:shadow-[0_0_0_2px_rgba(0,229,255,0.10),0_0_12px_rgba(0,229,255,0.08)]"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={reserveStatus === "loading"}
                      className="neon-ring rounded-full px-5 py-2 text-sm text-white/90 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                    >
                      {reserveStatus === "loading" && <Spinner />}
                      {reserveStatus === "loading" ? "Sending..." : "Request Reservation"}
                    </button>
                  </fieldset>

                  {reserveStatus === "idle" && (
                    <p className="text-xs text-white/55">{t.reserve.hint}</p>
                  )}

                  {reserveStatus === "error" && (
                    <div className="animate-[fadeIn_250ms_ease-out]">
                      <StatusBanner variant="error">
                        <span className="shrink-0">❌</span>
                        <span>{reserveError || "Something went wrong."}</span>
                      </StatusBanner>
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="glow-border neon-ring rounded-2xl p-5 bg-white/5 transition-transform duration-300 hover:scale-[1.01]">
            <p className="text-sm text-white/80 font-medium">
  {lang === "jp" ? "なぜこのサイトが効果的なのか" : "Why this sells"}
</p>

<ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
  <li>
    {lang === "jp"
      ? "観光客でもメニューを理解できる（EN / JP 切り替え）。"
      : "Tourists understand the menu (EN/JP toggle)."}
  </li>

  <li>
    {lang === "jp"
      ? "予約フォームによりInstagramだけよりも来店率が上がる。"
      : "Reservation inquiry increases conversion vs Instagram only."}
  </li>

  <li>
    {lang === "jp"
      ? "モダンなデザインで『行ってみたいバー』という印象を作る。"
      : "Modern design makes the bar feel 'worth visiting'."}
  </li>

  <li>
    {lang === "jp"
      ? "多言語対応 + SEO + 予約システムの拡張が可能。"
      : "You can upsell bilingual + SEO + booking integration."}
  </li>
</ul>

<p className="mt-5 text-xs text-white/55">
  {lang === "jp"
    ? "次のステップ（実際のクライアント向け）：このフォームをメール（Resend）や予約システムに接続します。"
    : "Next step (for real clients): connect this form to email (Resend) or a booking tool."}
</p>

          </div>
        </div>
      </Section>

      {/* TOURIST INFO */}
 <Section id="info" title={t.info.title} subtitle={t.info.subtitle}>
   <div className="grid md:grid-cols-2 gap-4">
     {t.info.items.map((it: { label: string; value: string }) => (
       <div
         key={it.label}
         className="glow-border neon-ring rounded-2xl p-5 bg-white/5 transition-transform duration-300 hover:scale-[1.01]"
      >
         <p className="text-sm text-white/80">{it.label}</p>
         <p className="mt-1 text-sm text-[rgb(var(--muted))]">{it.value}</p>
       </div>
     ))}
  </div>

  <p className="mt-5 text-xs text-white/55">
    {lang === "jp"
  ? "※実際の店舗では、チャージ・喫煙ルール・支払い方法・ラストオーダーなどを確認します。"
  : "Tip: For real clients, we'll confirm their exact rules (cover charge, smoking, payment, last entry)."}
  </p>
</Section>

      <Section id="access" title={t.access.title} subtitle={t.access.subtitle}>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glow-border neon-ring rounded-2xl p-5 bg-white/5 space-y-3 transition-transform duration-300 hover:scale-[1.01]">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">{lang === "jp" ? "住所" : "Address"}</p>
                <p className="text-sm text-[rgb(var(--muted))]">{t.access.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">{lang === "jp" ? "営業時間" : "Hours"}</p>
                <p className="text-sm text-[rgb(var(--muted))]">{t.access.hours}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">{lang === "jp" ? "電話番号" : "Phone"}</p>
                <p className="text-sm text-[rgb(var(--muted))]">{t.access.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">{lang === "jp" ? "メール" : "Email"}</p>
                <p className="text-sm text-[rgb(var(--muted))]">{t.access.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Instagram className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">{lang === "jp" ? "インスタグラム" : "Instagram"}</p>
                <p className="text-sm text-[rgb(var(--muted))]">@neonkissa_tokyo (placeholder)</p>
              </div>
            </div>

            <p className="text-xs text-white/55">{t.access.mapNote}</p>
          </div>

          {/* MAP */}
<div className="glow-border rounded-2xl overflow-hidden bg-white/5 transition-transform duration-300 hover:scale-[1.01]">
  <div className="aspect-[16/10] w-full">
    <iframe
      title="Google Map"
      src= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25920.009904762024!2d139.6885976981374!3d35.701587145136834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188d2059b7fd4b%3A0xec61c68fe232efd2!2sShinjuku%20City%2C%20Tokyo!5e0!3m2!1sen!2sjp!4v1771945764616!5m2!1sen!2sjp" 
      className="w-full h-full"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  </div>

  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-t border-white/10">
    <div className="text-sm text-white/70">
      {/* Replace text later with your real address details */}
      {lang === "jp"
  ? "新宿駅・徒歩4分"
  : "Shinjuku Station • 4 min walk"}
    </div>

    <a
      href= "https://www.google.com/maps/place/Shinjuku+City,+Tokyo/@35.7015871,139.6885977,15z/data=!3m1!4b1!4m5!3m4!1s0x60188d2059b7fd4b:0xec61c68fe232efd2!8m2!3d35.6938401!4d139.7035494?hl=en"
      target="_blank"
      rel="noreferrer"
      className="neon-ring rounded-full px-4 py-2 text-xs text-white/85 hover:text-white transition w-fit"
    >
      {lang === "jp"
  ? "Googleマップで開く →"
  : "Open in Google Maps →"}
    </a>
  </div>
</div>
        </div>
      </Section>

      <Section id="about" title={t.about.title} subtitle={t.about.subtitle}>
        <div className="grid md:grid-cols-3 gap-4">
          {t.about.points.map((p) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="glow-border neon-ring rounded-2xl p-5 bg-white/5 transition-transform duration-300 hover:scale-[1.01]"
            >
              <p className="text-sm text-[rgb(var(--muted))]">{p}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      <footer className="border-t border-white/10 mt-16 py-10 text-center">
        <div className="mx-auto max-w-6xl px-4">
          <div className="neon-line mx-auto mb-6" />
          <div className="flex items-center justify-center gap-5 mb-4">
            <a href="#" aria-label="Instagram" className="text-white/40 hover:text-cyan-300 transition">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} NEON KISSA • Built with Next.js + Tailwind
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 neon-ring rounded-full p-3 bg-black/60 backdrop-blur-sm text-white/70 hover:text-white transition"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <DrinkModal
        item={selectedDrink?.item ?? null}
        icon={selectedDrink?.icon ?? null}
        lang={lang}
        onClose={() => setSelectedDrink(null)}
      />
      <GalleryLightbox
        images={GALLERY}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </main>
  );
}
