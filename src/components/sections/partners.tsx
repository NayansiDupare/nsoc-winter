import Image from "next/image";
import { Handshake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { cn } from "@/lib/utils";
import { partners, partnersIntro } from "@/data/partners";
import type { Partner } from "@/types/content";

function PartnerCard({ partner, hidden }: { partner: Partner; hidden?: boolean }) {
  const body = (
    <>
      <Image
        src={partner.logo}
        alt={hidden ? "" : `${partner.name} logo`}
        width={56}
        height={56}
        sizes="56px"
        className="size-14 shrink-0 rounded-xl bg-white object-contain grayscale transition duration-300 group-hover:grayscale-0"
      />
      <div className="min-w-0">
        <h3 className="font-heading text-base leading-snug font-semibold">{partner.name}</h3>
        <p className="text-sm text-muted-foreground">{partner.category}</p>
      </div>
    </>
  );

  const className =
    "frost group flex h-full w-72 items-center gap-4 rounded-2xl p-4 transition-colors duration-300 hover:border-primary/40";

  // Partners without a link on the live site render as plain cards, not dead links.
  if (!partner.href) return <div className={className}>{body}</div>;

  return (
    <a
      href={partner.href}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={hidden ? -1 : undefined}
      className={cn(className, "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none")}
    >
      {body}
    </a>
  );
}

export function Partners() {
  const { cta, ...intro } = partnersIntro;

  return (
    <section id="partners" aria-labelledby="partners-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="partners-title" {...intro}>
          <a
            href={cta.href}
            className={cn(buttonVariants({ variant: "outline" }), "frost mt-2 h-11 rounded-full px-5")}
          >
            <Handshake data-icon="inline-start" />
            {cta.label}
          </a>
        </SectionHeading>
      </div>

      {/* Infinite marquee; pauses on hover/focus, becomes a static grid with reduced motion */}
      <div className="group/marquee relative mt-14 overflow-hidden mask-x-from-90% mask-x-to-100% motion-reduce:mask-none">
        <div className="flex w-max animate-marquee py-2 [--marquee-duration:70s] group-focus-within/marquee:[animation-play-state:paused] group-hover/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-4 motion-reduce:px-4">
          <ul className="flex gap-4 pr-4 motion-reduce:contents">
            {partners.map((p) => (
              <li key={p.name}>
                <PartnerCard partner={p} />
              </li>
            ))}
          </ul>
          <ul aria-hidden="true" className="flex gap-4 pr-4 motion-reduce:hidden">
            {partners.map((p) => (
              <li key={p.name}>
                <PartnerCard partner={p} hidden />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
