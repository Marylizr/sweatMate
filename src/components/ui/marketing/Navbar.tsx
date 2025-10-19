"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { type Locale } from "@/i18n/locales";

type NavDict = {
  about: string;
  recipes: string;
  blog: string;
  login: string;
  signup: string;
};

export default function Navbar({ locale, t }: { locale: Locale; t: NavDict }) {
  const pathname = usePathname();
  const router = useRouter();

  // switcher simple: /en/... ↔︎ /es/...
  const onSwitch = () => {
    const parts = (pathname || "/en").split("/");
    parts[1] = locale === "en" ? "es" : "en";
    router.push(parts.join("/") || `/${locale === "en" ? "es" : "en"}`);
  };

  return (
    <header className="sticky top-0 z-20 bg-[rgba(11,15,20,0.6)] backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image
            src="https://res.cloudinary.com/dtb3gqeea/image/upload/v1747740721/logo_sweatMate_vy8s1z.png"
            alt="SweatMate"
            width={28}
            height={28}
            className="rounded"
          />
          <span className="font-semibold">SweatMate</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link
            className="hover:text-white transition"
            href={`/${locale}/about`}
          >
            {t.about}
          </Link>
          <Link
            className="hover:text-white transition"
            href={`/${locale}/recipes`}
          >
            {t.recipes}
          </Link>
          <Link
            className="hover:text-white transition"
            href={`/${locale}/blog`}
          >
            {t.blog}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/auth/login`}
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs hover:bg-white/5 transition"
          >
            {t.login}
          </Link>
          <Link
            href={`/${locale}/auth/signup`}
            className="rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs transition"
          >
            {t.signup}
          </Link>

          {/* Switcher */}
          <button
            onClick={onSwitch}
            aria-label="Switch language"
            className="ml-2 rounded-md border border-white/10 px-2 py-1 text-xs text-slate-200 hover:bg-white/5"
          >
            {locale === "en" ? "ES" : "EN"}
          </button>
        </div>
      </div>
    </header>
  );
}
