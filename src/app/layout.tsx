// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // SEO: Better font loading performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// SEO: Enhanced metadata with Open Graph and Twitter Cards
export const metadata: Metadata = {
  metadataBase: new URL('https://flexotools.com'), // TODO: Replace with your actual domain
  title: {
    default: "FlexoTools - Free AI-Powered Tools for Developers & Creators",
    template: "%s | FlexoTools", // For dynamic page titles
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
  
  // SEO: Open Graph (for Facebook, LinkedIn, Discord, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flexotools.com", // TODO: Replace with your actual domain
    siteName: "FlexoTools",
    title: "FlexoTools - Free AI-Powered Tools",
    description: "Fast, privacy-first tools for image compression, PDF extraction, QR generation, and more. No signup required.",
    images: [
      {
        url: "/og-image.png", // TODO: Create this image (1200x630px)
        width: 1200,
        height: 630,
        alt: "FlexoTools - Free Online Tools",
      },
    ],
  },
  
  // SEO: Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@flexotoolsapp", // TODO: Replace with your Twitter handle
    creator: "@flexotoolsapp",
    title: "FlexoTools - Free AI-Powered Tools",
    description: "Fast, privacy-first tools for developers and creators. Try our image compressor, PDF extractor, QR generator, and more!",
    images: ["/twitter-image.png"], // TODO: Create this image (1200x600px)
  },
  
  // SEO: Robots
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
  
  // SEO: Verification (add these when you have them)
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  //   bing: "your-bing-verification-code",
  // },
  
  // SEO: Category
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
        {/* SEO: Canonical URL - prevents duplicate content issues */}
        <link rel="canonical" href="https://flexotools.com" />
        
        {/* SEO: Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* SEO: Theme color for browser UI */}
        <meta name="theme-color" content="#8B5CF6" />

        <meta name="google-adsense-account" content="ca-pub-4351431127336052"></meta>
        
        <Script async
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4351431127336052"
          crossOrigin="anonymous">
        </Script>

        {/* SEO: Structured Data - Organization */}
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
                "https://twitter.com/flexotoolsapp", // TODO: Add your social links
                "https://github.com/flexotools",
              ],
            }),
          }}
        />
        
        {/* SEO: Structured Data - WebSite */}
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
          {/* Gradient Blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" style={{ maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 110%)' }}></div>
        </div>

        {/* Navigation Component */}
        <Navigation />

        {/* Main Content - SEO: Semantic HTML */}
        <main className="relative pt-16" role="main">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </div>
        </main>

        {/* Footer - SEO: Semantic HTML */}
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
                {/* <div className="flex space-x-3"> */}
                  {/* Social Icons */}
                  {/* <a href="#" className="w-8 h-8 rounded-lg bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors" aria-label="Twitter">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-lg bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors" aria-label="GitHub">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </a>
                  <a href="#" className="w-8 h-8 rounded-lg bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors" aria-label="LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a> */}
                {/* </div> */}
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
                  {/* <li><a href="/pricing" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true"></span>Pricing</a></li> */}
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
            <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-foreground/60">
                © 2025 FlexoTools. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-foreground/60">
                <span className="flex items-center">
                  Built with <span className="text-red-500 mx-1" aria-label="love">♥</span> using Next.js
                </span>
              </div>
            </div>
          </div>
        </footer>

        {/* Vercel Speed Insights - Tracks real user performance metrics */}
        <SpeedInsights />
      </body>
    </html>
  );
}