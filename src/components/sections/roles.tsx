import { Code2, FolderGit2, GraduationCap, Quote, Snowflake } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { FrostCard } from "@/components/winter/frost-card";
import { quote, roles } from "@/data/about";

const icons = {
  contributor: Code2,
  "project-kernel": FolderGit2,
  "campus-ambassador": GraduationCap,
} as const;

export function Roles() {
  return (
    <section aria-labelledby="roles-title" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 md:pb-28 lg:px-8">
      <h2 id="roles-title" className="sr-only">
        Ways to take part
      </h2>

      <Stagger className="grid gap-5 lg:grid-cols-3">
        {roles.map((role) => {
          const Icon = icons[role.id as keyof typeof icons] ?? Snowflake;
          return (
            <StaggerItem key={role.id} className="h-full">
              <FrostCard className="h-full">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                    {role.label}
                  </p>
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{role.title}</h3>
                <ul className="mt-5 space-y-3">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-relaxed text-muted-foreground">
                      <Snowflake className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </FrostCard>
            </StaggerItem>
          );
        })}
      </Stagger>

      <FadeIn>
        <figure className="relative mx-auto mt-16 max-w-4xl text-center md:mt-24">
          <Quote className="mx-auto size-10 text-primary/40" aria-hidden="true" />
          <blockquote className="mt-4 font-heading text-2xl leading-snug font-medium text-balance md:text-4xl">
            “{quote}”
          </blockquote>
        </figure>
      </FadeIn>
    </section>
  );
}
