import type { Metadata } from "next";
import LanePage from "@/components/LanePage";
import { getLane } from "@/lib/content/lanes";

const lane = getLane("healthcare");

export const metadata: Metadata = {
  title: { absolute: lane.title },
  description: lane.description,
  alternates: { canonical: "/healthcare" },
  openGraph: {
    type: "website",
    url: "/healthcare",
    siteName: "Primary Logic",
    title: lane.hero.heading,
    description: lane.description,
  },
  twitter: { card: "summary_large_image", title: lane.hero.heading, description: lane.description },
};

export default function Page() {
  return <LanePage slug="healthcare" />;
}
