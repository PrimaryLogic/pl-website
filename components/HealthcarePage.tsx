import AnalyticsBridge from "./AnalyticsBridge";
import Capabilities from "./Capabilities";
import ComparisonSection from "./ComparisonSection";
import Faq from "./Faq";
import FinalCta from "./FinalCta";
import Hero from "./Hero";
import Leak from "./Leak";
import Orchestration from "./Orchestration";
import PilotSection from "./PilotSection";
import Sequence from "./Sequence";
import SiteFooter from "./SiteFooter";
import SiteNav from "./SiteNav";
import TrustSection from "./TrustSection";
import { EconomicsProvider } from "./economics/EconomicsProvider";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Primary Logic",
  url: siteUrl,
  description: "AI patient coordination for specialty practices.",
}).replace(/</g, "\\u003c");

export default function HealthcarePage() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnalyticsBridge />
      <SiteNav />
      <EconomicsProvider>
        <main id="main-content" className="flex-1">
          <Hero />
          <Leak />
          <Orchestration />
          <Sequence />
          <Capabilities />
          <TrustSection />
          <PilotSection />
          <ComparisonSection />
          <Faq />
          <FinalCta />
        </main>
      </EconomicsProvider>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </>
  );
}
