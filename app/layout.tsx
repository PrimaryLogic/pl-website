import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

const display = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display-web",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-web",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-web",
  display: "swap",
});

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Primary Logic",
    template: "%s | Primary Logic",
  },
  description:
    "Primary Logic works the leads, patients, and cases your team can’t get to — by phone, text, and email, for as long as it takes — and you pay only when the outcome shows up in your own system.",
  alternates: { canonical: "/" },
  applicationName: "Primary Logic",
  authors: [{ name: "Primary Logic" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Primary Logic",
    title: "Autonomous revenue follow-through, paid per verified outcome",
    description:
      "We work the demand your team can’t get to until it turns into a confirmed visit, a signed retainer, or a funded loan. You pay per completed outcome.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Autonomous revenue follow-through, paid per verified outcome",
    description:
      "We work the demand your team can’t get to until it turns into a confirmed visit, a signed retainer, or a funded loan. You pay per completed outcome.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f7f4",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`h-full antialiased ${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
