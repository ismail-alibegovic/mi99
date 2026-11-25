import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Breadcrumbs, PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { PhotoTag } from "@/components/ui/PhotoTag";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { formatSize, productTitle, products } from "@/data/catalog";
import { company, marketNames } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/poslovna-saradnja">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({ locale, path: routes.partners, title: t("meta.partners"), description: t("partners.text") });
}

export default async function PartnersPage({ params }: PageProps<"/[locale]/poslovna-saradnja">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const segments = t.raw("partners.segments") as { title: string; text: string }[];
  const capabilities = t.raw("partners.capabilities") as { value: string; label: string }[];
  const live = Boolean(process.env.INQUIRY_WEBHOOK_URL);

  return (
    <>
      <PageIntro
        crumbs={<Breadcrumbs items={[{ label: t("nav.partners") }]} />}
        eyebrow={t("partners.eyebrow")}
        title={t("partners.title")}
        lead={t("partners.text")}
        aside={
          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px_160px_28px_28px]">
              <Image src="/images/company/kamion.webp" alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <PhotoTag label={t("common.original")} />
          </Reveal>
        }
      />

      <section className="pb-20 md:pb-28">
        <div className="container-x">
          <ul className="grid gap-px overflow-hidden rounded-[28px] bg-forest-900/10 sm:grid-cols-2 lg:grid-cols-5">
            {segments.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="bg-cream-50 p-7">
                <span className="font-display text-sm font-bold text-meadow-500">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-8 font-display text-[1.3rem] font-bold tracking-[-0.025em] text-forest-900">{s.title}</h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-700">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-forest-900 py-20 text-cream-50 md:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-meadow-300">{t("partners.capabilitiesTitle")}</p>
            <LineReveal className="display-md mt-4" lines={[t("partners.logisticsTitle")]} />
            <p className="mt-6 max-w-md text-cream-50/75">{t("partners.logisticsText")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={routes.products} variant="light">
                {t("partners.ctaSpecs")}
              </ButtonLink>
            </div>
            <p className="mt-10 eyebrow text-meadow-300">{t("about.marketsTitle")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {["BA", ...company.regionalMarkets].map((m) => (
                <li key={m} className="rounded-full border border-cream-50/20 px-3.5 py-1.5 text-[0.85rem]">
                  {marketNames[m][locale] ?? marketNames[m].bs}
                </li>
              ))}
            </ul>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-[24px] bg-cream-50/10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
            {capabilities.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.06} className="bg-forest-900 p-7 md:p-9">
                <p className="font-display text-[clamp(2.2rem,4vw,3.4rem)] font-extrabold leading-none tracking-[-0.05em]">{c.value}</p>
                <p className="mt-3 text-[0.95rem] text-cream-50/70">{c.label}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section id="upit" className="scroll-mt-24 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LineReveal className="display-md text-forest-900" lines={[t("partners.formTitle")]} />
            <p className="mt-5 text-ink-700">{t("partners.formText")}</p>
            <dl className="mt-10 space-y-4 text-[0.95rem]">
              <div>
                <dt className="text-ink-500">{t("contact.phone")}</dt>
                <dd>
                  <a href={company.phoneHref} className="font-display text-lg font-bold text-forest-900 hover:underline">
                    {company.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-ink-500">{t("contact.email")}</dt>
                <dd>
                  <a href={`mailto:${company.email}`} className="font-display text-lg font-bold text-forest-900 hover:underline">
                    {company.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-[28px] bg-cream-200/50 p-6 md:p-10 lg:col-span-8">
            <InquiryForm
              kind="business"
              live={live}
              products={products.map((p) => ({ slug: p.slug, name: `${productTitle(p, locale)} ${formatSize(p.size, locale)}` }))}
            />
          </div>
        </div>
      </section>
    </>
  );
}
