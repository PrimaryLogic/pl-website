import {
  ArrowsClockwise,
  CheckCircle,
  Clock,
  Compass,
  EyeSlash,
  Lightning,
  ListChecks,
  PhoneSlash,
  SealCheck,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import {
  controls,
  how,
  leak,
  pilot,
  pricing,
} from "@/lib/content/positioning";
import { homeNav } from "@/lib/content";
import AnalyticsBridge from "../AnalyticsBridge";
import EmailCapture from "../EmailCapture";
import SiteFooter from "../SiteFooter";
import SiteNav from "../SiteNav";
import CaseSwitcher from "./CaseSwitcher";
import RecoveryVisual from "./RecoveryVisual";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Primary Logic",
  url: siteUrl,
  description:
    "Primary Logic works the leads, patients, and cases a team can’t get to — by phone, text, and email — until the outcome is verified in the customer’s own system. Priced per completed outcome.",
}).replace(/</g, "\\u003c");

const leakIcons = [Clock, PhoneSlash, EyeSlash];
const howIcons = [Lightning, ArrowsClockwise, Compass, CheckCircle];
const tenetIcons = [ShieldCheck, ListChecks, SealCheck];

function SectionHead({
  eyebrow,
  heading,
  body,
  align = "left",
}: {
  eyebrow: string;
  heading: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`pl-section-head${align === "center" ? " pl-section-head--center" : ""}`}>
      <p className="pl-eyebrow">{eyebrow}</p>
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

        {/* 2 · The leak */}
        <section id="problem" className="pl-section">
          <div className="pl-container">
            <SectionHead eyebrow={leak.eyebrow} heading={leak.heading} body={leak.body} />
            <div className="pl-leak">
              <ol className="pl-leak__moments">
                {leak.moments.map((m, i) => {
                  const Ico = leakIcons[i % leakIcons.length];
                  return (
                  <li key={m.title}>
                    <span className={`pl-leak__icon pl-leak__icon--${i + 1}`}><Ico aria-hidden="true" size={18} /></span>
                    <div>
                      <h3>{m.title}</h3>
                      <p>{m.body}</p>
                    </div>
                  </li>
                  );
                })}
              </ol>
              <RecoveryVisual />
            </div>
          </div>
        </section>

        {/* 3 · How it works — principles strip */}
        <section id="how" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={how.eyebrow} heading={how.heading} body={how.body} />
            <ul className="pl-principles">
              {how.steps.map((st, i) => {
                const Ico = howIcons[i % howIcons.length];
                return (
                  <li key={st.title} className="pl-principle">
                    <span className="pl-principle__icon"><Ico aria-hidden="true" size={18} /></span>
                    <div>
                      <h3>{st.title}</h3>
                      <p>{st.body}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* 5 · Operating authority */}
        <section id="authority" className="pl-section">
          <div className="pl-container">
            <SectionHead eyebrow={controls.eyebrow} heading={controls.heading} body={controls.body} />
            <ol className="pl-tenets">
              {controls.principles.map((pr, i) => {
                const Ico = tenetIcons[i % tenetIcons.length];
                return (
                  <li key={pr.title} className="pl-tenet">
                    <div className="pl-tenet__head">
                      <span className="pl-tenet__icon"><Ico aria-hidden="true" size={18} weight="fill" /></span>
                      <h3>{pr.title}</h3>
                    </div>
                    <p className="pl-tenet__body">{pr.body}</p>
                    <ul className="pl-tenet__tags">
                      {pr.tags.map((t) => (
                        <li key={t.label}><strong>{t.label}</strong><span>{t.detail}</span></li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* 6 · Pricing */}
        <section id="pricing" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={pricing.eyebrow} heading={pricing.heading} body={pricing.body} />
            <div className="pl-terms-card">
              <ol className="pl-terms-card__steps">
                {pricing.steps.map((st, i) => (
                  <li key={st.key} className={`pl-terms-card__step${st.emphasized ? " is-emph" : ""}`}>
                    <h3><span className="pl-terms-card__num">{i + 1}</span>{st.key}</h3>
                    <p>{st.body}</p>
                  </li>
                ))}
              </ol>
              <div className="pl-terms-card__foot">
                <p className="pl-terms-card__trust"><CheckCircle aria-hidden="true" size={18} weight="fill" /> {pricing.trust}</p>
                <a href={pricing.cta.href} className="pl-button pl-button--primary" data-analytics="pricing-cta">{pricing.cta.label}</a>
              </div>
            </div>
          </div>
        </section>

        {/* 9 · Pilot */}
        <section id="pilot" className="pl-section pl-pilot pl-pilot--center">
          <div className="pl-container">
            <div className="pl-pilot__copy">
              <h2>{pilot.heading}</h2>
              <p className="pl-pilot__body">{pilot.body}</p>
              <div className="pl-pilot__form">
                <EmailCapture id="homepage-pilot" variant="landing" buttonLabel={pilot.form.button} emailPlaceholder={pilot.form.placeholder} lane="homepage" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="operator" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
