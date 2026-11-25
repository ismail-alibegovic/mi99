import Image from "next/image";
import { cn } from "@/lib/site";

/** MI99 corporate mark (migg oval, vectorised from the original website logo). */
export function MiggLogo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/images/brand/migg-logo.svg"
      alt="migg – Mliječna industrija 99"
      width={704}
      height={464}
      priority={priority}
      unoptimized
      className={cn("h-auto", className)}
    />
  );
}

export function Lockup({ inverted, className }: { inverted?: boolean; className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <MiggLogo className="w-[62px] shrink-0" priority />
      <span
        className={cn(
          "hidden flex-col leading-none sm:flex",
          inverted ? "text-cream-50" : "text-forest-900",
        )}
      >
        <span className="font-display text-[1.05rem] font-extrabold tracking-[-0.03em]">MI99</span>
        <span className="mt-1 text-[0.68rem] font-medium tracking-[0.02em] opacity-70">Mliječna industrija 99</span>
      </span>
    </span>
  );
}

const BRAND_MARKS: Record<string, { src: string; w: number; h: number; alt: string }> = {
  natura: { src: "/images/brand/natura-mark.webp", w: 510, h: 412, alt: "Natura" },
  milkland: { src: "/images/brand/milkland-mark.webp", w: 275, h: 185, alt: "Milkland" },
};

/** Brand marks cropped from the original packaging photographs. */
export function BrandMark({ brand, className }: { brand: "natura" | "milkland"; className?: string }) {
  const m = BRAND_MARKS[brand];
  return <Image src={m.src} alt={m.alt} width={m.w} height={m.h} className={cn(className ?? "h-auto")} />;
}
