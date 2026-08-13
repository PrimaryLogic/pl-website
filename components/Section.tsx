import type { ReactNode } from "react";

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
      className={`scroll-mt-20 border-t border-rule px-5 py-12 sm:px-10 sm:py-10 lg:py-14 ${className}`}
    >
      <div className="mx-auto max-w-[1180px]">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "loss";
}) {
  return <p className={`label ${tone === "loss" ? "text-loss" : "text-accent"}`}>{children}</p>;
}

export function Heading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2 className={`display mt-4 text-[33px] leading-[1.04] text-ink sm:text-[36px] lg:text-[42px] ${className}`}>
      {children}
    </h2>
  );
}
