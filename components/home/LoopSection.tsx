import { ArrowDown, ArrowsClockwise, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { loop } from "@/lib/content/home";

function StepCopy({ index }: { index: number }) {
  const step = loop.steps[index];
  return (
    <div>
      <p className="figure-num text-[9.5px] tracking-[0.14em] text-[#8f8983] uppercase">
        {String(index + 1).padStart(2, "0")} · {step.title}
      </p>
      <p className="mt-2 max-w-[300px] text-[12.5px] leading-[1.58] text-[#bdb8b2]">{step.body}</p>
    </div>
  );
}

export default function LoopSection() {
  return (
    <section id="loop" className="scroll-mt-6 bg-white px-4 pb-14 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-[1392px] rounded-[20px] bg-[#191612] px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-12 lg:py-11">
        <div className="grid gap-4 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
          <div>
            <p className="label !text-[9.5px] text-[#8f8983]">{loop.eyebrow}</p>
            <h2 className="display mt-3 max-w-[560px] text-[28px] leading-[1.04] text-white sm:text-[34px] lg:text-[38px]">
              {loop.heading}
            </h2>
          </div>
          <div className="lg:pt-4">
            <p className="max-w-[600px] text-[14px] leading-[1.6] text-[#c9c5bf] sm:text-[15px]">{loop.intro}</p>
            <p className="mt-3 max-w-[620px] text-[12.5px] leading-[1.65] text-[#8f8983] sm:text-[13px]">{loop.runtime}</p>
          </div>
        </div>

        <div className="my-7 h-px bg-white/10" />

        <ol className="grid gap-3 lg:hidden" aria-label="Primary Logic agent loop">
          {loop.steps.map((step, index) => (
            <li key={step.title} className="rounded-[9px] border border-white/15 px-4 py-4">
              <div className="flex items-center justify-between gap-4">
                <p className="figure-num text-[10px] tracking-[0.14em] text-[#8f8983] uppercase">{String(index + 1).padStart(2, "0")}</p>
                <h3 className="text-[14px] font-semibold uppercase">{step.title}</h3>
              </div>
              <p className="mt-3 text-[13px] leading-[1.58] text-[#bdb8b2]">{step.body}</p>
            </li>
          ))}
          <li className="flex items-center justify-center gap-2 py-2 text-[13px] text-[#bdb8b2]">
            <ArrowsClockwise aria-hidden="true" size={16} /> Next signal
          </li>
        </ol>

        <div className="hidden min-h-[440px] grid-cols-[1fr_310px_1fr] gap-10 lg:grid">
          <div className="flex flex-col justify-around text-right">
            <div className="ml-auto"><StepCopy index={0} /></div>
            <div className="ml-auto"><StepCopy index={2} /></div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p className="figure-num mb-4 text-[9.5px] tracking-[0.16em] text-[#8f8983] uppercase">Primary Logic runtime</p>
            {loop.steps.map((step, index) => (
              <div key={step.title} className="contents">
                <div className={`flex min-h-[48px] w-full items-center justify-between rounded-[7px] border px-4 ${index === 1 ? "border-accent bg-accent/5" : "border-white/20"}`}>
                  <span className={`inline-flex size-2.5 items-center justify-center rounded-full ${index === 1 ? "bg-accent" : "border border-white/35"}`} />
                  <span className="text-[12px] font-semibold uppercase">{step.title}</span>
                </div>
                {index < loop.steps.length - 1 && <ArrowDown aria-hidden="true" size={16} className="my-1.5 text-white/30" />}
              </div>
            ))}
            <p className="mt-4 flex items-center gap-2 text-[12px] text-[#bdb8b2]">
              <ArrowsClockwise aria-hidden="true" size={16} /> Next signal
            </p>
          </div>

          <div className="flex flex-col justify-around">
            <StepCopy index={1} />
            <StepCopy index={3} />
          </div>
        </div>

        <div className="mt-7 border-t border-white/10 pt-6">
          <div className="grid gap-5 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
            <div>
              <p className="label !text-[9.5px] text-[#8f8983]">Auditable endings</p>
              <h3 className="display mt-2.5 text-[21px] leading-[1.1] text-white">{loop.terminalStates.heading}</h3>
              <p className="mt-2.5 text-[12.5px] leading-[1.58] text-[#bdb8b2]">{loop.terminalStates.note}</p>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {loop.terminalStates.items.map((item) => (
                <li key={item} className="flex gap-2.5 rounded-[7px] border border-white/10 px-3.5 py-2.5 text-[12px] leading-[1.5] text-[#c9c5bf]">
                  <CheckCircle aria-hidden="true" size={16} weight="fill" className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
