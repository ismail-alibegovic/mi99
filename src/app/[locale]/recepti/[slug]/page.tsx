import { ChefHat, Clock, Lightbulb, Users } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs } from "@/components/layout/PageIntro";
import { ProductCard } from "@/components/cards/ProductCard";
import { RecipeCard } from "@/components/cards/RecipeCard";
import { PhotoTag } from "@/components/ui/PhotoTag";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { routing } from "@/i18n/routing";
import { getProduct } from "@/data/catalog";
import { getRecipe, recipes } from "@/data/recipes";
import { pick } from "@/data/types";
import { toCard } from "@/lib/productView";
import { absoluteUrl, JsonLd, pageMetadata, SITE_URL } from "@/lib/seo";
import { routes } from "@/lib/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => recipes.map((r) => ({ locale, slug: r.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/recepti/[slug]">) {
  const { locale, slug } = await params;
  const r = getRecipe(slug);
  if (!r) return {};
  return pageMetadata({ locale, path: routes.recipe(slug), title: pick(r.title, locale), description: pick(r.intro, locale), image: r.image });
}

export default async function RecipePage({ params }: PageProps<"/[locale]/recepti/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const r = getRecipe(slug);
  if (!r) notFound();
  const t = await getTranslations();
  const l = locale as "bs" | "en" | "de";
  const used = r.products.map((s) => getProduct(s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const more = recipes.filter((x) => x.slug !== r.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: pick(r.title, locale),
    description: pick(r.intro, locale),
    image: `${SITE_URL}${r.image}`,
    url: absoluteUrl(locale, routes.recipe(r.slug)),
    totalTime: `PT${r.minutes}M`,
    recipeYield: String(r.servings),
    recipeIngredient: r.ingredients[l],
    recipeInstructions: r.steps[l].map((s) => ({ "@type": "HowToStep", text: s })),
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <section className="pt-[120px] md:pt-[150px]">
        <div className="container-x">
          <Breadcrumbs items={[{ label: t("nav.recipes"), href: routes.recipes }, { label: pick(r.title, locale) }]} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow text-meadow-500">{t("common.proposed")}</p>
              <LineReveal as="h1" className="display-lg mt-5 text-forest-900" lines={[pick(r.title, locale)]} />
              <Reveal delay={0.15}>
                <p className="lead mt-6 max-w-xl text-ink-700">{pick(r.intro, locale)}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <dl className="mt-8 flex flex-wrap gap-3">
                  {[
                    [Clock, t("recipes.time"), t("common.minutes", { count: r.minutes })],
                    [Users, t("recipes.servingsLabel"), String(r.servings)],
                    [ChefHat, t("recipes.difficulty"), pick(r.difficulty, locale)],
                  ].map(([Icon, label, value]) => {
                    const I = Icon as typeof Clock;
                    return (
                      <div key={label as string} className="flex items-center gap-3 rounded-full bg-cream-50 py-2 pl-2 pr-5">
                        <span className="flex size-9 items-center justify-center rounded-full bg-meadow-100 text-forest-800">
                          <I className="size-4" aria-hidden />
                        </span>
                        <span>
                          <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-ink-500">{label as string}</dt>
                          <dd className="font-display text-[0.98rem] font-bold text-forest-900">{value as string}</dd>
                        </span>
                      </div>
                    );
                  })}
                </dl>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="relative lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[32px_32px_32px_160px]">
                <Image src={r.image} alt={pick(r.imageAlt, locale)} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
              </div>
              <PhotoTag label={t("common.illustrative")} className="right-4 top-4" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="rounded-[28px] bg-meadow-100 p-7 lg:sticky lg:top-28">
              <h2 className="display-sm text-forest-900">{t("recipes.ingredients")}</h2>
              <ul className="mt-5 space-y-3 text-[0.98rem] text-ink-900">
                {r.ingredients[l].map((ing) => (
                  <li key={ing} className="flex gap-3">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-meadow-500" aria-hidden />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 className="display-sm text-forest-900">{t("recipes.steps")}</h2>
            <ol className="mt-6 space-y-6">
              {r.steps[l].map((s, i) => (
                <Reveal as="li" key={i} delay={i * 0.04} className="grid grid-cols-[3.25rem_1fr] gap-4 border-b border-forest-900/10 pb-6">
                  <span className="font-display text-[2rem] font-extrabold leading-none tracking-[-0.05em] text-meadow-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-[1.05rem] leading-relaxed text-ink-900">{s}</p>
                </Reveal>
              ))}
            </ol>
            <div className="mt-10 flex gap-4 rounded-[24px] border border-forest-900/10 bg-cream-50 p-6">
              <Lightbulb className="mt-0.5 size-5 shrink-0 text-meadow-500" aria-hidden />
              <p>
                <span className="font-display font-bold text-forest-900">{t("recipes.tip")}: </span>
                <span className="text-ink-700">{pick(r.tip, locale)}</span>
              </p>
            </div>

            {used.length > 0 && (
              <div className="mt-14">
                <h2 className="display-sm text-forest-900">{t("recipes.usedProducts")}</h2>
                <ul className="mt-6 grid grid-cols-2 gap-5">
                  {used.map((p) => (
                    <li key={p.slug}>
                      <ProductCard p={toCard(p, locale)} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-12 text-[0.8rem] text-ink-500">{t("recipes.proposedNote")}</p>
          </div>
        </div>
      </section>

      <section className="bg-cream-50 py-20">
        <div className="container-x">
          <h2 className="display-md text-forest-900">{t("recipes.more")}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m) => (
              <RecipeCard key={m.slug} recipe={m} />
            ))}
          </div>
        </div>
      </section>
      <JsonLd data={jsonLd} />
    </>
  );
}
