import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/layout/PageIntro";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { brands, categories, getCategory, productsByCategory } from "@/data/catalog";
import { pick } from "@/data/types";
import { toCard } from "@/lib/productView";
import { pageMetadata } from "@/lib/seo";
import { cn, routes } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => categories.map((c) => ({ locale, category: c.id })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/proizvodi/kategorija/[category]">) {
  const { locale, category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({
    locale,
    path: routes.category(c.id),
    title: `${pick(c.name, locale)} – Natura, Milkland, MI99`,
    description: pick(c.intro, locale),
  });
}

export default async function CategoryPage({ params }: PageProps<"/[locale]/proizvodi/kategorija/[category]">) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const c = getCategory(category);
  if (!c) notFound();
  const t = await getTranslations();
  const items = productsByCategory(c.id);
  const hero = items.slice(0, 5);

  return (
    <>
      <section className="relative overflow-hidden pb-0 pt-[120px] md:pt-[150px]" style={{ backgroundColor: c.tone }}>
        <div className="container-x">
          <Breadcrumbs items={[{ label: t("nav.products"), href: routes.products }, { label: pick(c.name, locale) }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow" style={{ color: c.accent }}>
                {pick(c.short, locale)}
              </p>
              <LineReveal as="h1" className="display-xl mt-5" lines={[pick(c.name, locale)]} lineClasses={["text-forest-950"]} />
              <Reveal delay={0.15}>
                <p className="lead mt-6 max-w-xl text-ink-700">{pick(c.intro, locale)}</p>
              </Reveal>
            </div>
            <div className="relative flex h-[260px] items-end justify-center gap-[3%] sm:h-[340px] lg:col-span-6 lg:h-[420px]">
              {hero.map((p, i) => (
                <Reveal key={p.slug} delay={0.1 + i * 0.08} className={cn("flex h-full items-end", i > 2 && "hidden sm:flex")}>
                  <Image
                    src={p.images[0].src}
                    alt={p.name}
                    width={p.images[0].width}
                    height={p.images[0].height}
                    priority={i < 3}
                    sizes="(min-width: 1024px) 10vw, 25vw"
                    className="packshot-shadow w-auto object-contain"
                    style={{ height: `${p.size.unit === "kg" || p.size.value >= 800 ? 80 : p.size.unit === "l" ? 92 : 58}%` }}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 h-10 rounded-t-[40px] bg-cream-100" />
      </section>

      <section className="pb-20">
        <div className="container-x">
          <ProductCatalog
            products={items.map((p) => toCard(p, locale))}
            categories={categories.map((x) => ({ id: x.id, name: pick(x.name, locale) }))}
            brands={brands.map((b) => ({ id: b.id, name: b.name }))}
            initialCategory={c.id}
            lockCategory
          />
        </div>
      </section>

      <section className="border-t border-forest-900/10 py-14">
        <div className="container-x flex flex-wrap items-center gap-3">
          <span className="eyebrow mr-3 text-ink-500">{t("nav.categories")}</span>
          {categories
            .filter((x) => x.id !== c.id)
            .map((x) => (
              <Link
                key={x.id}
                href={routes.category(x.id)}
                className="rounded-full border border-forest-900/15 px-4 py-2 text-[0.9rem] font-semibold text-forest-900 transition-colors hover:border-forest-900"
              >
                {pick(x.name, locale)}
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
