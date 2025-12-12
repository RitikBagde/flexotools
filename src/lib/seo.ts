// src/lib/seo.ts
// Global SEO configuration for all tools and pages

// ============================================
// FILE 1: src/lib/seo.ts (IMPROVED VERSION)
// ============================================

export const SITE_CONFIG = {
  name: "FlexoTools",
  domain: "https://flexotools.com",
  description: "Fast, privacy-first tools for image compression, PDF extraction, QR generation, and more. No signup required.",
  keywords: [
    "image compressor",
    "PDF text extractor", 
    "QR code generator",
    "resume ATS scorer",
    "text summarizer",
    "free online tools",
    "privacy-focused tools",
    "web tools",
    "developer tools",
    "AI tools",
  ],
  author: "FlexoTools",
  twitter: "@flexotoolsapp",
  email: "flexotools.app@gmail.com",
  locale: "en_US",
  themeColor: "#8B5CF6", // Purple theme
}

// Tool-specific SEO configurations
export const TOOL_SEO = {
  "image-compressor": {
    title: "Free Image Compressor - Reduce Image Size Up to 80%",
    description: "Compress JPG, PNG, WebP images online for free. Reduce file size by up to 80% without losing quality. No signup required. Privacy-first.",
    keywords: ["image compressor", "compress image", "reduce image size", "optimize images", "jpg compressor", "png compressor", "webp compressor"],
    icon: "🖼️",
    category: "Image Tools",
    rating: { value: "4.8", count: "1247" },
    howTo: {
      name: "How to Compress Images Online",
      steps: [
        "Upload your image (JPG, PNG, WebP, AVIF, TIFF, or GIF)",
        "Choose compression mode (Quick preset, Target size, or Custom)",
        "Select quality and output format",
        "Download your compressed image"
      ],
      tools: ["Image Compressor", "Web Browser"],
      estimatedTime: "PT1M"
    }
  },
  "pdf-text": {
    title: "Free PDF Text Extractor - Extract Text from PDF Online",
    description: "Extract text from PDF documents instantly. Fast, accurate, and privacy-focused. No signup required. Works with scanned PDFs too.",
    keywords: ["pdf text extractor", "extract text from pdf", "pdf to text", "pdf text converter", "pdf reader"],
    icon: "📄",
    category: "PDF Tools",
    rating: { value: "4.7", count: "892" },
    howTo: {
      name: "How to Extract Text from PDF",
      steps: [
        "Upload your PDF document",
        "Wait for automatic text extraction",
        "Copy or download extracted text",
        "Use the text in your projects"
      ],
      tools: ["PDF Text Extractor", "Web Browser"],
      estimatedTime: "PT30S"
    }
  },
  "qr-generator": {
    title: "Free QR Code Generator - Create QR Codes & Barcodes Online",
    description: "Generate QR codes and barcodes instantly. Unlimited codes, free forever. Download in multiple formats. No signup required.",
    keywords: ["qr code generator", "create qr code", "barcode generator", "qr code maker", "free qr code"],
    icon: "📱",
    category: "Code Tools",
    rating: { value: "4.9", count: "2103" },
    howTo: {
      name: "How to Generate QR Codes",
      steps: [
        "Enter your URL, text, or data",
        "Choose QR code or barcode format",
        "Customize size and colors (optional)",
        "Download your code"
      ],
      tools: ["QR Generator", "Web Browser"],
      estimatedTime: "PT30S"
    }
  },
  "resume-grader": {
    title: "Free Resume ATS Scorer - AI-Powered Resume Analysis",
    description: "Score your resume with AI. Get detailed feedback on ATS compatibility, keywords, formatting, and more. Improve your job application success rate.",
    keywords: ["resume ats scorer", "resume checker", "ats resume", "resume analyzer", "cv checker", "resume optimization"],
    icon: "📋",
    category: "Career Tools",
    rating: { value: "4.6", count: "1589" },
    howTo: {
      name: "How to Score Your Resume",
      steps: [
        "Upload your resume (PDF or DOCX)",
        "Wait for AI analysis",
        "Review your ATS compatibility score",
        "Follow improvement suggestions"
      ],
      tools: ["Resume ATS Scorer", "Web Browser", "AI Analysis"],
      estimatedTime: "PT2M"
    }
  },
  "text-summarizer": {
    title: "Free AI Text Summarizer - Summarize Long Texts Instantly",
    description: "Summarize long articles, documents, and texts with AI. Generate titles and key points automatically. Fast, accurate, and free.",
    keywords: ["text summarizer", "ai summarizer", "summarize text", "text summary", "article summarizer", "title generator"],
    icon: "✨",
    category: "AI Tools",
    rating: { value: "4.7", count: "1834" },
    howTo: {
      name: "How to Summarize Text",
      steps: [
        "Paste or upload your text",
        "Choose summary length and style",
        "Click generate summary",
        "Copy your summarized text and title"
      ],
      tools: ["AI Text Summarizer", "Web Browser", "AI Model"],
      estimatedTime: "PT1M"
    }
  },
}

