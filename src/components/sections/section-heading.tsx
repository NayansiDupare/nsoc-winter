import { Snowflake } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";
import type { SectionIntro } from "@/types/content";

type SectionHeadingProps = SectionIntro & {
  id: string;
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
          <Snowflake className="size-3.5" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="text-3xl leading-tight font-bold md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
      )}
      {children}
    </FadeIn>
  );
}
