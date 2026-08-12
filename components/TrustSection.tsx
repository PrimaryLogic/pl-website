import { trust } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

export default function TrustSection() {
  return (
    <Section id="trust" className="content-auto">
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)]">
        <div>
          <Eyebrow>{trust.eyebrow}</Eyebrow>
          <Heading>{trust.heading}</Heading>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-body">{trust.intro}</p>
        </div>

        <div>
          <dl className="border-t-2 border-ink">
            {trust.controls.map((control, index) => (
              <div key={control.title} className="grid gap-2 border-b border-rule py-4 sm:grid-cols-[48px_160px_1fr] sm:gap-4">
                <span className="figure-num text-[12px] text-accent">0{index + 1}</span>
                <dt className="display text-[16px] text-ink">{control.title}</dt>
                <dd className="text-[14px] leading-[1.65] text-body">{control.body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 border-l-2 border-rule-mid pl-4 text-[13px] leading-[1.65] text-mute">{trust.note}</p>
        </div>
      </div>
    </Section>
  );
}
