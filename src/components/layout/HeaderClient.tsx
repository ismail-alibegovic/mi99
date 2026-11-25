"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X, ArrowUpRight, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Lockup } from "@/components/brand/Logo";
import type { PackImage } from "@/data/catalog";
import { company } from "@/data/company";
import { cn, mainNav, routes, secondaryNav } from "@/lib/site";

export interface MegaCategory {
  id: string;
  name: string;
  short: string;
  href: string;
  tone: string;
  image: PackImage;
  count: string;
}

interface Props {
  mega: MegaCategory[];
  brands: { id: string; name: string; href: string; tagline: string }[];
}

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const LANG_NAMES: Record<string, string> = { bs: "Bosanski", en: "English", de: "Deutsch" };

export function LanguageSwitcher({ inverted, className }: { inverted?: boolean; className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");
  return (
    <nav aria-label={t("language")} className={cn("flex items-center gap-0.5 font-display text-[0.78rem] font-bold", className)}>
      {routing.locales.map((l) => (
        <Link
          key={l}
          href={pathname}
          locale={l}
          hrefLang={l}
          aria-label={LANG_NAMES[l]}
          aria-current={l === locale ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1.5 uppercase tracking-[0.08em] transition-colors",
            l === locale
              ? inverted
                ? "bg-cream-50 text-forest-900"
                : "bg-forest-900 text-cream-50"
              : inverted
                ? "text-cream-50/70 hover:text-cream-50"
                : "text-ink-700 hover:text-forest-900",
          )}
        >
          {l}
        </Link>
      ))}
    </nav>
  );
}

