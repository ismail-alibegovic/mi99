import Image from "next/image";
import type { PackImage } from "@/data/catalog";
import { cn } from "@/lib/site";

/**
 * Transparent product cut-out with a natural contact shadow.
 * Height-driven so mixed pack shapes line up on a common baseline.
 */
export function Packshot({
  image,
  alt,
  className,
  sizes = "(min-width: 1024px) 22vw, 45vw",
  priority,
  shadow = true,
}: {
  image: PackImage;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  shadow?: boolean;
}) {
  return (
    <span className={cn("relative inline-flex flex-col items-center", className)}>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        priority={priority}
        className="packshot-shadow relative z-[1] h-full w-auto max-w-none object-contain"
      />
      {shadow && (
        <span aria-hidden className="contact-shadow absolute -bottom-[3%] left-1/2 h-[7%] w-[105%] -translate-x-1/2" />
      )}
    </span>
  );
}
