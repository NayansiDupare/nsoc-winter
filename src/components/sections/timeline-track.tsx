"use client";

import { useRef, useSyncExternalStore } from "react";
import { CalendarDays, Check, Snowflake } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/types/content";

type Status = "completed" | "active" | "upcoming";

// Today's date (YYYY-MM-DD, local time) — only read on the client so the
// prerendered HTML never bakes in a stale status.
const subscribe = () => () => {};
const getToday = () => new Date().toLocaleDateString("en-CA");
const getServerToday = () => null;

function statusesFor(items: TimelineItem[], today: string | null): (Status | null)[] {
  if (!today) return items.map(() => null);
  const dated = items.filter((i) => i.date);
  // The latest milestone already reached is "active"; earlier ones are done.
  const reached = dated.filter((i) => i.date! <= today);
  const current = reached.at(-1);
  return items.map((item) => {
    if (!item.date) return null;
    if (item.date > today) return "upcoming";
    return item === current && item !== dated.at(-1) ? "active" : "completed";
  });
}

const statusStyle: Record<Status, { label: string; className: string }> = {
  completed: { label: "Completed", className: "bg-muted text-muted-foreground" },
  active: { label: "Now", className: "bg-ember text-ember-foreground" },
  upcoming: { label: "Upcoming", className: "bg-primary/10 text-primary" },
};

export function TimelineTrack({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const today = useSyncExternalStore(subscribe, getToday, getServerToday);
  const statuses = statusesFor(items, today);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-timeline-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-timeline-item]").forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 28,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative mt-14">
      {/* Track + the frost line that draws as you scroll */}
      <div aria-hidden="true" className="absolute top-2 bottom-2 left-5 w-px bg-border md:left-1/2">
        <div
          data-timeline-line
          className="h-full w-full origin-top bg-linear-to-b from-primary via-aurora-2 to-aurora-1"
        />
      </div>
      <ol className="relative space-y-8 md:space-y-12">
        {items.map((item, i) => {
          const status = statuses[i];
          const left = i % 2 === 0;
          return (
            <li
              key={item.title}
              data-timeline-item
              className={cn(
                "relative pl-14 md:w-1/2 md:pl-0",
                left ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-5 left-5 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background",
                  status === "completed" ? "bg-primary text-primary-foreground" : "frost text-primary",
                  status === "active" && "ring-4 ring-ember/40",
                  left ? "md:right-0 md:left-auto md:translate-x-1/2" : "md:left-0",
                )}
              >
                {status === "completed" ? <Check className="size-4" /> : <Snowflake className="size-4" />}
              </span>

              <div className="frost rounded-2xl p-5 md:p-6">
                <div className={cn("flex flex-wrap items-center gap-2", left && "md:justify-end")}>
                  <p className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    <CalendarDays className="size-4" aria-hidden="true" />
                    {item.date ? <time dateTime={item.date}>{item.dateLabel}</time> : item.dateLabel}
                  </p>
                  {status && (
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        statusStyle[status].className,
                      )}
                    >
                      {statusStyle[status].label}
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{item.description}</p>
                <p className="mt-3 text-xs text-muted-foreground/80">
                  Step {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
