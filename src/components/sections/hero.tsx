import { CalendarDays, Snowflake } from "lucide-react";
import { HeroCtas } from "@/components/sections/hero-ctas";
import { AuroraBg } from "@/components/winter/aurora-bg";
import { hero } from "@/data/hero";
import { site } from "@/data/site";

// Entrance uses CSS (tw-animate-css) so the headline paints before hydration.
const enter = "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative -mt-20 overflow-hidden pt-20">
      <AuroraBg />
      {/* Fade into the page so the aurora doesn't end in a hard edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-background"
      />

      <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className={`${enter} flex flex-wrap items-center justify-center gap-2`}>
          <span className="frost inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
            <Snowflake className="size-4 text-primary" aria-hidden="true" />
            {hero.eyebrow}
          </span>
          <span className="frost inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium">
            <CalendarDays className="size-4 text-primary" aria-hidden="true" />
            {site.edition.name} · {site.edition.label}
          </span>
        </div>

        <h1
          id="hero-title"
          className="mt-8 text-5xl leading-[0.95] font-bold sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {hero.titleLines.map((line, i) => (
            <span
              key={line}
              className={`${enter} block ${i === 1 ? "text-ice" : ""}`}
              style={{ animationDelay: `${120 + i * 120}ms` }}
            >
              {line}{" "}
            </span>
          ))}
        </h1>

        <p
          className={`${enter} mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg`}
          style={{ animationDelay: "500ms" }}
        >
          {hero.description}
        </p>

        <div className={`${enter} mt-10`} style={{ animationDelay: "650ms" }}>
          <HeroCtas />
        </div>
      </div>
    </section>
  );
}
