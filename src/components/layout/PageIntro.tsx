import { ChevronRight } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { absoluteUrl, JsonLd } from "@/lib/seo";
import { cn } from "@/lib/site";

export interface Crumb {
  label: string;
  href?: string;
}

export async function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const t = await getTranslations("common");
  const locale = await getLocale();
  const all: Crumb[] = [{ label: t("home"), href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-[0.82rem] text-ink-500", className)}>
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 opacity-50" aria-hidden />}
              {c.href && i < all.length - 1 ? (
                <Link href={c.href} className="hover:text-forest-900 hover:underline">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={i === all.length - 1 ? "page" : undefined} className="text-ink-700">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: absoluteUrl(locale, c.href) } : {}),
          })),
        }}
      />
    </>
  );
}

export function PageIntro({
  crumbs,
  eyebrow,
  title,
  accent,
  lead,
  aside,
  className,
}: {
  crumbs: ReactNode;
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative pb-14 pt-[120px] md:pb-20 md:pt-[150px]", className)}>
      <div className="container-x">
        {crumbs}
        <div className={cn("mt-10 grid gap-10", Boolean(aside) && "lg:grid-cols-12 lg:items-end")}>
          <div className={aside ? "lg:col-span-7" : "max-w-5xl"}>
            <p className="eyebrow text-meadow-500">{eyebrow}</p>
            <LineReveal
              as="h1"
              className="display-xl mt-5 text-forest-900"
              lines={accent ? [title, accent] : [title]}
              lineClasses={[undefined, "serif-accent font-normal text-forest-700"]}
            />
            {lead && (
              <Reveal delay={0.2}>
                <p className="lead mt-7 max-w-2xl text-ink-700">{lead}</p>
              </Reveal>
            )}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
