// src/app/blog/how-to-compress-images-without-losing-quality/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Compress Images Without Losing Quality (Free, No Signup)',
  description:
    'Step-by-step guide to compressing JPG, PNG, WebP and AVIF images online for free. Learn Quick Preset, Target Size and Custom modes — no signup, no quality loss.',
  alternates: {
    canonical: 'https://flexotools.com/blog/how-to-compress-images-without-losing-quality',
  },
  openGraph: {
    title: 'How to Compress Images Without Losing Quality | FlexoTools Blog',
    description:
      'A complete guide to free online image compression — JPG, PNG, WebP, AVIF. No signup required.',
    url: 'https://flexotools.com/blog/how-to-compress-images-without-losing-quality',
    type: 'article',
  },
}

// JSON-LD Article schema — helps Google show this as a rich result
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Compress Images Without Losing Quality (Free, No Signup)',
  description:
    'Step-by-step guide to compressing JPG, PNG, WebP and AVIF images online for free using FlexoTools.',
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
    '@id': 'https://flexotools.com/blog/how-to-compress-images-without-losing-quality',
  },
}

export default function BlogPostImageCompressor() {
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
          <span className="text-foreground/80">Image Compression Guide</span>
        </nav>

        {/* Article header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-500">
              Image Compression
            </span>
            <span className="text-xs text-foreground/40">March 25, 2026</span>
            <span className="text-xs text-foreground/40">· 6 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            How to Compress Images Without Losing Quality
            <span className="text-purple-500"> (Free, No Signup)</span>
          </h1>

          <p className="text-lg text-foreground/60 leading-relaxed">
            Large images slow down websites, eat up storage, and get rejected by email clients.
            This guide walks you through compressing JPG, PNG, WebP and AVIF images online for
            free — using FlexoTools image compressor, with no signup and no watermarks.
          </p>

          {/* Quick stats bar */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">97%</div>
              <div className="text-xs text-foreground/60 mt-1">Max size reduction</div>
            </div>
            <div className="text-center border-x border-purple-200 dark:border-purple-800">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">6</div>
              <div className="text-xs text-foreground/60 mt-1">Formats supported</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">0</div>
              <div className="text-xs text-foreground/60 mt-1">Signups needed</div>
            </div>
          </div>
        </header>

        {/* Article body */}
        <article className="prose prose-gray dark:prose-invert max-w-none space-y-8">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Why Image File Size Matters
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Every image on a webpage adds to its load time. Google uses page speed as a ranking
              signal, which means oversized images can directly hurt your SEO. A 4MB JPG that
              compresses down to 110 kB loads roughly 36x faster — and in most cases, visitors
              cannot tell the difference visually.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-4">
              Beyond websites, compressed images matter for email attachments (most clients cap at
              10–25MB), social media uploads, and simply freeing up storage on your phone or computer.
            </p>

            {/* Tip box */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 mt-4">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-400">
                💡 <strong>Quick fact:</strong> According to web performance research, images account
                for over 50% of the average webpage's total byte size. Compressing them is the
                single highest-impact optimization most sites can make.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              What Formats Can You Compress?
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              FlexoTools image compressor supports the most commonly used image formats:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
              {[
                { format: 'JPG / JPEG', use: 'Photos, social media', color: 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800' },
                { format: 'PNG', use: 'Screenshots, logos', color: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' },
                { format: 'WebP', use: 'Web images, modern apps', color: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' },
                { format: 'AVIF', use: 'Next-gen web format', color: 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800' },
                { format: 'TIFF', use: 'Print, photography', color: 'bg-pink-50 dark:bg-pink-900/10 border-pink-200 dark:border-pink-800' },
                { format: 'GIF', use: 'Simple animations', color: 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-800' },
              ].map((item) => (
                <div key={item.format} className={`p-3 rounded-lg border ${item.color}`}>
                  <div className="font-bold text-foreground text-sm">{item.format}</div>
                  <div className="text-xs text-foreground/60 mt-0.5">{item.use}</div>
                </div>
              ))}
            </div>

            <p className="text-foreground/70 leading-relaxed mt-4">
              The one format not supported is <strong>HEIC</strong> — the default format on iPhones.
              If you have HEIC files, convert them to JPG first using your phone's share menu or a
              free converter, then compress with FlexoTools.
            </p>
          </section>

          {/* Section 3 — Step by step */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Step-by-Step: How to Compress an Image
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Open{' '}
              <Link href="/tools/image-compressor" className="text-purple-500 hover:underline font-medium">
                FlexoTools Image Compressor
              </Link>{' '}
              in your browser — no account needed. Here is the full process.
            </p>

            {/* Step 1 */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Upload your image</h3>
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    Click <strong>Choose File</strong> and select any image up to 4.5MB. The tool
                    shows a live preview immediately after upload so you can confirm it loaded the
                    right file. The original file size is displayed in the info bar below the
                    upload button.
                  </p>
                </div>
              </div>

              {/* Screenshot placeholder — replace src with actual imported image */}
              <div className="rounded-xl overflow-hidden border border-foreground/10 shadow-lg ml-12">
                <img
                  src="/blog/image-compressor/step1-upload.png"
                  alt="FlexoTools image compressor upload section showing Choose File button and No file chosen text"
                  className="w-full"
                  loading="lazy"
                />
                <p className="text-xs text-foreground/40 text-center py-2 bg-foreground/5">
                  The upload section — supports JPG, PNG, WebP, AVIF, TIFF and GIF
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Choose a compression mode</h3>
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    There are three modes. Pick the one that fits your situation:
                  </p>
                </div>
              </div>

              <div className="ml-12 space-y-3">
                {[
                  {
                    mode: '🚀 Quick Preset',
                    when: 'Best for most people',
                    detail: 'Choose Small (max 1280px, 60% quality), Medium (max 1920px, 75% quality), or Large (original dimensions, 85% quality). Medium is the right default for website images and social media.',
                    color: 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/10',
                  },
                  {
                    mode: '🎯 Target Size',
                    when: 'When you have a size limit',
                    detail: 'Enter an exact target in kB — useful when uploading to platforms with strict limits (e.g. 250 kB for a job portal, 1 MB for a form attachment). The tool automatically adjusts quality to hit your target.',
                    color: 'border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10',
                  },
                  {
                    mode: '⚙️ Custom',
                    when: 'When you need exact control',
                    detail: 'Set a specific width and height in pixels and drag the quality slider anywhere from 30% to 100%. Useful for resizing product images to exact dimensions or creating thumbnails.',
                    color: 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10',
                  },
                ].map((item) => (
                  <div key={item.mode} className={`p-4 rounded-xl border ${item.color}`}>
                    <div className="font-bold text-foreground">{item.mode}</div>
                    <div className="text-xs font-semibold text-foreground/50 mt-0.5 mb-1">{item.when}</div>
                    <p className="text-sm text-foreground/70 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl overflow-hidden border border-foreground/10 shadow-lg ml-12">
                <img
                  src="/blog/image-compressor/step2-modes.png"
                  alt="FlexoTools compression modes showing Quick Preset selected with Medium size dropdown and Auto output format"
                  className="w-full"
                  loading="lazy"
                />
                <p className="text-xs text-foreground/40 text-center py-2 bg-foreground/5">
                  Quick Preset mode selected with Medium quality — the best starting point for most images
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Choose your output format</h3>
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    Leave this on <strong>Auto (Smart detection)</strong> in most cases — the tool
                    will keep your original format. If you want to convert to a more efficient format,
                    choose WebP or AVIF. Both are supported by all modern browsers and can be
                    30–50% smaller than JPG at the same visual quality.
                  </p>
                  <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 mt-3">
                    <p className="text-sm text-amber-900 dark:text-amber-500">
                      ⚠️ <strong>WordPress users:</strong> Make sure your theme supports WebP before
                      converting, or use a plugin like ShortPixel that handles compatibility automatically.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Download and check the result</h3>
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    Click <strong>Download Compressed Image</strong>. The file saves instantly to
                    your downloads folder. The info bar updates to show the compressed size and the
                    exact percentage reduction. In the example below, a 4141.5 kB image compressed
                    to just 109.8 kB — a 97.3% reduction — with no visible quality loss.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-foreground/10 shadow-lg ml-12">
                <img
                  src="/blog/image-compressor/step4-result.png"
                  alt="FlexoTools showing compression result: original 4141.5 kB compressed to 109.8 kB, 97.3% smaller"
                  className="w-full"
                  loading="lazy"
                />
                <p className="text-xs text-foreground/40 text-center py-2 bg-foreground/5">
                  Real result: 4141.5 kB → 109.8 kB (97.3% smaller) using Medium preset
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 — Format comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              JPG vs PNG vs WebP vs AVIF — Which Should You Use?
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              The format you compress to matters as much as the quality setting. Here is a quick
              comparison to help you decide:
            </p>

            <div className="overflow-x-auto rounded-xl border border-foreground/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-foreground/5 border-b border-foreground/10">
                    <th className="text-left p-3 font-bold text-foreground">Format</th>
                    <th className="text-left p-3 font-bold text-foreground">Best for</th>
                    <th className="text-left p-3 font-bold text-foreground">Transparency</th>
                    <th className="text-left p-3 font-bold text-foreground">File size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/10">
                  {[
                    { fmt: 'JPG', best: 'Photos, hero images', transparency: '❌ No', size: 'Medium' },
                    { fmt: 'PNG', best: 'Logos, screenshots', transparency: '✅ Yes', size: 'Large' },
                    { fmt: 'WebP', best: 'All web images', transparency: '✅ Yes', size: 'Small' },
                    { fmt: 'AVIF', best: 'Next-gen web', transparency: '✅ Yes', size: 'Smallest' },
                  ].map((row) => (
                    <tr key={row.fmt} className="hover:bg-foreground/5 transition-colors">
                      <td className="p-3 font-bold text-purple-500">{row.fmt}</td>
                      <td className="p-3 text-foreground/70">{row.best}</td>
                      <td className="p-3 text-foreground/70">{row.transparency}</td>
                      <td className="p-3 text-foreground/70">{row.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-foreground/70 leading-relaxed mt-4">
              For new websites, <strong>WebP is the safest choice</strong> — near-universal browser
              support, significantly smaller than JPG, and supports transparency unlike JPG. AVIF
              is even smaller but has slightly less compatibility with older browsers.
            </p>
          </section>

          {/* Section 5 — Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              5 Tips for Better Compression Results
            </h2>

            <div className="space-y-4">
              {[
                {
                  tip: 'Start with Medium preset, then check visually',
                  detail: 'Medium preset (75% quality, max 1920px) is the sweet spot for most web images. Download the compressed file, zoom in at 100%, and only reduce quality further if it still looks sharp.',
                },
                {
                  tip: 'Use Target Size mode for upload forms',
                  detail: 'Job portals, government forms, and email services often cap attachments at a specific size. Use Target Size mode and enter the limit directly — no guesswork needed.',
                },
                {
                  tip: 'Convert PNG photos to WebP or JPG',
                  detail: 'If someone sent you a PNG of a photograph (not a logo or screenshot), convert it to JPG or WebP using the Output Format dropdown. PNGs of photos are almost always unnecessarily large.',
                },
                {
                  tip: 'Name your output file before downloading',
                  detail: 'The Output Image Name field lets you set the filename before downloading. Use descriptive names like "product-hero-compressed" rather than the default, especially if you are optimizing images for a website.',
                },
                {
                  tip: 'Use Custom mode for product images with exact dimensions',
                  detail: 'E-commerce platforms often require images to be exactly 800×800px or 1200×1200px. Use Custom mode, enter the exact pixel dimensions, and set quality to 80% — that combination works well for product listings.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-foreground/10 hover:border-purple-500/30 transition-colors">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-purple-100 dark:bg-purple-900/25 text-purple-700 dark:text-purple-500 flex items-center justify-center font-bold text-sm">
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

          {/* Section 6 — Privacy */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Is It Safe? What Happens to My Images?
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              FlexoTools processes images client-side in your browser by default. This means your
              image data never leaves your device — it is compressed locally using browser APIs and
              downloaded directly. No images are stored on any server, and no account is required
              to track your activity.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-4">
              This makes it safe to compress confidential images, internal screenshots, or personal
              photos. If you have very sensitive documents, client-side processing is always
              preferable to uploading to a remote server.
            </p>
          </section>

          {/* CTA */}
          <section className="p-6 rounded-2xl bg-linear-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/20 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to compress your images?
            </h2>
            <p className="text-foreground/60">
              Free, no signup, no watermarks. Works entirely in your browser.
            </p>
            <Link
              href="/tools/image-compressor"
              className="inline-block px-8 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-200"
            >
              🖼️ Open Image Compressor
            </Link>
          </section>

          {/* Related posts */}
          <section className="border-t border-foreground/10 pt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">More guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'How to Check Your Resume ATS Score for Free', href: '/blog/how-to-check-resume-ats-score-free' },
                { title: 'How to Create a QR Code or Barcode for Free', href: '/blog/how-to-create-qr-code-barcode-free' },
                { title: 'How to Extract Text from a PDF Free', href: '/blog/how-to-extract-text-from-pdf-free' },
                { title: 'How to Summarize Text Online Free', href: '/blog/how-to-summarize-text-online-free' }
              ].map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-foreground/10 hover:border-green-500/30 hover:bg-foreground/5 transition-all text-sm font-medium text-foreground/70 hover:text-foreground"
                >
                  <span className="text-green-500">→</span>
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