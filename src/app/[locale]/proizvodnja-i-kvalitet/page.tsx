import { CalendarX2 } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Breadcrumbs, PageIntro } from "@/components/layout/PageIntro";
import { ButtonA, ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { PhotoTag } from "@/components/ui/PhotoTag";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { certificates, equipment } from "@/data/company";
import { pick } from "@/data/types";
import { pageMetadata } from "@/lib/seo";
import { cn, formatDate, routes } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/proizvodnja-i-kvalitet">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({ locale, path: routes.production, title: t("meta.production"), description: t("production.lead"), image: "/images/company/proizvodna-linija.webp" });
}

const AREA_IMAGES = [
  "/images/company/prijem-sirovine.webp",
  "/images/company/pasterizacija.webp",
  "/images/company/separator.webp",
  "/images/company/laboratorija.webp",
  "/images/company/kontrolna-ploca.webp",
  "/images/company/proizvodna-linija.webp",
];

export default async function ProductionPage({ params }: PageProps<"/[locale]/proizvodnja-i-kvalitet">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const areas = t.raw("production.areas") as { title: string; text: string }[];

  return (
    <div className="bg-cream-100">
      <PageIntro
        crumbs={<Breadcrumbs items={[{ label: t("nav.production") }]} />}
        eyebrow={t("production.eyebrow")}
        title={t("production.title1")}
        accent={t("production.title2")}
        lead={t("production.lead")}
      />

      <section className="relative bg-forest-950 text-cream-50">
        <div className="relative h-[56vh] min-h-[360px]">
          <Parallax className="absolute inset-0" strength={60}>
            <Image src="/images/company/proizvodna-linija.webp" alt={areas[2].title} fill priority sizes="100vw" className="object-cover" />
          </Parallax>
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />
          <PhotoTag label={t("common.original")} dark className="left-4 top-4 md:left-8" />
        </div>
        <div className="container-x relative -mt-28 grid gap-10 pb-20 md:pb-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-meadow-300">{t("production.sterileTitle")}</p>
            <p className="display-sm mt-5 leading-snug text-cream-50">{t("production.sterileText")}</p>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-meadow-300">{t("production.equipmentTitle")}</p>
            <ul className="mt-5 divide-y divide-cream-50/10 border-y border-cream-50/10 text-[0.95rem]">
              {equipment.map((e) => (
                <li key={e.bs} className="flex items-baseline justify-between gap-4 py-2.5 text-cream-50/85">
                  {pick(e, locale)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-x">
          <LineReveal className="display-lg text-forest-900" lines={[t("production.galleryTitle")]} />
          <ul className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((a, i) => (
              <Reveal as="li" key={a.title} delay={(i % 3) * 0.08} className={cn(i % 3 === 1 && "lg:mt-20")}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-cream-200">
                  <Image src={AREA_IMAGES[i]} alt={a.title} fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-out-soft hover:scale-[1.04]" />
                  <PhotoTag label={t("common.original")} />
                </div>
                <span className="mt-5 block font-display text-sm font-bold text-meadow-500">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-[1.35rem] font-bold tracking-[-0.025em] text-forest-900">{a.title}</h3>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-700">{a.text}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-14 text-[0.8rem] text-ink-500">{t("production.galleryNote")}</p>
        </div>
      </section>

      <section id="certifikati" className="scroll-mt-24 bg-cream-50 py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow text-meadow-500">{t("production.certTitle")}</p>
              <LineReveal className="display-lg mt-4 text-forest-900" lines={[t("production.certTitle") + "."]} />
            </div>
            <p className="text-[1rem] leading-relaxed text-ink-700 lg:col-span-5 lg:col-start-8">{t("production.certText")}</p>
          </div>

          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {certificates.map((c, i) => (
              <Reveal as="li" key={c.id} delay={i * 0.1} className="group grid overflow-hidden rounded-[28px] border border-forest-900/10 bg-cream-100 sm:grid-cols-[200px_1fr]">
                <a href={c.file} target="_blank" rel="noopener" className="relative block aspect-[3/4] overflow-hidden bg-cream-200 sm:aspect-auto">
                  <Image src={c.preview} alt={`${c.title} – ${pick(c.standard, locale)}`} fill sizes="200px" className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
                </a>
                <div className="flex flex-col p-6 md:p-8">
                  <span className="inline-flex items-center gap-2 self-start rounded-full bg-cream-200 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-ink-700">
                    <CalendarX2 className="size-3.5" aria-hidden /> {t("production.expired")}
                  </span>
                  <h3 className="display-sm mt-4 text-forest-900">{c.title}</h3>
                  <p className="mt-1 text-[0.95rem] font-medium text-ink-700">{pick(c.standard, locale)}</p>
                  <dl className="mt-5 grid grid-cols-2 gap-4 text-[0.88rem]">
                    <div>
                      <dt className="text-ink-500">{t("production.issued")}</dt>
                      <dd className="font-semibold text-forest-900">
                        <time dateTime={c.issued}>{formatDate(c.issued, locale)}</time>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-ink-500">{t("production.validUntil")}</dt>
                      <dd className="font-semibold text-forest-900">
                        <time dateTime={c.validUntil}>{formatDate(c.validUntil, locale)}</time>
                      </dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-ink-500">{t("production.issuer")}</dt>
                      <dd className="text-ink-900">{c.issuer}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-ink-500">{t("production.scope")}</dt>
                      <dd className="text-ink-900">{pick(c.scope, locale)}</dd>
                    </div>
                  </dl>
                  <ButtonA href={c.file} target="_blank" rel="noopener" variant="outline" download className="mt-6 self-start">
                    {t("production.view")} · PDF {c.size}
                  </ButtonA>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <ButtonLink href={routes.contact}>{t("nav.contact")}</ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
