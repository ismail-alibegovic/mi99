/**
 * Centralised product catalogue.
 *
 * Source of truth: the official MI99 product pages and the product
 * specification PDFs published on mi99.ba (scraped into products.raw.json).
 * Nothing here is invented: values that were missing, inconsistent or
 * obviously broken in the source are left out (see `sanitizeLogistics` and
 * `SUPPRESS_NUTRITION`) and listed in docs/CONTENT-NOTES.md for MI99 to confirm.
 *
 * The shape is intentionally flat and serialisable so it can later be
 * replaced by a CMS collection without touching components.
 */
import raw from "./products.raw.json";
import imageMeta from "./images.json";
import type { L10n } from "./types";

export type BrandId = "natura" | "milkland" | "mi99";
export type CategoryId = "mlijeko" | "jogurti" | "pavlake" | "kefir" | "grcki-jogurt" | "ayran";

export interface Category {
  id: CategoryId;
  name: L10n;
  short: L10n;
  intro: L10n;
  /** Background tone inspired by the category's real packaging. */
  tone: string;
  toneInk: string;
  accent: string;
}

export const categories: Category[] = [
  {
    id: "mlijeko",
    name: { bs: "Mlijeko", en: "Milk", de: "Milch" },
    short: { bs: "Trajno UHT mlijeko", en: "Long-life UHT milk", de: "Haltbare H-Milch" },
    intro: {
      bs: "UHT mlijeko nastaje kratkotrajnom sterilizacijom na ultra visokoj temperaturi. Rezultat je mlijeko vrhunske kvalitete s dugim rokom trajanja, punjeno u potpuno sterilnim uvjetima.",
      en: "UHT milk is produced by a brief sterilisation at ultra-high temperature. The result is premium-quality milk with a long shelf life, filled under fully sterile conditions.",
      de: "H-Milch entsteht durch kurzzeitige Ultrahocherhitzung. Das Ergebnis ist Milch in Spitzenqualität mit langer Haltbarkeit, abgefüllt unter vollständig sterilen Bedingungen.",
    },
    tone: "#DDECF4",
    toneInk: "#14324A",
    accent: "#C8212E",
  },
  {
    id: "jogurti",
    name: { bs: "Jogurti", en: "Yoghurts", de: "Joghurts" },
    short: { bs: "Tečni i gusti jogurti", en: "Drinking & thick yoghurts", de: "Trink- und Dickjoghurt" },
    intro: {
      bs: "Jogurt nastaje prirodnim procesom fermentacije mlijeka uz jogurtne kulture, pri kojem mliječni šećer prelazi u mliječnu kiselinu. Bogat je mliječnim bjelančevinama i osvježavajućeg je okusa.",
      en: "Yoghurt is made by the natural fermentation of milk with yoghurt cultures, turning milk sugar into lactic acid. It is rich in milk protein and refreshingly tangy.",
      de: "Joghurt entsteht durch natürliche Fermentation der Milch mit Joghurtkulturen, wobei Milchzucker zu Milchsäure wird. Er ist reich an Milcheiweiß und erfrischend im Geschmack.",
    },
    tone: "#E4EFD9",
    toneInk: "#1F3D1E",
    accent: "#3F8A3A",
  },
  {
    id: "pavlake",
    name: { bs: "Pavlake i vrhnja", en: "Sour cream", de: "Sauerrahm" },
    short: { bs: "Kisela pavlaka, Schmand, vrhnje", en: "Sour cream, Schmand, cream", de: "Sauerrahm, Schmand, Rahm" },
    intro: {
      bs: "Kisela pavlaka ima širok spektar upotrebe – kao osnovna namirnica, dodatak salatama, supama i tradicionalnim jelima. Asortiman obuhvata pavlake od 12 do 25 % mliječne masti.",
      en: "Sour cream is endlessly versatile – a kitchen staple and a natural partner for salads, soups and traditional dishes. The range covers sour creams from 12 to 25% milk fat.",
      de: "Sauerrahm ist vielseitig – als Grundzutat und Begleiter zu Salaten, Suppen und traditionellen Gerichten. Das Sortiment reicht von 12 bis 25 % Milchfett.",
    },
    tone: "#F6E4D2",
    toneInk: "#4A2414",
    accent: "#D9631E",
  },
  {
    id: "kefir",
    name: { bs: "Kefir", en: "Kefir", de: "Kefir" },
    short: { bs: "Fermentirani mliječni napitak", en: "Fermented milk drink", de: "Fermentiertes Milchgetränk" },
    intro: {
      bs: "Natura Kefir je fermentirani mliječni proizvod čistog, blago kiselog mliječnog okusa – spreman za konzumaciju odmah nakon otvaranja.",
      en: "Natura Kefir is a fermented milk product with a clean, mildly sour milky taste – ready to enjoy as soon as it is opened.",
      de: "Natura Kefir ist ein fermentiertes Milchprodukt mit reinem, mild-säuerlichem Geschmack – direkt nach dem Öffnen genussfertig.",
    },
    tone: "#E2EEDC",
    toneInk: "#1D3B26",
    accent: "#2F8F4E",
  },
  {
    id: "grcki-jogurt",
    name: { bs: "Grčki jogurt", en: "Greek yoghurt", de: "Griechischer Joghurt" },
    short: { bs: "Kremasti grčki jogurt", en: "Creamy Greek yoghurt", de: "Cremiger griechischer Joghurt" },
    intro: {
      bs: "Bogat i kremast grčki jogurt u čašama od 150 i 400 g – za doručak, umake i deserte.",
      en: "Rich, creamy Greek yoghurt in 150 g and 400 g pots – for breakfast, sauces and desserts.",
      de: "Reichhaltiger, cremiger griechischer Joghurt im 150-g- und 400-g-Becher – für Frühstück, Saucen und Desserts.",
    },
    tone: "#DDE3F0",
    toneInk: "#18254A",
    accent: "#24357A",
  },
  {
    id: "ayran",
    name: { bs: "Ayran", en: "Ayran", de: "Ayran" },
    short: { bs: "Osvježavajući napitak", en: "Refreshing yoghurt drink", de: "Erfrischendes Joghurtgetränk" },
    intro: {
      bs: "Lagani, osvježavajući ayran u čaši od 250 g i boci od 1 kg – savršen uz pitu i jela s roštilja.",
      en: "Light, refreshing ayran in a 250 g cup and 1 kg bottle – perfect with savoury pies and grilled dishes.",
      de: "Leichter, erfrischender Ayran im 250-g-Becher und in der 1-kg-Flasche – ideal zu Pita und Gegrilltem.",
    },
    tone: "#D5E7D2",
    toneInk: "#123A22",
    accent: "#1E7A3E",
  },
];

