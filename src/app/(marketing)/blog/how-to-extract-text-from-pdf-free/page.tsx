// src/app/blog/how-to-extract-text-from-pdf-free/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Extract Text from a PDF Free — No Signup, Browser-Based | FlexoTools',
  description:
    'Copy, download or export PDF text to a Word document in seconds. Works entirely in your browser — no uploads to any server, no account needed.',
  alternates: {
    canonical: 'https://flexotools.com/blog/how-to-extract-text-from-pdf-free',
  },
  openGraph: {
    title: 'How to Extract Text from a PDF Free | FlexoTools Blog',
    description:
      'A complete guide to free browser-based PDF text extraction — copy, download as TXT or export as DOCX. No signup.',
    url: 'https://flexotools.com/blog/how-to-extract-text-from-pdf-free',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Extract Text from a PDF Free — No Signup, Browser-Based',
  description:
    'Extract text from PDFs instantly using FlexoTools. Download as TXT or DOCX, copy to clipboard, no server uploads.',
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
    '@id': 'https://flexotools.com/blog/how-to-extract-text-from-pdf-free',
  },
}

export default function BlogPostPDFExtractor() {
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
          <span className="text-foreground/80">PDF Text Extractor Guide</span>
        </nav>

        {/* Article header */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-500">
              PDF Tools
            </span>
            <span className="text-xs text-foreground/40">March 25, 2026</span>
            <span className="text-xs text-foreground/40">· 5 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            How to Extract Text from a PDF Free
            <span className="text-teal-500"> — No Signup, Browser-Based</span>
          </h1>

          <p className="text-lg text-foreground/60 leading-relaxed">
            PDFs are great for sharing documents but frustrating when you need the actual text.
            Whether you want to copy a passage, edit the content in Word, or run it through a
            summarizer — the FlexoTools PDF Text Extractor pulls out all the text in seconds,
            entirely in your browser.
          </p>

          {/* Quick stats bar */}
          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/10 border border-teal-200 dark:border-teal-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">2</div>
              <div className="text-xs text-foreground/60 mt-1">Download formats</div>
            </div>
            <div className="text-center border-x border-teal-200 dark:border-teal-800">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">0</div>
              <div className="text-xs text-foreground/60 mt-1">Server uploads</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">0</div>
              <div className="text-xs text-foreground/60 mt-1">Signups needed</div>
            </div>
          </div>
        </header>

        {/* Article body */}
        <article className="prose prose-gray dark:prose-invert max-w-none space-y-8">

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              When Do You Need to Extract PDF Text?
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              PDFs lock text inside a format that's difficult to edit or copy from cleanly. Common
              situations where extraction helps: copying a quote from a research paper without
              formatting artifacts, converting a PDF contract into an editable Word document,
              pasting article text into a summarizer, or pulling data from a PDF report into a
              spreadsheet.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-4">
              The FlexoTools extractor works on text-based PDFs — the kind where you can already
              click and drag to select text inside the PDF viewer. Scanned PDFs (images of
              physical pages) require OCR, which this tool does not perform.
            </p>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 mt-4">
              <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                💡 <strong>Quick check:</strong> Open your PDF in a browser or PDF reader and try
                to select text by clicking and dragging. If you can highlight individual words, the
                PDF is text-based and will work perfectly with this tool. If everything selects as
                one image block, it's a scanned PDF.
              </p>
            </div>
          </section>

          {/* Section 2 — Output options */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Three Ways to Get Your Extracted Text
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              After extraction, you have three options for what to do with the text:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  action: '📋 Copy',
                  detail: 'Copies all extracted text to your clipboard in one click. Best for pasting into another tool, email, or document editor immediately.',
                  color: 'border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/10',
                },
                {
                  action: '📄 TXT',
                  detail: 'Downloads the extracted text as a plain .txt file. No formatting, no styling — just raw text. Works with any text editor.',
                  color: 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10',
                },
                {
                  action: '📝 DOCX',
                  detail: 'Downloads the text as a .docx Word document. Useful when you want to edit the content in Microsoft Word or Google Docs and preserve basic structure.',
                  color: 'border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/10',
                },
              ].map((item) => (
                <div key={item.action} className={`p-4 rounded-xl border ${item.color}`}>
                  <div className="font-bold text-foreground mb-2">{item.action}</div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 — Step by step */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Step-by-Step: How to Extract PDF Text
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-6">
              Open{' '}
              <Link href="/tools/pdf-text-extractor" className="text-teal-500 hover:underline font-medium">
                FlexoTools PDF Text Extractor
              </Link>{' '}
              in your browser. No account needed.
            </p>

            {[
              {
                n: 1,
                title: 'Upload your PDF',
                body: (
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    Click <strong>Choose File</strong> and select your PDF from your device. There
                    is no strict file size cap displayed, but very large PDFs (50MB+) may take
                    longer to process. The filename appears next to the button confirming the
                    file is loaded.
                  </p>
                ),
              },
              {
                n: 2,
                title: 'Click Extract & View Text',
                body: (
                  <>
                    <p className="text-foreground/70 mt-1 leading-relaxed">
                      The button is active as soon as a file is selected. Click it — the tool reads
                      all pages of the PDF client-side in your browser. For a typical 10-page PDF
                      this takes under a second. The page count (e.g. "11 pages") appears in the
                      results bar when processing is complete.
                    </p>
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 mt-3">
                      <p className="text-sm text-green-600 dark:text-green-400">
                        ✅ <strong>Privacy:</strong> Your PDF is processed entirely in your browser.
                        The file is never uploaded to any server — it doesn't leave your device.
                      </p>
                    </div>
                  </>
                ),
              },
              {
                n: 3,
                title: 'Review the extracted text',
                body: (
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    The extracted text appears in a scrollable box below the button. The character
                    count is displayed at the bottom (e.g. "Character count: 20,043"). Scroll
                    through to check the quality — well-structured PDFs usually extract cleanly.
                    PDFs with complex multi-column layouts may have the column text interleaved.
                  </p>
                ),
              },
              {
                n: 4,
                title: 'Copy, download as TXT, or download as DOCX',
                body: (
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    Use the three buttons in the results toolbar: <strong>Copy</strong> for
                    clipboard, <strong>TXT</strong> to download a plain text file, or{' '}
                    <strong>DOCX</strong> to download a Word document. All three options work
                    on the full extracted content — there's no need to select the text manually.
                  </p>
                ),
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex items-start gap-4 mb-8">
                <div className="shrink-0 w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm">
                  {n}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{title}</h3>
                  {body}
                </div>
              </div>
            ))}
          </section>

          {/* Section 4 — limitations */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Limitations to Know About
            </h2>

            <div className="space-y-3">
              {[
                {
                  title: 'Scanned PDFs are not supported',
                  detail: 'If your PDF was created by scanning a physical document, the pages are images and contain no readable text layer. This tool cannot extract text from image-based PDFs. You would need an OCR tool for those.',
                  icon: '📷',
                },
                {
                  title: 'Complex multi-column layouts may interleave',
                  detail: 'PDFs with side-by-side columns (like academic papers or newsletters) are read left-to-right across the full page width, which can mix up column content. For clean results, PDF layouts that read top-to-bottom in a single column work best.',
                  icon: '📰',
                },
                {
                  title: 'Formatting is not preserved',
                  detail: "The extractor outputs plain text — bold, italic, font sizes, tables, and images are all stripped out. The DOCX download adds basic structure but does not recreate the original document's visual design.",
                  icon: '🎨',
                },
                {
                  title: 'Password-protected PDFs will not open',
                  detail: 'Encrypted or password-locked PDFs cannot be read by the browser. Remove the password protection first (in Adobe Acrobat or a similar tool) before uploading.',
                  icon: '🔒',
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-foreground/10">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-bold text-foreground text-sm">{item.title}</div>
                    <p className="text-sm text-foreground/60 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 — use cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              What to Do With Extracted Text
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Once you have the raw text, here are some common next steps:
            </p>
            <div className="space-y-3">
              {[
                { action: 'Paste into the FlexoTools Text Summarizer', detail: 'Get a quick summary or bullet points from a long PDF report without reading the whole thing.', href: '/tools/text-summarizer' },
                { action: 'Open in Word or Google Docs', detail: 'Download as DOCX and edit the content directly — useful for customising templates or contracts.', href: null },
                { action: 'Run a word count or readability analysis', detail: 'Paste the text into any word processor to check length, reading level, or specific keyword frequency.', href: null },
                { action: 'Feed into a translation tool', detail: 'Copy the text and paste it into a translation service. PDF text rarely pastes cleanly into Google Translate — extraction fixes that.', href: null },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl border border-foreground/10 hover:border-teal-500/30 transition-colors">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">
                      {item.href ? (
                        <Link href={item.href} className="text-teal-600 dark:text-teal-400 hover:underline">
                          {item.action}
                        </Link>
                      ) : item.action}
                    </div>
                    <p className="text-sm text-foreground/60 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="p-6 rounded-2xl bg-linear-to-br from-teal-500/10 via-cyan-500/10 to-blue-500/10 border border-teal-500/20 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Ready to extract your PDF text?
            </h2>
            <p className="text-foreground/60">
              Free, browser-based, no signup. Your file never leaves your device.
            </p>
            <Link
              href="/tools/pdf-text-extractor"
              className="inline-block px-8 py-3 bg-linear-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-bold hover:scale-105 hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-200"
            >
              📄 Open PDF Text Extractor
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
                { title: 'How to Create a QR Code or Barcode for Free', href: '/blog/how-to-create-qr-code-barcode-free' },
              ].map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className="flex items-center gap-3 p-3 rounded-lg border border-foreground/10 hover:border-teal-500/30 hover:bg-foreground/5 transition-all text-sm font-medium text-foreground/70 hover:text-foreground"
                >
                  <span className="text-teal-500">→</span>
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