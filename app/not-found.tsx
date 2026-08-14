import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";

export default function NotFound() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SiteNav />
      <main id="main-content" className="flex flex-1 items-center px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto w-full max-w-[760px] text-center">
          <p className="label text-accent">404 · End of trail</p>
          <h1 className="display mt-5 text-[44px] text-ink sm:text-[64px]">This job has no next step.</h1>
          <p className="mx-auto mt-6 max-w-[610px] text-[17px] leading-[1.65] text-body">
            The page may have moved, or the address may be incomplete. Head back to the outcome-agent overview or choose a live lane below.
          </p>
          <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[6px] bg-accent px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-accent-deep"
            >
              Return home
              <ArrowRight aria-hidden="true" size={15} weight="bold" />
            </Link>
            <Link
              href="/healthcare"
              className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-rule-mid bg-white px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:border-ink"
            >
              Healthcare
            </Link>
            <Link
              href="/lending"
              className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-rule-mid bg-white px-6 py-3 text-[14px] font-medium text-ink transition-colors hover:border-ink"
            >
              Lending
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