export interface Brand {
  id: BrandId;
  name: string;
  tagline: L10n;
  description: L10n;
  tone: string;
  ink: string;
  accent: string;
}

export const brands: Brand[] = [
  {
    id: "natura",
    name: "Natura",
    tagline: {
      bs: "Toplina doma, okus prirode.",
      en: "The warmth of home, the taste of nature.",
      de: "Die Wärme von zu Hause, der Geschmack der Natur.",
    },
    description: {
      bs: "Natura je najprepoznatljiviji brend Mliječne industrije 99 – trajno mlijeko, jogurti, kefir i kisele pavlake za svaki dan i svaki stol. Ambalaža s prepoznatljivim livadskim ovalom nosi obećanje jednostavnih, prirodnih okusa.",
      en: "Natura is the best-known brand of Mliječna industrija 99 – long-life milk, yoghurts, kefir and sour creams for every day and every table. The packaging with its signature meadow oval carries a promise of simple, natural taste.",
      de: "Natura ist die bekannteste Marke der Mliječna industrija 99 – H-Milch, Joghurts, Kefir und Sauerrahm für jeden Tag und jeden Tisch. Die Verpackung mit dem typischen Wiesen-Oval steht für einfachen, natürlichen Geschmack.",
    },
    tone: "#EAF1E1",
    ink: "#1F2C7A",
    accent: "#C8212E",
  },
  {
    id: "milkland",
    name: "Milkland",
    tagline: {
      bs: "Svježe. Jednostavno. Svakodnevno.",
      en: "Fresh. Simple. Everyday.",
      de: "Frisch. Einfach. Alltäglich.",
    },
    description: {
      bs: "Milkland donosi čist, savremen izraz – bijela ambalaža s prepoznatljivim kravljim šarama u crvenoj, plavoj i svijetloplavoj boji, prema postotku mliječne masti. Trajno mlijeko i jogurt za moderan ritam dana.",
      en: "Milkland is a clean, contemporary expression – white packs with the signature cow pattern in red, blue or light blue depending on fat content. Long-life milk and yoghurt for a modern pace of life.",
      de: "Milkland steht für einen klaren, zeitgemäßen Auftritt – weiße Packungen mit dem typischen Kuhmuster in Rot, Blau oder Hellblau je nach Fettgehalt. H-Milch und Joghurt für den modernen Alltag.",
    },
    tone: "#EEF3F8",
    ink: "#1D3F9A",
    accent: "#D3202A",
  },
  {
    id: "mi99",
    name: "MI99",
    tagline: {
      bs: "Iz naše mljekare u Gradačcu.",
      en: "From our dairy in Gradačac.",
      de: "Aus unserer Molkerei in Gradačac.",
    },
    description: {
      bs: "Pod korporativnim znakom migg nalaze se Schmand, grčki jogurt, ayran, Mlijeko Cafe i Paprika u pavlaci.",
      en: "Schmand, Greek yoghurt, ayran, Mlijeko Cafe and Paprika u pavlaci are sold under the corporate migg mark.",
      de: "Schmand, griechischer Joghurt, Ayran, Mlijeko Cafe und Paprika u pavlaci tragen das Firmenzeichen migg.",
    },
    tone: "#F7F5EB",
    ink: "#143D2A",
    accent: "#D5121F",
  },
];

