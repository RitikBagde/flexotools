// src/app/blog/pdf-vs-word-vs-txt-which-format-to-use/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'PDF vs Word vs TXT — Which Format Should You Use and When | FlexoTools',
  description:
    'PDF, DOCX, and TXT all store text but work completely differently. Learn when each format is the right choice, when to convert between them, and how to extract text from a PDF without any software.',
  alternates: {
    canonical: 'https://flexotools.com/blog/pdf-vs-word-vs-txt-which-format-to-use',
  },
}

export default function PDFvsWordPage() {
  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-foreground/50 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground/80">PDF vs Word vs TXT</span>
        </nav>

        {/* ── Header ── */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-600 whitespace-nowrap">
              PDF Tools
            </span>
            <div className="flex items-center gap-1.5 text-xs text-foreground/40">
              <span>March 25, 2026</span>
              <span>·</span>
              <span>7 min read</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-foreground leading-tight mb-4">
            PDF vs Word vs TXT —{' '}
            <span className="text-teal-500 dark:text-teal-400">Which Format Should You Use and When</span>
          </h1>

          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
            PDF, DOCX, and TXT all store text, but they work completely differently — and picking the
            wrong one wastes time. Here's exactly when each format is the right choice, when to convert
            between them, and how to get plain text out of a PDF without installing anything.
          </p>
        </header>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-3 divide-x divide-foreground/10 border border-foreground/10 rounded-xl mb-10 overflow-hidden">
          {[
            { value: '3', label: 'Formats compared' },
            { value: '0', label: 'Software to install' },
            { value: '< 5s', label: 'Time to extract PDF text' },
          ].map(({ value, label }) => (
            <div key={label} className="py-4 px-3 text-center bg-foreground/2">
              <div className="text-xl sm:text-2xl font-black text-teal-600 dark:text-teal-400">{value}</div>
              <div className="text-xs text-foreground/50 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Article body ── */}
        <article className="space-y-8 text-foreground/80 leading-relaxed text-[15px] sm:text-base">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              Why the Format You Choose Actually Matters
            </h2>
            <p>
              Most people treat PDF, Word, and plain text as interchangeable — just different ways to
              hold the same words. They're not. Each format makes very different tradeoffs between
              portability, editability, and compatibility, and choosing the wrong one creates real
              friction: documents that won't open, text that can't be copied, formatting that breaks
              on different devices.
            </p>
            <p className="mt-3">
              Understanding what each format is actually designed for takes about five minutes and
              saves hours of frustration.
            </p>
          </section>

          {/* Section 2 — Format breakdown */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-4">
              The Three Formats — What They're Actually For
            </h2>

            {/* PDF */}
            <div className="p-5 rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-900/20 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📄</span>
                <h3 className="text-lg font-black text-foreground">PDF — Portable Document Format</h3>
              </div>
              <p className="text-sm text-foreground/70 mb-3">
                PDF was designed by Adobe in the early 1990s for one specific purpose: to make a document
                look identical on every device, regardless of what software, fonts, or operating system the
                reader has. It locks the layout completely — every element is positioned precisely on the page.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="font-bold text-teal-700 dark:text-teal-400 mb-1.5">✓ Best for</div>
                  <ul className="space-y-1 text-foreground/70">
                    <li>• Sharing final documents (CVs, reports, invoices)</li>
                    <li>• Content that must look identical everywhere</li>
                    <li>• Archiving documents long-term</li>
                    <li>• Legal and official submissions</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-red-500 mb-1.5">✕ Not great for</div>
                  <ul className="space-y-1 text-foreground/70">
                    <li>• Documents you need to edit frequently</li>
                    <li>• Copying text to use elsewhere</li>
                    <li>• Collaboration with tracked changes</li>
                    <li>• Machine-readable or processed text</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* DOCX */}
            <div className="p-5 rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📝</span>
                <h3 className="text-lg font-black text-foreground">DOCX — Microsoft Word Document</h3>
              </div>
              <p className="text-sm text-foreground/70 mb-3">
                DOCX is a living document format — designed for writing, editing, reviewing, and
                collaborating. Unlike PDF, the layout is flexible and reflows based on the viewer's settings.
                It stores not just text but also styles, comments, tracked changes, tables, images, and
                embedded objects.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="font-bold text-blue-700 dark:text-blue-400 mb-1.5">✓ Best for</div>
                  <ul className="space-y-1 text-foreground/70">
                    <li>• Documents being actively written or edited</li>
                    <li>• Templates and contracts that get customised</li>
                    <li>• Collaborative work with comments or track changes</li>
                    <li>• Reports where content changes regularly</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-red-500 mb-1.5">✕ Not great for</div>
                  <ul className="space-y-1 text-foreground/70">
                    <li>• Final distribution (layout varies by viewer)</li>
                    <li>• Long-term archiving (format versions change)</li>
                    <li>• Sending to people without Word or Google Docs</li>
                    <li>• Consistent rendering on all devices</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* TXT */}
            <div className="p-5 rounded-xl border-2 border-foreground/15 bg-foreground/3 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🗒️</span>
                <h3 className="text-lg font-black text-foreground">TXT — Plain Text</h3>
              </div>
              <p className="text-sm text-foreground/70 mb-3">
                Plain text is the most basic format possible — just characters, no formatting, no layout,
                no styling. It's readable by every device, every application, and every programming language
                ever created. What it lacks in presentation it more than makes up for in universal compatibility.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="font-bold text-foreground/70 mb-1.5">✓ Best for</div>
                  <ul className="space-y-1 text-foreground/70">
                    <li>• Pasting into other tools (AI, translators, summarisers)</li>
                    <li>• Code, scripts, and configuration files</li>
                    <li>• Data that will be processed programmatically</li>
                    <li>• Maximum compatibility across every system</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-red-500 mb-1.5">✕ Not great for</div>
                  <ul className="space-y-1 text-foreground/70">
                    <li>• Documents with visual design or layout</li>
                    <li>• Content with tables, images, or formatting</li>
                    <li>• Anything that needs to look professional</li>
                    <li>• Headers, footnotes, or document structure</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Tool screenshot 1 — upload state */}
          <figure className="rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
            <Image
              src="/blog/pdf-extractor/pdf-upload.png"
              alt="FlexoTools PDF Text Extractor showing the upload interface before a file is selected"
              width={960}
              height={400}
              className="w-full h-auto"
              priority
            />
            <figcaption className="text-xs text-foreground/40 text-center py-2 px-4 bg-foreground/2">
              The FlexoTools PDF Text Extractor — upload a PDF and extract its full text content directly in your browser.
            </figcaption>
          </figure>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              When You Need to Convert Between Formats
            </h2>
            <p className="mb-4">
              Most conversion problems come down to one scenario: you have a PDF but need the text
              in a usable form. Here's when each conversion direction makes sense:
            </p>

            {[
              {
                from: 'PDF → TXT',
                when: 'You need to paste the content into another tool',
                detail: 'Summarisers, AI tools, translation services, and word processors all work better with plain text than with PDF content. Extracting to TXT removes all formatting and gives you clean, pasteable text.',
                color: 'teal',
              },
              {
                from: 'PDF → DOCX',
                when: 'You need to edit the content directly',
                detail: 'If you have a contract, template, or report in PDF form that you need to modify, downloading as DOCX lets you open and edit it in Word or Google Docs. The basic structure is preserved, even if visual formatting isn\'t.',
                color: 'teal',
              },
              {
                from: 'DOCX → PDF',
                when: 'You\'re ready to share the final version',
                detail: 'Once a document is finished and you want to distribute it, convert to PDF. This locks the layout so it looks identical regardless of what Word version or system the recipient is using. Most Word processors export to PDF in one click.',
                color: 'blue',
              },
              {
                from: 'PDF → Copy',
                when: 'You just need a specific passage',
                detail: 'If you only need a paragraph or section rather than the full document, copying extracted text to clipboard is faster than downloading. The FlexoTools extractor outputs the full document text — you can then select just the part you need.',
                color: 'teal',
              },
            ].map(({ from, when, detail, color }) => (
              <div key={from} className={`flex gap-4 p-4 rounded-xl border mb-3 ${
                color === 'teal'
                  ? 'border-teal-200 dark:border-teal-800 bg-teal-50/50 dark:bg-teal-900/10'
                  : 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10'
              }`}>
                <div className="shrink-0">
                  <span className={`inline-block px-2 py-0.5 rounded text-xs font-black font-mono ${
                    color === 'teal'
                      ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-600'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-600'
                  }`}>{from}</span>
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm mb-1">{when}</div>
                  <div className="text-xs text-foreground/60 leading-relaxed">{detail}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Tool screenshot 2 — file loaded */}
          <figure className="rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
            <Image
              src="/blog/pdf-extractor/pdf-ready.png"
              alt="FlexoTools PDF Text Extractor with a PDF file selected and the Extract button active"
              width={960}
              height={400}
              className="w-full h-auto"
            />
            <figcaption className="text-xs text-foreground/40 text-center py-2 px-4 bg-foreground/2">
              Once a file is selected, the Extract &amp; View Text button activates — no upload to any server required.
            </figcaption>
          </figure>

          {/* Key insight */}
          <div className="flex gap-3 p-4 rounded-xl bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800">
            <span className="text-lg mt-0.5 shrink-0">🔒</span>
            <p className="text-sm text-teal-800 dark:text-teal-400">
              <strong>Privacy note:</strong> The FlexoTools PDF extractor works entirely in your browser.
              Your file is never uploaded to any server — the text is extracted locally on your device.
              This matters for sensitive documents like contracts, medical records, or financial reports.
            </p>
          </div>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              Why PDF Text Is Hard to Copy Manually
            </h2>
            <p>
              Most people's first instinct when they need text from a PDF is to select it and copy-paste.
              This works sometimes — but fails in several common situations:
            </p>

            <div className="space-y-3 mt-4">
              {[
                {
                  title: 'Multi-column layouts break the reading order',
                  desc: 'PDFs with two or three columns — common in academic papers, magazines, and newsletters — are stored left-to-right across the full page width. Selecting text manually mixes both columns into a single garbled stream.',
                },
                {
                  title: 'Hyphenated words at line breaks stay hyphenated',
                  desc: 'Words broken across lines in the PDF often paste with the hyphen still in them. You end up with "infor-mation" instead of "information" throughout the extracted text.',
                },
                {
                  title: 'Scanned PDFs have no selectable text at all',
                  desc: 'If your PDF was created by scanning a physical document, the pages are images — not text. There is nothing to select or copy. This requires OCR (optical character recognition), which is a different process.',
                },
                {
                  title: 'Large PDFs are impractical to copy page by page',
                  desc: 'Copying text from a 50-page report by selecting each page manually takes significant time and often produces inconsistent results. Extraction handles the full document in one operation.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border border-foreground/10 bg-foreground/2">
                  <span className="text-foreground/30 font-bold shrink-0 mt-0.5">!</span>
                  <div>
                    <div className="font-bold text-foreground text-sm mb-1">{title}</div>
                    <div className="text-xs text-foreground/60 leading-relaxed">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tool screenshot 3 — results */}
          <figure className="rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
            <Image
              src="/blog/pdf-extractor/pdf-results.png"
              alt="FlexoTools PDF Text Extractor showing extracted text from an 11-page PDF with Copy, TXT and DOCX download options"
              width={960}
              height={500}
              className="w-full h-auto"
            />
            <figcaption className="text-xs text-foreground/40 text-center py-2 px-4 bg-foreground/2">
              Extracted text from an 11-page PDF — 20,043 characters ready to copy, download as TXT, or save as DOCX.
            </figcaption>
          </figure>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              Quick Decision Guide — Which Format to Use
            </h2>

            <div className="overflow-x-auto rounded-xl border border-foreground/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-foreground/10 bg-foreground/3">
                    <th className="text-left p-3 font-bold text-foreground">Your situation</th>
                    <th className="text-left p-3 font-bold text-foreground">Use this format</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { situation: 'Sending a final CV or resume', format: 'PDF', color: 'teal' },
                    { situation: 'Writing and editing a report', format: 'DOCX', color: 'blue' },
                    { situation: 'Pasting into ChatGPT or a summariser', format: 'TXT', color: 'gray' },
                    { situation: 'Submitting a legal or official document', format: 'PDF', color: 'teal' },
                    { situation: 'Sharing a template someone will edit', format: 'DOCX', color: 'blue' },
                    { situation: 'Feeding data into a script or program', format: 'TXT', color: 'gray' },
                    { situation: 'Printing a brochure or flyer', format: 'PDF', color: 'teal' },
                    { situation: 'Translating a document', format: 'TXT', color: 'gray' },
                    { situation: 'Collaborating with tracked changes', format: 'DOCX', color: 'blue' },
                  ].map(({ situation, format, color }) => (
                    <tr key={situation} className="border-b border-foreground/5 last:border-0">
                      <td className="p-3 text-foreground/70">{situation}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          color === 'teal' ? 'bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-600' :
                          color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-500' :
                          'bg-foreground/10 text-foreground/60'
                        }`}>{format}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA box */}
          <div className="rounded-2xl p-6 sm:p-8 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-700 text-center">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="text-lg sm:text-xl font-black text-foreground mb-2">
              Extract Text from Your PDF — Free, No Signup
            </h3>
            <p className="text-sm text-foreground/60 mb-5">
              Upload your PDF and get the full text in seconds. Copy to clipboard, download as TXT,
              or save as a Word document. Your file never leaves your device.
            </p>
            <Link
              href="/tools/pdf-text-extractor"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm transition-colors"
            >
              📋 Open PDF Text Extractor
            </Link>
          </div>

        </article>

        {/* ── More guides ── */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">More guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/blog/how-to-extract-text-from-pdf-free', label: 'How to Extract Text from a PDF Free' },
              { href: '/blog/how-to-compress-images-without-losing-quality', label: 'How to Compress Images Without Losing Quality' },
              { href: '/blog/how-to-check-resume-ats-score-free', label: 'How to Check Your Resume ATS Score for Free' },
              { href: '/blog/how-to-summarize-text-online-free', label: 'How to Summarize Text Online Free' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 p-3 rounded-xl border border-foreground/10 hover:border-teal-300 dark:hover:border-teal-700 hover:bg-teal-50 dark:hover:bg-teal-900/10 transition-all group text-sm text-foreground/70 hover:text-foreground"
              >
                <span className="text-teal-400 group-hover:translate-x-0.5 transition-transform">→</span>
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