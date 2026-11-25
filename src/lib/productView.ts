import type { ProductCardData } from "@/components/cards/ProductCard";
import { formatFat, formatSize, getBrand, getCategory, productTitle, type Product } from "@/data/catalog";
import { pick } from "@/data/types";
import { routes } from "./site";

/** Serialisable, localised view model for product cards. */
export function toCard(p: Product, locale: string): ProductCardData {
  const cat = getCategory(p.category)!;
  return {
    slug: p.slug,
    href: routes.product(p.slug),
    title: productTitle(p, locale),
    brand: getBrand(p.brand)!.name,
    brandId: p.brand,
    category: pick(cat.name, locale),
    categoryId: p.category,
    size: formatSize(p.size, locale),
    fat: formatFat(p.fat, locale),
    tone: cat.tone,
    accent: cat.accent,
    image: p.images[0],
  };
}
