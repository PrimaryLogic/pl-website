import type { Metadata } from "next";
import HealthcarePage from "@/components/HealthcarePage";

export const metadata: Metadata = {
  title: "Specialty Referral Conversion",
  description:
    "Keep your schedulers and scheduling software — Primary Logic takes the second pass. We work the referrals your first pass couldn't finish, paid per kept first visit verified in your EHR.",
  alternates: { canonical: "/healthcare" },
  openGraph: {
    type: "website",
    url: "/healthcare",
    siteName: "Primary Logic",
    title: "We convert the referrals your first pass couldn't",
    description:
      "Second-pass referral conversion, paid per kept first visit verified in your EHR. Everything else is $0.",
  },
  twitter: {
    card: "summary_large_image",
    title: "We convert the referrals your first pass couldn't",
    description:
      "Second-pass referral conversion, paid per kept first visit verified in your EHR. Everything else is $0.",
  },
};

export default function Healthcare() {
  return <HealthcarePage />;
}
