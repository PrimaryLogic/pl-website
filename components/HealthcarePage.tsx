import SiteNav from "./SiteNav";
import Hero from "./Hero";
import Challenge from "./Challenge";
import JourneyShowcase from "./JourneyShowcase";
import HowItWorks from "./HowItWorks";
import ConfigPanel from "./ConfigPanel";
import Capabilities from "./Capabilities";
import Orchestration from "./Orchestration";
import Economics from "./Economics";
import FinalCta from "./FinalCta";
import SiteFooter from "./SiteFooter";

export default function HealthcarePage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Challenge />
        <JourneyShowcase />
        <HowItWorks />
        <ConfigPanel />
        <Capabilities />
        <Orchestration />
        <Economics />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
