// src/app/tools/text-summarizer/page.tsx
// SERVER COMPONENT — do NOT add 'use client' here.

import type { Metadata } from 'next'
import TextSummarizerPage from './TextSummarizerClient' // rename your existing file to TextSummarizerClient.tsx

export const metadata: Metadata = {
  title: 'Free AI Text Summarizer - Summarize Articles & Generate Titles',
  description:
    'Summarize long articles, essays and documents with AI in seconds. Generate titles and bullet points too. Free, with rate limits. Login required for AI features.',
  alternates: {
    canonical: 'https://flexotools.com/tools/text-summarizer',
  },
  keywords: [
    'text summarizer',
    'ai text summarizer',
    'article summarizer',
    'summarize text online',
    'free text summarizer',
    'ai summary generator',
    'bullet point generator',
    'title generator',
  ],
  openGraph: {
    title: 'Free AI Text Summarizer - Summaries, Titles & Bullets | FlexoTools',
    description:
      'AI-powered text summarizer. Generate summaries, titles, and bullet points from any text. Free with login.',
    url: 'https://flexotools.com/tools/text-summarizer',
    images: ['/og-text-summarizer.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Text Summarizer | FlexoTools',
    description: 'Summarize articles, generate titles and bullet points with AI. Free.',
    images: ['/og-text-summarizer.png'],
  },
}

export default function TextSummarizerRoute() {
  return <TextSummarizerPage />
}