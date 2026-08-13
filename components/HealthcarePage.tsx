import AnalyticsBridge from "./AnalyticsBridge";
import AnswersSection from "./AnswersSection";
import ChallengeSection from "./ChallengeSection";
import EconomicsSection from "./EconomicsSection";
import FinalCta from "./FinalCta";
import Hero from "./Hero";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import SolutionSection from "./SolutionSection";
import { healthcareNav } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Specialty Referral Conversion | Primary Logic",
  url: `${siteUrl}/healthcare`,
  description:
    "Second-pass referral conversion for specialty practices: Primary Logic works the referrals your first pass couldn't finish, paid per kept first visit verified in your EHR.",
}).replace(/</g, "\\u003c");

export default function HealthcarePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnalyticsBridge />
      <SiteNav nav={healthcareNav} />
      <main id="main-content" className="flex-1">
        <Hero />
        <ChallengeSection />
        <SolutionSection />
        <EconomicsSection />
        <AnswersSection />
        <FinalCta emailPlaceholder="name@practice.com" lane="healthcare" />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </>
  );
}
