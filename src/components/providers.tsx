"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {/* "user" turns Motion transforms off when the OS asks for reduced motion. */}
      <MotionConfig reducedMotion="user">
        <TooltipProvider>{children}</TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
