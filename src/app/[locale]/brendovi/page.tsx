import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandsSection } from "@/components/home/BrandsSection";
import { Breadcrumbs } from "@/components/layout/PageIntro";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/brendovi">) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return pageMetadata({ locale, path: "/brendovi", title: t("meta.brands"), description: t("meta.description") });
}

export default async function BrandsPage({ params }: PageProps<"/[locale]/brendovi">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <div className="pt-[120px] md:pt-[150px]">
      <div className="container-x">
        <Breadcrumbs items={[{ label: t("nav.brands") }]} />
      </div>
      <BrandsSection />
    </div>
  );
}
