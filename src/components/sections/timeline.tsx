import { SectionHeading } from "@/components/sections/section-heading";
import { TimelineTrack } from "@/components/sections/timeline-track";
import { timeline, timelineIntro } from "@/data/timeline";

export function Timeline() {
  return (
    <section
      id="timeline"
      aria-labelledby="timeline-title"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <SectionHeading id="timeline-title" {...timelineIntro} />
      <TimelineTrack items={timeline} />
    </section>
  );
}
