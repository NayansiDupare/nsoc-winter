// Source: nsoc.in home page, captured 2026-10-10.
import type { Feature, Role, SectionIntro } from "@/types/content";

export const aboutIntro: SectionIntro = {
  title: "Open source, the way it was meant to be.",
};

export const features: Feature[] = [
  {
    title: "Real projects.",
    description:
      "Project Kernels bring their actual codebases — not dummy repos or toy problems. Every issue you close ships to real users.",
  },
  {
    title: "Structured guidance.",
    description:
      "Admins mentor contributors through the review process. You don't just get a comment — you get context, feedback, and a reason.",
  },
  {
    title: "Earned recognition.",
    description:
      "Points for every merged PR. A public leaderboard. A profile that shows exactly what you built and where it landed.",
  },
  {
    title: "A real community.",
    description:
      "45 days of builders, maintainers, and contributors working in the same direction. The connections outlast the program.",
  },
];

export const roles: Role[] = [
  {
    id: "contributor",
    label: "contributor",
    title: "You write code.",
    points: [
      "Pick a track that matches your stack",
      "Browse curated open issues from real projects",
      "Submit PRs, get reviewed, earn points per merge",
      "Climb the leaderboard, claim prizes",
    ],
  },
  {
    id: "project-kernel",
    label: "project kernel",
    title: "You bring the project.",
    points: [
      "Submit your open source project for the program",
      "Curate issues fit for contributors of all levels",
      "Review PRs and mentor contributors through your codebase",
      "Get meaningful contributions — and give someone their first real merge",
    ],
  },
  {
    id: "campus-ambassador",
    label: "campus ambassador",
    title: "You lead the campus.",
    points: [
      "Represent NSoC as the official face on your campus",
      "Onboard & mentor student peers into open source",
      "Drive registrations, build cohorts, host meetups",
      "Earn exclusive swags, leadership certificates & perks",
    ],
  },
];

export const quote =
  "No toy projects. No filler tasks. Just 45 days of work that lands in production — and a community that levels up together.";
