import { ArrowRight, ArrowsClockwise, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { loop } from "@/lib/content/home";
import { Eyebrow, Heading, Section } from "../Section";

export default function LoopSection() {
  return (
    <Section id="loop" className="sm:!py-8 lg:!py-12">
      <Eyebrow>{loop.eyebrow}</Eyebrow>
      <Heading className="max-w-[720px] !text-[30px] lg:!text-[42px]">{loop.heading}</Heading>
      <p className="mt-4 max-w-[560px] text-[13px] leading-[1.6] text-body lg:text-[15px] lg:leading-[1.7]">
        {loop.intro}
      </p>

      <ol aria-label="The working loop" className="mt-8 grid gap-3 md:grid-cols-4 md:gap-0">
        {loop.steps.map((step, index) => (
          <li key={step.title} className="relative flex md:pr-8">
            <div className="w-full rounded-2xl border border-rule bg-white p-5 shadow-[0_8px_24px_rgba(18,20,16,0.04)]">
              <div className="flex items-center justify-between gap-3">
                <p className="display text-[19px] text-ink">{step.title}</p>
                <span className="figure-num rounded-full bg-band px-2.5 py-1 text-[10.5px] font-medium text-body">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-[1.6] text-body">{step.body}</p>
            </div>
            <div
              className="absolute -right-0.5 top-1/2 hidden -translate-y-1/2 md:flex md:items-center md:justify-center md:pr-1.5"
              aria-hidden="true"
            >
              {index < loop.steps.length - 1 ? (
                <ArrowRight size={17} weight="bold" className="text-accent" />
              ) : (
                <ArrowsClockwise size={17} weight="bold" className="text-mute" />
              )}
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-2 hidden text-right text-[11px] text-mute md:block" aria-hidden="true">
        Record loops back to Watch until the job is done.
      </p>

      <div className="mt-7 rounded-2xl border border-rule bg-white p-5 shadow-[0_8px_24px_rgba(18,20,16,0.04)] sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(220px,.7fr)_minmax(0,1.3fr)] lg:items-start">
          <div>
            <h3 className="display text-[25px] leading-[1.08] text-ink sm:text-[28px]">
              {loop.terminalStates.heading}
            </h3>
            <p className="mt-3 max-w-[430px] text-[13px] leading-[1.65] text-body">
              {loop.terminalStates.body}
            </p>
          </div>
          <div>
            <ul className="grid gap-2 sm:grid-cols-2" aria-label="Job terminal states">
              {loop.terminalStates.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl bg-band px-3.5 py-3 text-[13px] font-medium text-ink">
                  <CheckCircle aria-hidden="true" size={17} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] font-medium leading-[1.6] text-accent-deep">
              {loop.terminalStates.note}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
