"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { ProductCard, type ProductCardData } from "@/components/cards/ProductCard";
import { cn } from "@/lib/site";

interface Option {
  id: string;
  name: string;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-[0.9rem] font-semibold transition-colors duration-300",
        active ? "border-forest-900 bg-forest-900 text-cream-50" : "border-forest-900/15 bg-cream-50 text-forest-900 hover:border-forest-900/50",
      )}
    >
      {children}
    </button>
  );
}

export function ProductCatalog({
  products,
  categories,
  brands,
  initialCategory = "all",
  lockCategory,
  lockBrand,
}: {
  products: ProductCardData[];
  categories: Option[];
  brands: Option[];
  initialCategory?: string;
  lockCategory?: boolean;
  lockBrand?: boolean;
}) {
  const t = useTranslations("product");
  const reduce = useReducedMotion();
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("all");

  // Read filters from the URL once (keeps pages statically rendered).
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const c = sp.get("kategorija");
    const b = sp.get("brend");
    /* eslint-disable react-hooks/set-state-in-effect -- one-time hydration from URL */
    if (c && !lockCategory && categories.some((x) => x.id === c)) setCategory(c);
    if (b && !lockBrand && brands.some((x) => x.id === b)) setBrand(b);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [brands, categories, lockBrand, lockCategory]);

  const update = (key: "kategorija" | "brend", value: string) => {
    if (key === "kategorija") setCategory(value);
    else setBrand(value);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete(key);
    else url.searchParams.set(key, value);
    window.history.replaceState(null, "", url);
  };

  const visible = useMemo(
    () =>
      products.filter(
        (p) => (category === "all" || p.categoryId === category) && (brand === "all" || p.brandId === brand),
      ),
    [products, category, brand],
  );

  const availableBrands = brands.filter((b) => products.some((p) => p.brandId === b.id));
  const availableCats = categories.filter((c) => products.some((p) => p.categoryId === c.id));

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-forest-900/10 pb-8">
        {!lockCategory && availableCats.length > 1 && (
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <span className="eyebrow w-28 shrink-0 text-ink-500">{t("filterCategory")}</span>
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
              <Chip active={category === "all"} onClick={() => update("kategorija", "all")}>
                {t("filterAll")}
              </Chip>
              {availableCats.map((c) => (
                <Chip key={c.id} active={category === c.id} onClick={() => update("kategorija", c.id)}>
                  {c.name}
                </Chip>
              ))}
            </div>
          </div>
        )}
        {!lockBrand && availableBrands.length > 1 && (
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <span className="eyebrow w-28 shrink-0 text-ink-500">{t("filterBrand")}</span>
            <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0">
              <Chip active={brand === "all"} onClick={() => update("brend", "all")}>
                {t("filterAll")}
              </Chip>
              {availableBrands.map((b) => (
                <Chip key={b.id} active={brand === b.id} onClick={() => update("brend", b.id)}>
                  {b.name}
                </Chip>
              ))}
            </div>
          </div>
        )}
        <p aria-live="polite" className="text-[0.88rem] font-medium text-ink-500">
          {t("count", { count: visible.length })}
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-ink-700">{t("noResults")}</p>
          <button
            type="button"
            onClick={() => {
              update("kategorija", "all");
              update("brend", "all");
            }}
            className="mt-4 font-semibold text-forest-900 underline"
          >
            {t("reset")}
          </button>
        </div>
      ) : (
        <motion.ul layout={!reduce} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 xl:grid-cols-4">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((p) => (
              <motion.li
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard p={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </div>
  );
}
