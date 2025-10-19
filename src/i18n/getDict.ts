import type { Locale } from "./locales";
import en from "./dictionaries/en";
import es from "./dictionaries/es";

const maps = { en, es } as const;

export async function getDict(locale: Locale) {
  return maps[locale];
}
