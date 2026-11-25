/**
 * End-to-end QA for the MI99 site.
 *
 *   npm run build && npm start   (port 3000, or BASE_URL)
 *   node scripts/qa.cjs [--screenshots]
 *
 * Checks every route at 390 / 768 / 1024 / 1440 / 1920 px for horizontal
 * overflow, console errors and failed requests; crawls all internal links;
 * exercises mobile menu, mega menu, language switch, product filters,
 * category showcase and form validation.
 */
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const BASE = process.env.BASE_URL || "http://localhost:3000";
const SHOTS = process.argv.includes("--screenshots");
const OUT = path.join(__dirname, "..", "qa-screenshots");
const WIDTHS = [390, 768, 1024, 1440, 1920];

const ROUTES = [
  "/bs",
  "/bs/o-nama",
  "/bs/proizvodi",
  "/bs/proizvodi/kategorija/pavlake",
  "/bs/proizvodi/natura-trajno-mlijeko-3-5",
  "/bs/proizvodi/schmand-18-400g",
  "/bs/brendovi",
  "/bs/brendovi/natura",
  "/bs/brendovi/milkland",
  "/bs/proizvodnja-i-kvalitet",
  "/bs/recepti",
  "/bs/recepti/domaca-pita-uz-natura-jogurt",
  "/bs/poslovna-saradnja",
  "/bs/novosti",
  "/bs/novosti/ifs-food-certifikat-2018",
  "/bs/kontakt",
  "/bs/politika-privatnosti",
  "/en",
  "/en/proizvodi/milkland-mlijeko-1-5",
  "/de",
  "/de/kontakt",
];

const problems = [];
const fail = (msg) => {
  problems.push(msg);
  console.log("  ✗ " + msg);
};
const ok = (msg) => console.log("  ✓ " + msg);

async function scrollThrough(page) {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
}

