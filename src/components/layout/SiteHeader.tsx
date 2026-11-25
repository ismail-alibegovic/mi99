import { getLocale, getTranslations } from "next-intl/server";
import { categories, getProduct, productsByCategory, brands } from "@/data/catalog";
import { pick } from "@/data/types";
import { routes } from "@/lib/site";
import { HeaderClient, type MegaCategory } from "./HeaderClient";

export const CATEGORY_HERO: Record<string, string> = {
  mlijeko: "natura-trajno-mlijeko-3-2",
  jogurti: "natura-jogurt-2-8-1kg",
  pavlake: "natura-kisela-pavlaka-20-800g",
  kefir: "natura-kefir-2-8-300g",
  "grcki-jogurt": "grcki-jogurt-400g",
  ayran: "ayran-1kg",
};

export async function SiteHeader() {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const mega: MegaCategory[] = categories.map((c) => {
    const p = getProduct(CATEGORY_HERO[c.id])!;
    return {
      id: c.id,
      name: pick(c.name, locale),
      short: pick(c.short, locale),
      href: routes.category(c.id),
      tone: c.tone,
      image: p.images[0],
      count: t("productsInCategory", { count: productsByCategory(c.id).length }),
    };
  });
  const brandLinks = brands
    .filter((b) => b.id !== "mi99")
    .map((b) => ({ id: b.id, name: b.name, href: routes.brand(b.id), tagline: pick(b.tagline, locale) }));
  return <HeaderClient mega={mega} brands={brandLinks} />;
}
