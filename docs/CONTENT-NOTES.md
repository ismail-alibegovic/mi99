# Content & verification notes for MI99

Everything on the redesigned site comes from mi99.ba (pages, product pages, product specification PDFs and certificates, collected 25 November 2026). This list covers what was changed, left out or labelled, and what MI99 should confirm before launch.

## Must confirm before launch

| Topic | Finding | What the site does now |
|---|---|---|
| **Certificates** | IFS Food certificate expired on **9 May 2019**. Halal certificate expired on **17 Oct 2017**. | Shown only as **archive documents** with their issue and expiry dates. The site does not claim current certification. |
| HACCP / ISO 9001:2015 / ISO 14001 | These logos appear in a banner on mi99.ba, but no certificate documents are published. | Not shown. |
| Company figures | 59 employees, 12 university graduates, 1,500+ partner farmers (from *O nama*; the page gives no date). | Shown on *O nama* with a note that they need updating. |
| UHT shelf life | The *Proizvodi* page says 5–6 months ("competitors barely 4"), while the product specification for 3.5% milk says **120 days**. | The competitor comparison is left out. Shelf life is shown only from the specification (120 days). |
| EU export licence | Claimed on *O nama*; no document is published. | Mentioned as the company's own statement. |
| English & German content | mi99.ba serves the Bosnian text for `?lang=2/4`. | EN/DE translations were written for this proposal and need a native review. |

## Product data corrections

- **Natura Kisela pavlaka 20 % 300 g**: the source page and its PDF repeat the yoghurt nutrition table (2.8 g fat), so the nutrition table is **hidden** and a "being verified" note is shown instead.
- **Natura Jogurt 0,5 % 1 kg**: the EAN `387000214167` has only 12 digits and is not a valid EAN-13, so it is not shown.
- **Natura Trajno mlijeko 0,5 %, Gusti jogurt, Schmand, Grčki jogurt, Ayran, Paprika u pavlaci, Kiselo vrhnje za sir**: no EAN is published, so none is shown.
- **Implausible logistics values are dropped automatically** (`sanitizeLogistics` in `src/data/catalog.ts`):
  - Milkland 2,8 % carton dimensions `170x200x60%`
  - Gusti jogurt bottle height `2910 mm`
  - Grčki jogurt 400 g pallet weight `576/505` (net weight greater than gross)
- **Mlijeko Cafe 3,8 %**: the specification PDF lists the ingredients as "3.5% milk fat" (copied from another product), so ingredients are not shown. Storage and shelf life are shown.
- **Schmand 180 g and 400 g** each appear twice on mi99.ba with two packaging designs. They are merged into one product each, and both pack designs are shown in the gallery.
- **Grčki jogurt and Ayran**: no milk-fat % is printed in the product name. The site shows fat per 100 g from the nutrition table instead.
- **Ingredients, storage and shelf life** are shown only where a specification PDF states them: Natura Kefir 200 g / 300 g, Natura Trajno mlijeko 3,5 %, Mlijeko Cafe (no ingredients), Schmand 400 g. **All other products need MI99 specification data.**

## Imagery

- **Packshots**: the original MI99 photos on mi99.ba are about 370 px wide. They were upscaled ×4 (EDSR super-resolution) and cut out automatically (rembg / ISNet). Packaging, logos and proportions are unchanged. For launch, request the original high-resolution packshots from the packaging agency.
- **Logos**:
  - The migg corporate logo was vectorised from the 176 px website logo (`public/images/brand/migg-logo.svg`).
  - The Natura and Milkland marks were cropped from the packaging photos.
  - Replace all three with the official vector files.
- **Production photos** (`public/images/company/*`) are MI99's own photos from mi99.ba, upscaled. They are labelled "Originalna fotografija MI99". A new professional photo shoot is recommended.
- **Lifestyle, farm and recipe photos** are Unsplash stock (free commercial licence), labelled "Ilustrativna fotografija" on the site. They do not show MI99 farms or partner farmers. The packshots placed on top of them are the real ones.

## New content written for the proposal (not official MI99 content)

- **Recipes** (4): labelled on the site as proposed content.
- **News**: mi99.ba has no published news ("Uskoro opširnije…"). The six archive posts restate facts from official MI99 pages and documents. Dates appear only where a document states one: IFS certificate 24 Apr 2018, Halal certificate 17 Oct 2016, founding year 2015.
- **Privacy policy**: a draft for legal review.
- **Taglines and brand descriptions** (*Prirodno dobro. Od prvog gutljaja.*, Natura/Milkland taglines): proposed copy.

## Forms

The contact and business forms validate input on the client and on the server (`/api/inquiry`). Without `INQUIRY_WEBHOOK_URL` they run in a clearly labelled **demonstration mode**: they validate and acknowledge the enquiry, but forward nothing. Set `INQUIRY_WEBHOOK_URL` to an email/CRM webhook to make them live.
