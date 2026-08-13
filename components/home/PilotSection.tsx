import { pilot } from "@/lib/content/home";
import { Eyebrow, Heading, Section } from "../Section";

export default function PilotSection() {
  return (
    <Section id="pilot" className="sm:!py-8 lg:!py-12">
      <Eyebrow>{pilot.eyebrow}</Eyebrow>
      <Heading className="max-w-[560px] !text-[28px] lg:!text-[36px]">{pilot.heading}</Heading>
      <p className="mt-4 max-w-[620px] text-[13px] leading-[1.6] text-body lg:text-[15px] lg:leading-[1.7]">
        {pilot.intro}
      </p>

      <ol aria-label="How a pilot runs" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pilot.steps.map((step, index) => (
          <li key={step.title} className="rounded-2xl border border-rule bg-white p-5 shadow-[0_8px_24px_rgba(18,20,16,0.04)]">
            <p className="figure-num text-[13px] font-semibold text-accent" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2.5 text-[15px] font-semibold leading-[1.35] text-ink">{step.title}</h3>
            <p className="mt-1.5 text-[12.5px] leading-[1.6] text-body">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
