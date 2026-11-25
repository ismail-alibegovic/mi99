"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useId, useState, type KeyboardEvent } from "react";
import { Link } from "@/i18n/navigation";
import { ButtonLink } from "@/components/ui/Button";
import type { PackImage } from "@/data/catalog";
import { cn } from "@/lib/site";

export interface ShowcaseItem {
  slug: string;
  href: string;
  title: string;
  brand: string;
  size: string;
  fat: string | null;
  image: PackImage;
}

export interface ShowcaseCategory {
  id: string;
  name: string;
  intro: string;
  tone: string;
  ink: string;
  accent: string;
  href: string;
  count: number;
  items: ShowcaseItem[];
}

const ease = [0.22, 1, 0.36, 1] as const;

export function ProductShowcase({ data }: { data: ShowcaseCategory[] }) {
  const t = useTranslations("showcase");
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const uid = useId();
  const cat = data[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % data.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + data.length) % data.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = data.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <motion.section
      aria-labelledby={`${uid}-title`}
      className="relative overflow-hidden"
      animate={{ backgroundColor: cat.tone }}
      initial={false}
      transition={{ duration: reduce ? 0 : 0.8, ease }}
    >
      <div className="container-x py-20 md:py-28">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow" style={{ color: cat.accent }}>
              {t("eyebrow")}
            </p>
            <h2 id={`${uid}-title`} className="display-lg mt-4 text-forest-950">
              {t("title")}
            </h2>
          </div>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-ink-700 lg:col-span-5 lg:justify-self-end">{t("text")}</p>
        </div>

        <div
          role="tablist"
          aria-label={t("eyebrow")}
          className="no-scrollbar -mx-4 mt-12 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0"
        >
          {data.map((c, i) => (
            <button
              key={c.id}
              id={`${uid}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${uid}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "relative shrink-0 rounded-full px-5 py-2.5 font-display text-[0.95rem] font-semibold tracking-[-0.01em] transition-colors duration-300",
                i === active ? "text-cream-50" : "bg-white/55 text-forest-900 hover:bg-white",
              )}
            >
              {i === active && (
                <motion.span
                  layoutId={`${uid}-pill`}
                  className="absolute inset-0 rounded-full bg-forest-900"
                  transition={{ duration: reduce ? 0 : 0.5, ease }}
                />
              )}
              <span className="relative">{c.name}</span>
            </button>
          ))}
        </div>

        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={cat.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease }}
              className="grid gap-10 lg:grid-cols-12"
            >
              <div className="flex flex-col justify-between gap-8 lg:col-span-4">
                <div>
                  <h3 className="display-md" style={{ color: cat.ink }}>
                    {cat.name}
                  </h3>
                  <p className="mt-4 max-w-sm text-[1.02rem] leading-relaxed text-ink-700">{cat.intro}</p>
                  <p className="mt-6 font-display text-sm font-bold" style={{ color: cat.accent }}>
                    {t("count", { count: cat.count })}
                  </p>
                </div>
                <ButtonLink href={cat.href} className="self-start">
                  {t("cta")}
                </ButtonLink>
              </div>

              <ul className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-4 lg:col-span-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
                {cat.items.map((p, i) => (
                  <motion.li
                    key={p.slug}
                    className="min-w-[58%] snap-start sm:min-w-[38%] lg:min-w-0"
                    initial={reduce ? false : { opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.08 * i }}
                  >
                    <Link href={p.href} className="group block">
                      <span className="relative flex h-[300px] items-end justify-center md:h-[340px]">
                        <span aria-hidden className="absolute inset-x-[8%] bottom-0 top-[18%] rounded-[999px_999px_20px_20px] bg-white/45 transition-colors duration-500 group-hover:bg-white/75" />
                        <Image
                          src={p.image.src}
                          alt={p.title}
                          width={p.image.width}
                          height={p.image.height}
                          sizes="(min-width: 1024px) 15vw, 50vw"
                          className="packshot-shadow relative mb-4 max-h-[88%] w-auto max-w-[82%] object-contain transition-transform duration-700 ease-out-soft group-hover:-translate-y-2 group-hover:scale-[1.03]"
                        />
                      </span>
                      <span className="mt-5 block">
                        <span className="text-[0.72rem] font-bold uppercase tracking-[0.14em]" style={{ color: cat.accent }}>
                          {p.brand}
                        </span>
                        <span className="mt-1 block font-display text-[1.05rem] font-bold leading-snug tracking-[-0.02em] text-forest-950 group-hover:underline">
                          {p.title}
                        </span>
                        <span className="mt-1 block text-[0.88rem] text-ink-500">
                          {p.size}
                          {p.fat && <> · {p.fat}</>}
                        </span>
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