/* ------------------------------------------------------------------ */

type RawProduct = (typeof raw)[number];

export interface Nutrition {
  energy?: string;
  fat?: string;
  saturates?: string;
  carbs?: string;
  sugars?: string;
  protein?: string;
  salt?: string;
}

export interface Logistics {
  primary?: string;
  primaryWeight?: string;
  primaryDims?: string;
  secondaryUnits?: string;
  secondaryWeight?: string;
  secondaryDims?: string;
  pallet?: string;
  palletLayers?: string;
  palletUnits?: string;
  palletWeight?: string;
  palletDims?: string;
}

export interface SpecSheet {
  ingredients?: L10n;
  storage?: L10n;
  shelfLifeDays?: number;
  afterOpening?: L10n;
  containsMilk?: boolean;
  source: string;
}

export interface PackImage {
  src: string;
  width: number;
  height: number;
}

export interface Product {
  slug: string;
  brand: BrandId;
  category: CategoryId;
  /** Product name exactly as printed on the pack (not translated). */
  name: string;
  /** Milk fat in % (m.m.) as declared on the product. */
  fat: number | null;
  size: { value: number; unit: "l" | "g" | "kg" };
  nutrition: Nutrition | null;
  logistics: Logistics;
  ean: string | null;
  spec: SpecSheet | null;
  images: PackImage[];
  specFile: string | null;
  legacyUrl: string;
  /** Claims printed on the original product page, as i18n keys. */
  claims: ("freshMilk" | "technology" | "connoisseursMilk" | "connoisseursYoghurt")[];
}

