import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Parallax } from "@/components/ui/Parallax";
import { PhotoTag } from "@/components/ui/PhotoTag";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/site";

const IMAGES = [
  { src: "/images/photos/cows-hills.webp", original: false },
  { src: "/images/company/prijem-sirovine.webp", original: true },
  { src: "/images/company/proizvodna-linija.webp", original: true },
  { src: "/images/company/proizvodi-livada.webp", original: true },
];

export async function NatureStory() {
  const t = await getTranslations();
  const steps = t.raw("nature.steps") as { title: string; text: string }[];
  return (
    <section className="relative bg-cream-50 py-20 md:py-32">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-meadow-500">{t("nature.eyebrow")}</p>
            <LineReveal className="display-lg mt-4 text-forest-900" lines={[t("nature.title")]} />
          </div>
          <p className="lead self-end text-ink-700 lg:col-span-5">{t("nature.text")}</p>
        </div>

        <ol className="mt-16 space-y-16 md:mt-24 md:space-y-28">
          {steps.map((s, i) => {
            const img = IMAGES[i];
            const flip = i % 2 === 1;
            return (
              <li key={s.title} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <div className={cn("relative md:col-span-7", flip && "md:order-2")}>
                  <Parallax className={cn("aspect-[4/3] rounded-[28px] bg-cream-200 md:aspect-[16/11]", i === 0 && "rounded-[999px_999px_28px_28px] md:rounded-[28px_200px_28px_28px]")} strength={40}>
                    <Image src={img.src} alt={s.title} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover" />
                  </Parallax>
                  <PhotoTag label={img.original ? t("common.original") : t("common.illustrative")} />
                </div>
                <Reveal className={cn("md:col-span-5", flip ? "md:order-1 md:pr-6" : "md:pl-6")}>
                  <span className="font-display text-[clamp(3.5rem,6vw,5.5rem)] font-extrabold leading-none tracking-[-0.06em] text-meadow-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display-md mt-4 text-forest-900">{s.title}</h3>
                  <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink-700">{s.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
        <p className="mt-16 text-[0.8rem] text-ink-500">{t("nature.note")}</p>
      </div>
    </section>
  );
}
