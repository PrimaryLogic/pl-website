import { systemFit } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

export default function Capabilities() {
  return (
    <Section className="content-auto">
      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div>
          <Eyebrow>{systemFit.eyebrow}</Eyebrow>
          <Heading>{systemFit.heading}</Heading>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-body">{systemFit.intro}</p>
        </div>

        <div className="grid gap-px border border-rule-mid bg-rule sm:grid-cols-3">
          {systemFit.columns.map((column, index) => (
            <div key={column.label} className="bg-card p-5">
              <div className="flex items-baseline justify-between gap-3 border-b border-rule pb-4">
                <p className="label text-accent">{column.label}</p>
                <span className="figure-num text-[12px] text-mute">0{index + 1}</span>
              </div>
              <ul className="mt-4 space-y-3">
                {column.items.map((item) => (
                  <li key={item} className="text-[14px] leading-[1.5] text-body">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
