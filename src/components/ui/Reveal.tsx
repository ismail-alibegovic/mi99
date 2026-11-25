"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article";
}

/** Fade-and-rise on first entry into the viewport. */
export function Reveal({ children, delay = 0, y = 28, as = "div", ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Headline that reveals line by line. The heading itself is observed, not the masked lines. */
export function LineReveal({
  lines,
  className,
  lineClasses,
  delay = 0,
  as = "h2",
}: {
  lines: ReactNode[];
  className?: string;
  lineClasses?: (string | undefined)[];
  delay?: number;
  as?: "h1" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClasses?.[i] ?? ""}`}
            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1], delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
