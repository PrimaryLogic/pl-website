import type { ReactNode } from "react";
import SiteNav from "./SiteNav";
import SiteFooter from "./SiteFooter";

/** Placeholder shell so footer links resolve instead of 404ing. */
export default function StubPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className="flex-1 px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <h1 className="display text-[36px] text-ink sm:text-[46px]">{title}</h1>
          <div className="mt-6 text-[17px] leading-[1.75] text-muted">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
