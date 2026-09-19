import LearningExamples from "./LearningExamples";
import AgentGuide from "./AgentGuide";
import styles from "./LearningSection.module.css";

export default function LearningSection() {
  return (
    <section id="learning" className={`pl-section pl-section--tint ${styles.section}`} aria-labelledby="learning-heading">
      <div className="pl-container">
        <div className="pl-guided-heading">
        <header className={`pl-section-head ${styles.header}`}>
          <p className="pl-eyebrow">The whole job</p>
          <h2 id="learning-heading">We keep working until it is done.</h2>
          <p className="pl-section-head__body">A job can take weeks or months of conversations, documents, system updates, and follow ups. Our agents remember what happened, what was promised, and what is left so every interaction moves the work forward.</p>
        </header>
        <AgentGuide agent="bubbles" />
        </div>
        <LearningExamples />
      </div>
    </section>
  );
}
