import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandMark } from "@/components/brand/Logo";
import { Breadcrumbs } from "@/components/layout/PageIntro";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { PhotoTag } from "@/components/ui/PhotoTag";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { routing } from "@/i18n/routing";
import { brands, categories, getBrand, getProduct, productsByBrand } from "@/data/catalog";
import { pick } from "@/data/types";
import { toCard } from "@/lib/productView";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

const LANDING = ["natura", "milkland"] as const;

const STAGE: Record<(typeof LANDING)[number], { photo: string; lineup: string[]; heights: number[] }> = {
  natura: {
    photo: "/images/photos/rainbow-hills.webp",
    lineup: ["natura-jogurt-2-8-1-5kg", "natura-trajno-mlijeko-3-2", "natura-kisela-pavlaka-20-800g", "natura-kefir-2-8-300g", "natura-trajno-mlijeko-0-5"],
    heights: [86, 100, 50, 52, 92],
  },
  milkland: {
    photo: "/images/photos/milk-glass-white.webp",
    lineup: ["milkland-mlijeko-2-8", "milkland-mlijeko-3-2", "milkland-jogurt-2-8-1kg", "milkland-mlijeko-1-5"],
    heights: [92, 100, 88, 92],
  },
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => LANDING.map((brand) => ({ locale, brand })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/brendovi/[brand]">) {
  const { locale, brand } = await params;
  const b = getBrand(brand);
  if (!b || !LANDING.includes(brand as never)) return {};
  return pageMetadata({ locale, path: routes.brand(b.id), title: `${b.name} – ${pick(b.tagline, locale)}`, description: pick(b.description, locale) });
}

export default async function BrandPage({ params }: PageProps<"/[locale]/brendovi/[brand]">) {
  const { locale, brand: id } = await params;
  setRequestLocale(locale);
  if (!LANDING.includes(id as never)) notFound();
  const brand = getBrand(id)!;
  const t = await getTranslations();
  const stage = STAGE[id as (typeof LANDING)[number]];
  const items = productsByBrand(brand.id);
  const other = brands.find((b) => b.id !== brand.id && b.id !== "mi99")!;

  return (
    <>
      <section className="relative overflow-hidden pt-[120px] md:pt-[150px]" style={{ backgroundColor: brand.tone }}>
        <div className="container-x">
          <Breadcrumbs items={[{ label: t("nav.brands"), href: "/brendovi" }, { label: brand.name }]} />
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Reveal>
                <BrandMark brand={id as "natura" | "milkland"} className="h-20 w-auto md:h-24" />
              </Reveal>
              <LineReveal
                as="h1"
                className="display-lg mt-8"
                lines={[pick(brand.tagline, locale)]}
                lineClasses={["serif-accent font-normal"]}
              />
              <Reveal delay={0.15}>
                <p className="lead mt-6 max-w-lg text-ink-700">{pick(brand.description, locale)}</p>
                <p className="mt-6 font-display text-sm font-bold" style={{ color: brand.ink }}>
                  {t("brands.range", { count: items.length })}
                </p>
              </Reveal>
            </div>
            <div className="relative lg:col-span-7">
              <div className="relative aspect-[5/4] overflow-hidden rounded-[999px_999px_32px_32px] sm:aspect-[16/11] sm:rounded-[32px_220px_32px_32px]">
                <Parallax className="absolute inset-0" strength={40}>
                  <Image src={stage.photo} alt="" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                </Parallax>
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                <PhotoTag label={t("common.illustrative")} className="left-4 top-4" />
                <div className="absolute inset-x-0 bottom-[4%] flex h-[66%] items-end justify-center gap-[2%]">
                  {stage.lineup.map((slug, i) => {
                    const p = getProduct(slug)!;
                    return (
                      <Reveal key={slug} delay={0.15 + i * 0.07} className="flex h-full items-end" y={50}>
                        <Image
                          src={p.images[0].src}
                          alt={p.name}
                          width={p.images[0].width}
                          height={p.images[0].height}
                          sizes="(min-width: 1024px) 9vw, 18vw"
                          className="packshot-shadow w-auto object-contain"
                          style={{ height: `${stage.heights[i]}%` }}
                        />
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 h-10 rounded-t-[40px] bg-cream-100" />
      </section>

      <section className="pb-20">
        <div className="container-x">
          <h2 className="display-md mb-8 text-forest-900">{t("nav.products")}</h2>
          <ProductCatalog
            products={items.map((p) => toCard(p, locale))}
            categories={categories.map((c) => ({ id: c.id, name: pick(c.name, locale) }))}
            brands={brands.map((b) => ({ id: b.id, name: b.name }))}
            lockBrand
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 rounded-[28px] p-8 md:flex-row md:items-center md:p-12" style={{ backgroundColor: other.tone }}>
            <div className="flex items-center gap-6">
              <BrandMark brand={other.id as "natura" | "milkland"} className="h-14 w-auto" />
              <p className="serif-accent text-[1.6rem] leading-tight" style={{ color: other.ink }}>
                {pick(other.tagline, locale)}
              </p>
            </div>
            <ButtonLink href={routes.brand(other.id)}>{t("brands.discover", { brand: other.name })}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
