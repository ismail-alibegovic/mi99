"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import type { PackImage } from "@/data/catalog";
import { cn } from "@/lib/site";

export function ProductGallery({
  images,
  alt,
  tone,
  variantLabel,
  note,
}: {
  images: PackImage[];
  alt: string;
  tone: string;
  variantLabel: string[];
  note: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const img = images[i];
  return (
    <div className="relative flex h-full min-h-[460px] flex-col overflow-hidden rounded-[32px] sm:min-h-[560px] lg:min-h-[calc(100svh-140px)]" style={{ backgroundColor: tone }}>
      <div aria-hidden className="absolute left-1/2 top-[12%] aspect-square w-[78%] -translate-x-1/2 rounded-full bg-white/45" />
      <div className="relative flex flex-1 items-end justify-center px-8 pb-16 pt-12">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={img.src}
            className="relative flex h-[min(68vh,560px)] max-h-full items-end"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={img.src}
              alt={alt}
              width={img.width}
              height={img.height}
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className={cn(
                "packshot-shadow relative z-[1] w-auto max-w-[min(78vw,520px)] object-contain",
                img.width > img.height * 0.9 ? "h-[62%]" : "h-full",
              )}
            />
            <span aria-hidden className="contact-shadow absolute -bottom-3 left-1/2 h-8 w-[115%] -translate-x-1/2" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative flex flex-wrap items-end justify-between gap-4 px-6 pb-6">
        <p className="max-w-xs text-[0.72rem] leading-snug text-ink-500">{note}</p>
        {images.length > 1 && (
          <div className="flex gap-2" role="group">
            {images.map((im, k) => (
              <button
                key={im.src}
                type="button"
                onClick={() => setI(k)}
                aria-pressed={k === i}
                aria-label={variantLabel[k]}
                className={cn(
                  "flex size-16 items-end justify-center rounded-2xl border-2 bg-white/70 p-1.5 transition-colors",
                  k === i ? "border-forest-900" : "border-transparent hover:border-forest-900/30",
                )}
              >
                <Image src={im.src} alt="" width={im.width} height={im.height} sizes="64px" className="h-full w-auto object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
