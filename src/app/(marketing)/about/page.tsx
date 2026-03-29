// src/app/about/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About FlexoTools - Free Privacy-First Online Tools',
  description:
    'FlexoTools is a collection of free, privacy-first online tools for image compression, PDF text extraction, QR generation, resume analysis and text summarization. No signup required.',
  alternates: {
    canonical: 'https://flexotools.com/about',
  },
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:py-16">

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4">
          About FlexoTools
        </h1>
        {/* FIX: was text-foreground/80 which was fine, keeping it */}
        <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
          Your privacy-first collection of powerful, lightweight tools designed to make
          work faster and simpler.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-background/50 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-10 border border-foreground/10 mb-8">

        {/* Mission */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚀</span>
            <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
          </div>
          {/* FIX: was text-foreground/80 — fine, keeping consistent */}
          <p className="text-foreground/70 leading-relaxed text-lg">
            FlexoTools is a collection of focused, privacy-friendly tools designed to make
            your daily workflow faster and simpler. From image compression and PDF text
            extraction to QR generation and AI-powered text utilities, everything is built
            to be fast, reliable, and easy to use — with no signup required for most tools.
          </p>
        </div>

        {/* Goals */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎯</span>
            <h2 className="text-2xl font-bold text-foreground">Our Goals</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-bold text-foreground mb-1">Lightweight & Fast</h3>
                {/* FIX: was text-foreground/70 — consistent */}
                <p className="text-foreground/70">
                  Simple tools without complicated dashboards or unnecessary bloat.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="font-bold text-foreground mb-1">Privacy First</h3>
                <p className="text-foreground/70">
                  No unnecessary logging, tracking, or data collection. Most tools
                  process files entirely in your browser.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
              <span className="text-2xl">🎓</span>
              <div>
                <h3 className="font-bold text-foreground mb-1">Built for Everyone</h3>
                <p className="text-foreground/70">
                  Designed to help students, creators, and professionals get things
                  done quickly without a learning curve.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⚙️</span>
            <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
          </div>
          <p className="text-foreground/70 leading-relaxed text-lg mb-4">
            Most tools run directly in your browser. For AI-powered tools like the Resume
            ATS Checker and Text Summarizer, files are sent to our server, processed, and
            deleted immediately — never stored. You stay in control of your data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: '🌐', title: 'Browser-First', desc: 'Processing happens locally when possible' },
              { icon: '🔐', title: 'Secure APIs', desc: 'Encrypted connections for all tools' },
              { icon: '🚫', title: 'No Storing', desc: 'Your files are never saved on our servers' },
            ].map((item) => (
              <div key={item.title} className="text-center p-4 bg-foreground/5 rounded-xl">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-foreground mb-1">{item.title}</div>
                <div className="text-sm text-foreground/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Why choose us */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">✨</span>
            <h2 className="text-2xl font-bold text-foreground">Why Choose Us?</h2>
          </div>
          <div className="bg-linear-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-700">
            <ul className="space-y-3">
              {[
                'No signup required for basic tools',
                'Free forever tier with generous limits',
                'Fast processing with modern technology',
                'Works on all devices — desktop, tablet, mobile',
                'Regular updates and new tools added frequently',
                'Consent-first cookies — no tracking until you accept',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold mt-0.5">✓</span>
                  <span className="text-foreground/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-linear-to-r from-purple-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
        <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-6 opacity-90">
          Try our tools now — no credit card, no commitment, no hassle.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:scale-105 hover:shadow-xl transition-all"
        >
          🚀 Explore Tools
        </Link>
      </div>
    </main>
  )
}