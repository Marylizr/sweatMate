"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RotatingHeadline({
  phrases,
  className,
  intervalMs = 3000,
}: {
  phrases: readonly string[];
  className?: string;
  intervalMs?: number;
}) {
  // Evita arrays vacíos y congela para no mutar
  const safePhrases = useMemo(
    () => (phrases.length > 0 ? phrases : ["SweatMate"]),
    [phrases]
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % safePhrases.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [safePhrases.length, intervalMs]);

  const phrase = safePhrases[idx];

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={phrase}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45 }}
          className="inline-block"
        >
          {phrase}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
