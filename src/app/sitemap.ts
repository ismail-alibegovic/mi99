import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { categories, products } from "@/data/catalog";
import { news } from "@/data/news";
import { recipes } from "@/data/recipes";
import { absoluteUrl } from "@/lib/seo";
import { routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths: { path: string; priority: number }[] = [
    { path: routes.home, priority: 1 },
    { path: routes.about, priority: 0.8 },
    { path: routes.products, priority: 0.9 },
    { path: "/brendovi", priority: 0.6 },
    { path: routes.brand("natura"), priority: 0.8 },
    { path: routes.brand("milkland"), priority: 0.8 },
    { path: routes.production, priority: 0.7 },
    { path: routes.recipes, priority: 0.6 },
    { path: routes.partners, priority: 0.8 },
    { path: routes.news, priority: 0.6 },
    { path: routes.contact, priority: 0.7 },
    ...categories.map((c) => ({ path: routes.category(c.id), priority: 0.8 })),
    ...products.map((p) => ({ path: routes.product(p.slug), priority: 0.7 })),
    ...recipes.map((r) => ({ path: routes.recipe(r.slug), priority: 0.5 })),
    ...news.map((n) => ({ path: routes.article(n.slug), priority: 0.5 })),
  ];

  return paths.map(({ path, priority }) => ({
    url: absoluteUrl(routing.defaultLocale, path),
    priority,
    changeFrequency: "monthly",
    alternates: {
      languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(l, path)])),
    },
  }));
}
