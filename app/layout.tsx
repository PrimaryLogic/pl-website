import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/** Display: expanded grotesk. Signage register: sturdy, institutional. */
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/** Every number on this page is set in mono, tabular-lining. */
const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://primarylogic.com");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Primary Logic | Agents That Finish the Job",
    template: "%s | Primary Logic",
  },
  description:
    "Primary Logic runs autonomous agents that own multi-week administrative jobs end to end — voice, SMS, email, and portals — priced per completed outcome, verified in your own system.",
  alternates: { canonical: "/" },
  applicationName: "Primary Logic",
  authors: [{ name: "Primary Logic" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Primary Logic",
    title: "Agents that carry a job to the finish",
    description:
      "A fixed fee per completed outcome, verified in your system. Failed attempts cost you nothing.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agents that carry a job to the finish",
    description:
      "A fixed fee per completed outcome, verified in your system. Failed attempts cost you nothing.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f8f6",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
