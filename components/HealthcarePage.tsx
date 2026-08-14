import {
  ArrowRight,
  CheckCircle,
  FirstAidKit,
  LockKey,
  ShieldCheck,
  UserFocus,
  WarningCircle,
} from "@phosphor-icons/react/dist/ssr";
import AnalyticsBridge from "./AnalyticsBridge";
import EmailCapture from "./EmailCapture";
import FinalCta from "./FinalCta";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import ReferralTrace from "./healthcare/ReferralTrace";
import { healthcareNav } from "@/lib/content";
import { healthcareLanding } from "@/lib/content/healthcare";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Specialty Referral Recovery Design-Partner Pilots | Primary Logic",
  url: `${siteUrl}/healthcare`,
  description:
    "Primary Logic is recruiting design partners for second-pass specialty referral recovery pilots verified against customer-side EHR or scheduling reports.",
}).replace(/</g, "\\u003c");

const guardrailIcons = [LockKey, ShieldCheck, CheckCircle, UserFocus];

export default function HealthcarePage() {
  const { hero, leak, workflow, guardrails, economics, pilot, answers, finalCta } = healthcareLanding;

  return (
    <div className="min-h-full bg-white">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnalyticsBridge />
      <SiteNav nav={healthcareNav} variant="landing" />

      <main id="main-content" className="flex-1">
        <section className="bg-white px-4 pb-14 pt-10 sm:px-6 sm:pb-16 sm:pt-14">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-12 lg:grid-cols-[1.2fr_.68fr] lg:items-start lg:gap-14">
              <div className="lg:pt-3">
                <p className="label !text-[10px] leading-[1.5] text-accent sm:!text-[11px]">{hero.eyebrow}</p>
                <h1 className="display mt-6 max-w-[820px] text-[42px] leading-[0.96] tracking-[-0.05em] text-ink sm:text-[56px] lg:text-[68px]">
                  {hero.headingLead} <span className="text-accent">{hero.headingAccent}</span>
                </h1>
                <p className="mt-7 max-w-[720px] text-[17px] leading-[1.58] text-body sm:text-[19px]">
                  {hero.body}
                </p>
                <p className="mt-6 flex max-w-[700px] items-start gap-3 border-l-2 border-accent pl-4 text-[13.5px] font-medium leading-[1.6] text-accent-deep sm:text-[14.5px]">
                  <CheckCircle aria-hidden="true" size={18} weight="fill" className="mt-0.5 shrink-0" />
                  {hero.proof}
                </p>
                <div className="mt-8">
                  <EmailCapture
                    id="healthcare-hero-contact"
                    variant="landing"
                    buttonLabel="Discuss a pilot"
                    emailPlaceholder="Enter your work email"
                    helperText="Work email only · reply within one business day"
                    lane="healthcare"
                  />
                </div>
              </div>

              <aside className="overflow-hidden rounded-[18px] border border-[#cfddd3] bg-[#f1f6f2] shadow-[0_24px_70px_rgba(18,20,16,0.06)]" aria-labelledby="pilot-brief-title">
                <div className="border-b border-[#cfddd3] px-6 py-5">
                  <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-accent-deep uppercase">
                    <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
                    {hero.brief.status}
                  </p>
                  <h2 id="pilot-brief-title" className="display mt-5 text-[26px] leading-[1.04] text-ink sm:text-[30px]">
                    {hero.brief.heading}
                  </h2>
                </div>
                <dl className="divide-y divide-[#cfddd3] bg-white/65">
                  {hero.brief.items.map((item) => (
                    <div key={item.label} className="grid gap-1 px-6 py-4 sm:grid-cols-[92px_minmax(0,1fr)] sm:gap-5">
                      <dt className="figure-num text-[9px] font-semibold tracking-[0.09em] text-accent uppercase">{item.label}</dt>
                      <dd className="text-[12.5px] font-medium leading-[1.5] text-ink">{item.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="px-6 py-4 text-[11px] leading-[1.55] text-mute">{hero.brief.note}</p>
              </aside>
            </div>

            <dl className="mt-14 hidden border-y border-rule md:grid md:grid-cols-3 sm:mt-16">
              {hero.handoff.map((item, index) => (
                <div key={item.label} className={`py-5 md:px-6 md:py-6 ${index > 0 ? "border-t border-rule md:border-l md:border-t-0" : ""} ${index === 0 ? "md:pl-0" : ""}`}>
                  <dt className="figure-num text-[9px] font-semibold tracking-[0.12em] text-accent uppercase">{String(index + 1).padStart(2, "0")} · {item.label}</dt>
                  <dd className="display mt-3 text-[18px] leading-[1.1] text-ink sm:text-[20px]">{item.value}</dd>
                  <p className="mt-2 text-[12.5px] leading-[1.55] text-body">{item.note}</p>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="challenge" className="scroll-mt-24 bg-white px-4 pb-14 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-[1240px] rounded-[20px] bg-[#f5f4f2] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[.86fr_1.14fr] lg:items-end lg:gap-16">
              <div>
                <p className="label !text-[10px] text-loss">{leak.eyebrow}</p>
                <h2 className="display mt-5 max-w-[590px] text-[31px] leading-[1.02] text-ink sm:text-[38px] lg:text-[44px]">{leak.heading}</h2>
              </div>
              <p className="max-w-[620px] text-[14px] leading-[1.7] text-body sm:text-[15px]">{leak.intro}</p>
            </div>

            <div className="mt-9 overflow-hidden rounded-[12px] border border-rule bg-white sm:mt-10">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">Illustrative aged specialty referrals and their unowned next actions</caption>
                <thead className="hidden border-b border-rule bg-white md:table-header-group">
                  <tr>
                    {["Referral", "Specialty", "Last signal", "Age", "Unowned next action"].map((label) => (
                      <th key={label} scope="col" className="label px-5 py-3 !text-[9px] font-medium text-mute">{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="block divide-y divide-rule md:table-row-group">
                  {leak.rows.map((row) => (
                    <tr key={row.patient} className="block px-5 py-4 md:table-row md:px-0 md:py-0">
                      <td className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-1.5 md:table-cell md:px-5 md:py-5">
                        <span className="label !text-[9px] text-mute md:hidden">Referral</span>
                        <span className="text-[13px] font-semibold text-ink">{row.patient}</span>
                      </td>
                      <td className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-1.5 md:table-cell md:px-5 md:py-5">
                        <span className="label !text-[9px] text-mute md:hidden">Specialty</span>
                        <span className="text-[12.5px] text-body">{row.specialty}</span>
                      </td>
                      <td className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-1.5 md:table-cell md:px-5 md:py-5">
                        <span className="label !text-[9px] text-mute md:hidden">Last signal</span>
                        <span className="text-[12.5px] text-body">{row.lastSignal}</span>
                      </td>
                      <td className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-1.5 md:table-cell md:px-5 md:py-5">
                        <span className="label !text-[9px] text-mute md:hidden">Age</span>
                        <span className="figure-num text-[11px] text-loss">{row.age}</span>
                      </td>
                      <td className="grid grid-cols-[96px_minmax(0,1fr)] gap-4 py-1.5 md:table-cell md:px-5 md:py-5">
                        <span className="label !text-[9px] text-mute md:hidden">Next action</span>
                        <span className="flex items-start gap-2 text-[12.5px] font-medium text-loss"><WarningCircle aria-hidden="true" size={16} className="mt-0.5 shrink-0" />{row.next}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-[10.5px] leading-[1.5] text-mute">{leak.note}</p>
          </div>
        </section>

        <section id="pilot" className="scroll-mt-24 bg-white px-4 pb-14 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-[1240px] rounded-[20px] bg-[#e4eee7] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[.94fr_1.06fr] lg:items-end lg:gap-16">
              <div>
                <p className="label !text-[10px] text-accent">{pilot.eyebrow}</p>
                <h2 className="display mt-5 max-w-[640px] text-[31px] leading-[1.02] text-ink sm:text-[38px] lg:text-[44px]">{pilot.heading}</h2>
              </div>
              <p className="max-w-[620px] text-[14px] leading-[1.7] text-body sm:text-[15px]">{pilot.intro}</p>
            </div>

            <ol className="mt-9 grid overflow-hidden rounded-[12px] border border-black/8 bg-white lg:grid-cols-3 sm:mt-10" aria-label="Proposed healthcare pilot steps">
              {pilot.steps.map((step, index) => (
                <li key={step.title} className={`p-5 sm:p-6 ${index > 0 ? "border-t border-rule lg:border-l lg:border-t-0" : ""}`}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="figure-num text-[10px] font-semibold text-accent">{String(index + 1).padStart(2, "0")}</p>
                    {index < pilot.steps.length - 1 ? <ArrowRight aria-hidden="true" size={15} className="hidden text-rule-mid lg:block" /> : null}
                  </div>
                  <h3 className="display mt-4 text-[19px] leading-[1.12] text-ink">{step.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.6] text-body">{step.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-7 flex items-start gap-2.5 text-[12.5px] font-medium leading-[1.55] text-accent-deep sm:text-[13.5px]">
              <CheckCircle aria-hidden="true" size={18} weight="fill" className="mt-0.5 shrink-0" />
              <p>{pilot.closing}</p>
            </div>

            <div className="mt-10 border-t border-accent/15 pt-10">
              <div className="grid gap-5 lg:grid-cols-[.76fr_1.24fr] lg:items-end lg:gap-12">
                <div>
                  <p className="label !text-[10px] text-accent">{workflow.eyebrow}</p>
                  <h3 className="display mt-4 text-[27px] leading-[1.04] text-ink sm:text-[32px]">{workflow.heading}</h3>
                </div>
                <p className="text-[13.5px] leading-[1.65] text-body sm:text-[14.5px]">{workflow.intro}</p>
              </div>
              <div className="mt-7">
                <ReferralTrace />
              </div>
            </div>
          </div>
        </section>

        <section id="economics" className="scroll-mt-24 bg-white px-4 pb-14 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-[1240px] rounded-[20px] bg-[#191612] px-6 py-9 text-white sm:px-10 sm:py-11 lg:px-12 lg:py-12">
            <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-16">
              <div>
                <p className="label !text-[10px] text-[#a39d96]">{guardrails.eyebrow}</p>
                <h2 className="display mt-5 max-w-[650px] text-[31px] leading-[1.02] text-white sm:text-[38px] lg:text-[44px]">{guardrails.heading}</h2>
              </div>
              <p className="max-w-[620px] text-[14px] leading-[1.7] text-[#c9c5bf] sm:text-[15px]">{guardrails.intro}</p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_.92fr] lg:gap-10">
              <ul className="grid grid-cols-2 gap-3">
                {guardrails.items.map((item, index) => {
                  const Icon = guardrailIcons[index];
                  return (
                    <li key={item.title} className="rounded-[10px] border border-white/10 p-4 sm:p-5">
                      <Icon aria-hidden="true" size={19} className="text-[#54a97a]" />
                      <h3 className="mt-4 text-[13px] font-semibold leading-[1.35] text-white sm:text-[14px]">{item.title}</h3>
                      <p className="mt-2 text-[11.5px] leading-[1.55] text-[#bdb8b2] sm:text-[12.5px] sm:leading-[1.6]">{item.body}</p>
                    </li>
                  );
                })}
              </ul>

              <div className="overflow-hidden rounded-[14px] bg-white text-ink">
                <div className="bg-accent p-6 text-white sm:p-7">
                  <p className="label !text-[9px] text-white/70">{economics.eyebrow}</p>
                  <FirstAidKit aria-hidden="true" size={26} className="mt-7" />
                  <h3 className="display mt-4 text-[27px] leading-[1.05] text-white">{economics.billable.title}</h3>
                  <p className="mt-4 text-[13.5px] leading-[1.65] text-white/85">{economics.billable.body}</p>
                </div>
                <div className="bg-[#f5f4f2] p-6 sm:p-7">
                  <p className="label !text-[9px] text-mute">$0 outcome fee</p>
                  <ul className="mt-5 divide-y divide-rule border-y border-rule">
                    {economics.zeroFee.map((item) => (
                      <li key={item} className="flex items-start gap-3 py-3.5 text-[13px] font-medium leading-[1.45] text-ink">
                        <CheckCircle aria-hidden="true" size={17} className="mt-0.5 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="flex items-start gap-2.5 border-t border-rule px-6 py-4 text-[11px] leading-[1.55] text-mute sm:px-7">
                  <WarningCircle aria-hidden="true" size={15} className="mt-0.5 shrink-0" />
                  {economics.note}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="answers" className="scroll-mt-24 bg-white px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="mx-auto max-w-[1240px]">
            <div className="grid gap-8 lg:grid-cols-[.58fr_1.42fr] lg:gap-16">
              <div>
                <p className="label !text-[10px] text-accent">Straight answers</p>
                <h2 className="display mt-4 text-[29px] leading-[1.04] text-ink sm:text-[34px]">Before you share a queue.</h2>
              </div>
              <dl className="divide-y divide-rule border-y border-rule">
                {answers.map(({ q, a }) => (
                  <div key={q} className="grid gap-2 py-5 sm:grid-cols-[.8fr_1.2fr] sm:gap-8 sm:py-6">
                    <dt className="text-[14px] font-semibold leading-[1.5] text-ink">{q}</dt>
                    <dd className="text-[13.5px] leading-[1.65] text-body">{a}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <FinalCta
          heading={finalCta.heading}
          body={finalCta.body}
          emailPlaceholder="Enter your work email"
          buttonLabel="Discuss a pilot"
          helperText="Work email only · reply within one business day"
          lane="healthcare"
          variant="landing"
        />
      </main>

      <SiteFooter variant="landing" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
