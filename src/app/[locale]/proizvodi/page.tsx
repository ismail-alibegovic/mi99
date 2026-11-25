import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs, PageIntro } from "@/components/layout/PageIntro";
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORY_HERO } from "@/components/layout/SiteHeader";
import { brands, categories, getProduct, products, productsByCategory } from "@/data/catalog";
import { pick } from "@/data/types";
import { toCard } from "@/lib/productView";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/proizvodi">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({ locale, path: routes.products, title: t("meta.products"), description: t("product.catalogText") });
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/proizvodi">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <PageIntro
        crumbs={<Breadcrumbs items={[{ label: t("nav.products") }]} />}
        eyebrow={t("nav.products")}
        title={t("product.catalogTitle")}
        lead={t("product.catalogText")}
      />

      <section className="pb-6">
        <div className="container-x">
          <ul className="no-scrollbar -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:px-0 lg:grid-cols-6">
            {categories.map((c, i) => {
              const p = getProduct(CATEGORY_HERO[c.id])!;
              return (
                <Reveal as="li" key={c.id} delay={i * 0.05} className="min-w-[44%] snap-start sm:min-w-[30%] md:min-w-0">
                  <Link href={routes.category(c.id)} className="group flex h-full flex-col overflow-hidden rounded-[22px] p-4" style={{ backgroundColor: c.tone }}>
                    <span className="flex h-[130px] items-end justify-center">
                      <Image src={p.images[0].src} alt="" width={p.images[0].width} height={p.images[0].height} sizes="140px" className="packshot-shadow h-[118px] w-auto transition-transform duration-700 ease-out-soft group-hover:-translate-y-1.5" />
                    </span>
                    <span className="mt-4 font-display text-[1.02rem] font-bold tracking-[-0.02em] text-forest-950">{pick(c.name, locale)}</span>
                    <span className="text-[0.8rem] text-ink-500">{t("nav.productsInCategory", { count: productsByCategory(c.id).length })}</span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="pb-24 pt-10">
        <div className="container-x">
          <ProductCatalog
            products={products.map((p) => toCard(p, locale))}
            categories={categories.map((c) => ({ id: c.id, name: pick(c.name, locale) }))}
            brands={brands.map((b) => ({ id: b.id, name: b.name }))}
          />
        </div>
      </section>
    </>
  );
}
