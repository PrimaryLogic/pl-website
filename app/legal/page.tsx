import type { Metadata } from "next";
import LanePage from "@/components/LanePage";
import { getLane } from "@/lib/content/lanes";

const lane = getLane("legal");

export const metadata: Metadata = {
  title: { absolute: lane.title },
  description: lane.description,
  alternates: { canonical: "/legal" },
  openGraph: {
    type: "website",
    url: "/legal",
    siteName: "Primary Logic",
    title: lane.hero.heading,
    description: lane.description,
  },
  twitter: { card: "summary_large_image", title: lane.hero.heading, description: lane.description },
};

export default function Page() {
  return <LanePage slug="legal" />;
}
