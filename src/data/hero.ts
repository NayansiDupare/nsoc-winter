// Source: nsoc.in home page, captured 2026-10-10.
import type { Cta } from "@/types/content";
import { site } from "@/data/site";

export const hero = {
  eyebrow: "45-Day Open Source Sprint",
  // Live site renders the heading as "Nexus" / "Spring of" / "Code."
  titleLines: ["Nexus", "Spring of", "Code."],
  description:
    "A 45-day open source program where project maintainers bring real-world projects, and contributors work on solving actual issues, building features, and shipping production-ready code. No toy projects. No filler tasks. Just meaningful work and a community that grows together.",
  primaryCta: { label: "Join now!", href: site.registerUrl, external: true } satisfies Cta,
  secondaryCta: { label: "Learn more", href: "#about" } satisfies Cta,
};
