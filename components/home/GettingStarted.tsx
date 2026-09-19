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
                <p className={styles.bigMessage}>Can you handle our overdue patient balances?</p>
                <p className={styles.messageDetail}>We use ModMed and email.</p>
              </div>
            </div>
            <div className={styles.caption}>
              <h3>Tell us the result you need.</h3>
              <p>Send us the job and what finished looks like.</p>
            </div>
          </li>
          <li className={styles.step}>
            <div className={`${styles.scene} ${styles.setup}`}>
              <span className={styles.stepLabel}>Step 2</span>
              <div className={`${styles.paper} ${styles.question}`}>
                <div className={styles.messageLabel}>Primary Logic</div>
                <p>Which balances should we work on? What payment terms can we offer?</p>
                <p>Let’s connect ModMed and your email.</p>
              </div>
              <div className={styles.reply}><span className={styles.replyLabel}>You</span><p>Over 60 days. Here’s our process.</p></div>
              <div className={styles.connections}>
                <span><Check size={14} weight="bold" aria-hidden="true" /> ModMed connected</span>
                <span><Check size={14} weight="bold" aria-hidden="true" /> Email connected</span>
              </div>
            </div>
            <div className={styles.caption}>
              <h3>We learn how the work gets done.</h3>
              <p>We gather what is needed. You set the boundaries.</p>
            </div>
          </li>
          <li className={styles.step}>
            <div className={`${styles.scene} ${styles.result}`}>
              <span className={styles.stepLabel}>Step 3</span>
              <div className={`${styles.paper} ${styles.record}`}>
                <div className={styles.recordHeader}><strong>ModMed</strong><span>Maya R.</span></div>
                <div className={styles.recordBody}>
                  <span className={styles.balanceLabel}>Patient balance</span>
                  <div className={styles.balance}><del>$186</del><ArrowRight size={21} aria-hidden="true" /><strong>$0</strong></div>
                  <span className={styles.paid}><Check size={14} weight="bold" aria-hidden="true" /> Payment recorded</span>
                </div>
              </div>
              <div className={`${styles.paper} ${styles.update}`}>
                <div className={styles.messageLabel}><EnvelopeSimple size={16} aria-hidden="true" />Primary Logic</div>
                <p>Payment received. Record updated.</p>
                <p className={styles.updateDetail}>Following up on the remaining accounts.</p>
              </div>
            </div>
            <div className={styles.caption}>
              <h3>We own the work.</h3>
              <p>Our agents keep going until the result is complete.</p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
