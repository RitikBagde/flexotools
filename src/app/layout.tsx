// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlexoTools - AI-Powered Tools",
  description: "Fast, efficient tools for image compression, PDF extraction, QR generation, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          {/* Gradient Blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-size-[64px_64px]" style={{ maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, #000 70%, transparent 110%)' }}></div>
        </div>

        {/* Navigation Component */}
        <Navigation />

        {/* Main Content */}
        <main className="relative pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative mt-24 border-t border-foreground/10">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-blue-500/5 pointer-events-none"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Brand Column */}
              <div className="col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-9 h-9 bg-linear-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
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
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Tools</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/tools/image-compressor" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Image Compressor</a></li>
                  <li><a href="/tools/pdf-text" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>PDF Text Extractor</a></li>
                  <li><a href="/tools/qr-generator" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>QR Generator</a></li>
                  <li><a href="/tools/resume-grader" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Resume ATS Scorer</a></li>
                  <li><a href="/tools/text-summarizer" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Text Summarizer</a></li>
                </ul>
              </div>

              {/* Company Column */}
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/about" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>About</a></li>
                  {/* <li><a href="/pricing" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Pricing</a></li> */}
                  <li><a href="/contact" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Contact</a></li>
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Legal</h3>
                <ul className="space-y-3 text-sm">
                  <li><a href="/legal/privacy" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Privacy Policy</a></li>
                  <li><a href="/legal/terms" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Terms of Service</a></li>
                  <li><a href="/legal/cookies" className="text-foreground/60 hover:text-foreground transition-colors flex items-center group"><span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>Cookie Policy</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-sm text-foreground/60">
                © 2025 FlexoTools. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 text-sm text-foreground/60">
                <span className="flex items-center">
                  Built with <span className="text-red-500 mx-1">♥</span> using Next.js
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}