import { Check, Download, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Breadcrumbs } from "@/components/layout/PageIntro";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductCard } from "@/components/cards/ProductCard";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import {
  formatFat,
  formatSize,
  getBrand,
  getCategory,
  getProduct,
  productTitle,
  products,
  relatedProducts,
  variantsOf,
  type Logistics,
  type Nutrition,
} from "@/data/catalog";
import { pick } from "@/data/types";
import { toCard } from "@/lib/productView";
import { absoluteUrl, JsonLd, pageMetadata, SITE_URL } from "@/lib/seo";
import { cn, routes } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/proizvodi/[slug]">) {
  const { locale, slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  const cat = getCategory(p.category)!;
  const title = `${productTitle(p, locale)} ${formatSize(p.size, locale)}`;
  return pageMetadata({
    locale,
    path: routes.product(slug),
    title,
    description: `${getBrand(p.brand)!.name} · ${pick(cat.name, locale)} · ${formatSize(p.size, locale)}${p.fat !== null ? ` · ${formatFat(p.fat, locale)}` : ""}. ${pick(cat.intro, locale)}`.slice(0, 300),
    image: p.images[0].src,
  });
}

const NUTRITION_ROWS: { key: keyof Nutrition; label: string; sub?: boolean }[] = [
  { key: "energy", label: "energy" },
  { key: "fat", label: "fatRow" },
  { key: "saturates", label: "saturates", sub: true },
  { key: "carbs", label: "carbs" },
  { key: "sugars", label: "sugars", sub: true },
  { key: "protein", label: "protein" },
  { key: "salt", label: "salt" },
];

const LOGISTIC_ROWS: (keyof Logistics)[] = [
  "primary",
  "primaryWeight",
  "primaryDims",
  "secondaryUnits",
  "secondaryWeight",
  "secondaryDims",
  "pallet",
  "palletLayers",
  "palletUnits",
  "palletWeight",
  "palletDims",
];

function localiseValue(v: string, locale: string) {
  return locale === "en" ? v.replace(/(\d),(\d)/g, "$1.$2") : v;
}

