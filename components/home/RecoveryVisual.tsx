import { CheckCircle, Clock } from "@phosphor-icons/react/dist/ssr";

const rows = [
  { job: "Implant consult", who: "Luis · quoted, never booked", before: "Unscheduled 30 days", after: "Visit confirmed" },
  { job: "Aligner treatment", who: "Priya · financing question", before: "Payment plan unanswered", after: "Plan chosen, visit booked" },
  { job: "New-patient exam", who: "Ana · web form at 11:04 pm", before: "No callback", after: "Visit confirmed" },
  { job: "Full-arch consult", who: "Diane · intake half done", before: "Forms incomplete", after: "Intake complete, confirmed" },
];

/**
 * Illustrative, CSS-only loop: unfinished jobs turn into recorded outcomes one
 * at a time, then the cycle resets. No numbers — it shows the shape of the
 * work, not a claim about results.
 */
export default function RecoveryVisual() {
  return (
    <div className="pl-recover" aria-label="Illustration: unfinished jobs becoming recorded outcomes">
      <div className="pl-recover__head">
        <span className="pl-recover__title">Unscheduled → confirmed</span>
        <span className="pl-recover__label">Illustrative</span>
      </div>
      <ol className="pl-recover__list">
        {rows.map((r, i) => (
          <li key={r.job} className="pl-recover__row" style={{ ["--i" as string]: i }}>
            <div className="pl-recover__job">
              <span className="pl-recover__name">{r.job}</span>
              <span className="pl-recover__who">{r.who}</span>
            </div>
            <div className="pl-recover__state">
              <span className="pl-recover__before"><Clock aria-hidden="true" size={14} /> {r.before}</span>
              <span className="pl-recover__after"><CheckCircle aria-hidden="true" size={14} weight="fill" /> {r.after}</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="pl-recover__foot">
        <span className="pl-recover__bar" aria-hidden="true"><i /></span>
        <span className="pl-recover__note">Each visit confirmed in your schedule before it counts.</span>
      </div>
    </div>
  );
}
