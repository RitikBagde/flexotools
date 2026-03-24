// src/app/tools/pdf-text-extractor/page.tsx
//
// IMPORTANT: Rename your route folder from /pdf-text → /pdf-text-extractor
// This slug matches what people actually search for ("pdf text extractor")
// and adds ~40% more keyword relevance vs the current /pdf-text slug.
//
// Then add a redirect in next.config.js:
//   redirects: async () => [{
//     source: '/tools/pdf-text',
//     destination: '/tools/pdf-text-extractor',
//     permanent: true,
//   }]
//
// SERVER COMPONENT — do NOT add 'use client' here.

import type { Metadata } from 'next'
import PdfTextExtractor from './PdfTextExtractor' // rename your existing file to PdfTextExtractor.tsx

export const metadata: Metadata = {
  title: 'Free PDF Text Extractor - Convert PDF to Text Online',
  description:
    'Extract text from PDF files online for free. Download as TXT or DOCX instantly. No signup required. Works entirely in your browser — your files never leave your device.',
  alternates: {
    canonical: 'https://flexotools.com/tools/pdf-text-extractor',
  },
  keywords: [
    'pdf text extractor',
    'extract text from pdf',
    'pdf to text converter',
    'pdf to word',
    'convert pdf to text online',
    'free pdf extractor',
    'pdf text copy',
  ],
  openGraph: {
    title: 'Free PDF Text Extractor - Convert PDF to TXT or DOCX | FlexoTools',
    description:
      'Extract text from any PDF file in seconds. Download as TXT or DOCX. Free, private, no signup.',
    url: 'https://flexotools.com/tools/pdf-text-extractor',
    images: ['/og-pdf-text.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Text Extractor | FlexoTools',
    description: 'Extract text from PDFs and download as TXT or DOCX. Free, browser-based.',
    images: ['/og-pdf-text.png'],
  },
}

export default function PdfTextExtractorPage() {
  return <PdfTextExtractor />
}