import { ArrowUpRight, FileText } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { NewsCard } from "@/components/cards/NewsCard";
import { Breadcrumbs } from "@/components/layout/PageIntro";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { routing } from "@/i18n/routing";
import { getArticle, news, newsCategories } from "@/data/news";
import { pick } from "@/data/types";
import { dateLabel, sortNews } from "@/lib/newsView";
import { absoluteUrl, JsonLd, pageMetadata, SITE_URL } from "@/lib/seo";
import { routes } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => news.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/novosti/[slug]">) {
  const { locale, slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ locale, path: routes.article(slug), title: pick(a.title, locale), description: pick(a.excerpt, locale), image: a.image });
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/novosti/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const a = getArticle(slug);
  if (!a) notFound();
  const t = await getTranslations();
  const cat = newsCategories.find((c) => c.id === a.category)!;
  const body = a.body[locale as "bs" | "en" | "de"] ?? a.body.bs;
  const more = sortNews(news.filter((n) => n.slug !== a.slug)).slice(0, 3);
  const isFile = a.source.href.startsWith("/");

  return (
    <>
      <article>
        <header className="pt-[120px] md:pt-[150px]">
          <div className="container-x">
            <Breadcrumbs items={[{ label: t("nav.news"), href: routes.news }, { label: pick(a.title, locale) }]} />
            <div className="mx-auto mt-12 max-w-4xl">
              <p className="flex flex-wrap items-center gap-3 text-[0.85rem] font-medium text-ink-500">
                <span className="rounded-full bg-meadow-100 px-3 py-1 font-semibold text-forest-800">{pick(cat.name, locale)}</span>
                {a.date ? <time dateTime={a.date}>{dateLabel(a, locale)}</time> : <span>{dateLabel(a, locale)}</span>}
              </p>
              <LineReveal as="h1" className="display-lg mt-6 text-forest-900" lines={[pick(a.title, locale)]} />
              <Reveal delay={0.15}>
                <p className="lead mt-6 text-ink-700">{pick(a.excerpt, locale)}</p>
              </Reveal>
            </div>
          </div>
        </header>
        <Reveal className="container-x mt-12">
          <div className="relative mx-auto aspect-[16/9] max-w-6xl overflow-hidden rounded-[28px] bg-cream-200">
            <Image src={a.image} alt={pick(a.imageAlt, locale)} fill priority sizes="(min-width: 1280px) 1150px, 100vw" className="object-cover" />
          </div>
        </Reveal>
        <div className="container-x py-14 md:py-20">
          <div className="prose-mi mx-auto max-w-[68ch] text-[1.12rem] leading-[1.75] text-ink-900">
            {body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-[68ch] border-t border-forest-900/12 pt-6">
            <p className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ink-500">{t("common.source")}</p>
            <a
              href={a.source.href}
              {...(isFile ? { target: "_blank", rel: "noopener" } : { target: "_blank", rel: "noopener noreferrer" })}
              className="mt-2 inline-flex items-center gap-2 font-display font-bold text-forest-900 hover:underline"
            >
              {isFile ? <FileText className="size-4" aria-hidden /> : <ArrowUpRight className="size-4" aria-hidden />}
              {a.source.label}
            </a>
          </div>
        </div>
      </article>

      <section className="bg-cream-50 py-20">
        <div className="container-x">
          <h2 className="display-md text-forest-900">{t("news.related")}</h2>
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {more.map((m) => (
              <NewsCard key={m.slug} article={m} />
            ))}
          </div>
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          headline: pick(a.title, locale),
          description: pick(a.excerpt, locale),
          image: [`${SITE_URL}${a.image}`],
          ...(a.date ? { datePublished: a.date } : {}),
          url: absoluteUrl(locale, routes.article(a.slug)),
          publisher: { "@id": `${SITE_URL}/#organization` },
          author: { "@id": `${SITE_URL}/#organization` },
        }}
      />
    </>
  );
}
