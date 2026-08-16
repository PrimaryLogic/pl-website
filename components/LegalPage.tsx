import { CheckCircle, Gavel, Notebook, ShieldCheck, UserCircle } from "@phosphor-icons/react/dist/ssr";
import AnalyticsBridge from "./AnalyticsBridge";
import EmailCapture from "./EmailCapture";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import CaseTimeline from "./home/CaseTimeline";
import { legalLane, legalNav } from "@/lib/content/legal";
import { verticals } from "@/lib/content/positioning";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "PI Legal Intake | Primary Logic",
  url: `${siteUrl}/legal`,
  description: "After-hours and overflow intake for personal-injury firms, worked to a signed retainer and priced per signed case.",
}).replace(/</g, "\\u003c");

const guardrailIcons = [Gavel, ShieldCheck, Notebook, UserCircle];
const story = verticals.find((v) => v.key === "legal")!;

export default function LegalPage() {
  return (
    <div className="pl-site">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnalyticsBridge />
      <SiteNav nav={legalNav} variant="operator" />

      <main id="main-content">
        <section className="pl-hero">
          <div className="pl-container">
            <div className="pl-hero__stack">
              <div className="pl-hero__head">
                <div className="pl-hero__copy">
                  <p className="pl-eyebrow">{legalLane.eyebrow}</p>
                  <h1 className="pl-hero__title">
                    <span>{legalLane.heading.lead}</span> <em>{legalLane.heading.accent}</em>
                  </h1>
                </div>
                <div className="pl-hero__aside">
                <p className="pl-hero__body">{legalLane.body}</p>
                <div className="pl-hero__actions">
                  <a href="#pilot" className="pl-button pl-button--primary pl-button--lg" data-analytics="hero-primary">Start a pilot</a>
                  <a href="#guardrails" className="pl-button pl-button--ghost pl-button--lg">See the guardrails</a>
                </div>
                <ul className="pl-hero__proof" aria-label="Commercial terms">
                  {legalLane.proof.map((p) => <li key={p}><CheckCircle aria-hidden="true" size={16} weight="fill" /> {p}</li>)}
                </ul>
                </div>
              </div>
              <CaseTimeline story={story} />
            </div>
          </div>
        </section>

        <section id="problem" className="pl-section pl-section--tint">
          <div className="pl-container">
            <div className="pl-section-head">
              <p className="pl-eyebrow">{legalLane.leak.eyebrow}</p>
              <h2>{legalLane.leak.heading}</h2>
              <p className="pl-section-head__body">{legalLane.leak.body}</p>
            </div>
            <div className="pl-leak">
              <ol className="pl-leak__moments">
                {legalLane.leak.cards.map((c, i) => (
                  <li key={c.title}>
                    <span className="pl-leak__index">{i + 1}</span>
                    <div><h3>{c.title}</h3><p>{c.body}</p></div>
                  </li>
                ))}
              </ol>
              <dl className="pl-stats">
                <div className="pl-stat">
                  <dd>{legalLane.leak.stat.figure}</dd>
                  <dt>{legalLane.leak.stat.label}</dt>
                  <p className="pl-stat__source">{legalLane.leak.stat.source}</p>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="guardrails" className="pl-section">
          <div className="pl-container">
            <div className="pl-section-head">
              <p className="pl-eyebrow">{legalLane.guardrails.eyebrow}</p>
              <h2>{legalLane.guardrails.heading}</h2>
            </div>
            <div className="pl-controls">
              {legalLane.guardrails.items.map((g, i) => {
                const Ico = guardrailIcons[i % guardrailIcons.length];
                return (
                  <article key={g.title} className="pl-control">
                    <Ico aria-hidden="true" size={22} />
                    <h3>{g.title}</h3>
                    <p>{g.body}</p>
                  </article>
                );
              })}
            </div>
            <p className="pl-footnote">{legalLane.guardrails.note}</p>
          </div>
        </section>

        <section id="pilot" className="pl-section pl-pilot pl-section--tint">
          <div className="pl-container">
            <div className="pl-pilot__grid">
              <div className="pl-pilot__copy">
                <p className="pl-eyebrow">{legalLane.pilot.eyebrow}</p>
                <h2>{legalLane.pilot.heading}</h2>
                <p className="pl-pilot__body">{legalLane.pilot.body}</p>
                <div className="pl-pilot__form">
                  <EmailCapture id="legal-pilot" variant="landing" buttonLabel="Start a pilot" emailPlaceholder="Work email" lane="legal" />
                </div>
              </div>
              <ol className="pl-pilot__steps">
                {legalLane.pilot.steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="pl-pilot__index">{i + 1}</span>
                    <div><h3>{s.title}</h3><p>{s.body}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="operator" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