export function HeaderClient({ mega, brands }: Props) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close menus on navigation (state adjustment during render, no effect needed)
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMegaOpen(false);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  // Ref mirrors the latest open state: hover and click can fire before a re-render.
  const openRef = useRef(false);
  const openedAt = useRef(0);
  useEffect(() => {
    openRef.current = megaOpen;
  }, [megaOpen]);
  const setOpen = (v: boolean) => {
    if (v && !openRef.current) openedAt.current = Date.now();
    openRef.current = v;
    setMegaOpen(v);
  };
  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const toggleMega = () => {
    // A click right after a hover-open keeps the menu open instead of closing it.
    if (openRef.current && Date.now() - openedAt.current < 500) return;
    setOpen(!openRef.current);
  };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(false), 160);
  };

  const compact = scrolled || megaOpen;

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-forest-900 px-4 py-2 text-sm font-semibold text-cream-50 transition-transform focus:translate-y-0"
      >
        {t("skip")}
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,height] duration-500 ease-out-soft",
          compact ? "bg-cream-50/95 shadow-[0_1px_0_rgb(20_61_42/0.08),0_12px_30px_-18px_rgb(20_61_42/0.25)] backdrop-saturate-150" : "bg-transparent",
        )}
        onMouseLeave={scheduleClose}
      >
        <div
          className={cn(
            "container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-soft",
            compact ? "h-[68px]" : "h-[84px] lg:h-[96px]",
          )}
        >
          <Link href="/" aria-label="MI99 – Početna" className="shrink-0">
            <Lockup className={cn("origin-left transition-transform duration-500", compact && "scale-[0.88]")} />
          </Link>

          <nav aria-label="Glavna navigacija" className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) =>
              item.key === "products" ? (
                <div key={item.key} className="relative" onMouseEnter={openMega}>
                  <button
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="mega-menu"
                    onClick={toggleMega}
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-4 py-2 font-display text-[0.92rem] font-semibold tracking-[-0.01em] transition-colors",
                      isActive(pathname, item.href) || megaOpen ? "text-forest-900" : "text-ink-700 hover:text-forest-900",
                    )}
                  >
                    {t(item.key)}
                    <ChevronDown className={cn("size-4 transition-transform duration-300", megaOpen && "rotate-180")} aria-hidden />
                  </button>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  onMouseEnter={scheduleClose}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-display text-[0.92rem] font-semibold tracking-[-0.01em] transition-colors",
                    isActive(pathname, item.href) ? "text-forest-900" : "text-ink-700 hover:text-forest-900",
                  )}
                >
                  {t(item.key)}
                  {isActive(pathname, item.href) && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-meadow-500" aria-hidden />
                  )}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden md:flex" />
            <Link
              href={routes.contact}
              className="hidden h-11 items-center gap-2 rounded-full bg-forest-900 px-5 font-display text-[0.9rem] font-semibold text-cream-50 transition-colors hover:bg-forest-800 sm:inline-flex"
            >
              {t("contact")}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t("openMenu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="flex size-11 items-center justify-center rounded-full border border-forest-900/15 text-forest-900 lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              id="mega-menu"
              key="mega"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={openMega}
              className="absolute inset-x-0 top-full hidden border-t border-forest-900/10 bg-cream-50 shadow-[0_30px_60px_-30px_rgb(20_61_42/0.35)] lg:block"
            >
              <div className="container-x grid grid-cols-[1fr_280px] gap-10 py-8">
                <ul className="grid grid-cols-3 gap-3">
                  {mega.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={c.href}
                        className="group flex h-[150px] items-stretch overflow-hidden rounded-2xl transition-transform duration-500 ease-out-soft hover:-translate-y-0.5"
                        style={{ backgroundColor: c.tone }}
                      >
                        <span className="flex flex-1 flex-col justify-between p-5">
                          <span>
                            <span className="display-sm block text-forest-950">{c.name}</span>
                            <span className="mt-1 block text-[0.82rem] text-ink-700">{c.short}</span>
                          </span>
                          <span className="text-[0.75rem] font-semibold text-ink-500">{c.count}</span>
                        </span>
                        <span className="relative flex w-[38%] items-end justify-center pb-3">
                          <Image
                            src={c.image.src}
                            alt=""
                            width={c.image.width}
                            height={c.image.height}
                            sizes="120px"
                            className="packshot-shadow h-[118px] w-auto object-contain transition-transform duration-700 ease-out-soft group-hover:-translate-y-1 group-hover:scale-[1.04]"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col justify-between border-l border-forest-900/10 pl-8">
                  <div>
                    <p className="eyebrow text-meadow-500">{t("brands")}</p>
                    <ul className="mt-4 space-y-4">
                      {brands.map((b) => (
                        <li key={b.id}>
                          <Link href={b.href} className="group block">
                            <span className="display-sm text-forest-900 group-hover:underline">{b.name}</span>
                            <span className="mt-0.5 block text-[0.85rem] text-ink-500">{b.tagline}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[0.85rem] text-ink-500">{t("megaIntro")}</p>
                    <Link
                      href={routes.products}
                      className="inline-flex items-center gap-2 font-display text-[0.95rem] font-bold text-forest-900"
                    >
                      {t("allProducts")} <ArrowUpRight className="size-4" aria-hidden />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-forest-900 text-cream-50 lg:hidden"
          >
            <div className="container-x flex h-[84px] shrink-0 items-center justify-between">
              <Link href="/" aria-label="MI99">
                <Lockup inverted />
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={t("closeMenu")}
                className="flex size-11 items-center justify-center rounded-full border border-cream-50/25"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="container-x flex flex-1 flex-col gap-10 pb-10 pt-4">
              <nav aria-label={t("menu")}>
                <ul className="space-y-1">
                  {[...mainNav, ...secondaryNav].map((item, i) => (
                    <motion.li
                      key={item.key}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.04, duration: 0.5 }}
                    >
                      <Link
                        href={item.href}
                        aria-current={isActive(pathname, item.href) ? "page" : undefined}
                        className={cn(
                          "block py-1.5 font-display text-[2rem] font-bold leading-tight tracking-[-0.035em]",
                          isActive(pathname, item.href) ? "text-meadow-300" : "text-cream-50",
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <div>
                <p className="eyebrow text-meadow-300">{t("categories")}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {mega.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={c.href}
                        className="inline-flex items-center gap-2 rounded-full border border-cream-50/20 py-1.5 pl-1.5 pr-4 text-[0.92rem] font-medium"
                      >
                        <span className="flex size-8 items-end justify-center overflow-hidden rounded-full" style={{ background: c.tone }}>
                          <Image src={c.image.src} alt="" width={c.image.width} height={c.image.height} sizes="32px" className="h-7 w-auto" />
                        </span>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto flex flex-col gap-6 border-t border-cream-50/15 pt-6">
                <LanguageSwitcher inverted />
                <div className="flex flex-col gap-2 text-[0.95rem] text-cream-50/80">
                  <a href={company.phoneHref} className="inline-flex items-center gap-2">
                    <Phone className="size-4" aria-hidden /> {company.phone}
                  </a>
                  <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2">
                    <Mail className="size-4" aria-hidden /> {company.email}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
