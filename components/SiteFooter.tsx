import Link from "next/link";
import { footer } from "@/lib/content";

export default function SiteFooter({ variant = "default" }: { variant?: "default" | "landing" }) {
  const landing = variant === "landing";
  return (
    <footer className={landing ? "mt-auto bg-white px-5 pb-10 sm:px-10" : "mt-auto border-t border-rule bg-white px-5 py-6 sm:px-10"}>
      <div className={`mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${landing ? "max-w-[980px] border-t border-rule pt-6" : "max-w-[1180px]"}`}>
        <p className={`display text-ink ${landing ? "text-[16px]" : "text-[14px]"}`}>{footer.entity}</p>
        <div className={landing ? "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7" : "flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-8"}>
          <p className="figure-num text-[11px] whitespace-nowrap text-mute">© {new Date().getFullYear()} {footer.entity}</p>
          <nav className={`flex flex-wrap gap-x-6 gap-y-1 sm:gap-x-7 ${landing ? "items-center" : ""}`}>
            {footer.links.map((link) =>
              link.href.startsWith("/") ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-[12px] text-body transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-10 items-center text-[12px] text-body transition-colors hover:text-accent"
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
