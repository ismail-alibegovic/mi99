"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** Subtle vertical parallax for imagery. Disabled for reduced motion. */
export function Parallax({
  children,
  className,
  strength = 60,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);
  return (
    <div ref={ref} className={`overflow-hidden ${className?.includes("absolute") ? "" : "relative"} ${className ?? ""}`}>
      <motion.div
        className="absolute inset-x-0"
        style={{ top: -strength, bottom: -strength, y: reduce ? 0 : y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
