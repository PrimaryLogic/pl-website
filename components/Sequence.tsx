import { Eyebrow, Heading, Section } from "./Section";
import { sequence } from "@/lib/content";

export default function Sequence() {
  return (
    <Section id="sequence">
      <div className="max-w-2xl">
        <Eyebrow>{sequence.eyebrow}</Eyebrow>
        <Heading>{sequence.heading}</Heading>
        <p className="mt-6 text-[16px] leading-[1.7] text-body">
          {sequence.description}
        </p>
      </div>

      {/* Numbered because this genuinely is a sequence — each step depends on
          the one before it, and the elapsed-time column carries that. */}
      <ol className="mt-14 grid gap-px border border-rule-mid bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {sequence.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col bg-card p-6">
            <div className="flex items-baseline justify-between gap-3">
              <span className="figure-num text-[13px] font-medium text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="figure-num text-[12px] text-mute">{step.at}</span>
            </div>
            <h3 className="display mt-5 text-[18px] text-ink">{step.title}</h3>
            <p className="mt-2.5 text-[14px] leading-[1.65] text-body">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
