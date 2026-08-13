import { CheckCircle, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { solution } from "@/lib/content";
import CoordinationTimeline from "./CoordinationTimeline";
import { Heading, Section } from "./Section";

export default function SolutionSection() {
  return (
    <Section id="product" className="sm:!py-8 lg:!py-12">
      <span className="rj-eyebrow">
        <Sparkle aria-hidden="true" size={13} weight="fill" />
        {solution.eyebrow}
      </span>
      <Heading className="mt-4 max-w-[760px] !text-[30px] lg:!text-[42px]">{solution.heading}</Heading>
      <p className="mt-4 max-w-[560px] text-[13px] leading-[1.6] text-body lg:text-[15px] lg:leading-[1.7]">
        {solution.intro}
      </p>
      <div className="mt-7">
        <CoordinationTimeline />
      </div>
      <div className="mt-7 rounded-2xl border border-rule bg-white p-5 shadow-[0_8px_24px_rgba(18,20,16,0.04)] sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(220px,.7fr)_minmax(0,1.3fr)] lg:items-start">
          <div>
            <h3 className="display text-[25px] leading-[1.08] text-ink sm:text-[28px]">
              {solution.terminalStates.heading}
            </h3>
            <p className="mt-3 max-w-[430px] text-[13px] leading-[1.65] text-body">
              {solution.terminalStates.body}
            </p>
          </div>
          <div>
            <ul className="grid gap-2 sm:grid-cols-2" aria-label="Referral terminal states">
              {solution.terminalStates.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 rounded-xl bg-band px-3.5 py-3 text-[13px] font-medium text-ink">
                  <CheckCircle aria-hidden="true" size={17} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[12.5px] font-medium leading-[1.6] text-accent-deep">
              {solution.terminalStates.note}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
