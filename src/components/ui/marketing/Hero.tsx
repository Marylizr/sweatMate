"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/i18n/locales";

type HeroDict = {
  title: string;
  subtitle: string;
  cta: string;
  cta2: string;
};

export default function Hero({ locale, t }: { locale: Locale; t: HeroDict }) {
  return (
    <section className="relative overflow-hidden">
      {/* Glow / fondo con tailwind, sin inline styles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[600px] w-[1200px] rounded-full blur-3xl
                   bg-[radial-gradient(closest-side,rgba(79,141,247,0.35),rgba(79,141,247,0)_70%)]"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
        {/* Copy */}
        <div>
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.title}
          </motion.h1>

          <motion.p
            className="mt-4 text-slate-300 md:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <a
              href={`/${locale}/auth/signup`}
              className="inline-flex items-center rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-sm transition border border-white/10"
            >
              {t.cta}
            </a>
            <a
              href={`/${locale}/about`}
              className="inline-flex items-center rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/5 transition"
            >
              {t.cta2}
            </a>
          </motion.div>
        </div>

        {/* Imagen grande */}
        <motion.div
          className="rounded-3xl overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,.35)]"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://res.cloudinary.com/dtb3gqeea/image/upload/v1747741479/trainers_hnpvkt.png"
            alt="SweatMate"
            className="w-full h-auto"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}
