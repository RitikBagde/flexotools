// src/app/blog/page.tsx
// SERVER COMPONENT — no 'use client'

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Tips, Guides & Tool Tutorials | FlexoTools',
  description:
    'Practical guides on image compression, PDF extraction, QR codes, resume optimization and more. Written by the FlexoTools team.',
  alternates: {
    canonical: 'https://flexotools.com/blog',
  },
}

const posts = [
  {
    slug: 'how-to-compress-images-without-losing-quality',
    title: 'How to Compress Images Online Free Without Losing Quality',
    excerpt:
      'A step-by-step walkthrough of every mode in the FlexoTools image compressor, with a real example showing a 97.3% file size reduction.',
    category: 'Image Compression',
    date: 'March 25, 2026',
    readTime: '6 min read',
  },
  {
    slug: 'how-to-extract-text-from-pdf-free',
    title: 'How to Extract Text from a PDF Free — No Signup, Browser-Based',
    excerpt:
      'Copy, download or convert PDF text to a Word document in seconds. Works entirely in your browser — no uploads to any server, no account needed.',
    category: 'PDF Tools',
    date: 'March 25, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-create-qr-code-barcode-free',
    title: 'How to Create a QR Code or Barcode for Free — No Signup',
    excerpt:
      'Generate a scannable QR code or barcode in seconds. This guide covers both modes, custom colors, size settings and how to download or share your code.',
    category: 'QR Codes',
    date: 'March 25, 2026',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-check-resume-ats-score-free',
    title: 'How to Check Your Resume ATS Score for Free (And Actually Fix It)',
    excerpt:
      'Most resumes are rejected before a human ever reads them. This guide shows you how to scan your resume for ATS compatibility and what to do about the red flags.',
    category: 'Resume Tips',
    date: 'March 25, 2026',
    readTime: '7 min read',
  },
  {
    slug: 'how-to-summarize-text-online-free',
    title: 'How to Summarize Text Online Free — Summary, Title & Bullet Points',
    excerpt:
      'Learn how to use the FlexoTools Text Summarizer to instantly condense long articles, essays and documents into summaries, headlines or key bullet points.',
    category: 'AI Tools',
    date: 'March 25, 2026',
    readTime: '5 min read',
  },
]

// ✅ FIX 1: Solid text colors that are visible in BOTH light and dark mode
const categoryStyles: Record<string, {
  badge: string
  hoverBorder: string
  hoverShadow: string
  hoverTitle: string
  readMore: string
}> = {
  'Image Compression': {
    badge: 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-500 border border-purple-300 dark:border-purple-600',
    hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-500',
    hoverShadow: 'hover:shadow-purple-500/10',
    hoverTitle: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
    readMore: 'text-purple-600 dark:text-purple-400',
  },
  'PDF Tools': {
    badge: 'bg-teal-100 dark:bg-teal-900/20 text-teal-700 dark:text-teal-500 border border-teal-300 dark:border-teal-600',
    hoverBorder: 'hover:border-teal-400 dark:hover:border-teal-500',
    hoverShadow: 'hover:shadow-teal-500/10',
    hoverTitle: 'group-hover:text-teal-600 dark:group-hover:text-teal-400',
    readMore: 'text-teal-600 dark:text-teal-400',
  },
  'QR Codes': {
    badge: 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-500',
    hoverBorder: 'hover:border-slate-400 dark:hover:border-slate-400',
    hoverShadow: 'hover:shadow-slate-500/10',
    hoverTitle: 'group-hover:text-slate-600 dark:group-hover:text-slate-400',
    readMore: 'text-slate-600 dark:text-slate-400',
  },
  'Resume Tips': {
    badge: 'bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-500 border border-orange-300 dark:border-orange-600',
    hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-500',
    hoverShadow: 'hover:shadow-orange-500/10',
    hoverTitle: 'group-hover:text-orange-600 dark:group-hover:text-orange-400',
    readMore: 'text-orange-600 dark:text-orange-400',
  },
  'AI Tools': {
    badge: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500 border border-green-300 dark:border-green-600',
    hoverBorder: 'hover:border-green-400 dark:hover:border-green-500',
    hoverShadow: 'hover:shadow-green-500/10',
    hoverTitle: 'group-hover:text-green-600 dark:group-hover:text-green-400',
    readMore: 'text-green-600 dark:text-green-400',
  },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto">

        <header className="mb-12">
          <nav className="text-sm text-foreground/50 mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground/80">Blog</span>
          </nav>
          <h1 className="text-4xl font-black text-foreground mb-3">Blog</h1>
          <p className="text-lg text-foreground/60">
            Practical guides and tutorials for getting the most out of free online tools.
          </p>
        </header>

        <div className="space-y-6">
          {posts.map((post) => {
            const styles = categoryStyles[post.category]
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
                {/* ✅ FIX 2: Border and shadow now match the category color on hover */}
                <article className={`p-6 rounded-2xl border-2 border-foreground/10 bg-background hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${styles?.hoverBorder ?? ''} ${styles?.hoverShadow ?? ''}`}>
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    {/* ✅ FIX 1: Badge now uses visible text + bg in light mode */}
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles?.badge ?? ''}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-foreground/40">{post.date}</span>
                    <span className="text-xs text-foreground/40">·</span>
                    <span className="text-xs text-foreground/40">{post.readTime}</span>
                  </div>
                  {/* ✅ FIX 2: Title hover color matches category */}
                  <h2 className={`text-xl font-black text-foreground transition-colors mb-2 ${styles?.hoverTitle ?? ''}`}>
                    {post.title}
                  </h2>
                  <p className="text-sm text-foreground/60 leading-relaxed">{post.excerpt}</p>
                  {/* ✅ FIX 2: "Read article" arrow color matches category */}
                  <div className={`mt-4 flex items-center text-sm font-semibold ${styles?.readMore ?? ''}`}>
                    Read article
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-foreground/5 border border-foreground/10 text-center">
          <p className="text-foreground/50 text-sm">
            More guides on image editing, file conversion, and productivity tools coming soon.
          </p>
        </div>

      </div>
    </div>
  )
}