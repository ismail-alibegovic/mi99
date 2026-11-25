import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { newsCategories, type NewsArticle } from "@/data/news";
import { pick } from "@/data/types";
import { cn, formatDate, routes } from "@/lib/site";

export async function NewsDate({ article }: { article: NewsArticle }) {
  const locale = await getLocale();
  const t = await getTranslations("common");
  if (article.date) return <time dateTime={article.date}>{formatDate(article.date, locale)}</time>;
  if (article.year) return <span>{t("year", { year: article.year })}</span>;
  return <span>{t("undated")}</span>;
}

export async function NewsCard({ article, large, className }: { article: NewsArticle; large?: boolean; className?: string }) {
  const locale = await getLocale();
  const cat = newsCategories.find((c) => c.id === article.category)!;
  return (
    <Link href={routes.article(article.slug)} className={cn("group flex flex-col", className)}>
      <span className={cn("relative block overflow-hidden rounded-[24px] bg-cream-200", large ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Image
          src={article.image}
          alt={pick(article.imageAlt, locale)}
          fill
          sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.04]"
        />
      </span>
      <span className="mt-5 flex flex-wrap items-center gap-3 text-[0.8rem] font-medium text-ink-500">
        <span className="rounded-full bg-meadow-100 px-2.5 py-0.5 font-semibold text-forest-800">{pick(cat.name, locale)}</span>
        <NewsDate article={article} />
      </span>
      <span
        className={cn(
          "mt-3 block font-display font-bold leading-[1.15] tracking-[-0.025em] text-forest-900 group-hover:underline",
          large ? "text-[clamp(1.5rem,2.4vw,2.15rem)]" : "text-[1.25rem]",
        )}
      >
        {pick(article.title, locale)}
      </span>
      <span className="mt-3 block text-[0.95rem] leading-relaxed text-ink-700">{pick(article.excerpt, locale)}</span>
    </Link>
  );
}
