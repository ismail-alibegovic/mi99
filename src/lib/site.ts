export const routes = {
  home: "/",
  about: "/o-nama",
  products: "/proizvodi",
  category: (id: string) => `/proizvodi/kategorija/${id}`,
  product: (slug: string) => `/proizvodi/${slug}`,
  brand: (id: string) => `/brendovi/${id}`,
  production: "/proizvodnja-i-kvalitet",
  recipes: "/recepti",
  recipe: (slug: string) => `/recepti/${slug}`,
  partners: "/poslovna-saradnja",
  news: "/novosti",
  article: (slug: string) => `/novosti/${slug}`,
  contact: "/kontakt",
  privacy: "/politika-privatnosti",
} as const;

export const mainNav = [
  { key: "home", href: routes.home },
  { key: "about", href: routes.about },
  { key: "products", href: routes.products },
  { key: "production", href: routes.production },
  { key: "news", href: routes.news },
] as const;

export const secondaryNav = [
  { key: "recipes", href: routes.recipes },
  { key: "partners", href: routes.partners },
  { key: "contact", href: routes.contact },
] as const;

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale === "bs" ? "bs-BA" : locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
