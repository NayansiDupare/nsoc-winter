"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { originOf, snowBurst } from "@/lib/confetti";
import { cn } from "@/lib/utils";
import { hero } from "@/data/hero";

export function HeroCtas() {
  const { primaryCta, secondaryCta } = hero;

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a
        href={primaryCta.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => snowBurst(originOf(e.currentTarget))}
        className={cn(
          buttonVariants({ size: "lg" }),
          "ice-sweep h-12 rounded-full bg-ember px-7 text-base text-ember-foreground shadow-[0_10px_30px_-10px_var(--ember)] hover:bg-ember/90",
        )}
      >
        {primaryCta.label}
        <ArrowUpRight data-icon="inline-end" />
      </a>
      <a
        href={secondaryCta.href}
        className={cn(
          buttonVariants({ variant: "outline", size: "lg" }),
          "frost h-12 rounded-full px-7 text-base",
        )}
      >
        {secondaryCta.label}
        <ArrowDown data-icon="inline-end" />
      </a>
    </div>
  );
}
