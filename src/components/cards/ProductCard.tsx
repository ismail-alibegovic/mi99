import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { PackImage } from "@/data/catalog";
import { cn } from "@/lib/site";

export interface ProductCardData {
  slug: string;
  href: string;
  title: string;
  brand: string;
  brandId: string;
  category: string;
  categoryId: string;
  size: string;
  fat: string | null;
  tone: string;
  accent: string;
  image: PackImage;
}

/** Shared presentational card – usable from server and client components. */
export function ProductCard({ p, className, priority }: { p: ProductCardData; className?: string; priority?: boolean }) {
  return (
    <Link href={p.href} className={cn("group flex flex-col", className)}>
      <span className="relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[24px] transition-[border-radius] duration-700 ease-out-soft group-hover:rounded-[60px_24px_24px_24px]" style={{ backgroundColor: p.tone }}>
        <span aria-hidden className="absolute inset-x-[14%] bottom-[7%] h-[5%] rounded-[50%] bg-forest-950/15 blur-md" />
        <Image
          src={p.image.src}
          alt={p.title}
          width={p.image.width}
          height={p.image.height}
          sizes="(min-width: 1280px) 20vw, (min-width: 768px) 30vw, 46vw"
          priority={priority}
          className="packshot-shadow relative mb-[9%] max-h-[76%] w-auto max-w-[72%] object-contain transition-transform duration-700 ease-out-soft group-hover:-translate-y-2 group-hover:scale-[1.03]"
        />
      </span>
      <span className="mt-4 text-[0.7rem] font-bold uppercase tracking-[0.14em]" style={{ color: p.accent }}>
        {p.brand} · {p.category}
      </span>
      <span className="mt-1 font-display text-[1.08rem] font-bold leading-snug tracking-[-0.02em] text-forest-950 group-hover:underline">
        {p.title}
      </span>
      <span className="mt-0.5 text-[0.88rem] text-ink-500">
        {p.size}
        {p.fat && <> · {p.fat}</>}
      </span>
    </Link>
  );
}
