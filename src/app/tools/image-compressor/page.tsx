// src/app/tools/image-compressor/page.tsx
// SERVER COMPONENT — do NOT add 'use client' here.
// This file exists only to export metadata and render the client component.
// The actual UI lives in ImageCompressor.tsx (the 'use client' file you already have).

import type { Metadata } from 'next'
import ImageCompressor from './ImageCompressor' // rename your existing file to ImageCompressor.tsx

export const metadata: Metadata = {
  title: 'Free Image Compressor - Reduce File Size Without Quality Loss',
  description:
    'Compress JPG, PNG, WebP, AVIF and GIF images online for free. Reduce file sizes by up to 80% instantly. No signup, no upload limits, 100% browser-based.',
  alternates: {
    canonical: 'https://flexotools.com/tools/image-compressor',
  },
  keywords: [
    'image compressor',
    'compress image online',
    'reduce image file size',
    'jpg compressor',
    'png compressor',
    'webp converter',
    'image optimizer',
    'free image compressor',
  ],
  openGraph: {
    title: 'Free Image Compressor - Up to 80% Smaller | FlexoTools',
    description:
      'Compress JPG, PNG, WebP and AVIF images online for free. No signup, no quality loss.',
    url: 'https://flexotools.com/tools/image-compressor',
    images: ['/og-image-compressor.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Compressor | FlexoTools',
    description: 'Compress images up to 80% smaller in seconds. Free, private, no signup.',
    images: ['/og-image-compressor.png'],
  },
}

export default function ImageCompressorPage() {
  return <ImageCompressor />
}