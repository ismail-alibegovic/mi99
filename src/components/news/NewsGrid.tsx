"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/site";

export interface NewsItem {
  slug: string;
  href: string;
  category: string;
  categoryName: string;
  dateLabel: string;
  dateTime: string | null;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
}

export function NewsGrid({
  items,
  categories,
  allLabel,
  emptyLabel,
}: {
  items: NewsItem[];
  categories: { id: string; name: string }[];
  allLabel: string;
  emptyLabel: string;
}) {
  const [cat, setCat] = useState("all");
  const reduce = useReducedMotion();
  const visible = items.filter((i) => cat === "all" || i.category === cat);

  return (
    <div>
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Filter">
        {[{ id: "all", name: allLabel }, ...categories].map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={cat === c.id}
            onClick={() => setCat(c.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-[0.9rem] font-semibold transition-colors",
              cat === c.id ? "border-forest-900 bg-forest-900 text-cream-50" : "border-forest-900/15 bg-cream-50 text-forest-900 hover:border-forest-900/50",
            )}
          >
            {c.name}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-ink-700">{emptyLabel}</p>
      ) : (
        <motion.ul layout={!reduce} className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((a, i) => (
              <motion.li
                key={a.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(i === 0 && cat === "all" && "md:col-span-2 lg:col-span-2")}
              >
                <Link href={a.href} className="group flex flex-col">
                  <span className={cn("relative block overflow-hidden rounded-[24px] bg-cream-200", i === 0 && cat === "all" ? "aspect-[16/9]" : "aspect-[4/3]")}>
                    <Image src={a.image} alt={a.imageAlt} fill sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.04]" />
                  </span>
                  <span className="mt-5 flex flex-wrap items-center gap-3 text-[0.8rem] font-medium text-ink-500">
                    <span className="rounded-full bg-meadow-100 px-2.5 py-0.5 font-semibold text-forest-800">{a.categoryName}</span>
                    {a.dateTime ? <time dateTime={a.dateTime}>{a.dateLabel}</time> : <span>{a.dateLabel}</span>}
                  </span>
                  <span className="mt-3 font-display text-[1.35rem] font-bold leading-[1.15] tracking-[-0.025em] text-forest-900 group-hover:underline">{a.title}</span>
                  <span className="mt-2 text-[0.95rem] leading-relaxed text-ink-700">{a.excerpt}</span>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
