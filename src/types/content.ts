export type NavLink = { label: string; href: string; external?: boolean };

export type Cta = { label: string; href: string; external?: boolean };

export type Feature = { title: string; description: string };

export type Role = { id: string; label: string; title: string; points: string[] };

export type Stat = { value: number; suffix?: string; label: string };

export type Step = { title: string; description: string };

export type RewardTier = {
  rank: number;
  title: string;
  tag?: string;
  rewards: string[];
};

export type RewardGroup = { id: string; label: string; tiers: RewardTier[] };

export type TimelineItem = {
  /** ISO date (YYYY-MM-DD); null when the live site says "To Be Declared". */
  date: string | null;
  dateLabel: string;
  title: string;
  description: string;
};

export type Sponsor = {
  name: string;
  tier: string;
  logo: string;
  /** Intrinsic logo size, for aspect ratio. */
  logoSize: { width: number; height: number };
  description: string;
  href: string;
};

export type Partner = {
  name: string;
  category: string;
  logo: string;
  /** null when the live site has no link ("#"). */
  href: string | null;
};

export type SectionIntro = {
  eyebrow?: string;
  title: string;
  description?: string;
};
