import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/data/company";

export async function Highlights() {
  const t = await getTranslations("highlights");
  const items = [
    { value: String(company.founded), label: t("founded") },
    { value: "20+", label: t("products") },
    { value: "2", label: t("brands") },
    { value: String(company.regionalMarkets.length + 1), label: t("markets") },
  ];
  return (
    <section aria-label={t("label")} className="relative bg-forest-900 text-cream-50">
      <div className="container-x py-14 md:py-20">
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-0 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
          {items.map((it, i) => (
            <Reveal
              as="li"
              key={it.label}
              delay={i * 0.08}
              className="min-w-[72%] snap-start border-l border-cream-50/15 pl-6 pr-6 first:border-l-0 first:pl-0 sm:min-w-[45%] md:min-w-0"
            >
              <p className="font-display text-[clamp(3.25rem,7vw,6.5rem)] font-extrabold leading-none tracking-[-0.06em] text-cream-50">
                {it.value}
              </p>
              <p className="mt-4 max-w-[14rem] text-[0.95rem] leading-snug text-cream-50/70">{it.label}</p>
            </Reveal>
          ))}
        </ul>
        <p className="mt-12 flex items-center gap-3 border-t border-cream-50/15 pt-6 text-[0.9rem] text-meadow-300">
          <span className="inline-block size-2 rounded-full bg-meadow-500" aria-hidden />
          {t("location")}
        </p>
      </div>
    </section>
  );
}
