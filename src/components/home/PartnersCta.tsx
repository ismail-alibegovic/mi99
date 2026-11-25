import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { PhotoTag } from "@/components/ui/PhotoTag";
import { routes } from "@/lib/site";

export async function PartnersCta() {
  const t = await getTranslations();
  const segments = t.raw("partners.segments") as { title: string; text: string }[];
  return (
    <section className="relative overflow-hidden bg-meadow-100 py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-forest-700">{t("partners.eyebrow")}</p>
          <LineReveal className="display-lg mt-4 text-forest-900" lines={[t("partners.title")]} />
          <p className="lead mt-6 max-w-md text-ink-700">{t("partners.text")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={routes.partners}>{t("partners.cta")}</ButtonLink>
          </div>
          <Reveal className="relative mt-12 hidden aspect-[16/10] overflow-hidden rounded-[24px] lg:block">
            <Image src="/images/company/kamion.webp" alt="" fill sizes="35vw" className="object-cover" />
            <PhotoTag label={t("common.original")} />
          </Reveal>
        </div>
        <ul className="divide-y divide-forest-900/12 border-y border-forest-900/12 lg:col-span-6 lg:col-start-7">
          {segments.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="group grid grid-cols-[3rem_1fr] gap-4 py-6 md:py-7">
              <span className="font-display text-sm font-bold text-forest-700/60">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-[1.35rem] font-bold tracking-[-0.025em] text-forest-900">{s.title}</h3>
                <p className="mt-1.5 text-[0.98rem] leading-relaxed text-ink-700">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
