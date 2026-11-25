import { Clock, Users } from "lucide-react";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Recipe } from "@/data/recipes";
import { pick } from "@/data/types";
import { cn, routes } from "@/lib/site";

export async function RecipeCard({ recipe, className, tall }: { recipe: Recipe; className?: string; tall?: boolean }) {
  const locale = await getLocale();
  const t = await getTranslations("common");
  return (
    <Link href={routes.recipe(recipe.slug)} className={cn("group block", className)}>
      <span className={cn("relative block overflow-hidden rounded-[24px] bg-cream-200", tall ? "aspect-[4/5]" : "aspect-[4/3]")}>
        <Image
          src={recipe.image}
          alt={pick(recipe.imageAlt, locale)}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-out-soft group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-cream-50/90 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-forest-900">
          {t("illustrative")}
        </span>
      </span>
      <span className="mt-4 flex items-center gap-4 text-[0.8rem] font-medium text-ink-500">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-3.5" aria-hidden /> {t("minutes", { count: recipe.minutes })}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Users className="size-3.5" aria-hidden /> {t("servings", { count: recipe.servings })}
        </span>
      </span>
      <span className="mt-2 block font-display text-[1.3rem] font-bold leading-tight tracking-[-0.025em] text-forest-900 group-hover:underline">
        {pick(recipe.title, locale)}
      </span>
      <span className="mt-2 block text-[0.92rem] leading-relaxed text-ink-700">{pick(recipe.intro, locale)}</span>
    </Link>
  );
}
