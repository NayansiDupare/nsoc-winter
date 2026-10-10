import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/sections/section-heading";
import { FrostCard } from "@/components/winter/frost-card";
import { aboutIntro, features } from "@/data/about";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <SectionHeading id="about-title" {...aboutIntro} />

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <StaggerItem key={f.title} className="h-full">
            <FrostCard className="group h-full">
              <span className="font-heading text-4xl font-bold text-primary/30 transition-colors group-hover:text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-semibold">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{f.description}</p>
            </FrostCard>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
