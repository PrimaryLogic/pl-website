import {
  ArrowRight,
  CheckCircle,
  Database,
  FileCsv,
  HandPalm,
  ListChecks,
  ShieldCheck,
  UserSwitch,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import AnalyticsBridge from "./AnalyticsBridge";
import EmailCapture from "./EmailCapture";
import FinalCta from "./FinalCta";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import BorrowerJourney from "./lending/BorrowerJourney";
import {
  billing,
  finalCta,
  guardrails,
  hero,
  journey,
  leak,
  lendingNav,
  pilot,
} from "@/lib/content/lending";

const guardrailIcons = [ShieldCheck, UserSwitch, HandPalm, ListChecks];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Lending Recapture | Primary Logic",
  url: `${siteUrl}/lending`,
  description:
    "Administrative follow-through for abandoned applications and approved recapture lists, priced per funded loan verified in the customer's LOS.",
}).replace(/</g, "\\u003c");

function CaseFile() {
  const rows = [
    { label: "State", value: hero.caseFile.state },
    { label: "Next move", value: hero.caseFile.nextMove },
    { label: "Last signal", value: hero.caseFile.lastSignal },
    { label: "Guardrail", value: hero.caseFile.guardrail },
  ];

  return (
    <div className="overflow-hidden rounded-[18px] border border-black/5 bg-[#f1e8db] p-4 sm:p-6">
      <div className="rounded-[12px] border border-black/5 bg-white shadow-[0_18px_50px_rgba(18,20,16,0.07)]">
        <div className="flex items-center justify-between gap-3 border-b border-rule px-5 py-4">
          <div>
            <p className="figure-num text-[9px] tracking-[0.12em] text-mute uppercase">{hero.caseFile.label}</p>
            <p className="figure-num mt-1.5 text-[13px] font-semibold text-ink">{hero.caseFile.id}</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[10px] font-medium text-accent-deep">
            <span className="size-1.5 rounded-full bg-accent" /> Active
          </span>
        </div>
        <dl className="divide-y divide-rule">
          {rows.map((row, index) => (
            <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[105px_minmax(0,1fr)] sm:gap-4">
              <dt className="figure-num text-[9px] tracking-[0.09em] text-mute uppercase">{row.label}</dt>
              <dd className={`text-[12.5px] leading-[1.5] ${index === rows.length - 1 ? "font-medium text-accent-deep" : "text-ink"}`}>{row.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center gap-2 bg-ink px-5 py-4 text-white">
          <CheckCircle aria-hidden="true" size={17} weight="fill" className="shrink-0 text-accent" />
          <p className="figure-num text-[9px] tracking-[0.08em] uppercase">One owner · one next move · one auditable history</p>
        </div>
      </div>
    </div>
  );
}

export default function LendingPage() {
  return (
    <div className="min-h-full bg-white">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnalyticsBridge />
      <SiteNav nav={lendingNav} variant="landing" />

      <main id="main-content" className="flex-1">
        <section className="bg-white px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:pt-14">
          <div className="mx-auto max-w-[1392px]">
            <div className="grid gap-12 lg:grid-cols-[1.12fr_.88fr] lg:items-end lg:gap-14">
              <div>
                <p className="label !text-[10px] text-accent">{hero.eyebrow}</p>
                <h1 className="display mt-5 max-w-[840px] text-[36px] leading-[0.98] tracking-[-0.045em] text-ink sm:text-[44px] lg:text-[50px]">
                  {hero.heading}
                </h1>
                <p className="mt-5 max-w-[720px] text-[15px] leading-[1.62] text-body sm:text-[16px]">{hero.body}</p>
                <div className="mt-8">
                  <EmailCapture
                    id="lending-hero-contact"
                    variant="landing"
                    buttonLabel="Design a pilot"
                    emailPlaceholder="Enter your work email"
                    lane="lending"
                  />
                </div>
                <p className="mt-4 flex max-w-[700px] items-start gap-2 text-[12.5px] font-medium leading-[1.55] text-accent-deep">
                  <CheckCircle aria-hidden="true" size={17} weight="fill" className="mt-0.5 shrink-0" />
                  {hero.note}
                </p>
              </div>
              <CaseFile />
            </div>
          </div>
        </section>

        <section id="leak" className="scroll-mt-6 bg-white px-4 pb-12 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-[1392px] overflow-hidden rounded-[20px] bg-[#191612] px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
              <div>
                <p className="label !text-[10px] text-[#8f8983]">{leak.eyebrow}</p>
                <h2 className="display mt-5 max-w-[780px] text-[27px] leading-[1.05] text-white sm:text-[32px] lg:text-[36px]">{leak.heading}</h2>
              </div>
              <p className="max-w-[600px] text-[14px] leading-[1.65] text-[#c9c5bf] sm:text-[15px] lg:pt-5">{leak.intro}</p>
            </div>

            <ol className="mt-10 grid overflow-hidden rounded-[12px] border border-white/12 lg:grid-cols-3">
              {leak.sources.map((source, index) => (
                <li key={source.number} className={`p-5 sm:p-6 ${index > 0 ? "border-t border-white/12 lg:border-l lg:border-t-0" : ""}`}>
                  <p className="figure-num text-[10px] tracking-[0.12em] text-[#8f8983]">{source.number}</p>
                  <h3 className="display mt-6 text-[18.5px] leading-[1.12] text-white">{source.title}</h3>
                  <p className="mt-4 text-[13.5px] leading-[1.65] text-[#bdb8b2]">{source.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex max-w-[1050px] items-start gap-3 border-t border-white/10 pt-7">
              <ArrowRight aria-hidden="true" size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" />
              <p className="text-[14px] font-medium leading-[1.65] text-[#d8d5d0]">{leak.close}</p>
            </div>
          </div>
        </section>

        <section id="journey" className="scroll-mt-6 bg-white px-4 pb-12 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-[1392px] rounded-[20px] bg-[#f5f4f2] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-11">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
              <div>
                <p className="label !text-[10px] text-accent">{journey.eyebrow}</p>
                <h2 className="display mt-5 max-w-[760px] text-[27px] leading-[1.05] text-ink sm:text-[32px] lg:text-[36px]">{journey.heading}</h2>
              </div>
              <p className="max-w-[590px] text-[14px] leading-[1.65] text-body sm:text-[15px] lg:pt-7">{journey.intro}</p>
            </div>
            <BorrowerJourney />
            <p className="mt-4 text-[10.5px] text-mute">{journey.footnote}</p>
          </div>
        </section>

        <section id="guardrails" className="scroll-mt-6 bg-white px-4 pb-12 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-[1392px] px-2 sm:px-4">
            <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
              <div>
                <p className="label !text-[10px] text-accent">{guardrails.eyebrow}</p>
                <h2 className="display mt-5 max-w-[760px] text-[27px] leading-[1.05] text-ink sm:text-[33px] lg:text-[38px]">{guardrails.heading}</h2>
              </div>
              <p className="max-w-[600px] text-[14px] leading-[1.65] text-body sm:text-[15px] lg:pt-7">{guardrails.intro}</p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-stretch">
              <ul className="grid gap-3 sm:grid-cols-2">
                {guardrails.items.map((item, index) => {
                  const Icon = guardrailIcons[index];
                  return (
                    <li key={item.title} className="rounded-[12px] border border-rule bg-white p-5">
                      <span className="inline-flex size-10 items-center justify-center rounded-[9px] bg-accent-soft text-accent-deep">
                        <Icon aria-hidden="true" size={21} weight="bold" />
                      </span>
                      <h3 className="display mt-5 text-[17.5px] leading-[1.15] text-ink">{item.title}</h3>
                      <p className="mt-3 text-[13px] leading-[1.65] text-body">{item.body}</p>
                    </li>
                  );
                })}
              </ul>

              <div className="overflow-hidden rounded-[14px] bg-ink text-white">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
                  <div>
                    <p className="label !text-[9px] text-[#8f8983]">Case evidence</p>
                    <h3 className="display mt-2 text-[19px] text-white">{guardrails.evidence.heading}</h3>
                  </div>
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Database aria-hidden="true" size={21} weight="fill" />
                  </span>
                </div>
                <dl className="divide-y divide-white/10 px-6">
                  {guardrails.evidence.rows.map((row) => (
                    <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-5">
                      <dt className="figure-num text-[9px] tracking-[0.08em] text-[#8f8983] uppercase">{row.label}</dt>
                      <dd className="text-[12.5px] font-medium leading-[1.5] text-[#dedbd6]">{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="border-t border-white/10 bg-white/[0.03] px-6 py-5 text-[12.5px] leading-[1.6] text-[#bdb8b2]">{guardrails.evidence.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="billing" className="scroll-mt-6 bg-white px-4 pb-12 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-[1392px] rounded-[20px] bg-[#e3eee6] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-11">
            <p className="label !text-[10px] text-accent">{billing.eyebrow}</p>
            <h2 className="display mt-5 max-w-[1000px] text-[29px] leading-[1.05] text-ink sm:text-[36px] lg:text-[42px]">{billing.heading}</h2>
            <p className="mt-6 max-w-[850px] text-[14px] leading-[1.65] text-body sm:text-[15px]">{billing.intro}</p>

            <div className="mt-10 grid overflow-hidden rounded-[14px] border border-black/5 bg-white lg:grid-cols-[.85fr_1.15fr]">
              <div className="bg-accent p-6 text-white sm:p-8">
                <p className="label !text-[9px] text-white/65">{billing.billable.label}</p>
                <CheckCircle aria-hidden="true" size={40} weight="fill" className="mt-8" />
                <h3 className="display mt-4 text-[23px] leading-[1.06] text-white sm:text-[27px]">{billing.billable.title}</h3>
                <p className="mt-4 max-w-[480px] text-[14px] leading-[1.65] text-white/80">{billing.billable.body}</p>
              </div>
              <div className="p-6 sm:p-8">
                <p className="label !text-[9px] text-mute">Not billable by default</p>
                <ul className="mt-6 grid gap-3">
                  {billing.notBillable.map((item) => (
                    <li key={item} className="flex items-start gap-3 border-b border-rule pb-3 text-[13.5px] leading-[1.55] text-body last:border-0 last:pb-0">
                      <XCircle aria-hidden="true" size={18} weight="fill" className="mt-0.5 shrink-0 text-mute" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 flex max-w-[1050px] items-start gap-3 text-[12.5px] leading-[1.65] text-accent-deep">
              <ShieldCheck aria-hidden="true" size={18} weight="bold" className="mt-0.5 shrink-0" />
              {billing.legal}
            </p>
          </div>
        </section>

        <section className="bg-white px-4 pb-10 sm:px-6 sm:pb-14">
          <div className="mx-auto max-w-[1392px] rounded-[20px] bg-[#f5f4f2] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-11">
            <p className="label !text-[10px] text-accent">{pilot.eyebrow}</p>
            <h2 className="display mt-6 max-w-[1080px] text-[42px] leading-[1.02] text-ink sm:text-[55px] lg:text-[66px]">{pilot.heading}</h2>
            <p className="mt-6 max-w-[850px] text-[14px] leading-[1.65] text-body sm:text-[15px]">{pilot.intro}</p>

            <ol className="mt-10 grid overflow-hidden rounded-[12px] border border-rule bg-white lg:grid-cols-4">
              {pilot.steps.map((step, index) => (
                <li key={step.number} className={`p-5 sm:p-6 ${index > 0 ? "border-t border-rule lg:border-l lg:border-t-0" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="figure-num text-[10px] font-semibold text-accent">{step.number}</p>
                    {index === 0 ? <FileCsv aria-hidden="true" size={17} className="text-mute" /> : index === 3 ? <Database aria-hidden="true" size={17} className="text-mute" /> : <ArrowRight aria-hidden="true" size={15} className="hidden text-rule-mid lg:block" />}
                  </div>
                  <h3 className="display mt-5 text-[17.5px] leading-[1.15] text-ink">{step.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.62] text-body">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 flex max-w-[860px] items-start gap-2.5 text-[14px] font-medium leading-[1.55] text-accent-deep">
              <CheckCircle aria-hidden="true" size={18} weight="fill" className="mt-0.5 shrink-0" />
              {pilot.close}
            </p>
          </div>
        </section>

        <FinalCta heading={finalCta.heading} body={finalCta.body} emailPlaceholder="name@lender.com" lane="lending" variant="landing" />
      </main>
      <SiteFooter variant="landing" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
