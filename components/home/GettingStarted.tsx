import { Check, EnvelopeSimple, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";
import styles from "./GettingStarted.module.css";

export default function GettingStarted({ demoControl }: { demoControl?: ReactNode }) {
  return (
    <section id="getting-started" className={styles.section} aria-label="How you get started">
      <div className={styles.demoInvitation}>{demoControl}</div>
      <div id="how">
        <ol className={styles.steps}>
          <li className={styles.step}>
            <div className={`${styles.scene} ${styles.request}`}>
              <span className={styles.stepLabel}>Step 1</span>
              <div className={`${styles.paper} ${styles.requestMail}`}>
                <div className={styles.messageLabel}><EnvelopeSimple size={17} aria-hidden="true" /><span>You <ArrowRight size={12} aria-hidden="true" /> Primary Logic</span></div>
                <p className={styles.bigMessage}>Improve our revenue recovery rate.</p>
                <p className={styles.messageDetail}>We recover 42% of balances over 60 days.</p>
              </div>
            </div>
            <div className={styles.caption}>
              <h3>Give us the business outcome.</h3>
              <p>Tell us what you want to improve and how you measure it.</p>
            </div>
          </li>
          <li className={styles.step}>
            <div className={`${styles.scene} ${styles.setup}`}>
              <span className={styles.stepLabel}>Step 2</span>
              <div className={`${styles.paper} ${styles.question}`}>
                <div className={styles.messageLabel}>Primary Logic</div>
                <p>Which balances count? What is the baseline? What payment terms can we offer?</p>
                <p>Let’s connect ModMed and your email.</p>
              </div>
              <div className={styles.reply}><span className={styles.replyLabel}>You</span><p>42% today. Get us above 55%.</p></div>
              <div className={styles.connections}>
                <span><Check size={14} weight="bold" aria-hidden="true" /> ModMed connected</span>
                <span><Check size={14} weight="bold" aria-hidden="true" /> Email connected</span>
              </div>
            </div>
            <div className={styles.caption}>
              <h3>We learn what moves the metric.</h3>
              <p>We study the workflow, constraints, and every outcome.</p>
            </div>
          </li>
          <li className={styles.step}>
            <div className={`${styles.scene} ${styles.result}`}>
              <span className={styles.stepLabel}>Step 3</span>
              <div className={`${styles.paper} ${styles.record}`}>
                <div className={styles.recordHeader}><strong>ModMed</strong><span>90 days</span></div>
                <div className={styles.recordBody}>
                  <span className={styles.balanceLabel}>Revenue recovery rate</span>
                  <div className={styles.balance}><del>42%</del><ArrowRight size={21} aria-hidden="true" /><strong>58%</strong></div>
                  <span className={styles.paid}><Check size={14} weight="bold" aria-hidden="true" /> 16 point improvement</span>
                </div>
              </div>
              <div className={`${styles.paper} ${styles.update}`}>
                <div className={styles.messageLabel}><EnvelopeSimple size={16} aria-hidden="true" />Primary Logic</div>
                <p>Recovery rate is up to 58%.</p>
                <p className={styles.updateDetail}>Still learning which timing, channels, and payment options work best.</p>
              </div>
            </div>
            <div className={styles.caption}>
              <h3>We improve the outcome over time.</h3>
              <p>Every call, message, promise, and result shapes what we try next.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
