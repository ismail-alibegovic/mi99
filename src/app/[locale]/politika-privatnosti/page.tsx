import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs, PageIntro } from "@/components/layout/PageIntro";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/politika-privatnosti">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return { ...pageMetadata({ locale, path: routes.privacy, title: t("meta.privacy"), description: t("privacy.intro") }), robots: { index: false } };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/politika-privatnosti">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const sections = t.raw("privacy.sections") as { title: string; text: string }[];
  return (
    <>
      <PageIntro crumbs={<Breadcrumbs items={[{ label: t("privacy.title") }]} />} eyebrow={t("privacy.updated")} title={t("privacy.title")} lead={t("privacy.intro")} />
      <section className="pb-24">
        <div className="container-x">
          <div className="max-w-3xl divide-y divide-forest-900/10 border-y border-forest-900/10">
            {sections.map((s) => (
              <div key={s.title} className="grid gap-3 py-8 md:grid-cols-[220px_1fr]">
                <h2 className="font-display text-[1.15rem] font-bold tracking-[-0.02em] text-forest-900">{s.title}</h2>
                <p className="leading-relaxed text-ink-700">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
