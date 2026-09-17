import { Brain, UserCircle, TrendUp } from "@phosphor-icons/react/dist/ssr";
import AgentGuide from "./AgentGuide";
import LearningExamples from "./LearningExamples";
import styles from "./LearningSection.module.css";

const principles = [
  { icon: UserCircle, title: "Customer context", body: "Uses records and past conversations to understand each customer’s situation and tailor its approach." },
  { icon: Brain, title: "Persistent memory", body: "Remembers preferences, commitments, and unresolved questions across calls, messages, and months of work." },
  { icon: TrendUp, title: "Better next steps", body: "Adapts as new information arrives — changing the timing, channel, or approach when the work stalls." },
];

export default function LearningSection() {
  return (
    <section id="learning" className={`pl-section pl-section--tint ${styles.section}`} aria-labelledby="learning-heading">
      <div className="pl-container">
        <div className="pl-guided-heading">
        <header className={`pl-section-head ${styles.header}`}>
          <p className="pl-eyebrow">Continuous learning</p>
          <h2 id="learning-heading">Gets better with every interaction.</h2>
          <p className="pl-section-head__body">Our agents use customer history, persistent memory, and what they learn along the way to choose the next step that moves the work forward.</p>
        </header>
        <AgentGuide agent="bubbles" />
        </div>
        <div className={styles.layout}>
          <ul className={styles.principles}>
            {principles.map(({ icon: Icon, title, body }) => <li key={title}>
              <div className="pl-principle__heading">
                <span className="pl-principle__icon"><Icon size={18} aria-hidden="true" /></span>
                <h3>{title}</h3>
              </div>
              <p>{body}</p>
            </li>)}
          </ul>
          <LearningExamples />
        </div>
      </div>
    </section>
  );
}
