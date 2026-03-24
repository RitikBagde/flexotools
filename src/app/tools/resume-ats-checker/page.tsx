// src/app/tools/resume-ats-checker/page.tsx
//
// IMPORTANT: Rename your route folder from /resume-grader → /resume-ats-checker
// "resume ats checker" gets ~3x more monthly searches than "resume grader".
// It's also more descriptive of what the tool actually does.
//
// Add a redirect in next.config.js:
//   redirects: async () => [{
//     source: '/tools/resume-grader',
//     destination: '/tools/resume-ats-checker',
//     permanent: true,
//   }]
//
// SERVER COMPONENT — do NOT add 'use client' here.

import type { Metadata } from 'next'
import ResumeGrader from './ResumeGrader' // rename your existing file to ResumeGrader.tsx

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker - Score & Optimize Your Resume',
  description:
    'Check if your resume passes ATS systems with our free AI-powered resume checker. Get an instant score, keyword analysis, and actionable improvement tips. Free account required.',
  alternates: {
    canonical: 'https://flexotools.com/tools/resume-ats-checker',
  },
  keywords: [
    'ats resume checker',
    'resume ats score',
    'free ats checker',
    'resume scanner',
    'ats friendly resume',
    'resume keyword checker',
    'applicant tracking system checker',
    'resume optimizer',
  ],
  openGraph: {
    title: 'Free ATS Resume Checker - Instant Score & Tips | FlexoTools',
    description:
      'AI-powered ATS resume checker. Get your score, fix red flags, and land more interviews. Free account required.',
    url: 'https://flexotools.com/tools/resume-ats-checker',
    images: ['/og-resume-checker.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free ATS Resume Checker | FlexoTools',
    description: 'Check your resume against ATS systems. Get an instant score and tips to improve.',
    images: ['/og-resume-checker.png'],
  },
}

export default function ResumeAtsCheckerPage() {
  return <ResumeGrader />
}