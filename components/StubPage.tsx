import type { ReactNode } from "react";
import Link from "next/link";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

/** Compact shell for privacy, terms, and other utility pages. */
export default function StubPage({
  title,
  activePage,
  effectiveDate,
  effectiveDateTime,
  children,
}: {
  title: string;
  activePage: "privacy" | "terms";
  effectiveDate: string;
  effectiveDateTime: string;
  children: ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SiteNav />
      <main id="main-content" className="scroll-mt-[54px] flex-1 bg-white px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <header className="legal-header">
            <p className="legal-header__eyebrow">Legal</p>
            <h1 className="display mt-3 text-[34px] text-ink sm:text-[44px]">{title}</h1>
            <div className="legal-header__meta">
              <p>
                Effective <time dateTime={effectiveDateTime}>{effectiveDate}</time>
              </p>
              <nav className="legal-header__nav" aria-label="Legal pages">
                <Link href="/privacy-policy" aria-current={activePage === "privacy" ? "page" : undefined}>
                  Privacy
                </Link>
                <Link href="/terms-of-service" aria-current={activePage === "terms" ? "page" : undefined}>
                  Terms
                </Link>
              </nav>
            </div>
          </header>
          <div className="legal-copy">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
