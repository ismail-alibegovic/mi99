import type { Locale } from "@/i18n/routing";

/** A string available in every supported locale. */
export type L10n = Record<Locale, string>;

export const pick = (value: L10n, locale: string): string =>
  value[locale as Locale] ?? value.bs;
