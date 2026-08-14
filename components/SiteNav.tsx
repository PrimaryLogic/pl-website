import Link from "next/link";
import { homeNav, type NavContent } from "@/lib/content";

export default function SiteNav({
  nav = homeNav,
  variant = "default",
}: {
  nav?: NavContent;
  variant?: "default" | "landing";
}) {
  const landing = variant === "landing";

  return (
    <header className={landing ? "sticky top-0 z-50 border-b border-rule bg-white/94 backdrop-blur-lg" : "sticky top-0 z-50 border-b border-rule bg-paper/94 px-5 backdrop-blur-lg sm:px-10"}>
      <div className={`mx-auto flex max-w-[1392px] items-center justify-between gap-4 ${landing ? "min-h-[72px] px-4 sm:min-h-[80px] sm:px-6" : "min-h-[54px]"}`}>
        <Link
          href="/"
          className={`display inline-flex items-center whitespace-nowrap text-ink ${landing ? "text-[18px] sm:text-[20px]" : "text-[15px]"}`}
        >
          {nav.wordmark}
        </Link>

        {landing ? (
          <div className="flex items-center gap-7">
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Page navigation">
              {nav.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link key={link.href} href={link.href} className="text-[11.5px] font-medium text-body transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.href} href={link.href} className="text-[11.5px] font-medium text-body transition-colors hover:text-accent">
                    {link.label}
                  </a>
                ),
              )}
            </nav>
            <a
              href={nav.cta.href}
              data-analytics="nav-contact"
              className="inline-flex min-h-10 items-center rounded-[6px] bg-accent px-4 py-2 text-[12px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5 sm:text-[12.5px]"
            >
              {nav.cta.label}
            </a>
          </div>
        ) : (
          <div className="flex items-center gap-5 sm:gap-8">
            <nav className="hidden items-center gap-7 md:flex lg:gap-10">
              {nav.links.map((link) =>
                link.href.startsWith("/") ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[12px] text-ink transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-[12px] text-ink transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </nav>

            <a
              href={nav.cta.href}
              data-analytics="nav-cta"
              className="inline-flex min-h-9 items-center rounded-[5px] bg-accent px-5 py-2 text-[12px] font-semibold whitespace-nowrap text-white transition-colors hover:bg-accent-deep"
            >
              {nav.cta.label}
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
