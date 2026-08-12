import { coverageTrace } from "@/lib/content";
import { Eyebrow, Heading, Section } from "./Section";

const kindTone: Record<string, string> = {
  Signal: "text-body",
  Action: "text-accent-deep",
  Decision: "text-ink",
  Stop: "text-accent-deep",
};

export default function Orchestration() {
  return (
    <Section id="product" className="content-auto">
      <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,.82fr)_minmax(0,1.18fr)] lg:items-end">
        <div>
          <Eyebrow>{coverageTrace.eyebrow}</Eyebrow>
          <Heading>{coverageTrace.heading}</Heading>
        </div>
        <p className="max-w-2xl text-[14px] leading-[1.65] text-body">{coverageTrace.intro}</p>
      </div>

      <div className="mt-8 overflow-hidden rounded-sm border border-rule-mid bg-card">
        <div className="grid gap-px bg-rule lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="bg-card">
            <div className="flex flex-col gap-4 border-b-2 border-ink px-5 py-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="label text-mute">{coverageTrace.caseLabel}</p>
                <p className="display mt-2 text-[20px] text-ink">{coverageTrace.caseId}</p>
              </div>
              <div className="sm:text-right">
                <p className="label text-mute">Objective</p>
                <p className="mt-1 text-[14px] font-medium text-ink">{coverageTrace.objective}</p>
              </div>
            </div>

            <div className="hidden grid-cols-[70px_86px_minmax(0,1fr)_150px] gap-4 border-b border-rule bg-band px-5 py-3 sm:grid">
              {['Time', 'Type', 'Trace entry', 'Workflow state'].map((label) => (
                <span key={label} className="label text-mute">{label}</span>
              ))}
            </div>
            <ol>
              {coverageTrace.rows.map((row, index) => (
                <li key={`${row.at}-${row.kind}`} className="grid gap-2 border-b border-rule px-5 py-3 last:border-b-0 sm:grid-cols-[70px_86px_minmax(0,1fr)_150px] sm:gap-4">
                  <span className="figure-num text-[12px] text-mute">{row.at}</span>
                  <span className={`label ${kindTone[row.kind] ?? "text-body"}`}>{row.kind}</span>
                  <span className="text-[14px] leading-[1.55] text-ink">{row.event}</span>
                  <span className={`figure-num text-[12px] ${index === coverageTrace.rows.length - 1 ? "font-semibold text-accent-deep" : "text-body"}`}>{row.state}</span>
                </li>
              ))}
            </ol>
          </div>

          <aside className="flex flex-col bg-paper p-5">
            <div>
              <p className="label text-mute">Final state</p>
              <p className="display mt-3 text-[24px] text-accent-deep">{coverageTrace.status}</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-body">{coverageTrace.completion}</p>
            </div>
            <div className="mt-6 border-t border-rule-mid pt-4 lg:mt-auto">
              <p className="label text-mute">Permitted stop conditions</p>
              <ul className="mt-3 space-y-3">
                {coverageTrace.stopConditions.map((condition) => (
                  <li key={condition} className="flex gap-2 text-[13px] leading-[1.5] text-body">
                    <span aria-hidden="true" className="figure-num text-accent">✓</span>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </Section>
  );
}
