// src/middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Protegemos /dashboard y /{locale}/dashboard (en|es)
const PROTECTED = [/^\/dashboard(\/|$)/, /^\/(?:en|es)\/dashboard(\/|$)/];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Si no es una ruta protegida, seguimos normal
  if (!PROTECTED.some((rx) => rx.test(pathname))) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// El matcher cubre ambas variantes
export const config = {
  matcher: ["/dashboard/:path*", "/(en|es)/dashboard/:path*"],
};
