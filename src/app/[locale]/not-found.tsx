import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="container-x grid min-h-[80vh] items-center gap-10 pb-20 pt-36 md:grid-cols-[1.2fr_1fr]">
      <div>
        <p className="eyebrow text-meadow-500">404</p>
        <h1 className="display-lg mt-4 text-forest-900">{t("title")}</h1>
        <p className="lead mt-5 max-w-md text-ink-700">{t("text")}</p>
        <ButtonLink href="/" className="mt-8">
          {t("cta")}
        </ButtonLink>
      </div>
      <div className="relative mx-auto h-[420px] w-full max-w-sm">
        <Image
          src="/images/photos/milk-glass-white.webp"
          alt=""
          fill
          sizes="(min-width: 768px) 30vw, 90vw"
          className="rounded-[999px_999px_28px_28px] object-cover"
        />
      </div>
    </section>
  );
}
