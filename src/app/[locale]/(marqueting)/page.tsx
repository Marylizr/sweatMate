// src/app/[locale]/(marketing)/page.tsx
import Image from "next/image";
import { getDict } from "@/i18n/getDict";
import { isLocale, type Locale } from "@/i18n/locales";
import Hero from "@/components/ui/marketing/Hero";
import Features from "@/components/ui/marketing/Features";

export default async function LandingPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = (isLocale(params.locale) ? params.locale : "en") as Locale;
  const dict = await getDict(locale);

  return (
    <>
      <Hero locale={locale} t={dict.hero} />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <Features t={dict.features} />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)]">
            <Image
              src="https://res.cloudinary.com/dtb3gqeea/image/upload/v1747741479/trainers_hnpvkt.png"
              alt="Trainers"
              width={1400}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
          <div className="space-y-4 text-slate-300">
            <h3 className="text-2xl font-semibold">Designed for humans</h3>
            <p className="text-slate-400">
              Minimal, rápido y adaptativo. SweatMate funciona igual de bien en
              móvil y escritorio, con una estética “Apple feel” que no estorba.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
