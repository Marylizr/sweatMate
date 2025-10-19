// src/components/ui/card.tsx
"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-bg-panel/60 backdrop-blur shadow-soft " +
        "transition hover:shadow-[0_14px_38px_rgba(0,0,0,.45)] " +
        className
      }
    >
      {children}
    </div>
  );
}
