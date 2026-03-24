// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://flexotools.com'),
  title: {
    default: "FlexoTools - Free AI-Powered Tools for Developers & Creators",
    template: "%s | FlexoTools",
  },
  description: "Fast, privacy-first tools for image compression, PDF text extraction, QR code generation, resume scoring, and text summarization. No signup required. 100% free.",
  keywords: [
    "image compressor",
    "PDF text extractor",
    "QR code generator",
    "resume ATS scorer",
    "text summarizer",
    "free online tools",
    "privacy-focused tools",
    "web tools",
    "developer tools",
    "AI tools",
    "FlexoTools",
  ],
  authors: [{ name: "FlexoTools" }],
  creator: "FlexoTools",
  publisher: "FlexoTools",

  // FIX 1: Removed the global hardcoded canonical from layout.
  // Each page must declare its own canonical via metadata.alternates.canonical
  // in its own page.tsx file. A layout-level canonical forces every route
  // (e.g. /tools/image-compressor) to claim it is the homepage — this causes
  // a duplicate content penalty and confuses Google's indexing.
  // See: page.tsx for the homepage canonical example.

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flexotools.com",
    siteName: "FlexoTools",
    title: "FlexoTools - Free AI-Powered Tools",
    description: "Fast, privacy-first tools for image compression, PDF extraction, QR generation, and more. No signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlexoTools - Free Online Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@flexotoolsapp",
    creator: "@flexotoolsapp",
    title: "FlexoTools - Free AI-Powered Tools",
    description: "Fast, privacy-first tools for developers and creators. Try our image compressor, PDF extractor, QR generator, and more!",
    images: ["/twitter-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* FIX 2: Removed the hardcoded <link rel="canonical" href="https://flexotools.com" />
            that was here. It pointed every page on the site to the homepage URL.
            Next.js will now generate the correct per-page canonical automatically
            when each page.tsx declares metadata.alternates.canonical. */}

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon-48x48.png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="theme-color" content="#8B5CF6" />
        <meta name="google-adsense-account" content="ca-pub-4351431127336052" />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-K27HGVPP9G`}
          strategy="afterInteractive"
        />

        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-K27HGVPP9G', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4351431127336052"
          crossOrigin="anonymous"
        />

        {/* FIX 3: JSON-LD structured data kept as raw <script> tags here.
            This is actually fine in Next.js App Router — the <head> block in layout
            is server-rendered and these do not cause hydration issues when they use
            dangerouslySetInnerHTML. The Next.js <Script> component is only needed
            for external src= scripts that need loading strategy control. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "FlexoTools",
              url: "https://flexotools.com",
              logo: "https://flexotools.com/logo.png",
              description: "Privacy-first online tools for developers and creators",
              sameAs: [
                "https://twitter.com/flexotoolsapp",
                "https://github.com/flexotools",
              ],
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "FlexoTools",
              url: "https://flexotools.com",
              description: "Free online tools for image compression, PDF extraction, QR generation, and more",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://flexotools.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" style={{ maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 110%)' }}></div>
        </div>

        <Navigation />

        <main className="relative pt-16" role="main">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </div>
        </main>

        <footer className="relative mt-24 border-t border-foreground/10" role="contentinfo">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-blue-500/5 pointer-events-none" aria-hidden="true"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Brand Column */}
              <div className="col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-9 h-9 bg-linear-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg" aria-hidden="true">
                    <span className="text-white font-bold text-sm">FT</span>
                  </div>
                  <span className="text-lg font-bold">FlexoTools</span>
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                  Fast, AI-powered tools for everyday tasks. Built for speed and efficiency.
                </p>
              </div>

              {/* Tools Column */}
              <nav aria-label="Tools">
                <h3 className="font-semibold mb-4 text-foreground">Tools</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/tools/image-compressor" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>Image Compressor</a></li>
                  <li><a href="/tools/pdf-text" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>PDF Text Extractor</a></li>
                  <li><a href="/tools/qr-generator" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>QR Generator</a></li>
                  <li><a href="/tools/resume-grader" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>Resume ATS Scorer</a></li>
                  <li><a href="/tools/text-summarizer" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>Text Summarizer</a></li>
                </ul>
              </nav>

              {/* Company Column */}
              <nav aria-label="Company">
                <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/about" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>About</a></li>
                  <li><a href="/contact" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>Contact</a></li>
                </ul>
              </nav>

              {/* Legal Column */}
              <nav aria-label="Legal">
                <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/legal/privacy" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>Privacy Policy</a></li>
                  <li><a href="/legal/terms" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>Terms of Service</a></li>
                  <li><a href="/legal/cookies" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>Cookie Policy</a></li>
                </ul>
              </nav>
            </div>

            {/* Bottom Bar */}
            {/* FIX 4: Updated year to 2026 */}
            <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-foreground/60">
                © 2026 FlexoTools. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-foreground/60">
                <span className="flex items-center">
                  Built with <span className="text-red-500 mx-1" aria-label="love">♥</span> using Next.js
                </span>
              </div>
            </div>
          </div>
        </footer>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}