/* Verified details transcribed from MI99 product specification PDFs. */
const SPEC: Record<string, SpecSheet> = {
  "natura-kefir-2-8-200g": {
    ingredients: {
      bs: "mlijeko s 2,8 % mliječne masti, obrano mlijeko u prahu, jogurtna kultura",
      en: "milk with 2.8% milk fat, skimmed milk powder (MPC), yoghurt cultures",
      de: "Milch mit 2,8 % Milchfett, Magermilchpulver, Joghurtkulturen",
    },
    storage: { bs: "od 4 do 8 °C", en: "between 4 and 8 °C", de: "zwischen 4 und 8 °C" },
    shelfLifeDays: 30,
    afterOpening: {
      bs: "Proizvod je nakon otvaranja spreman za konzumaciju.",
      en: "Ready to consume once opened.",
      de: "Nach dem Öffnen verzehrfertig.",
    },
    containsMilk: true,
    source: "Specifikacija proizvoda br. 20.021, rev. 1 (18.10.2016)",
  },
  "natura-kefir-2-8-300g": {
    ingredients: {
      bs: "mlijeko s 2,8 % mliječne masti, obrano mlijeko u prahu, jogurtna kultura",
      en: "milk with 2.8% milk fat, skimmed milk powder (MPC), yoghurt cultures",
      de: "Milch mit 2,8 % Milchfett, Magermilchpulver, Joghurtkulturen",
    },
    storage: { bs: "od 4 do 8 °C", en: "between 4 and 8 °C", de: "zwischen 4 und 8 °C" },
    shelfLifeDays: 30,
    afterOpening: {
      bs: "Proizvod je nakon otvaranja spreman za konzumaciju.",
      en: "Ready to consume once opened.",
      de: "Nach dem Öffnen verzehrfertig.",
    },
    containsMilk: true,
    source: "Specifikacija proizvoda MI99 (Natura Kefir 300 g)",
  },
  "natura-trajno-mlijeko-3-5": {
    ingredients: {
      bs: "sterilizirano mlijeko s 3,5 % mliječne masti",
      en: "UHT milk with 3.5% milk fat",
      de: "ultrahocherhitzte Milch mit 3,5 % Milchfett",
    },
    storage: { bs: "do +25 °C", en: "up to +25 °C", de: "bis +25 °C" },
    shelfLifeDays: 120,
    afterOpening: {
      bs: "Nakon otvaranja čuvati u hladnjaku. Nije potrebno kuhati.",
      en: "Keep refrigerated after opening. No need to boil.",
      de: "Nach dem Öffnen im Kühlschrank aufbewahren. Kein Abkochen nötig.",
    },
    containsMilk: true,
    source: "Specifikacija proizvoda MI99 (Natura Trajno mlijeko 3,5 %)",
  },
  "mlijeko-cafe-3-8": {
    storage: { bs: "do +25 °C", en: "up to +25 °C", de: "bis +25 °C" },
    shelfLifeDays: 120,
    afterOpening: {
      bs: "Nakon otvaranja čuvati u hladnjaku. Nije potrebno kuhati.",
      en: "Keep refrigerated after opening. No need to boil.",
      de: "Nach dem Öffnen im Kühlschrank aufbewahren. Kein Abkochen nötig.",
    },
    containsMilk: true,
    source: "Specifikacija proizvoda MI99 (Mlijeko Cafe 3,8 %)",
  },
  "schmand-18-400g": {
    ingredients: {
      bs: "vrhnje s 18 % mliječne masti, mlijeko u prahu i mliječna kultura",
      en: "cream with 18% milk fat, milk powder and dairy cultures",
      de: "Rahm mit 18 % Milchfett, Milchpulver und Milchsäurekulturen",
    },
    storage: { bs: "od 4 do 8 °C", en: "between 4 and 8 °C", de: "zwischen 4 und 8 °C" },
    shelfLifeDays: 60,
    afterOpening: {
      bs: "Proizvod je nakon otvaranja spreman za konzumaciju.",
      en: "Ready to consume once opened.",
      de: "Nach dem Öffnen verzehrfertig.",
    },
    containsMilk: true,
    source: "Specifikacija proizvoda MI99 (Schmand 18 % 400 g)",
  },
};

/* The source page for this product repeats the yoghurt nutrition table. */
const SUPPRESS_NUTRITION = new Set(["natura-kisela-pavlaka-20-300g"]);

const FAT_FROM_NUTRITION = new Set(["grcki-jogurt-150g", "grcki-jogurt-400g", "ayran-250g", "ayran-1kg"]);

export function isValidEan13(code: string): boolean {
  if (!/^\d{13}$/.test(code)) return false;
  const digits = code.split("").map(Number);
  const sum = digits.slice(0, 12).reduce((acc, d, i) => acc + d * (i % 2 === 0 ? 1 : 3), 0);
  return (10 - (sum % 10)) % 10 === digits[12];
}

const DIMS = /^\d{2,4}(,\d+)?x\d{2,4}(,\d+)?x\d{2,4}(,\d+)?$/i;

function weightsOk(v: string) {
  const parts = v.split("/").map((s) => parseFloat(s.replace(",", ".").trim()));
  return parts.length === 2 && parts.every((n) => !Number.isNaN(n)) && parts[0] <= parts[1];
}

