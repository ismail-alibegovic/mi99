import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs, PageIntro } from "@/components/layout/PageIntro";
import { RecipeCard } from "@/components/cards/RecipeCard";
import { Reveal } from "@/components/ui/Reveal";
import { recipes } from "@/data/recipes";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/recepti">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({ locale, path: routes.recipes, title: t("meta.recipes"), description: t("recipes.text") });
}

export default async function RecipesPage({ params }: PageProps<"/[locale]/recepti">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <>
      <PageIntro
        crumbs={<Breadcrumbs items={[{ label: t("nav.recipes") }]} />}
        eyebrow={t("recipes.eyebrow")}
        title={t("recipes.title1")}
        accent={t("recipes.title2")}
        lead={t("recipes.text")}
      />
      <section className="pb-24">
        <div className="container-x">
          <p className="mb-10 inline-flex rounded-full bg-meadow-100 px-4 py-2 text-[0.82rem] font-semibold text-forest-800">
            {t("common.proposed")}
          </p>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
            {recipes.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "sm:mt-24" : undefined}>
                <RecipeCard recipe={r} tall={i === 0 || i === 3} />
              </Reveal>
            ))}
          </div>
          <p className="mt-16 max-w-2xl text-[0.82rem] text-ink-500">{t("recipes.proposedNote")}</p>
        </div>
      </section>
    </>
  );
}
