// src/i18n/locales.ts
export const LOCALES = ["en", "es"] as const;
export type Locale = (typeof LOCALES)[number];
export function isLocale(x: string): x is Locale {
  return (LOCALES as readonly string[]).includes(x);
}