// Type definitions
export type ToolSlug = keyof typeof TOOL_SEO
export type FAQItem = { question: string; answer: string }

// Generate metadata for any tool page
export function generateToolMetadata(toolSlug: string) {
  const tool = TOOL_SEO[toolSlug as ToolSlug]
  
  if (!tool) {
    return {
      title: `${toolSlug.replace(/-/g, " ")} | ${SITE_CONFIG.name}`,
      description: SITE_CONFIG.description,
    }
  }

  return {
    title: tool.title,
    description: tool.description,
    keywords: [...tool.keywords, ...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `${SITE_CONFIG.domain}/tools/${toolSlug}`,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [
        {
          url: `/og-${toolSlug}.png`,
          width: 1200,
          height: 630,
          alt: tool.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
      site: SITE_CONFIG.twitter,
      images: [`/twitter-${toolSlug}.png`],
    },
    alternates: {
      canonical: `${SITE_CONFIG.domain}/tools/${toolSlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
    themeColor: SITE_CONFIG.themeColor,
  }
}

// Generate HowTo structured data
export function generateHowToSchema(toolSlug: string) {
  const tool = TOOL_SEO[toolSlug as ToolSlug]
  
  if (!tool?.howTo) return null

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tool.howTo.name,
    description: tool.description,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0"
    },
    tool: tool.howTo.tools.map(t => ({
      "@type": "HowToTool",
      name: t
    })),
    totalTime: tool.howTo.estimatedTime,
    step: tool.howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text: step,
      url: `${SITE_CONFIG.domain}/tools/${toolSlug}#step-${index + 1}`
    }))
  }
}

// Generate WebApplication structured data
export function generateWebAppSchema(toolSlug: string) {
  const tool = TOOL_SEO[toolSlug as ToolSlug]
  
  if (!tool) return null

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.title,
    url: `${SITE_CONFIG.domain}/tools/${toolSlug}`,
    description: tool.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    },
    aggregateRating: tool.rating ? {
      "@type": "AggregateRating",
      ratingValue: tool.rating.value,
      ratingCount: tool.rating.count,
      bestRating: "5",
      worstRating: "1"
    } : undefined,
    featureList: tool.keywords.join(", "),
    screenshot: `${SITE_CONFIG.domain}/screenshots/${toolSlug}.png`,
    author: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.domain
    }
  }
}

// ✅ NEW: Generate Breadcrumb structured data
export function generateBreadcrumbSchema(toolSlug: string) {
  const tool = TOOL_SEO[toolSlug as ToolSlug]
  
  if (!tool) return null

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_CONFIG.domain
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_CONFIG.domain}/tools`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: tool.title,
        item: `${SITE_CONFIG.domain}/tools/${toolSlug}`
      }
    ]
  }
}

// ✅ NEW: Generate FAQ structured data (for use in page.tsx)
export function generateFAQSchema(faqs: FAQItem[]) {
  if (!faqs || faqs.length === 0) return null

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  }
}

// Get all tool slugs for sitemap
export function getAllToolSlugs() {
  return Object.keys(TOOL_SEO)
}

// Get tool info for display
export function getToolInfo(toolSlug: string) {
  return TOOL_SEO[toolSlug as ToolSlug]
}