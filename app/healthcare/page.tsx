import type { Metadata } from "next";
import HealthcarePage from "@/components/HealthcarePage";

export const metadata: Metadata = {
  title: "Specialty Referral Recovery Design-Partner Pilots",
  description:
    "Primary Logic is recruiting design partners for second-pass specialty referral recovery pilots verified against customer-side EHR or scheduling reports.",
  alternates: { canonical: "/healthcare" },
  openGraph: {
    type: "website",
    url: "/healthcare",
    siteName: "Primary Logic",
    title: "Recover the referrals your first pass couldn’t finish",
    description:
      "Design-partner pilots for multi-site specialty groups. One aged cohort, no replacement, customer-side verification.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recover the referrals your first pass couldn’t finish",
    description:
      "Design-partner pilots for multi-site specialty groups. One aged cohort, no replacement, customer-side verification.",
  },
};

export default function Healthcare() {
  return <HealthcarePage />;
}
