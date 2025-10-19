// src/app/[locale]/(marketing)/layout.tsx
import { ReactNode } from "react";
import Navbar from "@/components/ui/marketing/Navbar";
import { getDict } from "@/i18n/getDict";
import { isLocale, type Locale } from "@/i18n/locales";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = await getDict(locale);

  return (
    <div className="min-h-screen bg-hero-grad text-text-primary">
      <Navbar locale={locale} t={dict.nav} />
      <main className="container-page py-8">{children}</main>
      <footer className="border-t border-white/5 mt-10 py-6 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} SweatMate
      </footer>
    </div>
  );
}
