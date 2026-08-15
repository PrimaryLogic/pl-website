import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "PI Legal Intake",
  description:
    "Outcome-priced after-hours and aged claimant intake for personal-injury firms, priced per signed retainer.",
  alternates: { canonical: "/legal" },
  openGraph: {
    type: "website",
    url: "/legal",
    siteName: "Primary Logic",
    title: "The signed retainer is the outcome",
    description: "Primary Logic carries approved PI intake from first contact through the firm-side signature path.",
  },
};

export default function Legal() {
  return <LegalPage />;
}
