// src/app/data/menu.ts

export type MenuItem = {
  name: {
    en:string;
    jp: string
  };
  description: {
    en:string;
    jp:string;
  };

  priceYen: number;
  base: "whiskey" | "gin" | "vodka" | "umeshu";
  sweetness: "dry" | "balanced" | "sweet";
  vibes: Array<"chill" | "party" | "romantic" | "after-work">;
  tags: string[];
};

export const MENU_ITEMS: MenuItem[] = [
  {
  name: {
    en: "Neon Highball",
    jp: "ネオン・ハイボール"
  },

  description: {
    en: "Citrus, soda, smoked ice",
    jp: "柑橘、ソーダ、スモークアイス"
  },
    priceYen: 1200,
    base: "whiskey",
    sweetness: "balanced",
    vibes: ["after-work", "chill"],
    tags: ["citrus", "sparkling", "refreshing", "light", "smoky"],
  },
  {
  name: {
    en: "Shinjuku Bloom",
    jp: "新宿ブルーム",
  },
  priceYen: 1600,
  description: {
    en: "Gin, yuzu, tonic, floral bitters",
    jp: "ジン、ゆず、トニック、フローラルビターズ",
  },
  base: "gin",
  sweetness: "balanced",
  vibes: ["romantic", "chill"],
  tags: ["yuzu", "tonic", "floral", "citrus", "refreshing"],
}
  ,{
  name: {
    en: "Midnight Ume",
    jp: "ミッドナイト梅",
  },
  priceYen: 1400,
  description: {
    en: "Umeshu, plum, spice, lime",
    jp: "梅酒、プラム、スパイス、ライム",
  },
    base: "umeshu",
    sweetness: "sweet",
    vibes: ["after-work", "romantic", "chill"],
    tags: ["plum", "umeshu", "smooth", "spice", "lime"],
  },
  {
    name: {
    en: "Cyber Espresso",
    jp: "サイバーエスプレッソ",
    },
    priceYen: 1700,
    description: {
      en: "Vodka, coffee, cocoa, velvet foam",
      jp: "ウォッカ、コーヒー、ココア、ベルベットフォーム",
},
    base: "vodka",
    sweetness: "balanced",
    vibes: ["after-work", "party"],
    tags: ["coffee", "cocoa", "strong", "smooth", "dessert"],
  },
];