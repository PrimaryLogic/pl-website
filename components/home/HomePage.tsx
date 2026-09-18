import {
  ListChecks,
  Brain,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import {
  controls,
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
    "Primary Logic builds long-horizon agents that handle administrative work in existing systems, coordinate with people, and follow through until the agreed result is verified.",
}).replace(/</g, "\\u003c");

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
                      <p className="pl-control-example__label">{["Permissions", "A quick check-in", "Resolving a blocker"][i]}</p>
                      {i === 0 && <ul className="pl-permission-rows">
                        <li><span>Read billing records</span><span className="pl-control-status">Allowed</span></li>
                        <li><span>Offer approved payment plan</span><span className="pl-control-status">Allowed</span></li>
                        <li><span>Waive a balance</span><span className="pl-control-status pl-control-status--waiting">Approval required</span></li>
                      </ul>}
                      {i === 1 && <div className="pl-agent-email">
                        <div className="pl-agent-email__message">
                          <span className="pl-agent-email__sender">You <span>→ Primary Logic</span></span>
                          <p>What happened with Maya’s balance?</p>
                        </div>
                        <div className="pl-agent-email__message pl-agent-email__reply">
                          <span className="pl-agent-email__sender">Primary Logic <span>→ You</span></span>
                          <p>Maya paid both $93 installments, and I confirmed her balance is $0 in ModMed. No further follow-up needed.</p>
                        </div>
                      </div>}
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
