import { getTranslations, setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { Highlights } from "@/components/home/Highlights";
import { ProductShowcase, type ShowcaseCategory } from "@/components/home/ProductShowcase";
import { BrandsSection } from "@/components/home/BrandsSection";
import { NatureStory } from "@/components/home/NatureStory";
import { ProductionTeaser } from "@/components/home/ProductionTeaser";
import { Lifestyle } from "@/components/home/Lifestyle";
import { PartnersCta } from "@/components/home/PartnersCta";
import { RecipeCard } from "@/components/cards/RecipeCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { ButtonLink } from "@/components/ui/Button";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { categories, getBrand, getProduct, productsByCategory, productTitle, formatSize, formatFat } from "@/data/catalog";
import { news } from "@/data/news";
import { recipes } from "@/data/recipes";
import { pick } from "@/data/types";
import { routes } from "@/lib/site";

const FEATURED: Record<string, string[]> = {
  mlijeko: ["natura-trajno-mlijeko-3-2", "natura-trajno-mlijeko-0-5", "milkland-mlijeko-3-2", "mlijeko-cafe-3-8"],
  jogurti: ["natura-jogurt-2-8-180g", "natura-jogurt-2-8-1kg", "natura-gusti-jogurt-2-8-500g", "milkland-jogurt-2-8-1kg"],
  pavlake: ["natura-kisela-pavlaka-12-800g", "natura-kisela-pavlaka-20-300g", "schmand-18-400g", "paprika-u-pavlaci-18-800g"],
  kefir: ["natura-kefir-2-8-200g", "natura-kefir-2-8-300g"],
  "grcki-jogurt": ["grcki-jogurt-150g", "grcki-jogurt-400g"],
  ayran: ["ayran-250g", "ayran-1kg"],
};

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const showcase: ShowcaseCategory[] = categories.map((c) => ({
    id: c.id,
    name: pick(c.name, locale),
    intro: pick(c.intro, locale),
    tone: c.tone,
    ink: c.toneInk,
    accent: c.accent,
    href: routes.category(c.id),
    count: productsByCategory(c.id).length,
    items: FEATURED[c.id].map((slug) => {
      const p = getProduct(slug)!;
      return {
        slug,
        href: routes.product(slug),
        title: productTitle(p, locale),
        brand: getBrand(p.brand)!.name,
        size: formatSize(p.size, locale),
        fat: formatFat(p.fat, locale),
        image: p.images[0],
      };
    }),
  }));

  const hp = (slug: string) => {
    const p = getProduct(slug)!;
    return { image: p.images[0], alt: `${productTitle(p, locale)} ${formatSize(p.size, locale)}` };
  };

  const latest = [...news].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")).slice(0, 3);

  return (
    <>
      <Hero
        milk={hp("natura-trajno-mlijeko-3-2")}
        yoghurt={hp("natura-jogurt-2-8-1kg")}
        cream={hp("natura-kisela-pavlaka-20-800g")}
      />
      <Highlights />
      <ProductShowcase data={showcase} />
      <BrandsSection />
      <NatureStory />
      <ProductionTeaser />
      <Lifestyle />

      <section className="bg-cream-50 py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-meadow-500">{t("recipes.eyebrow")}</p>
              <LineReveal
                className="display-lg mt-4 text-forest-900"
                lines={[t("recipes.title1"), t("recipes.title2")]}
                lineClasses={[undefined, "serif-accent font-normal text-forest-700"]}
              />
            </div>
            <ButtonLink href={routes.recipes} variant="outline" className="self-start md:self-auto">
              {t("recipes.all")}
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {recipes.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08} className={i % 2 === 1 ? "lg:mt-16" : undefined}>
                <RecipeCard recipe={r} tall={i % 2 === 0} />
              </Reveal>
            ))}
          </div>
          <p className="mt-12 text-[0.8rem] text-ink-500">{t("recipes.proposedNote")}</p>
        </div>
      </section>

      <PartnersCta />

      <section className="bg-cream-100 py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-meadow-500">{t("news.eyebrow")}</p>
              <LineReveal className="display-lg mt-4 text-forest-900" lines={[t("news.latest")]} />
            </div>
            <ButtonLink href={routes.news} variant="outline" className="self-start md:self-auto">
              {t("nav.news")}
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-12 lg:grid-cols-12">
            {latest.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.08} className={i === 0 ? "lg:col-span-6" : "lg:col-span-3"}>
                <NewsCard article={a} large={i === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
