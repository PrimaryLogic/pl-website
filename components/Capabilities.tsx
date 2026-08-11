import { Eyebrow, Section } from "./Section";
import { capabilities } from "@/lib/content";

export default function Capabilities() {
  return (
    <Section className="bg-warm/50">
      <div className="max-w-3xl">
        <Eyebrow>{capabilities.eyebrow}</Eyebrow>
        <h2 className="display mt-4 text-[36px] text-ink sm:text-[52px]">
          {capabilities.heading}
        </h2>
        <p className="mt-6 text-[17px] leading-[1.75] text-muted">
          {capabilities.intro}
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {capabilities.items.map((item) => (
          <div key={item.title} className="rounded-panel bg-surface p-8 shadow-card">
            <h3 className="display text-[22px] text-ink">{item.title}</h3>
            <p className="mt-3 text-[15px] leading-[1.75] text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
