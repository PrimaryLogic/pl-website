import StubPage from "@/components/StubPage";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata = { title: "Website Privacy Notice", robots: { index: false, follow: false } };

export default function PrivacyPolicy() {
  return (
    <StubPage title="Website Privacy Notice">
      <div className="space-y-7">
        <p>Effective August 13, 2026</p>

        <section>
          <h2 className="text-[18px] font-semibold text-ink">Scope</h2>
          <p className="mt-2">
            This notice describes information collected through the Primary Logic website. It does not replace a healthcare provider&apos;s Notice of Privacy Practices. Protected health information processed for a customer is governed by the applicable customer agreement and business associate agreement.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-ink">Information we collect</h2>
          <p className="mt-2">
            When you request information, we collect the work email and organization information you submit, the source of the request, and the submission time. Hosting and security infrastructure may also process standard request information such as IP address, browser details, and diagnostic logs.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-ink">How we use information</h2>
          <p className="mt-2">
            We use website information to respond to inquiries, operate and secure the website, prevent abuse, and meet legal obligations. We retain it only as long as reasonably necessary for those purposes.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-ink">Service providers and legal requests</h2>
          <p className="mt-2">
            We may disclose information to service providers that help operate the website or respond to an inquiry, subject to appropriate contractual protections. We may also disclose information when required by law or necessary to protect rights, safety, and security.
          </p>
        </section>

        <section>
          <h2 className="text-[18px] font-semibold text-ink">Contact</h2>
          <p className="mt-2">
            For privacy questions or requests, email <a className="font-medium text-accent-deep underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </section>
      </div>
    </StubPage>
  );
}
