// src/i18n/dictionaries/en.ts
import type { MarketingDict } from "../getDict";

const en: MarketingDict = {
  nav: {
    about: "About us",
    recipes: "Recipes",
    blog: "Blog",
    login: "Log in",
    signup: "Sign up",
  },
  hero: {
    headlines: [
      "Train smarter. Feel better.",
      "Plan less. Move more.",
      "Coaching that scales with you.",
      "All your progress in one place.",
    ],
    subtitle:
      "Plans, tracking and coaching in one sleek dashboard tailored to you.",
  },
  features: {
    title: "Why SweatMate",
    f1: {
      title: "Adaptive plans",
      desc: "Programs that grow with your progress.",
    },
    f2: {
      title: "Smart tracking",
      desc: "All your sessions and metrics in one place.",
    },
    f3: {
      title: "Coach inbox",
      desc: "Chat, feedback and reviews, all organized.",
    },
  },
};

export default en;
