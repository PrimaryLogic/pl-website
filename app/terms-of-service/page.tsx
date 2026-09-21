import StubPage from "@/components/StubPage";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata = { title: "Terms of Service", alternates: { canonical: "/terms-of-service" }, robots: { index: false, follow: false } };

export default function TermsOfService() {
  return (
    <StubPage
      title="Terms of Service"
      activePage="terms"
      effectiveDate="August 21, 2026"
      effectiveDateTime="2026-08-21"
    >
      <section>
        <h2>Website use</h2>
        <p>
          This website is informational. It does not create a service commitment, clinical relationship, or customer agreement. Any pilot or paid work is governed by the written agreement signed with that customer, including its scope, security requirements, pricing, and outcome definition.
        </p>
      </section>

      <section>
        <h2>SMS account notifications</h2>
        <p>
          Primary Logic may send transactional SMS account notifications on behalf of a participating provider to recipients who affirmatively consent during that provider&apos;s appointment scheduling or confirmation process. Consent is not a condition of receiving care. Messages may include account-balance updates, payment-link availability, payment-plan updates, and responses to payment-related questions. Message frequency varies with appointment and account activity, with up to four automated account notifications per appointment; message and data rates may apply.
        </p>
        <p>
          Reply STOP to cancel SMS messages at any time. Reply HELP for assistance, or contact us at <a className="font-medium text-accent-deep underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We do not sell, share, rent, or provide mobile phone numbers or SMS consent and opt-in data to third parties or affiliates for marketing or promotional purposes.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update these terms to reflect changes to the website or messaging program. The effective date above identifies the current version.
        </p>
      </section>

      <section>
        <h2>Questions</h2>
        <p>
          For questions about current customer terms, email{" "}
          <a className="font-medium text-accent-deep underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>
    </StubPage>
  );
}
