// src/app/data/menu.ts

export type MenuItem = {
  name: string;
  priceYen: number;
  description: string;

  base: "whiskey" | "gin" | "vodka" | "umeshu";
  sweetness: "dry" | "balanced" | "sweet";
  vibes: Array<"chill" | "party" | "romantic" | "after-work">;
  tags: string[];
};

export const MENU_ITEMS: MenuItem[] = [
  {
    name: "Neon Highball",
    priceYen: 1200,
    description: "Citrus, soda, smoked ice",
    base: "whiskey",
    sweetness: "balanced",
    vibes: ["after-work", "chill"],
    tags: ["citrus", "sparkling", "refreshing", "light", "smoky"],
  },
  {
    name: "Shinjuku Bloom",
    priceYen: 1600,
    description: "Gin, yuzu, tonic, floral bitters",
    base: "gin",
    sweetness: "balanced",
    vibes: ["romantic", "chill"],
    tags: ["yuzu", "tonic", "floral", "citrus", "refreshing"],
  },
  {
    name: "Midnight Ume",
    priceYen: 1400,
    description: "Umeshu, plum, spice, lime",
    base: "umeshu",
    sweetness: "sweet",
    vibes: ["after-work", "romantic", "chill"],
    tags: ["plum", "umeshu", "smooth", "spice", "lime"],
  },
  {
    name: "Cyber Espresso",
    priceYen: 1700,
    description: "Vodka, coffee, cocoa, velvet foam",
    base: "vodka",
    sweetness: "balanced",
    vibes: ["after-work", "party"],
    tags: ["coffee", "cocoa", "strong", "smooth", "dessert"],
  },
];