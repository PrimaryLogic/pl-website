import { Eyebrow, Heading, Section } from "./Section";
import { leak } from "@/lib/content";

export default function Leak() {
  return (
    <Section>
      <div className="max-w-2xl">
        <Eyebrow>{leak.eyebrow}</Eyebrow>
        <Heading>{leak.heading}</Heading>
        <p className="mt-6 text-[16px] leading-[1.7] text-body">{leak.intro}</p>
      </div>

      {/* Rows, not cards — the shared column is "how long before it's gone." */}
      <div className="mt-14 border-t border-rule-mid">
        {leak.items.map((item) => (
          <div
            key={item.title}
            className="grid gap-2 border-b border-rule py-7 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-10"
          >
            <span className="figure-num text-[13px] text-loss">{item.when}</span>
            <div>
              <h3 className="display text-[19px] text-ink">{item.title}</h3>
              <p className="mt-2 max-w-2xl text-[15px] leading-[1.7] text-body">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
