"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const LOGO =
  "https://res.cloudinary.com/dtb3gqeea/image/upload/v1747740721/logo_sweatMate_vy8s1z.png";

type NavbarProps = {
  locale?: "en" | "es";
  // lo dejamos flexible para que acepte lo que venga de dict.nav
  t?: Record<string, string>;
};

export default function Navbar({ locale: localeFromProps, t }: NavbarProps) {
  const pathname = usePathname() || "/";

  const [maybeLocale] = pathname.split("/");
  const detectedLocale = maybeLocale?.length === 2 ? maybeLocale : "en";
  const locale = localeFromProps || (detectedLocale as "en" | "es");

  // si no viene en el dict, caemos al texto por defecto
  const labels = {
    home: t?.home ?? "Home",
    about: t?.about ?? "About",
    blog: t?.blog ?? "Blog",
    recipes: t?.recipes ?? "Recipes",
  };

  const navLink = (href: string, label: string) => (
    <Link
      href={`/${locale}${href}`}
      className="text-sm text-text-secondary hover:text-white transition"
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-20 bg-[rgba(11,15,20,0.6)] backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3">
          <Image
            src={LOGO}
            alt="SweatMate"
            width={36}
            height={36}
            priority
            className="rounded-md"
          />
          <span className="text-sm text-text-secondary">SweatMate</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLink("/", labels.home)}
          {navLink("/about", labels.about)}
          {navLink("/recipes", labels.recipes)}
          {navLink("/blog", labels.blog)}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/login`}
            className="px-4 py-2 text-sm rounded-xl border border-white/10 hover:bg-white/5 transition"
          >
            Log in
          </Link>
          <Link
            href={`/${locale}/signup`}
            className="px-4 py-2 text-sm rounded-xl bg-accent hover:bg-accent-soft transition"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}
