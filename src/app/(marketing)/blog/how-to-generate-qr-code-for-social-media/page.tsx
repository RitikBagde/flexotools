// src/app/blog/how-to-generate-qr-code-for-social-media/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Generate a QR Code for WhatsApp, Instagram or YouTube | FlexoTools',
  description:
    'Step-by-step guide to creating QR codes that link directly to your WhatsApp chat, Instagram profile, YouTube channel and more. Free, no signup.',
  alternates: {
    canonical: 'https://flexotools.com/blog/how-to-generate-qr-code-for-social-media',
  },
  openGraph: {
    title: 'How to Generate a QR Code for WhatsApp, Instagram or YouTube | FlexoTools Blog',
    description:
      'Create QR codes for WhatsApp, Instagram, YouTube and more — free, no signup, instant download.',
    url: 'https://flexotools.com/blog/how-to-generate-qr-code-for-social-media',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Generate a QR Code for WhatsApp, Instagram or YouTube',
  description:
    'Step-by-step guide to creating QR codes for WhatsApp, Instagram, YouTube and other platforms.',
  author: { '@type': 'Organization', name: 'FlexoTools', url: 'https://flexotools.com' },
  publisher: {
    '@type': 'Organization',
    name: 'FlexoTools',
    logo: { '@type': 'ImageObject', url: 'https://flexotools.com/logo.png' },
  },
  datePublished: '2026-03-25',
  dateModified: '2026-03-25',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://flexotools.com/blog/how-to-generate-qr-code-for-social-media',
  },
}

const platforms = [
  {
    name: 'WhatsApp',
    icon: '💬',
    color: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10',
    labelColor: 'text-green-800 dark:text-green-400',
    url: 'https://wa.me/[your-number]',
    note: 'Replace [your-number] with your full number including country code, no spaces or dashes. Example: https://wa.me/919876543210 for an Indian number.',
    useCase: 'Let customers message you directly by scanning — perfect for business cards, flyers and shop windows.',
  },
  {
    name: 'Instagram',
    icon: '📸',
    color: 'border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-900/10',
    labelColor: 'text-pink-800 dark:text-pink-500',
    url: 'https://instagram.com/[yourusername]',
    note: 'Replace [yourusername] with your Instagram handle without the @ symbol.',
    useCase: 'Drive followers from printed materials, packaging, or event banners directly to your profile.',
  },
  {
    name: 'YouTube',
    icon: '▶️',
    color: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10',
    labelColor: 'text-red-800 dark:text-red-500',
    url: 'https://youtube.com/@[yourchannel]',
    note: 'Use your channel handle URL. You can also link to a specific video by using its full URL.',
    useCase: 'Add to product packaging so customers can scan to watch tutorials, reviews or demos.',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    color: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10',
    labelColor: 'text-blue-800 dark:text-blue-500',
    url: 'https://linkedin.com/in/[yourprofile]',
    note: 'Use your LinkedIn public profile URL. Find it under your profile settings.',
    useCase: 'Add to your CV, name badge at events, or email signature to make connecting instant.',
  },
  {
    name: 'X (Twitter)',
    icon: '🐦',
    color: 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/10',
    labelColor: 'text-slate-800 dark:text-slate-500',
    url: 'https://x.com/[yourusername]',
    note: 'Use your full X profile URL with your handle.',
    useCase: 'Useful for events, conferences, and speaker slides where you want the audience to follow quickly.',
  },
  {
    name: 'TikTok',
    icon: '🎵',
    color: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10',
    labelColor: 'text-purple-800 dark:text-purple-400',
    url: 'https://tiktok.com/@[yourusername]',
    note: 'Use the @ format for your TikTok profile URL.',
    useCase: 'Print on packaging, stickers or pop-up stands to direct foot traffic to your content.',
  },
]

