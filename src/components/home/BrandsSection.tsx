import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { BrandMark } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { getBrand, getProduct, productsByBrand, type BrandId } from "@/data/catalog";
import { pick } from "@/data/types";
import { routes } from "@/lib/site";

const LINEUP: Record<"natura" | "milkland", string[]> = {
  natura: ["natura-jogurt-2-8-1kg", "natura-trajno-mlijeko-3-2", "natura-kefir-2-8-300g", "natura-kisela-pavlaka-12-800g"],
  milkland: ["milkland-mlijeko-1-5", "milkland-mlijeko-3-2", "milkland-jogurt-2-8-1kg", "milkland-mlijeko-2-8"],
};

async function BrandPanel({ id }: { id: "natura" | "milkland" }) {
  const locale = await getLocale();
  const t = await getTranslations("brands");
  const brand = getBrand(id as BrandId)!;
  const items = LINEUP[id].map((s) => getProduct(s)!);
  const heights = id === "natura" ? ["78%", "100%", "56%", "52%"] : ["92%", "100%", "86%", "92%"];
  return (
    <Reveal className="group relative flex h-full flex-col overflow-hidden rounded-[28px]" >
      <div className="relative flex h-full flex-col" style={{ backgroundColor: brand.tone }}>
        <div className="flex items-start justify-between gap-6 p-7 md:p-10">
          <div>
            <BrandMark brand={id} className="h-14 w-auto md:h-16" />
            <p className="serif-accent mt-6 text-[clamp(1.6rem,2.4vw,2.25rem)] leading-tight" style={{ color: brand.ink }}>
              {pick(brand.tagline, locale)}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-white/70 px-3 py-1 text-[0.75rem] font-semibold text-ink-700">
            {t("range", { count: productsByBrand(id).length })}
          </span>
        </div>
        <div className="relative mt-auto flex h-[280px] items-end justify-center gap-[2%] px-6 sm:h-[340px] md:h-[380px]">
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[42%]"
            style={{ background: id === "natura" ? "linear-gradient(to top, #cfe2b5, transparent)" : "linear-gradient(to top, #d6e5f3, transparent)" }}
          />
          {items.map((p, i) => (
            <div key={p.slug} className="relative flex h-full items-end transition-transform duration-700 ease-out-soft group-hover:-translate-y-1" style={{ height: heights[i], transitionDelay: `${i * 40}ms` }}>
              <Image
                src={p.images[0].src}
                alt={p.name}
                width={p.images[0].width}
                height={p.images[0].height}
                sizes="(min-width: 1024px) 10vw, 22vw"
                className="packshot-shadow relative h-[88%] w-auto object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 border-t border-black/5 bg-white/40 p-7 md:flex-row md:items-end md:justify-between md:p-10">
          <p className="max-w-md text-[0.98rem] leading-relaxed text-ink-700">{pick(brand.description, locale)}</p>
          <ButtonLink href={routes.brand(id)} variant="primary" className="shrink-0 self-start md:self-auto">
            {t("discover", { brand: brand.name })}
          </ButtonLink>
        </div>
      </div>
    </Reveal>
  );
}

export async function BrandsSection() {
  const t = await getTranslations("brands");
  return (
    <section className="bg-cream-100 py-20 md:py-28">
      <div className="container-x">
        <p className="eyebrow text-meadow-500">{t("eyebrow")}</p>
        <LineReveal
          className="display-lg mt-4 text-forest-900"
          lines={[t("title1"), t("title2")]}
          lineClasses={[undefined, "serif-accent font-normal text-forest-700"]}
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <BrandPanel id="natura" />
          <BrandPanel id="milkland" />
        </div>
      </div>
    </section>
  );
}
