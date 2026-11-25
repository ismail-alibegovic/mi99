import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs, PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { PhotoTag } from "@/components/ui/PhotoTag";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { company, marketNames } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/o-nama">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({ locale, path: routes.about, title: t("meta.about"), description: t("about.lead"), image: "/images/company/tvornica-gradacac.webp" });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/o-nama">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const nf = new Intl.NumberFormat(locale === "bs" ? "bs-BA" : locale);
  const markets = ["BA", ...company.regionalMarkets];

  return (
    <>
      <PageIntro
        crumbs={<Breadcrumbs items={[{ label: t("nav.about") }]} />}
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
      />

      <section className="relative">
        <div className="container-x">
          <figure className="relative">
            <Parallax className="aspect-[16/10] rounded-[32px] md:aspect-[21/9]" strength={50}>
              <Image src="/images/company/tvornica-gradacac.webp" alt={t("about.factoryCaption")} fill priority sizes="100vw" className="object-cover object-[30%_50%]" />
            </Parallax>
            <PhotoTag label={t("common.original")} className="left-4 top-4" />
            <figcaption className="mt-3 text-[0.85rem] text-ink-500">{t("about.factoryCaption")}</figcaption>
          </figure>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="display-sm text-forest-900">{t("about.lead")}</p>
          </Reveal>
          <Reveal delay={0.1} className="prose-mi space-y-5 text-[1.05rem] leading-relaxed text-ink-700 lg:col-span-6 lg:col-start-7">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-cream-50 md:py-28">
        <div className="container-x grid gap-px overflow-hidden rounded-[28px] bg-cream-50/10 md:grid-cols-2">
          {[
            [t("about.missionTitle"), t("about.mission")],
            [t("about.visionTitle"), t("about.vision")],
          ].map(([title, text], i) => (
            <Reveal key={title} delay={i * 0.1} className="bg-forest-900 p-8 md:p-14">
              <p className="eyebrow text-meadow-300">{title}</p>
              <p className="serif-accent mt-6 text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.15]">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <LineReveal className="display-lg text-forest-900" lines={[t("about.peopleTitle")]} />
          <ul className="mt-12 grid gap-8 border-t border-forest-900/12 pt-10 sm:grid-cols-3">
            {[
              [nf.format(company.published.employees), t("about.employees")],
              [nf.format(company.published.graduates), t("about.graduates")],
              [`${nf.format(company.published.farmers)}+`, t("about.farmers")],
            ].map(([v, l], i) => (
              <Reveal as="li" key={l} delay={i * 0.08}>
                <p className="font-display text-[clamp(3.5rem,7vw,6rem)] font-extrabold leading-none tracking-[-0.06em] text-forest-900">{v}</p>
                <p className="mt-3 text-[1rem] text-ink-700">{l}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8 text-[0.8rem] text-ink-500">{t("about.peopleNote")}</p>
        </div>
      </section>

      <section className="bg-milkblue-100 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <LineReveal className="display-md text-forest-900" lines={[t("about.marketsTitle")]} />
            <Reveal delay={0.1}>
              <p className="lead mt-6 text-ink-700">{t("about.marketsText")}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {markets.map((m) => (
                  <li key={m} className="rounded-full bg-cream-50 px-4 py-2 text-[0.9rem] font-semibold text-forest-900">
                    {marketNames[m][locale] ?? marketNames[m].bs}
                  </li>
                ))}
              </ul>
              <ButtonLink href={routes.partners} className="mt-10">
                {t("partners.cta")}
              </ButtonLink>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <Image src="/images/company/kamion.webp" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <PhotoTag label={t("common.original")} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
