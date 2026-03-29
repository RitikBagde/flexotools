// src/app/blog/how-to-write-a-resume-summary-that-passes-ats/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Write a Resume Summary That Passes ATS | FlexoTools',
  description:
    'Your resume summary is the first thing an ATS reads. Learn how to write a keyword-rich, compelling summary that gets past the filter and impresses recruiters.',
  alternates: {
    canonical: 'https://flexotools.com/blog/how-to-write-a-resume-summary-that-passes-ats',
  },
  openGraph: {
    title: 'How to Write a Resume Summary That Passes ATS | FlexoTools Blog',
    description:
      'Learn how to write a keyword-rich resume summary that passes ATS filters and impresses recruiters.',
    url: 'https://flexotools.com/blog/how-to-write-a-resume-summary-that-passes-ats',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Write a Resume Summary That Passes ATS',
  description:
    'Learn how to write a keyword-rich, compelling resume summary that gets past ATS filters and impresses recruiters.',
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
    '@id': 'https://flexotools.com/blog/how-to-write-a-resume-summary-that-passes-ats',
  },
}

export default function BlogPostResumeSummary() {
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
          <span className="text-foreground/80">Resume Summary Guide</span>
        </nav>

        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400">
              Resume Tips
            </span>
            <span className="text-xs text-foreground/40">March 25, 2026</span>
            <span className="text-xs text-foreground/40">· 6 min read</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            How to Write a Resume Summary
            <span className="text-orange-500"> That Passes ATS</span>
          </h1>

          <p className="text-lg text-foreground/60 leading-relaxed">
            The resume summary sits at the very top of your document — it is the first section
            an ATS parses and the first thing a recruiter reads if your resume gets through.
            Most people either skip it entirely or write something so generic it adds no value.
            This guide shows you how to write one that does both jobs: passes the filter and
            makes a recruiter want to keep reading.
          </p>

          <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">3–5</div>
              <div className="text-xs text-foreground/60 mt-1">Ideal sentence count</div>
            </div>
            <div className="text-center border-x border-orange-200 dark:border-orange-800">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">top</div>
              <div className="text-xs text-foreground/60 mt-1">Position on resume</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">#1</div>
              <div className="text-xs text-foreground/60 mt-1">Section ATS reads first</div>
            </div>
          </div>
        </header>

        <article className="prose prose-gray dark:prose-invert max-w-none space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Resume Summary vs Resume Objective — What Is the Difference?
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              A <strong>resume summary</strong> describes who you are professionally — your
              experience, key skills, and top achievements. It is written for candidates who
              already have relevant experience in their field.
            </p>
            <p className="text-foreground/70 leading-relaxed mt-3">
              A <strong>resume objective</strong> describes what you are looking for — your career
              goals. It was common in the 1990s but is now largely outdated. Modern recruiters
              and ATS systems respond much better to summaries because they are focused on value
              delivered rather than personal wants.
            </p>
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 mt-4">
              <p className="text-sm font-semibold text-blue-950 dark:text-blue-400">
                💡 <strong>Exception:</strong> If you are a fresh graduate with no relevant
                experience, a short objective is acceptable — but frame it around the value
                you bring, not what you want from the employer.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              What Makes a Summary ATS-Friendly?
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              ATS software scans your summary for keywords that match the job description. Here
              is what the system looks for:
            </p>

            <div className="space-y-3">
              {[
                {
                  label: 'Job title keywords',
                  detail: 'Include the exact job title from the posting (or a close variant) in your summary. If the role is "Digital Marketing Manager," your summary should contain that phrase.',
                  icon: '🎯',
                },
                {
                  label: 'Hard skill keywords',
                  detail: 'Name the specific tools, technologies or methodologies mentioned in the job description. "Project management" is weaker than "Agile project management using Jira."',
                  icon: '🔧',
                },
                {
                  label: 'Years of experience',
                  detail: 'Many ATS systems filter by experience level. State your years of experience explicitly — "5+ years of experience in data analysis" rather than leaving it implicit.',
                  icon: '📅',
                },
                {
                  label: 'Measurable achievements',
                  detail: 'ATS systems score higher on summaries that include numbers. Even one metric in your summary — "increased conversion rate by 22%" — signals a results-oriented candidate.',
                  icon: '📈',
                },
                {
                  label: 'Standard section label',
                  detail: 'Label the section "Professional Summary" or "Summary" — not "About Me," "Profile," or "Introduction." Non-standard labels are often missed by ATS parsers.',
                  icon: '📋',
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 p-4 rounded-xl border border-foreground/10 hover:border-orange-500/30 transition-colors">
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="font-bold text-foreground text-sm">{item.label}</div>
                    <p className="text-sm text-foreground/60 mt-1 leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              The Formula for a Strong Resume Summary
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              A well-structured summary follows this pattern:
            </p>

            <div className="space-y-3">
              {[
                { part: 'Sentence 1', content: '[Job title] with [X years] of experience in [core area]. ', color: 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800' },
                { part: 'Sentence 2', content: 'Skilled in [2–3 hard skills directly from the job description].', color: 'bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800' },
                { part: 'Sentence 3', content: 'Track record of [measurable achievement or key result].', color: 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' },
                { part: 'Sentence 4 (optional)', content: 'Seeking to [bring specific value] to [type of company or role].', color: 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800' },
              ].map((item) => (
                <div key={item.part} className={`p-4 rounded-xl border ${item.color}`}>
                  <div className="text-xs font-black text-foreground/40 uppercase tracking-wide mb-1">{item.part}</div>
                  <p className="text-sm text-foreground/80 font-medium">{item.content}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Before and After — Real Examples
            </h2>

            <div className="space-y-6">
              {[
                {
                  role: 'Software Developer',
                  before: "Passionate software developer looking for an exciting opportunity to grow my skills and contribute to a great team. I am a fast learner who loves coding.",
                  after: "Full-Stack Software Developer with 4 years of experience building scalable web applications. Proficient in React, Node.js and PostgreSQL. Reduced average API response time by 40% at previous role through query optimization and caching.",
                  beforeIssues: ['No keywords from job descriptions', 'No years of experience', 'No measurable result', 'Focuses on what candidate wants'],
                  afterStrengths: ['Job title keyword included', 'Specific tech stack named', 'Concrete metric included', 'Focused on value delivered'],
                },
                {
                  role: 'Marketing Manager',
                  before: "Experienced marketing professional with a passion for brands. Good communicator and team player. Looking to bring my skills to a dynamic organization.",
                  after: "Digital Marketing Manager with 6 years of experience in B2B SaaS growth. Specialized in SEO, paid search and email automation. Grew organic traffic by 180% and reduced cost-per-lead by 35% over 18 months.",
                  beforeIssues: ['Generic adjectives — "passionate," "dynamic"', 'No hard skills named', 'No industry specified', 'No numbers anywhere'],
                  afterStrengths: ['Industry and niche specified (B2B SaaS)', 'Three concrete skills listed', 'Two strong metrics included', 'Immediately scannable by ATS'],
                },
              ].map((example) => (
                <div key={example.role} className="rounded-xl border border-foreground/10 overflow-hidden">
                  <div className="px-4 py-2 bg-foreground/5 border-b border-foreground/10">
                    <span className="text-sm font-bold text-foreground">{example.role}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-foreground/10">
                    <div className="p-4">
                      <div className="text-xs font-black text-red-500 uppercase tracking-wide mb-2">✗ Before</div>
                      <p className="text-sm text-foreground/70 leading-relaxed italic mb-3">"{example.before}"</p>
                      <ul className="space-y-1">
                        {example.beforeIssues.map((i) => (
                          <li key={i} className="text-xs text-foreground/50 flex gap-2"><span className="text-red-400">✗</span>{i}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-black text-green-500 uppercase tracking-wide mb-2">✓ After</div>
                      <p className="text-sm text-foreground/70 leading-relaxed italic mb-3">"{example.after}"</p>
                      <ul className="space-y-1">
                        {example.afterStrengths.map((i) => (
                          <li key={i} className="text-xs text-foreground/50 flex gap-2"><span className="text-green-400">✓</span>{i}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Words and Phrases to Avoid
            </h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              These phrases appear on thousands of resumes, add no measurable value, and can
              actually lower your ATS score by taking up space that should contain real keywords:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                'Hard worker', 'Team player', 'Self-starter', 'Detail-oriented',
                'Passionate about', 'Dynamic professional', 'Results-driven',
                'Seeking an opportunity', 'Fast learner', 'Think outside the box',
                'Go-getter', 'Synergy',
              ].map((phrase) => (
                <div key={phrase} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">
                  <span className="text-red-400 shrink-0">✗</span>
                  {phrase}
                </div>
              ))}
            </div>
            <p className="text-foreground/70 leading-relaxed mt-4">
              Replace every one of these with a concrete skill, tool name, or achievement. If you
              cannot think of a specific replacement, leave the space blank — brevity beats filler.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Check Your Summary With the ATS Scorer
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Once you have written or rewritten your summary, run your full resume through the{' '}
              <Link href="/tools/resume-ats-checker" className="text-orange-500 hover:underline font-medium">
                FlexoTools ATS Scorer
              </Link>
              . It evaluates keyword density, formatting, structure, and language — and tells you
              specifically what is dragging your score down. Most candidates who rewrite their
              summary based on the red flags report a 10–20 point score increase.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-linear-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 border border-orange-500/20 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Check how your resume scores</h2>
            <p className="text-foreground/60">Upload your PDF and get a full ATS report in seconds.</p>
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
                { title: 'Top 10 ATS Resume Mistakes and How to Fix Them', href: '/blog/top-10-ats-resume-mistakes' },
                { title: 'How to Generate a QR Code for WhatsApp, Instagram or YouTube', href: '/blog/how-to-generate-qr-code-for-social-media' },
                { title: 'Dynamic vs Static QR Codes — What\'s the Difference?', href: '/blog/dynamic-vs-static-qr-codes' },
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