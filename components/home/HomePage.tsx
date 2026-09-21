import Link from "next/link";
import AnalyticsBridge from "../AnalyticsBridge";
import { outcomePositioning as copy } from "@/lib/content/outcomes";
import styles from "./OutcomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.page}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnalyticsBridge />
      <div className={styles.column}>
        <header className={styles.header}>
          <Link className={styles.wordmark} href="/" aria-label="Primary Logic home">Primary Logic</Link>
          <a href={copy.contactHref} data-analytics="homepage-header-contact">Get in touch</a>
        </header>
        <main id="main-content">
          <section className={styles.intro} aria-labelledby="intro-heading">
            <h1 id="intro-heading">{copy.heading}</h1>
            <p className={styles.lead}>Primary Logic is building for the future where AGI does the work of running a business, so the focus is on your customers.</p>
            <p>Understanding what customers need, earning their trust, and building lasting relationships should be at the center of a company. Behind those relationships is an enormous amount of work: building the product, delivering it, managing finances, coordinating teams, and keeping the business running.</p>
            <p>We believe artificial general intelligence will be able to do that work across every part of a business. A small team should be able to serve more customers and deliver more for each of them without building a larger organization to support it.</p>
            <p>Getting there means giving intelligence a place to work. It needs access to the company’s software and information, a memory of what has happened, and the ability to act. It needs to carry work across systems, recover when something goes wrong, and see a job through over days or months.</p>
            <p>That is what we’re building at Primary Logic: agents that operate computers, use the tools a business already relies on, and coordinate work across the company. As models become more capable, these agents should be able to take on more of the business without demanding more of the team’s attention.</p>
          </section>

          <section className={`${styles.section} ${styles.contact}`} aria-labelledby="contact-heading">
            <h2 id="contact-heading">Build this future with us.</h2>
            <p>Bringing AGI into businesses means solving problems that only appear when systems do real work: keeping agents coordinated, recovering from failures, and learning from outcomes that may take months to observe.</p>
            <p>If you want to help build these systems or put them to work in your company, write to us at <a href={`mailto:${copy.email}`} data-analytics="homepage-pilot-cta">{copy.email}</a>.</p>
          </section>
        </main>
        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Primary Logic</span>
          <nav aria-label="Legal pages"><Link href="/privacy-policy">Privacy</Link></nav>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: "Primary Logic", url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com", description: copy.description }).replace(/</g, "\\u003c") }} />
    </div>
  );
}