function sanitizeLogistics(l: Record<string, string>, size: Product["size"]): Logistics {
  const out: Logistics = {};
  const primary = l.primary?.replace(/\s+/g, " ").replace("( ", " (").replace("Flasa(", "Flaša (").replace("čašica(", "čašica (").trim();
  if (primary && !/^Neto količina/.test(primary)) out.primary = primary;
  else if (size.unit === "l") out.primary = "Tetra Pak 1 l";
  for (const k of ["primaryDims", "secondaryDims", "palletDims"] as const) {
    const v = l[k]?.replace(/X/g, "x").replace(/\s/g, "");
    if (v && DIMS.test(v)) {
      const largest = Math.max(...v.split("x").map((n) => parseFloat(n.replace(",", "."))));
      if (largest < 2500) out[k] = v.replace(/x/g, " × ");
    }
  }
  for (const k of ["primaryWeight", "secondaryWeight", "palletWeight"] as const) {
    const v = l[k]?.replace(/\s/g, "");
    if (v && weightsOk(v)) out[k] = v.replace("/", " / ");
  }
  if (l.secondaryUnits && /^\d+$/.test(l.secondaryUnits.trim())) out.secondaryUnits = l.secondaryUnits.trim();
  if (l.pallet === "EUR") out.pallet = "EUR (1200 × 800)";
  for (const k of ["palletLayers", "palletUnits"] as const) {
    const v = l[k]?.replace(/X/g, "x").replace(/\s/g, "");
    if (v && /^\d+(x|\/)\d+$/i.test(v)) out[k] = v.replace(/[x/]/i, " × ");
  }
  return out;
}

function parseSize(s: string): Product["size"] {
  const [num, unit] = s.split(" ");
  return { value: parseFloat(num.replace(",", ".")), unit: unit as Product["size"]["unit"] };
}

const meta = imageMeta as Record<string, { width: number; height: number }>;

function buildProduct(p: RawProduct): Product {
  const size = parseSize(p.size);
  const nutrition = SUPPRESS_NUTRITION.has(p.slug) ? null : (p.nutrition as Nutrition);
  const fatRaw = p.fat ?? (FAT_FROM_NUTRITION.has(p.slug) ? (p.nutrition as Nutrition).fat?.replace(" g", "") ?? null : null);
  const eanRaw = (p.logistics as Record<string, string>).ean;
  const images: PackImage[] = p.images.map((_, i) => {
    const file = i === 0 ? p.slug : `${p.slug}-v${i + 1}`;
    const m = meta[file] ?? { width: 680, height: 1300 };
    return { src: `/images/products/${file}.webp`, width: m.width, height: m.height };
  });
  return {
    slug: p.slug,
    brand: (p.brand === "migg" ? "mi99" : p.brand) as BrandId,
    category: p.category as CategoryId,
    name: p.name,
    fat: fatRaw ? parseFloat(fatRaw.replace(",", ".")) : null,
    size,
    nutrition,
    logistics: sanitizeLogistics(p.logistics as Record<string, string>, size),
    ean: eanRaw && isValidEan13(eanRaw) ? eanRaw : null,
    spec: SPEC[p.slug] ?? null,
    images,
    specFile: p.specFiles.length ? `/downloads/specifikacije/${p.slug}.pdf` : null,
    legacyUrl: p.legacyUrls[0],
    claims: p.bullets.length
      ? ["freshMilk", "technology", p.bullets.some((b) => b.includes("jogurta")) ? "connoisseursYoghurt" : "connoisseursMilk"]
      : [],
  };
}

export const products: Product[] = raw.map(buildProduct);

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (id: string) => categories.find((c) => c.id === id);
export const getBrand = (id: string) => brands.find((b) => b.id === id);
export const productsByCategory = (id: CategoryId) => products.filter((p) => p.category === id);
export const productsByBrand = (id: BrandId) => products.filter((p) => p.brand === id);

export function relatedProducts(product: Product, count = 4): Product[] {
  const same = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const others = products.filter((p) => p.slug !== product.slug && p.category !== product.category && p.brand === product.brand);
  return [...same, ...others].slice(0, count);
}

/** Sibling SKUs that share the product name (other sizes / fat levels). */
export function variantsOf(product: Product): Product[] {
  return products.filter((p) => p.name === product.name && p.brand === product.brand);
}

/* ---------------------------- formatting ---------------------------- */

const nf = (locale: string, n: number) =>
  new Intl.NumberFormat(locale === "bs" ? "bs-BA" : locale, { maximumFractionDigits: 1 }).format(n);

export function formatSize(size: Product["size"], locale: string) {
  return `${nf(locale, size.value)} ${size.unit}`;
}

export function formatFat(fat: number | null, locale: string) {
  if (fat === null) return null;
  const v = nf(locale, fat);
  if (locale === "en") return `${v}% fat`;
  if (locale === "de") return `${v} % Fett`;
  return `${v} % m.m.`;
}

export function productTitle(p: Product, locale: string) {
  const fat = p.fat !== null && !FAT_FROM_NUTRITION.has(p.slug) ? ` ${nf(locale, p.fat)} %` : "";
  return `${p.name}${fat}`;
}

export const totalProducts = products.length;