export default function BlogPostQRSocialMedia() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-3xl mx-auto">

        <nav className="flex items-center gap-2 text-sm text-foreground/50 mb-8 pt-4" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground/80">QR Code for Social Media</span>
        </nav>

        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300">
              QR Codes
            </span>
            <span className="text-xs text-foreground/40">March 25, 2026</span>
            <span className="text-xs text-foreground/40">· 5 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            How to Generate a QR Code for
            <span className="text-slate-500"> WhatsApp, Instagram or YouTube</span>
          </h1>

          <p className="text-lg text-foreground/60 leading-relaxed">
            A QR code that opens your WhatsApp chat, Instagram profile, or YouTube channel
            directly is one of the most practical tools for creators, freelancers, and small
            businesses. This guide covers the exact URLs to use for each platform and how to
            generate, test, and download your code in under two minutes.
          </p>

          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">6</div>
              <div className="text-xs text-foreground/60 mt-1">Platforms covered</div>
            </div>
            <div className="text-center border-x border-slate-200 dark:border-slate-800">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">&lt;2m</div>
              <div className="text-xs text-foreground/60 mt-1">Time to generate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">0</div>
              <div className="text-xs text-foreground/60 mt-1">Signups needed</div>
            </div>
          </div>
        </header>

        <article className="prose prose-gray dark:prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              How It Works — The URL Trick
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Every social platform has a public URL format for profiles and actions. A QR code
              is just a scannable version of a URL — so all you need to do is find the right URL
              format for the platform, swap in your username or number, and generate a QR code
              from it.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-3">
              When someone scans the code, their phone opens that URL — which takes them straight
              to your profile, starts a WhatsApp chat, or plays your YouTube channel. No app
              download required, no typing, no searching.
            </p>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 mt-4">
              <p className="text-sm font-semibold text-blue-950 dark:text-blue-400">
                💡 <strong>Always test before printing:</strong> Point your phone camera at the
                QR code preview on screen before downloading. Confirm it opens the correct page.
                A typo in the URL generates a valid-looking but broken QR code.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Platform-by-Platform URL Guide
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-5">
              Find your platform below, copy the URL format, replace the placeholder with your
              username or number, then paste it into the{' '}
              <Link href="/tools/qr-generator" className="text-slate-600 dark:text-slate-500 hover:underline font-medium">
                FlexoTools QR Code Generator
              </Link>
              .
            </p>

            <div className="space-y-4">
              {platforms.map((p) => (
                <div key={p.name} className={`rounded-xl border p-5 ${p.color}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{p.icon}</span>
                    <span className={`font-black text-lg ${p.labelColor}`}>{p.name}</span>
                  </div>
                  <div className="mb-3">
                    <div className="text-xs font-bold text-foreground/40 uppercase tracking-wide mb-1">URL format</div>
                    <code className="text-sm bg-foreground/10 px-3 py-1.5 rounded-lg block font-mono text-foreground">
                      {p.url}
                    </code>
                  </div>
                  <p className="text-xs text-foreground/60 mb-2">{p.note}</p>
                  <div className="text-xs text-foreground/50 italic">📌 {p.useCase}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Step-by-Step: Generate Your QR Code
            </h2>

            {[
              {
                n: 1,
                title: 'Copy the correct URL for your platform',
                body: 'Use the table above. Replace the placeholder (shown in square brackets) with your actual username, handle, or phone number. Double-check for typos — one wrong character breaks the link.',
              },
              {
                n: 2,
                title: 'Open the QR Code Generator',
                body: 'Go to FlexoTools QR Code Generator. Make sure the QR Code tab is selected (not Barcode).',
              },
              {
                n: 3,
                title: 'Paste your URL',
                body: 'Paste the full URL into the Text or URL input box. The QR code preview on the right updates instantly as you type.',
              },
              {
                n: 4,
                title: 'Customise size and colors (optional)',
                body: 'Use the Size slider to increase the resolution for print use — 300px or higher is recommended for anything that will be printed. Use the Foreground and Background color pickers if you want to match your brand colors. Keep strong contrast between the two for reliable scanning.',
              },
              {
                n: 5,
                title: 'Test with your phone before downloading',
                body: 'Point your phone camera at the preview on screen. Confirm it opens the correct profile or chat. Only download once you have verified it works.',
              },
              {
                n: 6,
                title: 'Download or Share',
                body: 'Click Download to save the image, or Share to send it directly via your device\'s share sheet. The downloaded file is a high-resolution image ready for print or digital use.',
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex items-start gap-4 mb-6">
                <div className="shrink-0 w-8 h-8 rounded-full bg-slate-600 text-white flex items-center justify-center font-bold text-sm">
                  {n}
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">{title}</h3>
                  <p className="text-sm text-foreground/70 mt-1 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Where to Use Your Social Media QR Codes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { place: 'Business cards', tip: 'Replace your long social handles with a single scannable code' },
                { place: 'Product packaging', tip: 'Link to unboxing videos, tutorials, or your brand Instagram' },
                { place: 'Shop window or counter', tip: 'Let walk-in customers follow you without searching manually' },
                { place: 'Event name badges', tip: 'LinkedIn QR code makes networking instant at conferences' },
                { place: 'Printed flyers', tip: 'Drive offline audiences to your online content' },
                { place: 'Email signature', tip: 'Add as an image so recipients can scan from mobile' },
                { place: 'Presentation slides', tip: 'Let your audience follow you before you even finish speaking' },
                { place: 'Restaurant menus', tip: 'Link to your food delivery page or promotional video' },
              ].map((item) => (
                <div key={item.place} className="flex items-start gap-3 p-3 rounded-lg border border-foreground/10 text-sm">
                  <span className="text-slate-500 font-bold shrink-0 mt-0.5">▦</span>
                  <div>
                    <div className="font-bold text-foreground">{item.place}</div>
                    <div className="text-foreground/60 text-xs mt-0.5">{item.tip}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-linear-to-br from-slate-500/10 via-blue-500/10 to-purple-500/10 border border-slate-500/20 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Generate your QR code now</h2>
            <p className="text-foreground/60">Free, instant, no signup. Download in seconds.</p>
            <Link
              href="/tools/qr-generator"
              className="inline-block px-8 py-3 bg-linear-to-r from-slate-600 to-blue-600 text-white rounded-xl font-bold hover:scale-105 hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-200"
            >
              ▦ Open QR Code Generator
            </Link>
          </section>

          <section className="border-t border-foreground/10 pt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">More guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'How to Create a QR Code or Barcode for Free', href: '/blog/how-to-create-qr-code-barcode-free' },
                { title: "Dynamic vs Static QR Codes — What's the Difference?", href: '/blog/dynamic-vs-static-qr-codes' },
                { title: 'How to Write a Resume Summary That Passes ATS', href: '/blog/how-to-write-a-resume-summary-that-passes-ats' },
                { title: 'Top 10 ATS Resume Mistakes and How to Fix Them', href: '/blog/top-10-ats-resume-mistakes' },
              ].map((post) => (
                <Link key={post.title} href={post.href} className="flex items-center gap-3 p-3 rounded-lg border border-foreground/10 hover:border-slate-500/30 hover:bg-foreground/5 transition-all text-sm font-medium text-foreground/70 hover:text-foreground">
                  <span className="text-slate-500">→</span>{post.title}
                </Link>
              ))}
            </div>
          </section>
        </article>

        <div className="pt-8 pb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors">
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