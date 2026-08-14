import type { Metadata } from "next";
import LendingPage from "@/components/LendingPage";

export const metadata: Metadata = {
  title: "Lending Recapture",
  description:
    "Primary Logic works abandoned applications and approved recapture lists to funded loans, priced per funded outcome verified in your LOS.",
  alternates: { canonical: "/lending" },
  openGraph: {
    type: "website",
    url: "/lending",
    siteName: "Primary Logic",
    title: "Funded loans, not follow-up activity",
    description:
      "Administrative follow-through for stalled lending files, with the funded outcome verified in your LOS.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Funded loans, not follow-up activity",
    description:
      "Administrative follow-through for stalled lending files, with the funded outcome verified in your LOS.",
  },
};

export default function Lending() {
  return <LendingPage />;
}
