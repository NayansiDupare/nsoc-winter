import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/sections/section-heading";
import { cn } from "@/lib/utils";
import { sponsors, sponsorsIntro } from "@/data/sponsors";

const tierStyle: Record<string, string> = {
  "Title Sponsor": "bg-ember text-ember-foreground",
  "Gold Sponsor": "bg-amber-400/20 text-amber-800 dark:text-amber-200",
  "Silver Sponsor": "bg-slate-400/20 text-slate-700 dark:text-slate-200",
};

export function Sponsors() {
  const { cta, ...intro } = sponsorsIntro;

  return (
    <section
      id="sponsors"
      aria-labelledby="sponsors-title"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <SectionHeading id="sponsors-title" {...intro}>
        <a
          href={cta.href}
          className={cn(buttonVariants({ variant: "outline" }), "frost mt-2 h-11 rounded-full px-5")}
        >
          <Mail data-icon="inline-start" />
          {cta.label}
        </a>
      </SectionHeading>

      <Stagger className="mt-14 grid gap-5 md:grid-cols-3">
        {sponsors.map((s) => (
          <StaggerItem key={s.name} className="h-full">
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="frost group flex h-full flex-col rounded-2xl p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none md:p-8"
            >
              <span
                className={cn(
                  "w-fit rounded-full px-3 py-1 text-xs font-semibold",
                  tierStyle[s.tier] ?? "bg-muted",
                )}
              >
                {s.tier}
              </span>
              <div className="mt-6 flex items-center gap-4">
                <Image
                  src={s.logo}
                  alt={`${s.name} logo`}
                  width={Math.round((64 * s.logoSize.width) / s.logoSize.height)}
                  height={64}
                  className="h-16 w-auto rounded-xl bg-white object-contain grayscale transition duration-300 group-hover:grayscale-0"
                />
                <h3 className="text-2xl font-semibold">{s.name}</h3>
              </div>
              <p className="mt-5 flex-1 leading-relaxed text-muted-foreground">{s.description}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Visit Website
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
                <span className="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
