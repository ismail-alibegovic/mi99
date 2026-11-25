import type { NewsItem } from "@/components/news/NewsGrid";
import { newsCategories, type NewsArticle } from "@/data/news";
import { pick } from "@/data/types";
import { formatDate, routes } from "./site";

const UNDATED: Record<string, string> = { bs: "Iz arhive kompanije", en: "From the company archive", de: "Aus dem Unternehmensarchiv" };
const YEAR: Record<string, string> = { bs: "Godina", en: "Year", de: "Jahr" };

export function dateLabel(a: NewsArticle, locale: string) {
  if (a.date) return formatDate(a.date, locale);
  if (a.year) return `${YEAR[locale] ?? YEAR.bs} ${a.year}`;
  return UNDATED[locale] ?? UNDATED.bs;
}

export function toNewsItem(a: NewsArticle, locale: string): NewsItem {
  return {
    slug: a.slug,
    href: routes.article(a.slug),
    category: a.category,
    categoryName: pick(newsCategories.find((c) => c.id === a.category)!.name, locale),
    dateLabel: dateLabel(a, locale),
    dateTime: a.date,
    title: pick(a.title, locale),
    excerpt: pick(a.excerpt, locale),
    image: a.image,
    imageAlt: pick(a.imageAlt, locale),
  };
}

/** Dated articles first (newest first), then undated ones in source order. */
export function sortNews(list: NewsArticle[]) {
  return [...list].sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
}
