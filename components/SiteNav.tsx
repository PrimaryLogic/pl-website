import Link from "next/link";
import { nav } from "@/lib/content";

export default function SiteNav() {
  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      <nav className="flex items-center gap-1.5 rounded-full bg-surface/90 p-1.5 pl-4 shadow-pill backdrop-blur-md sm:gap-2 sm:pl-5">
        <Link
          href="/"
          className="display pr-1 text-[15px] font-semibold tracking-[-0.03em] whitespace-nowrap text-accent sm:pr-2 sm:text-[17px]"
        >
          {nav.wordmark}
        </Link>

        {nav.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full bg-accent-soft px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-accent transition-colors hover:bg-accent hover:text-white sm:px-5 sm:text-sm"
          >
            {link.label}
          </Link>
        ))}

        <a
          href={nav.cta.href}
          className="rounded-full bg-ink px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-white transition-opacity hover:opacity-85 sm:px-5 sm:text-sm"
        >
          {nav.cta.label}
        </a>
      </nav>
    </header>
  );
}
