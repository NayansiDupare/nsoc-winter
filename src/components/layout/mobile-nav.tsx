"use client";

import { ArrowDown, Menu, Snowflake } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui-store";
import { nav, site } from "@/data/site";

export function MobileNav() {
  const open = useUIStore((s) => s.mobileNavOpen);
  const setOpen = useUIStore((s) => s.setMobileNavOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            className="size-11 rounded-full md:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="frost w-[85%] max-w-sm bg-popover/90">
        <SheetHeader className="border-b p-5">
          <SheetTitle className="flex items-center gap-2.5 text-lg">
            <Logo size={32} />
            {site.short} · {site.edition.name}
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile" className="px-3">
          <ul className="flex flex-col">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center gap-3 rounded-xl px-3 text-base font-medium transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <Snowflake className="size-4 text-primary" aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-5">
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants(), "h-12 w-full rounded-full text-base")}
          >
            Join now!
            <ArrowDown data-icon="inline-end" />
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
