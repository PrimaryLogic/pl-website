import { CheckCircle, Tray } from "@phosphor-icons/react/dist/ssr";
import { jobs } from "@/lib/content/home";
import { Eyebrow, Heading, Section } from "../Section";

export default function JobsSection() {
  return (
    <Section id="jobs" className="sm:!py-8 lg:!py-12">
      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(260px,.62fr)_minmax(0,1.38fr)] lg:items-start">
        <div>
          <Eyebrow>{jobs.eyebrow}</Eyebrow>
          <Heading className="max-w-[430px] !text-[30px] lg:!text-[38px]">{jobs.heading}</Heading>

          <div className="mt-7 rounded-2xl border border-rule bg-white p-5 shadow-[0_8px_24px_rgba(18,20,16,0.04)]">
            <p className="flex items-center gap-2.5 text-[15px] font-semibold text-ink">
              <Tray aria-hidden="true" size={19} className="text-accent" />
              {jobs.feed.heading}
            </p>
            <p className="mt-2.5 text-[13px] leading-[1.65] text-body">{jobs.feed.body}</p>
          </div>
        </div>

        <ol aria-label="The five-box job checklist" className="grid gap-2.5">
          {jobs.items.map((item, index) => (
            <li key={item.title} className="flex items-start gap-3.5 rounded-xl bg-band px-4 py-3.5 sm:px-5">
              <CheckCircle aria-hidden="true" size={19} weight="fill" className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="text-[14px] font-semibold text-ink">
                  <span className="figure-num mr-2 text-[11px] font-medium text-mute" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-[1.6] text-body">{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
