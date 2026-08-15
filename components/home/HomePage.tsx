import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle,
  Lock,
  Minus,
  Notebook,
  ShieldCheck,
  UserCircle,
  XCircle,
} from "@phosphor-icons/react/dist/ssr";
import {
  closing,
  contrast,
  controls,
  how,
  lanes,
  leak,
  pilot,
  pricing,
  setup,
} from "@/lib/content/positioning";
import { homeNav } from "@/lib/content";
import AnalyticsBridge from "../AnalyticsBridge";
import EmailCapture from "../EmailCapture";
import SiteFooter from "../SiteFooter";
import SiteNav from "../SiteNav";
import CaseSwitcher from "./CaseSwitcher";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Primary Logic",
  url: siteUrl,
  description:
    "Primary Logic works the leads, patients, and cases a team can’t get to — by phone, text, and email — until the outcome is verified in the customer’s own system. Priced per completed outcome.",
}).replace(/</g, "\\u003c");

const controlIcons = [UserCircle, Lock, ShieldCheck, Notebook];

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
        <section id="problem" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={leak.eyebrow} heading={leak.heading} body={leak.body} />
            <div className="pl-leak">
              <ol className="pl-leak__moments">
                {leak.moments.map((m, i) => (
                  <li key={m.title}>
                    <span className="pl-leak__index">{i + 1}</span>
                    <div>
                      <h3>{m.title}</h3>
                      <p>{m.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <dl className="pl-stats">
                {leak.stats.map((s) => (
                  <div key={s.figure} className="pl-stat">
                    <dt>{s.label}</dt>
                    <dd>{s.figure}</dd>
                    <p className="pl-stat__source">{s.source}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* 3 · How it works */}
        <section id="how" className="pl-section">
          <div className="pl-container">
            <SectionHead eyebrow={how.eyebrow} heading={how.heading} body={how.body} />
            <ol className="pl-steps">
              {how.steps.map((s, i) => (
                <li key={s.title} className="pl-step">
                  <span className="pl-step__index">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4 · Contrast */}
        <section id="contrast" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={contrast.eyebrow} heading={contrast.heading} body={contrast.body} />
            <div className="pl-contrast" role="table" aria-label="Assistant versus Primary Logic">
              <div className="pl-contrast__head" role="row">
                <span role="columnheader" className="pl-contrast__a">{contrast.columns.a}</span>
                <span role="columnheader" className="pl-contrast__b">{contrast.columns.b}</span>
              </div>
              {contrast.rows.map((r) => (
                <div key={r.a} className="pl-contrast__row" role="row">
                  <span role="cell" className="pl-contrast__a"><Minus aria-hidden="true" size={16} /> {r.a}</span>
                  <span role="cell" className="pl-contrast__b"><Check aria-hidden="true" size={16} weight="bold" /> {r.b}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · Setup */}
        <section id="setup" className="pl-section">
          <div className="pl-container">
            <SectionHead eyebrow={setup.eyebrow} heading={setup.heading} body={setup.body} />
            <div className="pl-setup">
              <div className="pl-setup__col pl-setup__col--yours">
                <div className="pl-setup__title">
                  <h3>{setup.yours.title}</h3>
                  <span>{setup.yours.tag}</span>
                </div>
                <ul>
                  {setup.yours.items.map((it) => <li key={it}><Check aria-hidden="true" size={16} weight="bold" /> {it}</li>)}
                </ul>
              </div>
              <div className="pl-setup__arrow" aria-hidden="true"><ArrowRight size={22} weight="bold" /></div>
              <div className="pl-setup__col pl-setup__col--ours">
                <div className="pl-setup__title">
                  <h3>{setup.ours.title}</h3>
                  <span>{setup.ours.tag}</span>
                </div>
                <ul>
                  {setup.ours.items.map((it) => <li key={it}><Check aria-hidden="true" size={16} weight="bold" /> {it}</li>)}
                </ul>
              </div>
            </div>
            <p className="pl-footnote">{setup.footnote}</p>
          </div>
        </section>

        {/* 6 · Pricing */}
        <section id="pricing" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={pricing.eyebrow} heading={pricing.heading} body={pricing.body} />
            <div className="pl-pricing">
              <table className="pl-compare">
                <thead>
                  <tr>
                    {pricing.compare.columns.map((c, i) => (
                      <th key={i} scope="col" className={i === 2 ? "is-primary" : ""}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pricing.compare.rows.map((row) => (
                    <tr key={row[0]}>
                      <th scope="row">{row[0]}</th>
                      <td data-label={pricing.compare.columns[1]}>{row[1]}</td>
                      <td className="is-primary" data-label={pricing.compare.columns[2]}>{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pl-pricing__rules">
                <div className="pl-rule pl-rule--billable">
                  <CheckCircle aria-hidden="true" size={22} weight="fill" />
                  <div>
                    <h3>{pricing.billable.title}</h3>
                    <p>{pricing.billable.body}</p>
                  </div>
                </div>
                <div className="pl-rule pl-rule--free">
                  <XCircle aria-hidden="true" size={22} weight="fill" />
                  <div>
                    <h3>{pricing.free.title}</h3>
                    <p>{pricing.free.body}</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="pl-footnote">{pricing.note}</p>
          </div>
        </section>

        {/* 7 · Controls */}
        <section id="guardrails" className="pl-section">
          <div className="pl-container">
            <SectionHead eyebrow={controls.eyebrow} heading={controls.heading} />
            <div className="pl-controls">
              {controls.items.map((c, i) => {
                const Ico = controlIcons[i % controlIcons.length];
                return (
                  <article key={c.title} className="pl-control">
                    <Ico aria-hidden="true" size={22} />
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* 8 · Lanes */}
        <section id="lanes" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={lanes.eyebrow} heading={lanes.heading} body={lanes.body} />
            <div className="pl-lanes">
              {lanes.cards.map((card) => (
                <Link key={card.key} href={card.href} className={`pl-lane pl-lane--${card.key}`} data-analytics={`lane-${card.key}`}>
                  <h3>{card.title}</h3>
                  <p className="pl-lane__outcome"><span>You pay per</span><strong>{card.outcome}</strong></p>
                  <p className="pl-lane__body">{card.body}</p>
                  <p className="pl-lane__verified"><Check aria-hidden="true" size={14} weight="bold" /> {card.verified}</p>
                  <span className="pl-lane__link">Learn more <ArrowUpRight aria-hidden="true" size={15} weight="bold" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 9 · Pilot */}
        <section id="pilot" className="pl-section pl-pilot">
          <div className="pl-container">
            <div className="pl-pilot__grid">
              <div className="pl-pilot__copy">
                <p className="pl-eyebrow">{pilot.eyebrow}</p>
                <h2>{pilot.heading}</h2>
                <p className="pl-pilot__body">{pilot.body}</p>
                <div className="pl-pilot__form">
                  <EmailCapture id="homepage-pilot" variant="landing" buttonLabel={pilot.form.button} emailPlaceholder={pilot.form.placeholder} helperText={pilot.form.helper} lane="homepage" />
                </div>
                <ul className="pl-pilot__summary" aria-label="Pilot design">
                  {pilot.summary.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <ol className="pl-pilot__steps">
                {pilot.steps.map((s, i) => (
                  <li key={s.title}>
                    <span className="pl-pilot__index">{i + 1}</span>
                    <div>
                      <h3>{s.title}</h3>
                      <p>{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <p className="pl-closing">{closing.line}</p>
          </div>
        </section>
      </main>

      <SiteFooter variant="operator" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
