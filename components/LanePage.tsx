import {
  ArrowsClockwise,
  ChatCircleText,
  CheckCircle,
  Clock,
  Compass,
  Database,
  EnvelopeSimple,
  EyeSlash,
  Lightning,
  Phone,
  PhoneSlash,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr";
import AnalyticsBridge from "./AnalyticsBridge";
import EmailCapture from "./EmailCapture";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import { getLane, laneNav, type LaneContent } from "@/lib/content/lanes";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";
const momentIcons = [Clock, PhoneSlash, EyeSlash];
const principleIcons = [Lightning, ArrowsClockwise, Compass, CheckCircle];

function SectionHead({ eyebrow, heading, body }: { eyebrow: string; heading: string; body?: string }) {
  return (
    <div className="pl-section-head">
      <p className="pl-eyebrow">{eyebrow}</p>
      <h2>{heading}</h2>
      {body ? <p className="pl-section-head__body">{body}</p> : null}
    </div>
  );
}

function nodeIcon(channel: string) {
  switch (channel) {
    case "SMS": return ChatCircleText;
    case "Phone": return Phone;
    case "Email": return EnvelopeSimple;
    case "System": return Database;
    default: return CheckCircle;
  }
}

/**
 * One lane page, built on the same sections and system as the homepage but
 * written for a single buyer as a short case study: the problem in their
 * queue, the solution, the economics, and the closing CTA.
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
      <SiteNav nav={laneNav} variant="operator" />

      <main id="main-content">
        {/* Hero */}
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
              </aside>
            </div>
          </div>
        </section>

        {/* Problem */}
        <section id="problem" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={lane.problem.eyebrow} heading={lane.problem.heading} body={lane.problem.body} />
            <div className="pl-leak">
              <ol className="pl-leak__moments">
                {lane.problem.moments.map((m, i) => {
                  const Ico = momentIcons[i % momentIcons.length];
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
              <dl className="pl-stats">
                {lane.problem.stats.map((s) => (
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

        {/* How it works */}
        <section id="how" className="pl-section">
          <div className="pl-container">
            <SectionHead eyebrow={lane.how.eyebrow} heading={lane.how.heading} body={lane.how.body} />
            <div className="pl-how">
              <div className="pl-how__copy">
                <ol className="pl-how__list">
                  {lane.how.principles.map((s, i) => {
                    const Ico = principleIcons[i % principleIcons.length];
                    return (
                      <li key={s.title}>
                        <span className="pl-how__icon"><Ico aria-hidden="true" size={18} /></span>
                        <div>
                          <h3>{s.title}</h3>
                          <p>{s.body}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
              <div className="pl-how__visual" aria-label={lane.how.example.title}>
                <div className="pl-how__visual-head">
                  <span className="pl-how__visual-title">{lane.how.example.title}</span>
                  <span className="pl-how__visual-person">{lane.how.example.person}</span>
                </div>
                <ol className="pl-chain">
                  {lane.how.example.nodes.map((n, i) => {
                    const Ico = nodeIcon(n.channel);
                    const last = i === lane.how.example.nodes.length - 1;
                    return (
                      <li key={n.label} className={`pl-chain__node${last ? " is-outcome" : ""}${n.channel === "System" ? " is-system" : ""}`}>
                        <span className="pl-chain__icon"><Ico aria-hidden="true" size={18} weight={last ? "fill" : "regular"} /></span>
                        <span className="pl-chain__label">{n.label}</span>
                        <span className="pl-chain__when">{n.when}</span>
                      </li>
                    );
                  })}
                </ol>
                <div className="pl-how__memory">
                  <span className="pl-how__memory-label"><Sparkle aria-hidden="true" size={13} weight="fill" /> Memory</span>
                  {lane.how.example.memory.map((m) => <span key={m} className="pl-how__chip">{m}</span>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Economics */}
        <section id="economics" className="pl-section pl-section--tint">
          <div className="pl-container">
            <SectionHead eyebrow={lane.economics.eyebrow} heading={lane.economics.heading} body={lane.economics.body} />
            <ul className="pl-ways">
              {lane.economics.rows.map((r) => (
                <li key={r.label} className={`pl-ways__card${r.ours ? " is-ours" : ""}`}>
                  <span className={`pl-ways__tag${r.ours ? " is-outcome" : ""}`}>{r.ours ? "Paid on outcome" : "Paid regardless"}</span>
                  <h3 className="pl-ways__label">{r.label}</h3>
                  <p className="pl-ways__detail">{r.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Closing CTA */}
        <section id="pilot" className="pl-section pl-pilot pl-pilot--center">
          <div className="pl-container">
            <div className="pl-pilot__copy">
              <h2>{lane.pilot.heading}</h2>
              <p className="pl-pilot__body">{lane.pilot.body}</p>
              <div className="pl-pilot__form">
                <EmailCapture id={`${lane.slug}-pilot`} variant="landing" buttonLabel={lane.pilot.form.button} emailPlaceholder={lane.pilot.form.placeholder} lane={lane.slug} />
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
