import Link from "next/link";
import { Snowflake } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AuroraBg } from "@/components/winter/aurora-bg";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70svh] items-center justify-center overflow-hidden px-4 text-center">
      <AuroraBg />
      <div className="relative">
        <Snowflake className="mx-auto size-12 text-primary" aria-hidden="true" />
        <h1 className="mt-6 text-5xl font-bold md:text-7xl">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">This page is lost in the snow.</p>
        <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8 h-12 rounded-full px-6")}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
