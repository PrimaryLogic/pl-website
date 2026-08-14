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
      className={`scroll-mt-20 border-t border-rule px-5 py-10 sm:px-10 sm:py-9 lg:py-12 ${className}`}
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
    <h2 className={`display mt-3.5 text-[27px] leading-[1.06] text-ink sm:text-[30px] lg:text-[34px] ${className}`}>
      {children}
    </h2>
  );
}
