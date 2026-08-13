import Link from "next/link";
import { footer } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule bg-white px-5 py-4 sm:px-10">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="display text-[14px] text-ink">{footer.entity}</p>
        <div className="flex items-center gap-8">
          <p className="figure-num text-[10px] text-mute">© {new Date().getFullYear()} {footer.entity}</p>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {footer.links.map((link) =>
            link.href.startsWith("/") ? (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-8 items-center text-[11px] text-body transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-8 items-center text-[11px] text-body transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
        </div>
      </div>
    </footer>
  );
}
