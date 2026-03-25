// src/app/blog/what-is-ats-and-why-resume-gets-rejected/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'What Is an ATS and Why Your Resume Gets Rejected Before a Human Reads It | FlexoTools',
  description:
    'Most job applications are filtered out by software before a recruiter sees them. Learn exactly how ATS works, what triggers automatic rejection, and how to write a resume that passes.',
  alternates: {
    canonical: 'https://flexotools.com/blog/what-is-ats-and-why-resume-gets-rejected',
  },
}

export default function WhatIsATSPage() {
  return (
    <div className="min-h-screen py-6 sm:py-10 px-3 sm:px-6">
      <div className="max-w-2xl mx-auto">

        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-foreground/50 mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-foreground/80">What Is an ATS</span>
        </nav>

        {/* ── Header ── */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-500 border border-orange-300 dark:border-orange-600 whitespace-nowrap">
              Resume Tips
            </span>
            <div className="flex items-center gap-1.5 text-xs text-foreground/40">
              <span>March 25, 2026</span>
              <span>·</span>
              <span>8 min read</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-foreground leading-tight mb-4">
            What Is an ATS and Why Your Resume Gets Rejected{' '}
            <span className="text-orange-500">Before a Human Reads It</span>
          </h1>

          <p className="text-base sm:text-lg text-foreground/70 leading-relaxed">
            You spent hours perfecting your resume. You applied to dozens of jobs. And you heard nothing back.
            The problem probably isn't your qualifications — it's that your resume never made it to a human.
            Here's exactly why, and how to fix it.
          </p>
        </header>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-3 divide-x divide-foreground/10 border border-foreground/10 rounded-xl mb-10 overflow-hidden">
          {[
            { value: '75%', label: 'Resumes filtered by ATS' },
            { value: '7 sec', label: 'Human review if it passes' },
            { value: '$0', label: 'Cost to fix your resume' },
          ].map(({ value, label }) => (
            <div key={label} className="py-4 px-3 text-center bg-foreground/2">
              <div className="text-xl sm:text-2xl font-black text-orange-500">{value}</div>
              <div className="text-xs text-foreground/50 mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>

        {/* ── Article body ── */}
        <article className="prose-custom space-y-8 text-foreground/80 leading-relaxed text-[15px] sm:text-base">

          {/* Section 1 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              What Exactly Is an ATS?
            </h2>
            <p>
              An <strong className="text-foreground">Applicant Tracking System (ATS)</strong> is software that companies use to manage job applications at scale.
              When you hit "Submit" on a job board like LinkedIn, Indeed, or a company careers page, your resume
              doesn't land in a recruiter's inbox — it goes into an ATS database first.
            </p>
            <p className="mt-3">
              The software automatically parses your resume, extracts information like your job titles, skills,
              education, and dates, and then scores or ranks you against the job description. Candidates below
              a certain threshold are filtered out automatically. The recruiter may never even know you applied.
            </p>
            <p className="mt-3">
              According to multiple HR surveys, over 98% of Fortune 500 companies use an ATS. Even mid-sized
              companies and startups now rely on tools like Greenhouse, Lever, Workday, and Taleo. If you're
              applying to any company with more than 50 employees, there's a very good chance an ATS is
              reading your resume before any human does.
            </p>
          </section>

          {/* Key insight callout */}
          <div className="flex gap-3 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
            <span className="text-lg mt-0.5 shrink-0">💡</span>
            <p className="text-sm text-orange-800 dark:text-orange-500">
              <strong>Key Insight:</strong> ATS rejection isn't about being underqualified. It's about your
              resume being formatted or worded in a way the software can't correctly parse. A perfectly
              qualified candidate with a poorly formatted resume loses to a less qualified candidate with
              a clean, ATS-optimised one.
            </p>
          </div>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              How ATS Actually Reads Your Resume
            </h2>
            <p>
              ATS software doesn't "read" your resume the way a human does. It parses it — meaning it
              attempts to extract structured data from unstructured text. It's looking for specific fields:
              contact information, work experience (with dates), job titles, education, skills, and certifications.
            </p>
            <p className="mt-3">
              When it encounters formatting it doesn't understand — tables, columns, text boxes, unusual fonts,
              headers embedded in images — it either skips that content entirely or misfiles it in the wrong
              field. A candidate whose skills section ends up blank in the ATS database will score zero for
              keyword matching, regardless of what's actually on their resume.
            </p>
            <p className="mt-3">
              This is why resumes that look beautiful in a PDF viewer often perform terribly in ATS. Visual
              design elements that impress humans actively confuse the parser.
            </p>
          </section>

          {/* Tool screenshot 1 — upload state */}
          <figure className="rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
            <Image
              src="/blog/ats/ats-upload.png"
              alt="FlexoTools Resume ATS Scorer — upload interface showing a PDF ready to analyse"
              width={960}
              height={420}
              className="w-full h-auto"
              priority
            />
            <figcaption className="text-xs text-foreground/40 text-center py-2 px-4 bg-foreground/2">
              The FlexoTools ATS Scorer accepts a PDF resume and analyses it across four dimensions instantly.
            </figcaption>
          </figure>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              The 5 Most Common Reasons Resumes Get Rejected by ATS
            </h2>
            <p className="mb-4">
              These are the patterns that cause automatic rejection most often, based on how ATS
              parsing engines actually work:
            </p>

            {[
              {
                num: '01',
                title: 'Tables and multi-column layouts',
                body: 'Many ATS parsers read left-to-right across columns, jumbling your content. A two-column resume where skills appear beside experience often gets parsed as a single garbled paragraph. Use a single-column layout for any resume that will be submitted digitally.',
              },
              {
                num: '02',
                title: 'Non-standard section headings',
                body: 'ATS systems are trained to recognise "Work Experience", "Education", "Skills", and "Summary". If you use creative labels like "My Journey", "Where I\'ve Been", or "What I Bring", the parser may fail to categorise that section and skip it entirely.',
              },
              {
                num: '03',
                title: 'Missing keywords from the job description',
                body: 'ATS ranks resumes partly by keyword frequency. If the job posting says "project management" and your resume says "led projects", the match score may be zero for that term even though the meaning is identical. Mirror the exact language from the job description wherever honest.',
              },
              {
                num: '04',
                title: 'No quantified achievements',
                body: 'Modern ATS systems, especially those with AI scoring layers, actively penalise bullet points that read like job descriptions rather than achievements. "Responsible for social media" scores lower than "Grew Instagram to 4,200 followers in 6 months." Numbers signal credibility.',
              },
              {
                num: '05',
                title: 'Contact information in headers or footers',
                body: 'Many ATS parsers ignore the header and footer regions of a PDF entirely. If your name, email, or phone number lives only in the document header, it may simply not be extracted — making your application invisible even if your content passes.',
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="flex gap-4 p-4 rounded-xl border border-foreground/10 bg-foreground/2 mb-3">
                <span className="text-2xl font-black text-orange-500/30 shrink-0 leading-none mt-0.5">{num}</span>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-foreground/70">{body}</p>
                </div>
              </div>
            ))}
          </section>

          {/* Tool screenshot 2 — ready to analyze */}
          <figure className="rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
            <Image
              src="/blog/ats/ats-ready.png"
              alt="FlexoTools Resume ATS Scorer showing a resume loaded and ready to check"
              width={960}
              height={420}
              className="w-full h-auto"
            />
            <figcaption className="text-xs text-foreground/40 text-center py-2 px-4 bg-foreground/2">
              Once your PDF is uploaded, the tool confirms it's ready and lets you run the check in one click.
            </figcaption>
          </figure>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              What a Good ATS Score Actually Looks Like
            </h2>
            <p>
              ATS scores are not standardised across platforms — a 72% on one system might be equivalent to
              an 85% on another. What matters more than the raw number is understanding what's being flagged.
            </p>
            <p className="mt-3">
              A well-structured resume typically scores in the <strong className="text-foreground">85–100 range</strong> on the FlexoTools scorer,
              reflecting strong keyword usage, clean formatting, quantified achievements, and complete
              section structure. Scores in the 65–84 band pass most systems but have addressable gaps.
              Anything below 65 is likely to be filtered automatically by stricter ATS configurations.
            </p>
          </section>

          {/* Tool screenshot 3 — results */}
          <figure className="rounded-2xl overflow-hidden border border-foreground/10 shadow-lg">
            <Image
              src="/blog/ats/ats-results.png"
              alt="FlexoTools ATS Score result showing 84 out of 100 with What's Working and Red Flags sections"
              width={960}
              height={600}
              className="w-full h-auto"
            />
            <figcaption className="text-xs text-foreground/40 text-center py-2 px-4 bg-foreground/2">
              A sample result: 84/100 labelled "ATS Friendly", with a breakdown of strengths and specific red flags to fix.
            </figcaption>
          </figure>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              How to Write a Resume That Passes ATS
            </h2>
            <p className="mb-4">
              None of this requires you to make your resume worse for humans — a clean, well-structured
              resume reads better for both. Here's the practical checklist:
            </p>

            {[
              { check: 'Use a single-column layout with standard fonts (Arial, Calibri, Georgia)' },
              { check: 'Label sections exactly: Work Experience, Education, Skills, Summary' },
              { check: 'Put contact info in the body of the document, not just the header' },
              { check: 'Mirror keywords from the job description naturally throughout your bullet points' },
              { check: 'Replace duty descriptions with quantified achievements wherever possible' },
              { check: 'Avoid text boxes, tables, icons, and graphics — save those for a printed version' },
              { check: 'Submit as PDF unless the application specifically asks for .docx' },
              { check: 'Run your resume through an ATS checker before every application round' },
            ].map(({ check }) => (
              <div key={check} className="flex gap-3 items-start py-2.5 border-b border-foreground/5 last:border-0">
                <span className="text-green-500 font-bold shrink-0 mt-0.5">✓</span>
                <span className="text-sm text-foreground/80">{check}</span>
              </div>
            ))}
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3">
              Does Tailoring Your Resume for Every Job Actually Matter?
            </h2>
            <p>
              Yes — and more than most people realise. ATS systems score resumes against the specific
              job description, not against a generic standard. A resume that scores 90 for one role
              might score 55 for a different role at the same company if the required keywords are different.
            </p>
            <p className="mt-3">
              The practical implication: you don't need to rewrite your entire resume for every application,
              but you should update your skills section and adjust 2–3 bullet points to reflect the language
              used in each job posting. This alone can move a borderline resume from filtered to shortlisted.
            </p>
          </section>

          {/* CTA box */}
          <div className="rounded-2xl p-6 sm:p-8 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 text-center">
            <div className="text-3xl mb-3">📋</div>
            <h3 className="text-lg sm:text-xl font-black text-foreground mb-2">
              Check Your Resume Right Now — Free
            </h3>
            <p className="text-sm text-foreground/60 mb-5">
              Upload your PDF and get an instant ATS score with a specific breakdown of what's working
              and what's holding you back. No signup required to see your score.
            </p>
            <Link
              href="/tools/resume-ats-checker"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
            >
              🎯 Check My ATS Score
            </Link>
          </div>

        </article>

        {/* ── More guides ── */}
        <div className="mt-12 pt-8 border-t border-foreground/10">
          <h3 className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-4">More guides</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { href: '/blog/how-to-check-resume-ats-score-free', label: 'How to Check Your Resume ATS Score for Free' },
              { href: '/blog/how-to-compress-images-without-losing-quality', label: 'How to Compress Images Online Free Without Losing Quality' },
              { href: '/blog/how-to-summarize-text-online-free', label: 'How to Summarize Text Online Free' },
              { href: '/blog/how-to-extract-text-from-pdf-free', label: 'How to Extract Text from a PDF Free' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 p-3 rounded-xl border border-foreground/10 hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all group text-sm text-foreground/70 hover:text-foreground"
              >
                <span className="text-orange-400 group-hover:translate-x-0.5 transition-transform">→</span>
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