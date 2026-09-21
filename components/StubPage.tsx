import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./home/OutcomePage.module.css";

export default function StubPage({ title, activePage, effectiveDate, effectiveDateTime, children }: {
  title: string;
  activePage: "privacy";
  effectiveDate: string;
  effectiveDateTime: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.page}>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className={styles.column}>
        <header className={styles.header}>
          <Link className={styles.wordmark} href="/">Primary Logic</Link>
          <Link href="/">Back to home</Link>
        </header>
        <main id="main-content" className={styles.intro}>
          <h1>{title}</h1>
          <p>Effective <time dateTime={effectiveDateTime}>{effectiveDate}</time></p>
          <div className={styles.legalCopy}>{children}</div>
        </main>
        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Primary Logic</span>
          <nav aria-label="Legal pages">
            <Link href="/privacy-policy" aria-current={activePage === "privacy" ? "page" : undefined}>Privacy</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
