import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { PhotoTag } from "@/components/ui/PhotoTag";
import { Parallax } from "@/components/ui/Parallax";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { getProduct } from "@/data/catalog";

/**
 * Lifestyle mosaic. Photography is illustrative stock; real MI99 packshots
 * are composited in front so the brand is present in every scene.
 */
export async function Lifestyle() {
  const t = await getTranslations();
  const scenes = t.raw("lifestyle.scenes") as string[];
  const milk = getProduct("natura-trajno-mlijeko-2-8")!;
  const greek = getProduct("grcki-jogurt-400g")!;
  const cream = getProduct("natura-kisela-pavlaka-20-800g")!;
  const yog = getProduct("natura-jogurt-1-6-1kg")!;

  return (
    <section className="bg-cream-100 py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-meadow-500">{t("lifestyle.eyebrow")}</p>
            <LineReveal className="display-lg mt-4 text-forest-900" lines={[t("lifestyle.title")]} />
          </div>
          <p className="lead text-ink-700 lg:col-span-5">{t("lifestyle.text")}</p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-12 md:grid-rows-[340px_300px] lg:grid-rows-[380px_340px]">
          {/* Family breakfast – large */}
          <Reveal className="relative h-[420px] md:col-span-7 md:row-span-2 md:h-auto">
            <Parallax className="absolute inset-0 rounded-[28px]" strength={40}>
              <Image src="/images/photos/family-table.webp" alt={scenes[0]} fill sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
            </Parallax>
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-forest-950/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-6 h-[46%] md:bottom-8 md:right-10">
              <Image src={milk.images[0].src} alt={milk.name} width={milk.images[0].width} height={milk.images[0].height} sizes="18vw" className="packshot-shadow h-full w-auto" />
            </div>
            <p className="absolute bottom-6 left-6 font-display text-[1.4rem] font-bold tracking-[-0.02em] text-cream-50 md:bottom-8 md:left-8 md:text-[1.75rem]">
              {scenes[0]}
            </p>
            <PhotoTag label={t("common.illustrative")} className="left-5 top-5" />
          </Reveal>

          {/* Yoghurt & fruit */}
          <Reveal delay={0.08} className="relative h-[320px] md:col-span-5 md:h-auto">
            <div className="absolute inset-0 overflow-hidden rounded-[28px]">
              <Image src="/images/photos/yogurt-strawberries.webp" alt={scenes[1]} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute bottom-4 right-5 h-[52%]">
              <Image src={greek.images[0].src} alt={greek.name} width={greek.images[0].width} height={greek.images[0].height} sizes="14vw" className="packshot-shadow h-full w-auto" />
            </div>
            <p className="absolute left-6 top-6 rounded-full bg-cream-50 px-4 py-1.5 font-display text-[0.92rem] font-bold text-forest-900">{scenes[1]}</p>
            <PhotoTag label={t("common.illustrative")} className="bottom-4 left-5" />
          </Reveal>

          {/* Pie & sour cream */}
          <Reveal delay={0.12} className="relative h-[300px] md:col-span-3 md:h-auto">
            <div className="absolute inset-0 overflow-hidden rounded-[28px] rounded-tr-[120px]">
              <Image src="/images/photos/cream-plate.webp" alt={scenes[2]} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute bottom-3 left-3 h-[40%]">
              <Image src={cream.images[0].src} alt={cream.name} width={cream.images[0].width} height={cream.images[0].height} sizes="12vw" className="packshot-shadow h-full w-auto" />
            </div>
            <p className="absolute right-4 top-4 max-w-[60%] text-right font-display text-[0.95rem] font-bold leading-tight text-forest-900">{scenes[2]}</p>
            <PhotoTag label={t("common.illustrative")} className="bottom-3 right-3" />
          </Reveal>

          {/* Milk & bread */}
          <Reveal delay={0.16} className="relative h-[300px] md:col-span-2 md:h-auto">
            <div className="absolute inset-0 overflow-hidden rounded-[28px]">
              <Image src="/images/photos/milk-bottle-glass.webp" alt={scenes[3]} fill sizes="(min-width: 768px) 17vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute bottom-3 left-1/2 h-[44%] -translate-x-1/2">
              <Image src={yog.images[0].src} alt={yog.name} width={yog.images[0].width} height={yog.images[0].height} sizes="10vw" className="packshot-shadow h-full w-auto" />
            </div>
            <p className="absolute left-4 top-4 font-display text-[0.95rem] font-bold leading-tight text-cream-50">{scenes[3]}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
