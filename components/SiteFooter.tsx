import Link from "next/link";
import { footer } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-rule px-5 py-9 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="figure-num text-[12px] text-mute">
          © {new Date().getFullYear()} {footer.entity}
        </p>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {footer.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-body transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
