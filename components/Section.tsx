import type { ReactNode } from "react";

/**
 * Sections are separated by rule weight and vertical rhythm rather than
 * alternating background bands — the banding device belongs to ledger rows,
 * where it actually encodes "scannable data."
 */
export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-20 border-t border-rule px-5 py-12 sm:px-8 sm:py-16 ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="label text-accent">{children}</p>;
}

export function Heading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`display mt-4 text-[28px] text-ink sm:text-[32px] ${className}`}>
      {children}
    </h2>
  );
}
