// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.mdx",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#0B0F14", panel: "#0F1621" },
        text: { primary: "#E5E7EB", secondary: "#A3AEC2" },
        accent: { DEFAULT: "#4F8DF7", soft: "#1D4ED8" },
      },
      borderRadius: { xl2: "1.25rem", xl3: "1.75rem" },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.35)", // <- shadow-soft
      },
      backgroundImage: {
        "hero-grad":
          "radial-gradient(1200px 600px at 50% -10%, rgba(79,141,247,.25), transparent), radial-gradient(800px 400px at 80% 10%, rgba(15,22,33,.9), rgba(11,15,20,1))",
      },
      container: {
        center: true,
        padding: { DEFAULT: "1rem", sm: "1.25rem", md: "1.5rem" },
      },
    },
  },
  plugins: [],
} satisfies Config;
