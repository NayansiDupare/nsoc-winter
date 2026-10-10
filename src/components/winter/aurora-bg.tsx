import { cn } from "@/lib/utils";

/** CSS-only aurora glow. Decorative. */
export function AuroraBg({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -top-1/4 -left-1/4 h-[70%] w-[70%] animate-aurora rounded-full bg-aurora-1/50 blur-3xl dark:bg-aurora-1/30" />
      <div className="absolute top-0 -right-1/4 h-[60%] w-[60%] animate-aurora rounded-full bg-aurora-2/45 blur-3xl [animation-delay:-6s] dark:bg-aurora-2/30" />
      <div className="absolute -bottom-1/4 left-1/4 h-[55%] w-[55%] animate-aurora rounded-full bg-aurora-3/40 blur-3xl [animation-delay:-12s] dark:bg-aurora-3/25" />
    </div>
  );
}
