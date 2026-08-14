import StubPage from "@/components/StubPage";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata = { title: "Terms of Service", robots: { index: false, follow: false } };

export default function TermsOfService() {
  return (
    <StubPage title="Terms of Service">
      <div className="space-y-7">
        <section className="rounded-[8px] border border-rule bg-white p-5 sm:p-7">
          <p className="label text-accent">Pre-launch notice</p>
          <h2 className="display mt-4 text-[24px] text-ink sm:text-[28px]">
            Public website terms are under legal review.
          </h2>
          <p className="mt-4">
            Until reviewed terms are published, this website is informational only. Do not rely on it as an offer, service commitment, or customer agreement.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-ink">What governs a pilot</h2>
          <p className="mt-2">
            Any pilot or paid work is governed by the written agreement signed with that customer, including its scope, security requirements, pricing, and outcome definition. This page does not add to or replace that agreement.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-ink">Questions</h2>
          <p className="mt-2">
            For questions about current customer terms, email{" "}
            <a className="font-medium text-accent-deep underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </StubPage>
  );
}
