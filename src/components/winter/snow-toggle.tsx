"use client";

import { Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";

export function SnowToggle() {
  const mounted = useMounted();
  const snowEnabled = useUIStore((s) => s.snowEnabled);
  const toggleSnow = useUIStore((s) => s.toggleSnow);
  // The stored preference is only known after hydration.
  const on = mounted ? snowEnabled : true;

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="size-11 rounded-full"
      aria-label={on ? "Turn snowfall off" : "Turn snowfall on"}
      aria-pressed={on}
      onClick={toggleSnow}
    >
      <Snowflake
        className={cn(
          "size-5 transition-all duration-500",
          on ? "rotate-0 text-primary" : "rotate-90 opacity-50",
        )}
      />
    </Button>
  );
}
