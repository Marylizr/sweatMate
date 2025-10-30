import type { ReactNode } from "react";
import Navbar from "@/components/ui/marketing/Navbar";
import getDict from "@/i18n/getDict";
import { isLocale, type Locale } from "@/i18n/locales";

type MarketingLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default async function MarketingLayout({
  children,
  params,
}: MarketingLayoutProps) {
  const raw = params.locale;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const dict = await getDict(locale);

  return (
    <div className="min-h-screen bg-hero-grad text-text-primary">
      <Navbar locale={locale} t={dict.nav} />
      <main>{children}</main>
      <footer className="mt-16 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-400">
          © {new Date().getFullYear()} SweatMate
        </div>
      </footer>
    </div>
  );
}
