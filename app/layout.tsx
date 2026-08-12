import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/** Display: expanded grotesk. Signage register — sturdy, institutional. */
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
    default: "Primary Logic | AI Patient Coordination for Specialty Practices",
    template: "%s | Primary Logic",
  },
  description:
    "Primary Logic keeps responsibility for the next patient step until it is complete, declined, or handed to a person with context.",
  alternates: { canonical: "/" },
  applicationName: "Primary Logic",
  authors: [{ name: "Primary Logic" }],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Primary Logic",
    title: "Every referral gets followed through.",
    description:
      "AI patient coordination that stays responsible for the next step across voice, SMS, and email.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Every referral gets followed through.",
    description:
      "AI patient coordination that stays responsible for the next step across voice, SMS, and email.",
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
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
