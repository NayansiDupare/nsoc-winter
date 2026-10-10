"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/** Apply the theme class right away so the transition captures the final colours. */
function applyTheme(next: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  root.classList.toggle("light", next === "light");
  root.style.colorScheme = next;
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setTheme(next);
      return;
    }

    // Crossfade the whole page between themes (Chrome, Edge, Safari 18+, Firefox 144+).
    if (document.startViewTransition) {
      const root = document.documentElement;
      // Pause per-element transitions so the page fades as one piece.
      root.classList.add("theme-switching");
      const transition = document.startViewTransition(() => applyTheme(next));
      transition.finished.finally(() => root.classList.remove("theme-switching"));
      setTheme(next);
      return;
    }

    // Fallback: briefly let colours transition instead of snapping.
    const root = document.documentElement;
    root.classList.add("theme-fade");
    applyTheme(next);
    setTheme(next);
    window.setTimeout(() => root.classList.remove("theme-fade"), 600);
  };

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="relative size-11 rounded-full"
      aria-label="Toggle dark mode"
      onClick={toggle}
    >
      {/* Both icons render; CSS picks one, so there is no hydration mismatch. */}
      <Sun className="size-5 scale-100 rotate-0 transition-transform duration-500 dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute size-5 scale-0 rotate-90 transition-transform duration-500 dark:scale-100 dark:rotate-0" />
    </Button>
  );
}
