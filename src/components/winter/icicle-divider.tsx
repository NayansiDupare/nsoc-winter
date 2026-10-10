import { cn } from "@/lib/utils";

// Icicle lengths across a 1200-wide strip; fixed so server and client match.
const icicles = [
  18, 34, 12, 26, 42, 16, 30, 22, 38, 14, 28, 46, 20, 32, 12, 36, 24, 40, 16, 28, 34, 18, 44, 22,
];

/** Row of icicles hanging from a frosted ledge. Decorative. */
export function IcicleDivider({ className }: { className?: string }) {
  const step = 1200 / icicles.length;
  const path = icicles
    .map((len, i) => {
      const x = i * step;
      return `L${x + step * 0.2} 6 L${x + step * 0.5} ${6 + len} L${x + step * 0.8} 6`;
    })
    .join(" ");

  return (
    <div aria-hidden="true" className={cn("pointer-events-none w-full text-frost", className)}>
      <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="h-8 w-full md:h-12">
        <defs>
          <linearGradient id="icicle-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d={`M0 0 L0 6 ${path} L1200 6 L1200 0 Z`} fill="url(#icicle-fade)" />
      </svg>
    </div>
  );
}
