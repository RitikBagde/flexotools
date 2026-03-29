// src/app/blog/top-10-ats-resume-mistakes/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Top 10 ATS Resume Mistakes and How to Fix Them | FlexoTools',
  description:
    'These 10 resume mistakes cause automatic rejection by ATS software — even for qualified candidates. Find out if your resume is making them and how to fix each one.',
  alternates: {
    canonical: 'https://flexotools.com/blog/top-10-ats-resume-mistakes',
  },
  openGraph: {
    title: 'Top 10 ATS Resume Mistakes and How to Fix Them | FlexoTools Blog',
    description:
      'The most common resume mistakes that cause ATS rejection — and exactly how to fix each one.',
    url: 'https://flexotools.com/blog/top-10-ats-resume-mistakes',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Top 10 ATS Resume Mistakes and How to Fix Them',
  description:
    'The 10 most common resume mistakes that cause automatic ATS rejection — and how to fix each one.',
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
    '@id': 'https://flexotools.com/blog/top-10-ats-resume-mistakes',
  },
}

const mistakes = [
  {
    title: 'Using a multi-column layout',
    why: 'ATS parsers read text left-to-right across the full page width. Two-column layouts cause text from different columns to get mixed together — your job title might end up next to a skill from the other column, making the output nonsensical.',
    fix: 'Switch to a single-column layout. Save the fancy two-column design for a separate human-only version. Your ATS submission resume should look boring — clean, linear, and predictable.',
  },
  {
    title: 'Putting contact info in the header or footer',
    why: "Many ATS systems cannot read content inside Word or PDF headers and footers — they are treated as outside the document body. Your name, email, and phone number may simply disappear from the parsed output.",
    fix: 'Place all contact information in the main body of the document, at the very top, as regular text. Never use the document header or footer fields for anything the ATS needs to read.',
  },
  {
    title: 'Using tables to organise content',
    why: "Tables are a popular layout trick but most ATS systems either skip table content entirely or read across rows in ways that scramble the text. A table with 'Skill | Years of Experience' headers can output as garbled nonsense.",
    fix: 'Replace all tables with plain bullet-point lists. Skills sections, experience timelines, and education blocks should all be plain text with consistent formatting.',
  },
  {
    title: 'Missing a Professional Summary section',
    why: 'The summary section is the highest-weight section for keyword matching in many ATS systems. Skipping it means missing a significant opportunity to front-load your most important keywords right where the parser looks first.',
    fix: 'Add a 3–5 sentence Professional Summary at the top of your resume. Include your job title, years of experience, 2–3 core skills, and one measurable achievement.',
  },
  {
    title: 'Using images, icons or graphics',
    why: 'ATS software reads text — it cannot interpret images. Profile photos, skill-bar graphics, decorative icons, and logo images all become invisible to the parser. Worse, they can corrupt the text around them.',
    fix: 'Remove every image, icon, and graphic from your ATS submission resume. Replace skill bars with a plain text skills list. Use a text-based format throughout.',
  },
  {
    title: "Non-standard section headings",
    why: '"Work History" is standard. "My Professional Journey" is not. ATS systems are trained to find specific section labels. Unusual or creative headings cause the system to misclassify or skip entire sections of your resume.',
    fix: 'Use only standard section labels: Professional Summary, Work Experience, Education, Skills, Certifications, Projects. Avoid creative names, even if they sound more interesting.',
  },
  {
    title: 'No keywords from the job description',
    why: "ATS systems rank resumes by how well they match the job posting. If the job description says 'HubSpot CRM' and your resume says 'customer relationship management software,' the ATS may not connect the two.",
    fix: 'Read the job description carefully and mirror its exact language in your resume. If they say "Agile methodology," use that phrase — not "iterative development" or "sprint-based workflow."',
  },
  {
    title: 'Submitting as an image-based PDF',
    why: 'Scanned resumes saved as PDFs are image files — there is no readable text layer. ATS software cannot extract any text from them and your resume will score zero or be rejected outright.',
    fix: 'Always submit a text-based PDF. Create your resume in Word or Google Docs and export it as PDF. Open it in a PDF viewer and check that you can click and select individual words.',
  },
  {
    title: 'Listing responsibilities instead of achievements',
    why: "Phrases like 'Responsible for managing social media accounts' are passive and tell the ATS nothing concrete. ATS systems and recruiters both score higher on quantified achievements.",
    fix: 'Rewrite every bullet using the formula: Action verb + what you did + measurable result. Example: "Grew Instagram following from 2,000 to 14,000 in 8 months through daily short-form video content."',
  },
  {
    title: "Inconsistent date formatting",
    why: "ATS systems parse dates to calculate your tenure and total years of experience. Mixing formats — '2022–Present' in one place and 'Jan 2022 to Now' in another — can confuse the parser and produce incorrect experience calculations.",
    fix: 'Pick one date format and use it everywhere. The most reliable format is Month Year — Month Year (e.g. "March 2022 — Present"). Apply it consistently to every role and education entry.',
  },
]

