// src/app/[locale]/(auth)/layout.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useMemo } from "react";

const LOGO =
  "https://res.cloudinary.com/dtb3gqeea/image/upload/v1747740721/logo_sweatMate_vy8s1z.png";

function useLocaleFromPath() {
  const pathname = usePathname() || "/";
  return useMemo(() => pathname.split("/")[1] || "en", [pathname]);
}

function AuthNavbar() {
  const locale = useLocaleFromPath();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[rgba(11,15,20,0.55)] backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <nav className="flex h-14 items-center justify-between">
          {/* Brand */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image
              src={LOGO}
              alt="SweatMate"
              width={112}
              height={28}
              className="h-7 w-auto"
              priority
            />
            <span className="sr-only">SweatMate</span>
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <Link href={`/${locale}`} className="hover:text-white transition">
              Home
            </Link>
            <Link
              href={`/${locale}/about`}
              className="hover:text-white transition"
            >
              About
            </Link>
            <Link
              href={`/${locale}/recipes`}
              className="hover:text-white transition"
            >
              Recipes
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="hover:text-white transition"
            >
              Blog
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href={`/${locale}/signup`}
              className="hidden sm:inline-flex rounded-xl border border-white/10 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5 transition"
            >
              Sign up
            </Link>
            <Link
              href={`/${locale}/login`}
              className="rounded-xl bg-blue-600 px-3 py-1.5 text-xs font-medium hover:bg-blue-500 transition"
              aria-current="page"
            >
              Log in
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(79,141,247,.25),transparent),radial-gradient(800px_400px_at_80%_10%,rgba(15,22,33,.9),rgba(11,15,20,1))] text-white">
      <AuthNavbar />
      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-10">
        {children}
      </main>
    </div>
  );
}
