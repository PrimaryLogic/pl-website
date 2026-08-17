import { ArrowsLeftRight, Check, CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";
import AnalyticsBridge from "./AnalyticsBridge";
import EmailCapture from "./EmailCapture";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import { getLane, type LaneContent } from "@/lib/content/lanes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";

function SectionHead({ eyebrow, heading, body }: { eyebrow: string; heading: string; body?: string }) {
  return (
    <div className="pl-section-head">
      <p className="pl-eyebrow">{eyebrow}</p>
      <h2>{heading}</h2>
      {body ? <p className="pl-section-head__body">{body}</p> : null}
    </div>
  );
}

/**
 * One lane page. The homepage carries the general story; this page carries
 * the specifics a buyer in this lane asks for: which queues we take, what we
 * do at each moment, where the licensed line sits, how a case can end, what
 * exactly is billed, and what a pilot looks like.
 */
export default function LanePage({ slug }: { slug: LaneContent["slug"] }) {
  const lane = getLane(slug);
  const structuredData = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: lane.title,
    url: `${siteUrl}/${lane.slug}`,
    description: lane.description,
  }).replace(/</g, "\\u003c");

  return (
    <div className="pl-site">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnalyticsBridge />
      <SiteNav nav={lane.nav} variant="operator" />

      <main id="main-content">
        {/* Hero: copy + the pilot brief card */}
        <section className="pl-hero pl-hero--lane">
          <div className="pl-container">
            <div className="pl-lane-hero">
              <div className="pl-hero__center pl-lane-hero__copy">
                <p className="pl-eyebrow">{lane.hero.eyebrow}</p>
                <h1 className="pl-hero__title">{lane.hero.heading}</h1>
                <p className="pl-hero__body">{lane.hero.body}</p>
                <div className="pl-hero__form">
                  <EmailCapture id={`${lane.slug}-hero`} variant="landing" buttonLabel={lane.hero.form.button} emailPlaceholder={lane.hero.form.placeholder} lane={`${lane.slug}-hero`} />
                </div>
              </div>
              <aside className="pl-brief" aria-label={lane.hero.brief.title}>
                <p className="pl-brief__title">{lane.hero.brief.title}</p>
                <dl className="pl-brief__rows">
                  {lane.hero.brief.rows.map((r) => (
                    <div key={r.label} className="pl-brief__row">
                      <dt>{r.label}</dt>
                      <dd>{r.value}</dd>
                    </div>
                  ))}
                </dl>
                {lane.hero.brief.note ? <p className="pl-brief__note">{lane.hero.brief.note}</p> : null}
              </aside>
            </div>
          </div>
        </section>

        {/* What we take */}
        <section id="queues" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={lane.queues.eyebrow} heading={lane.queues.heading} body={lane.queues.body} />
            <ul className="pl-queues">
              {lane.queues.items.map((q) => (
                <li key={q.title} className="pl-queue">
                  <h3>{q.title}</h3>
                  <p>{q.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Where it breaks — and what we do */}
        <section id="problem" className="pl-section">
          <div className="pl-container">
            <SectionHead eyebrow={lane.leak.eyebrow} heading={lane.leak.heading} body={lane.leak.body} />
            <div className="pl-leak pl-leak--lane">
              <ol className="pl-moments">
                {lane.leak.moments.map((m, i) => (
                  <li key={m.title} className="pl-moment">
                    <div className="pl-moment__head">
                      <span className="pl-leak__index">{i + 1}</span>
                      <h3>{m.title}</h3>
                    </div>
                    <div className="pl-moment__cols">
                      <div className="pl-moment__col">
                        <span className="pl-moment__label pl-moment__label--breaks">Where it breaks</span>
                        <p>{m.breaks}</p>
                      </div>
                      <div className="pl-moment__col">
                        <span className="pl-moment__label pl-moment__label--we">What we do</span>
                        <p>{m.weDo}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
              <dl className="pl-stats">
                {lane.leak.stats.map((s) => (
                  <div key={s.figure} className="pl-stat">
                    <dd>{s.figure}</dd>
                    <dt>{s.label}</dt>
                    <p className="pl-stat__source">{s.source}</p>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* We handle / your team keeps */}
        <section id="guardrails" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={lane.split.eyebrow} heading={lane.split.heading} body={lane.split.body} />
            <div className="pl-setup">
              <div className="pl-setup__col pl-setup__col--ours">
                <div className="pl-setup__title">
                  <h3>{lane.split.ours.title}</h3>
                  <span>{lane.split.ours.tag}</span>
                </div>
                <ul>
                  {lane.split.ours.items.map((it) => <li key={it}><Check aria-hidden="true" size={16} weight="bold" /> {it}</li>)}
                </ul>
              </div>
              <div className="pl-setup__arrow" aria-hidden="true"><ArrowsLeftRight size={22} weight="bold" /></div>
              <div className="pl-setup__col pl-setup__col--yours">
                <div className="pl-setup__title">
                  <h3>{lane.split.yours.title}</h3>
                  <span>{lane.split.yours.tag}</span>
                </div>
                <ul>
                  {lane.split.yours.items.map((it) => <li key={it}><Check aria-hidden="true" size={16} weight="bold" /> {it}</li>)}
                </ul>
              </div>
            </div>
            {lane.split.note ? <p className="pl-footnote">{lane.split.note}</p> : null}
          </div>
        </section>

        {/* How a case ends */}
        <section id="endings" className="pl-section">
          <div className="pl-container">
            <SectionHead eyebrow={lane.endings.eyebrow} heading={lane.endings.heading} body={lane.endings.body} />
            <ul className="pl-endings">
              {lane.endings.items.map((e) => (
                <li key={e.label} className={`pl-ending${e.billable ? " pl-ending--billable" : ""}`}>
                  <div className="pl-ending__head">
                    {e.billable ? <CheckCircle aria-hidden="true" size={18} weight="fill" /> : <span className="pl-ending__dot" aria-hidden="true" />}
                    <h3>{e.label}</h3>
                    <span className="pl-ending__tag">{e.billable ? "Billed" : "$0"}</span>
                  </div>
                  <p>{e.body}</p>
                </li>
              ))}
            </ul>
            <p className="pl-footnote">{lane.endings.note}</p>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={lane.pricing.eyebrow} heading={lane.pricing.heading} body={lane.pricing.body} />
            <div className="pl-pricing__rules pl-pricing__rules--row">
              <div className="pl-rule pl-rule--billable">
                <CheckCircle aria-hidden="true" size={22} weight="fill" />
                <div>
                  <h3>{lane.pricing.billable.title}</h3>
                  <p>{lane.pricing.billable.body}</p>
                </div>
              </div>
              <div className="pl-rule pl-rule--free">
                <XCircle aria-hidden="true" size={22} weight="fill" />
                <div>
                  <h3>{lane.pricing.free.title}</h3>
                  <ul className="pl-rule__list">
                    {lane.pricing.free.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                </div>
              </div>
            </div>
            <p className="pl-footnote">{lane.pricing.note}</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="pl-section">
          <div className="pl-container">
            <SectionHead eyebrow={lane.faq.eyebrow} heading={lane.faq.heading} />
            <dl className="pl-faq">
              {lane.faq.items.map((f) => (
                <div key={f.q} className="pl-faq__item">
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Pilot */}
        <section id="pilot" className="pl-section pl-pilot">
          <div className="pl-container">
            <div className="pl-pilot__grid">
              <div className="pl-pilot__copy">
                <p className="pl-eyebrow">{lane.pilot.eyebrow}</p>
                <h2>{lane.pilot.heading}</h2>
                <p className="pl-pilot__body">{lane.pilot.body}</p>
                <div className="pl-pilot__form">
                  <EmailCapture id={`${lane.slug}-pilot`} variant="landing" buttonLabel={lane.pilot.form.button} emailPlaceholder={lane.pilot.form.placeholder} lane={lane.slug} />
                </div>
                <p className="pl-pilot__close"><CheckCircle aria-hidden="true" size={16} weight="fill" /> {lane.pilot.close}</p>
              </div>
              <ol className="pl-pilot__steps">
                {lane.pilot.steps.map((s, i) => (
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
          </div>
        </section>
      </main>

      <SiteFooter variant="operator" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
