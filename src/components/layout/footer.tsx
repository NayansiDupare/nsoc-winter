import { Mail } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { IcicleDivider } from "@/components/winter/icicle-divider";
import { WinterVillage } from "@/components/winter/winter-village";
import { nav, site, socials } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative mt-12 border-t bg-muted/40">
      <IcicleDivider className="absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-16 pb-10 sm:px-6 md:grid-cols-[2fr_1fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <Logo size={44} />
            <div>
              <p className="font-heading text-lg font-semibold">{site.name}</p>
              <p className="text-sm text-muted-foreground">{site.edition.name}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            No toy projects. No filler tasks. Just meaningful work and a community that grows together.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-sm font-semibold">Explore</h2>
          <ul className="mt-3 space-y-1">
            {nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-9 items-center text-sm text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-semibold">Contact</h2>
          <a
            href={`mailto:${site.email}`}
            className="mt-3 inline-flex min-h-9 items-center gap-2 text-sm break-all text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Mail className="size-4 shrink-0" aria-hidden="true" />
            {site.email}
          </a>
          {socials.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${site.short} on ${s.label}`}
                    className="inline-flex min-h-9 items-center rounded-full border px-3 text-sm hover:bg-accent"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:px-8">
          © {site.edition.start.slice(0, 4)} {site.name}. Content from{" "}
          <a
            href={site.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            nsoc.in
          </a>
          .
        </p>
      </div>
      <WinterVillage className="-mt-4" />
    </footer>
  );
}
