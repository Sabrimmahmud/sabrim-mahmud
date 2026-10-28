import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BackToTop } from "@/components/back-to-top";
import { themeScript } from "@/components/theme-toggle";
import { JsonLd, personJsonLd } from "@/components/json-ld";
import { profile } from "@/content/site";
import { metadataBase } from "@/lib/seo";
import "./globals.css";

/** Every page on this site is static. The build fails if one stops being so. */
export const ensureStatic = "navigation";

/* Fonts are self-hosted (SIL Open Font License, see src/fonts) so builds never depend on a font CDN. */
const newsreader = localFont({
  variable: "--font-newsreader",
  display: "swap",
  src: [
    { path: "../fonts/newsreader-latin-opsz-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/newsreader-latin-opsz-italic.woff2", weight: "200 800", style: "italic" },
  ],
});

const instrument = localFont({
  variable: "--font-instrument",
  display: "swap",
  src: [
    { path: "../fonts/instrument-sans-latin-wght-normal.woff2", weight: "400 700", style: "normal" },
    { path: "../fonts/instrument-sans-latin-wght-italic.woff2", weight: "400 700", style: "italic" },
  ],
});

const tiroBangla = localFont({
  variable: "--font-tiro-bangla",
  display: "swap",
  preload: false,
  src: [{ path: "../fonts/tiro-bangla-bengali-400-normal.woff2", weight: "400", style: "normal" }],
});

const description =
  "Sabrim Mahmud is an AI systems developer and NLP researcher working on Bangla, English and Banglish text: political hate speech detection, multilingual sentiment, and efficient model deployment.";

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: `${profile.name} | AI systems developer and NLP researcher`,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name }],
  openGraph: {
    title: profile.name,
    description,
    siteName: profile.name,
    type: "profile",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: profile.name, description },
  robots: { index: true, follow: true },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f3ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1628" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${newsreader.variable} ${instrument.variable} ${tiroBangla.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col antialiased">
        <JsonLd data={personJsonLd()} />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <BackToTop />
      </body>
    </html>
  );
}
