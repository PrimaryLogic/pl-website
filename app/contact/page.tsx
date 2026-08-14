import EmailCapture from "@/components/EmailCapture";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { CONTACT_EMAIL } from "@/lib/content";

export const metadata = { title: "Contact", robots: { index: false, follow: false } };

const contactSteps = [
  ["01", "Show us the leak", "A small export, report, inbox, or webhook is enough to start."],
  ["02", "Define done", "Name the customer-side state that proves the job completed."],
  ["03", "Run a measured pilot", "Compare recovered outcomes against the same queue under your current process."],
] as const;

export default function Contact() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <SiteNav />
      <main id="main-content" className="flex-1 px-4 py-14 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-[1040px] items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <section>
            <p className="label text-accent">Start a pilot</p>
            <h1 className="display mt-5 max-w-[620px] text-[42px] text-ink sm:text-[56px] lg:text-[62px]">
              Bring us the work that keeps going quiet.
            </h1>
            <p className="mt-6 max-w-[590px] text-[17px] leading-[1.65] text-body sm:text-[18px]">
              Send a sample of the unfinished queue. We&apos;ll map the terminal outcome, the handoff boundary, and the evidence your team needs to verify completion.
            </p>

            <ol className="mt-10 space-y-6 border-l border-rule pl-6">
              {contactSteps.map(([number, title, copy]) => (
                <li key={number} className="relative">
                  <span className="figure-num absolute -left-[41px] top-0 flex size-8 items-center justify-center rounded-full border border-rule bg-paper text-[10px] font-medium text-accent-deep">
                    {number}
                  </span>
                  <h2 className="text-[16px] font-semibold text-ink">{title}</h2>
                  <p className="mt-1 max-w-[430px] text-[14px] leading-[1.6] text-mute">{copy}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-[10px] border border-rule bg-white p-6 shadow-[0_20px_60px_rgba(18,20,16,0.055)] sm:p-9">
            <p className="label text-accent">Request a working session</p>
            <h2 className="display mt-4 text-[30px] text-ink sm:text-[36px]">Start with one real queue.</h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-body">
              Share your work email and organization. We&apos;ll reply within one business day with the shortest path to a useful pilot.
            </p>
            <div className="mt-7">
              <EmailCapture
                id="contact-page"
                buttonLabel="Request a pilot review"
                orgPlaceholder="Company or organization"
              />
            </div>
            <p className="mt-5 border-t border-rule pt-5 text-[13px] leading-[1.6] text-mute">
              Prefer email? Write to{" "}
              <a className="font-medium text-accent-deep underline underline-offset-2" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              . No patient, borrower, or other sensitive records are needed for the first conversation.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
