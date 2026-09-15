import { CheckCircle, Clock } from "@phosphor-icons/react/dist/ssr";

const rows = [
  { job: "Appointment booking", who: "Luis · needs an evening slot", before: "Time needed", after: "Appointment confirmed" },
  { job: "Loan file completion", who: "Ana · missing bank statement", before: "Document outstanding", after: "File complete, submitted" },
  { job: "Billing question", who: "Maya · doesn’t understand the charge", before: "Charge unclear", after: "Charge explained, bill paid" },
  { job: "Payment follow-up", who: "Priya · second installment due", before: "Installment due", after: "Final payment received" },
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
        <span className="pl-recover__title">Unfinished → completed</span>
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
        <span className="pl-recover__note">Every outcome checked in your system before it counts.</span>
      </div>
    </div>
  );
}
