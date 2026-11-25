import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { company } from "@/data/company";

export const SITE_URL = company.siteUrl.replace(/\/$/, "");

/** Locale-prefixed path (every locale, including the default, is prefixed). */
export function localePath(locale: string, path: string) {
  return `/${locale}${path === "/" ? "" : path}`;
}

export function absoluteUrl(locale: string, path: string) {
  return `${SITE_URL}${localePath(locale, path)}`;
}

const OG_LOCALE: Record<Locale, string> = { bs: "bs_BA", en: "en_GB", de: "de_DE" };

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  image?: string;
}): Metadata {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl(routing.defaultLocale, path);
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(locale, path), languages },
    openGraph: {
      title,
      description,
      url: absoluteUrl(locale, path),
      siteName: "MI99 – Mliječna industrija 99",
      locale: OG_LOCALE[locale as Locale] ?? "bs_BA",
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: company.legalName,
  alternateName: ["MI99", "Mliječna industrija 99"],
  url: SITE_URL,
  logo: `${SITE_URL}/images/brand/migg-logo.svg`,
  foundingDate: String(company.founded),
  email: company.email,
  telephone: "+38735822550",
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressCountry: company.countryCode,
  },
  geo: { "@type": "GeoCoordinates", latitude: company.geo.lat, longitude: company.geo.lng },
  brand: [
    { "@type": "Brand", name: "Natura" },
    { "@type": "Brand", name: "Milkland" },
  ],
  sameAs: [company.facebook],
};
