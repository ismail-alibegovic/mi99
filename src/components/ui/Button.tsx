import { ArrowRight, ArrowDownToLine } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/site";

type Variant = "primary" | "light" | "outline" | "outline-light" | "text";

const styles: Record<Variant, string> = {
  primary: "bg-forest-900 text-cream-50 hover:bg-forest-800",
  light: "bg-cream-50 text-forest-900 hover:bg-white",
  outline: "border border-forest-900/25 text-forest-900 hover:border-forest-900 hover:bg-forest-900 hover:text-cream-50",
  "outline-light": "border border-cream-50/35 text-cream-50 hover:border-cream-50 hover:bg-cream-50 hover:text-forest-900",
  text: "text-forest-900 px-0! py-0! h-auto!",
};

const base =
  "group inline-flex h-12 items-center justify-center gap-3 rounded-full px-6 text-[0.95rem] font-semibold tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98] font-display whitespace-nowrap";

function Icon({ download }: { download?: boolean }) {
  const I = download ? ArrowDownToLine : ArrowRight;
  return (
    <span className="relative flex size-5 items-center justify-center overflow-hidden" aria-hidden>
      <I className="size-4 transition-transform duration-500 ease-out-soft group-hover:translate-x-5" />
      <I className="absolute size-4 -translate-x-5 transition-transform duration-500 ease-out-soft group-hover:translate-x-0" />
    </span>
  );
}

interface Common {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  icon?: boolean;
  download?: boolean;
}

export function ButtonLink({
  variant = "primary",
  children,
  className,
  icon = true,
  download,
  ...props
}: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={cn(base, styles[variant], className)} {...props}>
      {children}
      {icon && <Icon download={download} />}
    </Link>
  );
}

export function ButtonA({
  variant = "primary",
  children,
  className,
  icon = true,
  download,
  ...props
}: Common & ComponentProps<"a">) {
  return (
    <a className={cn(base, styles[variant], className)} {...props}>
      {children}
      {icon && <Icon download={download} />}
    </a>
  );
}

export function Button({
  variant = "primary",
  children,
  className,
  icon = true,
  ...props
}: Common & ComponentProps<"button">) {
  return (
    <button className={cn(base, styles[variant], "disabled:opacity-60", className)} {...props}>
      {children}
      {icon && <Icon />}
    </button>
  );
}
