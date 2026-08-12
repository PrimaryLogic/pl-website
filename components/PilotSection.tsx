import { pilot } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

export default function PilotSection() {
  return (
    <Section className="content-auto">
      <div className="max-w-3xl">
        <Eyebrow>{pilot.eyebrow}</Eyebrow>
        <Heading>{pilot.heading}</Heading>
        <p className="mt-4 text-[15px] leading-[1.6] text-body">{pilot.intro}</p>
      </div>

      <dl className="mt-8 grid gap-px border border-rule-mid bg-rule sm:grid-cols-2 lg:grid-cols-5">
        {pilot.metrics.map((metric, index) => (
          <div key={metric.label} className="flex min-h-36 flex-col bg-card p-5">
            <div className="flex items-baseline justify-between gap-3">
              <dt className="label text-accent">{metric.owner}</dt>
              <span className="figure-num text-[12px] text-mute">0{index + 1}</span>
            </div>
            <dd className="mt-auto pt-6 text-[14px] leading-[1.55] font-medium text-ink">{metric.label}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
