import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ui/Button";
import { Parallax } from "@/components/ui/Parallax";
import { PhotoTag } from "@/components/ui/PhotoTag";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { routes } from "@/lib/site";

export async function ProductionTeaser() {
  const t = await getTranslations();
  const areas = (t.raw("production.areas") as { title: string; text: string }[]).slice(1, 4);
  return (
    <section className="relative overflow-hidden bg-forest-950 text-cream-50">
      <div className="relative h-[52vh] min-h-[340px] md:h-[72vh]">
        <Parallax className="absolute inset-0" strength={70}>
          <Image src="/images/company/tvornica-gradacac.webp" alt={t("about.factoryCaption")} fill sizes="100vw" className="object-cover object-[35%_50%]" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/10 via-forest-950/20 to-forest-950" />
        <PhotoTag label={t("common.original")} dark className="right-4 top-24 md:right-8" />
      </div>
      <div className="container-x relative -mt-40 pb-20 md:-mt-56 md:pb-28">
        <p className="eyebrow text-meadow-300">{t("productionTeaser.eyebrow")}</p>
        <LineReveal
          className="display-lg mt-4 max-w-4xl"
          lines={[t("productionTeaser.title1"), t("productionTeaser.title2")]}
          lineClasses={[undefined, "serif-accent font-normal text-meadow-300"]}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="lead text-cream-50/80">{t("productionTeaser.text")}</p>
            <ButtonLink href={routes.production} variant="light" className="mt-8">
              {t("productionTeaser.cta")}
            </ButtonLink>
          </Reveal>
          <ul className="grid gap-px overflow-hidden rounded-[24px] bg-cream-50/10 sm:grid-cols-3 lg:col-span-8">
            {areas.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 0.08} className="bg-forest-950 p-6 md:p-7">
                <span className="font-display text-sm font-bold text-meadow-300">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-[1.2rem] font-bold tracking-[-0.02em]">{a.title}</h3>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-cream-50/65">{a.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
