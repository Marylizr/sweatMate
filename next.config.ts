// next.config.ts
import type { NextConfig } from "next";

const BACKEND =
  process.env.BACKEND_URL ?? "https://sweatmate-app-b74e82edf23b.herokuapp.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      // 👉 Sirve el contenido de /en cuando visitan "/", sin redirigir (adiós 307)
      { source: "/", destination: "/en" },

      // 👉 Proxy a tu backend
      { source: "/api/:path*", destination: `${BACKEND}/:path*` },
    ];
  },
};

export default nextConfig;
