/**
 * News archive.
 *
 * The existing mi99.ba "Novosti" page only says "Uskoro opširnije…", so there
 * are no published press releases to migrate. These entries are built
 * exclusively from facts in MI99's own published pages and documents. Dates are
 * shown only where an official document states them; everything else is
 * undated. New articles are meant to be added by MI99 through a CMS.
 */
import type { L10n } from "./types";

export type NewsCategory = "certifikati" | "kompanija" | "trzista" | "asortiman";

export interface NewsArticle {
  slug: string;
  category: NewsCategory;
  /** ISO date from an official document, or null when no date is published. */
  date: string | null;
  /** Year-only label when only the year is known. */
  year?: number;
  title: L10n;
  excerpt: L10n;
  body: Record<"bs" | "en" | "de", string[]>;
  image: string;
  imageAlt: L10n;
  source: { label: string; href: string };
}

export const newsCategories: { id: NewsCategory; name: L10n }[] = [
  { id: "certifikati", name: { bs: "Certifikati", en: "Certificates", de: "Zertifikate" } },
  { id: "kompanija", name: { bs: "Kompanija", en: "Company", de: "Unternehmen" } },
  { id: "trzista", name: { bs: "Tržišta", en: "Markets", de: "Märkte" } },
  { id: "asortiman", name: { bs: "Asortiman", en: "Product range", de: "Sortiment" } },
];

