import Link from "next/link";
import { homeNav, type NavContent } from "@/lib/content";

export default function SiteNav({ nav = homeNav }: { nav?: NavContent }) {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/94 px-5 backdrop-blur-lg sm:px-10">
      <div className="mx-auto flex min-h-[58px] max-w-[1180px] items-center justify-between gap-4">
        <Link
          href="/"
          className="display text-[16px] whitespace-nowrap text-ink"
        >
          {nav.wordmark}
        </Link>

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
      </div>
    </header>
  );
}
