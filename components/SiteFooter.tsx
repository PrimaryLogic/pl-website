import Link from "next/link";
import { footer } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule px-5 py-8 sm:px-8">
      <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="display text-[17px] text-ink">{footer.entity}</p>
          <p className="mt-1 text-[13px] text-mute">{footer.statement}</p>
          <p className="figure-num mt-4 text-[11px] text-mute">© {new Date().getFullYear()} {footer.entity}</p>
        </div>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-h-11 items-center text-[13px] text-body transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
