import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";

/** NSoC mark that swaps artwork with the theme (CSS only, no flash). */
export function Logo({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <span
      className={cn("relative inline-block shrink-0 overflow-hidden rounded-xl", className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo_light.png"
        alt=""
        width={size}
        height={size}
        sizes={`${size}px`}
        priority
        className="dark:hidden"
      />
      <Image
        src="/logo_dark.png"
        alt=""
        width={size}
        height={size}
        sizes={`${size}px`}
        priority
        className="hidden dark:block"
      />
      <span className="sr-only">{site.short}</span>
    </span>
  );
}
