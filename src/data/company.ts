/** Verified company facts (source: mi99.ba – Početna, O nama, Proizvodnja, Uvijek svježe, Kontakt). */
export const company = {
  legalName: "Mliječna industrija 99 d.o.o.",
  shortName: "MI99",
  founded: 2015,
  street: "Sarajevska bb",
  postalCode: "76250",
  city: "Gradačac",
  country: "Bosna i Hercegovina",
  countryCode: "BA",
  phone: "+387 35 822-550",
  phoneHref: "tel:+38735822550",
  email: "info@mi99.ba",
  geo: { lat: 44.9002, lng: 18.4369 },
  facebook: "https://www.facebook.com/Mlije%C4%8Dna-Industrija-99-doo-1313253052018177/",
  /** Markets listed on mi99.ba/uvjek-svjeze, besides Bosnia and Herzegovina. */
  regionalMarkets: ["HR", "RS", "ME", "XK", "MK", "AL"] as const,
  /** Figures published on mi99.ba/o-nama (date not stated on the page). */
  published: { employees: 59, graduates: 12, farmers: 1500 },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mi99.ba",
};

export const marketNames: Record<string, Record<string, string>> = {
  BA: { bs: "Bosna i Hercegovina", en: "Bosnia and Herzegovina", de: "Bosnien und Herzegowina" },
  HR: { bs: "Hrvatska", en: "Croatia", de: "Kroatien" },
  RS: { bs: "Srbija", en: "Serbia", de: "Serbien" },
  ME: { bs: "Crna Gora", en: "Montenegro", de: "Montenegro" },
  XK: { bs: "Kosovo", en: "Kosovo", de: "Kosovo" },
  MK: { bs: "Sjeverna Makedonija", en: "North Macedonia", de: "Nordmazedonien" },
  AL: { bs: "Albanija", en: "Albania", de: "Albanien" },
};

/** Production equipment as listed on mi99.ba/proizvodnja. */
export const equipment = [
  { bs: "Automatizirane linije prijema sirovine", en: "Automated raw-milk reception lines", de: "Automatisierte Rohmilchannahme" },
  { bs: "Automatizirani CIP sistemi", en: "Automated CIP cleaning systems", de: "Automatisierte CIP-Reinigungssysteme" },
  { bs: "Pasterizator za sirovo mlijeko 15.000 l/h", en: "Raw-milk pasteuriser 15,000 l/h", de: "Rohmilch-Pasteur 15.000 l/h" },
  { bs: "Pasterizator za fermentirane proizvode 15.000 l/h", en: "Pasteuriser for fermented products 15,000 l/h", de: "Pasteur für fermentierte Produkte 15.000 l/h" },
  { bs: "Mixing zona", en: "Mixing zone", de: "Mischzone" },
  { bs: "UHT sterilizator", en: "UHT steriliser", de: "UHT-Sterilisator" },
  { bs: "Fermentacija u sterilnim uslovima", en: "Fermentation under sterile conditions", de: "Fermentation unter sterilen Bedingungen" },
  { bs: "AVE mašina za punjenje flaša (3.500 kg/h)", en: "AVE bottle filler (3,500 kg/h)", de: "AVE-Flaschenabfüller (3.500 kg/h)" },
  { bs: "HAMBA mašina za punjenje čašica (4.500 kg/h)", en: "HAMBA cup filler (4,500 kg/h)", de: "HAMBA-Becherabfüller (4.500 kg/h)" },
  { bs: "TBA 8 – punilice FE i FD (12.000 l/h)", en: "TBA 8 fillers FE and FD (12,000 l/h)", de: "TBA-8-Abfüller FE und FD (12.000 l/h)" },
  { bs: "Kotlovnica na drva i gas", en: "Wood- and gas-fired boiler house", de: "Holz- und Gaskesselhaus" },
  { bs: "Skladište za UHT mlijeko i ambalažu", en: "Warehouse for UHT milk and packaging", de: "Lager für H-Milch und Verpackung" },
  { bs: "Hladnjača za fermentirane proizvode", en: "Cold store for fermented products", de: "Kühllager für fermentierte Produkte" },
];

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  standard: { bs: string; en: string; de: string };
  scope: { bs: string; en: string; de: string };
  issued: string; // ISO date
  validUntil: string; // ISO date
  file: string;
  preview: string;
  size: string;
}

/** Documents published on mi99.ba/proizvodnja. Both have passed their validity date. */
export const certificates: Certificate[] = [
  {
    id: "ifs-food-2018",
    title: "IFS Food",
    issuer: "Global Quality Sp. z o.o., Varšava",
    standard: { bs: "IFS Food, verzija 6 – viši nivo", en: "IFS Food version 6 – higher level", de: "IFS Food Version 6 – höheres Niveau" },
    scope: {
      bs: "Proizvodnja UHT mlijeka u tetrapaku, tečnog jogurta u PET bočicama i pavlake u plastičnim čašama.",
      en: "Production of UHT milk in Tetra Pak, liquid yoghurt in PET bottles and cream in plastic cups.",
      de: "Herstellung von H-Milch im Tetra Pak, Trinkjoghurt in PET-Flaschen und Rahm in Kunststoffbechern.",
    },
    issued: "2018-04-24",
    validUntil: "2019-05-09",
    file: "/downloads/certifikati/mi99-ifs-food-certifikat-2018.pdf",
    preview: "/images/company/certifikat-ifs-2018.webp",
    size: "158 kB",
  },
  {
    id: "halal-2016",
    title: "Halal",
    issuer: "Agencija za certificiranje halal kvalitete",
    standard: { bs: "Halal standard BAS 1049:2010", en: "Halal standard BAS 1049:2010", de: "Halal-Standard BAS 1049:2010" },
    scope: {
      bs: "Mlijeko i mliječni proizvodi na kojima je istaknut znak halal kvalitete.",
      en: "Milk and dairy products bearing the halal quality mark.",
      de: "Milch und Milchprodukte mit dem Halal-Qualitätszeichen.",
    },
    issued: "2016-10-17",
    validUntil: "2017-10-17",
    file: "/downloads/certifikati/mi99-halal-certifikat-2016.pdf",
    preview: "/images/company/certifikat-halal-2016.webp",
    size: "6,5 MB",
  },
];