(async () => {
  if (SHOTS) fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();

  // 1. Responsive sweep
  console.log("Responsive sweep");
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => m.type() === "error" && errs.push(m.text()));
    page.on("pageerror", (e) => errs.push(String(e)));
    page.on("response", (r) => r.status() >= 400 && !r.url().includes("openstreetmap") && errs.push(`${r.status()} ${r.url()}`));
    for (const route of ROUTES) {
      errs.length = 0;
      const res = await page.goto(BASE + route, { waitUntil: "load" });
      if (!res || res.status() !== 200) fail(`${route} @${width}: HTTP ${res && res.status()}`);
      await scrollThrough(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (overflow > 0) fail(`${route} @${width}: horizontal overflow ${overflow}px`);
      const broken = await page.evaluate(() =>
        [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== "lazy").map((i) => i.currentSrc || i.src),
      );
      if (broken.length) fail(`${route} @${width}: broken images ${broken.join(", ")}`);
      if (errs.length) fail(`${route} @${width}: ${[...new Set(errs)].join(" | ")}`);
      if (SHOTS && (width === 390 || width === 1440)) {
        const name = `${width}${route.replace(/\//g, "_")}.png`;
        await page.screenshot({ path: path.join(OUT, name), fullPage: true });
      }
    }
    ok(`${width}px: ${ROUTES.length} routes checked`);
    await ctx.close();
  }

  // 2. Link crawl
  console.log("Link crawl");
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const seen = new Set();
    const queue = ["/bs", "/en", "/de"];
    let checked = 0;
    while (queue.length) {
      const url = queue.shift();
      if (seen.has(url)) continue;
      seen.add(url);
      const res = await page.goto(BASE + url, { waitUntil: "domcontentloaded" });
      checked++;
      if (!res || res.status() >= 400) {
        fail(`link ${url} → ${res && res.status()}`);
        continue;
      }
      const links = await page.evaluate(() => [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")));
      for (const href of links) {
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || /^https?:/.test(href)) continue;
        const clean = href.split("#")[0].split("?")[0];
        if (clean.startsWith("/downloads/") || clean.startsWith("/images/")) {
          if (!seen.has(clean)) {
            seen.add(clean);
            const r = await page.request.head(BASE + clean);
            if (r.status() >= 400) fail(`asset ${clean} → ${r.status()}`);
          }
          continue;
        }
        if (!seen.has(clean)) queue.push(clean);
      }
    }
    ok(`${checked} pages crawled, ${seen.size} unique URLs`);
    await ctx.close();
  }

  // 3. Interactions
  console.log("Interactions");
  {
    // Mobile menu + language switch
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/bs/proizvodi", { waitUntil: "load" });
    await page.getByRole("button", { name: "Otvori meni" }).click();
    const dialog = page.getByRole("dialog");
    await dialog.waitFor();
    await dialog.getByRole("link", { name: "EN", exact: true }).click();
    await page.waitForURL("**/en/proizvodi");
    (await page.locator("html").getAttribute("lang")) === "en" ? ok("mobile menu → EN switch keeps page") : fail("language switch failed");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Contact" }).click();
    await page.waitForURL("**/en/kontakt");
    ok("mobile menu navigation");
    await ctx.close();
  }
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + "/bs", { waitUntil: "load" });
    // Mega menu
    await page.getByRole("button", { name: "Proizvodi" }).click();
    await page.locator("#mega-menu").getByRole("link", { name: /Kefir/ }).click();
    await page.waitForURL("**/bs/proizvodi/kategorija/kefir");
    ok("mega menu → category");
    // Showcase tabs
    await page.goto(BASE + "/bs", { waitUntil: "load" });
    await page.getByRole("tab", { name: "Ayran" }).click();
    await page.getByRole("tabpanel").getByText("Ayran 1 kg", { exact: false }).first().waitFor({ timeout: 3000 }).catch(() => {});
    const panelText = await page.getByRole("tabpanel").innerText();
    /Ayran/.test(panelText) ? ok("showcase category switch") : fail("showcase did not switch");
    // Product filters
    await page.goto(BASE + "/bs/proizvodi", { waitUntil: "load" });
    await page.getByRole("button", { name: "Milkland", exact: true }).click();
    await page.waitForTimeout(700);
    const count = await page.locator("main ul li a[href*='/proizvodi/']").count();
    const url = page.url();
    count === 4 && url.includes("brend=milkland") ? ok("brand filter (4 Milkland products, URL synced)") : fail(`brand filter: ${count} cards, url ${url}`);
    await page.getByRole("button", { name: "Kefir", exact: true }).click();
    await page.waitForTimeout(700);
    (await page.getByText("Nema proizvoda za odabrane filtere.").isVisible()) ? ok("empty filter state") : fail("empty state missing");
    // Business form validation + demo submission
    await page.goto(BASE + "/bs/poslovna-saradnja?proizvod=ayran-1kg", { waitUntil: "load" });
    const form = page.locator("#upit form");
    await form.getByRole("button", { name: "Pošaljite upit" }).click();
    const reqErrors = await form.getByText("Obavezno polje").count();
    reqErrors >= 4 ? ok(`form validation (${reqErrors} required-field errors)`) : fail(`form validation errors: ${reqErrors}`);
    (await form.locator("select[name=product]").inputValue()) === "ayran-1kg" ? ok("product prefilled from URL") : fail("product prefill");
    await form.getByLabel("Naziv kompanije").fill("Test d.o.o.");
    await form.getByLabel("Kontakt osoba").fill("Test Osoba");
    await form.getByLabel("E-mail").fill("nije-email");
    await form.getByLabel("Država").fill("Bosna i Hercegovina");
    await form.getByText("HoReCa", { exact: true }).click();
    await form.getByLabel("Poruka").fill("Zanima nas saradnja za HoReCa segment.");
    await form.getByRole("checkbox").check();
    await form.getByRole("button", { name: "Pošaljite upit" }).click();
    (await form.getByText("Unesite ispravnu e-mail adresu").isVisible()) ? ok("email validation") : fail("email validation");
    await form.getByLabel("E-mail").fill("test@example.com");
    await form.getByRole("button", { name: "Pošaljite upit" }).click();
    await page.getByRole("status").waitFor({ timeout: 5000 });
    (await page.getByRole("status").innerText()).includes("demonstracijskom") ? ok("demo submission acknowledged as demo") : fail("submission status");
    // API rejects invalid payloads server-side
    const api = await page.request.post(BASE + "/api/inquiry", { data: { kind: "contact", email: "x" } });
    api.status() === 422 ? ok("API server-side validation (422)") : fail(`API returned ${api.status()}`);
    await ctx.close();
  }
  {
    // Reduced motion: content must be visible without animation
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto(BASE + "/bs", { waitUntil: "load" });
    const visible = await page.getByRole("heading", { level: 1 }).isVisible();
    visible ? ok("prefers-reduced-motion renders content") : fail("reduced motion hides content");
    await ctx.close();
  }

  await browser.close();
  console.log(problems.length ? `\n${problems.length} problem(s) found` : "\nAll checks passed");
  process.exit(problems.length ? 1 : 0);
})();
