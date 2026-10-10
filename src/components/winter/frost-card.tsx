import { cn } from "@/lib/utils";

/** Frosted-glass surface with a soft ice highlight on hover. */
export function FrostCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "frost rounded-2xl p-6 transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-primary/40 md:p-8",
        className,
      )}
      {...props}
    />
  );
}
