// Source: nsoc.in home page, captured 2026-10-10.
import type { RewardGroup, SectionIntro } from "@/types/content";

export const rewardsIntro: SectionIntro = {
  eyebrow: "Prizes & Recognition",
  title: "Rewards that feel earned.",
  description:
    "Climb the leaderboard and unlock swag, certificates and recognition. Pick a role to see what each rank takes home.",
};

// TODO: the live site also has a "Project Admins" tab — copy its tiers and add it here.
// The section shows tabs automatically once there is more than one group.
export const rewardGroups: RewardGroup[] = [
  {
    id: "contributors",
    label: "Contributors",
    tiers: [
      {
        rank: 1,
        title: "Rank 1",
        tag: "Top prize",
        rewards: [
          "NSoC T-Shirt",
          "Unstop T-Shirt",
          "NSoC Cap",
          "Diary, Bookmark & Pen",
          "NSoC Hard Copy Certificate",
          ".xyz Domain",
          "Social Media Recognition",
        ],
      },
      {
        rank: 3,
        title: "Top 3",
        rewards: [
          "NSoC T-Shirt",
          "Diary, Bookmark & Pen",
          "NSoC Cap",
          ".xyz Domain",
          "Unstop T-Shirt",
          "NSoC Hard Copy Certificate",
          "Social Media Recognition",
        ],
      },
      {
        rank: 5,
        title: "Top 5",
        rewards: [
          "NSoC T-Shirt",
          "Diary, Bookmark & Pen",
          "NSoC Cap",
          "NSoC Hard Copy Certificate",
          ".xyz Domain",
          "Social Media Recognition",
        ],
      },
      {
        rank: 10,
        title: "Top 10",
        rewards: [
          "Diary, Bookmark & Pen",
          "NSoC Cap",
          "NSoC Hard Copy Certificate",
          ".xyz Domain",
          "NSoC Digital Certificate",
          "Social Media Recognition",
        ],
      },
    ],
  },
];

export const everyoneRewards = {
  title: "Every participant takes home these.",
  label: "All participants",
  items: ["TruScholar Digital Certificate", "NSoC Digital Certificate", "Badge Point Base"],
};
