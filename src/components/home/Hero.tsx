"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/Button";
import type { PackImage } from "@/data/catalog";
import { routes } from "@/lib/site";

interface HeroProduct {
  image: PackImage;
  alt: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ milk, yoghurt, cream }: { milk: HeroProduct; yoghurt: HeroProduct; cream: HeroProduct }) {
  const t = useTranslations();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const packsY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 60 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.2, ease, delay },
        };

  return (
    <section ref={ref} className="relative overflow-hidden pt-[96px]">
      {/* soft organic backdrop */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-24 size-[520px] rounded-full bg-meadow-100 blur-3xl" />
      <div className="container-x relative grid items-center gap-y-12 pb-16 pt-6 lg:min-h-[calc(100svh-96px)] lg:grid-cols-12 lg:gap-x-10 lg:pb-20">
        <div className="relative z-10 lg:col-span-6 xl:col-span-5">
          <motion.p
            className="eyebrow flex items-center gap-3 text-forest-700"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="inline-block h-px w-10 bg-meadow-500" aria-hidden />
            {t("hero.eyebrow")}
          </motion.p>
          <h1 className="display-xl mt-6 text-forest-900">
            {[t("hero.title1"), t("hero.title2")].map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className={i === 1 ? "serif-accent block text-[1.08em] font-normal text-forest-700" : "block"}
                  initial={reduce ? false : { y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.15, ease, delay: 0.15 + i * 0.14 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="lead mt-7 max-w-[30rem] text-ink-700"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.55 }}
          >
            {t("hero.text")}
          </motion.p>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.7 }}
          >
            <ButtonLink href={routes.products}>{t("hero.ctaProducts")}</ButtonLink>
            <ButtonLink href={routes.about} variant="outline">
              {t("hero.ctaAbout")}
            </ButtonLink>
          </motion.div>
        </div>

        {/* Product campaign composition */}
        <div className="relative lg:col-span-6 xl:col-span-7">
          <div className="relative mx-auto aspect-[0.86] w-full max-w-[640px] sm:aspect-[0.95] lg:ml-auto lg:mr-0">
            <motion.div
              className="absolute inset-x-[6%] bottom-[9%] top-0 overflow-hidden rounded-[999px_999px_36px_36px] bg-milkblue-200"
              initial={reduce ? false : { clipPath: "inset(100% 0 0 0 round 999px 999px 36px 36px)" }}
              animate={{ clipPath: "inset(0% 0 0 0 round 999px 999px 36px 36px)" }}
              transition={{ duration: 1.4, ease, delay: 0.1 }}
            >
              <motion.div className="absolute -inset-y-[8%] inset-x-0" style={reduce ? undefined : { y: bgY }}>
                <Image
                  src="/images/photos/pasture-mountain.webp"
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="object-cover object-[60%_50%]"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/35 via-transparent to-transparent" />
              {/* soft milk wave */}
              <svg aria-hidden viewBox="0 0 600 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[16%] w-full text-cream-100">
                <path fill="currentColor" d="M0 70 C 90 30, 170 100, 270 70 S 450 20, 600 60 L600 120 L0 120 Z" opacity="0.55" />
                <path fill="currentColor" d="M0 92 C 120 60, 210 118, 320 92 S 500 66, 600 88 L600 120 L0 120 Z" />
              </svg>
              <span className="absolute left-6 top-[46%] hidden rotate-[-90deg] text-[0.62rem] font-medium uppercase tracking-[0.18em] text-cream-50/80 sm:block">
                {t("common.illustrative")}
              </span>
            </motion.div>

            <motion.div className="absolute inset-0" style={reduce ? undefined : { y: packsY }}>
              {/* yoghurt bottle – left */}
              <motion.div className="absolute bottom-[7%] left-[3%] h-[50%]" {...rise(0.75)}>
                <Image
                  src={yoghurt.image.src}
                  alt={yoghurt.alt}
                  width={yoghurt.image.width}
                  height={yoghurt.image.height}
                  priority
                  sizes="(min-width: 1024px) 14vw, 26vw"
                  className="packshot-shadow h-full w-auto -rotate-[4deg]"
                />
              </motion.div>
              {/* milk carton – hero */}
              <motion.div className="absolute bottom-[4%] left-1/2 h-[66%] -translate-x-[46%]" {...rise(0.6)}>
                <Image
                  src={milk.image.src}
                  alt={milk.alt}
                  width={milk.image.width}
                  height={milk.image.height}
                  priority
                  sizes="(min-width: 1024px) 18vw, 34vw"
                  className="packshot-shadow h-full w-auto"
                />
                <span aria-hidden className="contact-shadow absolute -bottom-[2%] left-1/2 h-[6%] w-[120%] -translate-x-1/2" />
              </motion.div>
              {/* sour cream tub – right front */}
              <motion.div className="absolute bottom-[1%] right-[1%] h-[33%]" {...rise(0.9)}>
                <Image
                  src={cream.image.src}
                  alt={cream.alt}
                  width={cream.image.width}
                  height={cream.image.height}
                  priority
                  sizes="(min-width: 1024px) 16vw, 30vw"
                  className="packshot-shadow h-full w-auto rotate-[3deg]"
                />
                <span aria-hidden className="contact-shadow absolute -bottom-[3%] left-1/2 h-[8%] w-[110%] -translate-x-1/2" />
              </motion.div>
            </motion.div>

            <motion.div
              className="absolute right-[2%] top-[8%] hidden rounded-full bg-cream-50 px-4 py-2 font-display text-[0.78rem] font-bold tracking-[0.04em] text-forest-900 shadow-[0_10px_30px_-12px_rgb(20_61_42/0.35)] sm:block"
              initial={reduce ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease, delay: 1.2 }}
            >
              {t("hero.badge")}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
