import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FacebookIcon } from "@/components/brand/FacebookIcon";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { Breadcrumbs, PageIntro } from "@/components/layout/PageIntro";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/kontakt">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({ locale, path: routes.contact, title: t("meta.contact"), description: `${company.legalName}, ${company.street}, ${company.postalCode} ${company.city}. ${company.phone}, ${company.email}` });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/kontakt">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const { lat, lng } = company.geo;
  const bbox = [lng - 0.02, lat - 0.009, lng + 0.02, lat + 0.009].join("%2C");
  const live = Boolean(process.env.INQUIRY_WEBHOOK_URL);

  const cards = [
    {
      icon: MapPin,
      label: t("contact.address"),
      value: (
        <>
          {company.street}
          <br />
          {company.postalCode} {company.city}
          <br />
          {company.country}
        </>
      ),
      href: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`,
    },
    { icon: Phone, label: t("contact.phone"), value: company.phone, href: company.phoneHref },
    { icon: Mail, label: t("contact.email"), value: company.email, href: `mailto:${company.email}` },
    { icon: FacebookIcon, label: t("contact.hours"), value: "Facebook", href: company.facebook },
  ];

  return (
    <>
      <PageIntro
        crumbs={<Breadcrumbs items={[{ label: t("nav.contact") }]} />}
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        lead={t("contact.text")}
      />

      <section className="pb-16">
        <div className="container-x">
          <p className="display-sm text-forest-900">{company.legalName}</p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => {
              const Icon = c.icon;
              const external = c.href.startsWith("http");
              return (
                <Reveal as="li" key={c.label} delay={i * 0.06}>
                  <a
                    href={c.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex h-full flex-col justify-between gap-8 rounded-[24px] bg-cream-50 p-6 transition-colors hover:bg-white"
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex size-11 items-center justify-center rounded-full bg-meadow-100 text-forest-800">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <ArrowUpRight className="size-5 text-ink-500 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-ink-500">{c.label}</span>
                      <span className="mt-1.5 block break-words font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-forest-900">{c.value}</span>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x">
          <div className="overflow-hidden rounded-[28px] border border-forest-900/10">
            <iframe
              title={t("contact.mapTitle")}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`}
              className="block h-[360px] w-full md:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
          <a
            href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-ink-700 hover:underline"
          >
            {t("contact.openMap")} <ArrowUpRight className="size-3.5" aria-hidden />
          </a>
        </div>
      </section>

      <section className="bg-cream-50 py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="display-md text-forest-900">{t("contact.formTitle")}</h2>
            <div className="mt-8">
              <InquiryForm kind="contact" live={live} />
            </div>
          </div>
          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="rounded-[28px] bg-forest-900 p-8 text-cream-50 lg:sticky lg:top-28">
              <h2 className="display-sm">{t("contact.businessTitle")}</h2>
              <p className="mt-3 text-cream-50/75">{t("contact.businessText")}</p>
              <ButtonLink href={`${routes.partners}#upit`} variant="light" className="mt-6">
                {t("contact.businessCta")}
              </ButtonLink>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
