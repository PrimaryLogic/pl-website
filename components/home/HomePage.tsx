import AnalyticsBridge from "../AnalyticsBridge";
import FinalCta from "../FinalCta";
import SiteFooter from "../SiteFooter";
import SiteNav from "../SiteNav";
import HomeHero from "./HomeHero";
import JobTraces from "./JobTraces";
import LoopSection from "./LoopSection";
import PilotSection from "./PilotSection";
import { finalCta } from "@/lib/content/home";
import { homeNav } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com";
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Primary Logic",
  url: siteUrl,
  description:
    "Primary Logic runs autonomous agents that own multi-week administrative jobs end to end — voice, SMS, email, and portals — priced per completed outcome, verified in the customer's own system.",
}).replace(/</g, "\\u003c");

export default function HomePage() {
  return (
    <div className="home-landing min-h-full bg-white">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <AnalyticsBridge />
      <SiteNav nav={homeNav} variant="landing" />
      <main id="main-content" className="flex-1">
        <HomeHero />
        <JobTraces />
        <LoopSection />
        <PilotSection />
        <FinalCta heading={finalCta.heading} body={finalCta.body} variant="landing" />
      </main>
      <SiteFooter variant="landing" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
