"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { SnowToggle } from "@/components/winter/snow-toggle";
import { cn } from "@/lib/utils";
import { nav, site } from "@/data/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled ? "border-border/70 bg-background/70 backdrop-blur-lg" : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-xl font-heading text-lg font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Logo size={36} />
          <span aria-hidden="true">{site.short}</span>
          <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary sm:inline">
            {site.edition.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <SnowToggle />
          <ThemeToggle />
          <a
            href="#contact"
            className={cn(buttonVariants(), "ice-sweep ml-1 hidden h-10 rounded-full px-4 sm:inline-flex")}
          >
            Join now!
            <ArrowDown data-icon="inline-end" />
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
