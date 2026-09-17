"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { Clock } from "@phosphor-icons/react/dist/csr/Clock";
import { Pause } from "@phosphor-icons/react/dist/csr/Pause";
import { Play } from "@phosphor-icons/react/dist/csr/Play";
import styles from "./LearningSection.module.css";

const examples = [
  { label: "Billing question", detail: "Maya · “I thought insurance covered this.”", before: "Charge unclear", after: "Explains the deductible" },
  { label: "Payment follow-up", detail: "Priya · “Friday. Text after six.”", before: "Promise remembered", after: "Friday · 6:05 pm · SMS" },
  { label: "Appointment booking", detail: "Luis · works until 5 pm", before: "Schedule learned", after: "Offers evening slots" },
  { label: "Onboarding guidance", detail: "Cropped ID photos keep delaying onboarding", before: "Repeated blocker found", after: "Clarifies future requests" },
];

export default function LearningExamples() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .2 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); media.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (paused || reduced || !visible) return;
    const timer = window.setTimeout(() => {
      if (step === 6) setStep(0);
      else setStep(step + 1);
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [step, paused, reduced, visible]);
  return <figure ref={root} className={styles.figure} aria-label="Illustrative examples of learning put to work">
    <figcaption className={styles.cardHeading}><span>What it learns → What changes</span><span className={styles.illustrative}>Illustrative</span></figcaption>
    <ul className={styles.examples}>
      {examples.map((example, index) => {
        const done = reduced || step > index;
        return <li key={example.label}>
          <div className={styles.exampleCopy}><h3>{example.label}</h3><p>{example.detail}</p></div>
          <span className={styles.status}>
            <span className={`${styles.result} ${styles.pending}`} data-visible={!done} aria-hidden={done}><Clock size={15} aria-hidden="true" /><span>{example.before}</span></span>
            <span className={styles.result} data-visible={done} aria-hidden={!done}><CheckCircle size={15} weight="fill" aria-hidden="true" /><span>{example.after}</span></span>
          </span>
        </li>;
      })}
    </ul>
    <div className={styles.animationFooter}>
      <span className={styles.progress} aria-hidden="true"><i style={{ width: `${reduced ? 100 : Math.min(step, examples.length) / examples.length * 100}%` }} /></span>
      <span className={styles.exampleCount}>What it learns shapes the next step.</span>
      {!reduced && <button type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Play learning examples" : "Pause learning examples"}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>}
    </div>
  </figure>;
}
