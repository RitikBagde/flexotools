// src/app/sitemap.ts
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://flexotools.com'
  const now = new Date('2026-03-29')

  return [
    // ── Core pages ──
    {
      url: base,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // ── Legal ──
    {
      url: `${base}/legal/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${base}/legal/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${base}/legal/cookies`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },

    // ── Tools —  actual folder names ──
    {
      url: `${base}/tools/image-compressor`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/tools/pdf-text-extractor`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/tools/qr-generator`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/tools/resume-ats-checker`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/tools/text-summarizer`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // ── Blog index ──
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },

    // ── Blog posts — all 14 ──
    {
      url: `${base}/blog/dynamic-vs-static-qr-codes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/how-to-check-resume-ats-score-free`,
      lastModified: new Date('2026-03-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/how-to-compress-images-without-losing-quality`,
      lastModified: new Date('2026-03-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/how-to-create-qr-code-barcode-free`,
      lastModified: new Date('2026-03-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/how-to-extract-text-from-pdf-free`,
      lastModified: new Date('2026-03-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/how-to-generate-qr-code-for-social-media`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/how-to-summarize-text-online-free`,
      lastModified: new Date('2026-03-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/blog/how-to-use-ai-summarizer-effectively`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/how-to-write-a-resume-summary-that-passes-ats`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/jpg-vs-png-vs-webp-vs-avif`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/pdf-vs-word-vs-txt-which-format-to-use`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/qr-code-best-practices-small-business`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/top-10-ats-resume-mistakes`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${base}/blog/what-is-ats-and-why-resume-gets-rejected`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}