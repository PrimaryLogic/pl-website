import { workflows } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

export default function Sequence() {
  return (
    <Section id="workflows" className="content-auto">
      <div className="max-w-3xl">
        <Eyebrow>{workflows.eyebrow}</Eyebrow>
        <Heading>{workflows.heading}</Heading>
        <p className="mt-4 text-[15px] leading-[1.6] text-body">{workflows.intro}</p>
      </div>

      <div className="mt-8 border-t-2 border-ink">
        <div className="hidden grid-cols-[1fr_1fr_1.15fr_1fr] gap-7 border-b border-rule bg-band px-5 py-3 lg:grid">
          {['Workflow', 'Trigger', 'Coverage work', 'Finish line'].map((label) => (
            <span key={label} className="label text-mute">{label}</span>
          ))}
        </div>
        {workflows.items.map((item, index) => (
          <article key={item.title} className="grid gap-4 border-b border-rule py-5 lg:grid-cols-[1fr_1fr_1.15fr_1fr] lg:gap-6 lg:px-5">
            <div>
              <span className="figure-num text-[12px] text-accent">0{index + 1}</span>
              <h3 className="display mt-2 text-[17px] text-ink">{item.title}</h3>
            </div>
            <div>
              <p className="label text-mute lg:sr-only">Trigger</p>
              <p className="mt-1 text-[14px] leading-[1.6] text-body lg:mt-0">{item.trigger}</p>
            </div>
            <div>
              <p className="label text-mute lg:sr-only">Coverage work</p>
              <p className="mt-1 text-[14px] leading-[1.6] text-body lg:mt-0">{item.work}</p>
            </div>
            <div>
              <p className="label text-mute lg:sr-only">Finish line</p>
              <p className="mt-1 text-[14px] leading-[1.6] font-medium text-ink lg:mt-0">{item.finish}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
