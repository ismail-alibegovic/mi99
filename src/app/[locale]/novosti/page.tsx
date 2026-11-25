import { Info } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs, PageIntro } from "@/components/layout/PageIntro";
import { NewsGrid } from "@/components/news/NewsGrid";
import { news, newsCategories } from "@/data/news";
import { pick } from "@/data/types";
import { sortNews, toNewsItem } from "@/lib/newsView";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/novosti">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({ locale, path: routes.news, title: t("meta.news"), description: t("news.text") });
}

export default async function NewsPage({ params }: PageProps<"/[locale]/novosti">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageIntro
        crumbs={<Breadcrumbs items={[{ label: t("nav.news") }]} />}
        eyebrow={t("news.eyebrow")}
        title={t("news.title")}
        lead={t("news.text")}
      />
      <section className="pb-24">
        <div className="container-x">
          <NewsGrid
            items={sortNews(news).map((a) => toNewsItem(a, locale))}
            categories={newsCategories.map((c) => ({ id: c.id, name: pick(c.name, locale) }))}
            allLabel={t("news.all")}
            emptyLabel={t("news.empty")}
          />
          <p className="mt-16 flex max-w-3xl gap-3 rounded-2xl border border-dashed border-forest-900/20 p-5 text-[0.85rem] text-ink-700">
            <Info className="mt-0.5 size-4 shrink-0 text-forest-700" aria-hidden />
            {t("news.archiveNote")}
          </p>
        </div>
      </section>
    </>
  );
}
