"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const LOGO =
  "https://res.cloudinary.com/dtb3gqeea/image/upload/v1747740721/logo_sweatMate_vy8s1z.png";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-20%,rgba(255,255,255,0.06),transparent),radial-gradient(800px_400px_at_90%_110%,rgba(255,255,255,0.06),transparent)] bg-neutral-950 text-neutral-100">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[260px_1fr]">
        {/* Sidebar */}
        <aside className="hidden border-r border-white/10 bg-white/[0.02] backdrop-blur md:block">
          <div className="flex items-center gap-2 px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
              <Image
                src={LOGO}
                alt="SweatMate"
                width={28}
                height={28}
                className="object-contain"
                priority
              />
            </div>
            <span className="text-sm text-neutral-300">SweatMate</span>
          </div>
          <nav className="px-3 py-2">
            <NavItem href="/dashboard">Overview</NavItem>
            <NavItem href="/dashboard/upcoming">Upcoming Meetings</NavItem>
            <NavItem href="/dashboard/calendar">Calendar</NavItem>
            <NavItem href="/dashboard/clients">Client List</NavItem>
            <NavItem href="/dashboard/settings">Settings</NavItem>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-10 border-b border-white/10 bg-black/30 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3 md:hidden">
                {/* Logo en mobile */}
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/15">
                  <Image
                    src={LOGO}
                    alt="SweatMate"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm text-neutral-300">Dashboard</span>
              </div>
              <div className="ml-auto">
                <Link
                  href="/"
                  className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-200 transition hover:bg-white/5"
                >
                  Home
                </Link>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={[
        "block rounded-xl px-3 py-2 text-sm transition",
        active
          ? "bg-white/10 text-white ring-1 ring-white/10"
          : "text-neutral-300 hover:bg-white/5 hover:text-white",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
