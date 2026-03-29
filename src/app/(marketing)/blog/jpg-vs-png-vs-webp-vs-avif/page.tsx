// src/app/blog/jpg-vs-png-vs-webp-vs-avif/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'JPG vs PNG vs WebP vs AVIF — Which Image Format Should You Use? | FlexoTools',
  description:
    'A plain-English breakdown of every major image format. Learn when to use JPG, PNG, WebP or AVIF for websites, social media, print and email — with file size comparisons.',
  alternates: {
    canonical: 'https://flexotools.com/blog/jpg-vs-png-vs-webp-vs-avif',
  },
  openGraph: {
    title: 'JPG vs PNG vs WebP vs AVIF — Which Format Should You Use? | FlexoTools Blog',
    description:
      'Plain-English guide to image formats. When to use JPG, PNG, WebP or AVIF — with real file size comparisons.',
    url: 'https://flexotools.com/blog/jpg-vs-png-vs-webp-vs-avif',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'JPG vs PNG vs WebP vs AVIF — Which Image Format Should You Use?',
  description:
    'A plain-English breakdown of every major image format — when to use JPG, PNG, WebP or AVIF for websites, social media, print and email.',
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
    '@id': 'https://flexotools.com/blog/jpg-vs-png-vs-webp-vs-avif',
  },
}

