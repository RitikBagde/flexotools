// src/app/blog/qr-code-best-practices-small-business/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'QR Code Best Practices for Small Businesses in 2026 | FlexoTools',
  description:
    'QR codes can drive real business results — or get ignored entirely. Learn which placements work, which fail, when to use a barcode instead, and how to make codes that actually get scanned.',
  alternates: {
    canonical: 'https://flexotools.com/blog/qr-code-best-practices-small-business',
  },
}

export default function QRBestPracticesPage() {
  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-foreground/50 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground/80">QR Code Best Practices</span>
        </nav>

        {/* ── Header ── */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-500 whitespace-nowrap">
              QR Codes
            </span>
            <div className="flex items-center gap-1.5 text-xs text-foreground/40">
              <span>March 25, 2026</span>
              <span>·</span>
              <span>7 min read</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-foreground leading-tight mb-4">
            QR Code Best Practices for Small Businesses{' '}
            <span className="text-slate-500 dark:text-slate-500">in 2026</span>
          </h1>

          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
            QR codes have gone from a novelty to a genuine business tool — menus, payment links, product
            labels, event check-ins, loyalty cards. But most small businesses make the same avoidable
            mistakes that kill scan rates. Here's what actually works.
          </p>
        </header>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-3 divide-x divide-foreground/20 border border-foreground/10 rounded-xl mb-10 overflow-hidden">
          {[
            { value: '89M', label: 'US users scanned a QR in 2023' },
            { value: '26%', label: 'Annual growth in QR usage' },
            { value: '$0', label: 'Cost to generate with FlexoTools' },
          ].map(({ value, label }) => (
            <div key={label} className="py-4 px-3 text-center bg-foreground/2">
              <div className="text-xl sm:text-2xl font-black text-slate-600 dark:text-slate-500">{value}</div>
              <div className="text-xs text-foreground/70 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Article body ── */}
        <article className="space-y-8 text-foreground/80 leading-relaxed text-[15px] sm:text-base">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              Why Most QR Codes Don't Get Scanned
            </h2>
            <p>
              Generating a QR code takes ten seconds. Getting someone to actually scan it is the hard part.
              The gap between "we added a QR code" and "people are using it" comes down to placement,
              size, contrast, and — most importantly — giving people a clear reason to scan in the first place.
            </p>
            <p className="mt-3">
              A QR code on a table tent with no label gets ignored. The same code with "Scan for today's
              specials" gets scanned dozens of times per service. The code is identical. The context is everything.
            </p>
          </section>

          {/* Tool screenshot 1 — QR Code mode */}
          <figure className="rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
            <Image
              src="/blog/qr-code-barcode/qr-generator.png"
              alt="FlexoTools QR Code Generator showing a QR code generated for a YouTube Shorts URL with custom size controls"
              width={960}
              height={520}
              className="w-full h-auto"
              priority
            />
            <figcaption className="text-xs text-foreground/60 text-center py-2 px-4 bg-foreground/2">
              The FlexoTools QR Code Generator — enter any URL or text, adjust size and colours, then download or share instantly.
            </figcaption>
          </figure>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              QR Code vs Barcode — Which Does Your Business Actually Need?
            </h2>
            <p>
              This is the first decision to make, and it's simpler than most people think.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* QR card */}
              <div className="p-4 rounded-xl border-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/30">
                <div className="font-black text-foreground mb-2 flex items-center gap-2">
                  <span>📱</span> Use a QR Code when…
                </div>
                <ul className="space-y-1.5 text-sm text-foreground/80">
                  {[
                    'You\'re linking to a URL or website',
                    'You need to share Wi-Fi credentials',
                    'The code will be scanned by a phone camera',
                    'You\'re putting it on print — menus, posters, cards',
                    'The content is long (QR handles up to ~4,000 characters)',
                  ].map(item => (
                    <li key={item} className="flex gap-2">
                      <span className="text-slate-500 shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Barcode card */}
              <div className="p-4 rounded-xl border-2 border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20">
                <div className="font-black text-foreground mb-2 flex items-center gap-2">
                  <span>🏷️</span> Use a Barcode when…
                </div>
                <ul className="space-y-1.5 text-sm text-foreground/80">
                  {[
                    'You\'re labelling a physical product for retail',
                    'A standard scanner (not phone) will read it',
                    'You\'re working with short numeric codes or SKUs',
                    'You need compatibility with point-of-sale systems',
                    'Horizontal space is limited on a label or tag',
                  ].map(item => (
                    <li key={item} className="flex gap-2">
                      <span className="text-amber-500 shrink-0 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 flex gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <span className="shrink-0 mt-0.5">💡</span>
              <p className="text-sm text-blue-800 dark:text-blue-500">
                <strong>Quick rule:</strong> If a phone camera is scanning it, use a QR code. If a handheld
                retail scanner is reading it, use a barcode. When in doubt, QR codes are more forgiving —
                they work on phones, are scannable from any angle, and handle damage better.
              </p>
            </div>
          </section>

          {/* Tool screenshot 2 — Barcode mode */}
          <figure className="rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
            <Image
              src="/blog/qr-code-barcode/barcode-generator.png"
              alt="FlexoTools Barcode Generator in barcode mode showing a generated barcode for a product code"
              width={960}
              height={520}
              className="w-full h-auto"
            />
            <figcaption className="text-xs text-foreground/60 text-center py-2 px-4 bg-foreground/2">
              Switching to Barcode mode — ideal for product labels, inventory tags, and anything read by a retail scanner.
            </figcaption>
          </figure>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              The 6 Rules That Determine Whether Your QR Code Gets Scanned
            </h2>

            {[
              {
                num: '01',
                title: 'Always include a call to action',
                body: 'A QR code with no label is a missed opportunity. Add 3–5 words above or below the code: "Scan for the menu", "Get directions", "Claim your discount", "Watch the tutorial". People scan codes when they know what they\'ll get — not out of curiosity.',
              },
              {
                num: '02',
                title: 'Size it for the scanning distance',
                body: 'The minimum printable size for reliable scanning is 2.5 cm × 2.5 cm (roughly 1 inch square) for codes scanned at arm\'s length. For posters or window displays scanned from 1–2 metres away, go to at least 8–10 cm. The FlexoTools generator lets you set resolution in pixels — for print, export at 300px or above.',
              },
              {
                num: '03',
                title: 'Dark foreground on a light background — always',
                body: 'Custom colours look great but kill scan rates if the contrast is too low. Light grey on white, dark navy on dark blue, or colour combinations where the difference is subtle will fail in bright light or on glossy surfaces. Stick to high contrast: black on white is always reliable. Test every custom colour scheme with your phone before printing.',
              },
              {
                num: '04',
                title: 'Use a short URL — not a raw long one',
                body: 'Every character you encode makes the QR pattern denser and harder to scan. A URL like "https://yourbusiness.com/menu-summer-2026-special-offers-page" generates a much more complex code than "https://yourbusiness.com/menu". Use a URL shortener, or create a simple redirect on your own domain. Shorter = simpler = more reliable.',
              },
              {
                num: '05',
                title: 'Leave the quiet zone intact',
                body: 'QR codes require a margin of white space around all four sides — called the "quiet zone" — to scan correctly. When placing a code inside a designed flyer or label, leave at least 4 modules of white space on every edge. Cropping into this margin is one of the most common reasons printed QR codes fail.',
              },
              {
                num: '06',
                title: 'Test on screen before you print anything',
                body: 'Scan the on-screen preview with your phone camera before saving the file. If it scans correctly on screen at 100% zoom, it will scan correctly when printed. This catches typos in the URL, low contrast issues, and size problems before you\'ve spent money on printing.',
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex gap-4 p-4 rounded-xl border border-foreground/10 bg-foreground/2 mb-3">
                <span className="text-2xl font-black text-slate-400/50 dark:text-slate-500/50 shrink-0 leading-none mt-0.5">{num}</span>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-foreground/70">{body}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              Where QR Codes Work Best for Small Businesses
            </h2>
            <p className="mb-4">
              Placement determines scan rate more than any design decision. These are the highest-performing
              locations based on real-world small business use:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { emoji: '🍽️', title: 'Table tents (restaurants & cafés)', desc: 'Digital menus, daily specials, loyalty sign-ups. Replaces printed menus and stays always up to date.' },
                { emoji: '💳', title: 'Business cards', desc: 'Link to your portfolio, booking page, or LinkedIn profile. Far more useful than a URL typed in small text.' },
                { emoji: '📦', title: 'Product packaging', desc: 'Link to setup guides, warranty registration, or video tutorials. Reduces support queries and adds perceived value.' },
                { emoji: '🪟', title: 'Window or door displays', desc: 'Opening hours, booking links, or a Google Maps listing for people passing by outside of business hours.' },
                { emoji: '🧾', title: 'Receipts and invoices', desc: 'Link to your review page, referral programme, or next purchase discount. The ideal moment for a follow-up action.' },
                { emoji: '📋', title: 'Event materials', desc: 'Feedback forms, social media follows, resource downloads. Replaces typed URLs nobody writes down.' },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border border-foreground/10 bg-foreground/2">
                  <span className="text-2xl shrink-0">{emoji}</span>
                  <div>
                    <div className="font-bold text-foreground text-sm mb-1">{title}</div>
                    <div className="text-xs text-foreground/70 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tool screenshot 3 — dark mode QR */}
          <figure className="rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
            <Image
              src="/blog/qr-code-barcode/qr-dark-mode.png"
              alt="FlexoTools QR Code Generator with a QR code generated and ready to download or share"
              width={960}
              height={520}
              className="w-full h-auto"
            />
            <figcaption className="text-xs text-foreground/60 text-center py-2 px-4 bg-foreground/2">
              Generated codes can be downloaded as image files or shared directly from the browser — no account needed.
            </figcaption>
          </figure>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              Common Mistakes That Kill QR Code Campaigns
            </h2>

            <div className="space-y-3">
              {[
                { bad: 'Linking to a desktop website that isn\'t mobile-optimised', why: 'Every person who scans a QR code is on a phone. If your destination page doesn\'t load or display correctly on mobile, the scan ends there.' },
                { bad: 'Putting QR codes where there\'s no phone signal', why: 'Underground venues, basements, and areas with poor reception make QR codes useless. Always test connectivity at the actual placement location.' },
                { bad: 'Using dynamic QR codes from services that expire', why: 'Some paid QR services expire your code when a trial ends — your printed materials then link to a dead page. Generate a static QR code pointing to a URL you control.' },
                { bad: 'Making the destination require an account or app download', why: 'Every additional step after scanning dramatically reduces completion. Link directly to the content — not to a signup wall.' },
                { bad: 'Printing at low resolution', why: 'A QR code exported at 72dpi looks fine on screen but prints as a blurry, unscanneable mess. Always export at 300px minimum for print, higher for large formats.' },
              ].map(({ bad, why }) => (
                <div key={bad} className="p-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10">
                  <div className="flex gap-2 items-start">
                    <span className="text-red-500 shrink-0 font-bold mt-0.5">✕</span>
                    <div>
                      <div className="font-bold text-foreground text-sm mb-1">{bad}</div>
                      <div className="text-xs text-foreground/80 leading-relaxed">{why}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              Do You Need a Paid QR Code Service?
            </h2>
            <p>
              Paid QR services offer dynamic codes — ones where you can change the destination URL after
              printing without regenerating the code. This sounds useful but creates a dependency: if you
              stop paying, your codes stop working.
            </p>
            <p className="mt-3">
              For most small businesses, a static QR code pointing to a URL you control is simpler, more
              reliable, and free. If your destination URL ever changes, create a redirect on your own domain.
              That way you own the code entirely and it never expires.
            </p>
            <p className="mt-3">
              The FlexoTools generator creates static QR codes and barcodes with no account, no subscription,
              and no expiry. What you download is yours permanently.
            </p>
          </section>

          {/* CTA box */}
          <div className="rounded-2xl p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 text-center">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-lg sm:text-xl font-black text-foreground mb-2">
              Generate Your QR Code or Barcode — Free
            </h3>
            <p className="text-sm text-foreground/60 mb-5">
              Custom colours, adjustable size, instant download. No signup, no watermark, no expiry.
              Works for URLs, Wi-Fi credentials, product codes, and plain text.
            </p>
            <Link
              href="/tools/qr-generator"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-700 hover:bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-500 text-white font-bold text-sm transition-colors"
            >
              📋 Open QR Code Generator
            </Link>
          </div>

        </article>

        {/* ── More guides ── */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">More guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/blog/how-to-create-qr-code-barcode-free', label: 'How to Create a QR Code or Barcode for Free' },
              { href: '/blog/how-to-compress-images-without-losing-quality', label: 'How to Compress Images Without Losing Quality' },
              { href: '/blog/how-to-check-resume-ats-score-free', label: 'How to Check Your Resume ATS Score for Free' },
              { href: '/blog/how-to-extract-text-from-pdf-free', label: 'How to Extract Text from a PDF Free' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 p-3 rounded-xl border border-foreground/10 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-all group text-sm text-foreground/70 hover:text-foreground"
              >
                <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">→</span>
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Back link ── */}
        <div className="mt-8">
          <Link href="/blog" className="text-sm text-foreground/40 hover:text-foreground transition-colors flex items-center gap-1">
            ← Back to blog
          </Link>
        </div>

      </div>
    </div>
  )
}