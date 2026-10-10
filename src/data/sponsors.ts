// Source: nsoc.in home page, captured 2026-10-10.
import type { SectionIntro, Sponsor } from "@/types/content";
import { site } from "@/data/site";

export const sponsorsIntro: SectionIntro & { cta: { label: string; href: string } } = {
  eyebrow: "Track Record & Backing",
  title: "Past Sponsors.",
  description:
    "A look back at the incredible organizations and platforms that powered our previous cohorts with funding, developer tools, and infrastructure.",
  cta: { label: "Sponsor This Season", href: `mailto:${site.email}` },
};

export const sponsors: Sponsor[] = [
  {
    tier: "Title Sponsor",
    name: "Unstop",
    logo: "/sponsors/unstop.webp",
    logoSize: { width: 512, height: 288 },
    description:
      "A leading platform for hosting and managing online competitions, hackathons, and hiring challenges, fostering student talent across tech domains.",
    href: "https://unstop.com/p/open-source-program-nexus-spring-of-code-1661333",
  },
  {
    tier: "Gold Sponsor",
    name: "Arkham Experience",
    logo: "/sponsors/arkham.webp",
    logoSize: { width: 512, height: 512 },
    description:
      "An immersive media-tech company pioneering Gen AI, Agentic AI, Holographics, Spatial Computing, AR/XR, and distributed networks.",
    href: "https://arkhamarchives.net",
  },
  {
    tier: "Silver Sponsor",
    name: "Extension Shield",
    logo: "/sponsors/extensionShield.webp",
    logoSize: { width: 512, height: 512 },
    description:
      "Security-first browser extension management. Protecting developers and organizations from malicious extensions and supply chain risks.",
    href: "https://extensionshield.com",
  },
];
