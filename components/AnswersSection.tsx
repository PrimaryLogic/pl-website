import { answers } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

export default function AnswersSection() {
  return (
    <Section id="answers" className="sm:!py-8 lg:!py-12">
      <Eyebrow>{answers.eyebrow}</Eyebrow>
      <Heading className="max-w-[560px] !text-[23px] lg:!text-[28px]">{answers.heading}</Heading>
      <dl className="mt-6 grid gap-3.5 md:grid-cols-2">
        {answers.items.map(({ q, a }) => (
          <div key={q} className="rounded-2xl border border-rule bg-white p-4 shadow-[0_8px_24px_rgba(18,20,16,0.04)] sm:p-5">
            <dt className="text-[14px] font-semibold text-ink">{q}</dt>
            <dd className="mt-2 text-[12.5px] leading-[1.65] text-body">{a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
