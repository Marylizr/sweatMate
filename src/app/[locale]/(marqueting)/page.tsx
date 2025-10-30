import getDict from "@/i18n/getDict";
import { isLocale, type Locale } from "@/i18n/locales";
import Hero from "@/components/ui/marketing/Hero";
import Features from "@/components/ui/marketing/Features";

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = (isLocale(raw) ? raw : "en") as Locale;
  const dict = await getDict(locale);

  return (
    <>
      <Hero locale={locale} t={dict.hero} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <Features t={dict.features} />
      </section>
    </>
  );
}
