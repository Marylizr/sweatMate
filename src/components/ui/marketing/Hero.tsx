"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import RotatingHeadline from "./RotatingHeadline";
import type { Locale } from "@/i18n/locales";
import type { HeroDict } from "@/i18n/getDict";

export default function Hero({ locale, t }: { locale: Locale; t: HeroDict }) {
  return (
    <section className="relative overflow-hidden">
      {/* Glows sin estilos inline */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-1/2 h-[600px] w-[1200px] rounded-full blur-3xl bg-gradient-to-tr from-blue-500/30 to-transparent" />
        <div className="absolute -top-10 right-0 h-[420px] w-[800px] rounded-full blur-3xl bg-gradient-to-tr from-slate-800/50 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
        {/* Texto */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-semibold tracking-tight"
          >
            <RotatingHeadline
              phrases={t.headlines}
              className="inline-block"
              intervalMs={3000}
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="mt-4 text-slate-300 md:text-lg"
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
            className="mt-8 flex items-center gap-3"
          >
            <Link
              href={`/${locale}/auth/signup`}
              className="rounded-full bg-accent px-5 py-2.5 text-sm text-white shadow-md shadow-blue-500/20 hover:bg-accent/90 transition"
            >
              Start free
            </Link>
            <Link
              href={`/${locale}/about`}
              className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-slate-200 hover:bg-white/5 transition"
            >
              See how it works
            </Link>
          </motion.div>
        </div>

        {/* Imagen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl ring-1 ring-white/10 bg-gradient-to-b from-slate-900/60 to-slate-800/30 p-2 shadow-2xl"
        >
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dtb3gqeea/image/upload/v1747741479/trainers_hnpvkt.png"
              alt="SweatMate trainers"
              width={1200}
              height={900}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]" />
        </motion.div>
      </div>
    </section>
  );
}