export const news: NewsArticle[] = [
  {
    slug: "ifs-food-certifikat-2018",
    category: "certifikati",
    date: "2018-04-24",
    title: {
      bs: "MI99 certificirana prema standardu IFS Food na višem nivou",
      en: "MI99 certified to IFS Food at higher level",
      de: "MI99 nach IFS Food auf höherem Niveau zertifiziert",
    },
    excerpt: {
      bs: "Nakon audita u martu 2018. godine, certifikacijsko tijelo Global Quality potvrdilo je usklađenost proizvodnje sa zahtjevima IFS Food standarda.",
      en: "Following an audit in March 2018, the certification body Global Quality confirmed compliance with the IFS Food standard.",
      de: "Nach einem Audit im März 2018 bestätigte die Zertifizierungsstelle Global Quality die Konformität mit dem IFS-Food-Standard.",
    },
    body: {
      bs: [
        "Mliječna industrija 99 prošla je audit od 13. do 15. marta 2018. godine, koji je provelo akreditirano certifikacijsko tijelo Global Quality iz Varšave. Certifikat IFS Food, verzija 6, izdat je 24. aprila 2018. godine na višem nivou (Higher Level).",
        "Obuhvat certifikata uključuje proizvodnju UHT mlijeka u tetrapaku, tečnog jogurta u PET bočicama i pavlake u plastičnim čašama – ključne kategorije asortimana brendova Natura i Milkland.",
        "Certifikat je vrijedio do 9. maja 2019. godine i dostupan je u arhivi certifikata na stranici Proizvodnja i kvalitet. Informacije o trenutno važećim certifikatima dostupne su na upit.",
      ],
      en: [
        "Mliječna industrija 99 was audited from 13 to 15 March 2018 by the accredited certification body Global Quality, Warsaw. The IFS Food certificate, version 6, was issued on 24 April 2018 at Higher Level.",
        "The scope covers the production of UHT milk in Tetra Pak, liquid yoghurt in PET bottles and cream in plastic cups – core categories of the Natura and Milkland ranges.",
        "The certificate was valid until 9 May 2019 and is available in the certificate archive on the Production & Quality page. Information on currently valid certificates is available on request.",
      ],
      de: [
        "Die Mliječna industrija 99 wurde vom 13. bis 15. März 2018 von der akkreditierten Zertifizierungsstelle Global Quality (Warschau) auditiert. Das Zertifikat IFS Food, Version 6, wurde am 24. April 2018 auf höherem Niveau ausgestellt.",
        "Der Geltungsbereich umfasst die Herstellung von H-Milch im Tetra Pak, Trinkjoghurt in PET-Flaschen und Rahm in Kunststoffbechern – Kernkategorien der Marken Natura und Milkland.",
        "Das Zertifikat war bis zum 9. Mai 2019 gültig und steht im Zertifikatsarchiv auf der Seite Produktion & Qualität bereit. Informationen zu aktuell gültigen Zertifikaten erhalten Sie auf Anfrage.",
      ],
    },
    image: "/images/company/proizvodna-linija.webp",
    imageAlt: { bs: "Proizvodna linija MI99", en: "MI99 production line", de: "MI99-Produktionslinie" },
    source: { label: "IFS Food certifikat (PDF)", href: "/downloads/certifikati/mi99-ifs-food-certifikat-2018.pdf" },
  },
  {
    slug: "halal-certifikat-2016",
    category: "certifikati",
    date: "2016-10-17",
    title: {
      bs: "Halal certifikat za mlijeko i mliječne proizvode",
      en: "Halal certificate for milk and dairy products",
      de: "Halal-Zertifikat für Milch und Milchprodukte",
    },
    excerpt: {
      bs: "Agencija za certificiranje halal kvalitete potvrdila je da se proizvodi sa znakom halal kvalitete proizvode prema standardu BAS 1049:2010.",
      en: "The Halal Quality Certification Agency confirmed that products bearing the halal mark are produced to standard BAS 1049:2010.",
      de: "Die Agentur für Halal-Zertifizierung bestätigte, dass Produkte mit Halal-Zeichen nach BAS 1049:2010 hergestellt werden.",
    },
    body: {
      bs: [
        "Agencija za certificiranje halal kvalitete izdala je 17. oktobra 2016. godine certifikat kojim se potvrđuje da se mlijeko i mliječni proizvodi Mliječne industrije 99, na kojima je istaknut znak halal kvalitete, proizvode u skladu sa zahtjevima Halal standarda BAS 1049:2010.",
        "Sastavni dio certifikata je Lista halal proizvoda 155-LHP-1, a registarski broj certifikata je CHP-155-01. Certifikat je vrijedio do 17. oktobra 2017. godine.",
      ],
      en: [
        "On 17 October 2016 the Halal Quality Certification Agency issued a certificate confirming that the milk and dairy products of Mliječna industrija 99 bearing the halal quality mark are produced in line with the Halal standard BAS 1049:2010.",
        "The halal product list 155-LHP-1 forms part of the certificate, registration number CHP-155-01. The certificate was valid until 17 October 2017.",
      ],
      de: [
        "Am 17. Oktober 2016 stellte die Agentur für Halal-Zertifizierung ein Zertifikat aus, das bestätigt, dass Milch und Milchprodukte der Mliječna industrija 99 mit Halal-Zeichen gemäß dem Halal-Standard BAS 1049:2010 hergestellt werden.",
        "Bestandteil des Zertifikats ist die Halal-Produktliste 155-LHP-1, Registernummer CHP-155-01. Das Zertifikat war bis zum 17. Oktober 2017 gültig.",
      ],
    },
    image: "/images/company/laboratorija.webp",
    imageAlt: { bs: "Laboratorija MI99", en: "MI99 laboratory", de: "MI99-Labor" },
    source: { label: "Halal certifikat (PDF)", href: "/downloads/certifikati/mi99-halal-certifikat-2016.pdf" },
  },
  {
    slug: "pocetak-mi99-gradacac",
    category: "kompanija",
    date: null,
    year: 2015,
    title: {
      bs: "Mliječna industrija 99 – priča koja je počela u Gradačcu",
      en: "Mliječna industrija 99 – a story that began in Gradačac",
      de: "Mliječna industrija 99 – eine Geschichte, die in Gradačac begann",
    },
    excerpt: {
      bs: "Kompanija je osnovana 2015. godine kupovinom strateškog udjela od Zott International GmbH iz Mertingena u Njemačkoj.",
      en: "The company was founded in 2015 by acquiring a strategic stake from Zott International GmbH of Mertingen, Germany.",
      de: "Das Unternehmen wurde 2015 durch den Erwerb eines strategischen Anteils von der Zott International GmbH aus Mertingen gegründet.",
    },
    body: {
      bs: [
        "„Mliječna industrija 99“ d.o.o. osnovana je 2015. godine kupovinom strateškog udjela od Zott International GmbH, Mertingen, Njemačka. Osnovna djelatnost kompanije je prerada i promet mlijeka i mliječnih prerađevina.",
        "Kompanija se nalazi u Gradačcu, u sjeveroistočnom dijelu Bosne i Hercegovine, sa strateškom pozicijom u blizini granice s Republikom Hrvatskom i dobrim putnim komunikacijama.",
        "Misija kompanije je zadovoljan krajnji potrošač, uz zadovoljstvo svih koji učestvuju u isporuci proizvoda do kupaca. Vizija je postati lider u segmentu mljekarstva, uz stalno ulaganje u inovacije i tehnologiju.",
      ],
      en: [
        "Mliječna industrija 99 d.o.o. was founded in 2015 through the acquisition of a strategic stake from Zott International GmbH, Mertingen, Germany. The company's core business is the processing and sale of milk and dairy products.",
        "The company is based in Gradačac in north-eastern Bosnia and Herzegovina, strategically close to the Croatian border and with good road connections.",
        "Its mission is a satisfied consumer – and the satisfaction of everyone involved in bringing products to customers. Its vision is to become a leader in dairy through continuous investment in innovation and technology.",
      ],
      de: [
        "Die Mliječna industrija 99 d.o.o. wurde 2015 durch den Erwerb eines strategischen Anteils von der Zott International GmbH, Mertingen, gegründet. Kerngeschäft ist die Verarbeitung und der Vertrieb von Milch und Milchprodukten.",
        "Das Unternehmen hat seinen Sitz in Gradačac im Nordosten von Bosnien und Herzegowina – strategisch nahe der kroatischen Grenze und gut an das Straßennetz angebunden.",
        "Mission ist der zufriedene Verbraucher – und die Zufriedenheit aller, die an der Lieferung beteiligt sind. Vision ist die Marktführerschaft im Molkereisegment durch stetige Investitionen in Innovation und Technologie.",
      ],
    },
    image: "/images/company/tvornica-gradacac.webp",
    imageAlt: { bs: "Pogon MI99 u Gradačcu", en: "MI99 plant in Gradačac", de: "MI99-Werk in Gradačac" },
    source: { label: "mi99.ba – O nama", href: "https://mi99.ba/o-nama" },
  },
  {
    slug: "natura-i-milkland-u-regionu",
    category: "trzista",
    date: null,
    title: {
      bs: "Natura i Milkland na policama šest zemalja regiona",
      en: "Natura and Milkland on shelves in six regional markets",
      de: "Natura und Milkland in sechs Märkten der Region",
    },
    excerpt: {
      bs: "Osim u Bosni i Hercegovini, proizvodi se nalaze u Hrvatskoj, Srbiji, Crnoj Gori, na Kosovu, u Sjevernoj Makedoniji i Albaniji.",
      en: "Beyond Bosnia and Herzegovina, the products are available in Croatia, Serbia, Montenegro, Kosovo, North Macedonia and Albania.",
      de: "Neben Bosnien und Herzegowina sind die Produkte in Kroatien, Serbien, Montenegro, Kosovo, Nordmazedonien und Albanien erhältlich.",
    },
    body: {
      bs: [
        "Pored tradicionalnog prisustva na policama trgovinskih lanaca u Bosni i Hercegovini, proizvodi brendova Natura i Milkland nalaze se i u Hrvatskoj, Srbiji, Crnoj Gori, na Kosovu, u Sjevernoj Makedoniji i Albaniji.",
        "Za svako od tržišta kompanija ima generalne uvoznike i distributere. Sistem isporuke koncipiran je tako da kupci u svakom trenutku imaju najsvježije dostupne proizvode iz centralnog skladišta izgrađenog prema savremenim standardima.",
      ],
      en: [
        "In addition to their long-standing presence in Bosnian retail chains, Natura and Milkland products are sold in Croatia, Serbia, Montenegro, Kosovo, North Macedonia and Albania.",
        "Each market is served by general importers and distributors. Deliveries are organised so that customers always receive the freshest products available from a central warehouse built to modern standards.",
      ],
      de: [
        "Neben der langjährigen Präsenz im bosnischen Handel sind Natura- und Milkland-Produkte in Kroatien, Serbien, Montenegro, Kosovo, Nordmazedonien und Albanien erhältlich.",
        "Jeder Markt wird über Generalimporteure und Distributoren beliefert. Die Logistik stellt sicher, dass Kunden stets die frischesten Produkte aus einem modernen Zentrallager erhalten.",
      ],
    },
    image: "/images/company/kamion.webp",
    imageAlt: { bs: "Dostavno vozilo MI99", en: "MI99 delivery truck", de: "MI99-Lieferwagen" },
    source: { label: "mi99.ba – Uvijek svježe", href: "https://mi99.ba/uvjek-svjeze" },
  },
  {
    slug: "eu-licenca-za-izvoz",
    category: "kompanija",
    date: null,
    title: {
      bs: "EU licenca za izvoz u zemlje Evropske unije",
      en: "EU licence for exports to the European Union",
      de: "EU-Lizenz für den Export in die Europäische Union",
    },
    excerpt: {
      bs: "Licenca potvrđuje da su proizvodi i proizvodni proces usklađeni sa strogim propisima Evropske unije.",
      en: "The licence confirms that products and processes meet the European Union's strict regulations.",
      de: "Die Lizenz bestätigt, dass Produkte und Prozesse den strengen EU-Vorschriften entsprechen.",
    },
    body: {
      bs: [
        "Mliječna industrija 99 vlasnik je EU licence za izvoz proizvoda u zemlje Evropske unije – licence koja potvrđuje da su proizvodi i proizvodni proces u skladu sa strogim regulativama Evropske unije.",
        "Licenca je rezultat sistemskog pristupa upravljanju kvalitetom, sljedivosti proizvodnje i kontroli kvaliteta u svim fazama, od otkupa sirovog mlijeka do gotovog proizvoda.",
      ],
      en: [
        "Mliječna industrija 99 holds an EU licence to export its products to the European Union – a licence confirming that products and production processes meet the EU's strict regulations.",
        "It reflects a systematic approach to quality management, production traceability and quality control at every stage, from raw-milk collection to the finished product.",
      ],
      de: [
        "Die Mliječna industrija 99 besitzt eine EU-Lizenz für den Export in die Europäische Union – sie bestätigt, dass Produkte und Produktionsprozesse den strengen EU-Vorschriften entsprechen.",
        "Sie ist Ergebnis eines systematischen Qualitätsmanagements, der Rückverfolgbarkeit und der Qualitätskontrolle in allen Stufen – von der Rohmilchannahme bis zum fertigen Produkt.",
      ],
    },
    image: "/images/company/kontrolna-ploca.webp",
    imageAlt: { bs: "Kontrolna ploča u pogonu", en: "Plant control panel", de: "Steuerpult im Werk" },
    source: { label: "mi99.ba – O nama", href: "https://mi99.ba/o-nama" },
  },
  {
    slug: "grcki-jogurt-i-ayran",
    category: "asortiman",
    date: null,
    title: {
      bs: "Grčki jogurt i Ayran u asortimanu MI99",
      en: "Greek yoghurt and Ayran in the MI99 range",
      de: "Griechischer Joghurt und Ayran im MI99-Sortiment",
    },
    excerpt: {
      bs: "Kremasti grčki jogurt u čašama od 150 i 400 g te osvježavajući ayran u pakovanjima od 250 g i 1 kg.",
      en: "Creamy Greek yoghurt in 150 g and 400 g pots, and refreshing ayran in 250 g and 1 kg packs.",
      de: "Cremiger griechischer Joghurt im 150-g- und 400-g-Becher sowie erfrischender Ayran in 250 g und 1 kg.",
    },
    body: {
      bs: [
        "Službeni katalog MI99 uključuje grčki jogurt u čašama od 150 g i 400 g, s 9,8 g masti na 100 g, te ayran u čaši od 250 g i boci od 1 kg.",
        "Kompletne nutritivne vrijednosti i logistički podaci za svako pakovanje dostupni su na stranicama proizvoda, zajedno sa specifikacijama za preuzimanje.",
      ],
      en: [
        "The official MI99 catalogue includes Greek yoghurt in 150 g and 400 g pots, with 9.8 g fat per 100 g, and ayran in a 250 g cup and a 1 kg bottle.",
        "Full nutrition facts and logistics data for every pack are on the product pages, together with downloadable specifications.",
      ],
      de: [
        "Der offizielle MI99-Katalog umfasst griechischen Joghurt im 150-g- und 400-g-Becher mit 9,8 g Fett pro 100 g sowie Ayran im 250-g-Becher und in der 1-kg-Flasche.",
        "Vollständige Nährwerte und Logistikdaten jeder Packung finden Sie auf den Produktseiten – inklusive Spezifikationen zum Download.",
      ],
    },
    image: "/images/photos/granola-bowl.webp",
    imageAlt: { bs: "Jogurt s voćem", en: "Yoghurt with fruit", de: "Joghurt mit Obst" },
    source: { label: "mi99.ba – Proizvodi", href: "https://mi99.ba/proizvodi" },
  },
];

export const getArticle = (slug: string) => news.find((n) => n.slug === slug);
