// src/app/blog/how-to-create-qr-code-barcode-free/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Create a QR Code or Barcode for Free — No Signup | FlexoTools',
  description:
    'Generate a scannable QR code or barcode in seconds. Custom colors, adjustable size, instant download. No account needed.',
  alternates: {
    canonical: 'https://flexotools.com/blog/how-to-create-qr-code-barcode-free',
  },
  openGraph: {
    title: 'How to Create a QR Code or Barcode for Free | FlexoTools Blog',
    description:
      'A complete guide to free QR code and barcode generation — custom colors, sizes, download and share. No signup.',
    url: 'https://flexotools.com/blog/how-to-create-qr-code-barcode-free',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Create a QR Code or Barcode for Free — No Signup',
  description:
    'Generate a scannable QR code or barcode in seconds using FlexoTools. Custom colors, adjustable size, instant download.',
  author: {
    '@type': 'Organization',
    name: 'FlexoTools',
    url: 'https://flexotools.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FlexoTools',
    logo: {
      '@type': 'ImageObject',
      url: 'https://flexotools.com/logo.png',
    },
  },
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://flexotools.com/blog/how-to-create-qr-code-barcode-free',
  },
}

export default function BlogPostQRGenerator() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-foreground/50 mb-8 pt-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground/80">QR Code & Barcode Guide</span>
        </nav>

        {/* Article header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-200">
              QR Codes
            </span>
            <span className="text-xs text-foreground/40">March 25, 2026</span>
            <span className="text-xs text-foreground/40">· 5 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            How to Create a QR Code or Barcode for Free
            <span className="text-slate-500"> — No Signup</span>
          </h1>

          <p className="text-lg text-foreground/60 leading-relaxed">
            QR codes and barcodes are useful far beyond retail shelves. From sharing a Wi-Fi
            password to linking a printed flyer to a website, scannable codes solve real problems
            quickly. This guide covers both modes in the FlexoTools generator, including custom
            colors, size controls, and how to share your code without downloading it.
          </p>

          {/* Quick stats bar */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">2</div>
              <div className="text-xs text-foreground/60 mt-1">Code types</div>
            </div>
            <div className="text-center border-x border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">∞</div>
              <div className="text-xs text-foreground/60 mt-1">No usage limit</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">0</div>
              <div className="text-xs text-foreground/60 mt-1">Signups needed</div>
            </div>
          </div>
        </header>

        {/* Article body */}
        <article className="prose prose-gray dark:prose-invert max-w-none space-y-8">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              QR Code vs Barcode — Which Should You Use?
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Both encode data as a scannable image, but they work differently and suit different
              use cases.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {[
                {
                  type: 'QR Code',
                  icon: '▦',
                  pros: ['Stores URLs, long text, Wi-Fi credentials', 'Scannable from any angle', 'Works even if partially damaged', 'Supported by all modern phone cameras'],
                  best: 'Websites, social profiles, Wi-Fi sharing, contact cards',
                  color: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10',
                  labelColor: 'text-blue-700 dark:text-blue-400',
                },
                {
                  type: 'Barcode',
                  icon: '|||',
                  pros: ['Industry-standard format', 'Works with retail scanners', 'Best for product codes and short IDs', 'Compact horizontal footprint'],
                  best: 'Product labels, inventory, short numeric IDs',
                  color: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10',
                  labelColor: 'text-purple-700 dark:text-purple-400',
                },
              ].map((item) => (
                <div key={item.type} className={`p-4 rounded-xl border ${item.color}`}>
                  <div className={`text-lg font-black mb-2 ${item.labelColor}`}>{item.type}</div>
                  <ul className="space-y-1 mb-3">
                    {item.pros.map((p) => (
                      <li key={p} className="text-sm text-foreground/70 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs font-semibold text-foreground/50">Best for: {item.best}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 mt-4">
              <p className="text-sm font-semibold text-blue-950 dark:text-blue-400">
                💡 <strong>Quick rule:</strong> If you're sharing a URL or any text-heavy content,
                use QR Code. If you need a scannable code for a product, inventory system, or
                anything a retail scanner will read, use Barcode.
              </p>
            </div>
          </section>

          {/* Section 2 — Step by step */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Step-by-Step: How to Generate Your Code
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Open{' '}
              <Link href="/tools/qr-code-generator" className="text-slate-600 dark:text-slate-400 hover:underline font-medium">
                FlexoTools QR Code & Barcode Generator
              </Link>{' '}
              in your browser. No account needed.
            </p>

            {[
              {
                n: 1,
                title: 'Choose QR Code or Barcode mode',
                body: (
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    At the top of the card, click either the <strong>QR Code</strong> or
                    <strong> Barcode</strong> tab. The active tab highlights in dark. The input
                    label below changes to match — "Text or URL" for QR Code, "Text or Code"
                    for Barcode.
                  </p>
                ),
              },
              {
                n: 2,
                title: 'Enter your text or URL',
                body: (
                  <>
                    <p className="text-foreground/70 mt-1 leading-relaxed">
                      Type or paste your content into the input box. For QR Codes, always include
                      the full URL with <strong>https://</strong> — for example,
                      "https://flexotools.com" rather than just "flexotools.com". This ensures
                      phone cameras open the link directly rather than treating it as a search query.
                    </p>
                    <p className="text-foreground/70 leading-relaxed mt-2">
                      For Barcodes, the tool works best with short product codes, numbers, or IDs.
                      Only the first line of text is used — keep it concise.
                    </p>
                    <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 mt-3">
                      <p className="text-sm text-amber-950 dark:text-amber-500">
                        ⚠️ <strong>Barcode note:</strong> Very long strings may generate an
                        unreadable barcode. If the preview looks too dense to scan, shorten your
                        input or switch to QR Code mode instead.
                      </p>
                    </div>
                  </>
                ),
              },
              {
                n: 3,
                title: 'Adjust size and colors',
                body: (
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    Use the <strong>Size</strong> slider to set the output resolution in pixels
                    (from roughly 100px to 400px). For print use, go larger — 300px+ ensures the
                    code is sharp when printed at business card size. Use the{' '}
                    <strong>Foreground</strong> and <strong>Background</strong> color pickers to
                    customize the code colors. Keep enough contrast between the two — a dark
                    foreground on a light background always scans most reliably.
                  </p>
                ),
              },
              {
                n: 4,
                title: 'Preview and scan test',
                body: (
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    The preview panel on the right updates live as you type. Before downloading,
                    test the code by pointing your phone camera at the screen. The tool shows
                    "Scan with your phone to test!" as a reminder. If it scans correctly on screen,
                    it will work when printed or displayed digitally.
                  </p>
                ),
              },
              {
                n: 5,
                title: 'Download or Share',
                body: (
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    Click <strong>Download</strong> to save the code as an image file to your device.
                    Or click <strong>Share</strong> to use your browser's native share sheet — useful
                    for sending the code directly to a messaging app, email, or AirDrop without saving
                    it first.
                  </p>
                ),
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex items-start gap-4 mb-8">
                <div className="shrink-0 w-8 h-8 rounded-full bg-slate-600 text-white flex items-center justify-center font-bold text-sm">
                  {n}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{title}</h3>
                  {body}
                </div>
              </div>
            ))}
          </section>

          {/* Section 3 — Use cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              10 Practical Uses for QR Codes
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              QR codes are more versatile than most people realise. Here are common real-world uses:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { use: 'Link a printed flyer to a website', icon: '🖨️' },
                { use: 'Share Wi-Fi credentials without typing the password', icon: '📶' },
                { use: 'Add a QR code to a business card', icon: '💼' },
                { use: 'Link a product to its instruction manual', icon: '📦' },
                { use: 'Share your social media profile at events', icon: '📱' },
                { use: 'Add a payment link to an invoice', icon: '💳' },
                { use: 'Link a poster to a video or playlist', icon: '🎵' },
                { use: 'Create a contactless menu for a restaurant', icon: '🍽️' },
                { use: 'Encode a Google Maps location for directions', icon: '📍' },
                { use: 'Add a QR code to a presentation slide', icon: '📊' },
              ].map((item) => (
                <div key={item.use} className="flex items-center gap-3 p-3 rounded-lg border border-foreground/30 text-sm text-foreground/70">
                  <span className="text-lg">{item.icon}</span>
                  {item.use}
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 — Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Tips for Better Codes
            </h2>
            <div className="space-y-4">
              {[
                {
                  tip: 'Always test before printing',
                  detail: 'Use your phone camera to scan the on-screen preview before printing 500 flyers. Catching a typo in the URL at this stage costs nothing; catching it after printing is expensive.',
                },
                {
                  tip: 'Use a URL shortener for long links',
                  detail: 'The longer the URL encoded in a QR code, the denser and harder to scan the pattern becomes. Use a short link (e.g. via Bitly or your own domain redirect) to keep the code simple and reliable.',
                },
                {
                  tip: 'Keep sufficient quiet zone around the code',
                  detail: 'QR codes need a margin of white space (the "quiet zone") around them to scan correctly. When placing the code in a design, leave at least 4 modules of white space on all sides.',
                },
                {
                  tip: 'Dark on light always scans best',
                  detail: 'While custom colors are supported, the most reliable combination is always a dark foreground color on a white or very light background. Avoid low-contrast combinations like light grey on white.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-foreground/10 hover:border-slate-500/30 transition-colors">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">{item.tip}</div>
                    <p className="text-sm text-foreground/60 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="p-6 rounded-2xl bg-linear-to-br from-slate-500/10 via-blue-500/10 to-purple-500/10 border border-slate-500/20 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to generate your code?
            </h2>
            <p className="text-foreground/60">
              Free, instant, no signup. QR codes and barcodes in seconds.
            </p>
            <Link
              href="/tools/qr-code-generator"
              className="inline-block px-8 py-3 bg-linear-to-r from-slate-600 to-blue-600 text-white rounded-xl font-bold hover:scale-105 hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-200"
            >
              ▦ Open QR Code Generator
            </Link>
          </section>

          {/* Related posts */}
          <section className="border-t border-foreground/10 pt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">More guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'How to Compress Images Online Free Without Losing Quality', href: '/blog/how-to-compress-images-without-losing-quality' },
                { title: 'How to Summarize Text Online Free', href: '/blog/how-to-summarize-text-online-free' },
                { title: 'How to Check Your Resume ATS Score for Free', href: '/blog/how-to-check-resume-ats-score-free' },
                { title: 'How to Extract Text from a PDF Free', href: '/blog/how-to-extract-text-from-pdf-free' },
              ].map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-foreground/10 hover:border-slate-500/30 hover:bg-foreground/5 transition-all text-sm font-medium text-foreground/70 hover:text-foreground"
                >
                  <span className="text-slate-500">→</span>
                  {post.title}
                </Link>
              ))}
            </div>
          </section>
        </article>

        {/* Back to blog */}
        <div className="pt-8 pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
        </div>
      </div>
    </>
  )
}