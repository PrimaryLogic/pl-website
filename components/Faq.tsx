import { faq } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

export default function Faq() {
  return (
    <Section className="content-auto">
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)]">
        <div>
          <Eyebrow>{faq.eyebrow}</Eyebrow>
          <Heading>{faq.heading}</Heading>
        </div>

        <div className="border-t-2 border-ink">
          {faq.items.map((item) => (
            <details key={item.question} className="group border-b border-rule">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-[15px] font-semibold text-ink marker:hidden">
                {item.question}
                <span aria-hidden="true" className="figure-num text-[20px] font-normal text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="max-w-2xl pb-5 pr-10 text-[14px] leading-[1.65] text-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
