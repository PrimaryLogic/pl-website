import { Eyebrow, Heading, Section } from "./Section";
import { capabilities } from "@/lib/content";

export default function Capabilities() {
  return (
    <Section>
      <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
        <div>
          <Eyebrow>{capabilities.eyebrow}</Eyebrow>
          <Heading>{capabilities.heading}</Heading>
        </div>

        <dl className="border-t border-rule-mid">
          {capabilities.items.map((item) => (
            <div key={item.title} className="border-b border-rule py-6">
              <dt className="display text-[18px] text-ink">{item.title}</dt>
              <dd className="mt-2 max-w-2xl text-[15px] leading-[1.7] text-body">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
