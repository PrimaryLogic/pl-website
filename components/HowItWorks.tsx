import { Eyebrow, Heading, Section } from "./Section";
import { howItWorks } from "@/lib/content";

export default function HowItWorks() {
  return (
    <Section>
      <div className="max-w-3xl">
        <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
        <Heading>{howItWorks.heading}</Heading>
        <p className="display mt-4 text-[22px] text-muted sm:text-[26px]">
          {howItWorks.subheading}
        </p>
        <p className="mt-6 text-[17px] leading-[1.75] text-muted">
          {howItWorks.description}
        </p>
      </div>

      <ol className="mt-14 grid gap-px overflow-hidden rounded-panel bg-bg shadow-card sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.steps.map((step, i) => (
          <li key={step.title} className="bg-surface p-7">
            <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft font-mono text-[13px] font-medium text-accent">
              {i + 1}
            </span>
            <h3 className="display mt-5 text-lg text-ink">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.7] text-muted">{step.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {howItWorks.differentiators.map((d) => (
          <div key={d.title} className="border-t-2 border-ink pt-5">
            <h4 className="font-medium text-ink">{d.title}</h4>
            <p className="mt-2 text-[15px] leading-[1.7] text-muted">{d.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