export default function BlogPostImageFormats() {
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
          <span className="text-foreground/80">Image Format Guide</span>
        </nav>

        {/* Article header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-500">
              Image Compression
            </span>
            <span className="text-xs text-foreground/40">March 25, 2026</span>
            <span className="text-xs text-foreground/40">· 8 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            JPG vs PNG vs WebP vs AVIF
            <span className="text-purple-500"> — Which Format Should You Use?</span>
          </h1>

          <p className="text-lg text-foreground/60 leading-relaxed">
            Picking the wrong image format is one of the most common and costly mistakes on the
            web. A PNG where a JPG would do can be 5× larger. A JPG where WebP would work costs
            you 30% extra bandwidth on every page load. This guide cuts through the confusion with
            a clear, practical breakdown of every major format.
          </p>

          {/* Format pill row */}
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { label: 'JPG', color: 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-700' },
              { label: 'PNG', color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-700' },
              { label: 'WebP', color: 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-700' },
              { label: 'AVIF', color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 border-purple-200 dark:border-purple-700' },
              { label: 'GIF', color: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700' },
              { label: 'SVG', color: 'bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-400 border-pink-200 dark:border-pink-700' },
            ].map((f) => (
              <span key={f.label} className={`px-3 py-1 rounded-full text-xs font-bold border ${f.color}`}>
                {f.label}
              </span>
            ))}
          </div>
        </header>

        {/* Article body */}
        <article className="prose prose-gray dark:prose-invert max-w-none space-y-10">

          {/* TL;DR */}
          <section className="p-5 rounded-2xl bg-foreground/5 border border-foreground/10">
            <h2 className="text-lg font-black text-foreground mb-3">⚡ TL;DR — Quick reference</h2>
            <div className="space-y-2">
              {[
                { format: 'JPG', use: 'Photos, hero images, social media — anywhere transparency is not needed.' },
                { format: 'PNG', use: 'Logos, screenshots, UI elements — anything that needs transparency or crisp edges.' },
                { format: 'WebP', use: 'All web images — modern replacement for both JPG and PNG, smaller file sizes.' },
                { format: 'AVIF', use: 'Next-gen web images — smallest files, best quality, slightly less browser support.' },
                { format: 'GIF', use: 'Simple looping animations only. Use video (MP4) for anything longer than 3 seconds.' },
                { format: 'SVG', use: 'Icons, logos, illustrations — resolution-independent, tiny file size for vector art.' },
              ].map((row) => (
                <div key={row.format} className="flex items-start gap-3 text-sm">
                  <span className="font-black text-purple-500 w-10 shrink-0">{row.format}</span>
                  <span className="text-foreground/70">{row.use}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 1 — JPG */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-black bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400 border border-orange-200 dark:border-orange-700">JPG / JPEG</span>
              <span className="text-foreground/40 text-sm">The universal photo format</span>
            </div>
            <p className="text-foreground/70 leading-relaxed">
              JPG (Joint Photographic Experts Group) has been the dominant photo format since the
              1990s and is still the most widely supported format across every device, platform and
              application on the planet. It uses lossy compression — meaning some image data is
              permanently discarded to reduce file size — but at quality settings above 70%, the
              loss is invisible to the human eye in photographs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                <div className="font-bold text-green-800 dark:text-green-400 text-sm mb-2">✓ Use JPG when</div>
                <ul className="space-y-1.5">
                  {[
                    'Sharing photos on social media',
                    'Adding hero or background images to a webpage',
                    'Sending photos by email',
                    'Compatibility with older software matters',
                    'Transparency is not needed',
                  ].map((i) => <li key={i} className="text-sm text-foreground/70 flex gap-2"><span className="text-green-500 shrink-0">✓</span>{i}</li>)}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                <div className="font-bold text-red-800 dark:text-red-400 text-sm mb-2">✗ Avoid JPG when</div>
                <ul className="space-y-1.5">
                  {[
                    'The image has text, sharp lines or a logo',
                    'You need a transparent background',
                    'You will be editing and re-saving repeatedly',
                    'You want the absolute smallest file size',
                  ].map((i) => <li key={i} className="text-sm text-foreground/70 flex gap-2"><span className="text-red-500 shrink-0">✗</span>{i}</li>)}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 mt-4">
              <p className="text-sm text-orange-950 dark:text-orange-400">
                ⚠️ <strong>Re-saving trap:</strong> Every time you open and re-save a JPG, it
                recompresses — losing a little more quality each time. Always keep a master copy in
                a lossless format (PNG or TIFF) and export JPGs from that.
              </p>
            </div>
          </section>

          {/* Section 2 — PNG */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-black bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-700">PNG</span>
              <span className="text-foreground/40 text-sm">Lossless quality with transparency</span>
            </div>
            <p className="text-foreground/70 leading-relaxed">
              PNG (Portable Network Graphics) uses lossless compression — no quality is ever
              discarded. This makes it ideal for images where sharpness and pixel-perfect accuracy
              matter: logos, UI screenshots, diagrams, and anything with text. PNG also supports
              full alpha-channel transparency, which JPG does not.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-3">
              The downside is file size. A PNG of a photograph will almost always be dramatically
              larger than a JPG of the same image at equivalent visual quality — often 3× to 5×
              larger. This is why using PNG for photographs is one of the most common performance
              mistakes on the web.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                <div className="font-bold text-green-800 dark:text-green-400 text-sm mb-2">✓ Use PNG when</div>
                <ul className="space-y-1.5">
                  {[
                    'You need a transparent background',
                    'The image contains text or sharp edges',
                    'It is a logo, icon, or UI screenshot',
                    'Lossless quality is required',
                    'You will edit the image further',
                  ].map((i) => <li key={i} className="text-sm text-foreground/70 flex gap-2"><span className="text-green-500 shrink-0">✓</span>{i}</li>)}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                <div className="font-bold text-red-800 dark:text-red-400 text-sm mb-2">✗ Avoid PNG when</div>
                <ul className="space-y-1.5">
                  {[
                    'The image is a photograph',
                    'File size is a concern',
                    'You are uploading to social media',
                    'You want next-gen format efficiency',
                  ].map((i) => <li key={i} className="text-sm text-foreground/70 flex gap-2"><span className="text-red-500 shrink-0">✗</span>{i}</li>)}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 mt-4">
              <p className="text-sm text-blue-950 dark:text-blue-400">
                💡 <strong>Quick fix:</strong> If someone sends you a PNG of a photograph (not a
                logo), convert it to JPG or WebP before publishing. You will typically reduce the
                file size by 60–80% with no visible difference.
              </p>
            </div>
          </section>

          {/* Section 3 — WebP */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-black bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-700">WebP</span>
              <span className="text-foreground/40 text-sm">The modern web standard</span>
            </div>
            <p className="text-foreground/70 leading-relaxed">
              WebP was developed by Google and released in 2010. It supports both lossy and lossless
              compression, transparency, and animation — making it a single format that can replace
              JPG, PNG, and GIF simultaneously. At equivalent visual quality, WebP files are
              typically 25–35% smaller than JPG and 20–30% smaller than PNG.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-3">
              Browser support is now excellent — Chrome, Firefox, Safari (since 2020), Edge, and
              Opera all support WebP natively. For most new websites, WebP should be your default
              format for all images.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                <div className="font-bold text-green-800 dark:text-green-400 text-sm mb-2">✓ Use WebP when</div>
                <ul className="space-y-1.5">
                  {[
                    'Serving images on a modern website',
                    'You want smaller files than JPG or PNG',
                    'You need transparency (replaces PNG)',
                    'You need simple animation (replaces GIF)',
                    'Your audience uses modern browsers',
                  ].map((i) => <li key={i} className="text-sm text-foreground/70 flex gap-2"><span className="text-green-500 shrink-0">✓</span>{i}</li>)}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                <div className="font-bold text-red-800 dark:text-red-400 text-sm mb-2">✗ Avoid WebP when</div>
                <ul className="space-y-1.5">
                  {[
                    'Sending to someone who may open in older software',
                    'Uploading to platforms that reject WebP (some CMSs)',
                    'You need maximum compression (use AVIF instead)',
                    'Printing — use TIFF or PDF instead',
                  ].map((i) => <li key={i} className="text-sm text-foreground/70 flex gap-2"><span className="text-red-500 shrink-0">✗</span>{i}</li>)}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 mt-4">
              <p className="text-sm text-green-950 dark:text-green-400">
                💡 <strong>WordPress note:</strong> WordPress has supported WebP uploads since
                version 5.8. If you are on an older theme or plugin stack, test WebP images before
                migrating your entire media library.
              </p>
            </div>
          </section>

          {/* Section 4 — AVIF */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-black bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 border border-purple-200 dark:border-purple-700">AVIF</span>
              <span className="text-foreground/40 text-sm">Next-gen — smallest files available</span>
            </div>
            <p className="text-foreground/70 leading-relaxed">
              AVIF (AV1 Image File Format) is the newest major image format, derived from the AV1
              video codec. It offers the best compression of any format currently available —
              typically 40–50% smaller than JPG and 20% smaller than WebP at equivalent perceptual
              quality. It also supports HDR, wide color gamut, and transparency.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-3">
              The trade-off is browser support, which is good but not universal (Chrome, Firefox,
              and Safari 16+ support it, but older browsers do not), and encoding speed, which can
              be slow for large images. For most new projects, using AVIF with a WebP fallback is
              the optimal approach.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
              <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                <div className="font-bold text-green-800 dark:text-green-400 text-sm mb-2">✓ Use AVIF when</div>
                <ul className="space-y-1.5">
                  {[
                    'Absolute smallest file size is the priority',
                    'You are building a performance-optimized site',
                    'Your audience uses modern browsers (2021+)',
                    'You have a WebP fallback in place',
                  ].map((i) => <li key={i} className="text-sm text-foreground/70 flex gap-2"><span className="text-green-500 shrink-0">✓</span>{i}</li>)}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
                <div className="font-bold text-red-800 dark:text-red-400 text-sm mb-2">✗ Avoid AVIF when</div>
                <ul className="space-y-1.5">
                  {[
                    'You need broad legacy browser support',
                    'Fast encoding speed matters',
                    'Uploading to social platforms (usually unsupported)',
                    'Your CMS does not handle it yet',
                  ].map((i) => <li key={i} className="text-sm text-foreground/70 flex gap-2"><span className="text-red-500 shrink-0">✗</span>{i}</li>)}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5 — GIF & SVG */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              What About GIF and SVG?
            </h2>

            <div className="space-y-4">
              <div className="p-5 rounded-xl border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-black bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700">GIF</span>
                  <span className="text-foreground/50 text-sm">Animated images</span>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  GIF is a 1987 format limited to 256 colors. Its only remaining use case is short
                  looping animations — memes, reaction clips, loading spinners. For anything over
                  3 seconds, a silent MP4 video is a dramatically better choice: smaller file,
                  better quality, more color depth. Most modern platforms (Slack, Twitter, Discord)
                  convert GIF uploads to video automatically behind the scenes.
                </p>
              </div>

              <div className="p-5 rounded-xl border border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-pink-900/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-xs font-black bg-pink-100 dark:bg-pink-900/20 text-pink-800 dark:text-pink-400 border border-pink-200 dark:border-pink-700">SVG</span>
                  <span className="text-foreground/50 text-sm">Vector graphics</span>
                </div>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  SVG (Scalable Vector Graphics) is not a raster format like the others — it stores
                  shapes as mathematical instructions rather than pixels. This means SVG files are
                  resolution-independent: they look perfectly sharp at any size, from a 16px favicon
                  to a 4K display. File sizes for logos and icons in SVG are typically tiny (1–20kB).
                  Use SVG for all icons, logos, and illustrations. You cannot use SVG for photographs.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 — Full comparison table */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Full Format Comparison Table
            </h2>

            <div className="overflow-x-auto rounded-xl border border-foreground/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-foreground/5 border-b border-foreground/10">
                    <th className="text-left p-3 font-bold text-foreground">Format</th>
                    <th className="text-left p-3 font-bold text-foreground">Compression</th>
                    <th className="text-left p-3 font-bold text-foreground">Transparency</th>
                    <th className="text-left p-3 font-bold text-foreground">Animation</th>
                    <th className="text-left p-3 font-bold text-foreground">Browser support</th>
                    <th className="text-left p-3 font-bold text-foreground">Relative size</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/10">
                  {[
                    { fmt: 'JPG', comp: 'Lossy', trans: '❌', anim: '❌', support: 'Universal', size: '●●●○○' },
                    { fmt: 'PNG', comp: 'Lossless', trans: '✅', anim: '❌', support: 'Universal', size: '●●●●○' },
                    { fmt: 'WebP', comp: 'Both', trans: '✅', anim: '✅', support: 'Excellent', size: '●●○○○' },
                    { fmt: 'AVIF', comp: 'Both', trans: '✅', anim: '✅', support: 'Good', size: '●○○○○' },
                    { fmt: 'GIF', comp: 'Lossless', trans: '✅ (1-bit)', anim: '✅', support: 'Universal', size: '●●●●●' },
                    { fmt: 'SVG', comp: 'Vector', trans: '✅', anim: '✅', support: 'Universal', size: '●○○○○' },
                  ].map((row) => (
                    <tr key={row.fmt} className="hover:bg-foreground/5 transition-colors">
                      <td className="p-3 font-black text-purple-500">{row.fmt}</td>
                      <td className="p-3 text-foreground/70">{row.comp}</td>
                      <td className="p-3">{row.trans}</td>
                      <td className="p-3">{row.anim}</td>
                      <td className="p-3 text-foreground/70">{row.support}</td>
                      <td className="p-3 text-foreground/70 font-mono text-xs">{row.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-foreground/40 mt-2">
              Relative size: ●○○○○ = smallest, ●●●●● = largest (for equivalent visual quality)
            </p>
          </section>

          {/* Section 7 — Decision guide */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              How to Choose — A Simple Decision Guide
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-5">
              Run through these questions in order to pick the right format every time:
            </p>

            <div className="space-y-3">
              {[
                {
                  q: 'Is it a logo, icon or illustration?',
                  a: '→ Use SVG if it is vector art. Use PNG if it is a raster file with transparency.',
                },
                {
                  q: 'Does it need a transparent background?',
                  a: '→ Use WebP (first choice) or PNG (fallback). Never JPG.',
                },
                {
                  q: 'Is it a photograph going on a website?',
                  a: '→ Use AVIF (with WebP fallback) or WebP. Only use JPG if you need maximum compatibility.',
                },
                {
                  q: 'Is it going to social media?',
                  a: '→ Use JPG for photos. PNG for graphics. Most platforms recompress on upload anyway.',
                },
                {
                  q: 'Is it a looping animation?',
                  a: '→ Under 3 seconds: WebP or GIF. Over 3 seconds: use a silent MP4 video instead.',
                },
                {
                  q: 'Is it for print?',
                  a: '→ Use TIFF or PDF (300 DPI). Web formats like JPG and PNG are for screens, not print.',
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-foreground/10 hover:border-purple-500/30 transition-colors">
                  <div className="font-bold text-foreground text-sm">{item.q}</div>
                  <p className="text-sm text-purple-600 dark:text-purple-400 mt-1 font-medium">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 8 — Convert with FlexoTools */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              How to Convert Between Formats
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              If you have an image in the wrong format, you can convert it without any software
              using the{' '}
              <Link href="/tools/image-compressor" className="text-purple-500 hover:underline font-medium">
                FlexoTools Image Compressor
              </Link>
              . Upload your image, then use the <strong>Output Format</strong> dropdown to select
              the target format — WebP, AVIF, JPG, or PNG. The tool handles the conversion and
              compression in one step, entirely in your browser.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
              {[
                { from: 'PNG photo → JPG', saving: '60–80% smaller', tip: 'Use for any PNG photograph that has no transparency' },
                { from: 'JPG → WebP', saving: '25–35% smaller', tip: 'Best default upgrade for existing web image libraries' },
                { from: 'JPG → AVIF', saving: '40–50% smaller', tip: 'Maximum compression for performance-critical pages' },
              ].map((item) => (
                <div key={item.from} className="p-4 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10">
                  <div className="font-bold text-foreground text-sm">{item.from}</div>
                  <div className="text-purple-600 dark:text-purple-400 font-bold text-sm mt-1">{item.saving}</div>
                  <p className="text-xs text-foreground/60 mt-1">{item.tip}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="p-6 rounded-2xl bg-linear-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-purple-500/20 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Convert or compress your image now
            </h2>
            <p className="text-foreground/60">
              Free, no signup, works in your browser. JPG, PNG, WebP and AVIF supported.
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
                { title: 'How to Compress Images Online Free Without Losing Quality', href: '/blog/how-to-compress-images-without-losing-quality' },
                { title: 'How to Extract Text from a PDF Free', href: '/blog/how-to-extract-text-from-pdf-free' },
                { title: 'How to Check Your Resume ATS Score for Free', href: '/blog/how-to-check-resume-ats-score-free' },
                { title: 'How to Create a QR Code or Barcode for Free', href: '/blog/how-to-create-qr-code-barcode-free' },
              ].map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-foreground/10 hover:border-purple-500/30 hover:bg-foreground/5 transition-all text-sm font-medium text-foreground/70 hover:text-foreground"
                >
                  <span className="text-purple-500">→</span>
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