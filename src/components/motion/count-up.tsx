"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type CountUpProps = { value: number; suffix?: string; className?: string };

/**
 * Renders the final number on the server (so the HTML is never "0"),
 * then counts up from 0 on the client when scrolled into view.
 */
export function CountUp({ value, suffix = "", className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const counter = { n: 0 };
        // Reset before it is seen; the trigger then counts it back up.
        el.textContent = `0${suffix}`;
        gsap.to(counter, {
          n: value,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.n)}${suffix}`;
          },
        });
        return () => {
          el.textContent = `${value}${suffix}`;
        };
      });
      return () => mm.revert();
    },
    { dependencies: [value, suffix] },
  );

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
