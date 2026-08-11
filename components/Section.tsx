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
      className={`border-t border-rule px-5 py-20 sm:px-8 sm:py-28 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
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
    <h2 className={`display mt-5 text-[30px] text-ink sm:text-[40px] ${className}`}>
      {children}
    </h2>
  );
}
