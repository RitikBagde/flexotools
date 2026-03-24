// app/sitemap.ts
// Generates sitemap for all pages. Submitted to Google Search Console
// at: https://flexotools.com/sitemap.xml

import { MetadataRoute } from 'next'

const BASE_URL = 'https://flexotools.com'

// FIX: Hardcode your tool slugs directly here instead of relying on
// getAllToolSlugs() from a lib file. If that function throws or returns
// an empty array, none of your tool pages will appear in the sitemap
// and Google won't index them. Hardcoding is safer, more readable,
// and easier to audit. Add new tools to this list when you launch them.
const TOOL_SLUGS = [
  'image-compressor',
  'pdf-text',
  'qr-generator',
  'resume-grader',
  'text-summarizer',
]

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/legal/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Tool pages — highest priority after homepage
  const toolPages: MetadataRoute.Sitemap = TOOL_SLUGS.map((slug) => ({
    url: `${BASE_URL}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...toolPages]
}