import {
  ArrowsClockwise,
  Compass,
  Desktop,
  Lightning,
  ListChecks,
  Brain,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import {
  controls,
  how,
  leak,
  pilot,
} from "@/lib/content/positioning";
import { homeNav } from "@/lib/content";
import AnalyticsBridge from "../AnalyticsBridge";
import SiteFooter from "../SiteFooter";
import SiteNav from "../SiteNav";
import CaseSwitcher from "./CaseSwitcher";
import AgentGuide from "./AgentGuide";
import { PILOT_MAILTO } from "@/lib/content/shared";
import LearningSection from "./LearningSection";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Primary Logic",
  url: siteUrl,
  description:
    "Primary Logic builds AI contractors that handle administrative work in existing systems, coordinate with people, and follow through until the agreed result is verified.",
}).replace(/</g, "\\u003c");

const howIcons = [Desktop, Lightning, ArrowsClockwise, Compass];
const tenetIcons = [ShieldCheck, ListChecks, Brain];

function SectionHead({
  eyebrow,
  heading,
  body,
  align = "left",
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`pl-section-head${align === "center" ? " pl-section-head--center" : ""}`}>
      {eyebrow ? <p className="pl-eyebrow">{eyebrow}</p> : null}
      <h2>{heading}</h2>
      {body ? <p className="pl-section-head__body">{body}</p> : null}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="pl-site">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnalyticsBridge />
      <SiteNav nav={homeNav} variant="operator" />

      <main id="main-content">
        {/* 1 · Hero */}
        <section className="pl-hero">
          <div className="pl-container">
            <CaseSwitcher />
          </div>
        </section>

        {/* 2 · The entire job */}
        <section id="problem" className="pl-section">
          <div id="how" className="pl-container">
            <div className="pl-guided-heading">
              <SectionHead eyebrow={leak.eyebrow} heading={leak.heading} body={leak.body} />
              <AgentGuide agent="sunny" />
            </div>
            <ul className="pl-principles">
              {how.steps.map((st, i) => {
                const Ico = howIcons[i % howIcons.length];
                return (
                  <li key={st.title} className="pl-principle">
                    <div className="pl-principle__heading">
                      <span className="pl-principle__icon"><Ico aria-hidden="true" size={18} /></span>
                      <h3>{st.title}</h3>
                    </div>
                    <p>{st.body}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <LearningSection />

        {/* 5 · Operating authority */}
        <section id="authority" className="pl-section">
          <div className="pl-container">
            <div className="pl-guided-heading">
              <SectionHead eyebrow={controls.eyebrow} heading={controls.heading} body={controls.body} />
              <AgentGuide agent="lilac" />
            </div>
            <ol className="pl-tenets">
              {[2, 0, 1].map((i) => {
                const pr = controls.principles[i];
                const Ico = tenetIcons[i % tenetIcons.length];
                return (
                  <li key={pr.title} className="pl-tenet">
                    <div className="pl-tenet__head">
                      <span className="pl-tenet__icon"><Ico aria-hidden="true" size={18} weight="fill" /></span>
                      <h3>{pr.title}</h3>
                    </div>
                    <p className="pl-tenet__body">{pr.body}</p>
                    <div className="pl-control-example">
                      <p className="pl-control-example__label">{["Permissions", "Activity record", "Resolving a blocker"][i]}<span>Illustrative</span></p>
                      {i === 0 && <ul className="pl-permission-rows">
                        <li><span>Read billing records</span><span className="pl-control-status">Allowed</span></li>
                        <li><span>Offer approved payment plan</span><span className="pl-control-status">Allowed</span></li>
                        <li><span>Waive a balance</span><span className="pl-control-status pl-control-status--waiting">Approval required</span></li>
                      </ul>}
                      {i === 1 && <ol className="pl-audit-rows">
                        <li><span>Day 1</span><div><strong>Balance checked</strong><small>Statement reviewed in ModMed</small></div></li>
                        <li><span>Day 2</span><div><strong>Agreement recorded</strong><small>Two installments of $93</small></div></li>
                        <li><span>Day 16</span><div><strong>Payment verified</strong><small>Remaining balance: $0</small></div></li>
                      </ol>}
                      {i === 2 && <div className="pl-approval-example">
                        <blockquote>“I can’t pay the full amount today.”</blockquote>
                        <p>Recognizes a timing issue, checks approved terms, and offers two installments of $93.</p>
                        <div><span className="pl-control-status">Payment plan arranged</span><small>Follow-up scheduled</small></div>
                      </div>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* Get started */}
        <section id="pricing" className="pl-section pl-section--tint pl-closing">
          <div className="pl-container">
            <div id="pilot" className="pl-closing__start">
              <div className="pl-closing__copy">
                <h2>{pilot.heading}</h2>
                <div className="pl-closing__description">
                  {pilot.body}{" "}<AgentGuide agent="peach" inline />
                </div>
              </div>
              <a href={PILOT_MAILTO} className="pl-button pl-button--primary" data-analytics="homepage-pilot-cta">
                <span>{pilot.ctaLabel}</span><span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="operator" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