export default async function ProductPage({ params }: PageProps<"/[locale]/proizvodi/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const p = getProduct(slug);
  if (!p) notFound();
  const t = await getTranslations();
  const tp = await getTranslations("product");
  const brand = getBrand(p.brand)!;
  const cat = getCategory(p.category)!;
  const title = productTitle(p, locale);
  const size = formatSize(p.size, locale);
  const fat = formatFat(p.fat, locale);
  const variants = variantsOf(p);
  const related = relatedProducts(p, 4);
  const logistics = LOGISTIC_ROWS.filter((k) => p.logistics[k]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${title} ${size}`,
    brand: { "@type": "Brand", name: brand.name },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
    category: pick(cat.name, locale),
    image: `${SITE_URL}${p.images[0].src}`,
    url: absoluteUrl(locale, routes.product(p.slug)),
    description: pick(cat.intro, locale),
    ...(p.ean ? { gtin13: p.ean } : {}),
    ...(p.nutrition
      ? {
          nutrition: {
            "@type": "NutritionInformation",
            servingSize: "100 g",
            ...(p.nutrition.energy ? { calories: p.nutrition.energy.split("/")[1]?.trim() } : {}),
            ...(p.nutrition.fat ? { fatContent: p.nutrition.fat } : {}),
            ...(p.nutrition.protein ? { proteinContent: p.nutrition.protein } : {}),
            ...(p.nutrition.carbs ? { carbohydrateContent: p.nutrition.carbs } : {}),
          },
        }
      : {}),
  };

  return (
    <>
      <section className="pt-[92px] md:pt-[104px]">
        <div className="container-x grid gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="lg:sticky lg:top-[92px] lg:self-start">
            <ProductGallery
              images={p.images}
              alt={`${title} ${size} – ${brand.name}`}
              tone={cat.tone}
              note={tp("packshotNote")}
              variantLabel={p.images.map((_, i) => tp("designVariant", { n: i + 1 }))}
            />
          </div>

          <div className="pb-10 lg:pt-8">
            <Breadcrumbs
              items={[
                { label: t("nav.products"), href: routes.products },
                { label: pick(cat.name, locale), href: routes.category(cat.id) },
                { label: `${title} ${size}` },
              ]}
            />
            <div className="mt-10">
              <p className="eyebrow" style={{ color: cat.accent }}>
                {p.brand === "mi99" ? (
                  brand.name
                ) : (
                  <Link href={routes.brand(p.brand)} className="hover:underline">
                    {brand.name}
                  </Link>
                )}{" "}
                · {pick(cat.name, locale)}
              </p>
              <h1 className="display-lg mt-4 text-forest-950">
                {title}
                <span className="serif-accent mt-2 block text-[0.62em] font-normal text-forest-700">{size}</span>
              </h1>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-forest-900/10 sm:grid-cols-4">
              {[
                [tp("brand"), brand.name],
                [tp("size"), size],
                [tp("fat"), fat ?? (p.nutrition?.fat ? `${localiseValue(p.nutrition.fat, locale)} / 100 g` : "—")],
                [tp("packaging"), p.logistics.primary ?? "—"],
              ].map(([k, v]) => (
                <div key={k} className="bg-cream-50 p-4">
                  <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-500">{k}</dt>
                  <dd className="mt-1.5 font-display text-[1.02rem] font-bold tracking-[-0.01em] text-forest-900">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="lead mt-8 text-ink-700">{pick(cat.intro, locale)}</p>

            {p.claims.length > 0 && (
              <div className="mt-8">
                <p className="eyebrow text-ink-500">{tp("highlights")}</p>
                <ul className="mt-4 space-y-2.5">
                  {p.claims.map((c) => (
                    <li key={c} className="flex gap-3 text-[1rem] text-ink-900">
                      <Check className="mt-1 size-4 shrink-0 text-meadow-500" aria-hidden />
                      {tp(`bullets.${c}`)}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.75rem] text-ink-500">{tp("fromSource")}</p>
              </div>
            )}

            {variants.length > 1 && (
              <div className="mt-10">
                <p className="eyebrow text-ink-500">{tp("variants")}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {variants.map((v) => {
                    const label = [formatSize(v.size, locale), formatFat(v.fat, locale)].filter(Boolean).join(" · ");
                    const current = v.slug === p.slug;
                    return (
                      <li key={v.slug}>
                        <Link
                          href={routes.product(v.slug)}
                          aria-current={current ? "page" : undefined}
                          className={cn(
                            "inline-flex rounded-full border px-4 py-2 text-[0.9rem] font-semibold transition-colors",
                            current ? "border-forest-900 bg-forest-900 text-cream-50" : "border-forest-900/15 text-forest-900 hover:border-forest-900",
                          )}
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Nutrition */}
            <div className="mt-12">
              <h2 className="display-sm text-forest-900">{tp("nutrition")}</h2>
              {p.nutrition ? (
                <table className="mt-5 w-full text-[0.95rem]">
                  <tbody>
                    {NUTRITION_ROWS.filter((r) => p.nutrition?.[r.key]).map((r) => (
                      <tr key={r.key} className="border-b border-forest-900/10">
                        <th scope="row" className={cn("py-3 text-left font-medium text-ink-700", r.sub && "pl-5 text-[0.88rem] font-normal text-ink-500")}>
                          {tp(r.label)}
                        </th>
                        <td className="py-3 text-right font-display font-bold tabular-nums text-forest-900">
                          {localiseValue(p.nutrition![r.key]!, locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-4 rounded-2xl bg-cream-200/60 p-5 text-[0.95rem] text-ink-700">{tp("nutritionMissing")}</p>
              )}
            </div>

            {/* Ingredients & storage – only where verified */}
            {p.spec && (
              <div className="mt-12">
                <h2 className="display-sm text-forest-900">{tp("details")}</h2>
                <dl className="mt-5 divide-y divide-forest-900/10 border-y border-forest-900/10 text-[0.95rem]">
                  {p.spec.ingredients && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                      <dt className="font-medium text-ink-500">{tp("ingredients")}</dt>
                      <dd className="text-ink-900">{pick(p.spec.ingredients, locale)}</dd>
                    </div>
                  )}
                  {p.spec.storage && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                      <dt className="font-medium text-ink-500">{tp("storage")}</dt>
                      <dd className="text-ink-900">{pick(p.spec.storage, locale)}</dd>
                    </div>
                  )}
                  {p.spec.shelfLifeDays && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                      <dt className="font-medium text-ink-500">{tp("shelfLife")}</dt>
                      <dd className="text-ink-900">{tp("shelfLifeDays", { days: p.spec.shelfLifeDays })}</dd>
                    </div>
                  )}
                  {p.spec.afterOpening && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                      <dt className="font-medium text-ink-500">{tp("afterOpening")}</dt>
                      <dd className="text-ink-900">{pick(p.spec.afterOpening, locale)}</dd>
                    </div>
                  )}
                  {p.spec.containsMilk && (
                    <div className="grid gap-1 py-3 sm:grid-cols-[180px_1fr]">
                      <dt className="font-medium text-ink-500">{tp("allergens")}</dt>
                      <dd className="font-semibold text-ink-900">{tp("containsMilk")}</dd>
                    </div>
                  )}
                </dl>
                <p className="mt-3 text-[0.75rem] text-ink-500">
                  {tp("specSource")}: {p.spec.source}
                </p>
              </div>
            )}

            {/* Logistics – B2B */}
            {(logistics.length > 0 || p.ean) && (
              <details className="group mt-12 rounded-2xl border border-forest-900/12 bg-cream-50 open:shadow-[0_20px_50px_-35px_rgb(20_61_42/0.5)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-[1.1rem] font-bold text-forest-900 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <FileText className="size-5 text-meadow-500" aria-hidden />
                    {tp("logistics")}
                  </span>
                  <span className="text-2xl leading-none text-ink-500 transition-transform duration-300 group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5">
                  <table className="w-full text-[0.9rem]">
                    <tbody>
                      {p.ean && (
                        <tr className="border-b border-forest-900/10">
                          <th scope="row" className="py-2.5 pr-4 text-left font-medium text-ink-500">{tp("ean")}</th>
                          <td className="py-2.5 text-right font-mono text-forest-900">{p.ean}</td>
                        </tr>
                      )}
                      {logistics.map((k) => (
                        <tr key={k} className="border-b border-forest-900/10 last:border-0">
                          <th scope="row" className="py-2.5 pr-4 text-left font-medium text-ink-500">{tp(k)}</th>
                          <td className="py-2.5 text-right font-semibold tabular-nums text-forest-900">{localiseValue(p.logistics[k]!, locale)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {p.specFile && (
                    <ButtonA href={p.specFile} target="_blank" rel="noopener" variant="outline" download className="mt-5 w-full sm:w-auto">
                      {tp("downloadSpec")}
                    </ButtonA>
                  )}
                </div>
              </details>
            )}

            <div className="mt-10 overflow-hidden rounded-[24px] bg-forest-900 p-7 text-cream-50 md:p-9">
              <h2 className="display-sm">{tp("inquiryTitle")}</h2>
              <p className="mt-3 text-cream-50/75">{tp("inquiryText")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={`${routes.partners}?proizvod=${p.slug}#upit`} variant="light">
                  {tp("inquiryCta")}
                </ButtonLink>
                {p.specFile && (
                  <a href={p.specFile} target="_blank" rel="noopener" className="inline-flex h-12 items-center gap-2 px-2 text-[0.92rem] font-semibold text-cream-50/85 hover:text-cream-50">
                    <Download className="size-4" aria-hidden /> PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <h2 className="display-md text-forest-900">{tp("related")}</h2>
          </Reveal>
          <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {related.map((r) => (
              <li key={r.slug}>
                <ProductCard p={toCard(r, locale)} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd data={jsonLd} />
    </>
  );
}
