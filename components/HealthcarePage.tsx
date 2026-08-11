import SiteNav from "./SiteNav";
import Hero from "./Hero";
import Leak from "./Leak";
import Sequence from "./Sequence";
import Capabilities from "./Capabilities";
import Orchestration from "./Orchestration";
import CostCurves from "./CostCurves";
import FinalCta from "./FinalCta";
import SiteFooter from "./SiteFooter";

export default function HealthcarePage() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Leak />
        <Sequence />
        <Capabilities />
        <Orchestration />
        <CostCurves />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
