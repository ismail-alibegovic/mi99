import { cn } from "@/lib/site";

/** Small caption telling visitors whether a photo is MI99's own or illustrative. */
export function PhotoTag({ label, className, dark }: { label: string; className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute z-10 rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em]",
        dark ? "bg-forest-950/55 text-cream-50" : "bg-cream-50/85 text-forest-900",
        className ?? "bottom-3 left-3",
      )}
    >
      {label}
    </span>
  );
}
