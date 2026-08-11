import Link from "next/link";
import { nav } from "@/lib/content";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          className="display text-[17px] whitespace-nowrap text-ink sm:text-[18px]"
        >
          Primary<span className="text-accent">·</span>Logic
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <nav className="hidden items-center gap-6 sm:flex">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] text-body transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={nav.cta.href}
            className="rounded-sm bg-ink px-4 py-2 text-[14px] font-medium whitespace-nowrap text-paper transition-colors hover:bg-accent-deep"
          >
            {nav.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