export default function BlogPostATSMistakes() {
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
          <span className="text-foreground/80">ATS Resume Mistakes</span>
        </nav>

        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-500">
              Resume Tips
            </span>
            <span className="text-xs text-foreground/40">March 25, 2026</span>
            <span className="text-xs text-foreground/40">· 9 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Top 10 ATS Resume Mistakes
            <span className="text-orange-500"> and How to Fix Them</span>
          </h1>

          <p className="text-lg text-foreground/60 leading-relaxed">
            You could be the most qualified candidate in the applicant pool and still get
            automatically rejected — because of formatting choices, missing sections, or wording
            that ATS software cannot process correctly. Here are the 10 mistakes that cause the
            most rejections, and exactly what to do about each one.
          </p>

          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800">
            <p className="text-sm font-semibold text-red-950 dark:text-red-300">
              ⚠️ <strong>Before you read:</strong> Run your current resume through the{' '}
              <Link href="/tools/resume-ats-scorer" className="underline hover:no-underline">
                FlexoTools ATS Scorer
              </Link>{' '}
              first. That way you will know which of these mistakes your resume is actually making
              — rather than guessing.
            </p>
          </div>
        </header>

        <article className="prose prose-gray dark:prose-invert max-w-none space-y-6">

          {mistakes.map((mistake, i) => (
            <section key={i} className="rounded-2xl border border-foreground/10 overflow-hidden hover:border-orange-500/30 transition-colors">
              <div className="flex items-center gap-4 px-5 py-4 bg-foreground/5 border-b border-foreground/10">
                <div className="shrink-0 w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-black text-sm">
                  {i + 1}
                </div>
                <h2 className="text-lg font-bold text-foreground">{mistake.title}</h2>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="text-xs font-black text-red-500 uppercase tracking-wide mb-1">Why it hurts you</div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{mistake.why}</p>
                </div>
                <div className="p-3 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                  <div className="text-xs font-black text-green-700 dark:text-green-400 uppercase tracking-wide mb-1">✓ The fix</div>
                  <p className="text-sm text-foreground/70 leading-relaxed">{mistake.fix}</p>
                </div>
              </div>
            </section>
          ))}

          <section className="p-5 rounded-2xl bg-foreground/5 border border-foreground/10">
            <h2 className="text-lg font-black text-foreground mb-3">⚡ Quick checklist</h2>
            <div className="space-y-2">
              {[
                'Single-column layout only',
                'Contact info in document body, not header/footer',
                'No tables, no images, no graphics',
                'Professional Summary section at the top',
                'Standard section headings throughout',
                'Keywords mirrored from the job description',
                'Text-based PDF (selectable text)',
                'Achievement-focused bullets with numbers',
                'Consistent date format across all entries',
                'ATS score checked before submitting',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-foreground/70">
                  <span className="text-orange-500 font-bold shrink-0">☐</span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-linear-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/20 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">See which mistakes your resume is making</h2>
            <p className="text-foreground/60">Free ATS scan — instant results, plain-English feedback.</p>
            <Link
              href="/tools/resume-ats-checker"
              className="inline-block px-8 py-3 bg-linear-to-r from-orange-500 to-red-500 text-white rounded-xl font-bold hover:scale-105 hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-200"
            >
              📄 Check My ATS Score
            </Link>
          </section>

          <section className="border-t border-foreground/10 pt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">More resume guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'How to Check Your Resume ATS Score for Free', href: '/blog/how-to-check-resume-ats-score-free' },
                { title: 'How to Write a Resume Summary That Passes ATS', href: '/blog/how-to-write-a-resume-summary-that-passes-ats' },
                { title: 'How to Generate a QR Code for WhatsApp, Instagram or YouTube', href: '/blog/how-to-generate-qr-code-for-social-media' },
                { title: "Dynamic vs Static QR Codes — What's the Difference?", href: '/blog/dynamic-vs-static-qr-codes' },
              ].map((post) => (
                <Link key={post.title} href={post.href} className="flex items-center gap-3 p-3 rounded-lg border border-foreground/10 hover:border-orange-500/30 hover:bg-foreground/5 transition-all text-sm font-medium text-foreground/70 hover:text-foreground">
                  <span className="text-orange-500">→</span>{post.title}
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