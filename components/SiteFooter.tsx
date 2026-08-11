import Link from "next/link";
import { footer } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-black/6 px-4 py-10 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[14px] text-faint">
          © {new Date().getFullYear()} {footer.entity}. All rights reserved.
        </p>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
