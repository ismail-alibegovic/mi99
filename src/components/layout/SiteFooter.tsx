import { Mail, MapPin, Phone } from "lucide-react";
import { FacebookIcon } from "@/components/brand/FacebookIcon";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BrandMark, MiggLogo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "./HeaderClient";
import { categories } from "@/data/catalog";
import { company } from "@/data/company";
import { pick } from "@/data/types";
import { mainNav, routes, secondaryNav } from "@/lib/site";

export async function SiteFooter() {
  const locale = await getLocale();
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest-900 text-cream-50">
      <svg aria-hidden className="absolute -top-px left-0 w-full text-cream-100" viewBox="0 0 1440 40" preserveAspectRatio="none" height="28">
        <path fill="currentColor" d="M0 0h1440v8c-180 22-420 32-720 32S180 30 0 8z" />
      </svg>
      <div className="container-x pb-10 pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="rounded-2xl bg-cream-50 p-2.5">
                <MiggLogo className="w-[78px]" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-xl font-extrabold tracking-[-0.03em]">MI99</span>
                <span className="block text-sm text-cream-50/65">{company.legalName}</span>
              </span>
            </div>
            <p className="serif-accent max-w-xs text-[1.65rem] leading-tight text-meadow-300">{t("footer.tagline")}</p>
            <div className="flex items-center gap-3">
              <Link href={routes.brand("natura")} className="rounded-xl bg-cream-50 px-3 py-2 transition-opacity hover:opacity-90">
                <BrandMark brand="natura" className="h-9 w-auto" />
              </Link>
              <Link href={routes.brand("milkland")} className="rounded-xl bg-cream-50 px-3 py-2 transition-opacity hover:opacity-90">
                <BrandMark brand="milkland" className="h-9 w-auto" />
              </Link>
            </div>
          </div>

          <nav aria-label={t("footer.navigation")}>
            <p className="eyebrow text-meadow-300">{t("footer.navigation")}</p>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {[...mainNav, ...secondaryNav].map((i) => (
                <li key={i.key}>
                  <Link href={i.href} className="link-underline text-cream-50/80 hover:text-cream-50">
                    {t(`nav.${i.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t("footer.products")}>
            <p className="eyebrow text-meadow-300">{t("footer.products")}</p>
            <ul className="mt-5 space-y-2.5 text-[0.95rem]">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={routes.category(c.id)} className="link-underline text-cream-50/80 hover:text-cream-50">
                    {pick(c.name, locale)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={routes.brand("natura")} className="link-underline text-cream-50/80 hover:text-cream-50">
                  Natura
                </Link>
              </li>
              <li>
                <Link href={routes.brand("milkland")} className="link-underline text-cream-50/80 hover:text-cream-50">
                  Milkland
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-meadow-300">{t("footer.contact")}</p>
            <address className="mt-5 space-y-3 text-[0.95rem] not-italic text-cream-50/80">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-meadow-300" aria-hidden />
                <span>
                  {company.legalName}
                  <br />
                  {company.street}, {company.postalCode} {company.city}
                  <br />
                  {company.country}
                </span>
              </p>
              <p className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-meadow-300" aria-hidden />
                <a href={company.phoneHref} className="link-underline hover:text-cream-50">
                  {company.phone}
                </a>
              </p>
              <p className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-meadow-300" aria-hidden />
                <a href={`mailto:${company.email}`} className="link-underline hover:text-cream-50">
                  {company.email}
                </a>
              </p>
            </address>
            <div className="mt-6">
              <p className="sr-only">{t("footer.follow")}</p>
              <a
                href={company.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-cream-50/20 px-4 py-2 text-sm text-cream-50/85 transition-colors hover:border-cream-50 hover:text-cream-50"
              >
                <FacebookIcon className="size-4" /> Facebook
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-cream-50/12 pt-6 text-[0.82rem] text-cream-50/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName} {t("footer.rights")} <span className="mx-1">·</span> {t("footer.concept")}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Link href={routes.privacy} className="link-underline hover:text-cream-50">
              {t("nav.privacy")}
            </Link>
            <LanguageSwitcher inverted />
          </div>
        </div>
      </div>
    </footer>
  );
}
