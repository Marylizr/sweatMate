// src/i18n/getDict.ts
import type { Locale } from "./locales";

/** ---- Tipos de marketing ---- */
export type NavDict = {
  about: string;
  recipes: string;
  blog: string;
  login: string;
  signup: string;
};

export type HeroDict = {
  headlines: string[]; // frases rotativas
  subtitle: string;
};

export type FeatureItem = { title: string; desc: string };
export type FeaturesDict = {
  title: string;
  f1: FeatureItem;
  f2: FeatureItem;
  f3: FeatureItem;
};

export type MarketingDict = {
  nav: NavDict;
  hero: HeroDict;
  features: FeaturesDict;
};

/** ---- Carga del diccionario por locale ---- */
export default async function getDict(locale: Locale): Promise<MarketingDict> {
  const mod =
    locale === "es"
      ? await import("./dictionaries/es")
      : await import("./dictionaries/en");

  // ambos diccionarios exportan default
  return mod.default as MarketingDict;
}
