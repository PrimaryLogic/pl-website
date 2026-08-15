import type { Metadata } from "next";
import HealthcarePage from "@/components/HealthcarePage";

export const metadata: Metadata = {
  title: "Elective Healthcare Treatment Coordination",
  description:
    "Primary Logic is recruiting design partners for second-pass treatment coordination pilots verified against customer-side practice and scheduling reports.",
  alternates: { canonical: "/healthcare" },
  openGraph: {
    type: "website",
    url: "/healthcare",
    siteName: "Primary Logic",
    title: "Work the treatment tail your first pass could not finish",
    description:
      "Design-partner pilots for elective healthcare groups. One treatment cohort, no replacement, customer-side verification.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work the treatment tail your first pass could not finish",
    description:
      "Design-partner pilots for elective healthcare groups. One treatment cohort, no replacement, customer-side verification.",
  },
};

export default function Healthcare() {
  return <HealthcarePage />;
}
