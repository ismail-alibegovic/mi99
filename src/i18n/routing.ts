import { defineRouting } from "next-intl/routing";

export const locales = ["bs", "en", "de"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "bs",
  localePrefix: "always",
  localeDetection: false,
});
