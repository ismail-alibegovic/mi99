/**
 * Recipe concepts. These are NEW proposed content for the redesigned site –
 * not existing official MI99 content – and are labelled as such in the UI.
 * Photography is illustrative stock (Unsplash licence).
 */
import type { L10n } from "./types";

export interface Recipe {
  slug: string;
  title: L10n;
  intro: L10n;
  minutes: number;
  servings: number;
  difficulty: L10n;
  image: string;
  imageAlt: L10n;
  products: string[];
  ingredients: Record<"bs" | "en" | "de", string[]>;
  steps: Record<"bs" | "en" | "de", string[]>;
  tip: L10n;
}

const easy = { bs: "Lako", en: "Easy", de: "Einfach" };
const medium = { bs: "Srednje", en: "Medium", de: "Mittel" };

export const recipes: Recipe[] = [
  {
    slug: "palacinke-s-natura-mlijekom",
    title: { bs: "Palačinke s Natura mlijekom", en: "Crêpes with Natura milk", de: "Palatschinken mit Natura-Milch" },
    intro: {
      bs: "Tanke, mekane palačinke kakve se prave nedjeljom ujutro – uz grčki jogurt i svježe voće.",
      en: "Thin, tender crêpes the way they are made on a Sunday morning – with Greek yoghurt and fresh fruit.",
      de: "Dünne, zarte Palatschinken wie am Sonntagmorgen – mit griechischem Joghurt und frischem Obst.",
    },
    minutes: 30,
    servings: 4,
    difficulty: easy,
    image: "/images/photos/crepes.webp",
    imageAlt: { bs: "Složene palačinke na tanjiru", en: "Stack of crêpes on a plate", de: "Palatschinken auf einem Teller" },
    products: ["natura-trajno-mlijeko-2-8", "grcki-jogurt-400g"],
    ingredients: {
      bs: ["500 ml Natura Trajnog mlijeka 2,8 %", "3 jaja", "250 g glatkog brašna", "1 kašika šećera", "prstohvat soli", "2 kašike ulja + ulje za tavu", "Za posluživanje: grčki jogurt, med, sezonsko voće"],
      en: ["500 ml Natura UHT milk 2.8%", "3 eggs", "250 g plain flour", "1 tbsp sugar", "pinch of salt", "2 tbsp oil + oil for the pan", "To serve: Greek yoghurt, honey, seasonal fruit"],
      de: ["500 ml Natura H-Milch 2,8 %", "3 Eier", "250 g Weizenmehl", "1 EL Zucker", "1 Prise Salz", "2 EL Öl + Öl für die Pfanne", "Zum Servieren: griechischer Joghurt, Honig, Obst der Saison"],
    },
    steps: {
      bs: ["Umutite jaja sa šećerom i solju, pa postepeno dodajte mlijeko.", "Uz stalno miješanje umiješajte brašno dok ne dobijete glatko, rijetko tijesto. Dodajte ulje.", "Ostavite tijesto da odstoji 15 minuta.", "Na zagrijanoj, lagano nauljenoj tavi pecite tanke palačinke s obje strane.", "Poslužite toplo s kašikom grčkog jogurta, medom i voćem."],
      en: ["Whisk the eggs with sugar and salt, then gradually add the milk.", "Whisk in the flour until you have a smooth, thin batter. Stir in the oil.", "Let the batter rest for 15 minutes.", "Cook thin crêpes on both sides in a hot, lightly oiled pan.", "Serve warm with a spoonful of Greek yoghurt, honey and fruit."],
      de: ["Eier mit Zucker und Salz verquirlen, dann nach und nach die Milch zugeben.", "Mehl einrühren, bis ein glatter, dünnflüssiger Teig entsteht. Öl unterrühren.", "Teig 15 Minuten ruhen lassen.", "In einer heißen, leicht geölten Pfanne dünne Palatschinken beidseitig backen.", "Warm mit einem Löffel griechischem Joghurt, Honig und Obst servieren."],
    },
    tip: {
      bs: "Za još mekše palačinke zamijenite 100 ml mlijeka gaziranom vodom.",
      en: "For extra-tender crêpes, replace 100 ml of the milk with sparkling water.",
      de: "Für besonders zarte Palatschinken 100 ml Milch durch Mineralwasser ersetzen.",
    },
  },
  {
    slug: "kremasti-dorucak-s-grckim-jogurtom",
    title: { bs: "Kremasti doručak s grčkim jogurtom", en: "Creamy Greek yoghurt breakfast", de: "Cremiges Frühstück mit griechischem Joghurt" },
    intro: {
      bs: "Pet minuta, jedna zdjela: grčki jogurt, hrskave pahuljice, orašasti plodovi i bobičasto voće.",
      en: "Five minutes, one bowl: Greek yoghurt, crunchy oats, nuts and berries.",
      de: "Fünf Minuten, eine Schale: griechischer Joghurt, knusprige Flocken, Nüsse und Beeren.",
    },
    minutes: 5,
    servings: 2,
    difficulty: easy,
    image: "/images/photos/granola-bowl.webp",
    imageAlt: { bs: "Zdjela jogurta s granolom i malinama", en: "Bowl of yoghurt with granola and raspberries", de: "Schale Joghurt mit Granola und Himbeeren" },
    products: ["grcki-jogurt-400g", "grcki-jogurt-150g"],
    ingredients: {
      bs: ["300 g grčkog jogurta", "4 kašike granole ili zobenih pahuljica", "šaka malina ili borovnica", "1 kašika meda", "nekoliko oraha ili badema"],
      en: ["300 g Greek yoghurt", "4 tbsp granola or rolled oats", "a handful of raspberries or blueberries", "1 tbsp honey", "a few walnuts or almonds"],
      de: ["300 g griechischer Joghurt", "4 EL Granola oder Haferflocken", "1 Handvoll Himbeeren oder Heidelbeeren", "1 EL Honig", "einige Walnüsse oder Mandeln"],
    },
    steps: {
      bs: ["Kremasto umutite jogurt i rasporedite ga u dvije zdjele.", "Pospite granolom i krupno sjeckanim orašastim plodovima.", "Dodajte bobičasto voće i prelijte medom. Poslužite odmah."],
      en: ["Stir the yoghurt until creamy and divide between two bowls.", "Top with granola and roughly chopped nuts.", "Add the berries and drizzle with honey. Serve straight away."],
      de: ["Joghurt cremig rühren und auf zwei Schalen verteilen.", "Mit Granola und grob gehackten Nüssen bestreuen.", "Beeren daraufgeben, mit Honig beträufeln und sofort servieren."],
    },
    tip: {
      bs: "Pripremite navečer u staklenci, a granolu dodajte ujutro da ostane hrskava.",
      en: "Prepare it in a jar the night before and add the granola in the morning so it stays crunchy.",
      de: "Am Vorabend im Glas vorbereiten und das Granola erst morgens zugeben, damit es knusprig bleibt.",
    },
  },
  {
    slug: "domaca-pita-uz-natura-jogurt",
    title: { bs: "Domaća pita uz Natura jogurt", en: "Homemade pie with Natura yoghurt", de: "Hausgemachte Pita mit Natura-Joghurt" },
    intro: {
      bs: "Sirnica od tankih jufki, svježeg sira i kisele pavlake – i hladan jogurt uz nju, kako je red.",
      en: "Sirnica made with thin filo, fresh cheese and sour cream – served, as it should be, with cold yoghurt.",
      de: "Sirnica aus dünnem Yufka-Teig, Frischkäse und Sauerrahm – und dazu, wie es sich gehört, kalter Joghurt.",
    },
    minutes: 75,
    servings: 6,
    difficulty: medium,
    image: "/images/photos/cream-plate.webp",
    imageAlt: { bs: "Komad slojevite pite na tanjiru", en: "Slice of layered pie on a plate", de: "Stück geschichtete Pita auf einem Teller" },
    products: ["natura-jogurt-2-8-1kg", "natura-kisela-pavlaka-20-800g"],
    ingredients: {
      bs: ["500 g tankih jufki", "500 g svježeg kravljeg sira", "3 jaja", "200 g Natura kisele pavlake 20 %", "100 ml ulja", "200 ml gazirane vode", "so po ukusu", "Za posluživanje: hladan Natura jogurt"],
      en: ["500 g thin filo (yufka) sheets", "500 g fresh cow's cheese", "3 eggs", "200 g Natura sour cream 20%", "100 ml oil", "200 ml sparkling water", "salt to taste", "To serve: cold Natura yoghurt"],
      de: ["500 g dünne Yufka-Teigblätter", "500 g frischer Kuhmilchkäse", "3 Eier", "200 g Natura Sauerrahm 20 %", "100 ml Öl", "200 ml Mineralwasser", "Salz nach Geschmack", "Zum Servieren: kalter Natura-Joghurt"],
    },
    steps: {
      bs: ["Zagrijte rernu na 200 °C i nauljite okrugli pleh.", "Izmiješajte sir, jaja, pavlaku i so u ujednačen fil.", "Svaku jufku lagano poprskajte mješavinom ulja i vode, premažite filom i urolajte.", "Rolice složite u pleh u obliku spirale i premažite ostatkom ulja i vode.", "Pecite 35–40 minuta, dok pita ne dobije zlatnu boju.", "Ostavite da odstoji 10 minuta i poslužite uz hladan jogurt."],
      en: ["Preheat the oven to 200 °C and oil a round baking tin.", "Mix the cheese, eggs, sour cream and salt into an even filling.", "Lightly sprinkle each sheet with the oil-and-water mix, spread with filling and roll up.", "Coil the rolls into the tin and brush with the remaining oil and water.", "Bake for 35–40 minutes until golden.", "Rest for 10 minutes and serve with cold yoghurt."],
      de: ["Backofen auf 200 °C vorheizen und eine runde Form ölen.", "Käse, Eier, Sauerrahm und Salz zu einer gleichmäßigen Füllung verrühren.", "Jedes Teigblatt leicht mit Öl-Wasser-Mischung beträufeln, mit Füllung bestreichen und aufrollen.", "Rollen spiralförmig in die Form legen und mit restlicher Öl-Wasser-Mischung bestreichen.", "35–40 Minuten goldbraun backen.", "10 Minuten ruhen lassen und mit kaltem Joghurt servieren."],
    },
    tip: {
      bs: "Pitu pokrijte čistom krpom nakon pečenja – kora će ostati mekana.",
      en: "Cover the pie with a clean tea towel after baking to keep the pastry soft.",
      de: "Die Pita nach dem Backen mit einem sauberen Tuch abdecken – so bleibt der Teig weich.",
    },
  },
  {
    slug: "kremasti-umak-s-kiselom-pavlakom",
    title: { bs: "Kremasti umak s kiselom pavlakom", en: "Creamy sour cream dip", de: "Cremiger Sauerrahm-Dip" },
    intro: {
      bs: "Svjež umak s bijelim lukom i začinskim biljem – uz pečeni krompir, ćevape ili povrće s roštilja.",
      en: "A fresh garlic and herb dip – for roast potatoes, ćevapi or grilled vegetables.",
      de: "Ein frischer Dip mit Knoblauch und Kräutern – zu Ofenkartoffeln, Ćevapi oder Grillgemüse.",
    },
    minutes: 10,
    servings: 4,
    difficulty: easy,
    image: "/images/photos/cream-dip.webp",
    imageAlt: { bs: "Kremasti umak sa začinskim biljem", en: "Creamy dip with herbs", de: "Cremiger Dip mit Kräutern" },
    products: ["natura-kisela-pavlaka-20-800g", "schmand-18-400g"],
    ingredients: {
      bs: ["250 g Natura kisele pavlake 20 %", "2 češnja bijelog luka", "1 kašika sjeckanog kopra", "1 kašika sjeckanog peršuna ili vlasca", "1 kašičica limunovog soka", "so i biber"],
      en: ["250 g Natura sour cream 20%", "2 garlic cloves", "1 tbsp chopped dill", "1 tbsp chopped parsley or chives", "1 tsp lemon juice", "salt and pepper"],
      de: ["250 g Natura Sauerrahm 20 %", "2 Knoblauchzehen", "1 EL gehackter Dill", "1 EL gehackte Petersilie oder Schnittlauch", "1 TL Zitronensaft", "Salz und Pfeffer"],
    },
    steps: {
      bs: ["Bijeli luk sitno naribajte ili protisnite.", "Pavlaku kremasto izmiješajte s lukom, začinskim biljem i limunovim sokom.", "Začinite solju i biberom te ostavite u hladnjaku 15 minuta da se okusi povežu."],
      en: ["Finely grate or crush the garlic.", "Stir the sour cream with the garlic, herbs and lemon juice until creamy.", "Season with salt and pepper and chill for 15 minutes so the flavours come together."],
      de: ["Knoblauch fein reiben oder pressen.", "Sauerrahm mit Knoblauch, Kräutern und Zitronensaft cremig rühren.", "Mit Salz und Pfeffer würzen und 15 Minuten kühlen, damit sich die Aromen verbinden."],
    },
    tip: {
      bs: "Za bogatiju teksturu pola pavlake zamijenite Schmandom 18 %.",
      en: "For a richer texture, swap half the sour cream for Schmand 18%.",
      de: "Für eine reichhaltigere Textur die Hälfte des Sauerrahms durch Schmand 18 % ersetzen.",
    },
  },
];

export const getRecipe = (slug: string) => recipes.find((r) => r.slug === slug);
