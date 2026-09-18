import LearningExamples from "./LearningExamples";
import AgentGuide from "./AgentGuide";
import styles from "./LearningSection.module.css";

export default function LearningSection() {
  return (
    <section id="learning" className={`pl-section pl-section--tint ${styles.section}`} aria-labelledby="learning-heading">
      <div className="pl-container">
        <div className="pl-guided-heading">
        <header className={`pl-section-head ${styles.header}`}>
          <p className="pl-eyebrow">Continuous learning</p>
          <h2 id="learning-heading">Keeps track of the whole job.</h2>
          <p className="pl-section-head__body">Our agents remember what happened, what was promised, and what’s left — so every interaction informs the next step.</p>
        </header>
        <AgentGuide agent="bubbles" />
        </div>
        <LearningExamples />
      </div>
    </section>
  );
}
