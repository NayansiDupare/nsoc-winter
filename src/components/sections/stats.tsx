import { CountUp } from "@/components/motion/count-up";
import { AuroraBg } from "@/components/winter/aurora-bg";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="px-4 sm:px-6 lg:px-8">
      <h2 id="stats-title" className="sr-only">
        Program at a glance
      </h2>
      <div className="frost relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <AuroraBg className="opacity-60" />
        <dl className="relative grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-2 px-6 py-10 text-center md:py-14">
              <dt className="order-2 text-sm font-medium tracking-wide text-muted-foreground uppercase">
                {s.label}
              </dt>
              <dd className="order-1 font-heading text-6xl font-bold tabular-nums md:text-7xl">
                <CountUp value={s.value} suffix={s.suffix} className="text-ice animate-breathe" />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
