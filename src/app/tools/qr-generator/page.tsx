// src/app/tools/qr-generator/page.tsx
// SERVER COMPONENT — do NOT add 'use client' here.

import type { Metadata } from 'next'
import QrBarcodeGenerator from './QrBarcodeGenerator' // rename your existing file to QrBarcodeGenerator.tsx

export const metadata: Metadata = {
  title: 'Free QR Code Generator - Create Custom QR Codes & Barcodes',
  description:
    'Generate QR codes and barcodes instantly for free. Customize colors and size, download as PNG. Perfect for URLs, WiFi, contact cards, product codes. No signup needed.',
  alternates: {
    canonical: 'https://flexotools.com/tools/qr-generator',
  },
  keywords: [
    'qr code generator',
    'free qr code generator',
    'barcode generator',
    'create qr code',
    'custom qr code',
    'qr code maker',
    'online qr generator',
    'qr code download',
  ],
  openGraph: {
    title: 'Free QR Code & Barcode Generator | FlexoTools',
    description:
      'Create custom QR codes and barcodes in seconds. Custom colors, instant PNG download. Free, no signup.',
    url: 'https://flexotools.com/tools/qr-generator',
    images: ['/og-qr-generator.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free QR Code Generator | FlexoTools',
    description: 'Generate QR codes and barcodes with custom colors. Free and instant.',
    images: ['/og-qr-generator.png'],
  },
}

export default function QrGeneratorPage() {
  return <QrBarcodeGenerator />
}