import { answers } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

export default function AnswersSection() {
  return (
    <Section id="answers" className="sm:!py-8 lg:!py-12">
      <Eyebrow>{answers.eyebrow}</Eyebrow>
      <Heading className="max-w-[560px] !text-[28px] lg:!text-[34px]">{answers.heading}</Heading>
      <dl className="mt-8 grid gap-4 md:grid-cols-2">
        {answers.items.map(({ q, a }) => (
          <div key={q} className="rounded-2xl border border-rule bg-white p-5 shadow-[0_8px_24px_rgba(18,20,16,0.04)]">
            <dt className="text-[15px] font-semibold text-ink">{q}</dt>
            <dd className="mt-2.5 text-[13px] leading-[1.65] text-body">{a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
