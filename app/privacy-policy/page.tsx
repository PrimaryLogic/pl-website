import StubPage from "@/components/StubPage";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy-policy" }, robots: { index: false, follow: false } };

export default function PrivacyPolicy() {
  return (
    <StubPage
      title="Privacy Policy"
      activePage="privacy"
      effectiveDate="September 22, 2026"
      effectiveDateTime="2026-09-22"
    >
      <section>
        <h2>Scope</h2>
        <p>
          This notice describes information collected through the Primary Logic website. It does not replace a healthcare provider&apos;s Notice of Privacy Practices. Protected health information processed for a customer is governed by the applicable customer agreement and business associate agreement.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <p>
          The website has no forms, accounts, or sign-ins, and it asks you for nothing. If you write to an email address listed on the site, we receive what you chose to send and use it to reply. Hosting and security infrastructure process standard request information such as IP address, browser details, and diagnostic logs.
        </p>
      </section>

      <section>
        <h2>How we use information</h2>
        <p>
          We use what you send us to respond to your inquiry, and infrastructure logs to operate and secure the website, prevent abuse, and meet legal obligations. We retain both only as long as reasonably necessary for those purposes. We do not use website information for advertising and we do not sell it.
        </p>
      </section>

      <section>
        <h2>Service providers and legal requests</h2>
        <p>
          We may disclose information to service providers that help operate the website or respond to an inquiry, subject to appropriate contractual protections. We may also disclose information when required by law or necessary to protect rights, safety, and security.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          For privacy questions or requests, email <a className="font-medium text-accent-deep underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </StubPage>
  );
}
