import SiteNav from "./SiteNav";
import Hero from "./Hero";
import Leak from "./Leak";
import Sequence from "./Sequence";
import Capabilities from "./Capabilities";
import Orchestration from "./Orchestration";
import ComparisonSection from "./ComparisonSection";
import FinalCta from "./FinalCta";
import SiteFooter from "./SiteFooter";
import { EconomicsProvider } from "./economics/EconomicsProvider";

export default function HealthcarePage() {
  return (
    <>
      <SiteNav />
      {/* The hero ledger and the cost comparison share one model, so both sit
          inside the provider. Everything between them stays server-rendered. */}
      <EconomicsProvider>
        <main className="flex-1">
          <Hero />
          <Leak />
          <Sequence />
          <Capabilities />
          <Orchestration />
          <ComparisonSection />
          <FinalCta />
        </main>
      </EconomicsProvider>
      <SiteFooter />
    </>
  );
}
