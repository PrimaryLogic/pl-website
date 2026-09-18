import { Brain, UserCircle, TrendUp, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import styles from "./LearningSection.module.css";

const examples = [
  { icon: UserCircle, title: "Customer context", body: "Uses records and past conversations to understand each customer and tailor its approach.", signal: "“I thought insurance covered this.”", source: "Maya · Billing question", label: "From Maya’s statement", answer: "$186 applied to deductible", after: "Explains the charge before asking for payment." },
  { icon: Brain, title: "Persistent memory", body: "Remembers preferences, promises, and unfinished work across months of work.", signal: "“Friday. Text after six.”", source: "Priya · Payment follow-up", label: "Follow-up scheduled", answer: "Friday · 6:05 pm · SMS", after: "Follows up at the time she asked." },
  { icon: TrendUp, title: "Better next steps", body: "Adjusts its timing, channel, or approach as it learns what works.", signal: "ID photos keep arriving cropped.", source: "Onboarding · Repeated blocker", label: "Next message", answer: "“Please include all four corners of your ID.”", after: "Makes the next request clearer." },
];

export default function LearningExamples() {
  return <figure className={styles.learningExamples} aria-label="How our agents learn and act">
    <ul className={styles.cards}>
      {examples.map(({ icon: Icon, ...example }) => {
        return <li className={styles.card} key={example.title}>
          <div className={styles.cardTitle}><Icon size={21} aria-hidden="true" /><h3>{example.title}</h3></div>
          <p className={styles.cardBody}>{example.body}</p>
          <div className={styles.cardExample}>
            <span className={styles.source}>{example.source}</span>
            <blockquote>{example.signal}</blockquote>
            <p className={styles.nextAction}><CheckCircle size={16} weight="fill" aria-hidden="true" />{example.after}</p>
            <div className={styles.response}>
              <div className={styles.resolved}>
                <span>{example.label}</span><strong>{example.answer}</strong>
              </div>
            </div>
          </div>
        </li>;
      })}
    </ul>
  </figure>;
}
