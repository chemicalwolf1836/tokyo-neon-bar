"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Instagram,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
} from "lucide-react";

type Lang = "en" | "jp";

const copy = {
  en: {
    brand: "NEON KISSA",
    nav: { menu: "Menu", reserve: "Reservations", access: "Access", about: "About" },
    hero: {
      kicker: "Tokyo Nightlife • Shinjuku",
      title: "A Cyber-Modern Cocktail Hideout",
      subtitle:
        "Tourist-friendly, bilingual, and designed for the neon nights. Walk-ins welcome — reservations recommended.",
      ctaPrimary: "Reserve a Seat",
      ctaSecondary: "View Menu",
      badges: ["EN/JP Friendly", "No Cover Charge*", "Late Night"],
      fineprint: "*Example text for demo purposes.",
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
      hint: "For demo: this form doesn’t send yet — we can connect it to email next.",
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
},
    footer: "Demo site • Built with Next.js + Tailwind + Framer Motion",
  },
  jp: {
    brand: "NEON KISSA",
    nav: { menu: "メニュー", reserve: "予約", access: "アクセス", about: "紹介" },
    hero: {
      kicker: "東京ナイトライフ • 新宿",
      title: "サイバー・モダンなカクテルバー",
      subtitle:
        "訪日外国人向けに見やすい二言語サイト。ウォークイン歓迎、予約推奨。",
      ctaPrimary: "予約する",
      ctaSecondary: "メニューを見る",
      badges: ["EN/JP対応", "チャージなし*", "深夜営業"],
      fineprint: "*デモ用の表記です。",
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
      hint: "デモ：送信機能は未接続（次にメール連携できます）。",
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
        "このデモは“訪日外国人を集客したいバー”向けの提案用デザインです。",
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

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const [submitted, setSubmitted] = useState(false);
  const t = useMemo(() => copy[lang], [lang]);

  return (
    <main className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 grid-scan" />

      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/30">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-white/80" />
            <span className="neon-text font-semibold tracking-wide">
              {t.brand}
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a className="hover:text-white" href="#menu">{t.nav.menu}</a>
            <a className="hover:text-white" href="#reserve">{t.nav.reserve}</a>
            <a className="hover:text-white" href="#access">{t.nav.access}</a>
            <a className="hover:text-white" href="#about">{t.nav.about}</a>
          </nav>

          <button
            onClick={() => setLang((p) => (p === "en" ? "jp" : "en"))}
            className="neon-ring rounded-full px-3 py-1.5 text-xs text-white/90 hover:text-white transition"
            aria-label="Toggle language"
          >
            {lang === "en" ? "JP" : "EN"}
          </button>
        </div>
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

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="neon-text mt-3 text-3xl md:text-5xl font-semibold tracking-tight"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-4 text-sm md:text-base text-[rgb(var(--muted))] max-w-2xl"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-6 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#reserve"
                className="neon-ring rounded-2xl px-5 py-3 text-sm font-medium bg-white/5 hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
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
              {t.hero.badges.map((b) => (
                <span
                  key={b}
                  className="rounded-full px-3 py-1 text-xs border border-white/10 bg-white/5 text-white/80"
                >
                  {b}
                </span>
              ))}
            </div>

            <p className="mt-3 text-xs text-white/45">{t.hero.fineprint}</p>
          </div>
        </div>
      </section>

      <Section id="menu" title={t.menu.title} subtitle={t.menu.subtitle}>
        <div className="grid md:grid-cols-2 gap-4">
          {t.menu.items.map((it) => (
            <motion.div
              key={it.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="glow-border rounded-2xl p-5 bg-white/5 hover:bg-white/7 transition neon-ring"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{it.name}</p>
                  <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                    {it.desc}
                  </p>
                </div>
                <p className="text-sm text-white/85">{it.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-5 text-sm text-white/60">{t.menu.note}</p>
      </Section>

      {/* ATMOSPHERE */}
<Section id="atmosphere" title={t.atmosphere.title} subtitle={t.atmosphere.subtitle}>
  <div className="grid md:grid-cols-2 gap-6">
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="glow-border neon-ring rounded-2xl overflow-hidden bg-white/5"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src="/images/gallery-1.jpg"
          alt="Neon skyline vibe"
          fill
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
      className="glow-border neon-ring rounded-2xl overflow-hidden bg-white/5"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src="/images/gallery-2*.jpg"
          alt="Tokyo neon architecture"
          fill
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
            <form
              onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
             }}
              className="space-y-3"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="text-sm">
                  <span className="text-white/80">{t.reserve.fields.name}</span>
                  <input
                    className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                    required
                  />
                </label>
                <label className="text-sm">
                  <span className="text-white/80">{t.reserve.fields.email}</span>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                    required
                  />
                </label>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <label className="text-sm">
                  <span className="text-white/80">{t.reserve.fields.date}</span>
                  <input
                    type="date"
                    className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                    required
                  />
                </label>
                <label className="text-sm">
                  <span className="text-white/80">{t.reserve.fields.time}</span>
                  <input
                    type="time"
                    className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                    required
                  />
                </label>
                <label className="text-sm">
                  <span className="text-white/80">{t.reserve.fields.guests}</span>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    defaultValue={2}
                    className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                    required
                  />
                </label>
              </div>

              <label className="text-sm block">
                <span className="text-white/80">{t.reserve.fields.message}</span>
                <textarea
                  rows={4}
                  className="mt-1 w-full rounded-xl bg-black/40 border border-white/10 px-3 py-2 outline-none focus:border-white/25"
                />
              </label>

              <button
                type="submit"
                className="w-full neon-ring rounded-2xl px-5 py-3 text-sm font-medium bg-white/5 hover:bg-white/10 transition"
              >
                {t.reserve.button}
              </button>

              {submitted ? (
               <div className="mt-2 rounded-xl border border-white/15 bg-white/10 p-3 text-sm text-white/85">
                ✅ Request received. We’ll reply by email shortly.
               <div className="mt-1 text-xs text-white/60">
                 (Demo mode — next step: connect this to the bar’s email.)
                 </div>
                </div>
               ) : (
                 <p className="text-xs text-white/55">{t.reserve.hint}</p>
               )}
            </form>
          </div>

          <div className="glow-border neon-ring rounded-2xl p-5 bg-white/5">
            <p className="text-sm text-white/80 font-medium">Why this sells</p>
            <ul className="mt-3 space-y-2 text-sm text-[rgb(var(--muted))]">
              <li>• Tourists understand the menu (EN/JP toggle).</li>
              <li>• Reservation inquiry increases conversion vs Instagram only.</li>
              <li>• Modern design makes the bar feel “worth visiting”.</li>
              <li>• You can upsell bilingual + SEO + booking integration.</li>
            </ul>
            <p className="mt-5 text-xs text-white/55">
              Next step (for real clients): connect this form to email (Resend) or a booking tool.
            </p>
          </div>
        </div>
      </Section>

      <Section id="access" title={t.access.title} subtitle={t.access.subtitle}>
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="glow-border neon-ring rounded-2xl p-5 bg-white/5 space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">Address</p>
                <p className="text-sm text-[rgb(var(--muted))]">{t.access.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">Hours</p>
                <p className="text-sm text-[rgb(var(--muted))]">{t.access.hours}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">Phone</p>
                <p className="text-sm text-[rgb(var(--muted))]">{t.access.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">Email</p>
                <p className="text-sm text-[rgb(var(--muted))]">{t.access.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Instagram className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="text-sm text-white/85">Instagram</p>
                <p className="text-sm text-[rgb(var(--muted))]">@neonkissa_tokyo (placeholder)</p>
              </div>
            </div>

            <p className="text-xs text-white/55">{t.access.mapNote}</p>
          </div>

          <div className="glow-border neon-ring rounded-2xl overflow-hidden bg-white/5">
            <iframe
              title="Map"
              className="w-full h-[320px] md:h-[380px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=139.6917%2C35.6895%2C139.7117%2C35.6995&layer=mapnik"
            />
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
              className="glow-border neon-ring rounded-2xl p-5 bg-white/5"
            >
              <p className="text-sm text-[rgb(var(--muted))]">{p}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <footer className="py-10">
        <div className="mx-auto max-w-6xl px-4 text-xs text-white/45">
          {t.footer}
        </div>
      </footer>
    </main>
  );
}
