import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/sections/section-heading";
import { steps, stepsIntro } from "@/data/steps";

export function Steps() {
  return (
    <section aria-labelledby="steps-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <SectionHeading id="steps-title" {...stepsIntro} />

      <Stagger className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {/* Frost line linking the steps on large screens */}
        <div
          aria-hidden="true"
          className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-linear-to-r from-transparent via-primary/40 to-transparent lg:block"
        />
        {steps.map((step, i) => (
          <StaggerItem key={step.title} className="relative flex flex-col items-center text-center">
            <span className="frost relative flex size-14 items-center justify-center rounded-2xl font-heading text-lg font-bold text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
            <p className="mt-2 max-w-xs leading-relaxed text-muted-foreground">{step.description}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
