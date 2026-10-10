import { Award, Crown, Snowflake } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { SectionHeading } from "@/components/sections/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FrostCard } from "@/components/winter/frost-card";
import { cn } from "@/lib/utils";
import { everyoneRewards, rewardGroups, rewardsIntro } from "@/data/rewards";
import type { RewardTier } from "@/types/content";

function TierCard({ tier }: { tier: RewardTier }) {
  const top = tier.rank === 1;
  return (
    <FrostCard
      className={cn(
        "relative h-full",
        top && "border-ember/50 shadow-[0_12px_40px_-16px_var(--ember)] dark:border-ember/40",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={cn(
            "font-heading text-6xl leading-none font-bold tabular-nums",
            top ? "text-ember" : "text-primary/35",
          )}
          aria-hidden="true"
        >
          {tier.rank}
        </span>
        {tier.tag && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ember px-3 py-1 text-xs font-semibold text-ember-foreground">
            <Crown className="size-3.5" aria-hidden="true" />
            {tier.tag}
          </span>
        )}
      </div>
      <h3 className="mt-5 text-xl font-semibold">{tier.title}</h3>
      <p className="text-sm text-muted-foreground">{String(tier.rewards.length).padStart(2, "0")} rewards</p>
      <ul className="mt-5 space-y-2.5">
        {tier.rewards.map((reward) => (
          <li key={reward} className="flex gap-2.5 text-sm leading-relaxed">
            <Snowflake className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {reward}
          </li>
        ))}
      </ul>
    </FrostCard>
  );
}

function TierGrid({ tiers }: { tiers: RewardTier[] }) {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {tiers.map((tier) => (
        <StaggerItem key={tier.rank} className="h-full">
          <TierCard tier={tier} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function Rewards() {
  const [first] = rewardGroups;

  return (
    <section
      id="rewards"
      aria-labelledby="rewards-title"
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8"
    >
      <SectionHeading id="rewards-title" {...rewardsIntro} />

      <div className="mt-12">
        {rewardGroups.length > 1 ? (
          <Tabs defaultValue={first.id} className="items-center gap-8">
            <TabsList className="frost h-11! rounded-full p-1">
              {rewardGroups.map((g) => (
                <TabsTrigger key={g.id} value={g.id} className="rounded-full px-5">
                  {g.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {rewardGroups.map((g) => (
              <TabsContent key={g.id} value={g.id} className="w-full">
                <TierGrid tiers={g.tiers} />
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <>
            <p className="mb-8 text-center text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              {first.label}
            </p>
            <TierGrid tiers={first.tiers} />
          </>
        )}
      </div>

      <FadeIn className="mt-14">
        <div className="frost rounded-3xl p-6 md:p-10">
          <h3 className="text-center text-2xl font-semibold md:text-3xl">{everyoneRewards.title}</h3>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {everyoneRewards.items.map((item) => (
              <li key={item} className="flex items-center gap-4 rounded-2xl border bg-background/50 p-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{everyoneRewards.label}</p>
                  <p className="font-semibold">{item}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}
