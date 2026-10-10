// Source: nsoc.in home page, captured 2026-10-10.
import type { NavLink } from "@/types/content";

export const site = {
  name: "Nexus Spring of Code",
  short: "NSoC",
  title: "Nexus Spring of Code | Open Source Contribution Program for Developers",
  description:
    "A 45-day open source program where project maintainers bring real-world projects, and contributors work on solving actual issues, building features, and shipping production-ready code.",
  liveUrl: "https://www.nsoc.in",
  registerUrl: "https://www.nsoc.in/register",
  email: "connect.nsoc@gmail.com",
  edition: {
    name: "Winter Edition",
    // Contribution period on the live timeline: October 15 – December 30, 2026.
    start: "2026-10-15",
    end: "2026-12-30",
    label: "15 Oct – 30 Dec 2026",
  },
} as const;

// In-page anchors for the sections on this page.
// TODO: compare with the live nsoc.in navbar and add any external links it has.
export const nav: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Rewards", href: "#rewards" },
  { label: "Timeline", href: "#timeline" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

// TODO: copy social profiles (Discord, GitHub, LinkedIn, …) from the live nsoc.in footer.
// The footer renders these only when the list is non-empty.
export const socials: { label: string; href: string }[] = [];
