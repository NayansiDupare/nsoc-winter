import { cn } from "@/lib/utils";

// Radial gradients give the same soft glow as a big blur filter, but the browser
// only has to move them (transform), never re-blur them, so the drift stays cheap.
const blob = "absolute rounded-full animate-aurora will-change-transform";

/** CSS-only aurora glow. Decorative. */
export function AuroraBg({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div
        className={cn(blob, "-top-1/4 -left-1/4 h-[80%] w-[80%] opacity-60 dark:opacity-40")}
        style={{ background: "radial-gradient(closest-side, var(--aurora-1), transparent)" }}
      />
      <div
        className={cn(blob, "top-0 -right-1/4 h-[70%] w-[70%] opacity-55 [animation-delay:-6s] dark:opacity-40")}
        style={{ background: "radial-gradient(closest-side, var(--aurora-2), transparent)" }}
      />
      <div
        className={cn(blob, "-bottom-1/4 left-1/4 h-[65%] w-[65%] opacity-50 [animation-delay:-12s] dark:opacity-35")}
        style={{ background: "radial-gradient(closest-side, var(--aurora-3), transparent)" }}
      />
    </div>
  );
}
