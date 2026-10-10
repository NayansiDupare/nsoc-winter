// Source: nsoc.in home page, captured 2026-10-10.
import type { SectionIntro, TimelineItem } from "@/types/content";

export const timelineIntro: SectionIntro = {
  eyebrow: "Program Timeline",
  title: "Here's how we planned.",
  description:
    "Follow the journey from registration to results. Each milestone brings us closer to building something amazing together.",
};

export const timeline: TimelineItem[] = [
  {
    date: "2026-10-01",
    dateLabel: "October 1, 2026",
    title: "Registration Opens",
    description: "Registrations are open on October 1st and anyone can register now to join the program.",
  },
  {
    date: "2026-10-12",
    dateLabel: "October 12, 2026",
    title: "Projects Announced",
    description: "All approved projects are published and available for contributors to explore.",
  },
  {
    date: "2026-10-15",
    dateLabel: "October 15, 2026",
    title: "Contribution Period Begins",
    description: "Contributors start working on their selected projects.",
  },
  {
    date: null,
    dateLabel: "To Be Declared",
    title: "Registrations Close",
    description: "Final deadline for new participant registrations.",
  },
  {
    date: "2026-12-30",
    dateLabel: "December 30, 2026",
    title: "Program Ends",
    description: "Contribution period concludes and final submissions are due.",
  },
  {
    date: "2027-01-15",
    dateLabel: "January 15, 2027",
    title: "Results Announced",
    description: "Winners and top contributors are recognised and results are declared.",
  },
];
