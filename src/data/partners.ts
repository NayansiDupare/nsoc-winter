// Source: nsoc.in home page, captured 2026-10-10.
import type { Partner, SectionIntro } from "@/types/content";
import { site } from "@/data/site";

export const partnersIntro: SectionIntro & { cta: { label: string; href: string } } = {
  eyebrow: "Ecosystem & Grassroots Network",
  title: "Community Partners.",
  description:
    "The active colleges, student clubs, developer hubs, and communities driving enthusiastic participation and innovation across the nation.",
  cta: { label: "Partner With Us", href: `mailto:${site.email}` },
};

export const partners: Partner[] = [
  {
    name: "Indian Society for Technical Education",
    category: "Education Body",
    logo: "/sponsors/indian_society_for_technical_education.webp",
    href: "https://www.linkedin.com/company/indian-society-for-technical-education",
  },
  {
    name: "Microsoft Learn Community GGITS",
    category: "Tech Community",
    logo: "/sponsors/microsoft_learn_ggits.webp",
    href: "https://www.linkedin.com/company/ms-ggits",
  },
  {
    name: "Enginow",
    category: "EdTech Platform",
    logo: "/sponsors/Enginow.webp",
    href: "https://www.enginow.in",
  },
  {
    name: "Oz Lunara",
    category: "Cloud Security",
    logo: "/sponsors/Oz_Lunara.webp",
    href: "https://app.ozlunara.com",
  },
  {
    name: "HackDays",
    category: "Hackathon Community",
    logo: "/sponsors/HackDays.webp",
    href: null,
  },
  {
    name: "Celtrix",
    category: "Open Source CLI",
    logo: "/sponsors/Celtrix.webp",
    href: "https://www.celtrix.tech",
  },
  {
    name: "AlgoZenith",
    category: "Competitive Coding",
    logo: "/sponsors/algozenith.webp",
    href: "https://maang.in",
  },
  {
    name: "Kanpur Ai Space",
    category: "AI & Innovation",
    logo: "/sponsors/KanpurAI.webp",
    href: "https://metaedschool.com",
  },
  {
    name: "Aarambh Network",
    category: "Builder Network",
    logo: "/sponsors/Aarambh_Network.webp",
    href: null,
  },
  {
    name: "WETEAMRK7",
    category: "Developer Hub",
    logo: "/sponsors/WETEAMRK7.webp",
    href: "https://www.linkedin.com/company/weteamrk7/",
  },
  {
    name: "GeeksforGeeks Campus Body – KNU",
    category: "Campus Body",
    logo: "/sponsors/GeeksforGeeks_Campus_Body.webp",
    href: "https://terminal-troops.super.site/",
  },
  {
    name: "SphereX",
    category: "Tech Community",
    logo: "/sponsors/SphereX.webp",
    href: "https://spherexcommunity.vercel.app/",
  },
  {
    name: "Amogha AI",
    category: "AI Solutions",
    logo: "/sponsors/Amogha.webp",
    href: "https://jamun.app/",
  },
  {
    name: "Sotercare",
    category: "HealthTech Partner",
    logo: "/sponsors/Sotercare.webp",
    href: "https://www.linkedin.com/company/sotercare",
  },
  {
    name: "The Event Wallah",
    category: "Event Management",
    logo: "/sponsors/the_event_wallah.webp",
    href: null,
  },
];
